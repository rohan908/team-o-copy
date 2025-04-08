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




export async function PathOnMapCanvas(startCoordSmallMap : Coordinate, endCoordSmallMap : Coordinate, currMap : Map) {
    const startCoordBigMap : Coordinate = convertSmallMapCoordsToBigMap(startCoordSmallMap, currMap);
    const endCoordBigMap : Coordinate = convertSmallMapCoordsToBigMap(endCoordSmallMap, currMap);

    const path : Coordinate[]   = await findPath(startCoordBigMap, endCoordBigMap);
    const pathSmallMap : Coordinate[] = path.map(coord => convertBigMapCoordsToSmallMap(coord, currMap));

    const canvas = document.getElementById('mapCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Failed to get canvas context');
        return;
    }

    // I know that defining the function here is bad practice, but I refuse to pass the path variable as an argument so we ball
    function drawMap(canvas : HTMLCanvasElement, ctx : CanvasRenderingContext2D, currMap : Map) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        const img = new Image();
        img.src = currMap.imageSrc;
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 2;
    
            drawPathOnMapCanvas(pathSmallMap, ctx);
        }
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
