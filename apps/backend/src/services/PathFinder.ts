import { Coordinate, NavigationNode, PathFindingResult } from '../models/types';

export class PathFinder {
    private navigationGrid: NavigationNode[][][];

    constructor(navigationGrid: NavigationNode[][][]) {
        this.navigationGrid = navigationGrid;
    }

    /**
     * Finds a path between two points using 3D BFS algorithm
     * @param start Starting coordinate
     * @param end Ending coordinate
     * @returns Result containing the path and additional information
     */
    public findPath(start: Coordinate, end: Coordinate): PathFindingResult {
        // Queue for BFS
        const queue: Coordinate[] = [start];

        // Track visited nodes to avoid cycles
        const visited: Set<string> = new Set<string>();
        this.markVisited(visited, start);

        // Track path for reconstruction
        const previous: Map<string, Coordinate> = new Map<string, Coordinate>();

        // Search using BFS
        while (queue.length > 0) {
            const current: Coordinate = queue.shift()!;

            // Check if we've reached the destination
            if (this.isSameCoordinate(current, end)) {
                return this.reconstructPath(previous, end);
            }

            // Get all possible moves from current position (including vertical)
            const neighbors: Coordinate[] = this.getNeighbors(current);

            for (const neighbor of neighbors) {
                const key: string = this.getCoordinateKey(neighbor);

                if (!visited.has(key)) {
                    this.markVisited(visited, neighbor);
                    previous.set(key, current);
                    queue.push(neighbor);
                }
            }
        }

        // No path found
        return { path: [], distance: -1, layersTraversed: [] };
    }

    /**
     * Gets all valid neighboring coordinates from a given position
     * (horizontal and vertical directions)
     * @param coord Current coordinate
     * @returns Array of valid neighboring coordinates
     */
    private getNeighbors(coord: Coordinate): Coordinate[] {
        const { x, y, z } = coord;
        const neighbors: Coordinate[] = [];

        // All six possible directions in 3D space
        const directions: { dx: number; dy: number; dz: number }[] = [
            { dx: 0, dy: -1, dz: 0 }, // North
            { dx: 1, dy: 0, dz: 0 }, // East
            { dx: 0, dy: 1, dz: 0 }, // South
            { dx: -1, dy: 0, dz: 0 }, // West
            { dx: 0, dy: 0, dz: 1 }, // Up
            { dx: 0, dy: 0, dz: -1 }, // Down
        ];

        // Check all six directions
        for (const { dx, dy, dz } of directions) {
            const newX: number = x + dx;
            const newY: number = y + dy;
            const newZ: number = z + dz;

            if (this.isWalkable(newX, newY, newZ)) {
                neighbors.push({ x: newX, y: newY, z: newZ });
            }
        }

        return neighbors;
    }

    /**
     * Checks if a coordinate is walkable
     * @returns True if the coordinate is walkable, false otherwise
     */
    private isWalkable(x: number, y: number, z: number): boolean {
        const node: NavigationNode | null = this.getNode(x, y, z);
        return !!node?.isWalkable;
    }

    /**
     * Gets a node from the navigation grid
     * @returns The navigation node at the specified coordinate, or null if not found
     */
    private getNode(x: number, y: number, z: number): NavigationNode | null {
        const layerGrid: NavigationNode[][] | undefined = this.navigationGrid[z];
        if (!layerGrid || !layerGrid[y] || !layerGrid[y][x]) {
            return null;
        }
        return layerGrid[y][x];
    }

    /**
     * Marks a coordinate as visited
     */
    private markVisited(visited: Set<string>, coord: Coordinate): void {
        visited.add(this.getCoordinateKey(coord));
    }

    /**
     * Creates a unique key for a coordinate
     * @returns String representation of the coordinate
     */
    private getCoordinateKey(coord: Coordinate): string {
        return `${coord.x},${coord.y},${coord.z}`;
    }

    /**
     * Checks if two coordinates are the same
     * @returns True if the coordinates are the same, false otherwise
     */
    private isSameCoordinate(a: Coordinate, b: Coordinate): boolean {
        return a.x === b.x && a.y === b.y && a.z === b.z;
    }

    /**
     * Reconstructs the path from the end point to the start point
     * @returns Result containing the path and additional information
     */
    private reconstructPath(previous: Map<string, Coordinate>, end: Coordinate): PathFindingResult {
        const path: Coordinate[] = [end];
        let current: Coordinate = end;
        let distance: number = 0;
        const layersTraversed: Set<number> = new Set<number>([end.z]);

        while (previous.has(this.getCoordinateKey(current))) {
            current = previous.get(this.getCoordinateKey(current))!;
            path.unshift(current);
            distance++;
            layersTraversed.add(current.z);
        }

        return {
            path,
            distance,
            layersTraversed: Array.from(layersTraversed),
        };
    }
}