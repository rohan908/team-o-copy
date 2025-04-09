import { useState, useEffect } from "react";
import { MapCanvas } from "./MapCanvas";
import { Coordinate, Map } from "../helpers/MapTypes";
import { Container, Image } from "@mantine/core";


export function MapHandler( currentMap : Map) {
  // State for coordinates that will be updated by user interaction
  const [startCoord, setStartCoord] = useState<Coordinate>({x: 100, y: 100, z: currentMap.floor});
  const [endCoord, setEndCoord] = useState<Coordinate>({x: 200, y: 200, z: currentMap.floor});


  return (
    <Container>
      <Image
        src={currentMap.imageSrc}
        alt={`${currentMap.name} Map`}
        style={{zIndex: 1}}
      />
      <MapCanvas
        startCoord={startCoord}
        endCoord={endCoord}
        currentMap={currentMap}
      />
    </Container>
  );
}
