import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createAllScenes } from './SceneFactory.ts';
import { DirectoryNodeItem } from '../../contexts/DirectoryItem.ts';

interface MapConfig {
    canvasId: string;
    cameraConfig?: {
        fov?: number;
        near?: number;
        far?: number;
        position?: { x: number; y: number; z: number };
    };
    orbitControls?: Partial<OrbitControls>;
}

// Common hook for threejs map setup
export function mapSetup(config: MapConfig) {
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const scenesRef = useRef<THREE.Scene[]>([]);
    const controlRef = useRef<OrbitControls | null>(null);
    const canvasRef = useRef<HTMLElement | null>(null);

    // This only runs once to initialize things. If you want to change something that isn't a default value, do it in the file.
    useEffect(() => {
        // Initialize canvas
        canvasRef.current = document.getElementById(config.canvasId);
        if (!canvasRef.current) {
            return;
        }

        // Initialize camera
        const camera = new THREE.PerspectiveCamera(
            config.cameraConfig?.fov ?? 50, // this is like this to set a default
            canvasRef.current.clientWidth / canvasRef.current.clientHeight,
            config.cameraConfig?.near ?? 50,
            config.cameraConfig?.far ?? 1000
        );
        camera.position.set(
            config.cameraConfig?.position?.x ?? 0,
            config.cameraConfig?.position?.y ?? 0,
            config.cameraConfig?.position?.z ?? 300
        );
        cameraRef.current = camera;

        // Initialize renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current as HTMLCanvasElement,
            antialias: true,
        });
        renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        rendererRef.current = renderer;

        // Initialize orbit controls for map dragging
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableRotate = config.orbitControls?.enableRotate ?? false;
        controls.mouseButtons = {
            LEFT: THREE.MOUSE.PAN,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.ROTATE,
        };
        controlRef.current = controls;

        // Create all scenes
        scenesRef.current = createAllScenes();

        // Dispose renderer and controls on unmount
        return () => {
            if (rendererRef.current) {
                rendererRef.current.dispose();
            }
            if (controlRef.current) {
                controlRef.current.dispose();
            }
        };
    }, []);

    return {
        cameraRef,
        rendererRef,
        scenesRef,
        controlRef,
        canvasRef,
    };
}

export function getNode(id: number, allNodes: DirectoryNodeItem[]): DirectoryNodeItem | null {
    for (const node of allNodes) {
        if (node.id === id) {
            return node;
        }
    }
    return null;
}
