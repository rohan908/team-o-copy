import * as THREE from 'three';

// Function for populating nodes as THREEjs sphere objects
import { DirectoryNodeItem } from '../../contexts/DirectoryItem.ts';
import React from 'react';

export const createNode = (
    node: DirectoryNodeItem,
    sceneArr: THREE.Scene[],
    objectsRef?: React.MutableRefObject<THREE.Object3D[]>,
    nodeRadius?: number,
    nodeColor?: THREE.MeshBasicMaterialParameters
) => {
    nodeRadius = nodeRadius || 1; // default
    const geometry = new THREE.SphereGeometry(
        nodeRadius,
        Math.round(nodeRadius * 12), // Vibe based adaptive segmentation
        Math.round(nodeRadius * 6)
    );

    const material = new THREE.MeshBasicMaterial(nodeColor);
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = node.x;
    sphere.position.y = node.y;
    let zIndex = node.floor - 1;
    if (node.floor == 2 || node.floor == 3) {
        zIndex = zIndex + 1;
    }
    sphere.position.z = 0.1 + zIndex * 10.5;
    sphere.userData.nodeId = node.id;
    // This is used to hide the path on higher floors
    if (node.floor == 2 || node.floor == 3) {
        sphere.userData.floor = node.floor + 1;
    } else {
        sphere.userData.floor = node.floor;
    }

    // This is used so all the path objects can be cleared without clearing 3D models
    sphere.userData.objectType = 'path';
    const nodeFloor = node.floor;
    if (nodeFloor === 1) {
        sceneArr[0].add(sphere);
        if (objectsRef) {
            objectsRef.current.push(sphere);
        }
    } else if (nodeFloor === 2) {
        sceneArr[0].add(sphere);
        sphere.visible = false;
        if (objectsRef) {
            // hide path objects not on the first floor be default
            objectsRef.current.push(sphere);
        }
    } else if (nodeFloor === 3) {
        sceneArr[0].add(sphere);
        sphere.visible = false;
        if (objectsRef) {
            objectsRef.current.push(sphere);
        }
    } else if (nodeFloor === 4) {
        sceneArr[3].add(sphere);
        if (objectsRef) {
            objectsRef.current.push(sphere);
        }
    } else if (nodeFloor === 5) {
        sceneArr[4].add(sphere);
        if (objectsRef) {
            objectsRef.current.push(sphere);
        }
    } else if (nodeFloor === 6) {
        sceneArr[5].add(sphere);
        if (objectsRef) {
            objectsRef.current.push(sphere);
        }
    } else {
        console.error("node not added because floor doesn't exist");
    }
};
