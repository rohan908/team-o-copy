import { Coordinate } from "./MapTypes";

export async function findPath(startCoord: Coordinate, endCoord: Coordinate): Promise<Coordinate[]> {
    try {
        const response = await fetch('/graph/findPath', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                startX: startCoord.x,
                startY: startCoord.y,
                startZ: startCoord.z,
                endX: endCoord.x,
                endY: endCoord.y,
                endZ: endCoord.z,
            }),
        });
      
        const data = await response.json();
      
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



