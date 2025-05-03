import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createAllScenes } from './SceneFactory.ts';
import { DirectoryNodeItem } from '../../contexts/DirectoryItem.ts';
import { createNewOrbitControls, createNewCamera } from './cameraControls.tsx';

interface MapConfig {
    canvasId: string;
}

// common hook for threejs map setup
export function mapSetup(config: MapConfig) {
    const cameraRef = useRef<THREE.OrthographicCamera | THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const scenesRef = useRef<THREE.Scene[]>([]);
    const controlRef = useRef<OrbitControls | null>(null);
    const canvasRef = useRef<HTMLElement | null>(null);

    // this only runs once to initialize things
    useEffect(() => {
        // initialize canvas
        canvasRef.current = document.getElementById(config.canvasId);
        if (!canvasRef.current) {
            console.error(`Canvas with ID ${config.canvasId} not found`);
            return;
        }

        // initialize a perspective camera
        const camera = createNewCamera(canvasRef.current, 'perspective');
        cameraRef.current = camera;

        // initialize renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current as HTMLCanvasElement,
            antialias: true,
        });
        renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        rendererRef.current = renderer;
        renderer.setClearColor(new THREE.Color(0xebf2ff)); // set background color

        // create scenes
        scenesRef.current = createAllScenes();

        // initialize camera controls
        const controls = createNewOrbitControls(camera, renderer.domElement);
        controlRef.current = controls;

        // handle window resize
        const handleResize = () => {
            if (!canvasRef.current || !camera || !renderer) return;

            const frustumSize = 400;

            // update aspect ratio
            const newAspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;

            if (camera instanceof THREE.OrthographicCamera) {
                const newFrustumHeight = frustumSize / camera.zoom;
                const newFrustumWidth = newFrustumHeight * newAspect;

                camera.left = -newFrustumWidth / 2;
                camera.right = newFrustumWidth / 2;
                camera.top = newFrustumHeight / 2;
                camera.bottom = -newFrustumHeight / 2;
            } else if (camera instanceof THREE.PerspectiveCamera) {
                camera.aspect = newAspect;
            }

            camera.updateProjectionMatrix();

            // update renderer size
            renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);

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
