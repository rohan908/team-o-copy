import {Node} from "./Node.ts";
import {ConnectingNode} from "../models/MapTypes.ts";


export class Graph<T extends {id : number}> {
  nodes: Map<number, Node<T>> = new Map<number, Node<T>>(); //maps the node ids to the nodes, change from previous version that mapped NodeDataType
  comparator: (a: T, b: T) => number;
  root: Node<T>;

  constructor(comparator: (a: T, b: T) => number, data: T) {
    this.comparator = comparator;
    this.root = new Node<T>(data, comparator);
    this.nodes.set(data.id, this.root);
  }

  /**
   * adds a new node to the graph AND updates a node if it already exists with the new data
   * @param {T} data
   * @returns {Node<T>}
   */
  addNewNode(data: T): Node<T> {
    let node = this.nodes.get(data.id);
    // if the node is already in the graph, then there is no need to build it
    if (node != null) {
      this.nodes.set(data.id, node);
      return node;
    }
    // if the node is not already in the graph, then create a node and set the node into the map of nodes
    node = new Node(data, this.comparator);
    this.nodes.set(data.id, node);
    return node;
  }

  /**
   * get a node from a graph using ID, used to ensure SOLID principle
   * @param {number} id
   * @returns {Node<T> | null}
   */

  getNodeById(id : number): Node<T> | undefined {
    return this.nodes.get(id);
  }

  /**
   * remove a node from the graph
   * @param {T} data
   * @returns {Node<T> | null}
   */

  removeNode(data: T) {
    let nodeToRemove = this.nodes.get(data.id);
    if (nodeToRemove){ //if node is not undefined
      nodeToRemove.adjNodes.forEach((edge: ConnectingNode<T>) => { //bc undirected, we can just look at the nodToRemove's adjacent nodes
        // remove notToRemove from each adjacent node
        edge.destination.removeNeighbour(nodeToRemove.data)
      })
    }

    this.nodes.delete(data.id);
    return nodeToRemove;
  }

  /**
   * add an edge to the graph
   * @param source
   * @param destination
   * @param weight
   */
  addEdge(source: T, destination: T, weight: number): void {
    let sourceNode: Node<T> = this.addNewNode(source);
    let destinationNode: Node<T> = this.addNewNode(destination);

    // adds the connection neighbors of both nodes to eachother
    sourceNode.addNewNeighbour(destinationNode, weight);
    destinationNode.addNewNeighbour(sourceNode, weight);
  }

  /**
   * remove an edge from the graph
   * @param source
   * @param destination
   */
  removeEdge(source: T, destination: T): void {
    //get the source node
    let sourceNode: Node<T> | undefined = this.nodes.get(source.id);
    //get the destination node
    let destinationNode: Node<T> | undefined =
      this.nodes.get(destination.id);

    //remove the destination from the list of adjacent nodes on the source node
    if (sourceNode && destinationNode) {
      sourceNode.removeNeighbour(destinationNode.data);
      destinationNode.removeNeighbour(sourceNode.data);
    }
  }
}


