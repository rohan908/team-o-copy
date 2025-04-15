import {edgeData} from "../../common/src/MapHelper.ts";

// returns object with all the data required for seeding the "Node" table
// will replace contents of this file with information exported from frontend
// bounds are -250 to 250 for x, -200 to 200 for y, z
export function getNodeData() {
  return (
    [
      { x: 2.8976, y: 4.6688, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1, connectingNodes: [2]},
      { x: -21.0030, y: 8.6751, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1, connectingNodes: [3, 4]},
      { x: -44.9636, y: 15.0698, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1, connectingNodes: [2]},
      { x: -25.7026, y: -12.2938, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1, connectingNodes: [2]},
      { x: -31.6118, y: -36.3129, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1 },
      { x: -33.2244, y: -41.8766, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1 },
      { x: -72.3311, y: -31.8781, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1 },
      { x: -36.1272, y: -53.4071, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1 },
      { x: -40.5620, y: -52.7620, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1 },
      { x: -43.3841, y: -62.4379, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1 },
      { x: -93.1342, y: -50.2624, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1 },
      { x: -87.1674, y: -51.6331, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1 },
      { x: -88.8607, y: -55.1003, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1 },
      { x: -80.2330, y: -73.2427, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1 },
      { x: -67.4125, y: -75.9036, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1 },
      { x: -68.7832, y: -90.0949, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1 },
      { x: -65.6386, y: -79.8546, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1 },
      { x: -48.1414, y: -83.7249, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1 },
      { x: -50.3185, y: -92.1107, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1 },
      { x: -47.4157, y: -92.9170, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1 },
      { x: -49.3509, y: -100.3352, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1 },
      { x: -116.7063, y: 34.0961, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1 },
      { x: -132.5633, y: 38.6802, floor: 1, name: 'hallway', description: 'hallway', nodeType: 'hallway', mapId: 1 },

      { x: 0, y: 0, floor: 1, name: 'Blood Draw/Phlebotomy', description: 'blood draw', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 1, name: 'Pharmacy', description: 'Pharmacy', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 1, name: 'Radiology', description: 'Radiology', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 1, name: 'Cardiovascular Services', description: 'Cardiovascular Services', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 1, name: 'Urology', description: 'Urology', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 1, name: 'Urgent Care Center', description: 'Urgent Care Center', nodeType: 'directory', mapId: 1 },

      { x: 0, y: 0, floor: 2, name: 'Surgi-Care', description: 'Surgi-Care', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 2, name: 'Clinical Lab', description: 'Clinical Lab', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 2, name: 'Speech - Language', description: 'Speech - Language', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 2, name: 'Physical Therapy', description: 'Physical Therapy', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 2, name: 'Upper Extremity', description: 'Upper Extremity', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 2, name: 'Hand Therapy', description: 'Hand Therapy', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 2, name: 'Occupational Therapy', description: 'Occupational Therapy', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 2, name: 'Cardiac Rehab', description: 'Cardiac Rehab', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 2, name: 'Rehabilitation Services', description: 'Rehabilitation Services', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 2, name: 'Podiatry', description: 'Podiatry', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 2, name: 'Physiatry', description: 'Physiatry', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 2, name: 'Pediatric Trauma', description: 'Pediatric Trauma', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 2, name: 'Arthroplasty', description: 'Arthroplasty', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 2, name: 'Hand and Upper Extremity', description: 'Hand and Upper Extremity', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 2, name: 'Orthopaedics', description: 'Orthopaedics', nodeType: 'directory', mapId: 1 },

      { x: 0, y: 0, floor: 3, name: 'X-Ray Suite', description: 'X-Ray Suite', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 3, name: 'Sports Medicine Center', description: 'Sports Medicine Center', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 3, name: 'Weight Management and Wellness', description: 'Weight Management and Wellness', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 3, name: 'Vascular Surgery', description: 'Vascular Surgery', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 3, name: 'Thoracic Surgery', description: 'Thoracic Surgery', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 3, name: 'Plastic Surgery', description: 'Plastic Surgery', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 3, name: 'General and Gastrointestinal Surgery', description: 'General and Gastrointestinal Surgery', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 3, name: 'ENT', description: 'ENT', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 3, name: 'Audiology', description: 'Audiology', nodeType: 'directory', mapId: 1 },

      { x: 0, y: 0, floor: 4, name: 'Surgical Specialties', description: 'Surgical Specialties', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 4, name: 'Day Surgery Center', description: 'Day Surgery Center', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 4, name: 'Pulmonary Function Testing', description: 'Pulmonary Function Testing', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 4, name: 'Pain Medicine', description: 'Pulmonary Function Testing', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 4, name: 'Nutrition', description: 'Nutrition', nodeType: 'directory', mapId: 1 },
      { x: 0, y: 0, floor: 4, name: 'Electromyography (EMG)', description: 'Electromyography (EMG)', nodeType: 'directory', mapId: 1 },
    ]
  )
}
