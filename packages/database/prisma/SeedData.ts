import { edgeData } from '../../common/src/MapHelper.ts';

// returns object with all the data required for seeding the "Node" table will replace contents of this file with
// information exported from frontend
// bounds are -250 to 250 for x, -200 to 200 for y, z

// !!! PLEASE DO NOT AUTO FORMAT THIS FILE PLEASE PRETTY PLEASE !!!

export function getNodeData() {
    return [
      // floor 1 Patriot-20
      { x: 86.6, y: 82.0, floor: 1, name: 'Patriot Place Parking Lot', description: 'parking', nodeType: 'parking-lot', mapId: 1, connectingNodes: [2]},
      { x: 99.2, y: 53.4, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1, connectingNodes: [1,3,12]},
      { x: 12.8, y: 13.6, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1, connectingNodes: [2,4]},
      { x: 10.3, y: 2.5, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1, connectingNodes: [3,5]},
      { x: -0.9, y: 4.8, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1, connectingNodes: [4,6]},
      { x: -15.8, y: -6.3, floor: 1, name: 'Imaging Suite', description: 'department', nodeType: 'department', mapId: 1, connectingNodes: [5,7]},
      { x: -24.2, y: -4.6, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1, connectingNodes: [6,8]},
      { x: -31.6, y: -35.9, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1, connectingNodes: [7,9]},
      { x: -40.2, y: -34.4, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1, connectingNodes: [8,10]},
      { x: -39.1, y: -30.0, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1, connectingNodes: [9,11]},
      { x: -36.6, y: -28.1, floor: 1, name: 'Pharmacy', description: 'department', nodeType: 'department', mapId: 1, connectingNodes: [10]},

      // floor 1 Patriot-22 (stairs to get to floors 3-4)
      { x: 115.2, y: 14.7, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1, connectingNodes: [2,13]},
      { x: 86.0, y: 2.9, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1, connectingNodes: [12,14]},
      { x: 92.5, y: -15.8, floor: 1, name: 'staircase-1', description: 'stairs', nodeType: 'staircase', mapId: 1, connectingNodes: [13,15]},

      // floor 3 Patriot-22 (listed as 2 for pathfinding)
      { x: 94.8, y: -15.5, floor: 2, name: 'staircase-2', description: 'stairs', nodeType: 'staircase', mapId: 1, connectingNodes: [14,16,25]},
      { x: 87.2, y: -18.8, floor: 2, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1, connectingNodes: [15,17,19]},
      { x: 84.9, y: -20.9, floor: 2, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1, connectingNodes: [16,18]},
      { x: 80.9, y: -18.8, floor: 2, name: 'Vein Care Services', description: 'department', nodeType: 'department', mapId: 1, connectingNodes: [17]},
      { x: 88.4, y: -24.2, floor: 2, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1, connectingNodes: [16,20]},
      { x: 72.3, y: -28.9, floor: 2, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1, connectingNodes: [19,21]},
      { x: 69.6, y: -23.4, floor: 2, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1, connectingNodes: [20,22]},
      { x: 24.4, y: -39.7, floor: 2, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1, connectingNodes: [21,23]},
      { x: 30.3, y: -58.4, floor: 2, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1, connectingNodes: [22,24]},
      { x: 24.7, y: -60.1, floor: 2, name: 'Endocrinology', description: 'department', nodeType: 'department', mapId: 1, connectingNodes: [23]},

      // floor 4 Patriot-22 (listed as 3 for pathfinding)
      { x: 94.6, y: -15.3, floor: 3, name: 'staircase-3', description: 'stairs', nodeType: 'staircase', mapId: 1, connectingNodes: [15,26]},
      { x: 81.1, y: -20.6, floor: 3, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1, connectingNodes: [25,27]},
      { x: 75.6, y: -20.3, floor: 3, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1, connectingNodes: [26,28]},
      { x: 52.4, y: -28.5, floor: 3, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1, connectingNodes: [27,29]},
      { x: 50.6, y: -23.8, floor: 3, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1, connectingNodes: [28,30]},
      { x: 54.8, y: -22.0, floor: 3, name: 'Phlebotomy/Primary Care', description: 'department', nodeType: 'department', mapId: 1, connectingNodes: [29]},

      // starting at node ID 100 -->
      // floor 1 Chestnut hill
      { id: 100, x: -34.6, y: 74.7, floor: 4, name: 'CH Parking Lot 1', description: 'parking', nodeType: 'parking-lot', mapId: 2, connectingNodes: [101,105]},
      { id: 101, x: -27.3, y: 34.6, floor: 4, name: 'CH Parking Lot 2', description: 'parking', nodeType: 'parking-lot', mapId: 2, connectingNodes: [100,102]},
      { id: 102, x: 20.5, y: 36.0, floor: 4, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 2, connectingNodes: [101,103]},
      { id: 103, x: 22.7, y: 41.3, floor: 4, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 2, connectingNodes: [102,104]},
      { id: 104, x: 32.2, y: 42.3, floor: 4, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 2, connectingNodes: [103,105,106,113]},
      { id: 105, x: 32.9, y: 73.9, floor: 4, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 2, connectingNodes: [100,104]},
      { id: 106, x: 20.5, y: 36.0, floor: 4, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 2, connectingNodes: [101,103]},
      { id: 107, x: 41.5, y: 41.6, floor: 4, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 2, connectingNodes: [106,108]},
      { id: 108, x: 86.2, y: 38.1, floor: 4, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 2, connectingNodes: [107,109]},
      { id: 109, x: 87.1, y: 1.4, floor: 4, name: 'CH Parking Lot 3', description: 'parking', nodeType: 'parking-lot', mapId: 2, connectingNodes: [108,110]},
      { id: 110, x: 84.3, y: -24.0, floor: 4, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 2, connectingNodes: [109,111]},
      { id: 111, x: 70.9, y: -24.1, floor: 4, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 2, connectingNodes: [110,112,116]},
      { id: 112, x: 70.6, y: -12.3, floor: 4, name: 'Multi-Specialty Clinic', description: 'department', nodeType: 'department', mapId: 2, connectingNodes: [111]},
      { id: 113, x: 34.2, y: -12.5, floor: 4, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 2, connectingNodes: [104,114]},
      { id: 114, x: 31.4, y: -18.6, floor: 4, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 2, connectingNodes: [113,115]},
      { id: 115, x: 33.0, y: -25.0, floor: 4, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 2, connectingNodes: [114,116]},
      { id: 116, x: 57.4, y: -25.3, floor: 4, name: 'Radiology', description: 'department', nodeType: 'department', mapId: 2, connectingNodes: [115,111]},

    ];
}
