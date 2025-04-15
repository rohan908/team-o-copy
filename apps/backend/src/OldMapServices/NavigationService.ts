import PrismaClient from '../bin/prisma-client';
import { Coordinate, FloorMap, PathFindingResult, NavigationNode } from '../models/oldMapTypes.ts';
import { NavigationGridBuilder } from './NavigationGridBuilder';
import { PathFinder } from './PathFinder';

export class NavigationService {
    private navigationGrid: NavigationNode[][][] | null = null;
    private gridBuilder: NavigationGridBuilder;
    private pathFinder: PathFinder | null = null;

    constructor() {
        this.gridBuilder = new NavigationGridBuilder();
    }

    /**
     * Initializes the navigation service by loading all layers and building the grid
     * @returns Promise that resolves when initialization is complete
     */
    public async initialize(): Promise<void> {
        try {
            // Load all layers (floors and connection layers) from database
            const prismaLayers = await PrismaClient.layer.findMany({
                orderBy: { layerIndex: 'asc' },
            });

            // Convert Prisma's Uint8Array to Buffer for each layer
            const layers: FloorMap[] = prismaLayers.map((layer) => ({
                ...layer,
                bitmap: Buffer.from(layer.bitmap),
            }));

            // Build 3D navigation grid
            this.navigationGrid = this.gridBuilder.buildNavigationGrid(layers);

            // Initialize pathfinder with the navigation grid
            this.pathFinder = new PathFinder(this.navigationGrid);

            console.log('Navigation service initialized successfully');
        } catch (error) {
            console.error('Failed to initialize navigation service:', error);
            throw error;
        }
    }

    /**
     * Finds a path between two points in the hospital
     * @param start Starting coordinate
     * @param end Ending coordinate
     * @returns Result containing the path and additional information
     * @throws Error if navigation service is not initialized
     */
    public findPath(start: Coordinate, end: Coordinate): PathFindingResult {
        if (!this.pathFinder || !this.navigationGrid) {
            throw new Error('Navigation service not initialized');
        }

        return this.pathFinder.findPath(start, end);
    }

    /* Debugging for grid generation
    public getDebugInfo(): any {
        if (!this.navigationGrid) {
            return { error: 'Navigation grid not initialized' };
        }

        const walkablePoints: Coordinate[] = [];

        // Find the dimensions of the grid
        const layers = this.navigationGrid.length;
        const height = this.navigationGrid[0]?.length || 0;
        const width = this.navigationGrid[0]?.[0]?.length || 0;

        // Find some sample walkable points
        if (layers > 0 && height > 0 && width > 0) {
            for (let z = 0; z < layers; z++) {
                for (let y = 0; y < height; y++) {
                    for (let x = 0; x < width; x++) {
                        if (this.navigationGrid[z]?.[y]?.[x]?.isWalkable) {
                            walkablePoints.push({ x, y, z });
                            // Only collect up to 10 points per layer
                            if (walkablePoints.length >= 10 * (z + 1)) break;
                        }
                    }
                    if (walkablePoints.length >= 10 * (z + 1)) break;
                }
            }

        }

        return {
            dimensions: { layers, height, width },
            sampleWalkablePoints: walkablePoints,
        };
    }
    */
}
