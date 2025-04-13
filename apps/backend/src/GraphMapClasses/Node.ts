// Documentation and Methodology: https://ehizmantutored.hashnode.dev/graph-data-structures-typescript
// Original code is for an directed, unweighted graph and then below has modified for directed, weighted graph

export interface ConnectingNode<T> {
    destination: Node<T>;
    weight: number;
}

export class Node<T> {
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
        let newConnectingNode: ConnectingNode<T> = { destination: node, weight };
        this.adjNodes.push(newConnectingNode);
    }

    /**
     * removes a node from the list of neighbors
     * @param {T} data
     * @returns {Node<T>| null}
     */
    removeNeighbour(data: T): Node<T> | null {
        let index: number = this.adjNodes.findIndex(
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
