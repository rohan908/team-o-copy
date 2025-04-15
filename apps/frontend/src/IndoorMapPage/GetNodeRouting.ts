import axios from 'axios';
import { Node } from './MapClasses/Node.ts';
import { NodeDataType } from './MapClasses/MapTypes.ts';

export async function getNode(nodeId: number): Promise<Node<NodeDataType>> {
    try {
        const response = await axios.post(`api/graph/getNode`, {
            nodeId: nodeId,
        });

        return response.data;
    } catch (error) {
        console.error('Error finding path:', error);
        throw error;
    }
}
