import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Box } from '@mantine/core';
import FloorSwitchBox from './Components/FloorManagerBox.tsx';
import { FlowingTubeAnimation } from './Edge.tsx';
import {
    usePatriotContext,
    useChestnutHillContext,
    useFaulknerHospitalContext,
    useAllNodesContext,
} from '../contexts/DirectoryContext.js';
import { useNavSelectionContext } from '../contexts/NavigationContext.tsx';
import { PathPickerBox } from './Components/PathPickerBox.tsx';
import { findPath } from './HelperFiles/FindPathRouting.ts';
import { DirectoryNodeItem } from '../contexts/DirectoryItem.ts';
import { clearSceneObjects } from './HelperFiles/ClearNodesAndEdges.ts';
import { createNode } from './HelperFiles/NodeFactory.ts';
import { mapSetup, getNode } from './HelperFiles/MapSetup.tsx';
import { DisplayDirectionsBox } from './DisplayDirectionsBox.tsx';

export function DraggableMap() {
    /*
      References that exist outside renders, changeable floor state, and properties like theme
     */
    const allNodes = useAllNodesContext();
    const navSelection = useNavSelectionContext();
    const selectedHospitalName = navSelection.state.navSelectRequest?.HospitalName;
    const selectedDepartment = navSelection.state.navSelectRequest?.Department;
    const selectedAlgorithm = navSelection.state.navSelectRequest?.AlgorithmName;

    // Declares context for start and end node information
    const patriotNodes = usePatriotContext();
    const chestnutNodes = useChestnutHillContext();
    const faulknerNodes = useFaulknerHospitalContext();

    // Animation related refs
    const animationRef = useRef<FlowingTubeAnimation | null>(null);
    const clockRef = useRef<THREE.Clock>(new THREE.Clock());

    const [floorState, setFloorState] = useState(1);
    const [sceneIndexState, setSceneIndexState] = useState(0);
    const [isFading, setIsFading] = useState(false);

    // set up map
    const { cameraRef, rendererRef, scenesRef } = mapSetup({
        canvasId: 'insideMapCanvas',
    });

    const handleHospitalChange = (hospitalName: string) => {
        if (hospitalName === '20 Patriot Pl' || hospitalName === '22 Patriot Pl') {
            setSceneIndexState(0);
            setFloorState(1);
        } else if (hospitalName === 'Chestnut Hill') {
            setSceneIndexState(3);
            setFloorState(1); // Assuming Chestnut Hill starts at floor 1
        } else if (hospitalName === 'Faulkner Hospital') {
            setSceneIndexState(4);
            setFloorState(1);
        }
    };
    // associated floors with scenes
    const getSceneIndexFromFloor = (floor: number): number => {
        if (selectedHospitalName === 'Chestnut Hill') return 3;
        if (selectedHospitalName === 'Faulkner Hospital') return 4;
        if (floor === 1) return 0;
        if (floor === 3) return 1;
        if (floor === 4) return 2;
        return 0;
    };

    // Handle switching to other floors
    const handleFloorChange = (newFloor: number) => {
        if (newFloor === floorState) return;
        setIsFading(true);
        setFloorState(newFloor);
        setTimeout(() => {
            setTimeout(() => {
                setSceneIndexState(getSceneIndexFromFloor(newFloor));
                setIsFading(false);
            }, 200); // Fade-in duration
        }, 200); // Fade-out duration
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

    // handles changes to the hospital from the navSelection context
    useEffect(() => {
        handleHospitalChange(selectedHospitalName);
    }, [selectedHospitalName]);

    // handles changes to the department or pathAlgo from the navSelection context
    useEffect(() => {
        const firstNodeId = findParkingLot(); // start node
        const lastNodeId = getLastNodeId(); // destination node

        // clear previous path
        clearSceneObjects(scenesRef.current);

        console.log('finding path:', firstNodeId, lastNodeId);
        let algorithm = 'BFS'; // default to BFS if not selected
        if (selectedAlgorithm) {
            algorithm = selectedAlgorithm;
        }
        if (firstNodeId && lastNodeId) {
            handlePath(firstNodeId, lastNodeId, algorithm);
        }
    }, [selectedDepartment, selectedAlgorithm]);

    useEffect(() => {
        // Initialize path animation
        animationRef.current = new FlowingTubeAnimation({
            color1: 0x2a68f7,
            color2: 0x4deefb,
            flowSpeed: 2,
            pulseFrequency: 0.5,
        });
    }, []);

    // gets Id for destination node
    const getLastNodeId = (): number | null => {
        if (selectedHospitalName == '20 Patriot Pl' || selectedHospitalName == '22 Patriot Pl') {
            const index = patriotNodes.findIndex((element) => {
                return element.name == selectedDepartment;
            });
            return index >= 0 ? patriotNodes[index].id : 0;
        } else if (selectedHospitalName == 'Chestnut Hill') {
            const index = chestnutNodes.findIndex((element) => {
                return element.name == selectedDepartment;
            });
            return index >= 0 ? chestnutNodes[index].id : 0; //make sure nodeId exists
        } else if (selectedHospitalName == 'Faulkner Hospital') {
            const index = faulknerNodes.findIndex((element) => {
                return element.name == selectedDepartment;
            });
            return index >= 0 ? faulknerNodes[index].id : 0; //make sure nodeId exists
        }
        return null;
    };

    // gets id of parking lot node -> hardcoded for now
    // TODO: Search for nodes with type parking lot, allow user to select which parking lot they parked in
    const findParkingLot = (): number | null => {
        if (selectedHospitalName === '20 Patriot Pl' || selectedHospitalName === '22 Patriot Pl') {
            return 1; // Node 1 for Patriot Place
        } else if (selectedHospitalName === 'Chestnut Hill') {
            return 117; // Node 100 for Chestnut Hill
        } else if (selectedHospitalName === 'Faulkner Hospital') {
            return 145;
        }
        return null;
    };

    // Function for populating edges. Creating the edge objects are done in a class to simplify implementation of the direction animation
    // TO DO CHANGE NAME TO SPECIFY IT IS ONLY FOR ANIMATION NOT DATABASDE
    const createEdge = (node1: DirectoryNodeItem, node2: DirectoryNodeItem) => {
        if (!animationRef.current) {
            console.error('Animation reference not initialized');
            return;
        }

        // Only create edges on the same floor
        if (node1.floor === node2.floor && node1.floor === 1) {
            scenesRef.current[0].add(
                animationRef.current.createEdge(
                    { x: node1.x, y: node1.y },
                    { x: node2.x, y: node2.y }
                )
            );
        } else if (node1.floor === node2.floor && node1.floor === 2) {
            scenesRef.current[1].add(
                animationRef.current.createEdge(
                    { x: node1.x, y: node1.y },
                    { x: node2.x, y: node2.y }
                )
            );
        } else if (node1.floor === node2.floor && node1.floor === 3) {
            scenesRef.current[2].add(
                animationRef.current.createEdge(
                    { x: node1.x, y: node1.y },
                    { x: node2.x, y: node2.y }
                )
            );
        } else if (node1.floor === node2.floor && node1.floor === 4) {
            scenesRef.current[3].add(
                animationRef.current.createEdge(
                    { x: node1.x, y: node1.y },
                    { x: node2.x, y: node2.y }
                )
            );
        } else if (node1.floor === node2.floor && node1.floor === 5) {
          scenesRef.current[4].add(
            animationRef.current.createEdge(
              { x: node1.x, y: node1.y },
              { x: node2.x, y: node2.y }
            )
          );
        }
    };

    useEffect(() => {
        const animate = () => {
            // Get delta time for animation
            const deltaTime = clockRef.current.getDelta();

            // Update flowing animation
            if (animationRef.current) {
                animationRef.current.update(deltaTime);
            }

            // Render the current scene
            if (rendererRef.current && cameraRef.current) {
                rendererRef.current.render(scenesRef.current[sceneIndexState], cameraRef.current);
            }
            window.requestAnimationFrame(animate);

            return () => {
                clearSceneObjects(scenesRef.current);
            };
        };
        animate();
    }, [selectedDepartment, sceneIndexState]);

    return (
        <Box w="100%" h="100%" p={0} pos={'absolute'}>
            <FloorSwitchBox
                floor={floorState}
                onCollapseChange={() => true}
                setFloor={handleFloorChange}
                building={selectedHospitalName || ''}
            />
            <canvas
                id="insideMapCanvas"
                style={{ width: '100%', height: '100%', position: 'relative' }}
            />
            <div //fade in and out transition
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#2fbcc7',
                    opacity: isFading ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out',
                    pointerEvents: 'none',
                    zIndex: 10,
                }}
            />
        </Box>
    );
}
