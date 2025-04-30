// creates types for Navigation Context
export interface NavSelectionItem {
    HospitalName: string | null;
    Department: string | null;
    AlgorithmChange: boolean | null;
    Floor: number | null; // Might be useful for preserving floor selection state between pages
}

// creates types for a single row of the language request table
export interface PathItem {
    NodeIds: number[];
}
