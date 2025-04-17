import { Node } from './Node.ts';

export interface NodeDataType {
    x: number;
    y: number;
    floor: number;
    nodeType: string;
    name?: string;
    id: number;
    description?: string;
    connectingNodes: number[];
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

// Pass in props for the selected hospital and department
// TODO: change this to a useContext
export interface DraggableMapProps {
    selectedHospitalName?: string | null;
    selectedDepartment?: string | null;
    setSelectedDepartment: (selectedDepartment: string | null) => void;
    setSelectedHospitalName: (selectedHospitalName: string | null) => void;
}
