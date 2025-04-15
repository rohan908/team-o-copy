// defines the fields of a directory node item
export interface DirectoryNodeItem {
    id: number;
    x: number;
    y: number;
    floor: number;
    mapId: number;
    name: string;
    description: string;
    nodeType: string;
    connectingNodes: number[];
}
