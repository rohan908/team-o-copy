/*
  This file contains helper functions that will be
  used in map pathfinding and database management
 */

// helper function to calc weight between two nodes
// for now an elevator has a weight of 5
export function calculateWeight(node1: Node, node2: Node) {
  return node1.z !== node2.z ? 5 : (Math.sqrt(Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2)));
}
