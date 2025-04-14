import { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { Box, useMantineTheme } from '@mantine/core';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DragControls } from 'three/addons/controls/DragControls.js';
import MapEditorBox from './Components/MapEditorBox.tsx';
import { TubeGeometry } from 'three';
import { Node } from './MapClasses/Node.ts';
import { findPath } from './FindPathRouting.ts';
import { getNode } from './GetNodeRouting.ts';
import { NodeDataType } from './MapClasses/MapTypes.ts';

export function DraggableMap() {
    const theme = useMantineTheme();
    const [nodeSelected, setNodeSelected] = useState(false);
    const [nodeX, setNodeX] = useState(0);
    const [nodeY, setNodeY] = useState(0);
    const [floor, setNodeFloor] = useState(0);
    const selectedObject = useRef<THREE.Object3D<THREE.Object3DEventMap> | null>(null); // useref so the selectedObject position can be set from the UI
    const scene = new THREE.Scene();
    const objects: THREE.Object3D[] = [];
    objects.push(new THREE.Object3D());

    // Parameters for THREEjs objects and path display
    const firstNodeId = 1; // start node
    const lastNodeId = 10; // destination node
    const nodeColor = { color: 0xffff00 };
    const edgeColor = { color: 0xff0000 };
    const nodeRadius = 2;
    const edgeRadius = 1.5;

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
        scene.add(sphere);
        objects.push(sphere);
    };

    const createEdge = (node1: NodeDataType, node2: NodeDataType) => {
        const xStart = node1.x;
        const yStart = node1.y;
        const xEnd = node2.x;
        const yEnd = node2.y;
        const path = new THREE.LineCurve3(
            new THREE.Vector3(xStart, yStart, 0),
            new THREE.Vector3(xEnd, yEnd, 0)
        );
        const geometry = new TubeGeometry(path, 1, edgeRadius, Math.round(edgeRadius * 4));
        const material = new THREE.MeshBasicMaterial(edgeColor);
        const edge = new THREE.Mesh(geometry, material);
        scene.add(edge);
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
        // Get canvas element
        const canvas = document.getElementById('insideMapCanvas');
        // if the canvas element is not found, we return
        if (!canvas) return;

        // we create a new renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas as HTMLCanvasElement,
            antialias: true, //makes objects look smooth
        });
        renderer.setSize(canvas!.clientWidth, canvas!.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Create camera
        const camera = new THREE.PerspectiveCamera(
            45,
            canvas.clientWidth / canvas.clientHeight,
            1,
            10000
        );
        camera.position.set(0, 0, 300);

        // Setup map plane
        const mapTexture = new THREE.TextureLoader().load('/public/MapImages/OutsideMap.png');
        const mapGeo = new THREE.PlaneGeometry(500, 400);
        const mapMaterial = new THREE.MeshBasicMaterial({ map: mapTexture });
        const mapPlane = new THREE.Mesh(mapGeo, mapMaterial);
        mapPlane.position.set(0, 0, 0);
        scene.add(mapPlane);

        // Camera controls
        const orbitControls = new OrbitControls(camera, renderer.domElement);
        //orbitControls.enableRotate = false;
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
                // selected object use state position for passing to UI
                setNodeX(selectedObject.current.position.x);
                setNodeY(selectedObject.current.position.y);
                setNodeFloor(1); //TODO: Setup floor handling with floor switcher, may not want this functionality at all.
            }

            renderer.render(scene, camera);
            window.requestAnimationFrame(animate);
        };
        animate();
    }, []);

    return (
        <Box w="100vw" h="100vh" p={0}>
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
        </Box>
    );
}
