import { Coordinate } from "./MapTypes";
import { Map } from "./MapTypes";
import { findPath } from "./PathFindingRouting";


// we need to convert the coordinates to the big map coordinates (the backend path is the outside map with all details of both buildings) and back
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
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);


    for (let i = 0; i < path.length; i += 5) {
        ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.stroke();
}
 //i wrote this before in waveanimation.tsx and so im exporting it for future use
export function resizeCanvas(canvas: HTMLCanvasElement): void {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    // Scale context for higher dpr displays
    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.scale(dpr, dpr);
    }
}




export async function DrawPathForMap(startCoordSmallMap : Coordinate, endCoordSmallMap : Coordinate, currMap : Map) {
    const startCoordBigMap : Coordinate = convertSmallMapCoordsToBigMap(startCoordSmallMap, currMap);
    const endCoordBigMap : Coordinate = convertSmallMapCoordsToBigMap(endCoordSmallMap, currMap);

    const path : Coordinate[]   = await findPath(startCoordBigMap, endCoordBigMap);
    //console.log(path);
    const pathSmallMap : Coordinate[] = path.map(coord => convertBigMapCoordsToSmallMap(coord, currMap));

    const canvas = document.getElementById('mapCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Failed to get canvas context');
        return;
    }

    // I know that defining the function here is bad practice, but I refuse to pass the path variable as an argument so we ball
    function drawMap(canvas : HTMLCanvasElement, ctx : CanvasRenderingContext2D, currMap : Map) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        drawPathOnMapCanvas(pathSmallMap, ctx);
    }

    //init resize canvas
    resizeCanvas(canvas);
    // add resize event listener
    const handleResize = () => {
        resizeCanvas(canvas);
        drawMap(canvas, ctx, currMap);
    };
    window.addEventListener('resize', handleResize);

    //init draw map
    drawMap(canvas, ctx, currMap);

    //clean up the event listener
    return () => {
        window.removeEventListener('resize', handleResize);
    }
    
    


    

}
