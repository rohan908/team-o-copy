import {useEffect} from 'react';
import * as THREE from "three";
import Compass from "threejs-compass";
import {Container, useMantineTheme} from "@mantine/core";
import Stats from "three/examples/jsm/libs/stats.module.js"


export function DraggableMap() {
  const theme = useMantineTheme();
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

    scene.background = new THREE.Color(theme.colors.blueBase[9]);
    scene.fog = new THREE.Fog(0x000000, 96, 1000);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 0.5);
    spotLight.castShadow = true;
    spotLight.position.set(0, 64, 32);
    scene.add(spotLight);

    /*
    const boxGeo = new THREE.BoxGeometry(16, 16, 16);
    const boxMat = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeo, boxMat);
    scene.add(boxMesh);
    */

    const mapTexture = new THREE.TextureLoader().load("/public/MapImages/OutsideMap.png");
    const mapGeo = new THREE.PlaneGeometry(500, 400);
    const mapMaterial = new THREE.MeshBasicMaterial({map: mapTexture});
    const mapPlane = new THREE.Mesh(mapGeo, mapMaterial);
    scene.add(mapPlane);

    //you can get rid of this later but its for debugging to see that im not eating a huge amount into the browser lol, shows stats in the top left
    const stats = Stats();
    document.body.appendChild(stats.domElement);

    const animate = () => {
      /*
      boxMesh.rotation.x += 0.01;
      boxMesh.rotation.y += 0.01;
      */

      stats.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();

  }, []);

  return (
    <Container w="100%" h="100%">
      <canvas id="insideMapCanvas" style={{width: "100vw", height: "100vh"}}/>
    </Container>
  )

}
