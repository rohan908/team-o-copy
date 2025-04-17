import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Box, Flex, Transition, useMantineTheme } from '@mantine/core';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { getNode } from './GetNodeRouting.ts';
import { NodeDataType } from './MapClasses/MapTypes.ts';
import FloorSwitchBox from './components/FloorManagerBox.tsx';
import { FlowingTubeAnimation } from './Edge.tsx';
import { usePatriotContext, useChestnutHillContext } from '../contexts/DirectoryContext.js';
import { PathPickerBox } from './components/PathPickerBox.tsx';
import { findPath } from './FindPathRouting.ts';

const canvasId = 'insideMapCanvas';

// Pass in props for the selected hospital and department
// TODO: change this to a useContext
interface DraggableMapProps {
    selectedHospitalName?: string | null;
    selectedDepartment?: string | null;
    setSelectedDepartment: (selectedDepartment: string | null) => void;
    setSelectedHospitalName: (selectedHospitalName: string | null) => void;
}

export function DraggableMap({
    selectedHospitalName,
    selectedDepartment,
    setSelectedDepartment,
    setSelectedHospitalName,
}: DraggableMapProps) {
    const theme = useMantineTheme();
    const [nodeSelected, setNodeSelected] = useState(false);
    const [nodeX, setNodeX] = useState(0);
    const [nodeY, setNodeY] = useState(0);
    const [floor, setFloor] = useState(1);
    const [isFading, setIsFading] = useState(false);
    const [currPathAlgo, setCurrPathAlgo] = useState<string>('BFS');

    console.log(selectedDepartment);
    console.log(selectedHospitalName);
    const selectedObject = useRef<THREE.Object3D<THREE.Object3DEventMap> | null>(null); // useref so the selectedObject position can be set from the UI
    const canvasId = 'insideMapCanvas';
    const objects: THREE.Object3D[] = [];
    objects.push(new THREE.Object3D());
    // Animation related refs
    const animationRef = useRef<FlowingTubeAnimation | null>(null);
    const clockRef = useRef<THREE.Clock>(new THREE.Clock());

    // Declares context for start and end node information
    const patriotNodes = usePatriotContext();
    const chestnutNodes = useChestnutHillContext();

    // gets Id for destination node
    const getLastNodeId = () => {
        if (selectedHospitalName == '20 Patriot Pl' || selectedHospitalName == '22 Patriot Pl') {
            const index = patriotNodes.findIndex((element) => {
                return element.name == selectedDepartment;
            });
            return index >= 0 ? patriotNodes[index].id : undefined;
        } else if (selectedHospitalName == 'Chestnut Hill') {
            const index = chestnutNodes.findIndex((element) => {
                return element.name == selectedDepartment;
            });
            return index >= 0 ? chestnutNodes[index].id : undefined; //make sure nodeId exists
        }
        return undefined;
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

    // Parameters for THREEjs objects and path display
    const firstNodeId = findParkingLot(); // start node
    const lastNodeId = getLastNodeId(); // destination node
    const nodeColor = { color: 0xeafeff };
    const nodeRadius = 1;

    console.log(firstNodeId);
    console.log(lastNodeId);

    const handleDepartmentChange = (newDep: string) => {
        setSelectedDepartment(newDep);
    };

    const handleFadingChange = (newHos: string) => {
        setSelectedHospitalName(newHos);
    };
    /*
    Patriot Place Floor 1 -> floor1 -> scene 1
    Patriot Place Floor 3 -> floor2 -> scene 2
    Patriot Place Floor 4 -> floor3 -> scene 3
    Chestnut Hill Floor 1 -> floor4 -> scene 4
     */

    // function for simplifying creating new scenes (floors)
    function createMapScene(texturePath: string) {
        const scene = new THREE.Scene();
        const mapTexture = new THREE.TextureLoader().load(texturePath);
        mapTexture.colorSpace = THREE.SRGBColorSpace;
        const mapGeo = new THREE.PlaneGeometry(500, 281);
        const mapMaterial = new THREE.MeshBasicMaterial({ map: mapTexture });
        const mapPlane = new THREE.Mesh(mapGeo, mapMaterial);
        mapPlane.position.set(0, 0, 0);
        scene.add(mapPlane);
        return scene;
    }

    // Setup scenes and map planes.
    const scene1 = createMapScene('../../public/MapImages/Patriot Place Floor 1.png');
    const scene2 = createMapScene('../../public/MapImages/Patriot Place Floor 3.png');
    const scene3 = createMapScene('../../public/MapImages/Patriot Place Floor 4.png');
    const scene4 = createMapScene('../../public/MapImages/Chestnut Hill Floor 1.png');
    const scene = useRef<THREE.Scene>(scene1);

    // Function for populating nodes as THREEjs sphere objects
    const createNode = (node: NodeDataType) => {
        const geometry = new THREE.SphereGeometry(
            nodeRadius,
            Math.round(nodeRadius * 6), // Vibe based adaptive segmentation
            Math.round(nodeRadius * 3)
        );
        const material = new THREE.MeshBasicMaterial(nodeColor);
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.x = node.x;
        sphere.position.y = node.y;
        const nodeFloor = node.floor;
        if (nodeFloor === 1) {
            scene1.add(sphere);
        } else if (nodeFloor === 2) {
            scene2.add(sphere);
        } else if (nodeFloor === 3) {
            scene3.add(sphere);
        } else if (nodeFloor === 4) {
            scene4.add(sphere);
        } else {
            console.error("node not added because floor doesn't exist");
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
                        );
                    }
                });
            }
        });
    }

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
        <Box w="100%" h="100%" p={0} pos={'relative'}>
            <FloorSwitchBox
                floor={floor}
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
