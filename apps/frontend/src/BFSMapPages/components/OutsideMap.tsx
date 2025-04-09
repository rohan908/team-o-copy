import { useState } from "react";
import { MapCanvas } from "../MapCanvas";
import { Coordinate, Map } from "../MapTypes";
import { useMantineTheme, Container } from "@mantine/core";

export function OutsideMap() {
    const [startCoord, setStartCoord] = useState<Coordinate>({ x: 100, y: 100, z: 0 }); //gonna make this null later
    const [endCoord, setEndCoord] = useState<Coordinate>({ x: 200, y: 200, z: 0 }); //gonna make this null later
    const [currentMap, setCurrentMap] = useState<Map>({
        name: "OutsideMap",
        width: 1000,
        height: 1000,
        floor: 0,
        xBigMapToSmallMapOffset: 0,
        xBigMapToSmallMapScale: 1,
        yBigMapToSmallMapOffset: 0,
        yBigMapToSmallMapScale: 1,
        imageSrc: "/OutsideMap.png",
    });
    
    return (
        <Container>
            <Image order={1} src={currentMap.imageSrc} alt="Outside Map" />
            <MapCanvas startCoord={startCoord} endCoord={endCoord} currentMap={currentMap} />
        </Container>
    );
}
