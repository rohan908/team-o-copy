import { useState, useEffect } from "react";
import { MapCanvas } from "./MapCanvas";
import { Coordinate, Map } from "../helpers/MapTypes";
import { Box, Text, Group, Badge, ActionIcon, Tooltip } from "@mantine/core";
import { IconMapPin, IconTarget } from '@tabler/icons-react';
// import {parseDirectoryDatayData} from "../../directory/components/directorydata.tsx";

export function MapHandler(currentMap: Map) {
  const [startCoord, setStartCoord] = useState<Coordinate>({x: 2000, y: 1300, z: 2});
  const [endCoord, setEndCoord] = useState<Coordinate>({x: 1323, y: 1417, z: 2});
  const [isSettingStart, setIsSettingStart] = useState(false);
  const [isSettingEnd, setIsSettingEnd] = useState(false);
  
  // meant to handle the map clicks for the controller but math not mathing
  const handleMapClick = (x: number, y: number) => {
    const z = currentMap.floor;
    
    if (isSettingStart) {
      setStartCoord({ x, y, z });
      setIsSettingStart(false);
    } else if (isSettingEnd) {
      setEndCoord({ x, y, z });
      setIsSettingEnd(false);
    }
  };

  // parseDirectoryData().then(data => {
  //   console.log(data);
  // })

  return (
    <Box pos="relative" w="100%" h="100%" style={{ overflow: 'hidden' }}>
      {/* Contorller is not wokring math wise so commenting it out
      <Box 
        pos="absolute" 
        top={10} 
        left={10} 
        style={{ zIndex: 10 }}
        bg="rgba(255, 255, 255, 0.8)"
        p="xs"
        sx={{ backdropFilter: 'blur(2px)' }}
        radius="md"
      >
        <Group spacing="xs" mb="xs">
          <Badge color="red" variant="filled" size="sm">Start Point</Badge>
          <Text fz="xs">X: {startCoord.x}, Y: {startCoord.y}</Text>
          <Tooltip label="Set start point">
            <ActionIcon 
              variant="light" 
              color="red" 
              size="sm"
              onClick={() => {
                setIsSettingStart(true);
                setIsSettingEnd(false);
              }}
            >
              <IconMapPin size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
        
        <Group spacing="xs">
          <Badge color="green" variant="filled" size="sm">End Point</Badge>
          <Text fz="xs">X: {endCoord.x}, Y: {endCoord.y}</Text>
          <Tooltip label="Set end point">
            <ActionIcon 
              variant="light" 
              color="green" 
              size="sm"
              onClick={() => {
                setIsSettingEnd(true);
                setIsSettingStart(false);
              }}
            >
              <IconTarget size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Box>
      */}

      <MapCanvas
        startCoord={startCoord}
        endCoord={endCoord}
        currentMap={currentMap}
        onClick={handleMapClick}
      />
    </Box>
  );
}
