import {useEffect} from 'react';
import * as THREE from "three";

import {Box, useMantineTheme} from "@mantine/core";
import Stats from "three/examples/jsm/libs/stats.module.js"
import CustomCompass from "./CustomCompass.tsx";

// Ok im going to carefully explain how this works for everyone else imiplemetning three JS
export function DraggableMap() {
  const theme = useMantineTheme();
  // we use useEffect for the constant peripheral animation loop since it runs on every render seperate from the react render loop
  useEffect(() => {
    // we create a new scene
    const scene = new THREE.Scene();
    // we get the canvas element
    const canvas = document.getElementById('insideMapCanvas');
    // if the canvas element is not found, we return
    if (!canvas) return;
    // we create a new renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas as HTMLCanvasElement,
      antialias: true //makes objects look smooth
    });
    // we set the size of the renderer to the size of the canvas (this is decided by the size of the box component as seen below)
    renderer.setSize(canvas!.clientWidth, canvas!.clientHeight);
    // we set the pixel ratio of the renderer to the device pixel ratio
    renderer.setPixelRatio(window.devicePixelRatio);

    // This creates a perspective camera that is used for 3D viewing, so we can manipulate this in the future for 3D instead of the current 2D
    const camera = new THREE.PerspectiveCamera(
      50, //FOV
      canvas!.clientWidth / canvas!.clientHeight, //aspect ratio
      1, //near clipping plane (sets the closest objects that will render to the camera)
      1000 //far clipping plane
    );
    camera.position.set(0, 0, 300);

    const compass : CustomCompass = new CustomCompass(camera, renderer, {
      maxZoom: 200, //sets the maximum zoom level 
      minZoom: 400, //sets the minimum zoom level
      step: 0.04 //sets the step size for the zoom
    });
    compass.setAllEvents();


    scene.background = new THREE.Color(theme.colors.terquAccet[8]);
    // Taken from https://github.com/lo-th/Oimo.js/blob/dc745bb86c25767b2df59dee4b63c16bf86c3171/examples/test_basic.html
    // background
    /*
    const backGeometry = new THREE.IcosahedronGeometry(3000,2)
    const back = new THREE.Mesh( backGeometry, new THREE.MeshBasicMaterial( { map:gradTexture([[0.75,0.6,0.4,0.25], [theme.colors.terquAccet[9],theme.colors.terquAccet[8],theme.colors.terquAccet[7], theme.colors.terquAccet[6]]]), side:THREE.BackSide, depthWrite: false, fog:false }  ));
    //back.geometry.applyMatrix(new THREE.Matrix4().makeRotationZ(15*ToRad));
    scene.add( back );
     */

    /* toy box for testing
    const boxGeo = new THREE.BoxGeometry(16, 16, 16);
    const boxMat = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeo, boxMat);
    scene.add(boxMesh);
    */

    const mapTexture = new THREE.TextureLoader().load("/public/MapImages/OutsideMap.png");
    const mapGeo = new THREE.PlaneGeometry(500, 400);
    const mapMaterial = new THREE.MeshBasicMaterial({map: mapTexture});
    const mapPlane = new THREE.Mesh(mapGeo, mapMaterial);
    mapPlane.position.set(0, 0, 0);
    scene.add(mapPlane);

    //you can get rid of this later but its for debugging to see that im not eating a huge amount into the browser lol, shows stats in the top left
    /*const stats = Stats();
    document.body.appendChild(stats.domElement); */

    const animate = () => {
      /*
      boxMesh.rotation.x += 0.01;
      boxMesh.rotation.y += 0.01;
      */

      //stats.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();

  }, []);

  return (
    <Box w="100vw" h="100vh" p={0}>
      <canvas id="insideMapCanvas" style={{width: "100%", height: "100%", position: "absolute"}}/>
    </Box>
  )

}

/* unable to debug this rn...
    // Taken from https://github.com/lo-th/Oimo.js/blob/dc745bb86c25767b2df59dee4b63c16bf86c3171/examples/test_basic.html
function gradTexture(color : [number[], string[]]) {
  const c = document.createElement("canvas");
  const ct = c.getContext("2d");
  const size = 1024;
  c.width = 16; c.height = size;
  const gradient = ct!.createLinearGradient(0,0,0,size);
  let  i = color[0].length;
  while(i--){ gradient.addColorStop(color[0][i],color[1][i]); }
  ct!.fillStyle = gradient;
  ct!.fillRect(0,0,16,size);
  const texture = new THREE.CanvasTexture(c);
  texture.needsUpdate = true;
  return texture;
}
*/
