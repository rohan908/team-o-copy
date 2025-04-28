import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Box } from '@mantine/core';
import { mapSetup } from './Helper Files/ThreeDMapSetup.tsx';

export function ThreeDMap() {
    // Set up map with better camera defaults for a large model
    const { cameraRef, rendererRef, sceneRef } = mapSetup({
        canvasId: 'threeDMapCanvas',
        cameraConfig: {
            fov: 45,
            near: 0.1,
            far: 10000, // Increased far plane for large models
            position: { x: 0, y: 0, z: 10 }, // Start further back
        },
    });

    const addObject = (src: string, zIndex: number) => {
        // Load the 3D model
        const loader = new OBJLoader();

        loader.load(
            src,
            function (object) {
                console.log('Model loaded successfully', object);

                // CRITICAL: Reset position to origin first
                object.position.set(0, 0, -zIndex * 2);

                // Calculate size and scale properly
                const box = new THREE.Box3().setFromObject(object);
                const size = box.getSize(new THREE.Vector3());

                // Normalize to a reasonable size (max dimension of 5 units)
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 10 / maxDim;

                object.scale.set(scale, scale, scale);
                console.log(
                    `Model scaled to size: ${scale * size.x}, ${scale * size.y}, ${scale * size.z}`
                );

                // Now center properly AFTER scaling
                box.setFromObject(object); // Recalculate bounding box after scaling
                const center = box.getCenter(new THREE.Vector3());
                object.position.x = -center.x;
                object.position.y = -center.y;
                object.position.z = -center.z;

                console.log('Model positioned at:', object.position);

                // Force material visibility in case materials aren't loading
                object.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        // Create a new standard material for better lighting
                        child.material = new THREE.MeshStandardMaterial({
                            color: 0xa0a8b3,
                            roughness: 0.7,
                            metalness: 0,
                        });
                    }
                });

                sceneRef.current.background = new THREE.Color().setHex(0xeef4fe);

                // Add the model to the scene
                sceneRef.current.add(object);

                // Position camera to view the model
                cameraRef.current.position.set(0, -30, 25);
                cameraRef.current.lookAt(0, 0, 0);

                // Force a render
                rendererRef.current.render(sceneRef.current, cameraRef.current);

                console.log('Initial render completed');
            },
            function (xhr) {
                console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
            },
            function (error) {
                console.error('Error loading 3D model:', error);
            }
        );
    };

    // Load 3D model
    useEffect(() => {
        if (!sceneRef.current || !cameraRef.current || !rendererRef.current) {
            console.log('Scene, camera, or renderer not initialized yet');
            return;
        }

        addObject('../../public/PatriotModel.obj', 1);
        addObject('../../public/PatriotOther.obj', 2);
        addObject('../../public/PatriotOther.obj', 3);
        addObject('../../public/PatriotOther.obj', 4);

        // Add basic lighting
        const ambientLight = new THREE.AmbientLight(0x285cc6, 0.5);
        sceneRef.current.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(20, 20, 20);
        sceneRef.current.add(directionalLight);
    }, [sceneRef, cameraRef, rendererRef]);

    // Animation loop
    useEffect(() => {
        if (!sceneRef.current || !rendererRef.current || !cameraRef.current) return;

        console.log('Starting animation loop');

        const animate = () => {
            if (rendererRef.current && sceneRef.current && cameraRef.current) {
                rendererRef.current.render(sceneRef.current, cameraRef.current);
            }
            return requestAnimationFrame(animate);
        };

        const animationId = animate();
    }, [sceneRef, rendererRef, cameraRef]);

    return (
        <Box w="100%" h="100%" p={0} pos={'absolute'}>
            <canvas
                id="threeDMapCanvas"
                style={{ width: '100%', height: '100%', position: 'relative' }}
            />
        </Box>
    );
}
