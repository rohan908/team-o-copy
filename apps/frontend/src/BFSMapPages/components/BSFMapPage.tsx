import { outsideMap } from "../helpers/MapObjects";
import { MapHandler } from "./MapHandler";
import { useState, useEffect } from "react";
import { Map } from "../helpers/MapTypes";
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
  Divider,
  Button,
  Group,
  LoadingOverlay
} from "@mantine/core";
import { IconBuilding, IconParking } from '@tabler/icons-react';

export function BSFMapPage() {
  const theme = useMantineTheme();
  
  return (
    <Container size="100%" py={{ base: "md", md: "xl", lg: "2xl" }}>
      <Title order={1} mb="md" c="blueBase.8" ta="center" fw={700} fz={{ base: "xl", md: "2xl", lg: "3xl" }}>
        Indoor Navigation
      </Title>
      <Text ta="center" mb="md" fz={{ base: "sm", md: "md", lg: "lg" }} c="dimmed" maw={800} mx="auto">
        Find your way through the hospital with our detailed indoor maps
      </Text>

      <Divider my="md" variant="dashed" mb="xl"/>
      
      <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: "md", md: "xl", lg: "2xl" }} align="flex-start">
        <Box w={{ base: '100%', md: '35%', lg: '30%', xl: '25%' }} miw={{ md: '300px', lg: '350px' }}>
          <LocationSelector />
        </Box>
        <Paper 
          w={{ base: '100%', md: '65%', lg: '70%', xl: '75%' }} 
          h={{ base: 500, md: 600, lg: 700, xl: 800 }} 
          radius="md" 
          withBorder
          shadow="sm"
          p={{ base: "md", lg: "xl" }}
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
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // leave for now, simulates loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box w="100%" h="100%" pos="relative">
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: 'blue', type: 'bars' }}
      />
      <MapHandler {...currentMap} />
    </Box>
  );
}

function LocationSelector() {
  const theme = useMantineTheme();
  const [selectedType, setSelectedType] = useState<'directory' | 'parking' | null>(null);
  const [directoryLocation, setDirectoryLocation] = useState<string | null>(null);
  const [parkingLocation, setParkingLocation] = useState<string | null>(null);

  const directoryOptions = [
    { value: 'emergency', label: 'Emergency Department' },
    { value: 'radiology', label: 'Radiology' },
    { value: 'pharmacy', label: 'Pharmacy' },
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'pediatrics', label: 'Pediatrics' }
  ];

  const parkingOptions = [
    { value: 'main', label: 'Main Parking Lot' },
    { value: 'visitor', label: 'Visitor Parking' },
    { value: 'staff', label: 'Staff Parking' },
    { value: 'emergency', label: 'Emergency Parking' }
  ];

  const handleLocationSelect = (type: 'directory' | 'parking', location: string) => {
    if (type === 'directory') {
      setDirectoryLocation(location);
    } else {
      setParkingLocation(location);
    }
  };

  const getLabelFromValue = (value: string | null, options: { value: string; label: string }[]) => {
    const option = options.find(opt => opt.value === value);
    return option ? option.label : '';
  };

  return (
    <Paper p={{ base: "md", lg: "xl" }} radius="md" withBorder shadow="sm">
      <Title order={3} mb="md" c="black" ta="left" fw={600} fz={{ base: "lg", lg: "xl" }}>
        Select Location
      </Title>
      
      <Text mb="xs" ta="left" fz="sm" c="dimmed">
        Choose where you want to go:
      </Text>

      <Group grow mb="md">
        <Button
          variant={selectedType === 'directory' ? 'filled' : 'light'}
          color="dark"
          leftSection={<IconBuilding size={16} />}
          onClick={() => setSelectedType('directory')}
        >
          Directory
        </Button>
        <Button
          variant={selectedType === 'parking' ? 'filled' : 'light'}
          color="dark"
          leftSection={<IconParking size={16} />}
          onClick={() => setSelectedType('parking')}
        >
          Parking
        </Button>
      </Group>

      {selectedType === 'directory' && (
        <Select
          placeholder="Select Department"
          data={directoryOptions}
          value={directoryLocation}
          onChange={(value) => handleLocationSelect('directory', value)}
          mb="md"
          searchable
          clearable
        />
      )}

      {selectedType === 'parking' && (
        <Select
          placeholder="Select Parking Lot"
          data={parkingOptions}
          value={parkingLocation}
          onChange={(value) => handleLocationSelect('parking', value)}
          mb="md"
          searchable
          clearable
        />
      )}
      
      <Divider my="md" variant="dashed" />
      
      {(directoryLocation || parkingLocation) && (
        <Box>
          <Text fw={500} mb="sm">Selected Locations</Text>
          {directoryLocation && (
            <Text fz="sm"><b>Department:</b> {getLabelFromValue(directoryLocation, directoryOptions)}</Text>
          )}
          {parkingLocation && (
            <Text fz="sm"><b>Parking Lot:</b> {getLabelFromValue(parkingLocation, parkingOptions)}</Text>
          )}
        </Box>
      )}
      
      <Space h="md" />
      
      {/* //selection is not working
      <Text fz="xs" c="dimmed" ta="center" mt="lg">
        Select a starting point on the map to find your path
      </Text>
      */}
    </Paper>
  );
}
