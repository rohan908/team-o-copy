import { Coordinate } from "./MapTypes";
import axios from "axios";

export async function findPath(startCoord: Coordinate, endCoord: Coordinate): Promise<Coordinate[]> {
    try {
      const response = await axios.post('http://localhost:3001/graph/findPath', {
        startX: startCoord.x,
        startY: startCoord.y,
        startZ: startCoord.z,
        endX: endCoord.x,
        endY: endCoord.y,
        endZ: endCoord.z,
      });

      const data = response.data;

      
        if (!data.success) {
            throw new Error(data.error || 'Failed to find path');
        }
      
        // Return just the path array from the result
        return data.result.path;
    } catch (error) {
        console.error('Error finding path:', error);
        throw error;
    }
}



