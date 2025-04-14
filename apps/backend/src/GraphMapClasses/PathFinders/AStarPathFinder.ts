import { ConnectingNode, NodeDataType, PathFinderResult } from '../../models/MapTypes';
import { Graph } from '../Graph';
import { PathFinder } from '../PathFinder';
import { Node } from '../Node';

// Implementation from Bryan's JS implementatino for graphs and manhattan heuristic instead of euclidean, uses crazh ahhh binary heap
//https://github.com/bgrins/javascript-astar/blob/master/astar.js

interface AStarNode {
    node: Node<NodeDataType>;
    f: number; // total cost (g + h)
    g: number; // cost from start to this node
    h: number; // euclidean heuristic (could be fast sqrt approx in future)
    parent: AStarNode | null;
    edgeWeightToParent?: number;
}

class BinaryHeap {
    private content: AStarNode[] = [];

    constructor() {}

    push(node: AStarNode): void {
        // Add the new element to the end of the array.
        this.content.push(node);
        // Allow it to sink down.
        this.sinkDown(this.content.length - 1);
    }

    pop(): AStarNode | undefined {
        // Store the first element so we can return it later.
        const result = this.content[0];
        // Get the element at the end of the array.
        const end = this.content.pop();
        // If there are any elements left, put the end element at the start, and let it bubble up.
        if (this.content.length > 0 && end) {
            this.content[0] = end;
            this.bubbleUp(0);
        }
        return result;
    }
    // got rid of the remove method bc it wasnt needed

    size(): number {
        return this.content.length;
    }

    private sinkDown(n: number): void {
        // Fetch the element that needs to be sunk.
        const element = this.content[n];
        while (n > 0) {
            // Compute the parent element's index, and fetch it.
            const parentN = ((n + 1) >> 1) - 1;
            const parent = this.content[parentN];
            // Swap the elements if the parent is greater.
            if (element.f < parent.f) {
                this.content[parentN] = element;
                this.content[n] = parent;
                // Update 'n' to continue at the new position.
                n = parentN;
            } // Found a parent that is less, no need to sink further.
            else {
                break;
            }
        }
    }

    private bubbleUp(n: number): void {
        // Look up the target element and its score.
        const length = this.content.length;
        const element = this.content[n];
        const elemScore = element.f;

        while (true) {
            // Compute the indices of the child elements.
            const child2N = (n + 1) << 1;
            const child1N = child2N - 1;
            // This is used to store the new position of the element, if any.
            let swap: number | null = null;
            let child1Score: number;

            if (child1N < length) {
                //Look it up and compute its score.
                const child1 = this.content[child1N];
                child1Score = child1.f;

                // If the score is less than our element's, we need to swap.
                if (child1Score < elemScore) {
                    swap = child1N;
                }
            }

            // Do the same checks for the other child.
            if (child2N < length) {
                const child2 = this.content[child2N];
                if (child2.f < (swap === null ? elemScore : this.content[child1N].f)) {
                    swap = child2N;
                }
            }

            //If the element needs to be moved, swap it, and continue.
            if (swap !== null) {
                this.content[n] = this.content[swap];
                this.content[swap] = element;
                n = swap;
            } else {
                // Otherwise, we are done.
                break;
            }
        }
    }
}

export class AStarPathFinder extends PathFinder {
    constructor(graphRef: () => Graph<NodeDataType>) {
        super(graphRef);
    }

    private calculateHeuristic(node1: NodeDataType, node2: NodeDataType): number {
        // fake euclidean distance
        const dx = node1.x - node2.x;
        const dy = node1.y - node2.y;
        const dz = (node1.floor - node2.floor) * 50; //fake heuristic but it should work for multiple floors
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    /**
     * Perform an A* Search on a graph given a start and end node id
     * @param startNodeId start
     * @param endNodeId end
     */
    public findPath(startNodeId: number, endNodeId: number): PathFinderResult {
        const graph: Graph<NodeDataType> = this.graphRef();
        const startNode: Node<NodeDataType> | undefined = graph.getNodeById(startNodeId);
        const endNode: Node<NodeDataType> | undefined = graph.getNodeById(endNodeId);

        if (!startNode || !endNode) {
            return { success: false, pathIDs: [], distance: 0 };
        }

        const openHeap = new BinaryHeap();
        const closedSet = new Set<number>();
        const nodeMap = new Map<number, AStarNode>();

        // Initialize start node
        const closestNode: AStarNode = {
            node: startNode,
            g: 0,
            h: this.calculateHeuristic(startNode.data, endNode.data),
            f: 0,
            parent: null,
        };
        closestNode.f = closestNode.g + closestNode.h;

        openHeap.push(closestNode);
        nodeMap.set(startNode.data.id, closestNode);

        while (openHeap.size() > 0) {
            // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
            const current = openHeap.pop()!;

            // End case -- result has been found, return the traced path.
            if (current.node.data.id === endNodeId) {
                return this.reconstructPath(current);
            }

            // Normal case -- move currentNode from open to closed, process each of its neighbors.
            closedSet.add(current.node.data.id);

            // Find all neighbors for the current node.
            for (const edgeToNeighbor of current.node.adjNodes) {
                const neighbor: Node<NodeDataType> = edgeToNeighbor.destination;

                if (closedSet.has(neighbor.data.id)) {
                    // Not a valid node to process, skip to next neighbor.
                    continue;
                }

                // The g score is the shortest distance from start to current node.
                // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
                const gScore: number = current.g + edgeToNeighbor.weight;
                let previouslySeenNeighbor: AStarNode | undefined = nodeMap.get(neighbor.data.id); //checks if a node was visited, if it was not visited then its not in the map and thus it returns false when searched for bc its undefined
                const isBetter = previouslySeenNeighbor ? gScore < previouslySeenNeighbor.g : true;

                if (isBetter) {
                    // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
                    if (!previouslySeenNeighbor) {
                        previouslySeenNeighbor = {
                            node: neighbor,
                            g: gScore,
                            h: this.calculateHeuristic(neighbor.data, endNode.data),
                            f: 0,
                            parent: current,
                            edgeWeightToParent: edgeToNeighbor.weight,
                        };
                        previouslySeenNeighbor.f =
                            previouslySeenNeighbor.g + previouslySeenNeighbor.h;
                        nodeMap.set(neighbor.data.id, previouslySeenNeighbor);
                        openHeap.push(previouslySeenNeighbor);
                    } else {
                        // Already seen the node, but since it has been rescored we need to reorder it in the heap
                        previouslySeenNeighbor.g = gScore;
                        previouslySeenNeighbor.f = gScore + previouslySeenNeighbor.h;
                        previouslySeenNeighbor.parent = current;
                        previouslySeenNeighbor.edgeWeightToParent = edgeToNeighbor.weight;
                    }
                }
            }
        }

        return { success: false, pathIDs: [], distance: 0 };
    }

    private reconstructPath(endAStarNode: AStarNode): PathFinderResult {
        const path: number[] = [];
        let current: AStarNode | null = endAStarNode;
        let totalDistance = 0;

        while (current) {
            path.unshift(current.node.data.id);
            if (current.edgeWeightToParent) {
                totalDistance += current.edgeWeightToParent;
            }
            current = current.parent;
        }

        return {
            success: true,
            pathIDs: path,
            distance: totalDistance,
        };
    }
}
