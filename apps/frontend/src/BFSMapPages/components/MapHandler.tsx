import { useState, useEffect } from "react";
import { MapCanvas } from "./MapCanvas";
import { Coordinate, Map } from "../helpers/MapTypes";
import { Container, Image } from "@mantine/core";


export function MapHandler( currentMap : Map) {
  // State for coordinates that will be updated by user interaction
  const [startCoord, setStartCoord] = useState<Coordinate>({x: 1786, y: 2647, z: 2});
  const [endCoord, setEndCoord] = useState<Coordinate>({x: 1984, y: 2171, z: 2});


  return (
    <Container>
      {/*<Image
        src={currentMap.imageSrc}
        alt={`${currentMap.name} Map`}
        style={{zIndex: 1}}
      />*/}
      <MapCanvas
        startCoord={startCoord}
        endCoord={endCoord}
        currentMap={currentMap}
      />
    </Container>
  );
}
