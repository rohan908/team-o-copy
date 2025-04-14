import { Node } from './Node.ts';

export interface NodeDataType {
    x: number;
    y: number;
    floor: number;
    nodeType: string;
    name?: string;
    id: number;
    description?: string;
}

export interface ConnectingNode<T extends { id: number }> {
    destination: Node<T>;
    weight: number;
}

export interface PathFinderResult {
    pathIDs: number[];
    distance: number; //summation of the weights
    success?: boolean;
}
