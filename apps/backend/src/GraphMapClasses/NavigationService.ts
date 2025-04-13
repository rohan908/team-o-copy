import {NodeDataType} from "../models/MapTypes.ts";
import {Graph} from "./Graph.ts";
import {PathFinder} from "./PathFinder.ts";

export class NavigationService {
  private graph: Graph<NodeDataType>;
  private pathFinder: PathFinder;


  constructor(rootNode : NodeDataType) {
    this.graph = new Graph<NodeDataType>(this.nodeComparator, rootNode);
  }

  private nodeComparator(node1: NodeDataType, node2: NodeDataType) : number {
    if (node1.x === node2.x && node1.y === node2.y && node1.floor === node2.floor) {
      return 0;
    }
    return 1;
  }

  // parses commands from the front end
  public executeGraphCommand(commandType: string, node1: NodeDataType, node2ForEdge?: NodeDataType, weightForEdgeAdd?: number) {
    if (commandType === "nodeAdd") {
      this.graph.addNewNode(node1);
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
  }



}
