import { NavigationService } from "./NavigationService";
import { Graph } from "./Graph";
import { NodeDataType, PathFinderResult } from "../models/MapTypes";

export abstract class PathFinder {
  protected graphRef: () => Graph<NodeDataType>;

  constructor(graphRef: () => Graph<NodeDataType>) {
    this.graphRef = graphRef;
  }

  abstract findPath(startNodeId: number, endNodeId: number): PathFinderResult;


}
