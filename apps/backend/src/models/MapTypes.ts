import {Node} from "../GraphMapClasses/Node.ts";

export interface NodeDataType {
  x: number;
  y: number;
  floor: number;
  nodeType: string;
  name?: string;
  id: number;
  description?: string;
}

export interface ConnectingNode<T> {
  destination: Node<T>;
  weight: number;
}



