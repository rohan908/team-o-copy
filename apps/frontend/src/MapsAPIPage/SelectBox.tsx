import React, { useState, useEffect, useRef } from 'react';
import {Link} from "react-router-dom"; //use ive arrived button to direct to /indoor

import { Patriot20, Patriot22 } from '../directory/components/directorydata.tsx'; //this is now static lol
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

interface HospitalSelectBoxProps {        //props to pass to main map Display
    onSelectHospital: (coordinate: L.LatLng) => void;
    onSelectDepartment?: (dept: string) => void;
    onSetUserCoordinates?: (coordinate: {lat: number, long: number}) => void;
    onSetTravelMode?: (mode: google.maps.TravelMode) => void;

}

const SelectBox: React.FC<HospitalSelectBoxProps> = (props) => {
    const {onSelectHospital, onSelectDepartment, onSetUserCoordinates, onSetTravelMode} = props;
    const theme = useMantineTheme();
    const [hospital, setHospital] = useState<string | null>(null); //initialize  hospital building as null
    const [department, setDepartment] = useState<string | null>(null); //also for department
    const [collapsed, setCollapsed] = useState(false); //select box has 2 states, collapsed and popped up
    const [departmentOptions, setDepartmentOptions] = useState<
        { value: string; label: string }[]
    >([]); //this is needed to display department options when entered a hospital

    const input = useRef<HTMLInputElement>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete|null>(null);
    const [navigationMethod, setNavigationMethod] = useState<google.maps.TravelMode | null>(null);


  const handleFindPath = () => {
        if (hospital == "Chestnut Hill") {
            onSelectHospital(new L.LatLng(42.32624893122403, -71.14948990068949));
        }
        else if(hospital =="20 Patriot Pl"){
          onSelectHospital(new L.LatLng(42.092759710546595, -71.26611460791148));
        }
        else if(hospital =="22 Patriot Pl"){
          onSelectHospital(new L.LatLng(42.09304546224412, -71.26680481859991));
        }
        if (department && onSelectDepartment) {
            onSelectDepartment(department);
        }
        if (department == "pharmacy"){
          onSelectHospital(new L.LatLng(42.093429, -71.268228)); //this is fixed location for pharmacy, should route to specific parking lot
        }
        if (navigationMethod && onSetTravelMode) {
          onSetTravelMode(navigationMethod);
        }
        setCollapsed(true);
    };

  useEffect(() => { //use effect to render google autocomplete
    if (!input.current) return;
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


    useEffect(() => { //for everytime user selects new hospital, departments get displayed accordingly
        if (hospital === '20 Patriot Pl') {
            const options = Patriot20.map((dept) => ({
                value: dept.slug,
                label: dept.title,
            }));
            setDepartmentOptions(options);
        } else if (hospital === '22 Patriot Pl') {
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
            left={0}
            right={0}
            bottom={0}
            style={{
                zIndex: 999,
                display: 'flex',
                justifyContent: 'center',
                transition: 'all 0.4s ease-in-out',
                paddingBottom: collapsed ? 1 : '1.5rem',
                pointerEvents: 'none',
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
                    pointerEvents: 'auto',
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
                  <Text ta="left" mb="sm" fw={500}>
                    Insert Starting Location:
                  </Text>
                  <TextInput
                    ref={input}
                    mb="md"
                  />
                    <Text ta="left" mb="sm" fw={500}>
                        Select Hospital:
                    </Text>
                    <Select
                        placeholder="Hospital"
                        data={[
                            { value: '20 Patriot Pl', label: '20 Patriot Pl' },
                            { value: '22 Patriot Pl', label: '22 Patriot Pl' },
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
                      {value: google.maps.TravelMode.WALKING, label: 'Walking'},
                      {value: google.maps.TravelMode.TRANSIT, label: 'Public Transportation'},
                      {value: google.maps.TravelMode.DRIVING, label: 'Driving'},
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
                            position: 'fixed',
                            zIndex: 9999,
                            bottom: '0.5rem',
                            pointerEvents: 'auto',

                        }}
                    >
                      <Flex justify="space-between" align="center" gap="md">

                      <Button
                                variant="subtle"
                                size="md"
                                onClick={() => setCollapsed(false)}
                                style={{
                                    borderRadius: '50px',
                                    height: '3rem',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    width: 'fit-content',
                                    backgroundColor: theme.colors.gray[1],
                                    borderTop: `1px solid ${theme.colors.gray[3]}`,
                                }}
                            >
                                Expand Directions Menu
                            </Button>
                      <Button
                        color="green"
                        size="md"
                        fw={600}
                        component={Link}
                        to="/IndoorMapPage"
                        style={{
                          borderRadius: '50px',
                          padding: '0.5rem 1.25rem',
                          fontSize: '0.9rem',
                          marginLeft: 'auto',
                          backgroundColor: 'green',
                          color: 'white',
                          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        I've Arrived
                      </Button>
                      </Flex>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default SelectBox;
