import React, { useEffect, useRef } from 'react';
import { useMantineTheme } from '@mantine/core';

interface WaveAnimationProps {
  id?: string;
  className?: string;
}

const COLORS = {
  WAVE_COLORS: [ //backup wave colors bc mantine doesnt work or smth idk it breaks sometimes
    '#ebfeff',
    '#d7fbfd',
    '#aaf7fc',
    '#7df3fb',
    '#61f0fb',
    '#56effa',
    '#4deefb',
    '#40d3df',
    '#2fbcc7',
    '#00a3ad'
  ],
  BACKGROUND_COLOR: '#ebfeff' //lighest mantine tuquoise color
};

// Wave animation configuration
const WAVE_CONFIG = {
  NUM_WAVES: 20,
  WAVE_HEIGHT: 0.05, //wave amplitude factor
  WAVE_LENGTH_FACTOR: 100,
  CONTROL_POINTS: 40,      // number of control points for the shared spline
  PATH_AMPLITUDE: 0.6,    // amplitude of the main path
  OSCILLATION_RANGE: 0.05  // how far waves can deviate from the main path (another factor that is effected by wave index)
};

/**
 * Creates a colorful flowing wave animation similar to the OAKSUN website
 */
export function WaveAnimation({ id = "waveCanvas", className }: WaveAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const theme = useMantineTheme();
  const waveColors = theme.colors?.terquAccet || COLORS.WAVE_COLORS;
  
  // function to interpolate between two hex colors (we have 10+ waves but only 20 colors), pulled this algo off stack overflow
  const interpolateColor = (color1: string, color2: string, factor: number): string => {
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');
    
    const r1 = parseInt(hex1.substring(0, 2), 16);
    const g1 = parseInt(hex1.substring(2, 4), 16);
    const b1 = parseInt(hex1.substring(4, 6), 16);
    
    const r2 = parseInt(hex2.substring(0, 2), 16);
    const g2 = parseInt(hex2.substring(2, 4), 16);
    const b2 = parseInt(hex2.substring(4, 6), 16);
    
    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };
  
  // gets the wave color gradient based on position. Designed for mutability and changing settings, probably could be optimized in final edition
  const getGradientColor = (index: number, total: number): string => {
    const colorCount = waveColors.length;
    const position = index / (total - 1); // 0 to 1
    const colorIndex = position * (colorCount - 1);
    const lowerIndex = Math.floor(colorIndex);
    const upperIndex = Math.min(lowerIndex + 1, colorCount - 1);
    const factor = colorIndex - lowerIndex;
    
    return interpolateColor(waveColors[lowerIndex], waveColors[upperIndex], factor);
  };
  
  // main animation init and loop
  useEffect(() => {
    console.log("WaveAnimation useEffect running");
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas ref is null");
      return;
    }

    if (canvas.dataset.animationInitialized === "true") {
      console.log("Canvas already initialized, skipping");
      return;
    }
    
    console.log("Initializing wave animation");
    canvas.dataset.animationInitialized = "true";

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error("Failed to get 2D context from canvas");
      return;
    }
    
    // changes canvas sizing when window resizes!
    console.log("Canvas before resize:", { width: canvas.width, height: canvas.height, clientWidth: canvas.clientWidth, clientHeight: canvas.clientHeight });
    resizeCanvas(canvas);
    console.log("Canvas after resize:", { width: canvas.width, height: canvas.height, rect: canvas.getBoundingClientRect() });
    
    //------------------------------------------------------------------------//

    // Animation state
    let time = 0;
    let frameCount = 0;
    
    // animation loop
    function animate() {
      frameCount++;
      time += 0.005;
      
      /* log every 100 frames to avoid console spam, for debugging purposes
      const isLogFrame = frameCount % 100 === 0;
      if (isLogFrame) {
        console.log(`Animation frame ${frameCount}, time: ${time.toFixed(2)}`);
      }
      */

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // draw background and place sprial sitkc logo
      //drawBackgroundGradient(ctx, canvas);
      ctx.fillStyle = COLORS.BACKGROUND_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const heroimage = new Image();
      heroimage.src = '/medicalSymbol.png';
      
      // only draw the image once it's loaded
      if (heroimage.complete) {
        ctx.drawImage(heroimage, 0, -50, heroimage.width/3 * 2, heroimage.height/3 * 2);
      } else {
        // first time load - add event listener
        heroimage.onload = () => {
          ctx.drawImage(heroimage, 0, 0, canvas.width, canvas.height);
        };
        
        // Handle error case, fallback to gradient background if image fails to load
        heroimage.onerror = () => {
          console.error("Failed to load hero image at: /heroimage.jpeg");
          drawBackgroundGradient(ctx, canvas);
        };
      }
      
      // get dimensions, for bounding purposes and finidng spaces between points for bezier curves
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      // get shared path once per frame (this is the main bezier curve that all waves follow)
      const pathPoints = getSharedPath(width, height, time);
      
      // draw waves using the shared path
      for (let i = 0; i < WAVE_CONFIG.NUM_WAVES; i++) {
        const baseOffset = height * 0.65; //offset for the wave from middle of the screen (where bezier curve starts)
        const color = getGradientColor(i, WAVE_CONFIG.NUM_WAVES);
        
        // add a little spice to the wave frequency for each wave so they move differently
        const frequency = 1 + (i * 0.1);
        const phase = i * Math.PI / 5; // different starting phase for each wave
        
        drawWaveAlongPath(ctx, width, height, pathPoints, {
          color,
          baseOffset,
          frequency,
          phase,
          time: time,
          waveIndex: i
        });
      }
      
      // continue animation loop
      animationRef.current = requestAnimationFrame(animate);
    }
    
    // start animation
    console.log("Starting animation loop");
    animationRef.current = requestAnimationFrame(animate);
    
    // add resize event listener
    const handleResize = () => {
      console.log("Window resize detected");
      resizeCanvas(canvas);
    };
    window.addEventListener('resize', handleResize);
    
    // cleanup, remove event listener and cancel animation frame when no longer on page
    return () => {
      console.log("Cleaning up wave animation");
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
      canvas.dataset.animationInitialized = "false";
    };
  }, [waveColors]);
  
  return (
    <canvas 
      ref={canvasRef}
      id={id}
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0  // Ensure it's behind content
      }}
    />
  );
}

