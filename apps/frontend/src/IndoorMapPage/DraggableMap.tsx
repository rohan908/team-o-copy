import { useEffect, useState } from 'react';
import * as THREE from "three";
import FloorSwitchBox from "./components/FloorManagerBox.tsx";
import { Box, useMantineTheme } from "@mantine/core";
import CustomCompass from "./CustomCompass.tsx";

export function DraggableMap() {
  const [floor, setFloor] = useState(1);
  const [isFading, setIsFading] = useState(false);
  const theme = useMantineTheme();
  const canvasId = 'insideMapCanvas';

  useEffect(() => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas as HTMLCanvasElement,
      antialias: true

    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const camera = new THREE.PerspectiveCamera(50, 1920 / 1080, 250, 1000);
    camera.position.set(0, 0, 300);

    const scene = new THREE.Scene();


    scene.background = new THREE.Color(
      "#2FBCC7")


    const compass = new CustomCompass(camera, renderer, {
      maxZoom: 200,
      minZoom: 400,
      step: 0.04
    });
    compass.setAllEvents();

    // Load floor-specific map image
    let texturePath: string = ""
      if(floor === 1){
        texturePath = "./MapImages/Patriot Place Floor 1.png"
      }
    if(floor === 3){
      texturePath = "./MapImages/Patriot Place Floor 3.png"
    }
    if(floor === 4){
      texturePath = "./MapImages/Patriot Place Floor 4.png"
    }
    if(floor === 5){
      texturePath = "./MapImages/Chestnut Hill Floor 1.png"
    }

    const mapTexture = new THREE.TextureLoader().load(texturePath);
    mapTexture.colorSpace = THREE.SRGBColorSpace
    const mapGeo = new THREE.PlaneGeometry(500, 400);
    const mapMaterial = new THREE.MeshBasicMaterial({ map: mapTexture });
    const mapPlane = new THREE.Mesh(mapGeo, mapMaterial);
    mapPlane.position.set(0, 0, 0);
    scene.add(mapPlane);

    // Optional: Add extra stuff per floor
    if (floor === 2) {
      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(30, 30, 30),
        new THREE.MeshStandardMaterial({ color: "orange" })
      );
      cube.position.set(-150, 0, 0);
      scene.add(cube);
    }

    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      renderer.dispose();
      mapMaterial.dispose();
      mapTexture.dispose();
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).material) {
          ((obj as THREE.Mesh).material as THREE.Material).dispose();
        }
        if ((obj as THREE.Mesh).geometry) {
          ((obj as THREE.Mesh).geometry as THREE.BufferGeometry).dispose();
        }
      });
      scene.clear();
    };

  }, [floor]);


  const handleFloorChange = (newFloor: number) => {
    if (newFloor === floor) return;
    setIsFading(true);
    setTimeout(() => {
      setFloor(newFloor);
      setTimeout(() => {
        setIsFading(false);
      }, 200); // Fade-in duration
    }, 200); // Fade-out duration
  };
  return (
    <Box w="100vw" h="100vh" p={0}>
      <FloorSwitchBox floor={floor} setFloor={handleFloorChange} />
      <canvas id="insideMapCanvas" style={{ width: "100%", height: "100%", position: "absolute" }} />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#000",
          opacity: isFading ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
          pointerEvents: "none",
          zIndex: 5
        }}
        />
    </Box>
  );
}
