import {NodeDataType, PathFinderResult} from "../models/MapTypes.ts";
import {Graph} from "./Graph.ts";
import {PathFinder} from "./PathFinder.ts";

export class NavigationService {
  protected graph: Graph<NodeDataType>;
  private pathFinder: PathFinder;


  constructor(rootNode : NodeDataType) {
    this.graph = new Graph<NodeDataType>(this.nodeComparator, rootNode);
    this.pathFinder = new PathFinder(() => this.graph);
  }

  private nodeComparator(node1: NodeDataType, node2: NodeDataType) : number {
    return node1.id === node2.id ? 0 : 1;
  }

  // parses commands from the front end to change the backend graph, also used for initial population
  public executeGraphCommand(commandType: string, node1: NodeDataType, node2ForEdge?: NodeDataType, weightForEdgeAdd?: number) {
    if (commandType === "nodeAdd") {
      this.graph.addNewNode(node1);
    }
    else if (commandType === "nodeUpdate") {
      this.graph.addNewNode(node1); //not a typo, the function updates or adds new nodes dw about it
    }
    else if (commandType === "nodeRemove") {
      this.graph.removeNode(node1);
    }
    else if (commandType === "edgeAdd") {
      this.graph.addEdge(node1, node2ForEdge!, weightForEdgeAdd!);
    }
    else if (commandType === "edgeRemove") {
      this.graph.removeEdge(node1, node2ForEdge!);
    }
    else {
      console.error("graph command DNE");
    }
  }

  public findPath (startNodeId: number, endNodeId: number, algoType : string) : PathFinderResult {
    return this.pathFinder.findPath(startNodeId, endNodeId, algoType);
  }

}
