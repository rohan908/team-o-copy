import { useState, useEffect } from "react";
import { MapCanvas } from "./MapCanvas";
import { Coordinate, Map } from "../helpers/MapTypes";
import { Box, Text, Group, Badge, ActionIcon, Tooltip } from "@mantine/core";
import { IconMapPin, IconTarget } from '@tabler/icons-react';

export function MapHandler(currentMap: Map) {
  const [startCoord, setStartCoord] = useState<Coordinate>({x: 1786, y: 2647, z: 2});
  const [endCoord, setEndCoord] = useState<Coordinate>({x: 1984, y: 2171, z: 2});
  const [isSettingStart, setIsSettingStart] = useState(false);
  const [isSettingEnd, setIsSettingEnd] = useState(false);
  
  // Handle map clicks to set coordinates
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

  return (
    <Box pos="relative" w="100%" h="100%" style={{ overflow: 'hidden' }}>
      {/* Controls overlay */}
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

      {/* Instructions overlay */}
      {(isSettingStart || isSettingEnd) && (
        <Box
          pos="absolute"
          bottom={10}
          left={0}
          right={0}
          mx="auto"
          style={{ zIndex: 10, textAlign: 'center', width: 'fit-content' }}
          bg="rgba(0, 0, 0, 0.7)"
          p="xs"
          sx={{ backdropFilter: 'blur(2px)' }}
          radius="xl"
        >
          <Text c="white" fz="sm">
            Click on the map to set the {isSettingStart ? 'starting' : 'ending'} point
          </Text>
        </Box>
      )}
      
      {/* The map canvas */}
      <MapCanvas
        startCoord={startCoord}
        endCoord={endCoord}
        currentMap={currentMap}
        onClick={handleMapClick}
      />
    </Box>
  );
}
