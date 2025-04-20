import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { BlackButton } from "../common-compoents/commonButtons.tsx";
import { TwoPartInteractiveBox } from "../common-compoents/standAloneFrame.tsx";
import { DirectoryNodeItem } from '../contexts/DirectoryItem.ts';
import { usePatriotContext, useChestnutHillContext } from '../contexts/DirectoryContext.js';
import {
  Box,
  Text,
  Select,
  Collapse,
  TextInput,
  Stack,
  Button
} from '@mantine/core';
import { useTimeline } from '../HomePage/TimeLineContext';

const SelectBox: React.FC = () => {
  const {
    setSelectedHospital,
    setCurrDirectoryDestination,
    setUserCoordinates,
    setTravelMode
  } = useTimeline();

  const [hospital, setHospital] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [departmentOptions, setDepartmentOptions] = useState<{ value: string; label: string }[]>([]);
  const [userStartLocation, setUserStartLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [navigationMethod, setNavigationMethod] = useState<google.maps.TravelMode | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const Patriot = usePatriotContext();
  const Chestnut = useChestnutHillContext();

  const hospitalCoordinates: Record<string, google.maps.LatLngLiteral> = {
    "20 Patriot Pl": { lat: 42.092759710546595, lng: -71.26611460791148 },
    "22 Patriot Pl": { lat: 42.09304546224412, lng: -71.26680481859991 },
    "Chestnut Hill": { lat: 42.32624893122403, lng: -71.14948990068949 },
    "pharmacy": { lat: 42.093429, lng: -71.268228 },
  };

  const MapDepartment = (department: DirectoryNodeItem[]) =>
    department.map((department: DirectoryNodeItem) => ({
      value: department.name,
      label: department.name,
    }));

  const handleFindPath = () => {
    if (hospital && hospitalCoordinates[hospital]) {
      setSelectedHospital(hospitalCoordinates[hospital]);
    }

    if (selectedDepartment) {
      setCurrDirectoryDestination(selectedDepartment);
    }

    if (selectedDepartment === "pharmacy") {
      setSelectedHospital(hospitalCoordinates["pharmacy"]);
    }

    if (userStartLocation) {
      setUserCoordinates(userStartLocation);
    }

    if (navigationMethod) {
      setTravelMode(navigationMethod);
    }

    setCollapsed(true);
  };

  const setHospitalLocation = (hospital: string | null) => {
    if (hospital === '20 Patriot Pl' || hospital === '22 Patriot Pl') {
      setDepartmentOptions(MapDepartment(Patriot));
    } else if (hospital === 'Chestnut Hill') {
      setDepartmentOptions(MapDepartment(Chestnut));
    }

    setHospital(hospital);
    setSelectedDepartment(null);
  };

  useEffect(() => {
    if (collapsed || !input.current) return;

    if (autocompleteRef.current) {
      autocompleteRef.current.unbindAll?.();
      autocompleteRef.current = null;
    }

    autocompleteRef.current = new window.google.maps.places.Autocomplete(input.current, { types: ['geocode'] });

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace();
      if (place?.geometry?.location) {
        const location = place.geometry.location;
        const latlng = {
          lat: location.lat(),
          lng: location.lng(),
        };
        setUserStartLocation(latlng);
      }
    });
  }, [collapsed]);

  return (
    <>
      <Collapse in={!collapsed} animateOpacity={true}>
        <Box
          pos="absolute"
          top="50%"
          left="50%"
          style={{
            transform: 'translate(-50%, -50%)',
            pointerEvents: collapsed ? 'none' : 'auto',
          }}
          maw={500}
        >
          <TwoPartInteractiveBox
            title="Find your Way!"
            subtitle="Use our interactive map to find departments, parking, and efficient routes"
          >
            <Stack w="100%">
              <Box>
                <Text ta="left" mb="sm" fw={500}>
                  Insert Starting Location:
                </Text>
                <TextInput
                  color="#A5A7AC"
                  ref={input}
                  placeholder="--Enter a Location--"
                />
              </Box>

              <Box>
                <Text ta="left" mb="sm" fw={500}>
                  Select Hospital:
                </Text>
                <Select
                  color="#A5A7AC"
                  placeholder="--Select Hospital--"
                  data={[
                    { value: '20 Patriot Pl', label: '20 Patriot Pl' },
                    { value: '22 Patriot Pl', label: '22 Patriot Pl' },
                    { value: 'Chestnut Hill', label: 'Chestnut Hill' }
                  ]}
                  value={hospital}
                  onChange={setHospitalLocation}
                />
              </Box>

              <Box>
                <Text ta="left" mb="sm" fw={500}>
                  Select Department:
                </Text>
                <Select
                  color="#A5A7AC"
                  placeholder="--Select Department--"
                  data={departmentOptions}
                  value={selectedDepartment}
                  onChange={setSelectedDepartment}
                  disabled={!hospital || departmentOptions.length === 0}
                />
              </Box>

              <Box>
                <Text ta="left" mb="sm" fw={500}>
                  Select Navigation Method:
                </Text>
                <Select
                  color="#A5A7AC"
                  placeholder="--Select Navigation Method--"
                  data={[
                    { value: google.maps.TravelMode.WALKING, label: 'Walking' },
                    { value: google.maps.TravelMode.TRANSIT, label: 'Public Transportation' },
                    { value: google.maps.TravelMode.DRIVING, label: 'Driving' },
                  ]}
                  value={navigationMethod}
                  onChange={setNavigationMethod}
                  disabled={!hospital}
                />
              </Box>

              <Box ta="right">
                <BlackButton onClick={handleFindPath}>
                  Find Path
                </BlackButton>
              </Box>
            </Stack>
          </TwoPartInteractiveBox>
        </Box>
      </Collapse>

      {collapsed && (
        <Box pos="absolute" bottom="1rem" left={0} right={0}>
          <Box mx="auto" w="fit-content">
            <Button onClick={() => setCollapsed(false)}>
              Expand Directions Menu
            </Button>
          </Box>

          <Box pos="absolute" right="6rem" bottom={0}>
            <Button component={Link} to="/IndoorMapPage" color="green">
              I've Arrived
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default SelectBox;