/**
 * resize canvas to match its CSS size × device pixel ratio 
 */
function resizeCanvas(canvas: HTMLCanvasElement): void {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  console.log("Resizing canvas:", { 
    dpr, 
    rectWidth: rect.width, 
    rectHeight: rect.height,
    newWidth: rect.width * dpr,
    newHeight: rect.height * dpr
  });
  
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  
  // scale context for higher dpr displays
  const ctx = canvas.getContext('2d');
  if (ctx) {
    console.log("Scaling context by DPR:", dpr);
    ctx.scale(dpr, dpr);
  } else {
    console.error("Failed to get 2D context during resize");
  }
}

//draws backgroun gradient, but doesnt look good so this is old code
function drawBackgroundGradient(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
  //const topColor = COLORS.GRADIENT_TOP;
  const bottomColor = COLORS.BACKGROUND_COLOR;
  /*
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, topColor);
  gradient.addColorStop(1, bottomColor);
  
  ctx.fillStyle = gradient;
  */
  ctx.fillStyle = bottomColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}



// GENERATES BEZIER!!!! very cool math (ok its not reallly a bezier but more an interpolation between points of combined sine functions)
function getSharedPath(width, height, time) {
  const points = [];
  const numPoints = WAVE_CONFIG.CONTROL_POINTS;
  const baseY = height * 0.25; // top quarter of the screen
  const amplitude = height * WAVE_CONFIG.PATH_AMPLITUDE;
  
  // generate path control points - static path that doesn't change with time
  for (let i = 0; i <= numPoints; i++) {
    const x = width * (i / numPoints);
    
    const pathProgress = i / numPoints;
    
    // use static sine waves to create a natural flowing shape (tweak values to change shape lol its kinda guess and check)
    const y = baseY + 
              Math.sin(pathProgress * Math.PI * 1.2) * amplitude * .9 +
              Math.sin(pathProgress * Math.PI * 1.2 + Math.PI * .9) * amplitude * 0.5;
    
    points.push({ x, y });
  }
  
  return points;
}

/**
 * function to draw a wave that follows the shared path but oscillates around it
 */
