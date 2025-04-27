import { Box, Flex, Grid, SimpleGrid, Stack, Title, useMantineTheme } from '@mantine/core';
import { CustomTimeline } from './CustomTimeline.tsx';
import { useEffect, useState } from 'react';
import { ContentSwitcher } from './ContentSwitcher.tsx';
import { HoverUnderline } from '../common-compoents/HoverUnderline.js';
import { useTimeline } from './TimeLineContext.tsx';
import { useJsApiLoader } from '@react-google-maps/api';
import { DisclaimerPopup } from './Disclaimer/DisclaimerPopup.tsx';
import { NavSelectionItem } from '../contexts/NavigationItem.ts';
import { useNavSelectionContext } from '../contexts/NavigationContext.tsx';

export function HomePage() {
    const theme = useMantineTheme();

    const NavSelection = useNavSelectionContext();

    const {
        setActiveSection,
        setSelectedHospital,
        setUserCoordinates,
        setTravelMode,
        setDepartment,
        setSelectedService,
        setSelectedAlgorithm,
    } = useTimeline();

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        // PLEASE EACH PERSON USE PERSONAL KEY, EVERY TIME IT LOADS IT CALLS THE API
        libraries: ['places'], //required for location autocomplete in textbox
    });

    const clearNavMap = (): void => {
        NavSelection.dispatch({
            type: 'SET_NAV_REQUEST',
            data: {
                HospitalName: null,
                Department: null,
                AlgorithmName: null,
            } as NavSelectionItem,
        });
    };

    // useEffect to clear the context when we go back to the home page (on mount)
    useEffect(() => {
        setActiveSection(0);
        setSelectedHospital(null);
        setUserCoordinates(null);
        if (isLoaded) setTravelMode(google.maps.TravelMode.DRIVING);
        else setTravelMode(null);
        setSelectedService('');
        setDepartment(null);
        setSelectedAlgorithm(null);
        clearNavMap();
    }, []);

    if (!isLoaded) {
        return <div>Loading Google Maps...</div>; //debugmap
    }

    return (
        <Box
            // style={{
            //     backgroundImage: `radial-gradient(circle at center, white 0%, ${theme.colors.blue[0]} 100%)`,
            //     backgroundSize: 'cover',
            //     backgroundPosition: 'center',
            // }}
            // h="100%"
            w="100%"
            p="xl"
            bg={theme.colors.secondaryBlues[0]}
            style={{ position: 'relative', minHeight: '100vh' }}
        >
            <DisclaimerPopup />
            <SimpleGrid
                cols={{ base: 2, xs: 1, sm: 2 }}
                spacing="xs"
                verticalSpacing="xs"
                mt={'2%'}
                bottom="0"
                left="0"
                h={{ base: '100vh', xxs: '100%', xs: '100%', sm: '100%' }}
                style={{}}
            >
                {/* Left Context */}
                <Stack justify="flex-start" h="100%" align="flex-start">
                    <HoverUnderline>
                        <Title
                            order={2}
                            c={theme.colors.secondaryBlues[7]}
                            fz={{ base: 'xxxl', xs: 'xxl', sm: 'xxl' }}
                            w={'auto'}
                        >
                            How Can We Help?
                        </Title>
                    </HoverUnderline>
                    <CustomTimeline />
                </Stack>
                {/* Right Content */}
                <Flex
                    // w={'100%'}
                    align="center"
                    justify="center"
                    mb="40px"
                    style={{
                        borderRadius: '8px',
                        overflow: 'hidden',
                    }}
                >
                    <ContentSwitcher />
                </Flex>
            </SimpleGrid>
        </Box>
    );
}
