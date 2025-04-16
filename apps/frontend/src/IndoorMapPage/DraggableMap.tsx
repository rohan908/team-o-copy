import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {Box, Flex, Transition, useMantineTheme} from '@mantine/core';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DragControls } from 'three/addons/controls/DragControls.js';
import MapEditorBox from './Components/MapEditorBox.tsx';
import { findPath } from './FindPathRouting.ts';
import { getNode } from './GetNodeRouting.ts';
import { NodeDataType } from './MapClasses/MapTypes.ts';
import FloorSwitchBox from './Components/FloorManagerBox.tsx';
import { FlowingTubeAnimation } from './Edge.tsx';
import { usePatriotContext, useChestnutHillContext } from '../contexts/DirectoryContext.js';

interface DraggableMapProps {
    selectedHospitalName?: string | null;
    selectedDepartment?: string | null;
}

export function DraggableMap({ selectedHospitalName, selectedDepartment }: DraggableMapProps) {
    const theme = useMantineTheme();
    const [nodeSelected, setNodeSelected] = useState(false);
    const [nodeX, setNodeX] = useState(0);
    const [nodeY, setNodeY] = useState(0);
    const [floor, setFloor] = useState(1);
    const [isFading, setIsFading] = useState(false);
    console.log(selectedDepartment);
    console.log(selectedHospitalName);
    const selectedObject = useRef<THREE.Object3D<THREE.Object3DEventMap> | null>(null); // useref so the selectedObject position can be set from the UI
    const canvasId = 'insideMapCanvas';
    const objects: THREE.Object3D[] = [];
    objects.push(new THREE.Object3D());
    // Animation related refs
    const animationRef = useRef<FlowingTubeAnimation | null>(null);
    const clockRef = useRef<THREE.Clock>(new THREE.Clock());

    // Declares context for node information
    const patriotNodes = usePatriotContext();
    const chestnutNodes = useChestnutHillContext();

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
    const findParkingLot = (): number => {
        if (selectedHospitalName == '20 Patriot Pl' || selectedHospitalName == '22 Patriot Pl') {
            return 1;
        } else if (selectedHospitalName == 'Chestnut Hill') {
            return 100;
        }
    };

    // Parameters for THREEjs objects and path display
    const firstNodeId = findParkingLot(); // start node
    const lastNodeId = getLastNodeId(); // destination node
    const nodeColor = { color: 0xeafeff };
    const nodeRadius = 1;

    console.log(firstNodeId);
    console.log(lastNodeId);
    /*
    Patriot Place Floor 1 -> floor1 -> scene 1
    Patriot Place Floor 3 -> floor2 -> scene 2
    Patriot Place Floor 4 -> floor3 -> scene 3
    Chestnut Hill Floor 1 -> floor4 -> scene 4
     */

    // Setup scenes and map planes. This is probably the worst way to do this possible
    const scene1 = new THREE.Scene();
    const texturePath = '../../public/MapImages/Patriot Place Floor 1.png';
    const mapTexture = new THREE.TextureLoader().load(texturePath);
    mapTexture.colorSpace = THREE.SRGBColorSpace;
    const mapGeo = new THREE.PlaneGeometry(500, 281);
    const mapMaterial = new THREE.MeshBasicMaterial({ map: mapTexture });
    const mapPlane = new THREE.Mesh(mapGeo, mapMaterial);
    mapPlane.position.set(0, 0, 0);
    scene1.add(mapPlane);

    const scene2 = new THREE.Scene();
    const texturePath1 = '../../public/MapImages/Patriot Place Floor 3.png';
    const mapTexture1 = new THREE.TextureLoader().load(texturePath1);
    mapTexture1.colorSpace = THREE.SRGBColorSpace;
    const mapGeo1 = new THREE.PlaneGeometry(500, 281);
    const mapMaterial1 = new THREE.MeshBasicMaterial({ map: mapTexture1 });
    const mapPlane1 = new THREE.Mesh(mapGeo1, mapMaterial1);
    mapPlane1.position.set(0, 0, 0);
    scene2.add(mapPlane1);

    const scene3 = new THREE.Scene();
    const texturePath2 = '../../public/MapImages/Patriot Place Floor 4.png';
    const mapTexture2 = new THREE.TextureLoader().load(texturePath2);
    mapTexture2.colorSpace = THREE.SRGBColorSpace;
    const mapGeo2 = new THREE.PlaneGeometry(500, 281);
    const mapMaterial2 = new THREE.MeshBasicMaterial({ map: mapTexture2 });
    const mapPlane2 = new THREE.Mesh(mapGeo2, mapMaterial2);
    mapPlane2.position.set(0, 0, 0);
    scene3.add(mapPlane2);

    const scene4 = new THREE.Scene();
    const texturePath3 = '../../public/MapImages/Chestnut Hill Floor 1.png';
    const mapTexture3 = new THREE.TextureLoader().load(texturePath3);
    mapTexture3.colorSpace = THREE.SRGBColorSpace;
    const mapGeo3 = new THREE.PlaneGeometry(500, 281);
    const mapMaterial3 = new THREE.MeshBasicMaterial({ map: mapTexture3 });
    const mapPlane3 = new THREE.Mesh(mapGeo3, mapMaterial3);
    mapPlane3.position.set(0, 0, 0);
    scene4.add(mapPlane3);
    const scene = useRef<THREE.Scene>(scene1);

    // updates the selected node position from UI
    const updateNodePosition = (x: number, y: number, floor: number) => {
        setNodeX(x);
        setNodeY(y);
        if (selectedObject.current) {
            selectedObject.current.position.x = x;
            selectedObject.current.position.y = y;
            console.log(`Node position updated to: x=${x}, y=${y}, floor=${floor}`);
        }
    };
    // Because THREEjs object IDs are readonly we should probably create and maintain a list that associates the THREEjs object ids with the backed node ids.
    const nodeIds: [number, number][] = [];

    const createNode = (node: NodeDataType) => {
        const geometry = new THREE.SphereGeometry(
            nodeRadius,
            Math.round(nodeRadius * 6), // Vibe based adaptive segmentation
            Math.round(nodeRadius * 3)
        );
        const material = new THREE.MeshBasicMaterial(nodeColor);
        const sphere = new THREE.Mesh(geometry, material);
        nodeIds.push([node.id, sphere.id]);
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
        objects.push(sphere);
    };

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
        } else {
            console.log('Skipping edge between floors', node1.floor, node2.floor);
        }
    };

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
            }, 400); // Fade-in duration
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
    // Get the path
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
        // Get canvas element
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        animationRef.current = new FlowingTubeAnimation(scene, {
            color1: 0x00aaff,
            color2: 0xff3300,
            flowSpeed: 0.3,
            pulseFrequency: 2.0,
            pulseWidth: 0.25,
        });

        // we create a new renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas as HTMLCanvasElement,
            antialias: true,
        });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
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

        scene.current.background = new THREE.Color('#2fbcc7');

        // Camera controls
        const orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.enableRotate = false;
        orbitControls.mouseButtons = {
            LEFT: THREE.MOUSE.PAN,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.ROTATE,
        };

        // Initialize dragControls with an empty array
        let draggableObjects: THREE.Object3D[] = [];
        let dragControls = new DragControls(draggableObjects, camera, renderer.domElement);

        // Set up drag control event listeners
        dragControls.addEventListener('dragstart', function () {
            orbitControls.enabled = false;
        });

        dragControls.addEventListener('dragend', function () {
            setTimeout(() => {
                orbitControls.enabled = true;
            }, 10);
        });

        // Function to update draggable objects to make sure only selected objects can be dragged
        const updateDraggableObjects = () => {
            // Dispose of the old dragControls
            dragControls.dispose();
            // Create a new array with only the selected object (if any)
            draggableObjects = [];
            if (selectedObject.current) {
                draggableObjects.push(selectedObject.current);
            }
            // new dragControls with the updated array
            dragControls = new DragControls(draggableObjects, camera, renderer.domElement);
            // Event listeners that enable camera movement
            dragControls.addEventListener('dragstart', function () {
                orbitControls.enabled = false;
            });
            dragControls.addEventListener('dragend', function () {
                setTimeout(() => {
                    orbitControls.enabled = true;
                }, 10);
            });
        };

        // raycaster for selecting nodes adapted from: https://codesandbox.io/p/sandbox/basic-threejs-example-with-re-use-dsrvn?file=%2Fsrc%2Findex.js%3A93%2C3-93%2C41
        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();

        window.addEventListener('click', (event) => {
            // Get canvas bounds
            if (canvas) {
                const rect = canvas.getBoundingClientRect();
                // Calculate pointer position in normalized device coordinates
                // (-1 to +1) for both components
                pointer.x = ((event.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
                pointer.y = -((event.clientY - rect.top) / canvas.clientHeight) * 2 + 1;
                raycaster.setFromCamera(pointer, camera);
                // calculate objects intersecting the picking ray
                const intersects = raycaster.intersectObjects(objects);
                if (intersects.length > 0) {
                    const intersect = intersects[0]; // grab the first intersected object

                    /*
                  This structure handles selecting objects.
                  It could probably use some proper handler functions, but it works for now.
                   */

                    // if there is no selected object or the clicked on object is not selected
                    if (
                        selectedObject.current === null ||
                        selectedObject.current !== intersect.object
                    ) {
                        // if there is another selected object
                        if (selectedObject.current !== intersect.object) {
                            if (
                                selectedObject.current instanceof THREE.Mesh &&
                                selectedObject.current.material instanceof THREE.MeshBasicMaterial
                            ) {
                                selectedObject.current.material.color.set(0xffff00); //set the already selected object back to it's non-selected color
                            }
                        }
                        selectedObject.current = intersect.object; // switch selected object to the clicked on object
                        setNodeSelected(true);
                        // set the color of the clicked on objet to the it's selected color
                        if (
                            selectedObject.current instanceof THREE.Mesh &&
                            selectedObject.current.material instanceof THREE.MeshBasicMaterial
                        ) {
                            selectedObject.current.material.color.set(0x000000);
                        }
                    }
                    // The clicked on object is already selected (deselection when clicking on an already selected object)
                    else {
                        // set the color of the clicked on object to it's non-selected color
                        if (
                            selectedObject.current instanceof THREE.Mesh &&
                            selectedObject.current.material instanceof THREE.MeshBasicMaterial
                        ) {
                            selectedObject.current.material.color.set(0xffff00);
                        }
                        // clear the selected object
                        selectedObject.current = null;
                        setNodeSelected(false);
                    }
                    updateDraggableObjects();
                }
            }
        });

        // Safety net for edge cases
        const handleMouseUp = () => {
            setTimeout(() => {
                orbitControls.enabled = true;
            }, 10);
        };

        const handleMouseLeave = () => {
            setTimeout(() => {
                orbitControls.enabled = true;
            }, 10);
        };

        window.addEventListener('mouseup', handleMouseUp);

        renderer.domElement.addEventListener('mouseleave', handleMouseLeave);

        const animate = () => {
            if (selectedObject.current) {
                // Update state with selected object position
                setNodeX(selectedObject.current.position.x);
                setNodeY(selectedObject.current.position.y);
            }

            // Get delta time for animation
            const deltaTime = clockRef.current.getDelta();

            // Update flowing animation
            if (animationRef.current) {
                animationRef.current.update(deltaTime);
            }

            // Render the current scene
            renderer.render(scene.current, camera);
            window.requestAnimationFrame(animate);

            return () => {
                renderer.dispose();
                mapMaterial.dispose();
                mapTexture.dispose();
                scene.current.traverse((obj) => {
                    if ((obj as THREE.Mesh).material) {
                        ((obj as THREE.Mesh).material as THREE.Material).dispose();
                    }
                    if ((obj as THREE.Mesh).geometry) {
                        ((obj as THREE.Mesh).geometry as THREE.BufferGeometry).dispose();
                    }
                });
                scene.current.clear();
            };
        };
        animate();
    }, [floor]);

    return (
      <Box w="100vw" h="100vh">
          <FloorSwitchBox
            floor={floor}
            setFloor={handleFloorChange}
            onCollapseChange={() => true}
            building={selectedHospitalName || ''}
          />
          <MapEditorBox
            // Pass selected node data to the ui
            nodeSelected={nodeSelected}
            nodeX={nodeX}
            nodeY={nodeY}
            floor={floor}
            // handle updating the node position from ui
            updateNodePosition={updateNodePosition}
          />
        <canvas
          id="insideMapCanvas"
          style={{width: '100%', height: '100%', position: 'absolute'}}
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
