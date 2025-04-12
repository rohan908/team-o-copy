// Documentation and Methodology: https://ehizmantutored.hashnode.dev/graph-data-structures-typescript
import {NodeDataType} from "../models/MapTypes.ts";


export class Node<NodeDataType> {
  data: NodeDataType;
  adjNodes: Node<NodeDataType>[];
  comparator: (a: NodeDataType, b: NodeDataType) => number;

  constructor(data: NodeDataType, comparator: (a: NodeDataType, b: NodeDataType) => number) {
    this.data = data;
    this.adjNodes = new Array<Node<NodeDataType>>(); //We are making an adjacency matrix to describe the graph
    this.comparator = comparator;
  }
  /**
   * adds a new node as a neighbor
   * @param {Node<NodeDataType>}node
   */
  addNewNeighbour(node: Node<NodeDataType>): void {
    this.adjNodes.push(node);
  }

  /**
   * removes a node from the list of neighbors
   * @param {NodeDataType} data
   * @returns {Node<NodeDataType>| null}
   */
  removeNeighbour(data: NodeDataType): Node<NodeDataType> | null {
    let index = this.adjNodes.findIndex(
      (node) => this.comparator(node.data, data) == 0
    );
    if (index != -1) {
      return this.adjNodes.splice(index, 1)[0];
    }
    return null;
  }
}


/* example code on use
const graph: Graph<number> = new Graph<number>(comparator, 1);
graph.addEdge(1, 2);
*/
