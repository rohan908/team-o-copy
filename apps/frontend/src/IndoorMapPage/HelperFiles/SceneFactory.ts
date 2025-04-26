import * as THREE from 'three';
// function for simplifying creating new scenes (floors)
function createMapScene(texturePath: string) {
    const scene = new THREE.Scene();
    const mapTexture = new THREE.TextureLoader().load(texturePath);
    mapTexture.colorSpace = THREE.SRGBColorSpace;
    const mapGeo = new THREE.PlaneGeometry(500, 281);
    const mapMaterial = new THREE.MeshBasicMaterial({ map: mapTexture });
    const mapPlane = new THREE.Mesh(mapGeo, mapMaterial);
    mapPlane.position.set(0, 0, 0);
    scene.add(mapPlane);
    for (const colorElement of (scene.background = new THREE.Color('#D8DFEB'))) {
    }

    return scene;
}

export const createAllScenes = () => {
    // Setup scenes and map planes.
    const scene1 = createMapScene('MapImages/Patriot Place 1.png');
    const scene2 = createMapScene('MapImages/Patriot Place 3.png');
    const scene3 = createMapScene('MapImages/Patriot Place 4.png');
    const scene4 = createMapScene('MapImages/Chestnut Hill Floor 1.png');
    const scene5 = createMapScene('MapImages/Falkner Hospital.png');
    const scene6 = createMapScene('MapImages/BWH Parking Lots and Floor 2.png');
    const sceneArr: THREE.Scene[] = [scene1, scene2, scene3, scene4, scene5, scene6];
    return sceneArr;
};
