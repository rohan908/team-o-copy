import { GetNodeResult, NodeDataType, PathFinderResult } from '../models/MapTypes.ts';
import { Graph } from './Graph.ts';
import { PathFinder } from './PathFinder.ts';
import { BFSPathFinder } from './PathFinders/BFSPathFinder.ts';
import { AStarPathFinder } from './PathFinders/AStarPathFinder.ts';
import { DFSPathFinder } from './PathFinders/DFSPathFinder.ts';

import PrismaClient from '../bin/prisma-client.ts';
import graph from '../routes/Graph.ts';
import { ALGORITHM } from 'common/src/constants.ts';

export class NavigationService {
    protected graph: Graph<NodeDataType>;
    private pathFinder: PathFinder;
    private pathFindAlgo: ALGORITHM;

    constructor() {
        this.graph = new Graph<NodeDataType>(this.nodeComparator);
        const graphRef = () => this.graph;
        this.pathFinder = new BFSPathFinder(graphRef); //kinda wana remove this
        this.pathFindAlgo = 2;
    }

    public async reinitialize(): Promise<void> {
        const databaseNodes = await PrismaClient.node.findMany({});
        const databaseEdges = await PrismaClient.edge.findMany({});
        const path = await this.getAlgo();
        if (path) this.pathFindAlgo = path.algoID;

        this.graph.nodes.forEach((node) => {
            this.graph.removeNode(node.data);
        });

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

        console.log('reinitialized graph');
    }

    public async initialize(): Promise<void> {
        const databaseNodes = await PrismaClient.node.findMany({});
        const databaseEdges = await PrismaClient.edge.findMany({});
        const path = await this.getAlgo();
        if (path) this.pathFindAlgo = path.algoID;

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

    public setPathFinderAlgo() {
        const pathAlgo: string = ALGORITHM[this.pathFindAlgo];
        console.log('this.pathFindAlgo', this.pathFindAlgo);
        console.log('in setPathFinerAlgo and the algo is: ', pathAlgo);
        // if (
        //     (pathAlgo === 'BFS' && this.pathFinder instanceof BFSPathFinder) ||
        //     (pathAlgo === 'AStar' && this.pathFinder instanceof AStarPathFinder) ||
        //     (pathAlgo === 'DFS' && this.pathFinder instanceof DFSPathFinder)
        // ) {
        //     console.log('algo already exists so switching to that', pathAlgo);
        //     return;
        // } //dont want to make new objects for no reason
        //
        // const graphRef = () => this.graph;
        // switch (pathAlgo) {
        //     case 'BFS':
        //         this.pathFinder = new BFSPathFinder(graphRef);
        //         break;
        //     case 'AStar':
        //         this.pathFinder = new AStarPathFinder(graphRef);
        //         break;
        //     case 'DFS':
        //         this.pathFinder = new DFSPathFinder(graphRef);
        //         break;
        //     default:
        //         throw new Error(`Unknown pathfinder algorithm: ${pathAlgo}`);
        // }
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

    public findPath(startNodeId: number, endNodeId: number): PathFinderResult {
        this.setPathFinderAlgo();
        return this.pathFinder.findPath(startNodeId, endNodeId);
    }

    public getNode(nodeId: number): GetNodeResult {
        const node = this.graph.getNodeById(nodeId);
        return {
            node,
            success: node !== undefined,
        };
    }

    public async setAlgo(pathAlgoID: number) {
        console.log('adding new value to the database value: ', pathAlgoID);
        const updateAlgo = await PrismaClient.algorithm.update({
            where: {
                id: 0,
            },
            data: {
                algoID: pathAlgoID,
            },
        });
        // const update = await this.reinitialize();
        return updateAlgo;
    }

    public async getAlgo() {
        const getAlgo = await PrismaClient.algorithm.findUnique({
            where: {
                id: 0,
            },
        });
        return getAlgo;
    }
}
