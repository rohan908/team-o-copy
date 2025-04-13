import { ConnectingNode, NodeDataType, PathFinderResult } from "../../models/MapTypes";
import { Graph } from "../Graph";
import { PathFinder } from "../PathFinder";
import {Node} from "../Node";

export class AStarPathFinder extends PathFinder {
  constructor(graphRef: () => Graph<NodeDataType>) {
    super(graphRef);
  }

  public findPath(startNodeId: number, endNodeId: number): PathFinderResult {
    return {success: false, pathIDs: [], distance: -1};
  }
}
