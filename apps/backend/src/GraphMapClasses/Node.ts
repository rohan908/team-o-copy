// Documentation and Methodology: https://ehizmantutored.hashnode.dev/graph-data-structures-typescript
// Original code is for an directed, unweighted graph and then below has modified for undirected, weighted graph

import { ConnectingNode } from '../models/MapTypes.ts';

export class Node<T extends { id: number }> {
    data: T;
    adjNodes: ConnectingNode<T>[];
    comparator: (a: T, b: T) => number;

    constructor(data: T, comparator: (a: T, b: T) => number) {
        this.data = data;
        this.adjNodes = new Array<ConnectingNode<T>>(); //We are making an adjacency matrix to describe the graph
        this.comparator = comparator;
    }
    /**
     * adds a new node as a neighbor
     * @param {Node<T>}node
     */
    addNewNeighbour(node: Node<T>, weight: number): void {
        const newConnectingNode: ConnectingNode<T> = { destination: node, weight };
        this.adjNodes.push(newConnectingNode);
    }

    /**
     * removes a node from the list of neighbors
     * @param {T} data
     * @returns {Node<T>| null}
     */
    removeNeighbour(data: T): Node<T> | null {
        const index: number = this.adjNodes.findIndex(
            (edge: ConnectingNode<T>) => this.comparator(edge.destination.data, data) == 0
        );
        if (index != -1) {
            return this.adjNodes.splice(index, 1)[0].destination;
        }
        return null;
    }
}

/* example code on use
const graph: Graph<number> = new Graph<number>(comparator, 1);
graph.addEdge(1, 2);
*/
