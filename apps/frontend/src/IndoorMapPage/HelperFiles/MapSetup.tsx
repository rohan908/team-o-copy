import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createAllScenes } from './SceneFactory.ts';
import { DirectoryNodeItem } from '../../contexts/DirectoryItem.ts';

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

export function createNewCamera(
    canvasElement: HTMLElement,
    cameraType: 'orthographic' | 'perspective' = 'orthographic'
): THREE.OrthographicCamera | THREE.PerspectiveCamera {
    const aspect = canvasElement.clientWidth / canvasElement.clientHeight;
    const frustumSize = 400;
    const frustumHalfHeight = frustumSize / 2;
    const frustumHalfWidth = frustumHalfHeight * aspect;

    if (cameraType === 'perspective') {
        const fov = 45; // Field of view in degrees
        const near = 0.1;
        const far = 1000;

        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

        camera.position.set(0, 0, 500);
        camera.up.set(0, 0, 1);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();

        return camera;
    } else {
        const camera = new THREE.OrthographicCamera(
            -frustumHalfWidth,
            frustumHalfWidth,
            frustumHalfHeight,
            -frustumHalfHeight,
            0.1,
            1000
        );

        camera.position.set(0, 0, 330);
        camera.up.set(0, 0, 1);
        camera.lookAt(0, 0, 0);
        camera.zoom = 1;
        camera.updateProjectionMatrix();

        return camera;
    }
}

export function createNewOrbitControls(
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
    domElement: HTMLElement,
    previousControls?: OrbitControls
): OrbitControls {
    if (previousControls) {
        // this should dispose the event listener too
        previousControls.dispose();
    }
    const controls = new OrbitControls(camera, domElement);
    const isPerspective = camera instanceof THREE.PerspectiveCamera;

    controls.enableRotate = isPerspective; // enable rotating for perspective cameras
    controls.target.set(0, 0, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.mouseButtons = {
        LEFT: THREE.MOUSE.PAN,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.ROTATE,
    };

    const aspect = domElement.clientWidth / domElement.clientHeight;
    const frustumSize = 400;
    const frustumHalfHeight = frustumSize / 2;
    const frustumHalfWidth = frustumHalfHeight * aspect;

    // zoom and rotation limits based on camera type
    if (isPerspective) {
        controls.minDistance = 100;
        controls.maxDistance = 700;
        controls.minPolarAngle = 0;
        controls.maxPolarAngle = Math.PI / 2 - 0.01;
    } else {
        controls.minZoom = 1;
        controls.maxZoom = 5;
    }

    const maxPanX = frustumHalfWidth * 2;
    const maxPanY = frustumHalfHeight * 2;

    const initialTarget = new THREE.Vector3(0, 0, 0);
    const vTarget = new THREE.Vector3();

    const enforceBoundaries = () => {
        if (isPerspective) {
            // for perspective camera use distance
            const distanceRatio =
                (controls.getDistance() - controls.minDistance) /
                (controls.maxDistance - controls.minDistance);
            const zoomRatio = 1 - distanceRatio; // Invert so closer = higher zoom

            const allowedPanX = maxPanX * zoomRatio;
            const allowedPanY = maxPanY * zoomRatio;

            vTarget.copy(controls.target);

            controls.target.x = Math.max(
                initialTarget.x - allowedPanX,
                Math.min(initialTarget.x + allowedPanX, controls.target.x)
            );
            controls.target.y = Math.max(
                initialTarget.y - allowedPanY,
                Math.min(initialTarget.y + allowedPanY, controls.target.y)
            );

            vTarget.x = vTarget.x - controls.target.x;
            vTarget.y = vTarget.y - controls.target.y;

            camera.position.x -= vTarget.x;
            camera.position.y -= vTarget.y;
        } else {
            // for orthographic camera use zoom ratio
            const orthoCamera = camera as THREE.OrthographicCamera;
            const zoomRatio =
                (orthoCamera.zoom - controls.minZoom) / (controls.maxZoom - controls.minZoom);

            const allowedPanX = maxPanX * zoomRatio;
            const allowedPanY = maxPanY * zoomRatio;

            vTarget.copy(controls.target);

            controls.target.x = Math.max(
                initialTarget.x - allowedPanX,
                Math.min(initialTarget.x + allowedPanX, controls.target.x)
            );
            controls.target.y = Math.max(
                initialTarget.y - allowedPanY,
                Math.min(initialTarget.y + allowedPanY, controls.target.y)
            );

            vTarget.x = vTarget.x - controls.target.x;
            vTarget.y = vTarget.y - controls.target.y;

            camera.position.x -= vTarget.x;
            camera.position.y -= vTarget.y;
        }
    };

    controls.addEventListener('change', enforceBoundaries);
    controls.update();

    return controls;
}
