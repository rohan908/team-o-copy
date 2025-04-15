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
    id: number;
    layerIndex: number; // Sequential index in the 3D grid
    name: string;
    isConnectionLayer: boolean; // True if this is a connection layer between floors
    bitmap: Buffer;
    width: number;
    height: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface PathFindingResult {
    path: Coordinate[]; // List of pixel coordinates that make up the path
    distance: number; // the length of the path in pixels
    layersTraversed: number[]; // the layer numbers the path traverses for example [1, 2, 3]
}
