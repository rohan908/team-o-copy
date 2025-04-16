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
    employeeName: string;
    department: string;
    createdAt: string;
    date: string;
    time: string;
    priority: string;
    status: string;
    language: string;
    description: string;
}

// creates types for a single row of the sanitation request table
export interface SanitationRequestItem {
    requestID: number;
    employeeName: string;
    department: string;
    createdAt: string;
    date: string;
    time: string;
    priority: string;
    status: string;
    cleanupType: string;
    description: string;
}

// creates types for a single row of the security request table
export interface SecurityRequestItem {
    requestID: number;
    employeeName: string;
    department: string;
    createdAt: string;
    date: string;
    time: string;
    priority: string;
    status: string;
    security: string;
    description: string;
}

// creates types for a single row of the maintenance request table
export interface MaintenanceRequestItem {
    requestID: number;
    employeeName: string;
    department: string;
    createdAt: string;
    date: string;
    time: string;
    priority: string;
    status: string;
    maintenanceType: string;
    description: string;
}
