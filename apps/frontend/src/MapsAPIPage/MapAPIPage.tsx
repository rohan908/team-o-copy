import React, { useEffect, useState } from 'react';
import {Box, Divider, Flex, Grid, Stack, Title, useMantineTheme} from '@mantine/core';
import * as L from 'leaflet';
import SelectBox from './SelectBox.tsx';
import GoogleMapsAPI from './GoogleMapsAPI.tsx';
import { useJsApiLoader } from '@react-google-maps/api'; //this is better than LoadScript
import { useTimeline } from '../HomePage/TimeLineContext';
import DirectionsBox from './DirectionsBox';
import { Step } from './Steps';
import {GmapsStartSelector} from "../HomePage/GmapsStartSelector.tsx";
import {GmapsDestinationSelector} from "../HomePage/GmapsDestinationSelector.tsx";
import {TravelSelectorButtons} from "../common-compoents/TravelSelectorButtons.tsx";
import {DepartmentSelector} from "../HomePage/DepartmentSelector.tsx";
import {ParkingSelector} from "../HomePage/ParkingSelector.tsx";
import {IconBuildings, IconDotsVertical, IconHome, IconMapPin} from '@tabler/icons-react';

export const MapAPIPage = () => {
    const {
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
        <Box w="100%" h="100%" bg="primaryBlues.0">
          <Grid w="100%">
            <Grid.Col span={"content"}>
              <Flex direction="row" align={"center"} justify={"center"} mt={"15%"}>
                <Stack gap={2} w="250px" pl="3%" pt="8%" align="center">
                  <Title order={1} fz={'lg'} pt={'8px'} ta={'center'} c={'#0E3B99'}>
                    Navigate to Hospital
                  </Title>
                  <Divider color={"yellowAccent.4"} w="100%" size={"xs"} mt={"xs"} mb={"xs"}/>
                  <Flex direction="row" gap={"xs"}>
                    <IconHome size="20" style={{ color: theme.colors.primaryBlues[8], marginTop: "7px"}} />
                    <GmapsStartSelector hasIcon={false} w={"100%"}/>
                  </Flex>
                  <Flex w="100%" justify={"left"}>
                    <IconDotsVertical size="20" style={{ color: theme.colors.primaryBlues[8], marginTop:"-10px", marginLeft: "-1px"}}  />
                  </Flex>
                  <Flex direction="row" gap={"xs"}>
                    <IconBuildings size="20" style={{ color: theme.colors.primaryBlues[8], marginTop: "7px"}} />
                    <GmapsDestinationSelector hasIcon={false} w={"100%"}/>
                  </Flex>
                  <Flex w="100%" justify={"left"}>
                    <IconDotsVertical size="20" style={{ color: theme.colors.primaryBlues[8], marginTop:"-10px", marginLeft: "-1px"}}  />
                  </Flex>
                  <Flex direction="row" gap={"xs"}>
                    <IconMapPin size="20" style={{ color: theme.colors.primaryBlues[8], marginTop: "7px"}} />
                    <DepartmentSelector hasIcon={false} w={"100%"}/>
                  </Flex>
                  <TravelSelectorButtons w={"35px"} h={"35px"}/>
                  <DirectionsBox steps={steps} />
                </Stack>
              </Flex>
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Box
                w="99%"
                h="99%"
                mt="5px"
                miw="550px"
                mih="550px"
                style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}>
                <GoogleMapsAPI onStepsUpdate={setSteps} />
              </Box>
            </Grid.Col>
          </Grid>
            {/*<SelectBox />*/}
        </Box>
    );
};

export default MapAPIPage;
