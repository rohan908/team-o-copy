import axios from 'axios';
import { Node } from '../MapClasses/Node.ts';
import { NodeDataType } from '../MapClasses/MapTypes.ts';

export async function findPath(
    startNodeId: number,
    endNodeId: number
): Promise<Node<NodeDataType>[]> {
    try {
        const response = await axios.post(`api/graph/findPath`, {
            startID: startNodeId,
            endID: endNodeId,
        });

        return response.data;

        /* this error handler is buggin
        if (!data.success) {
            throw new Error(data.error || 'Failed to find path');
        }

        // Return just the path array from the result
        return data.result.path;
        */
    } catch (error) {
        console.error('Error finding path:', error);
        throw error;
    }
}
