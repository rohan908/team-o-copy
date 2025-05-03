import React, { useEffect, useState } from 'react';
import { Box, Divider, Flex, Grid, Stack, Title, useMantineTheme } from '@mantine/core';
import * as L from 'leaflet';
import SelectBox from './SelectBox.tsx';
import GoogleMapsAPI from './GoogleMapsAPI.tsx';
import { useJsApiLoader } from '@react-google-maps/api'; //this is better than LoadScript
import { useTimeline } from '../HomePage/TimeLineContext';
import DirectionsBox from './DirectionsBox';
import { Step } from './Steps';
import { GmapsStartSelector } from '../HomePage/GmapsStartSelector.tsx';
import { GmapsDestinationSelector } from '../HomePage/GmapsDestinationSelector.tsx';
import { TravelSelectorButtons } from '../common-compoents/TravelSelectorButtons.tsx';
import { DepartmentSelector } from '../HomePage/DepartmentSelector.tsx';
import { ParkingSelector } from '../HomePage/ParkingSelector.tsx';
import {
    IconBuildings,
    IconDotsVertical,
    IconHome,
    IconHomeFilled,
    IconMapPin,
} from '@tabler/icons-react';
import GMapsQRCode from './GMapsQRCode.tsx';

export const MapAPIPage = () => {
    const {
        userStart,
        userCoordinates,
        travelMode,
        selectedHospital,
        setSelectedHospital,
        isGmapsLoaded,
        setIsGmapsLoaded,
    } = useTimeline();
    const theme = useMantineTheme();
    const [steps, setSteps] = useState<Step[]>([]); // Manage steps here
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        // PLEASE EACH PERSON USE PERSONAL KEY, EVERY TIME IT LOADS IT CALLS THE API
        libraries: ['places'], //required for location autocomplete in textbox
    });

    if (!isLoaded && !travelMode) {
        return <div>Loading Google Maps...</div>; //debugmap
    }
    return (
        <Box w="100%" bg="primaryBlues.0">
            <Box w="99.3%" h="100%" mih="101.2vh" bg="primaryBlues.0">
                <Grid>
                    <Grid.Col span="content">
                        <Flex direction="row" align="center" justify="center" mt="15%">
                            <Stack gap={2} w="250px" ml="5%" mt="15%" align="center">
                                {/*<Title order={1} fz='lg' ta='center' c='#0E3B99'>*/}
                                {/*  Navigate to Hospital*/}
                                {/*</Title>*/}
                                {/*<Divider color="yellowAccent.4" w="100%" size="xs" mt="xs" mb="xs"/>*/}
                                <Flex direction="row" gap="xs">
                                    <IconHomeFilled
                                        size="20"
                                        style={{
                                            color: theme.colors.primaryBlues[8],
                                            marginTop: '7px',
                                        }}
                                    />
                                    <GmapsStartSelector hasIcon={false} w="100%" />
                                </Flex>
                                <Flex w="100%" justify="left">
                                    <IconDotsVertical
                                        size="20"
                                        style={{
                                            color: theme.colors.primaryBlues[8],
                                            marginTop: '-10px',
                                            marginLeft: '-0.4%',
                                        }}
                                    />
                                </Flex>
                                <Flex direction="row" gap="xs">
                                    <IconBuildings
                                        size="20"
                                        style={{
                                            color: theme.colors.primaryBlues[8],
                                            marginTop: '7px',
                                        }}
                                    />
                                    <GmapsDestinationSelector hasIcon={false} w="100%" />
                                </Flex>
                                <Flex w="100%" justify="left">
                                    <IconDotsVertical
                                        size="20"
                                        style={{
                                            color: theme.colors.primaryBlues[8],
                                            marginTop: '-10px',
                                            marginLeft: '-0.4%',
                                        }}
                                    />
                                </Flex>
                                <Flex direction="row" gap="xs">
                                    <IconMapPin
                                        size="20"
                                        style={{
                                            color: theme.colors.primaryBlues[8],
                                            marginTop: '7px',
                                        }}
                                    />
                                    <DepartmentSelector hasIcon={false} w={'100%'} />
                                </Flex>
                                <TravelSelectorButtons w="35px" h="35px" />
                                {userCoordinates && selectedHospital ? (
                                    <DirectionsBox steps={steps} />
                                ) : (
                                    <DirectionsBox steps={[]} />
                                )}
                            </Stack>
                        </Flex>
                    </Grid.Col>

                    <Grid.Col span="auto">
                        <Box
                            w="100%"
                            h="98vh"
                            mt="5px"
                            miw="550px"
                            mih="550px"
                            bg="primaryBlues.0"
                            style={{
                                border: '3px solid #ebf2ff',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                position: 'relative',
                            }}
                        >
                            <GoogleMapsAPI onStepsUpdate={setSteps} />
                            <GMapsQRCode />
                        </Box>
                    </Grid.Col>
                </Grid>
            </Box>
        </Box>
    );
};

export default MapAPIPage;
