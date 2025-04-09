import { useEffect, useRef } from 'react';
import { Coordinate, Map } from './MapTypes';
import { DrawPathForMap } from './DrawPathForMap';

interface MapCanvasProps {
    startCoord: Coordinate;
    endCoord: Coordinate;
    currentMap: Map;
    className?: string; //now we can pass in a CSS class name to style it for fturue, maybe we dont use it
    // this interface is propably not needed but maybe i need to change the css for each map idk
}

export function MapCanvas({ startCoord, endCoord, currentMap, className }: MapCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let cleanup: (() => void) | undefined; // bc DrawPathForMap is async this is needed and it was a really annoying bug :(

    const initializeDrawing = async () => {
      cleanup = await DrawPathForMap(startCoord, endCoord, currentMap);
    };

    // Call the async function
    initializeDrawing();

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [startCoord, endCoord, currentMap]); //now we can rerun when coords and map change

  return (
    <canvas
      ref={canvasRef}
      id="mapCanvas"
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        pointerEvents: 'none'
      }}
    />
  );
}


