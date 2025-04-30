import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Box } from '@mantine/core';
import FloorSwitchBox from './Components/FloorManagerBox.tsx';
import { FlowingTubeAnimation } from './Edge.tsx';
import {
    useAllNodesContext,
    useBwhCampusContext,
    useChestnutHillContext,
    useFaulknerHospitalContext,
    usePatriotContext,
} from '../contexts/DirectoryContext.js';
import { useNavSelectionContext } from '../contexts/NavigationContext.tsx';
import { findPath } from './HelperFiles/FindPathRouting.ts';
import { DirectoryNodeItem } from '../contexts/DirectoryItem.ts';
import { clearPathObjects, clearSceneObjects } from './HelperFiles/ClearNodesAndEdges.ts';
import { createNode } from './HelperFiles/NodeFactory.tsx';
import { getNode, mapSetup } from './HelperFiles/MapSetup.tsx';
import { DisplayDirectionsBox } from './DisplayDirectionsBox.tsx';
import { useTimeline } from '../HomePage/TimeLineContext.tsx';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useLocation } from 'react-router-dom';
import { element } from 'prop-types';
import { useAlgorithmContext } from '../contexts/AlgorithmContext.tsx';
export function DraggableMap() {
    /*
      References that exist outside renders, changeable floor state, and properties like theme
     */
    const { selectedHospital } = useTimeline();

    const allNodes = useAllNodesContext();
    const navSelection = useNavSelectionContext();
    const selectedHospitalName = navSelection.state.navSelectRequest?.HospitalName;
    const selectedDepartment = navSelection.state.navSelectRequest?.Department;
    // context instead
    const { algorithm } = useAlgorithmContext();

    // Declares context for start and end node information
    const patriotNodes = usePatriotContext();
    const chestnutNodes = useChestnutHillContext();
    const faulknerNodes = useFaulknerHospitalContext();
    const bwhNodes = useBwhCampusContext();

    // Animation related refs
    const animationRef = useRef<FlowingTubeAnimation | null>(null);
    const clockRef = useRef<THREE.Clock>(new THREE.Clock());

    const [floorState, setFloorState] = useState(5);
    const [sceneIndexState, setSceneIndexState] = useState(0);

    // used to space apart floors and nodes and edges on those floors
    const floorHeight = 10.5;

    // route to make the floor select box not show up on the home page
    const location = useLocation();
    const isIndoorMapPage = location.pathname.includes('IndoorMapPage');

    // set up map
    const { cameraRef, rendererRef, scenesRef, controlRef } = mapSetup({
        canvasId: 'insideMapCanvas',
    });

    const handleHospitalChange = (hospitalName: string) => {
        if (hospitalName === '20 Patriot Pl' || hospitalName === '22 Patriot Pl') {
            if (sceneIndexState !== 0) {
                // handle default state
                clearSceneObjects(scenesRef.current);
                handleThreeDHospitalChange();
                setSceneIndexState(0);
            }
        } else if (hospitalName === 'Chestnut Hill') {
            clearSceneObjects(scenesRef.current);
            handleTwoDHospitalChange();
            setSceneIndexState(3);
            setFloorState(1); // Assuming Chestnut Hill starts at floor 1
        } else if (hospitalName === 'Faulkner Hospital') {
            clearSceneObjects(scenesRef.current);
            handleTwoDHospitalChange();
            setSceneIndexState(4);
            setFloorState(1);
        } else if (hospitalName === 'BWH Campus') {
            clearSceneObjects(scenesRef.current);
            handleTwoDHospitalChange();
            setSceneIndexState(5);
            setFloorState(1);
        }
    };

    //stupid fix for adams hard coding bruh, need to switch the scene depending on the selected hopsital going to the indoor map page
    useEffect(() => {
        if (selectedHospital === '20 Patriot Pl' || selectedHospital === '22 Patriot Pl') {
            setSceneIndexState(0);
        } else if (selectedHospital === 'Chestnut Hill') {
            setSceneIndexState(3);
            setFloorState(1); // Assuming Chestnut Hill starts at floor 1
        } else if (selectedHospital === 'Faulkner Hospital') {
            setSceneIndexState(4);
            setFloorState(1);
        } else if (selectedHospital === 'BWH Campus') {
            setSceneIndexState(5);
            setFloorState(1);
        } else {
            setSceneIndexState(0);
            setFloorState(1);
        }
    }, [selectedHospital]);

    // shows or hides a floor
    const floorVisibility = (floor: number, visible: boolean) => {
        scenesRef.current[sceneIndexState].traverse((object) => {
            if (
                object.userData &&
                object.userData.objectType == 'Floor' &&
                object.userData.floor === floor
            ) {
                object.visible = visible;
            }
        });
    };

    // shows or hides all path objects on a floor
    const pathVisibility = (floor: number, visible: boolean) => {
        scenesRef.current[sceneIndexState].traverse((object) => {
            if (
                object.userData &&
                object.userData.objectType == 'path' &&
                object.userData.floor === floor
            ) {
                object.visible = visible;
            }
        });
    };

    const setTwoDView = () => {
        if (selectedHospitalName == '20 Patriot Pl' || selectedHospitalName == '22 Patriot Pl') {
            cameraRef.current.position.set(0, -50, 200);
            cameraRef.current.up.set(0, 0, 1);
            cameraRef.current.rotation.set(0, 0, 0);
            cameraRef.current.quaternion.identity();
            controlRef.current.target.set(0, -50, 0);
            cameraRef.current.lookAt(0, -50, 0);
            cameraRef.current.zoom = 1.5;
            cameraRef.current.updateMatrixWorld(true);
            cameraRef.current.updateProjectionMatrix();
            controlRef.current.enableRotate = false;
        } else {
            cameraRef.current.position.set(0, 0, 200);
            cameraRef.current.up.set(0, 0, 1);
            cameraRef.current.rotation.set(0, 0, 0);
            cameraRef.current.quaternion.identity();
            controlRef.current.target.set(0, 0, 0);
            cameraRef.current.lookAt(0, 0, 0);
            cameraRef.current.zoom = 1;
            cameraRef.current.updateMatrixWorld(true);
            cameraRef.current.updateProjectionMatrix();
            controlRef.current.enableRotate = false;
        }
    };

    const setThreeDView = () => {
        cameraRef.current.position.set(100, 200, 200);
        cameraRef.current.up.set(0, 0, 1);
        cameraRef.current.rotation.set(0, 0, 0);
        cameraRef.current.quaternion.identity();
        controlRef.current.target.set(0, 0, 0);
        cameraRef.current.lookAt(0, 0, 0);
        cameraRef.current.zoom = 1.5;
        cameraRef.current.updateMatrixWorld(true);
        cameraRef.current.updateProjectionMatrix();
        controlRef.current.enableRotate = true;
    };

    // Handle switching to other floors
    const handleFloorChange = (newFloor: number) => {
        if (newFloor === floorState) {
            return;
        } else if (floorState < newFloor) {
            // show floors and path above
            for (let i = floorState + 1; i <= newFloor; i++) {
                floorVisibility(i, true);
            }
        } else {
            // hide floors and path above
            for (let i = newFloor + 1; i <= floorState; i++) {
                floorVisibility(i, false);
            }
        }
        // hide all path objects
        pathVisibility(1, false);
        pathVisibility(2, false);
        pathVisibility(3, false);
        pathVisibility(4, false);
        pathVisibility(newFloor, true); // show path on new floor

        if (newFloor < 5) {
            setTwoDView();
        } else if (newFloor == 5) {
            setThreeDView();
            // show all path objects
            pathVisibility(1, true);
            pathVisibility(2, true);
            pathVisibility(3, true);
            pathVisibility(4, true);
        }
        controlRef.current.update();
        setFloorState(newFloor);
    };

    const handlePath = (firstNodeId: number, lastNodeId: number, algo: string) => {
        return findPath(firstNodeId, lastNodeId, algo).then(async (pathres) => {
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
                    createNode(
                        node,
                        scenesRef.current,
                        node.nodeType,
                        floorHeight,
                        firstNodeId,
                        lastNodeId
                    ); //Create the node from its data
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

    // handles adding 3D models to a scene
    const loadObjectAsync = (src, zIndex, objectType) => {
        return new Promise((resolve) => {
            const loader = new OBJLoader();

            loader.load(src, function (object) {
                const scale = 2.3;
                object.scale.set(scale, scale, scale);
                object.position.x = 6.5;
                object.position.y = -47.5;
                object.position.z = -0.5 + zIndex * floorHeight;
                object.userData.objectType = 'Floor';
                const floor = zIndex + 1;
                object.userData.floor = floor;
                if (floor > floorState) {
                    object.visible = false;
                }

                // different colors for floors and walls
                if (objectType == 'floor') {
                    object.traverse(function (child: { material: THREE.MeshStandardMaterial }) {
                        child.material = new THREE.MeshStandardMaterial({
                            color: 0xffffff,
                        });
                    });
                } else if (objectType == 'walls') {
                    object.traverse(function (child: { material: THREE.MeshStandardMaterial }) {
                        child.material = new THREE.MeshStandardMaterial({
                            color: 0x1c43a7,
                        });
                    });
                } else {
                    console.error('objectType not found');
                }

                scenesRef.current[0].add(object);
                resolve();
            });
        });
    };

    const handleThreeDHospitalChange = () => {
        const loadPromises = [];
        loadPromises.push(loadObjectAsync('../../public/Models/Floor 1 Floor.obj', 0, 'floor'));
        loadPromises.push(loadObjectAsync('../../public/Models/Floor 1 Walls.obj', 0, 'walls'));
        loadPromises.push(loadObjectAsync('../../public/Models/Floor 2 Floor.obj', 1, 'floor'));
        loadPromises.push(loadObjectAsync('../../public/Models/Floor 2 Walls.obj', 1, 'walls'));
        loadPromises.push(loadObjectAsync('../../public/Models/Floor 3 Floor.obj', 2, 'floor'));
        loadPromises.push(loadObjectAsync('../../public/Models/Floor 3 Walls.obj', 2, 'walls'));
        loadPromises.push(loadObjectAsync('../../public/Models/Floor 4 Floor.obj', 3, 'floor'));
        loadPromises.push(loadObjectAsync('../../public/Models/Floor 4 Walls.obj', 3, 'walls'));
        // lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scenesRef.current[0].add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
        directionalLight.position.set(20, 20, 20);
        scenesRef.current[0].add(directionalLight);

        // enable orbiting
        setThreeDView();

        return Promise.all(loadPromises);
    };

    const handleTwoDHospitalChange = () => {
        // reset the camera position
        cameraRef.current.position.set(0, 0, 330);
        cameraRef.current.rotation.set(0, 0, 0);
        cameraRef.current.quaternion.set(0, 0, 0, 1);
        cameraRef.current.lookAt(0, 0, 0);
        cameraRef.current.zoom = 1;
        cameraRef.current.updateProjectionMatrix();
        controlRef.current.enableRotate = false;
        controlRef.current.update();
    };

    // handles changes to the hospital from the navSelection context
    useEffect(() => {
        handleHospitalChange(selectedHospitalName!);
    }, [selectedHospitalName]);

    // handles changes to the department from the navSelection context
    useEffect(() => {
        const firstNodeId = findParkingLot(); // start node
        const lastNodeId = getLastNodeId(); // destination node
        clearPathObjects(scenesRef.current);

        if (firstNodeId && lastNodeId) {
            handlePath(firstNodeId, lastNodeId, algorithm).then(() => handleFloorChange(1));
        } else {
            handleFloorChange(1);
        }
    }, [selectedDepartment, algorithm]);

    // this useEffect runs only on mount and initializes some things.
    useEffect(() => {
        // Initialize path animation
        animationRef.current = new FlowingTubeAnimation({
            color1: 0x2a68f7,
            color2: 0x4deefb,
            flowSpeed: 2,
            pulseFrequency: 0.5,
        });
        // Patriot Place is the default so we have to load all the 3D mapping stuff on mount
        if (
            selectedHospitalName == 'Chestnut Hill' ||
            selectedHospitalName == 'Faulkner Hospital' ||
            selectedHospitalName == 'BWH Campus'
        ) {
            handleTwoDHospitalChange();
        } else {
            handleThreeDHospitalChange().then(() => {
                if (selectedDepartment) {
                    // if a department has already been selected start with only floor 1
                    handleFloorChange(1);
                }
            });
        }
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
            return index >= 0 ? faulknerNodes[index].id : 0;
        } else if (selectedHospitalName == 'BWH Campus') {
            const index = bwhNodes.findIndex((element) => {
                return element.name == selectedDepartment;
            });
            return index >= 0 ? bwhNodes[index].id : 0;
        }
        return null;
    };

    // gets id of parking lot node -> hardcoded for now
    const findParkingLot = (): number | null => {
        if (selectedHospitalName === '20 Patriot Pl' || selectedHospitalName === '22 Patriot Pl') {
            return allNodes.find(
                (element) => element.nodeType == 'parking-lot' && element.mapId == 1
            )?.id;
        } else if (selectedHospitalName === 'Chestnut Hill') {
            return allNodes.find(
                (element) => element.nodeType == 'parking-lot' && element.mapId == 2
            )?.id;
        } else if (selectedHospitalName === 'Faulkner Hospital') {
            return allNodes.find(
                (element) => element.nodeType == 'parking-lot' && element.mapId == 3
            )?.id;
        } else if (selectedHospitalName === 'BWH Campus') {
            return allNodes.find(
                (element) => element.nodeType == 'parking-lot' && element.mapId == 4
            )?.id;
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
        if (node1.floor === node2.floor) {
            // This cursed bit of code is necessary because our node data skips floor 2 which is kept in the 3D map
            let zIndex = node1.floor - 1;
            if (node1.floor == 2 || node1.floor == 3) {
                zIndex = zIndex + 1;
            }
            const z = 0.1 + zIndex * floorHeight;
            if (node1.floor === 1) {
                scenesRef.current[0].add(
                    animationRef.current.createEdge(
                        { x: node1.x, y: node1.y, z: z, floor: node1.floor },
                        { x: node2.x, y: node2.y, z: z, floor: node2.floor }
                    )
                );
            } else if (node1.floor === 2) {
                const edge = animationRef.current.createEdge(
                    { x: node1.x, y: node1.y, z: z, floor: node1.floor + 1 },
                    { x: node2.x, y: node2.y, z: z, floor: node2.floor + 1 }
                );
                edge.visible = false;
                scenesRef.current[0].add(edge);
            } else if (node1.floor === 3) {
                const edge = animationRef.current.createEdge(
                    { x: node1.x, y: node1.y, z: z, floor: node1.floor + 1 },
                    { x: node2.x, y: node2.y, z: z, floor: node2.floor + 1 }
                );
                edge.visible = false;
                scenesRef.current[0].add(edge);
            } else if (node1.floor === 4) {
                scenesRef.current[3].add(
                    animationRef.current.createEdge(
                        { x: node1.x, y: node1.y },
                        { x: node2.x, y: node2.y }
                    )
                );
            } else if (node1.floor === 5) {
                scenesRef.current[4].add(
                    animationRef.current.createEdge(
                        { x: node1.x, y: node1.y },
                        { x: node2.x, y: node2.y }
                    )
                );
            } else if (node1.floor === 6) {
                scenesRef.current[5].add(
                    animationRef.current.createEdge(
                        { x: node1.x, y: node1.y },
                        { x: node2.x, y: node2.y }
                    )
                );
            }
        }
    };

    useEffect(() => {
        let animationFrameId: number;
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
            animationFrameId = window.requestAnimationFrame(animate);

            return () => {
                window.cancelAnimationFrame(animationFrameId);
                clearSceneObjects(scenesRef.current);
            };
        };
        animate();
    }, [selectedDepartment, sceneIndexState]);

    return (
        <Box w="100%" h="100%" p={0} pos={'relative'}>
            {isIndoorMapPage && (
                <FloorSwitchBox
                    floor={floorState}
                    onCollapseChange={() => true}
                    setFloor={handleFloorChange}
                    building={selectedHospitalName || ''}
                />
            )}
            <canvas
                id="insideMapCanvas"
                style={{ width: '100%', height: '100%', position: 'relative' }}
            />
        </Box>
    );
}