function drawWaveAlongPath(
  ctx, 
  width, 
  height, 
  pathPoints, 
  options
) {
  const { color, baseOffset, frequency, phase, time, waveIndex } = options;
  
  // create points that follow the main path but oscillate around it (used for interpolation to make the waves)
  const wavePoints = [];
  const numPathPoints = pathPoints.length;
  const pathStep = width / (numPathPoints - 1);
  const numPoints = Math.ceil(width / 4); // more points for smoother curves
  const step = width / numPoints;
  
  // calc wave points with oscillation around the shared path
  for (let i = 0; i <= numPoints; i++) {
    const x = i * step;
    
    // find where on the path this x position falls
    const pathIndex = x / pathStep;
    const index1 = Math.floor(pathIndex);
    const index2 = Math.min(index1 + 1, numPathPoints - 1);
    const t = pathIndex - index1; // Interpolation factor
    
    // if we're exactly on a path point
    let pathY;
    if (index1 === index2) {
      pathY = pathPoints[index1].y;
    } else {
      // interpolate between path points if not on a path point of the bezier curve
      pathY = pathPoints[index1].y * (1 - t) + pathPoints[index2].y * t;
    }
    
    // apply oscillation around the path
    const oscillationRange = height * WAVE_CONFIG.OSCILLATION_RANGE;
    const waveFactor = Math.PI * 2 * frequency;
    const timeOffset = time * (0.5 + waveIndex * 0.1);
    
    // use multiple sine waves for more organic movement (this was a lot of tuning to make it look good)
    const oscillation = 
      Math.sin(x / width * waveFactor + timeOffset + phase) * oscillationRange * 0.6 +
      Math.sin(x / width * waveFactor * 2 + timeOffset * 1.3 + phase) * oscillationRange * 0.3 +
      Math.sin(x / width * waveFactor * 4 + timeOffset * 0.7) * oscillationRange * 0.1;
    
    // combine path position with oscillation (the wave index is used to offset the wave so they dont all start at the same heights and they layer nicely)
    const y = pathY + oscillation + (waveIndex * 15);
    
    wavePoints.push({ x, y });
  }
  
  // Draw the wave
  ctx.beginPath();
  
  // start from the bottom left of the canvas
  ctx.moveTo(0, height);
  
  // connect to the first wave point
  ctx.lineTo(wavePoints[0].x, wavePoints[0].y);
  
  // draw smooth bezier curves through the wave points
  for (let i = 0; i < wavePoints.length - 1; i++) {
    const current = wavePoints[i];
    const next = wavePoints[i + 1];
    
    // calculate control points for smoother curves
    const cp1x = current.x + (next.x - current.x) * 0.5;
    const cp1y = current.y;
    
    const cp2x = next.x - (next.x - current.x) * 0.5;
    const cp2y = next.y;
    
    // draw cubic bezier curve for interpolation between points
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, next.x, next.y);
  }
  
  // close the path
  ctx.lineTo(width, height); //this is the bottom right of the canvas
  ctx.lineTo(0, height); //this is the bottom left of the canvas
  ctx.closePath();
  
  //fills the bound space of the wave and the edges of the screen with the wave color
  ctx.fillStyle = color;
  ctx.fill();
  
  /*
  // Draws a white crest along the top of the wave but SUPER COMPUTATIONALLY EXPENSIVE. Commented out :(
  ctx.beginPath();
  ctx.moveTo(wavePoints[0].x, wavePoints[0].y);
  
  // Draw smooth bezier curves through the wave points (just the top outline)
  for (let i = 0; i < wavePoints.length - 1; i++) {
    const current = wavePoints[i];
    const next = wavePoints[i + 1];
    
    // Calculate control points for smoother curves
    const cp1x = current.x + (next.x - current.x) * 0.5;
    const cp1y = current.y;
    
    const cp2x = next.x - (next.x - current.x) * 0.5;
    const cp2y = next.y;
    
    // Draw cubic bezier curve
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, next.x, next.y);
  }
  
  // Set the line style for the crest
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.stroke();
  
  // Add a second thinner line for extra highlight
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.stroke();
  */


  // Debug rendering of bezier curve (uncommment to see the cool path the waves follow)
  /*
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(pathPoints[0].x, pathPoints[0].y);
  
  for (let i = 1; i < pathPoints.length; i++) {
    ctx.lineTo(pathPoints[i].x, pathPoints[i].y);
  }
  
  ctx.stroke();
  
  // Draw control points
  ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
  pathPoints.forEach(point => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
    ctx.fill();
  });
  */
}

export default WaveAnimation; 