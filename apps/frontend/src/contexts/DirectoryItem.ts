// creates types for a single row of the node table, for only directory nodes
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

// creates types for a single row of the language request table
export interface LanguageRequestItem {
    requestID: number;
    room: string;
    createdAt: string;
    date: string;
    time: string;
    language: string;
    description: string;
}
