import {NodeDataType} from "../models/MapTypes.ts";
import {Node} from "./Node.ts";

export class Graph<NodeDataType> {
  nodes: Map<NodeDataType, Node<NodeDataType>> = new Map<NodeDataType, Node<NodeDataType>>();
  comparator: (a: NodeDataType, b: NodeDataType) => number;
  root: Node<NodeDataType>;

  constructor(comparator: (a: NodeDataType, b: NodeDataType) => number, data: NodeDataType) {
    this.comparator = comparator;
    this.root = new Node<NodeDataType>(data, comparator);
  }

  /**
   * adds a new node to the graph
   * @param {NodeDataType} data
   * @returns {Node<NodeDataType>}
   */
  addNewNode(data: NodeDataType): Node<NodeDataType> {
    let node = this.nodes.get(data);
    // if the node is already in the graph, then there is no need to build it
    if (node != null) {
      return node;
    }
    // if the node is not already in the graph, then create a node and set the node into the map of nodes
    node = new Node(data, this.comparator);
    this.nodes.set(data, node);
    return node;
  }

  /**
   * remove a node from the graph
   * @param {NodeDataType} data
   * @returns {Node<NodeDataType> | null}
   */

  removeNode(data: NodeDataType) {
    let nodeToRemove = this.nodes.get(data);

    this.nodes.forEach((node) => {
        // if nodeToRemove is not undefined and if node in graph contains nodeToRemove in list of adjacent nodes
        if (nodeToRemove && node.adjNodes.includes(nodeToRemove)){
          // remove nodeToRemove
          node.removeNeighbour(nodeToRemove.data)
        }
      }
    );
    this.nodes.delete(data);
    return nodeToRemove;
  }

  /**
   * add an edge to the graph
   * @param source
   * @param destination
   */
  addEdge(source: NodeDataType, destination: NodeDataType): void {
    let sourceNode: Node<NodeDataType> = this.addNewNode(source);
    let destinationNode: Node<NodeDataType> = this.addNewNode(destination);

    // add the destination node to the list of adjacent nodes for the destination node.
    sourceNode.addNewNeighbour(destinationNode);
  }

  /**
   * remove an edge from the graph
   * @param source
   * @param destination
   */
  removeEdge(source: NodeDataType, destination: NodeDataType): void {
    //get the source node
    let sourceNode: Node<NodeDataType> | undefined = this.nodes.get(source);
    //get the destination node
    let destinationNode: Node<NodeDataType> | undefined =
      this.nodes.get(destination);

    //remove the destination from the list of adjacent nodes on the source node
    if (sourceNode && destinationNode) {
      sourceNode.removeNeighbour(destinationNode.data);
    }
  }
}

function comparator(a: number, b: number) {
  if (a < b) return -1;

  if (a > b) return 1;

  return 0;
}
