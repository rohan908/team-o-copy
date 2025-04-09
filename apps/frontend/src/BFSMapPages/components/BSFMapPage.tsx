import { outsideMap, insidePrescott20Map, insidePrescott22Map } from "../helpers/MapObjects";
import { MapHandler } from "./MapHandler";
import { useState } from "react";
import { Map } from "../helpers/MapTypes.tsx";
import {
  Container,
  Box,
  Title,
  Text,
  Select,
  Paper,
  useMantineTheme,
  Space,
  Flex,
  Divider
} from "@mantine/core";

export function BSFMapPage() {
  const theme = useMantineTheme();
  
  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="md" c="blueBase.8" ta="center" fw={700}>
        Indoor Navigation
      </Title>
      <Text ta="center" mb="xl" fz="md" c="dimmed" maw={600} mx="auto">
        Find your way through the hospital with our detailed indoor maps
      </Text>
      
      <Flex direction={{ base: 'column', md: 'row' }} gap="xl">
        <Box w={{ base: '100%', md: '30%' }}>
          <MapSwitcher />
        </Box>
        <Paper 
          w={{ base: '100%', md: '70%' }} 
          h={600} 
          radius="md" 
          withBorder
          shadow="sm"
          p="md"
          pos="relative"
        >
          <MapDisplayWrapper />
        </Paper>
      </Flex>
    </Container>
  );
}

function MapDisplayWrapper() {
  const [currentMap, setCurrentMap] = useState<Map>(outsideMap);
  
  return (
    <Box w="100%" h="100%" pos="relative">
      <MapHandler {...currentMap} />
    </Box>
  );
}

function MapSwitcher() {
  const theme = useMantineTheme();
  const [currentMap, setCurrentMap] = useState<Map>(outsideMap);

  // Define maps object to select from
  const maps: Record<string, Map> = {
    outside: outsideMap,
    prescott20: insidePrescott20Map,
    prescott22: insidePrescott22Map
    // add more maps here
  };

  const handleMapChange = (value: string | null) => {
    if (value && maps[value]) {
      setCurrentMap(maps[value]);
    }
  };

  return (
    <Paper p="lg" radius="md" withBorder shadow="sm">
      <Title order={3} mb="md" c="black" ta="left" fw={600} fz="lg">
        Select a Map
      </Title>
      
      <Text mb="xs" ta="left" fz="sm" c="dimmed">
        Choose a location to navigate:
      </Text>
      
      <Select
        placeholder="Select Map"
        data={[
          { value: 'outside', label: 'Outside Map' },
          { value: 'prescott20', label: '20 Patriot St' },
          { value: 'prescott22', label: '22 Patriot St' }
        ]}
        value="outside"
        onChange={handleMapChange}
        mb="md"
        searchable
        clearable={false}
      />
      
      <Divider my="md" variant="dashed" />
      
      <Box>
        <Text fw={500} mb="sm">Map Information</Text>
        <Text fz="sm"><b>Name:</b> {currentMap.name}</Text>
        <Text fz="sm"><b>Floor:</b> {currentMap.floor}</Text>
        <Text fz="sm"><b>Resolution:</b> {currentMap.width} x {currentMap.height}</Text>
      </Box>
      
      <Space h="md" />
      
      <Text fz="xs" c="dimmed" ta="center" mt="lg">
        Select a starting and ending point on the map to find your path
      </Text>
    </Paper>
  );
}
