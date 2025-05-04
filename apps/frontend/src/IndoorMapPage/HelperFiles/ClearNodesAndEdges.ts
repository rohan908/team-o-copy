import * as THREE from 'three';

// clear nodes and edges
export const clearPathObjects = (scenes: THREE.Scene[]) => {
    scenes.forEach((scene) => {
        const objectsToRemove: THREE.Object3D[] = [];

        // identify path objects
        scene.traverse((object) => {
            if (object.userData && object.userData.objectType === 'path') {
                objectsToRemove.push(object);
            }
        });

        objectsToRemove.forEach((object) => {
            scene.remove(object);

            // dispose of geometry and materials
            if (object instanceof THREE.Mesh) {
                if (object.geometry) {
                    object.geometry.dispose();
                }

                if (object.material) {
                    const materials = Array.isArray(object.material)
                        ? object.material
                        : [object.material];

                    materials.forEach((material) => {
                        material.dispose();
                    });
                }
            }
        });
    });
};

// clear all scene objects
export const clearSceneObjects = (scenes: THREE.Scene[]) => {
    scenes.forEach((s) => {
        while (s.children.length > 1) {
            const obj = s.children.pop();
            if (obj instanceof THREE.Mesh) {
                obj.geometry.dispose();
                if(Array.isArray(obj.material)) {
                    obj.material.forEach((mat) => {
                        mat.dispose();
                    })
                } else {
                    (obj.material as THREE.Material).dispose();
                }
            }
        }
    });
};
