import {useEffect} from 'react';
import * as THREE from "three";
import Compass from "threejs-compass";
import {Container} from "@mantine/core";

export function DraggableMap() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const canvas = document.getElementById('insideMapCanvas');
    if (!canvas) return;
    
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas as HTMLCanvasElement,
      antialias: true //makes objects look smooth
    });
    renderer.setSize(canvas!.clientWidth, canvas!.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);


    const camera = new THREE.PerspectiveCamera(
      50,
      canvas!.clientWidth / canvas!.clientHeight,
      1,
      1000
    );
    camera.position.z = 96;

    const compass : Compass = new Compass(camera, renderer);
    compass.setAllEvents();

    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 96, 1000);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 0.5);
    spotLight.castShadow = true;
    spotLight.position.set(0, 64, 32);
    scene.add(spotLight);

    const boxGeo = new THREE.BoxGeometry(16, 16, 16);
    const boxMat = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeo, boxMat);
    scene.add(boxMesh);

    const animate = () => {
      boxMesh.rotation.x += 0.01;
      boxMesh.rotation.y += 0.01;
      
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();

  }, []);

  return (
    <Container width="100%" height="100%">
      <canvas id="insideMapCanvas" style={{width: "100%", height: "100%"}}/>
    </Container>
  )

}
