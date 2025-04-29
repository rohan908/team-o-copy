import { useEffect, useRef } from 'react';
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

// common hook for threejs map setup
export function mapSetup(config: MapConfig) {
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const scenesRef = useRef<THREE.Scene[]>([]);
    const controlRef = useRef<OrbitControls | null>(null);
    const canvasRef = useRef<HTMLElement | null>(null);

    // initial camera position
    const initialCameraPositionRef = useRef<THREE.Vector3>(new THREE.Vector3());

    // initial camera target position
    const initialTargetRef = useRef<THREE.Vector3>(new THREE.Vector3());

    // this only runs once to initialize things
    useEffect(() => {
        // initialize canvas
        canvasRef.current = document.getElementById(config.canvasId);
        if (!canvasRef.current) {
            console.error(`Canvas with ID ${config.canvasId} not found`);
            return;
        }

        // initialize camera
        const camera = new THREE.PerspectiveCamera(
            config.cameraConfig?.fov ?? 50,
            canvasRef.current.clientWidth / canvasRef.current.clientHeight,
            config.cameraConfig?.near ?? 50,
            config.cameraConfig?.far ?? 1000
        );
        camera.position.set(
            config.cameraConfig?.position?.x ?? 0,
            config.cameraConfig?.position?.y ?? 0,
            config.cameraConfig?.position?.z ?? 330
        );
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;

        // store initial camera position
        initialCameraPositionRef.current.copy(camera.position);

        // initialize renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current as HTMLCanvasElement,
            antialias: true,
        });
        renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        rendererRef.current = renderer;

        // create scenes
        scenesRef.current = createAllScenes();

        // initialize camera controls
        const controls = new OrbitControls(camera, renderer.domElement);
        //controls.enableRotate = false;
        controls.mouseButtons = {
            LEFT: THREE.MOUSE.PAN,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.ROTATE,
        };

        // set min and max zoom
        controls.minDistance = 100;
        controls.maxDistance = 330;

        // store initial target
        initialTargetRef.current.copy(controls.target);

        // initial visible boundaries
        const fov = camera.fov * (Math.PI / 180); // fov in radians
        const maxVisibleHeight = Math.tan(fov / 2) * controls.maxDistance; // height at max zoom
        const maxVisibleWidth = maxVisibleHeight * camera.aspect;
        // This sets it so you cannot pan past the visible area at max zoom even when you zoom in
        const maxPanX = maxVisibleWidth / 2;
        const maxPanY = maxVisibleHeight / 2;

        // initialize camera target vector
        const vTarget = new THREE.Vector3();

        // Function to enforce pan boundaries based on zoom level
        const enforceBoundaries = () => {
            if (!camera || !controls) return;

            // Calculate zoom ratio (0 at max zoom out, 1 at max zoom in)
            const zoomRange = controls.maxDistance - controls.minDistance;
            const currentZoomDist = camera.position.distanceTo(controls.target);
            const zoomRatio = (controls.maxDistance - currentZoomDist) / zoomRange;

            // pan distance based on zoom ratio
            // if zoomRatio = 0, no panning allowed
            // zoomRatio = 1, maximum panning allowed
            const allowedPanX = maxPanX * zoomRatio;
            const allowedPanY = maxPanY * zoomRatio;

            // stores the original camera target
            vTarget.copy(controls.target);

            // clamps the camera target so it cannot exceed the pan limits
            controls.target.x = Math.max(
                initialTargetRef.current.x - allowedPanX,
                Math.min(initialTargetRef.current.x + allowedPanX, controls.target.x)
            );
            controls.target.y = Math.max(
                initialTargetRef.current.y - allowedPanY,
                Math.min(initialTargetRef.current.y + allowedPanY, controls.target.y)
            );

            // difference between the camera's target position and current position
            vTarget.x = vTarget.x - controls.target.x;
            vTarget.y = vTarget.y - controls.target.y;

            // apply that difference to the camera so it doesn't stutter when attempting to pan past the limit
            camera.position.x -= vTarget.x;
            camera.position.y -= vTarget.y;
        };

        // apply pan boundaries on control changes
        controls.addEventListener('change', enforceBoundaries);

        // handle window resize
        const handleResize = () => {
            if (!canvasRef.current || !camera || !renderer) return;

            // update aspect ratio
            camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
            camera.updateProjectionMatrix();

            // update renderer size
            renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);

            // update boundaries
            enforceBoundaries();
        };

        window.addEventListener('resize', handleResize);

        // initial boundaries
        enforceBoundaries();

        controlRef.current = controls;

        return () => {
            window.removeEventListener('resize', handleResize);

            if (rendererRef.current) {
                rendererRef.current.dispose();
            }

            if (controlRef.current) {
                controlRef.current.removeEventListener('change', enforceBoundaries);
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
