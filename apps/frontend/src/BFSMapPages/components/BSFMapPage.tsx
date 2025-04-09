import { outsideMap } from "../helpers/MapObjects";
import { MapHandler } from "./MapHandler";
import { Container } from "@mantine/core";
import { useState } from "react";

export function BSFMapPage() {
    return (
        <Container>
            <MapSwitcher />
        </Container>
    );

}

function MapSwitcher() {
    const [currentMap, setCurrentMap] = useState(outsideMap);

    return (
        <>
            <select onChange={(e) => setCurrentMap(maps[e.target.value])}>
                <option value="outside">Outside Map</option>
                {/* change e for future implemetation */}
            </select>
            <MapHandler currentMap={currentMap} />
        </>
    );
}