import { outsideMap } from "../helpers/MapObjects";
import { MapHandler } from "./MapHandler";
import { Container } from "@mantine/core";
import { useState } from "react";
import { Map } from "../helpers/MapTypes.tsx" //import map type for proper type checking

export function BSFMapPage() {
    return (
        <Container>
            <MapSwitcher />
        </Container>
    );

}

function MapSwitcher() {
    const [currentMap, setCurrentMap] = useState<Map>(outsideMap);

    // Define maps object to select from
    const maps: Record<string, Map> ={
      outside: outsideMap
      // add more maps here
    }

    return (
        <>
            <select onChange={(e) => setCurrentMap(maps[e.target.value])}>
                <option value="outside">Outside Map</option>
                {/* change e for future implemetation */}
            </select>
            <MapHandler {...currentMap} />
        </>
    );
}
