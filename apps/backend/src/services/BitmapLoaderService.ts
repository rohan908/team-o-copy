import fs from 'fs';
import path from 'path';
import { BitmapService } from './BitmapService';
import PrismaClient from '../bin/prisma-client';

export class BitmapLoaderService {
    private bitmapService: BitmapService;
    private readonly bitmapDirectory: string;

    constructor(bitmapDirectory: string = path.join(process.cwd(), 'bitmaps')) {
        this.bitmapService = new BitmapService();
        this.bitmapDirectory = bitmapDirectory;
    }

    public async loadBitmaps(): Promise<void> {
        console.log(`Loading bitmaps from ${this.bitmapDirectory}...`);

        try {
            // Create directory if it doesn't exist
            if (!fs.existsSync(this.bitmapDirectory)) {
                fs.mkdirSync(this.bitmapDirectory, { recursive: true });
                console.log(`Created bitmap directory at ${this.bitmapDirectory}`);
                return; // No files to process yet
            }

            // Get all bitmap files
            const files = fs
                .readdirSync(this.bitmapDirectory)
                .filter((file) => file.endsWith('.bmp'));

            console.log(`Found ${files.length} bitmap files`);

            // Process each file
            for (const file of files) {
                await this.processFile(file);
            }

            console.log('Bitmap loading complete');
        } catch (error) {
            console.error('Error loading bitmaps:', error);
            throw error;
        }
    }

    private async processFile(filename: string): Promise<void> {
        try {
            // Parse filename to extract metadata
            const fileInfo = this.parseFilename(filename);

            if (!fileInfo) {
                console.warn(`Skipping file with invalid name format: ${filename}`);
                return;
            }

            const filePath = path.join(this.bitmapDirectory, filename);
            const bmpData = fs.readFileSync(filePath);

            // Extract bitmap info and convert to grid
            const { grid, width, height } = this.bitmapToGrid(bmpData);

            // Convert grid to compressed binary format for database
            const bitmapBuffer = this.bitmapService.encodeBitmap(grid, width, height);

            // Upsert to database
            await PrismaClient.layer.upsert({
                where: { layerIndex: fileInfo.layerIndex },
                update: {
                    name: fileInfo.name,
                    bitmap: bitmapBuffer,
                    width,
                    height,
                    isConnectionLayer: fileInfo.isConnectionLayer,
                },
                create: {
                    layerIndex: fileInfo.layerIndex,
                    name: fileInfo.name,
                    bitmap: bitmapBuffer,
                    width,
                    height,
                    isConnectionLayer: fileInfo.isConnectionLayer,
                },
            });

            console.log(`Processed ${filename} as layer ${fileInfo.layerIndex}`);
        } catch (error) {
            console.error(`Error processing file ${filename}:`, error);
        }
    }

    private parseFilename(filename: string): {
        layerIndex: number;
        name: string;
        isConnectionLayer: boolean;
    } | null {
        // Remove extension
        const baseName = filename.replace(/\.bmp$/i, '');

        // Parse floor file: floor_1_main.bmp → { layerIndex: 1, name: "main", isConnectionLayer: false }
        const floorMatch = baseName.match(/^floor_(\d+)_(.+)$/);
        if (floorMatch) {
            return {
                layerIndex: parseInt(floorMatch[1]) * 2, // Use even indices for floors
                name: floorMatch[2].replace(/_/g, ' '),
                isConnectionLayer: false,
            };
        }

        // Parse connection file: connection_1_to_2_stairs.bmp
        const connectionMatch = baseName.match(/^connection_(\d+)_to_(\d+)_(.+)$/);
        if (connectionMatch) {
            const lowerFloor = parseInt(connectionMatch[1]);
            return {
                layerIndex: lowerFloor * 2 + 1, // Use odd indices for connections
                name: connectionMatch[3].replace(/_/g, ' '),
                isConnectionLayer: true,
            };
        }

        return null;
    }

    private bitmapToGrid(bmpData: Buffer): { grid: boolean[][]; width: number; height: number } {
        // Read BMP width and height from header
        const width = bmpData.readInt32LE(18);
        const height = bmpData.readInt32LE(22);

        // Create a grid based on the bitmap data
        const grid: boolean[][] = Array(height)
            .fill(null)
            .map(() => Array(width).fill(false));

        // Start of pixel data
        const pixelOffset = bmpData.readInt32LE(10);

        // Read pixel data (simplified for monochrome BMPs)
        const rowSize = Math.floor((width + 31) / 32) * 4; // BMP rows are padded to multiples of 4 bytes

        for (let y = 0; y < height; y++) {
            // BMP stores rows bottom-to-top
            const invY = height - 1 - y;

            for (let x = 0; x < width; x++) {
                // For monochrome BMPs, we need to extract bits
                const byteIndex = pixelOffset + invY * rowSize + Math.floor(x / 8);
                const bitOffset = 7 - (x % 8); // BMP bits are ordered from MSB to LSB

                if (byteIndex < bmpData.length) {
                    // If bit is 0, pixel is black (wall); if bit is 1, pixel is white (walkable)
                    grid[y][x] = ((bmpData[byteIndex] >> bitOffset) & 1) === 1;
                }
            }
        }

        return { grid, width, height };
    }
}
