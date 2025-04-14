import { FloorMap } from '../models/oldMapTypes.ts';

export class BitmapService {
    /**
     * Decodes a binary bitmap from the database into a 2D boolean grid
     * @param floorMap The floor map data from the database
     * @returns 2D grid where true = walkable, false = wall/obstacle
     */
    public decodeBitmap(floorMap: FloorMap): boolean[][] {
        const { bitmap, width, height } = floorMap;
        const grid: boolean[][] = Array(height)
            .fill(null)
            .map(() => Array(width).fill(false));

        // Assuming bitmap is stored as a buffer of bits where:
        // 1 = walkable space, 0 = wall/obstacle
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const byteIndex = Math.floor((y * width + x) / 8);
                const bitIndex = (y * width + x) % 8;

                if (byteIndex < bitmap.length) {
                    // Check if the bit is set (walkable)
                    grid[y][x] = ((bitmap[byteIndex] >> (7 - bitIndex)) & 1) === 1;
                }
            }
        }

        return grid;
    }

    /**
     * Encodes a 2D boolean grid into a binary bitmap for database storage
     * @param grid 2D grid where true = walkable, false = wall/obstacle
     * @param width Width of the grid
     * @param height Height of the grid
     * @returns Buffer containing the bitmap data
     */
    public encodeBitmap(grid: boolean[][], width: number, height: number): Buffer {
        const bufferSize = Math.ceil((width * height) / 8);
        const buffer = Buffer.alloc(bufferSize, 0);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (grid[y][x]) {
                    // Set the corresponding bit if the cell is walkable
                    const byteIndex = Math.floor((y * width + x) / 8);
                    const bitIndex = (y * width + x) % 8;
                    buffer[byteIndex] |= 1 << (7 - bitIndex);
                }
            }
        }

        return buffer;
    }
}
