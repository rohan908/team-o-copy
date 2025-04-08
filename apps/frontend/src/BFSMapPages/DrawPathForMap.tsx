import { Coordinate } from "./MapTypes";
import { Map } from "./MapTypes";
import { findPath } from "./PathFindingRouting";

function convertSmallMapCoordsToBigMap(smallMapCoord : Coordinate, currMap : Map) {
    const bigMapCoord = {
        x: smallMapCoord.x * currMap.xBigMapToSmallMapScale + currMap.xBigMapToSmallMapOffset,
        y: smallMapCoord.y * currMap.yBigMapToSmallMapScale + currMap.yBigMapToSmallMapOffset,
        z: smallMapCoord.z
    }
    return bigMapCoord;
}
function convertBigMapCoordsToSmallMap(bigMapCoord : Coordinate, currMap : Map) {
    const smallMapCoord = {
        x: (bigMapCoord.x - currMap.xBigMapToSmallMapOffset) / currMap.xBigMapToSmallMapScale,
        y: (bigMapCoord.y - currMap.yBigMapToSmallMapOffset) / currMap.yBigMapToSmallMapScale,
        z: bigMapCoord.z
    }
    return smallMapCoord;
}

function drawPathOnMapCanvas(path : Coordinate[], ctx : CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    
    path.forEach(coord => {
        ctx.lineTo(coord.x, coord.y);
    });
    ctx.stroke();
}


export async function DrawPathForMap(startCoordSmallMap : Coordinate, endCoordSmallMap : Coordinate, currMap : Map) {
    const startCoordBigMap : Coordinate = convertSmallMapCoordsToBigMap(startCoordSmallMap, currMap);
    const endCoordBigMap : Coordinate = convertSmallMapCoordsToBigMap(endCoordSmallMap, currMap);

    const path : Coordinate[]   = await findPath(startCoordBigMap, endCoordBigMap);

    const pathSmallMap : Coordinate[] = path.map(coord => convertBigMapCoordsToSmallMap(coord, currMap));

    const canvas = document.getElementById('mapCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
        drawPathOnMapCanvas(pathSmallMap, ctx);
    }

    
    

}
