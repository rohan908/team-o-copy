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
            console.log('inner for loop ', connectingNode.destination);
            const result: PathFinderResult = this.dfs(
                target,
                connectingNode.destination,
                new Set(visited) //less efficent but allows to recheck nodes if theres a shortcut- usefull for the skybrige
            );

            if (result.success) {
                console.log('current.data.id', current.data.id);
                console.log('result.pathIDs', result.pathIDs);
                //calculate the distance from the current id to the most recent one in the result stack
                console.log(
                    'search for path with start in list of current.adjNodes: ',
                    current.adjNodes
                );
                console.log(
                    'the fist index in that list is',
                    current.adjNodes[0].destination.data.id
                );
                console.log('searh for path with end result.pathIDs[0]', result.pathIDs[0]);

                const distance = current.adjNodes.find(
                    (adjNodes) => adjNodes.destination.data.id === result.pathIDs[0]
                );

                console.log('distance', distance);

                return {
                    success: true,
                    pathIDs: [current.data.id, ...result.pathIDs], //reorder nodes here so no reorder function cuz js of overpowered somtimes
                    distance: result.distance + distance!.weight,
                };
            } //else, just end
        }

        return { success: false, pathIDs: [], distance: 0 };
    }
}
