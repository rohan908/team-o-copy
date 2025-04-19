import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Box } from '@mantine/core';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { getNode } from './GetNodeRouting.ts';
import { NodeDataType } from './MapClasses/MapTypes.ts';
import FloorSwitchBox from './components/FloorManagerBox.tsx';
import { FlowingTubeAnimation } from './Edge.tsx';
import { usePatriotContext, useChestnutHillContext } from '../contexts/DirectoryContext.js';
import { findPath } from './FindPathRouting.ts';

const canvasId = 'insideMapCanvas';

// Pass in props for the selected hospital and department
// TODO: change this to a useContext
interface DraggableMapProps {
    selectedHospitalName?: string | null;
    selectedDepartment?: string | null;
}

export function DraggableMap({ selectedHospitalName, selectedDepartment }: DraggableMapProps) {
    const [floor, setFloor] = useState(1); // controls the current visible floor and threejs scene
    const [isFading, setIsFading] = useState(false);

    // Animation related refs
    const animationRef = useRef<FlowingTubeAnimation | null>(null);
    const clockRef = useRef<THREE.Clock>(new THREE.Clock());

    // camera ref for when we want to start moving the camera around
    const cameraRef = useRef<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera());

    /*
      stores scene references in useRef
    Patriot Place Floor 1 -> floor1 -> scene 0
    Patriot Place Floor 3 -> floor2 -> scene 1
    Patriot Place Floor 4 -> floor3 -> scene 2
    Chestnut Hill Floor 1 -> floor4 -> scene 3
     */
    const scenesRef = useRef<THREE.Scene[]>([]);

    // index is 0 since it refers to the scenesRef array of scenes, where floor 1 is index 0
    const [sceneIndexState, setSceneIndexState] = useState<number>(0);

    /*
     stores renderer and canvas references in useRef for efficiency
     */
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const canvasRef = useRef<HTMLElement | null>(null);

    const handleHospitalChange = (newHospitalName: string | null) => {
        if (newHospitalName) {
            setSelectedHospitalName(newHospitalName);
            if (newHospitalName === '20 Patriot Pl' || newHospitalName === '22 Patriot Pl') {
                setSceneIndexState(0);
            } else if (newHospitalName === 'Chestnut Hill') {
                setSceneIndexState(3);
            }
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

    // associated floors with scenes
    const getSceneIndexFromFloor = (floor: number): number => {
        if (selectedHospitalName === 'Chestnut Hill') return 3;
        if (floor === 1) return 0;
        if (floor === 3) return 1;
        if (floor === 4) return 2;
        return 0;
    };

    // Handle switching to other floors
    const handleFloorChange = (newFloor: number) => {
        console.log('handleFloorChange', newFloor);
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

    useEffect(() => {
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
        const orbitControls = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
        orbitControls.enableRotate = false;
        orbitControls.mouseButtons = {
            LEFT: THREE.MOUSE.PAN,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.ROTATE,
        };

        scenesRef.current = createAllScenes();
    }, []);

    // gets Id for destination node
    const getLastNodeId = () => {
        if (selectedHospitalName == '20 Patriot Pl' || selectedHospitalName == '22 Patriot Pl') {
            const index = patriotNodes.findIndex((element) => {
                return element.name == selectedDepartment;
            });
            return patriotNodes[index].id;
        } else if (selectedHospitalName == 'Chestnut Hill') {
            const index = chestnutNodes.findIndex((element) => {
                return element.name == selectedDepartment;
            });
            return chestnutNodes[index].id;
        }
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

    // Function for populating edges. Creating the edge objects are done in a class to simplify implementation of the direction animation
    const createEdge = (node1: NodeDataType, node2: NodeDataType) => {
        if (!animationRef.current) {
            console.error('Animation reference not initialized');
            return;
        }

        // Only create edges on the same floor
        if (node1.floor === node2.floor && node1.floor === 1) {
            scene1.add(
                animationRef.current.createEdge(
                    { x: node1.x, y: node1.y },
                    { x: node2.x, y: node2.y }
                )
            );
        } else if (node1.floor === node2.floor && node1.floor === 2) {
            scene2.add(
                animationRef.current.createEdge(
                    { x: node1.x, y: node1.y },
                    { x: node2.x, y: node2.y }
                )
            );
        } else if (node1.floor === node2.floor && node1.floor === 3) {
            scene3.add(
                animationRef.current.createEdge(
                    { x: node1.x, y: node1.y },
                    { x: node2.x, y: node2.y }
                )
            );
        } else if (node1.floor === node2.floor && node1.floor === 4) {
            scene4.add(
                animationRef.current.createEdge(
                    { x: node1.x, y: node1.y },
                    { x: node2.x, y: node2.y }
                )
            );
        }
    };

    // Handle switching to other floors
    const handleFloorChange = (newFloor: number) => {
        if (newFloor === floor) return;
        setIsFading(true);
        setTimeout(() => {
            setFloor(newFloor);
            if (newFloor === 1) {
                scene.current = scene1;
                console.log('scene 1');
            } else if (newFloor === 3) {
                scene.current = scene2;
                console.log('scene 2');
            } else if (newFloor === 4) {
                scene.current = scene3;
                console.log('scene 3');
            } else if (newFloor === 5) {
                scene.current = scene4;
                console.log('scene 4');
            }
            setTimeout(() => {
                setIsFading(false);
            }, 200); // Fade-in duration
        }, 200); // Fade-out duration
    };

    // Generate THREEjs objects to display a path
    /* getNode return type:
    {
    "result": {
        "nodeData": {
            "id": 1,
            "x": 2,
            "y": 4,
            "floor": 1,
            "mapId": 1,
            "name": "hallway",
            "description": "hallway",
            "nodeType": "hallway",
            "edges": []
        },
        "connections": [
            {
                "connectedId": 2,
                "weight": 23.3452350598575
            }
        ],
        "success": true
        }
    }
     */
    /* findPath return type:
        {
    "result": {
        "success": true,
        "pathIDs": [
            1,
            2,
            4
        ],
        "distance": 43.741313114228646
       }
       }
      */
    // Get the path TODO: Switch get node api calls to useContext
    const path = findPath(firstNodeId, lastNodeId, 'BFS').then(async (pathres) => {
        const ids = pathres.result.pathIDs;
        // For each node id in the path
        for (const id of ids) {
            // Get the full node from the ID
            const node = getNode(id).then(async (noderes) => {
                createNode(noderes.result.nodeData); //Create the node from its data
                const connectedNodeDatas = noderes.result.connections; // list of the connected nodes "connections" data including the IDs and Weights
                for (const connectedNodeData of connectedNodeDatas) {
                    // iterate over each connected node. This could probably be simplified because this is a path and we are guarenteed either 1 or 2 connections
                    const connectedNode = getNode(connectedNodeData.connectedId).then(
                        async (connectednoderes) => {
                            if (ids.includes(connectednoderes.result.nodeData.id)) {
                                // If the connected node is in the path
                                // TODO: Add another check that makes it so duplicate edge objects aren't created
                                createEdge(
                                    noderes.result.nodeData,
                                    connectednoderes.result.nodeData
                                );
                            }
                        }
                    );
                }
            });
        }
    });

    useEffect(() => {
        // This has to be in a useEffect to prevent infinite looping
        // TODO: Maybe intialize this earlier in its own useEffect to prevent rough scene change
        if (selectedHospitalName === 'Chestnut Hill') {
            handleFloorChange(5);
        }

        animationRef.current = new FlowingTubeAnimation({
            color1: 0x2a68f7,
            color2: 0x4deefb,
            flowSpeed: 2,
            pulseFrequency: 0.5,
        });

        const canvas = document.getElementById(canvasId);

        // we create a new renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas as HTMLCanvasElement,
            antialias: true,
        });
        if (canvas) {
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        }
        renderer.setPixelRatio(window.devicePixelRatio);

        // Create camera
        const camera = new THREE.PerspectiveCamera(
            50,
            canvas!.clientWidth / canvas!.clientHeight,
            50,
            1000
        );
        camera.position.set(0, 0, 300);

        // Initialize clock for animation timing
        clockRef.current = new THREE.Clock();

        scene.current.background = new THREE.Color('#2FBCC7');

        // Camera controls
        const orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.enableRotate = false;
        orbitControls.mouseButtons = {
            LEFT: THREE.MOUSE.PAN,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.ROTATE,
        };

        const animate = () => {
            // Get delta time for animation
            const deltaTime = clockRef.current.getDelta();

            // Update flowing animation
            if (animationRef.current) {
                animationRef.current.update(deltaTime);
            }

            // Render the current scene
            renderer.render(scene.current, camera);
            window.requestAnimationFrame(animate);

            return () => {};
        };
        animate();
    });

    return (
        <Box w="100vw" h="100vh">
            <FloorSwitchBox
                floor={floor}
                setFloor={handleFloorChange}
                onCollapseChange={() => true}
                building={selectedHospitalName || ''}
            />
            <canvas
                id="insideMapCanvas"
                style={{ width: '100%', height: '100%', position: 'absolute' }}
            />
            <div
                style={{
                    position: 'relative',
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
