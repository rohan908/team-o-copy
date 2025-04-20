import { GetNodeResult, NodeDataType, PathFinderResult } from '../models/MapTypes.ts';
import { Graph } from './Graph.ts';
import { PathFinder } from './PathFinder.ts';
import { BFSPathFinder } from './PathFinders/BFSPathFinder.ts';
import { AStarPathFinder } from './PathFinders/AStarPathFinder.ts';
import { DFSPathFinder } from './PathFinders/DFSPathFinder.ts';

import PrismaClient from '../bin/prisma-client.ts';
import graph from '../routes/Graph.ts';

export class NavigationService {
    protected graph: Graph<NodeDataType>;
    private pathFinder: PathFinder;

    constructor() {
        this.graph = new Graph<NodeDataType>(this.nodeComparator);
        const graphRef = () => this.graph;
        this.pathFinder = new BFSPathFinder(graphRef);
    }

    public async initialize(): Promise<void> {
        const databaseNodes = await PrismaClient.node.findMany({});
        const databaseEdges = await PrismaClient.edge.findMany({});

        databaseNodes.forEach((databaseNode) => {
            this.executeGraphCommand('nodeAdd', databaseNode);
        });

        databaseEdges.forEach((databaseEdge) => {
            const node1 = this.graph.getNodeById(databaseEdge.nodes[0]);
            const node2 = this.graph.getNodeById(databaseEdge.nodes[1]);
            if (node1?.data !== undefined) {
                this.executeGraphCommand('edgeAdd', node1?.data, node2?.data, databaseEdge.weight);
            }
        });
    }

    public setPathFinderAlgo(pathAlgo: string) {
        if (
            (pathAlgo === 'BFS' && this.pathFinder instanceof BFSPathFinder) ||
            (pathAlgo === 'A*' && this.pathFinder instanceof AStarPathFinder) ||
            (pathAlgo === 'DFS' && this.pathFinder instanceof DFSPathFinder)
        ) {
            return;
        } //dont want to make new objects for now reason

        const graphRef = () => this.graph;
        switch (pathAlgo) {
            case 'BFS':
                this.pathFinder = new BFSPathFinder(graphRef);
                break;
            case 'A*':
                this.pathFinder = new AStarPathFinder(graphRef);
                break;
          case 'DFS':
                this.pathFinder = new DFSPathFinder(graphRef);
                break;
            default:
                throw new Error(`Unknown pathfinder algorithm: ${pathAlgo}`);
        }
    }

    private nodeComparator(node1: NodeDataType, node2: NodeDataType): number {
        return node1.id === node2.id ? 0 : 1;
    }

    // parses commands from the front end to change the backend graph, also used for initial population
    public executeGraphCommand(
        commandType: string,
        node1: NodeDataType,
        node2ForEdge?: NodeDataType,
        weightForEdgeAdd?: number
    ) {
        switch (commandType) {
            case 'nodeAdd':
                this.graph.addNewNode(node1);
                break;
            case 'nodeUpdate':
                this.graph.addNewNode(node1);
                break;
            case 'nodeRemove':
                this.graph.removeNode(node1);
                break;
            case 'edgeAdd':
                this.graph.addEdge(node1, node2ForEdge!, weightForEdgeAdd!);
                break;
            case 'edgeRemove':
                this.graph.removeEdge(node1, node2ForEdge!);
                break;
            default:
                console.error('graph command DNE');
        }
    }

    public findPath(startNodeId: number, endNodeId: number, pathAlgo: string): PathFinderResult {
        this.setPathFinderAlgo(pathAlgo);
        return this.pathFinder.findPath(startNodeId, endNodeId);
    }

    public getNode(nodeId: number): GetNodeResult {
        const node = this.graph.getNodeById(nodeId);
        return {
            node,
            success: node !== undefined,
        };
    }
}
