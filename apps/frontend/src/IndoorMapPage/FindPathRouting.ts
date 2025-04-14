import axios from 'axios';
import { Node } from './MapClasses/Node.ts';
import { NodeDataType } from './MapClasses/MapTypes.ts';

export async function findPath(
    startNode: Node<NodeDataType>,
    endNode: Node<NodeDataType>,
    pathFindingType: string
): Promise<Node<NodeDataType>[]> {
    try {
        const response = await axios.post('http://localhost:3001/graph/findPath', {
            startNodeId: startNode.getId(), 
            endNodeId: endNode.getId(),
            algoType: pathFindingType,
        });

        const data = response.data;

        if (!data.success) {
            throw new Error(data.error || 'Failed to find path');
        }

        // Return just the path array from the result
        return data.result.path;
    } catch (error) {
        console.error('Error finding path:', error);
        throw error;
    }
}
