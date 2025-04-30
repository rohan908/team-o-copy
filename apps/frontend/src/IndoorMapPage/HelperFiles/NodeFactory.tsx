import * as THREE from 'three';
import { getNode } from './MapSetup.tsx';

// Function for populating nodes as THREEjs sphere objects
import { DirectoryNodeItem } from '../../contexts/DirectoryItem.ts';
import React from 'react';

export const createNode = (
    node: DirectoryNodeItem,
    sceneArr: THREE.Scene[],
    nodeType: string,
    floorHeight?: number,
    startId?: number,
    endId?: number,
    objectsRef?: React.MutableRefObject<THREE.Object3D[]>,
    nodeRadius?: number,
    nodeColor?: THREE.MeshBasicMaterialParameters
) => {
    nodeRadius = nodeRadius || 1; // default

    // Was going to use arrows for stairs and elevators but realized arrows
    // imply direction and that doesn't really make sense for the mapEditor. May re-implement for 3D path display tho.
    const createArrow = (
        x0: number,
        y0: number,
        z0: number,
        x: number,
        y: number,
        z: number,
        rho: number,
        phi: number
    ) => {
        const prevEdge = new THREE.Vector3(x - x0, y - y0, z - z0);
        const theta = prevEdge.angleTo(new THREE.Vector3(1, 0, 0));
        console.log(theta);
        phi = (phi * Math.PI) / 180;
        const endPosx = x + rho * Math.sin(phi) * Math.cos(theta);
        const endPosy = y + rho * Math.sin(phi) * Math.sin(theta);
        const endPosz = z + rho * Math.cos(phi);
        const endVector = new THREE.Vector3(endPosx, endPosy, endPosz);
        const startVector = new THREE.Vector3(x, y, z);
        const direction = new THREE.Vector3(
            (endVector.x - startVector.x) / rho,
            (endVector.y - startVector.y) / rho,
            (endVector.z - startVector.z) / rho
        );
        const radius = 1;
        const material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
        const sphereGeometry = new THREE.SphereGeometry(radius, radius * 12, radius * 6);
        const baseSphere = new THREE.Mesh(sphereGeometry, material);
        baseSphere.position.set(x, y, z);
        const tipGeometry = new THREE.ConeGeometry(radius * 2, radius * 4, radius * 16, 1, false);
        const tip = new THREE.Mesh(tipGeometry, material);
        tip.position.set(endPosx, endPosy, endPosz);
        const axis = new THREE.Vector3(0, 1, 0); // the cone's default direction is along Y-axis
        const quaternion = new THREE.Quaternion();
        quaternion.setFromUnitVectors(axis, direction);
        tip.setRotationFromQuaternion(quaternion);
        const path = new THREE.LineCurve3(startVector, endVector);
        const tubeGeometry = new THREE.TubeGeometry(path, 1, radius, radius * 4, false);
        const tube = new THREE.Mesh(tubeGeometry, material);
        const group = new THREE.Group();
        // groups are practically identical to objects, but be careful when narrowing types.
        group.add(tube);
        group.add(baseSphere);
        group.add(tip);
        console.log(group);
        return group;
    };

    /*
    Node types include those selectable in the node editor:
    'department',
    'parking-lot',
    'hallway', (treated as a default)
    'staircase',
    'elevator',
   */
    const departmentNodeGeometry = new THREE.SphereGeometry(
        nodeRadius * 1.5,
        Math.round(2 * 12), // Vibe based adaptive segmentation
        Math.round(2 * 6)
    );
    const parkingNodeGeometry = new THREE.SphereGeometry(
        nodeRadius * 1.5,
        Math.round(2 * 12), // Vibe based adaptive segmentation
        Math.round(2 * 6)
    );
    const hallWayNodeGeometry = new THREE.SphereGeometry(
        nodeRadius,
        Math.round(nodeRadius * 12), // Vibe based adaptive segmentation
        Math.round(nodeRadius * 6)
    );
    const staircaseNodeGeometry = new THREE.OctahedronGeometry(2, 0);
    const elevatorNodeGeometry = new THREE.OctahedronGeometry(2, 0);
    let material = new THREE.MeshBasicMaterial(nodeColor);
    if (
        node.id == startId ||
        node.id == endId ||
        node.nodeType == 'staircase' ||
        node.nodeType == 'elevator'
    ) {
        material = new THREE.MeshBasicMaterial({ color: 0xfcb024 });
    }

    let threeDNode;
    if (nodeType == 'department') {
        threeDNode = new THREE.Mesh(departmentNodeGeometry, material);
    } else if (nodeType == 'parking-lot') {
        threeDNode = new THREE.Mesh(parkingNodeGeometry, material);
    } else if (nodeType == 'staircase') {
        threeDNode = new THREE.Mesh(staircaseNodeGeometry, material);
    } else if (nodeType == 'elevator') {
        threeDNode = new THREE.Mesh(elevatorNodeGeometry, material);
    } else {
        threeDNode = new THREE.Mesh(hallWayNodeGeometry, material);
    }

    if (threeDNode) {
        threeDNode.position.x = node.x;
        threeDNode.position.y = node.y;
        threeDNode.userData.nodeId = node.id;
        if (floorHeight !== undefined && node.floor < 4) {
            // floorHeight should only be passed when displaying on a 3D map path.
            let zIndex = node.floor - 1;
            if (node.floor == 2 || node.floor == 3) {
                zIndex = zIndex + 1;
            }
            threeDNode.position.z = -0.1 + zIndex * floorHeight;
            // This is used to hide the path on higher floors
            if (node.floor == 2 || node.floor == 3) {
                threeDNode.userData.floor = node.floor + 1;
            } else {
                threeDNode.userData.floor = node.floor;
            }
        }
        threeDNode.userData.nodeType = node.nodeType;
        threeDNode.userData.color = nodeColor;
        // This is used so all the path objects can be cleared without clearing 3D models
        threeDNode.userData.objectType = 'path';
        const nodeFloor = node.floor;
        if (nodeFloor === 1) {
            sceneArr[0].add(threeDNode);
            if (objectsRef) {
                if (floorHeight == undefined) {
                    threeDNode.userData.floor = nodeFloor;
                }
                objectsRef.current.push(threeDNode);
            }
        } else if (nodeFloor === 2) {
            if (floorHeight !== undefined) {
                sceneArr[0].add(threeDNode);
                threeDNode.visible = false;
                if (objectsRef) {
                    // hide path objects not on the first floor be default
                    objectsRef.current.push(threeDNode);
                }
            } else {
                sceneArr[1].add(threeDNode);
                if (objectsRef) {
                    threeDNode.userData.floor = nodeFloor;
                    objectsRef.current.push(threeDNode);
                }
            }
        } else if (nodeFloor === 3) {
            if (floorHeight !== undefined) {
                sceneArr[0].add(threeDNode);
                threeDNode.visible = false;
                if (objectsRef) {
                    objectsRef.current.push(threeDNode);
                }
            } else {
                sceneArr[2].add(threeDNode);
                if (objectsRef) {
                    threeDNode.userData.floor = nodeFloor;
                    objectsRef.current.push(threeDNode);
                }
            }
        } else if (nodeFloor === 4) {
            sceneArr[3].add(threeDNode);
            if (objectsRef) {
                threeDNode.userData.floor = nodeFloor;
                objectsRef.current.push(threeDNode);
            }
        } else if (nodeFloor === 5) {
            sceneArr[4].add(threeDNode);
            if (objectsRef) {
                threeDNode.userData.floor = nodeFloor;
                objectsRef.current.push(threeDNode);
            }
        } else if (nodeFloor === 6) {
            sceneArr[5].add(threeDNode);
            if (objectsRef) {
                threeDNode.userData.floor = nodeFloor;
                objectsRef.current.push(threeDNode);
            }
        } else {
            console.error("node not added because floor doesn't exist");
        }
    }
};

