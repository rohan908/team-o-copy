import { ConnectingNode, NodeDataType, PathFinderResult } from '../../models/MapTypes';
import { Graph } from '../Graph';
import { PathFinder } from '../PathFinder';
import { Node } from '../Node';

export class DFSPathFinder extends PathFinder {
    constructor(graphRef: () => Graph<NodeDataType>) {
        super(graphRef);
    }
    findPath(startNodeId: number, endNodeId: number): PathFinderResult {
        const graph: Graph<NodeDataType> = this.graphRef(); // we store locally at the start of the funciton since the graph won't change while doing the path planning operations
        const startNode = graph.getNodeById(startNodeId); //note: do not define type bc graph and nodes use generics
        const endNode = graph.getNodeById(endNodeId);

        if (!startNode || !endNode) {
            console.error('start or end node DNE');
            return { success: false, pathIDs: [], distance: 0 };
        }
        const visited: Set<Node<NodeDataType>> = new Set();
        return this.dfs(endNode, startNode, visited);
    }

    //check if
    private dfs(
        target: Node<NodeDataType>,
        current: Node<NodeDataType>,
        visited: Set<Node<NodeDataType>>
    ): PathFinderResult {
        if (visited.has(current)) {
            return { success: false, pathIDs: [], distance: 0 };
        }

        visited.add(current);

        if (target === current) {
            return { success: true, pathIDs: [current.data.id], distance: 0 };
        }
        for (const connectingNode of current.adjNodes) {
            const result: PathFinderResult = this.dfs(
                target,
                connectingNode.destination,
                new Set(visited) //less efficent but allows to recheck nodes if theres a shortcut- usefull for the skybrige
            );

            if (result.success) {
                //calculate the distance from the current id to the most recent one in the result stack, i fucking love js sometimes
                const connectingEadge = current.adjNodes.find(
                    (adjNodes) => adjNodes.destination.data.id === result.pathIDs[0]
                );
                console.log('-----------ran DFS--------');
                return {
                    success: true,
                    pathIDs: [current.data.id, ...result.pathIDs], //reorder nodes here so no reorder function cuz js of overpowered somtimes
                    distance: result.distance + connectingEadge!.weight,
                };
            } //else, just end
        }

        return { success: false, pathIDs: [], distance: 0 };
    }
}
