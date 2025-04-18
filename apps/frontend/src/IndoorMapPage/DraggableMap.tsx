import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Box, useMantineTheme } from '@mantine/core';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DraggableMapProps } from './MapClasses/MapTypes.ts';
import FloorSwitchBox from './INDOORMAPScomponents/FloorManagerBox.tsx';
import { FlowingTubeAnimation } from './Edge.tsx';
import {
    usePatriotContext,
    useChestnutHillContext,
    useAllNodesContext,
} from '../contexts/DirectoryContext.js';
import { PathPickerBox } from './INDOORMAPScomponents/PathPickerBox.tsx';
import { findPath } from './HelperFiles/FindPathRouting.ts';
import { DirectoryNodeItem } from '../contexts/DirectoryItem.ts';
import { clearSceneObjects } from './HelperFiles/ClearNodesAndEdges.ts';
import { createAllScenes } from './HelperFiles/SceneFactory.ts';
import { createNode } from './HelperFiles/NodeFactory.ts';

const canvasId = 'insideMapCanvas';

export function DraggableMap({
    selectedHospitalName,
    selectedDepartment,
    setSelectedDepartment,
    setSelectedHospitalName,
}: DraggableMapProps) {
    /*
      References that exist outside renders, changeable floor state, and properties like theme
     */

    const [isFading, setIsFading] = useState(false);
    const [currPathAlgo, setCurrPathAlgo] = useState<string>('BFS');
    const allNodes = useAllNodesContext();
    const [floorState, setFloorState] = useState<number>(0);

    // Declares context for start and end node information
    const patriotNodes = usePatriotContext();
    const chestnutNodes = useChestnutHillContext();

    // Animation related refs
    const animationRef = useRef<FlowingTubeAnimation | null>(null);
    const clockRef = useRef<THREE.Clock>(new THREE.Clock());

    // camera ref for when we want to start moving the camera around
    const cameraRef = useRef<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera());

    /*
      stores scene references in useRef

    Patriot Place Floor 1 -> floor1 -> scene 1
    Patriot Place Floor 3 -> floor2 -> scene 2
    Patriot Place Floor 4 -> floor3 -> scene 3
    Chestnut Hill Floor 1 -> floor4 -> scene 4
     */
    const scenesRef = useRef<THREE.Scene[]>([]);

    // index is 0 since it refers to the scenesRef array of scenes, where floor 1 is index 0
    const [sceneIndexState, setSceneIndexState] = useState<number>(0);

    /*
     stores renderer and canvas references in useRef for efficiency
     */
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const canvasRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        console.log('rendering');
        console.log('selectedHospital:', selectedHospitalName);

        // sets animation useRef value
        animationRef.current = new FlowingTubeAnimation({
            color1: 0x2a68f7,
            color2: 0x4deefb,
            flowSpeed: 2,
            pulseFrequency: 0.5,
        });

        canvasRef.current = document.getElementById(canvasId);

        // Initialize clock for animation timing
        clockRef.current = new THREE.Clock();
        // Initialize camera
        cameraRef.current = new THREE.PerspectiveCamera(
            50,
            canvasRef.current!.clientWidth / canvasRef.current!.clientHeight,
            50,
            1000
        );
        cameraRef.current.position.set(0, 0, 300);

        // Initialize renderer
        rendererRef.current = new THREE.WebGLRenderer({
            canvas: canvasRef.current as HTMLCanvasElement,
            antialias: true,
        });

        if (canvasRef.current) {
            rendererRef.current.setSize(
                canvasRef.current.clientWidth,
                canvasRef.current.clientHeight
            );
        }
        rendererRef.current.setPixelRatio(window.devicePixelRatio);

        // Camera controls
        if (rendererRef.current) {
            const orbitControls = new OrbitControls(
                cameraRef.current,
                rendererRef.current.domElement
            );
            orbitControls.enableRotate = false;
            orbitControls.mouseButtons = {
                LEFT: THREE.MOUSE.PAN,
                MIDDLE: THREE.MOUSE.DOLLY,
                RIGHT: THREE.MOUSE.ROTATE,
            };
        }

        scenesRef.current = createAllScenes();
    }, []);

    // gets Id for destination node
    const getLastNodeId = () => {
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
        }
        return 0;
    };

    // gets id of parking lot node -> hardcoded for now
    // TODO: Search for nodes with type parking lot, allow user to select which parking lot they parked in
    const findParkingLot = (): number => {
        if (selectedHospitalName === '20 Patriot Pl' || selectedHospitalName === '22 Patriot Pl') {
            return 1; // Node 1 for Patriot Place
        } else {
            return 100; // Node 100 for Chestnut Hill
        }
    };

    const getNode = (id: number): DirectoryNodeItem | null => {
        for (const node of allNodes) {
            if (node.id === id) {
                return node;
            }
        }
        return null;
    };

    const handleDepartmentChange = (newDep: string) => {
        setSelectedDepartment(newDep);
    };

    const handleFadingChange = (newHos: string) => {
        setSelectedHospitalName(newHos);
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
        }
    };

    // Handle switching to other floors
    const handleFloorChange = (newFloor: number) => {
        if (newFloor === floorState) return;
        setIsFading(true);
        setTimeout(() => {
            // refer to start of doc for why these number are like this (Patriot floor 3 is scene 1, etc.)
            setFloorState(newFloor);
            if (newFloor === 1) {
                setSceneIndexState(0);
            } else if (newFloor === 3) {
                setSceneIndexState(1);
            } else if (newFloor === 4) {
                setSceneIndexState(2);
            } else if (newFloor === 5) {
                setSceneIndexState(3);
            }
            setTimeout(() => {
                setIsFading(false);
            }, 200); // Fade-in duration
        }, 200); // Fade-out duration
    };

    useEffect(() => {
        const firstNodeId = findParkingLot(); // start node
        const lastNodeId = getLastNodeId(); // destination node

        // clear previous path
        clearSceneObjects(scenesRef.current);

        console.log('finding path:', firstNodeId, lastNodeId);

        if (selectedHospitalName === '20 Patriot Pl' || selectedHospitalName === '22 Patriot Pl') {
            handleFloorChange(floorState);
        } else {
            handleFloorChange(floorState);
        }

        // gets list of path node IDs
        const path = findPath(firstNodeId, lastNodeId, currPathAlgo).then(async (pathres) => {
            const ids = pathres.result.pathIDs;
            // For each node id in the path
            for (const id of ids) {
                // Get the full node from the ID
                const node = getNode(id);
                if (node) {
                    createNode(node, scenesRef.current); //Create the node from its data
                } else {
                    console.error('Node id not found: ', id);
                }
                const connectedNodeIds = node?.connectingNodes; // list of the connected nodes "connections" data including the IDs and Weights
                if (connectedNodeIds) {
                    for (const connectedNodeId of connectedNodeIds) {
                        // iterate over each connected node. This could probably be simplified because this is a path and we are guarenteed either 1 or 2 connections
                        const connectedNode = getNode(connectedNodeId);
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
        console.log('floorState', floorState);
        console.log('scene', scenesRef.current[sceneIndexState]);
        const animate = () => {
            // Get delta time for animation
            const deltaTime = clockRef.current.getDelta();

            // Update flowing animation
            if (animationRef.current) {
                animationRef.current.update(deltaTime);
            }

            // Render the current scene
            if (rendererRef.current) {
                rendererRef.current.render(scenesRef.current[sceneIndexState], cameraRef.current);
            }
            window.requestAnimationFrame(animate);

            return () => {};
        };
        animate();
    }, [selectedHospitalName, selectedDepartment, floorState]);

    return (
        <Box w="100%" h="100%" p={0} pos={'absolute'}>
            <FloorSwitchBox
                floor={floorState}
                onCollapseChange={() => true}
                setFloor={handleFloorChange}
                building={selectedHospitalName || ''}
            />
            <PathPickerBox
                currAlgo={currPathAlgo}
                setPathAlgo={setCurrPathAlgo}
                currHospital={selectedHospitalName}
                setSelectedHospitalName={setSelectedHospitalName}
                selectedDepartment={selectedDepartment}
                setSelectedDepartment={setSelectedDepartment}
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
                    zIndex: 10000,
                }}
            />
        </Box>
    );
}
