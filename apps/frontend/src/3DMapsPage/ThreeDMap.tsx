import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Box } from '@mantine/core';
import { mapSetup } from './Helper Files/ThreeDMapSetup.tsx';
import { findPath } from '../IndoorMapPage/HelperFiles/FindPathRouting.ts';
import { getNode } from '../IndoorMapPage/HelperFiles/MapSetup.tsx';
import { createNode } from '../IndoorMapPage/HelperFiles/NodeFactory.ts';

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

    const addObject = (src: string, zIndex: number, objectType: string) => {
        // Load the 3D model
        const loader = new OBJLoader();

        loader.load(
            src,
            function (object) {
                console.log('Model loaded successfully', object);

                //set position to origin
                //object.position.set(0, 0, 0);
                const scale = 2.3;
                object.scale.set(scale, scale, scale);
                object.position.x = 6.5;
                object.position.y = -47.5;
                object.position.z = zIndex * 10.5;

                // different colors for floors and walls
                if (objectType == 'floor') {
                    object.traverse(function (child: { material: THREE.MeshStandardMaterial }) {
                        // Create a new standard material for better lighting
                        child.material = new THREE.MeshStandardMaterial({
                            color: 0xffffff,
                        });
                    });
                } else if (objectType == 'walls') {
                    object.traverse(function (child: { material: THREE.MeshStandardMaterial }) {
                        // Create a new standard material for better lighting
                        child.material = new THREE.MeshStandardMaterial({
                            color: 0xa2c2f7,
                        });
                    });
                } else {
                    console.error('objectType not found');
                }

                sceneRef.current.add(object);
            },
            function (xhr) {
                console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
            },
            function (error) {
                console.error('Error loading 3D model:', error);
            }
        );
    };

    const handlePath = (firstNodeId: number, lastNodeId: number, algo: string) => {
        const path = findPath(firstNodeId, lastNodeId, algo).then(async (pathres) => {
            const ids = pathres.result.pathIDs;
            // Add dispatch for navSelection
            navSelection.dispatch({
                type: 'SET_PATH_REQUEST',
                data: { NodeIds: ids },
            });
            // For each node id in the path

            for (const id of ids) {
                // Get the full node from the ID
                const node = getNode(id, allNodes);
                if (node) {
                    createNode(node, scenesRef.current); //Create the node from its data
                } else {
                    console.error('Node id not found: ', id);
                }
                const connectedNodeIds = node?.connectingNodes; // list of the connected nodes "connections" data including the IDs and Weights
                if (connectedNodeIds) {
                    for (const connectedNodeId of connectedNodeIds) {
                        // iterate over each connected node. This could probably be simplified because this is a path and we are guarenteed either 1 or 2 connections
                        const connectedNode = getNode(connectedNodeId, allNodes);
                        if (connectedNode) {
                            // If the connected node is in the path
                            // TODO: Add another check that makes it so duplicate edge objects aren't created
                            if (ids.includes(connectedNode.id)) {
                                createEdge(node, connectedNode);
                            }
                        } else {
                            console.error('Node id not found: ', connectedNodeId);
                        }
                    }
                }
            }
        });
    };

    // Load 3D model
    useEffect(() => {
        if (!sceneRef.current || !cameraRef.current || !rendererRef.current) {
            console.log('Scene, camera, or renderer not initialized yet');
            return;
        }

        sceneRef.current.background = new THREE.Color().setHex(0xeef4fe);

        // Floors and walls are separate objects so they can be colored separately
        addObject('../../public/Models/Floor 1 Floor.obj', 0, 'floor');
        addObject('../../public/Models/Floor 1 Walls.obj', 0, 'walls');
        addObject('../../public/Models/Floor 2 Floor.obj', 1, 'floor');
        addObject('../../public/Models/Floor 2 Walls.obj', 1, 'walls');
        addObject('../../public/Models/Floor 3 Floor.obj', 2, 'floor');
        addObject('../../public/Models/Floor 3 Walls.obj', 2, 'walls');
        addObject('../../public/Models/Floor 4 Floor.obj', 3, 'floor');
        addObject('../../public/Models/Floor 4 Walls.obj', 3, 'walls');

        // position camera to view the model
        cameraRef.current.position.set(0, 0, 500);
        cameraRef.current.lookAt(0, 0, 0);

        // force a render
        rendererRef.current.render(sceneRef.current, cameraRef.current);

        console.log('Initial render completed');

        // lighting
        const ambientLight = new THREE.AmbientLight(0xebf2ff, 0.5);
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
