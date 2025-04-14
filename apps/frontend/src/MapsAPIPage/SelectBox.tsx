import React, { useState, useEffect, useRef } from 'react';
import { Patriot20, Patriot22 } from '../directory/components/directorydata.tsx';
import {
    Box,
    Text,
    Title,
    Flex,
    Button,
    Divider,
    Select,
    useMantineTheme,
    Collapse,
    TextInput
} from '@mantine/core';
import * as L from 'leaflet';

interface HospitalSelectBoxProps {
    onSelectHospital: (coordinate: L.LatLng) => void;
    onSelectDepartment?: (dept: string) => void;
    onCollapseChange?: (isCollapsed: boolean) => void;
    onTriggerRoute?: () => void;
    onSetUserCoordinates?: (coordinate: {lat: number, long: number}) => void;
}

const SelectBox: React.FC<HospitalSelectBoxProps> = (props) => {
    const {onSelectHospital, onSelectDepartment, onCollapseChange, onTriggerRoute, onSetUserCoordinates} = props;
    const theme = useMantineTheme();
    const [hospital, setHospital] = useState<string | null>(null);
    const [department, setDepartment] = useState<string | null>(null);
    const [collapsed, setCollapsed] = useState(false);
    const [departmentOptions, setDepartmentOptions] = useState<
        { value: string; label: string }[]
    >([]);

    const hospitalCoords = new L.LatLng(42.091846, -71.266614);
    const input = useRef<HTMLInputElement>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete|null>(null);
    const handleFindPath = () => {
        if (hospital) {
            onSelectHospital(hospitalCoords);
        }
        if (department && onSelectDepartment) {
            onSelectDepartment(department);
        }
        if (department == "pharmacy"){
          onSelectHospital(new L.LatLng(42.093429, -71.268228));
        }
        setCollapsed(true);
    };

    useEffect(() => {
        onCollapseChange?.(collapsed);
    }, [collapsed]);
  useEffect(() => {
    if (!input.current) return;
    if (!window.google?.maps?.places) {
      console.error("Google Maps API not loaded.");
      return;
    }
    autocompleteRef.current = new window.google.maps.places.Autocomplete(input.current, {types: ['geocode']});
    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace();
      if (place?.geometry?.location) {
        const location = place.geometry.location;
        const latlng = {
          lat: location.lat(),
          long: location.lng(),
        };
        onSetUserCoordinates?.(latlng);
      }
    });
  }, []);
    useEffect(() => {
        if (hospital === '20 Patriot St') {
            const options = Patriot20.map((dept) => ({
                value: dept.slug,
                label: dept.title,
            }));
            setDepartmentOptions(options);
        } else if (hospital === '22 Patriot St') {
            const options = Patriot22.map((dept) => ({
                value: dept.slug,
                label: dept.title,
            }));
            setDepartmentOptions(options);
        } else {
            setDepartmentOptions([]);
        }

        // Reset department when hospital changes
        setDepartment(null);
    }, [hospital]);

    return (
        <Box
            pos="fixed"
            bottom="0"
            left={0}
            right={0}
            style={{
                zIndex: 999,
                display: 'flex',
                justifyContent: 'center',
                transition: 'all 0.4s ease-in-out',
                paddingBottom: collapsed ? 0 : '1.5rem',
            }}
        >
            <Box
                bg="white"
                p={collapsed ? 0 : { base: 'xl', sm: '2rem' }}
                w="100%"
                style={{
                    maxWidth: collapsed ? '300px' : '80%',
                    opacity: 0.95,
                    borderRadius: theme.radius.lg,
                    backdropFilter: 'blur(5px)',
                    boxShadow: '0px -4px 12px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                }}
            >
                <Collapse in={!collapsed}>
                    <Title order={2} mb="md" c="#001D4D" ta="left" fw={700} fz={{ sm: 'xl', md: 'xxxl' }}>
                        Find your Way!
                    </Title>

                    <Text
                        mb="sm"
                        ta="left"
                        fz="sm"
                        c="dimmed"
                        style={{
                            fontStyle: 'italic',
                            lineHeight: 1.5,
                            maxWidth: '90%',
                        }}
                    >
                        Use our interactive map to locate hospital departments, find the best parking spots, and
                        navigate your route efficiently.
                    </Text>

                    <Divider variant="dotted" size="lg" mb="lg" />
                  <TextInput
                    label="Enter start location:"
                    ref={input}
                    mb="md"
                  />
                    <Text ta="left" mb="sm" fw={500}>
                        Select Hospital:
                    </Text>
                    <Select
                        placeholder="Hospital"
                        data={[
                            { value: '20 Patriot St', label: '20 Patriot St' },
                            { value: '22 Patriot St', label: '22 Patriot St' },
                        ]}
                        value={hospital}
                        onChange={setHospital}
                        mb="md"
                    />

                    <Text ta="left" mb="sm" fw={500}>
                        Select Department:
                    </Text>
                    <Select
                        placeholder="Department"
                        data={departmentOptions}
                        value={department}
                        onChange={setDepartment}
                        mb="md"
                        disabled={!hospital || departmentOptions.length === 0}
                    />

                    <Flex justify="flex-end" gap="md">
                        <Button
                            onClick={handleFindPath}
                            color="dark"
                            fw="600"
                            bg="black"
                            style={{
                                borderRadius: '50px',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Find Path
                        </Button>
                    </Flex>
                </Collapse>

                {collapsed && (
                    <Box
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                        }}
                    >
                        <Box
                            w="100%"
                            maw={{ base: '100%', md: '400px' }}
                        >
                            <Button
                                variant="subtle"
                                fullWidth
                                size="md"
                                onClick={() => setCollapsed(false)}
                                style={{
                                    borderRadius: 0,
                                    height: '3rem',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    backgroundColor: theme.colors.gray[1],
                                    borderTop: `1px solid ${theme.colors.gray[3]}`,
                                }}
                            >
                                Expand Directions Menu
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default SelectBox;
