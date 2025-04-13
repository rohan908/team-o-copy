import { useEffect, useState } from 'react';
import * as THREE from "three";
import { Box, useMantineTheme } from "@mantine/core";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DragControls } from 'three/addons/controls/DragControls.js';
import MapEditorBox from "./Components/MapEditorBox.tsx";

export function DraggableMap() {
    const theme = useMantineTheme();
    const [nodeSelected, setNodeSelected] = useState(false);
    const [nodeX, setNodeX] = useState(0);
    const [nodeY, setNodeY] = useState(0);

  useEffect(() => {
      // Get canvas element
      const canvas = document.getElementById('insideMapCanvas');
      // if the canvas element is not found, we return
      if (!canvas) return;

      const scene = new THREE.Scene();

      // we create a new renderer
      const renderer = new THREE.WebGLRenderer({
          canvas: canvas as HTMLCanvasElement,
          antialias: true, //makes objects look smooth
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
      const mapTexture = new THREE.TextureLoader().load('/public/MapImages/OutsideMap.png');
      const mapGeo = new THREE.PlaneGeometry(500, 400);
      const mapMaterial = new THREE.MeshBasicMaterial({ map: mapTexture });
      const mapPlane = new THREE.Mesh(mapGeo, mapMaterial);
      mapPlane.position.set(0, 0, 0);
      scene.add(mapPlane);

      // Create node objects
      const objects: THREE.Object3D[] = [];
      objects.push(new THREE.Object3D());
      let selectedObject: THREE.Object3D<THREE.Object3DEventMap> | null = null;
      for (let i = 0; i < 3; i++) {
          const geometry = new THREE.SphereGeometry(2, 12, 6);
          const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
          const sphere = new THREE.Mesh(geometry, material);
          sphere.position.x = i * 10;
          scene.add(sphere);
          objects.push(sphere);
      }

      // Camera controls
      const orbitControls = new OrbitControls(camera, renderer.domElement);
      orbitControls.enableRotate = false;
      orbitControls.mouseButtons = {
          LEFT: THREE.MOUSE.PAN,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.ROTATE,
      };

      // Initialize dragControls with an empty array
      let draggableObjects: THREE.Object3D[] = [];
      let dragControls = new DragControls(draggableObjects, camera, renderer.domElement);

      // Set up drag control event listeners
      dragControls.addEventListener('dragstart', function () {
          orbitControls.enabled = false;
      });

      dragControls.addEventListener('dragend', function () {
          setTimeout(() => {
              orbitControls.enabled = true;
          }, 10);
      });

      // Function to update draggable objects to make sure only selected objects can be dragged
      const updateDraggableObjects = () => {
          // Dispose of the old dragControls
          dragControls.dispose();
          // Create a new array with only the selected object (if any)
          draggableObjects = selectedObject ? [selectedObject] : [];
          // new dragControls with the updated array
          dragControls = new DragControls(draggableObjects, camera, renderer.domElement);
          // Event listeners that enable camera movement
          dragControls.addEventListener('dragstart', function () {
              orbitControls.enabled = false;
          });
          dragControls.addEventListener('dragend', function () {
              setTimeout(() => {
                  orbitControls.enabled = true;
              }, 10);
          })
      }

      // raycaster for selecting nodes adapted from: https://codesandbox.io/p/sandbox/basic-threejs-example-with-re-use-dsrvn?file=%2Fsrc%2Findex.js%3A93%2C3-93%2C41
      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();

      window.addEventListener('click', (event) => {
          // Get canvas bounds
          if (canvas) {
              const rect = canvas.getBoundingClientRect();
              // Calculate pointer position in normalized device coordinates
              // (-1 to +1) for both components
              pointer.x = ((event.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
              pointer.y = -((event.clientY - rect.top) / canvas.clientHeight) * 2 + 1;
              raycaster.setFromCamera(pointer, camera);
              // calculate objects intersecting the picking ray
              const intersects = raycaster.intersectObjects(objects);
              if (intersects.length > 0) {
                  const intersect = intersects[0]; // grab the first intersected object
                  if (selectedObject === null || selectedObject !== intersect.object) { // object is not alread selected
                    if(selectedObject !== intersect.object) {
                      if (selectedObject instanceof THREE.Mesh &&
                          selectedObject.material instanceof THREE.MeshBasicMaterial
                      ) {
                        selectedObject.material.color.set(0xffff00);
                      }
                    }
                    selectedObject = intersect.object;
                    if (selectedObject instanceof THREE.Mesh &&
                        selectedObject.material instanceof THREE.MeshBasicMaterial
                    ) {
                      selectedObject.material.color.set(0x000000);
                      setNodeSelected(true);
                    }
                  } else { // Object is already selected
                      if (selectedObject instanceof THREE.Mesh &&
                          selectedObject.material instanceof THREE.MeshBasicMaterial
                      ) {
                        selectedObject.material.color.set(0xffff00);
                      }
                    selectedObject = null;
                      setNodeSelected(false);
                  }
                  console.log('Selected object:', selectedObject);
                  updateDraggableObjects();
              }
          }
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
          if(selectedObject !== null){
              setNodeX(selectedObject.position.x);
              setNodeY(selectedObject.position.y);
          }

          renderer.render(scene, camera);
          window.requestAnimationFrame(animate);
      };
      animate();
  }, []);

  return (
    <Box w="100vw" h="100vh" p={0}>
        <MapEditorBox
            nodeSelected={nodeSelected}
            nodeX={nodeX}
            nodeY={nodeY}
        />
      <canvas id="insideMapCanvas" style={{width: "100%", height: "100%", position: "absolute"}}/>
    </Box>
  );
}
