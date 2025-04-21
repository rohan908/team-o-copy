import * as THREE from 'three';

export const clearSceneObjects = (scenes: THREE.Scene[]) => {
    scenes.forEach((s) => {
        while (s.children.length > 1) {
            const obj = s.children.pop();
            if (obj instanceof THREE.Mesh) {
                obj.geometry.dispose();
                (obj.material as THREE.Material).dispose();
            }
        }
    });
};
