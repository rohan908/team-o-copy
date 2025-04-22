import { useEffect, useRef, useState, createContext, useCallback} from 'react';
import * as THREE from 'three';
import { Box } from '@mantine/core';
import { DragControls } from 'three/addons/controls/DragControls.js';
import MapEditorBox from './Components/MapEditorBox.tsx';
import { DirectoryNodeItem } from '../contexts/DirectoryItem.ts';
import FloorSwitchBox from './Components/FloorManagerBox.tsx';
import { useAllNodesContext } from '../contexts/DirectoryContext.tsx';
import { useLogin } from '../home-page/components/LoginContext.tsx';
import { createNode } from './HelperFiles/NodeFactory.ts';
import { mapSetup, getNode } from './HelperFiles/MapSetup.tsx';
import { clearSceneObjects } from './HelperFiles/ClearNodesAndEdges.ts';

export interface MapEditorProps {
  selectedTool: string;
  setSelectedTool: (tool: string) => void;
  newNodes?: DirectoryNodeItem[];
  nodeSelected?: (isSelected: boolean) => void;
  nodeX?: number;
  nodeY?: number;
  floor?: number;
  updateNodePosition?: (x: number, y: number, floor: number) => void;
}

export const MapContext = createContext<MapEditorProps>({});

export function MapEditor() {
    const [nodeSelected, setNodeSelected] = useState(false);
    const [floorState, setFloorState] = useState(1);
    const [isFading, setIsFading] = useState(false);
    const [cursorStyle, setCursorStyle] = useState('pointer')
    const [mapTool, setMapTool] = useState('pan');
    const [newNodes, setNewNodes] = useState<DirectoryNodeItem[]>([]);

    const mapProps: MapEditorProps = {
      selectedTool: mapTool,
      setSelectedTool: setMapTool,
      newNodes: newNodes,
    };

    const { isLoggedIn } = useLogin();
    const selectedObjects = useRef<THREE.Object3D[]>([]);
    const [selectedObjectsInfo, setSelectedObjectsInfo] = useState<
        { nodeId: string; x: number; y: number }[]
    >([]);
    const objectsRef = useRef<THREE.Object3D[]>([]);
    const dragControlsRef = useRef<DragControls | null>(null);
    const edgeMeshesRef = useRef<
        {
            mesh: THREE.Mesh;
            startNodeId: number;
            endNodeId: number;
        }[]
    >([]);

    const allNodes = useAllNodesContext();

    const [sceneIndexState, setSceneIndexState] = useState<number>(0);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
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

    // set up map
    const { cameraRef, rendererRef, scenesRef, controlRef } = mapSetup({
        canvasId: 'insideMapCanvas',
    });

    // basic edge creation
    const createEdge = (node1: DirectoryNodeItem, node2: DirectoryNodeItem) => {
        const startPoint = new THREE.Vector3(node1.x, node1.y, 0);
        const endPoint = new THREE.Vector3(node2.x, node2.y, 0);
        const path = new THREE.LineCurve3(startPoint, endPoint);
        const geometry = new THREE.TubeGeometry(path, 1, edgeRad, edgeRad * 4, false);
        const material = new THREE.MeshBasicMaterial({ color: edgeColor });
        const mesh = new THREE.Mesh(geometry, material);
        edgeMeshesRef.current.push({
            mesh,
            startNodeId: node1.id,
            endNodeId: node2.id,
        });
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
        if (floor === 1) return 0;
        if (floor === 3) return 1;
        if (floor === 4) return 2;
        if (floor === 5) return 3;
        return 0;
    };

    // associated floors with scenes
    const getFloorAndMapIDFromSceneIndex = (index: number) => {
      if (index === 0) return {floor: 1, mapID: 1};
      if (index === 1) return {floor: 3, mapID: 1};
      if (index === 2) return {floor: 4, mapID: 1};
      if (index === 3) return {floor: 5, mapID: 2};
      return {floor: 1, mapID: 1};
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

    // updates the selected node position from UI
    const updateNodePosition = (x: number, y: number, floor: number) => {
        if (selectedObjects.current.length === 1) {
            selectedObjects.current[0].position.x = x;
            selectedObjects.current[0].position.y = y;
            console.log(`Node position updated to: x=${x}, y=${y}, floor=${floor}`);
        }
    };

    const updateEdges = (movedNodeId: number, newPosition: THREE.Vector3) => {
        edgeMeshesRef.current.forEach((edge) => {
            if (edge.startNodeId === movedNodeId || edge.endNodeId === movedNodeId) {
                // new start and end positions
                let startPos, endPos;

                if (edge.startNodeId === movedNodeId) {
                    // selected node is the edge's start node
                    // update the start position
                    startPos = newPosition;
                    // find the end node by comparing threejs Id with node Id
                    const endNode = objectsRef.current.find(
                        (obj) => obj.userData.nodeId === edge.endNodeId
                    );
                    // get the existing position of the end node
                    if (endNode) {
                        endPos = new THREE.Vector3(
                            endNode.position.x,
                            endNode.position.y,
                            endNode.position.z
                        );
                    }
                } else {
                    endPos = newPosition;
                    // selected node is the edge's end node
                    const startNode = objectsRef.current.find(
                        (obj) => obj.userData.nodeId === edge.startNodeId
                    );
                    if (startNode) {
                        startPos = new THREE.Vector3(
                            startNode.position.x,
                            startNode.position.y,
                            startNode.position.z
                        );
                    }
                }

                // new tube geometry
                const path = new THREE.LineCurve3(startPos, endPos);
                const newGeometry = new THREE.TubeGeometry(path, 1, edgeRad, edgeRad * 4, false);

                // dispose old mesh
                edge.mesh.geometry.dispose();

                // update with new mesh
                edge.mesh.geometry = newGeometry;
            }
        });
    };

    // render function that can be called from anywhere so we can render only when needed.
    const render = () => {
        if (rendererRef.current && scenesRef.current && cameraRef.current) {
            rendererRef.current.render(scenesRef.current[sceneIndexState], cameraRef.current);
        }
    };

    useEffect(() => {
        clearSceneObjects(scenesRef.current); // clear all nodes and edges
        // populate all nodes and edges
        for (const node of allNodes) {
            if (node.x !== 0 && node.y !== 0) {
                createNode(node, scenesRef.current, objectsRef, nodeRadius, {
                    color: nodeColor,
                }); //Create the nodes
                for (const connectingNodeId of node.connectingNodes) {
                    // iterate over each connected node.
                    const connectedNode = getNode(connectingNodeId, allNodes);
                    // TODO: Add another check that makes it so duplicate edge objects aren't created
                    if (connectedNode) {
                        createEdge(node, connectedNode);
                    }
                }
            }
        }
    }, [allNodes]);

    const updateDragControls = () => {
        // dispose existing drag controls if they exist
        if (dragControlsRef.current) {
            dragControlsRef.current.dispose();
        }

        // create drag controls if there are selected objects
        if (selectedObjects.current.length > 0) {
            dragControlsRef.current = new DragControls(
                selectedObjects.current, // Use selected objects directly
                cameraRef.current,
                rendererRef.current.domElement
            );

            // add event listeners to enable / enable map dragging while dragging nodes
            dragControlsRef.current.addEventListener('dragstart', function () {
                controlRef.current.enabled = false;
            });

            dragControlsRef.current.addEventListener('drag', function (event) {
                const draggedObject = event.object;
                const nodeId = draggedObject.userData.nodeId;
                console.log('dragging node: ', nodeId);
                if (nodeId) {
                    updateEdges(nodeId, draggedObject.position);
                }
                render(); // re-render during drag
            });

            dragControlsRef.current.addEventListener('dragend', function () {
                setTimeout(() => {
                    controlRef.current.enabled = true;
                }, 10);
                render(); // render after dragging as well to make the scene is up to date
            });
        }
    };

    const selectObject = (selectedObject: THREE.Object3D) => {
        if (
            selectedObject instanceof THREE.Mesh &&
            selectedObject.material instanceof THREE.MeshBasicMaterial
        ) {
            selectedObject.material.color.set(selectedNodeColor);
            selectedObject.material.needsUpdate = true;
            selectedObjects.current.push(selectedObject);
            render(); // render to show color changes
            updateDragControls();
        }
    };
    const deselectObject = (selectedObject: THREE.Object3D) => {
        if (
            selectedObject instanceof THREE.Mesh &&
            selectedObject.material instanceof THREE.MeshBasicMaterial
        ) {
            selectedObject.material.color.set(nodeColor);
            selectedObject.material.needsUpdate = true;
            selectedObjects.current = selectedObjects.current.filter(
                (object) => object !== selectedObject
            );
            render(); // render to show color changes
            updateDragControls();
        }
    };

    // Once initialized event listeners will operate continuously. Thus they can just be put in a useEffect with no dependencies that will run once.
    useEffect(() => {
        // raycaster for selecting nodes adapted from: https://codesandbox.io/p/sandbox/basic-threejs-example-with-re-use-dsrvn?file=%2Fsrc%2Findex.js%3A93%2C3-93%2C41
        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();

        // switches the type of cursor depending on the tool
        switch(mapTool) {
          case 'pan':
            setCursorStyle('pointer');
            break;
          case 'add-node':
            setCursorStyle('crosshair');
            break;
        }

        const handleClick = (event) => {
            if (!canvasRef.current || !cameraRef.current) {
                console.log('Canvas or camera ref not available');
                return;
            }

            const rect = canvasRef.current.getBoundingClientRect();
            // check if click is within canvas bounds
            if (
                event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom
            ) {
                return;
            }

            // normalize pointer position (-1 to 1 in x and y)
            pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            // ray from the camera position to the pointer
            raycaster.setFromCamera(pointer, cameraRef.current);

            const intersects = raycaster.intersectObjects(objectsRef.current, true);

            console.log(mapTool)

          if (intersects.length > 0) {
            const selectedObject = intersects[0].object;
            if (selectedObjects.current.includes(selectedObject)) {
              deselectObject(selectedObject);
              console.log('Deselected:', selectedObject);
            } else {
              selectObject(selectedObject);
              console.log('Selected:', selectedObject);
            }
          } else {
            console.log('No object hit');
          }

          };

        window.addEventListener('click', handleClick);

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

        return () => {
          window.removeEventListener('click', handleClick);
          // clear refs on dismount
          selectedObjects.current = [];
          edgeMeshesRef.current = [];
          objectsRef.current = [];
        }
    }, []);

    useEffect(() => {

      const handleClick = () => {

        if(mapTool == 'add-node' && intersects.length == 0) {

          // new node positon
          const point = raycaster.intersectObjects(scenesRef.current[sceneIndexState].children, true);

          const posX = point[0].point.x;
          const posY = point[0].point.y;

          const {floor, mapID} = getFloorAndMapIDFromSceneIndex(sceneIndexState);

          const newNode: DirectoryNodeItem = {
            id: 1000,
            x: posX,
            y: posY,
            floor: floor,
            mapId: mapID,
            name: "",
            description: "",
            nodeType: "",
            connectingNodes: [],
          }

          newNodes.push(newNode);
          setNewNodes(newNodes);

          createNode(newNode, scenesRef.current, objectsRef, nodeRadius, {
            color: nodeColor,
          }); //Create the nodes
        }

      }
    })

    /*
      OK the way animations work is that calling animate() will start an animation loop that runs continuously. However,
      if you want the actual renderer to change, i.e. change the scene or camera, you need to restart the animation loop.
      That's why the scene is in the useEffect dependency.
     */
    useEffect(() => {
        let animationFrameId: number;

        const animate = () => {
            if (selectedObjects.current.length === 1) {
                // Update state when user specifies the position
                //setNodeX(selectedObjects.current[0].position.x);
                //setNodeY(selectedObjects.current[0].position.y);
            }

            // Render the current scene
            render();

            animationFrameId = window.requestAnimationFrame(animate);
        };

        // Start the animation
        animate();

        return () => {
            if (animationFrameId) {
                window.cancelAnimationFrame(animationFrameId); // stop animation on dismount
            }
        };
    }, [sceneIndexState]);

    return (
        <Box w="100vw" h="100vh" p={0}>
            <FloorSwitchBox floor={floorState} setFloor={handleFloorChange} building={'admin'} />
            <MapContext.Provider value={mapProps}>
              <MapEditorBox/>
            </MapContext.Provider>

            <canvas
                ref={canvasRef}
                id="insideMapCanvas"
                style={{ width: '100%', height: '100%', position: 'absolute', cursor: cursorStyle}}
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