export const updateNodeGeometry = (
    objectsRef: React.MutableRefObject<THREE.Object3D[]>,
    node: DirectoryNodeItem,
    nodeRadius: number
) => {
    const objNode = objectsRef.current.find((obj) => obj.userData.nodeId === node.id);

    if (objNode != undefined) {
        // @ts-ignore
        objNode.geometry.dispose();

        const nodeRadius = 1.5;

        const departmentNodeGeometry = new THREE.SphereGeometry(
            nodeRadius * 1.5,
            Math.round(2 * 12), // Vibe based adaptive segmentation
            Math.round(2 * 6)
        );
        const parkingNodeGeometry = new THREE.SphereGeometry(
            nodeRadius * 1.5,
            Math.round(2 * 12), // Vibe based adaptive segmentation
            Math.round(2 * 6)
        );
        const hallWayNodeGeometry = new THREE.SphereGeometry(
            nodeRadius,
            Math.round(nodeRadius * 12), // Vibe based adaptive segmentation
            Math.round(nodeRadius * 6)
        );
        const staircaseNodeGeometry = new THREE.OctahedronGeometry(2, 0);
        const elevatorNodeGeometry = new THREE.OctahedronGeometry(2, 0);

        if (node.nodeType == 'department') {
            // @ts-ignore
            objNode.geometry = departmentNodeGeometry;
        } else if (node.nodeType == 'parking-lot') {
            // @ts-ignore
            objNode.geometry = parkingNodeGeometry;
        } else if (node.nodeType == 'staircase') {
            // @ts-ignore
            objNode.geometry = staircaseNodeGeometry;
        } else if (node.nodeType == 'elevator') {
            // @ts-ignore
            objNode.geometry = elevatorNodeGeometry;
        } else {
            // @ts-ignore
            objNode.geometry = hallWayNodeGeometry;
        }

        objNode.userData.nodeType = node.nodeType;
    }
};
