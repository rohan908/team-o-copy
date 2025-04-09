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



function drawPathOnMapCanvas(path : Coordinate[], ctx : CanvasRenderingContext2D, currMap : Map) {
    const canvas = ctx.canvas;

    const scaleX = canvas.width / currMap.width;
    console.log("scaleX", scaleX);
    console.log("currMapWidht", currMap.width);
    console.log("canvas width", canvas.width);
    const scaleY = canvas.height / currMap.height;

    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 20 * Math.min(scaleX, scaleY);
    ctx.beginPath();

    const relCanvasX = (x : number) => (x * scaleX);
    const relCanvasY = (y : number) => (y * scaleY);

    ctx.moveTo(relCanvasX(path[0].x), relCanvasY(path[0].y));

    console.log("starting relx", relCanvasX(path[0].x));
    console.log("starting rely", relCanvasX(path[0].x))


    for (let i = 0; i < path.length; i += 5) {
        ctx.lineTo(relCanvasX(path[i].x), relCanvasY(path[i].y));
    }
    ctx.stroke();

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(relCanvasX(path[0].x), relCanvasY(path[0].y), 10, 0, 2 * Math.PI); // Start point
    ctx.fill();

    const endX = relCanvasX(path[path.length - 1].x);
    const endY = relCanvasY(path[path.length - 1].y);
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(endX, endY, 10, 0, 2 * Math.PI); // End point
    ctx.fill();
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
  try {
    const startCoordBigMap: Coordinate = convertSmallMapCoordsToBigMap(startCoordSmallMap, currMap);
    const endCoordBigMap: Coordinate = convertSmallMapCoordsToBigMap(endCoordSmallMap, currMap);

    const path = await Promise.race<Coordinate[]>([
      findPath(startCoordBigMap, endCoordBigMap),
      new Promise<Coordinate[]>((_, reject) =>
        setTimeout(() => reject(new Error('Path finding timeout')), 10000)
      )]);
    if (!path || path.length === 0) {
      throw new Error('No path returned from backend');
    }

    console.log(path);
    const pathSmallMap: Coordinate[] = path.map(path => convertBigMapCoordsToSmallMap(path, currMap));

    const canvas = document.getElementById('mapCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get canvas context');
    }

    // I know that defining the function here is bad practice, but I refuse to pass the path variable as an argument so we ball
    function drawMap(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, currMap: Map) {
      ctx.fillStyle = 'yellow';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawPathOnMapCanvas(pathSmallMap, ctx, currMap);
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
  } catch (error) {
    console.error("error in DrawPathForMap", error);
    throw error;
  }
    
    


    

}
