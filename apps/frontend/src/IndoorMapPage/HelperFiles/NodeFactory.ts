import * as THREE from 'three';

// Function for populating nodes as THREEjs sphere objects
import { DirectoryNodeItem } from '../../contexts/DirectoryItem.ts';

// Parameters for THREEjs objects and path display
const nodeColor = { color: 0xeafeff };
const nodeRadius = 1;

export const createNode = (node: DirectoryNodeItem, sceneArr: THREE.Scene[]) => {
    console.log('creating node');

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
        sceneArr[0].add(sphere);
    } else if (nodeFloor === 2) {
        sceneArr[1].add(sphere);
    } else if (nodeFloor === 3) {
        sceneArr[2].add(sphere);
    } else if (nodeFloor === 4) {
        sceneArr[3].add(sphere);
    } else {
        console.error("node not added because floor doesn't exist");
    }
};
