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
    sphere.userData.nodeId = node.id;
    const nodeFloor = node.floor;
    if (nodeFloor === 1) {
        sceneArr[0].add(sphere);
        if (objectsRef) {
            objectsRef.current.push(sphere);
        }
    } else if (nodeFloor === 2) {
        sceneArr[1].add(sphere);
        if (objectsRef) {
            objectsRef.current.push(sphere);
        }
    } else if (nodeFloor === 3) {
        sceneArr[2].add(sphere);
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
    } else {
        console.error("node not added because floor doesn't exist");
    }
};
