import { useEffect, useRef } from 'react';
import { Coordinate, Map } from '../helpers/MapTypes';
import { DrawPathForMap } from '../helpers/DrawPathForMap';

interface MapCanvasProps {
    startCoord: Coordinate;
    endCoord: Coordinate;
    currentMap: Map;
    className?: string; //now we can pass in a CSS class name to style it for fturue, maybe we dont use it
    // this interface is propably not needed but maybe i need to change the css for each map idk
    onClick?: (x: number, y: number) => void;
}

export function MapCanvas({ startCoord, endCoord, currentMap, className, onClick }: MapCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let cleanup: (() => void) | undefined; // bc DrawPathForMap is async this is needed and it was a really annoying bug :(

    const initializeDrawing = async () => {
      try {
        cleanup = await DrawPathForMap(startCoord, endCoord, currentMap);
      } catch (error) {
        console.error('MapCanvas error:', error);
      }
    };

    initializeDrawing();

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [startCoord, endCoord, currentMap]); //now we can rerun when coords and map change

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !onClick) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    // Calculate click coordinates relative to canvas
    const xRelCanvas = Math.round((e.clientX - rect.left) * scaleX);
    const yRelCanvas = Math.round((e.clientY - rect.top) * scaleY);
    
    // Convert to map coordinates
    const mapX = Math.round(xRelCanvas * (currentMap.width / canvas.width));
    const mapY = Math.round(yRelCanvas * (currentMap.height / canvas.height));
    
    // Pass coordinates to parent component
    onClick(mapX, mapY);
  };

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
        objectFit: 'contain',
        zIndex: 2,
        pointerEvents: onClick ? 'auto' : 'none',
        cursor: onClick ? 'crosshair' : 'default'
      }}
      onClick={handleCanvasClick}
    />
  );
}


