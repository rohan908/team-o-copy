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
    bfs(endNode, startNode)

   }

   //check if
   private bfs( target: Node<NodeDataType>, current: Node<NodeDataType> ) {
      if (target == current){
        return {success: true, pathIDs: current, distance: 0 }
      } else {
        current.adjNodes.forEach((connectingNode: ConnectingNode<NodeDataType>) => {
            const result: PathFinderResult  = bfs(target: Node<NodeDataType>, connectingNode)
            if (result.success) {
                result.pathIDs.push(connectingNode.getID())
                result.distance = result.distance + 1;
            }
        })
      }
   }
}
