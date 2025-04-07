export interface Coordinate {
    // absolute pixel coordinate of the image stack including connection layers
    x: number;
    y: number;
    z: number;
}

export interface NavigationNode extends Coordinate {
    isWalkable: boolean;
}

export interface FloorMap {
    id: number; // unique ID for each map
    layerIndex: number; // the index position of the map within the vertical stack
    name: string; //
    isConnectionLayer: boolean;
    bitmap: Buffer;
    width: number;
    height: number;
}

export interface PathFindingResult {
    path: Coordinate[]; // List of pixel coordinates that make up the path
    distance: number; // the length of the path in pixels
    layersTraversed: number[]; // the layer numbers the path traverses for example [1, 2, 3]
}