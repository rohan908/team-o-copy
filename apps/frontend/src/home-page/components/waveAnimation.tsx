import React, { useEffect, useRef } from 'react';
import { useMantineTheme } from '@mantine/core';

interface WaveAnimationProps {
  id?: string;
  className?: string;
}

// Colors similar to OAKSUN website
const COLORS = {
  //GRADIENT_TOP: '#656a7e',     // Purple
  GRADIENT_BOTTOM: '#f1f4fe',  // Pink
  WAVE_COLORS: [
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
  BACKGROUND_COLOR: '#ebfeff'
};

// Wave animation configuration
const WAVE_CONFIG = {
  NUM_WAVES: 20,
  WAVE_HEIGHT: 0.05,
  WAVE_LENGTH_FACTOR: 100,
  WAVE_SPEED: 5,
  DOT_DENSITY: 0.003,
  DOT_SIZE: 0.5,
  CONTROL_POINTS: 40,      // Number of control points for the shared spline
  PATH_AMPLITUDE: 0.6,    // Amplitude of the main path
  OSCILLATION_RANGE: 0.05  // How far waves can deviate from the main path
};

/**
 * Creates a colorful flowing wave animation similar to the OAKSUN website
 */
export function WaveAnimation({ id = "waveCanvas", className }: WaveAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const theme = useMantineTheme();
  const waveColors = theme.colors?.terquAccet || COLORS.WAVE_COLORS;
  
  // Function to interpolate between two hex colors
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
  
  // Function to get a color from the gradient
  const getGradientColor = (index: number, total: number): string => {
    const colorCount = waveColors.length;
    const position = index / (total - 1); // 0 to 1
    const colorIndex = position * (colorCount - 1);
    const lowerIndex = Math.floor(colorIndex);
    const upperIndex = Math.min(lowerIndex + 1, colorCount - 1);
    const factor = colorIndex - lowerIndex;
    
    return interpolateColor(waveColors[lowerIndex], waveColors[upperIndex], factor);
  };
  
  // Main animation initialization and loop
  useEffect(() => {
    console.log("WaveAnimation useEffect running");
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas ref is null");
      return;
    }
    
    // Already initialized check
    if (canvas.dataset.animationInitialized === "true") {
      console.log("Canvas already initialized, skipping");
      return;
    }
    
    console.log("Initializing wave animation");
    canvas.dataset.animationInitialized = "true";
    
    // Get the drawing context
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error("Failed to get 2D context from canvas");
      return;
    }
    
    // Initial canvas sizing
    console.log("Canvas before resize:", { width: canvas.width, height: canvas.height, clientWidth: canvas.clientWidth, clientHeight: canvas.clientHeight });
    resizeCanvas(canvas);
    console.log("Canvas after resize:", { width: canvas.width, height: canvas.height, rect: canvas.getBoundingClientRect() });
    
    // Animation state
    let time = 0;
    let frameCount = 0;
    
    // Animation loop
    function animate() {
      frameCount++;
      const now = Date.now() / 1000;
      time += 0.005;
      
      // Log every 100 frames to avoid console spam
      const isLogFrame = frameCount % 100 === 0;
      if (isLogFrame) {
        console.log(`Animation frame ${frameCount}, time: ${time.toFixed(2)}`);
      }
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background gradient
      //drawBackgroundGradient(ctx, canvas);
      ctx.fillStyle = COLORS.BACKGROUND_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const heroimage = new Image();
      heroimage.src = '/medicalSymbol.png';
      
      // Only draw the image once it's loaded
      if (heroimage.complete) {
        ctx.drawImage(heroimage, 0, -50, heroimage.width/3 * 2, heroimage.height/3 * 2);
      } else {
        // First time load - add event listener
        heroimage.onload = () => {
          ctx.drawImage(heroimage, 0, 0, canvas.width, canvas.height);
        };
        
        // Handle error case
        heroimage.onerror = () => {
          console.error("Failed to load hero image at: /heroimage.jpeg");
          // Fallback to gradient background
          drawBackgroundGradient(ctx, canvas);
        };
      }
      
      // Get dimensions
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      // Generate the shared path once per frame
      const pathPoints = generateSharedPath(width, height, time);
      
      // Draw waves using the shared path
      for (let i = 0; i < WAVE_CONFIG.NUM_WAVES; i++) {
        const baseOffset = height * 0.65;
        const color = getGradientColor(i, WAVE_CONFIG.NUM_WAVES);
        
        // Each wave has slightly different frequency
        const frequency = 1 + (i * 0.1);
        const phase = i * Math.PI / 5; // Different starting phase for each wave
        
        drawWaveAlongPath(ctx, width, height, pathPoints, {
          color,
          baseOffset,
          frequency,
          phase,
          time: time,
          waveIndex: i
        }, isLogFrame && i === 0);
      }
      
      // Continue animation loop
      animationRef.current = requestAnimationFrame(animate);
    }
    
    // Start animation
    console.log("Starting animation loop");
    animationRef.current = requestAnimationFrame(animate);
    
    // Add resize event listener
    const handleResize = () => {
      console.log("Window resize detected");
      resizeCanvas(canvas);
    };
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
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
 * Resize canvas to match its CSS size × device pixel ratio
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
  
  // Scale context for retina/high DPI displays
  const ctx = canvas.getContext('2d');
  if (ctx) {
    console.log("Scaling context by DPR:", dpr);
    ctx.scale(dpr, dpr);
  } else {
    console.error("Failed to get 2D context during resize");
  }
}

/**
 * Draw the background gradient
 */
function drawBackgroundGradient(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
  //const topColor = COLORS.GRADIENT_TOP;
  const bottomColor = COLORS.GRADIENT_BOTTOM;
  /*
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, topColor);
  gradient.addColorStop(1, bottomColor);
  
  ctx.fillStyle = gradient;
  */
  ctx.fillStyle = bottomColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Draw tiny dots for texture effect
 */
/*
function drawBackgroundDots(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
  const rect = canvas.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  
  const dotCount = Math.floor(width * height * WAVE_CONFIG.DOT_DENSITY);
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  
  for (let i = 0; i < dotCount; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * WAVE_CONFIG.DOT_SIZE;
    
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
}
*/

/**
 * Function to generate the shared bezier path
 */
function generateSharedPath(width, height, time) {
  const points = [];
  const numPoints = WAVE_CONFIG.CONTROL_POINTS;
  const baseY = height * 0.25; // top quarter of the screen
  const amplitude = height * WAVE_CONFIG.PATH_AMPLITUDE;
  
  // Generate path control points - static path that doesn't change with time
  for (let i = 0; i <= numPoints; i++) {
    const x = width * (i / numPoints);
    
    // Create a flowing path without time-based movement
    const pathProgress = i / numPoints;
    
    // Use static sine waves to create a natural flowing shape
    // No timeOffset is applied here so the path stays fixed
    const y = baseY + 
              Math.sin(pathProgress * Math.PI * 1.2) * amplitude * .9 +
              Math.sin(pathProgress * Math.PI * 1.2 + Math.PI * .9) * amplitude * 0.5;
    
    points.push({ x, y });
  }
  
  return points;
}

/**
 * Function to draw a wave that follows the shared path but oscillates around it
 */
function drawWaveAlongPath(
  ctx, 
  width, 
  height, 
  pathPoints, 
  options,
  debug = false
) {
  const { color, baseOffset, frequency, phase, time, waveIndex } = options;
  
  // Create points that follow the main path but oscillate around it
  const wavePoints = [];
  const numPathPoints = pathPoints.length;
  const pathStep = width / (numPathPoints - 1);
  const numPoints = Math.ceil(width / 4); // More points for smoother curves
  const step = width / numPoints;
  
  // Calculate wave points with oscillation around the shared path
  for (let i = 0; i <= numPoints; i++) {
    const x = i * step;
    
    // Find where on the path this x position falls
    const pathIndex = x / pathStep;
    const index1 = Math.floor(pathIndex);
    const index2 = Math.min(index1 + 1, numPathPoints - 1);
    const t = pathIndex - index1; // Interpolation factor
    
    // If we're exactly on a path point
    let pathY;
    if (index1 === index2) {
      pathY = pathPoints[index1].y;
    } else {
      // Interpolate between path points
      pathY = pathPoints[index1].y * (1 - t) + pathPoints[index2].y * t;
    }
    
    // Apply oscillation around the path
    const oscillationRange = height * WAVE_CONFIG.OSCILLATION_RANGE;
    const waveFactor = Math.PI * 2 * frequency;
    const timeOffset = time * (0.5 + waveIndex * 0.1);
    
    // Use multiple sine waves for more organic movement
    const oscillation = 
      Math.sin(x / width * waveFactor + timeOffset + phase) * oscillationRange * 0.6 +
      Math.sin(x / width * waveFactor * 2 + timeOffset * 1.3 + phase) * oscillationRange * 0.3 +
      Math.sin(x / width * waveFactor * 4 + timeOffset * 0.7) * oscillationRange * 0.1;
    
    // Combine path position with oscillation
    const y = pathY + oscillation + (waveIndex * 15);
    
    wavePoints.push({ x, y });
  }
  
  // Draw the wave
  ctx.beginPath();
  
  // Start from the bottom left
  ctx.moveTo(0, height);
  
  // Connect to the first wave point
  ctx.lineTo(wavePoints[0].x, wavePoints[0].y);
  
  // Draw smooth bezier curves through the wave points
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
  
  // Close the path
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  
  // First fill with the base color
  ctx.fillStyle = color;
  ctx.fill();
  
  /*
  // Now draw the white crest along the top of the wave
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
  // Debug rendering
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