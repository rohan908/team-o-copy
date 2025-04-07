import { FloorMap, NavigationNode } from '../models/types';
import { BitmapService } from './BitmapService';

export class NavigationGridBuilder {
    private bitmapService: BitmapService;

    constructor() {
        this.bitmapService = new BitmapService();
    }

    /**
     * Builds a 3D navigation grid from all layers (floors and connection layers)
     * @param layers Array of all layers (floors and connection layers)
     * @returns 3D grid of NavigationNodes
     */
    public buildNavigationGrid(layers: FloorMap[]): NavigationNode[][][] {
        // Sort layers by their index to ensure correct vertical ordering
        const sortedLayers = [...layers].sort((a, b) => a.layerIndex - b.layerIndex);

        // Initialize 3D grid
        const grid: NavigationNode[][][] = [];

        // Create grid for each layer
        sortedLayers.forEach(layer => {
            const layerGrid = this.createLayerGrid(layer);

            // Store grid at the appropriate z-index
            while (grid.length <= layer.layerIndex) {
                grid.push([]); // Add placeholder layers if needed
            }
            grid[layer.layerIndex] = layerGrid;
        });

        return grid;
    }

    /**
     * Creates a 2D grid of NavigationNodes for a single layer
     */
    private createLayerGrid(layer: FloorMap): NavigationNode[][] {
        const { width, height, layerIndex } = layer;
        const walkableGrid = this.bitmapService.decodeBitmap(layer);

        // Convert boolean grid to NavigationNode grid
        const layerGrid: NavigationNode[][] = [];

        for (let y = 0; y < height; y++) {
            layerGrid[y] = [];
            for (let x = 0; x < width; x++) {
                layerGrid[y][x] = {
                    x,
                    y,
                    z: layerIndex,
                    isWalkable: walkableGrid[y][x]
                };
            }
        }

        return layerGrid;
    }
}