// bfs reconstruction: https://stackoverflow.com/questions/62803211/how-to-reconstruct-paths-using-bfs 

import { ConnectingNode, NodeDataType, PathFinderResult } from "../../models/MapTypes";
import { Graph } from "../Graph";
import { PathFinder } from "../PathFinder";
import {Node} from "../Node";

export class BFSPathFinder extends PathFinder {
  constructor(graphRef: () => Graph<NodeDataType>) {
    super(graphRef);
  }

  findPath(startNodeId: number, endNodeId: number): PathFinderResult {
    const graph  : Graph<NodeDataType> = this.graphRef(); // we store locally at the start of the funciton since the graph won't change while doing the path planning operations
    const startNode = graph.getNodeById(startNodeId); //note: do not define type bc graph and nodes use generics
    const endNode = graph.getNodeById(endNodeId);

    if (!startNode || !endNode) {
      console.error("start or end node DNE");
      return {success: false, pathIDs: [], distance: 0};
    }

    const queue: Node<NodeDataType>[] = [];
    const visited: Set<Node<NodeDataType>> = new Set(); //using a set for no duplicates so i can just add wily nilly  lol
    const previous: Map<Node<NodeDataType>, Node<NodeDataType>> = new Map<Node<NodeDataType>, Node<NodeDataType>>();  //this is for path reconstruction

    queue.push(startNode);
    visited.add(startNode);

    while (queue.length > 0) {
      const currentNode : Node<NodeDataType> | undefined = queue.shift();
      if (currentNode === endNode) {
        // ends it early, so we don't searhc the other branches
        return this.reconstructPath(previous, startNode, endNode);
      }

      currentNode!.adjNodes.forEach((connectingNode : ConnectingNode<NodeDataType>) => {
        if (!visited.has(connectingNode.destination)) {
          visited.add(connectingNode.destination);
          previous.set(connectingNode.destination, currentNode!);
          queue.push(connectingNode.destination);
        }
      });
      
    }

    //if we dind't hit the reconstructPath, then return false
    return {success: false, pathIDs: [], distance: -1};
    
  }

  private reconstructPath(previous: Map<Node<NodeDataType>, Node<NodeDataType>>, startNode: Node<NodeDataType>, endNode: Node<NodeDataType>): PathFinderResult {
    const path: Node<NodeDataType>[] = [];
    let currentNode: Node<NodeDataType> | null = endNode;
    let totDistance : number = 0;

    while (currentNode) {
      path.unshift(currentNode); //adds to front of array, ts has some nifty functions lol
      if (previous.has(currentNode)) {
        const prevNode : Node<NodeDataType> | undefined = previous.get(currentNode);
        // now we need the corresponding edge for the weight
        const edge = prevNode!.adjNodes.find(edge => edge.destination === currentNode);
        if (edge) {
          totDistance = totDistance + edge.weight;
        }
        currentNode = prevNode!;
      } else {
        if (currentNode !== startNode) {
          // i dont think this error checking is necessary, but better safe than sorry
          return { success: false, pathIDs: [], distance: 0 };
        }
        break;
      }
    }

    //now remap nodes to ids for ease of front end transfer
    const pathIDs : number[] = path.map(node => node.data.id);
    return {success: true, pathIDs: pathIDs, distance: totDistance};
  }
}


