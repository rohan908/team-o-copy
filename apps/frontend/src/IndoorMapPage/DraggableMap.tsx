import { useEffect, useState } from 'react';
import * as THREE from "three";
import { Box, useMantineTheme } from "@mantine/core";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DragControls } from 'three/addons/controls/DragControls.js';
import MapEditorBox from "./Components/MapEditorBox.tsx";

export function DraggableMap() {
  const theme = useMantineTheme();

  useEffect(() => {
    // Get canvas element
    const canvas = document.getElementById('insideMapCanvas');
    // if the canvas element is not found, we return
    if (!canvas) return;

    const scene = new THREE.Scene();

    // we create a new renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas as HTMLCanvasElement,
      antialias: true //makes objects look smooth
    });
    renderer.setSize(canvas!.clientWidth, canvas!.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      1,
      10000
    );
    camera.position.set(0, 0, 300);

    // Setup map plane
    const mapTexture = new THREE.TextureLoader().load("/public/MapImages/OutsideMap.png");
    const mapGeo = new THREE.PlaneGeometry(500, 400);
    const mapMaterial = new THREE.MeshBasicMaterial({map: mapTexture});
    const mapPlane = new THREE.Mesh(mapGeo, mapMaterial);
    mapPlane.position.set(0, 0, 0);
    scene.add(mapPlane);

    // Create node objects
    const objects = [];
    const selectedObjects = [];
    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.SphereGeometry(2, 12, 6);
      const material = new THREE.MeshBasicMaterial({color: 0xffff00});
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.x = i+1;
      scene.add(sphere);
      objects.push(sphere);
    }

    // Camera controls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableRotate = false;
    orbitControls.mouseButtons = {
      LEFT: THREE.MOUSE.PAN,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.ROTATE
    };

    // raycaster for selecting nodes
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();


    window.addEventListener('click', (event) => {
      // Get canvas bounds
      if(canvas) {
        const rect = canvas.getBoundingClientRect();
        // Calculate pointer position in normalized device coordinates
        // (-1 to +1) for both components
        pointer.x = ((event.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
        pointer.y = -((event.clientY - rect.top) / canvas.clientHeight) * 2 + 1;
        raycaster.setFromCamera( pointer, camera );
        // calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects( objects );
        // hover color
        if(intersects.length > 0) {
          const intersect = intersects[0]; // grab the first intersected object
          selectedObjects.push(intersect);
          if(intersect.object instanceof THREE.Mesh && intersect.object.material instanceof THREE.MeshBasicMaterial) {
            intersect.object.material.color.set(0x000000);
          }
        }
      }
    });

    // Mouse controls for dragging nodes
    const dragControls = new DragControls(objects, camera, renderer.domElement);

    dragControls.addEventListener('dragstart', function() {
      orbitControls.enabled = false;
    });

    dragControls.addEventListener('dragend', function() {
      setTimeout(() => {
        orbitControls.enabled = true;
      }, 10);
    });

    // Safety net for edge cases
    const handleMouseUp = () => {
      setTimeout(() => {
        orbitControls.enabled = true;
      }, 10);
    };

    const handleMouseLeave = () => {
      setTimeout(() => {
        orbitControls.enabled = true;
      }, 10);
    };

    window.addEventListener('mouseup', handleMouseUp);

    renderer.domElement.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {

      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <Box w="100vw" h="100vh" p={0}>
      <MapEditorBox/>
      <canvas id="insideMapCanvas" style={{width: "100%", height: "100%", position: "absolute"}}/>
    </Box>
  );
}
