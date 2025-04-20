import { ConnectingNode, NodeDataType, PathFinderResult } from '../../models/MapTypes';
import { Graph } from '../Graph';
import { PathFinder } from '../PathFinder';
import { Node } from '../Node';


export class DFSPathFinder extends PathFinder {
  constructor(graphRef: () => Graph<NodeDataType>) {
    super(graphRef);
  }

}
