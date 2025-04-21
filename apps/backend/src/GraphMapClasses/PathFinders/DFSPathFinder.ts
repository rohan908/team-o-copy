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
        const visited: Set<Node<NodeDataType>> = new Set(); //constct visited set

        // start recursive call
        return this.dfs(endNode, startNode, visited);
    }

    //recursively search child nodes
    private dfs(
        target: Node<NodeDataType>,
        current: Node<NodeDataType>,
        visited: Set<Node<NodeDataType>>
    ): PathFinderResult {
        if (visited.has(current)) {
            //break if already visited
            return { success: false, pathIDs: [], distance: 0 };
        }

        visited.add(current);

        if (target === current) {
            //break with success if this is the trage node
            return { success: true, pathIDs: [current.data.id], distance: 0 };
        }

        //for each child run this
        for (const connectingNode of current.adjNodes) {
            const result: PathFinderResult = this.dfs(
                target,
                connectingNode.destination,
                new Set(visited) //less efficent but allows to recheck nodes if theres a shortcut- usefull for the skybrige
            );

            //once we have found the targe, construct the path as we exit the call stack
            if (result.success) {
                //calculate the distance from the current id to the most recent one in the result stack, i fucking love js sometimes
                const connectingEadge = current.adjNodes.find(
                    (adjNodes) => adjNodes.destination.data.id === result.pathIDs[0]
                );
                return {
                    success: true,
                    pathIDs: [current.data.id, ...result.pathIDs], //reorder nodes here so no reorder function cuz js of overpowered somtimes
                    distance: result.distance + connectingEadge!.weight,
                };
            }
        }
        return { success: false, pathIDs: [], distance: 0 };
    }
}
