import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Box } from '@mantine/core';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DragControls } from 'three/addons/controls/DragControls.js';
import MapEditorBox from './Components/MapEditorBox.tsx';
import { getNode } from './GetNodeRouting.ts';
import { NodeDataType } from './MapClasses/MapTypes.ts';
import FloorSwitchBox from './Components/FloorManagerBox.tsx';
import { useAllNodesContext } from '../contexts/DirectoryContext.tsx';

export function MapEditor() {
    const [nodeSelected, setNodeSelected] = useState(false);
    const [nodeX, setNodeX] = useState(0);
    const [nodeY, setNodeY] = useState(0);
    const [floor, setFloor] = useState(1);
    const [isFading, setIsFading] = useState(false);
    const selectedObject = useRef<THREE.Object3D<THREE.Object3DEventMap> | null>(null); // useref so the selectedObject position can be set from the UI
    const objectsRef = useRef<THREE.Object3D[]>([new THREE.Object3D()]);
    const canvasId = 'insideMapCanvas';

    const allNodes = useAllNodesContext();
    const addedNodes = [];

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
    mapTexture.colorSpace = THREE.SRGBColorSpace;
    const mapGeo1 = new THREE.PlaneGeometry(500, 281);
    const mapMaterial1 = new THREE.MeshBasicMaterial({ map: mapTexture1 });
    const mapPlane1 = new THREE.Mesh(mapGeo1, mapMaterial1);
    mapPlane1.position.set(0, 0, 0);
    scene2.add(mapPlane1);
    const scene3 = new THREE.Scene();
    const texturePath2 = '../../public/MapImages/Patriot Place Floor 4.png';
    const mapTexture2 = new THREE.TextureLoader().load(texturePath2);
    mapTexture.colorSpace = THREE.SRGBColorSpace;
    const mapGeo2 = new THREE.PlaneGeometry(500, 281);
    const mapMaterial2 = new THREE.MeshBasicMaterial({ map: mapTexture2 });
    const mapPlane2 = new THREE.Mesh(mapGeo2, mapMaterial2);
    mapPlane2.position.set(0, 0, 0);
    scene3.add(mapPlane2);
    const scene4 = new THREE.Scene();
    const texturePath3 = '../../public/MapImages/Chestnut Hill Floor 1.png';
    const mapTexture3 = new THREE.TextureLoader().load(texturePath3);
    mapTexture.colorSpace = THREE.SRGBColorSpace;
    const mapGeo3 = new THREE.PlaneGeometry(500, 281);
    const mapMaterial3 = new THREE.MeshBasicMaterial({ map: mapTexture3 });
    const mapPlane3 = new THREE.Mesh(mapGeo3, mapMaterial3);
    mapPlane3.position.set(0, 0, 0);
    scene4.add(mapPlane3);
    const scene = useRef<THREE.Scene>(scene1);

    const createNode = (node: NodeDataType) => {
        if (!addedNodes.includes(node)) {
            // TODO: This shouldn't be necessary but something is creating duplicated nodes and I don't know what.
            addedNodes.push(node);
            const geometry = new THREE.SphereGeometry(
                nodeRadius,
                Math.round(nodeRadius * 12), // Vibe based adaptive segmentation
                Math.round(nodeRadius * 6)
            );
            const material = new THREE.MeshBasicMaterial({ color: nodeColor });
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
            objectsRef.current.push(sphere);
        }
    };

    const createEdge = (node1: NodeDataType, node2: NodeDataType) => {
        const startPoint = new THREE.Vector3(node1.x, node1.y, 0);
        const endPoint = new THREE.Vector3(node2.x, node2.y, 0);
        const path = new THREE.LineCurve3(startPoint, endPoint);
        const geometry = new THREE.TubeGeometry(path, 1, edgeRad, edgeRad * 4, false);
        const material = new THREE.MeshBasicMaterial({ color: edgeColor });
        const mesh = new THREE.Mesh(geometry, material);
        if (node1.floor === node2.floor && node1.floor === 1) {
            scene1.add(mesh);
        } else if (node1.floor === node2.floor && node1.floor === 2) {
            scene2.add(mesh);
        } else if (node1.floor === node2.floor && node1.floor === 3) {
            scene3.add(mesh);
        } else if (node1.floor === node2.floor && node1.floor === 4) {
            scene4.add(mesh);
        }
    };

    const handleFloorChange = (newFloor: number) => {
        if (newFloor === floor) return;
        setIsFading(true);
        setTimeout(() => {
            setFloor(newFloor);
            if (newFloor === 1) {
                scene.current = scene1;
            } else if (newFloor === 3) {
                scene.current = scene2;
            } else if (newFloor === 4) {
                scene.current = scene3;
            } else if (newFloor === 5) {
                scene.current = scene4;
            }
            setTimeout(() => {
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

    // populate all nodes and edges once (in use effect)
    for (const node of allNodes) {
        if (node.x !== 0 && node.y !== 0) {
            createNode(node); //Create the nodes
            for (const connectingNodeId of node.connectingNodes) {
                // iterate over each connected node. TODO: Set up function for getting connected nodes from context
                const connectedNode = getNode(connectingNodeId).then(async (connectednoderes) => {
                    // TODO: Add another check that makes it so duplicate edge objects aren't created
                    createEdge(node, connectednoderes.result.nodeData);
                });
            }
        }
    }

    // This useEffect runs every time the floor changes
    useEffect(() => {
        // Get canvas element
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

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
                const intersects = raycaster.intersectObjects(objectsRef.current);
                console.log('intersect: ', intersects);
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
                                selectedObject.current.material.color.set(nodeColor); //set the already selected object back to it's non-selected color
                            }
                        }
                        selectedObject.current = intersect.object; // switch selected object to the clicked on object
                        setNodeSelected(true);
                        // set the color of the clicked on objet to the it's selected color
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
            requestAnimationFrame(animate);

            if (selectedObject.current) {
                // Update state with selected object position
                setNodeX(selectedObject.current.position.x);
                setNodeY(selectedObject.current.position.y);
            }

            // Render the current scene
            renderer.render(scene.current, camera);

            return () => {};
        };
        animate();
    }, [floor]);

    return (
        <Box w="100vw" h="100vh" p={0}>
            <FloorSwitchBox floor={floor} setFloor={handleFloorChange} building={'admin'} />
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
