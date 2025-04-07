import PrismaClient from '../bin/prisma-client';
import { Coordinate, FloorMap, PathFindingResult, NavigationNode } from '../models/types';
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
            const layers: FloorMap[] = prismaLayers.map(layer => ({
                ...layer,
                bitmap: Buffer.from(layer.bitmap)
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
}