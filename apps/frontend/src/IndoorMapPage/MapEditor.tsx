import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Box } from '@mantine/core';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DragControls } from 'three/addons/controls/DragControls.js';
import MapEditorBox from './Components/MapEditorBox.tsx';
import { DirectoryNodeItem } from '../contexts/DirectoryItem.ts';
import FloorSwitchBox from './Components/FloorManagerBox.tsx';
import { useAllNodesContext } from '../contexts/DirectoryContext.tsx';
import { useLogin } from '../home-page/components/LoginContext.tsx';
import { createNode } from './HelperFiles/NodeFactory.ts';
import { createAllScenes } from './HelperFiles/SceneFactory.ts';

export function MapEditor() {
    const [nodeSelected, setNodeSelected] = useState(false);
    const [nodeX, setNodeX] = useState(0);
    const [nodeY, setNodeY] = useState(0);
    const [floorState, setFloorState] = useState(1);
    const [selectedHospitalName, setSelectedHospitalName] = useState('20 Patriot Pl');
    const [isFading, setIsFading] = useState(false);
    const selectedObject = useRef<THREE.Object3D<THREE.Object3DEventMap> | null>(null); // useref so the selectedObject position can be set from the UI
    const objectsRef = useRef<THREE.Object3D[]>([new THREE.Object3D()]);
    const controlRef = useRef<OrbitControls | null>(null);
    const canvasId = 'insideMapCanvas';

    const allNodes = useAllNodesContext();

    const cameraRef = useRef<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera());
    const scenesRef = useRef<THREE.Scene[]>([]);
    const [sceneIndexState, setSceneIndexState] = useState<number>(0);
    const canvasRef = useRef<HTMLElement | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const draggableObjectsRef = useRef<THREE.Object3D[]>([]);

    // Parameters for THREEjs objects and path display
    const nodeColor = 0xeafeff;
    const selectedNodeColor = 0x56effa;
    const edgeColor = 0x2a68f7;
    const nodeRadius = 1.5;
    const edgeRad = 0.75;
    /*
    Patriot Place Floor 1 -> floor1 -> scene 1
    Patriot Place Floor 3 -> floor2 -> scene 2
    Patriot Place Floor 4 -> floor3 -> scene 3
    Chestnut Hill Floor 1 -> floor4 -> scene 4
     */

    const getNode = (id: number): DirectoryNodeItem | null => {
        for (const node of allNodes) {
            if (node.id === id) {
                return node;
            }
        }
        return null;
    };

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

    // basic edge creation
    const createEdge = (node1: DirectoryNodeItem, node2: DirectoryNodeItem) => {
        const startPoint = new THREE.Vector3(node1.x, node1.y, 0);
        const endPoint = new THREE.Vector3(node2.x, node2.y, 0);
        const path = new THREE.LineCurve3(startPoint, endPoint);
        const geometry = new THREE.TubeGeometry(path, 1, edgeRad, edgeRad * 4, false);
        const material = new THREE.MeshBasicMaterial({ color: edgeColor });
        const mesh = new THREE.Mesh(geometry, material);
        if (node1.floor === node2.floor && node1.floor === 1) {
            scenesRef.current[0].add(mesh);
        } else if (node1.floor === node2.floor && node1.floor === 2) {
            scenesRef.current[1].add(mesh);
        } else if (node1.floor === node2.floor && node1.floor === 3) {
            scenesRef.current[2].add(mesh);
        } else if (node1.floor === node2.floor && node1.floor === 4) {
            scenesRef.current[3].add(mesh);
        }
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

    useEffect(() => {
        canvasRef.current = document.getElementById(canvasId);

        // Create camera
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
        controlRef.current = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
        controlRef.current.enableRotate = false;
        controlRef.current.mouseButtons = {
            LEFT: THREE.MOUSE.PAN,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.ROTATE,
        };

        scenesRef.current = createAllScenes();

        // populate all nodes and edges
        for (const node of allNodes) {
            if (node.x !== 0 && node.y !== 0) {
                createNode(node, scenesRef.current); //Create the nodes
                for (const connectingNodeId of node.connectingNodes) {
                    // iterate over each connected node.
                    const connectedNode = getNode(connectingNodeId);
                    // TODO: Add another check that makes it so duplicate edge objects aren't created
                    if (connectedNode) {
                        createEdge(node, connectedNode);
                    }
                }
            }
        }

        // Function to update draggable objects to make sure only selected objects can be dragged
        const updateDraggableObjects = () => {
            // Create a new array with only the selected object (if any)
            if (selectedObject.current) {
                draggableObjectsRef.current.push(selectedObject.current);
            }
            // new dragControls with the updated array
            const dragControls = new DragControls(
                draggableObjectsRef.current,
                cameraRef.current,
                rendererRef.current.domElement
            );
            // Event listeners that enable camera movement
            dragControls.addEventListener('dragstart', function () {
                controlRef.current.enabled = false;
            });
            dragControls.addEventListener('dragend', function () {
                setTimeout(() => {
                    controlRef.current.enabled = true;
                }, 10);
            });
        };

        // dragControls are used for node movement with mouse
        const draggableObjects: THREE.Object3D[] = [];
        if (rendererRef.current) {
            const dragControls = new DragControls(
                draggableObjects,
                cameraRef.current,
                rendererRef.current.domElement
            );
            // Disable map movement when dragging a node so both don't move together
            // Event listeners should run even when in the initialization useEffect
            dragControls.addEventListener('dragstart', function () {
                controlRef.current.enabled = false;
            });

            dragControls.addEventListener('dragend', function () {
                setTimeout(() => {
                    controlRef.current.enabled = true;
                }, 10);
            });

            // raycaster for selecting nodes adapted from: https://codesandbox.io/p/sandbox/basic-threejs-example-with-re-use-dsrvn?file=%2Fsrc%2Findex.js%3A93%2C3-93%2C41
            const raycaster = new THREE.Raycaster();
            const pointer = new THREE.Vector2();

            window.addEventListener('click', (event) => {
                if (canvasRef.current) {
                    const rect = canvasRef.current.getBoundingClientRect();
                    // normalize pointer position (-1 to 1 in x and y)
                    pointer.x =
                        ((event.clientX - rect.left) / canvasRef.current!.clientWidth) * 2 - 1;
                    pointer.y =
                        -((event.clientY - rect.top) / canvasRef.current!.clientHeight) * 2 + 1;
                    raycaster.setFromCamera(pointer, cameraRef.current);
                    // calculate objects intersecting the picking ray
                    const intersects = raycaster.intersectObjects(objectsRef.current);
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
                                    selectedObject.current.material instanceof
                                        THREE.MeshBasicMaterial
                                ) {
                                    selectedObject.current.material.color.set(nodeColor); //set the already selected object back to it's non-selected color
                                }
                            }
                            selectedObject.current = intersect.object; // switch selected object to the clicked on object
                            setNodeSelected(true);
                            // set the color of the clicked on objet to it's selected color
                            if (
                                selectedObject.current instanceof THREE.Mesh &&
                                selectedObject.current.material instanceof THREE.MeshBasicMaterial
                            ) {
                                selectedObject.current.material.color.set(selectedNodeColor);
                            }
                        }
                        // The clicked on object is already selected (deselection when clicking on an already selected object)
                        else {
                            // set the color of the clicked on object to it's non-selected color
                            if (
                                selectedObject.current instanceof THREE.Mesh &&
                                selectedObject.current.material instanceof THREE.MeshBasicMaterial
                            ) {
                                selectedObject.current.material.color.set(nodeColor);
                            }
                            // clear the selected object
                            selectedObject.current = null;
                            setNodeSelected(false);
                        }
                        updateDraggableObjects();
                    }
                }
            });

            // make sure map movement is re-enabled for some edge cases
            const handleMouseUp = () => {
                setTimeout(() => {
                    controlRef.current.enabled = true;
                }, 10);
            };
            const handleMouseLeave = () => {
                setTimeout(() => {
                    controlRef.current.enabled = true;
                }, 10);
            };

            window.addEventListener('mouseup', handleMouseUp);
            if (rendererRef.current) {
                rendererRef.current.domElement.addEventListener('mouseleave', handleMouseLeave);
            }
        }
    }, []);

    useEffect(() => {
        const animate = () => {
            if (selectedObject.current) {
                // Update state with selected object position
                setNodeX(selectedObject.current.position.x);
                setNodeY(selectedObject.current.position.y);
            }

            // Render the current scene
            if (rendererRef.current) {
                rendererRef.current.render(scenesRef.current[sceneIndexState], cameraRef.current);
            }
            window.requestAnimationFrame(animate);
            return () => {};
        };
        animate();
    }, [sceneIndexState]);

    return (
        <Box w="100vw" h="100vh" p={0}>
            <FloorSwitchBox floor={floorState} setFloor={handleFloorChange} building={'admin'} />
            <MapEditorBox
                // Pass selected node data to the ui
                nodeSelected={nodeSelected}
                nodeX={nodeX}
                nodeY={nodeY}
                // handle updating the node position from ui
                updateNodePosition={updateNodePosition}
            />
            <canvas
                id="insideMapCanvas"
                style={{ width: '100%', height: '100%', position: 'absolute' }}
            />

            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#000',
                    opacity: isFading ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out',
                    pointerEvents: 'none',
                    zIndex: 5,
                }}
            />
        </Box>
    );
}
