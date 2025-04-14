import {edgeData} from "../../common/src/MapHelper.ts";

// returns object with all the data required for seeding the "Node" table
// will replace contents of this file with information exported from frontend
// bounds are -250 to 250 for x, -200 to 200 for y, z
export function getNodeData() {
  return (
    [
      { x: 0, y: 0, floor: 1, name: 'Node 1', description: 'Node 1', nodeType: 'hallway', mapId: 1 },
      { x: 100, y: 100, floor: 1, name: 'Node 2', description: 'Node 2', nodeType: 'hallway', mapId: 1 },
      { x: -100, y: 50, floor: 1, name: 'Node 3', description: 'Node 3', nodeType: 'hallway', mapId: 1 },
      { x: 200, y: -150, floor: 1, name: 'Node 4', description: 'Node 4', nodeType: 'hallway', mapId: 1 },
      { x: -67, y: -25, floor: 1, name: 'Node 5', description: 'Node 5', nodeType: 'hallway', mapId: 1 },
    ]
  )
}
