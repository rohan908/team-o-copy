import React, { useState, useEffect, useRef, useContext } from 'react';
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
    TextInput,
} from '@mantine/core';
import * as L from 'leaflet';
import { useChestnutHillContext, usePatriotContext } from '../contexts/DirectoryNode.tsx';

interface HospitalSelectBoxProps {
    onSelectHospital: (coordinate: L.LatLng) => void;
    onSelectDepartment?: (dept: string) => void;
    onCollapseChange?: (isCollapsed: boolean) => void;
    onSetUserCoordinates?: (coordinate: { lat: number; long: number }) => void;
    onSetTravelMode?: (mode: google.maps.TravelMode) => void;
}

const SelectBox: React.FC<HospitalSelectBoxProps> = (props) => {
    const {
        onSelectHospital,
        onSelectDepartment,
        onCollapseChange,
        onSetUserCoordinates,
        onSetTravelMode,
    } = props;
    const theme = useMantineTheme();
    const [hospital, setHospital] = useState<string | null>(null);
    const [department, setDepartment] = useState<string | null>(null);
    const [collapsed, setCollapsed] = useState(false);
    const [departmentOptions, setDepartmentOptions] = useState<{ value: string; label: string }[]>(
        []
    );
    const hospitalCoords = new L.LatLng(42.091846, -71.266614); //fixed hospital location, this needs to change
    const input = useRef<HTMLInputElement>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const [navigationMethod, setNavigationMethod] = useState<google.maps.TravelMode | null>(null);

    const Patriot = usePatriotContext();
    const Chestnut = useChestnutHillContext();

    console.log(Patriot);

    const handleFindPath = () => {
        if (hospital) {
            onSelectHospital(hospitalCoords);
        }
        if (department && onSelectDepartment) {
            onSelectDepartment(department);
        }
        if (department == 'pharmacy') {
            onSelectHospital(new L.LatLng(42.093429, -71.268228));
        }
        if (navigationMethod && onSetTravelMode) {
            onSetTravelMode(navigationMethod);
        }
        setCollapsed(true);
    };

    useEffect(() => {
        onCollapseChange?.(collapsed);
    }, [collapsed]);

    useEffect(() => {
        if (!input.current) return;
        autocompleteRef.current = new window.google.maps.places.Autocomplete(input.current, {
            types: ['geocode'],
        });
        autocompleteRef.current.addListener('place_changed', () => {
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
        if (hospital === 'Patriot St') {
            const options = Patriot.map((dept) => ({
                value: dept.description,
                label: dept.name,
            }));
            setDepartmentOptions(options);
        } else if (hospital === 'Chestnut') {
            const options = Patriot.map((dept) => ({
                value: dept.description,
                label: dept.name,
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
            left={0}
            right={0}
            bottom={0}
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
                    maxWidth: collapsed ? '300px' : '50%',
                    opacity: 0.95,
                    borderRadius: theme.radius.lg,
                    backdropFilter: 'blur(5px)',
                    boxShadow: '0px -4px 12px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Collapse in={!collapsed}>
                    <Title
                        order={2}
                        mb="md"
                        c="#001D4D"
                        ta="left"
                        fw={700}
                        fz={{ sm: 'xl', md: 'xxxl' }}
                    >
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
                        Use our interactive map to locate hospital departments, find the best
                        parking spots, and navigate your route efficiently.
                    </Text>

                    <Divider variant="dotted" size="lg" mb="lg" />
                    <Text ta="left" mb="sm" fw={500}>
                        Insert Starting Location:
                    </Text>
                    <TextInput ref={input} mb="md" />
                    <Text ta="left" mb="sm" fw={500}>
                        Select Hospital:
                    </Text>
                    <Select
                        placeholder="Hospital"
                        data={[
                            { value: 'Patriot St', label: 'Patriot St' },
                            { value: 'Chestnut Hill', label: 'Chestnut Hill' },
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
                    <Text ta="left" mb="sm" fw={500}>
                        Select Navigation Method:
                    </Text>
                    <Select
                        placeholder="Navigation Method"
                        data={[
                            { value: google.maps.TravelMode.WALKING, label: 'Walking' },
                            {
                                value: google.maps.TravelMode.TRANSIT,
                                label: 'Public Transportation',
                            },
                            { value: google.maps.TravelMode.DRIVING, label: 'Driving' },
                        ]}
                        value={navigationMethod}
                        onChange={(value) => {
                            setNavigationMethod(value);
                        }}
                        mb="md"
                        disabled={!hospital}
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
                        <Box w="100%" maw={{ base: '100%', md: '400px' }}>
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
