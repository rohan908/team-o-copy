/*
  This file contains helper functions that will be
  used in map pathfinding and database management
 */

// creates a database entry for the "Edge" table
export function edgeData(node1: any, node2: any, mapId: number) {
  return ({
      weight: calculateWeight(node1, node2),
      mapId: mapId,
      nodes: [node1.id, node2.id],
  });
}

// helper function to calc weight between two nodes
// for now an elevator has a weight of 5
export function calculateWeight(node1: any, node2: any) {
  return node1.z !== node2.z ? 5 : (Math.sqrt(Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2)));
}
