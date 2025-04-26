import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; //use ive arrived button to direct to indoor
import {BlackButton, ColorChangingButton} from '../common-compoents/commonButtons.tsx';
import { CustomNavigationBox } from '../common-compoents/CustomNavigationBox.tsx';
import { DirectoryNodeItem } from '../contexts/DirectoryItem.ts';
import { usePatriotContext, useChestnutHillContext } from '../contexts/DirectoryContext.js';
import {Box, Text, Select, Collapse, TextInput, Stack, Button, Flex} from '@mantine/core';
import { useTimeline } from '../HomePage/TimeLineContext';
import { hospitalCoordinates } from './GoogleMapsAPI.tsx';
import { hospitalOptions } from '../HomePage/GmapsDestinationSelector.tsx';
import {IconCar, IconPhoto, IconTrain, IconTrekking} from "@tabler/icons-react";

const SelectBox = () => {
    const {
        setSelectedHospital,
        setDepartment,
        setUserCoordinates,
        setTravelMode,
        setUserStart,
        selectedHospital,
        userCoordinates,
        travelMode,
    } = useTimeline();

    const [hospital, setHospital] = useState<string | null>(null);
    const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
    const [collapsed, setCollapsed] = useState(true);
    const [departmentOptions, setDepartmentOptions] = useState<{ value: string; label: string }[]>(
        []
    ); //this is needed to display department options when entered a hospital
    const [userStartLocation, setUserStartLocation] = useState<{ lat: number; lng: number } | null>(
        null
    ); // store user location input
    const [navigationMethod, setNavigationMethod] = useState<google.maps.TravelMode>(google.maps.TravelMode.BICYCLING);
    const input = useRef<HTMLInputElement>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

    const Patriot = usePatriotContext();
    const Chestnut = useChestnutHillContext();

    const MapDepartment = (department: DirectoryNodeItem[]) =>
        department.map((department: DirectoryNodeItem) => ({
            value: department.name,
            label: department.name,
        }));

    const handleFindPath = () => {
        if (hospital && hospitalCoordinates(hospital)) {
            setSelectedHospital(hospital);
        }

        if (selectedDepartment) {
            setDepartment(selectedDepartment);
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

    //use effect to render google autocomplete
    useEffect(() => {
        //initialize only when the box is not collapsed or has input
        if (collapsed || !input.current) return;

        //if previous instance of autocompleteRef exits, then clear it for re initialization
        if (autocompleteRef.current) {
            autocompleteRef.current.unbindAll?.();
            autocompleteRef.current = null;
        }
        autocompleteRef.current = new window.google.maps.places.Autocomplete(input.current, {
            types: ['geocode'],
        });

        // .addListener is a callback function that triggers when user selects one location in the autocomplete
        autocompleteRef.current.addListener('place_changed', () => {
            const place = autocompleteRef.current?.getPlace();
            if (place?.geometry?.location) {
                const location = place.geometry.location;
                const latlng = {
                    lat: location.lat(),
                    lng: location.lng(),
                };
                setUserCoordinates(latlng);
            }
        });
    }, [collapsed]);

    useEffect(() => {
        if (selectedHospital && selectedDepartment && travelMode) {
            setCollapsed(true);
        }
    }, []);

    return (
        <>
            <Collapse in={!collapsed} animateOpacity={true}>
                <Box
                    pos="absolute"
                    top="50%"
                    left="50%"
                    style={{
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: collapsed ? 'none' : 'auto', //when collapsed, this box becomes unclickable
                    }}
                    maw={500} // this  is supposed to render always to the center regardless of laptop screen
                >
                    <CustomNavigationBox
                        title="Find your Way!"
                        subtitle="Use our interactive map to find departments, parking, and efficient routes"
                        styles={{
                            root: { backgroundColor: '#EFF4FE' },
                        }} //overriding original color
                    >
                        <Stack w="100%">
                            <Box>
                                <Text ta="left" mb="sm" fw={500} color="#1C43A7">
                                    Insert Starting Location:
                                </Text>
                                <TextInput
                                    color="#A5A7AC"
                                    ref={input}
                                    onChange={(value) => setUserStart(value)}
                                    placeholder="--Enter a Location--"
                                />
                            </Box>

                            <Box>
                                <Text ta="left" mb="sm" fw={500} color="#1C43A7">
                                    Select Hospital:
                                </Text>
                                <Select
                                    color="#A5A7AC"
                                    placeholder="--Select Hospital--"
                                    data={hospitalOptions}
                                    value={hospital}
                                    onChange={setHospitalLocation}
                                />
                            </Box>

                            <Box>
                                <Text ta="left" mb="sm" fw={500} color="#1C43A7">
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
                                <Text ta="left" mb="sm" fw={500} color="#1C43A7">
                                    Select Navigation Method:
                                </Text>
                                <Flex direction="column" gap="xs">

                                </Flex>
                                <Flex direction="row" gap="xs">
                                  <ColorChangingButton
                                    leftSection={<IconCar size={14} />}
                                    ValueToCheck={navigationMethod.toString()}
                                    ValueForTrigger={google.maps.TravelMode.DRIVING.toString()}
                                    firstColor="#1C43A7"
                                    secondColor="#5A83DB"
                                    onClick={() => setNavigationMethod(google.maps.TravelMode.DRIVING)}>
                                    Driving
                                  </ColorChangingButton>
                                  <ColorChangingButton
                                    leftSection={<IconTrekking size={14} />}
                                    ValueToCheck={navigationMethod.toString()}
                                    ValueForTrigger={google.maps.TravelMode.WALKING.toString()}
                                    firstColor="#1C43A7"
                                    secondColor="#5A83DB"
                                    onClick={() => setNavigationMethod(google.maps.TravelMode.WALKING)}>
                                    Walking
                                  </ColorChangingButton>
                                  <ColorChangingButton
                                    leftSection={<IconTrain size={14} />}
                                    ValueToCheck={navigationMethod.toString()}
                                    ValueForTrigger={google.maps.TravelMode.TRANSIT.toString()}
                                    firstColor="#1C43A7"
                                    secondColor="#5A83DB"
                                    onClick={() => setNavigationMethod(google.maps.TravelMode.TRANSIT)}>
                                    Public Transit
                                  </ColorChangingButton>
                                </Flex>
                            </Box>

                            <Box ta="right">
                                <BlackButton onClick={handleFindPath}>Find Path</BlackButton>
                            </Box>
                        </Stack>
                    </CustomNavigationBox>
                </Box>
            </Collapse>

            {collapsed && ( //when collapsed, transfrom into a box that contains the 2 buttons
                <Box pos="absolute" bottom="1rem" left={0} right={0}>
                    <Box mx="auto" w="fit-content">
                        {' '}
                        {/* force this to be on the center*/}
                        <Button onClick={() => setCollapsed(false)}>Expand Directions Menu</Button>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default SelectBox;
