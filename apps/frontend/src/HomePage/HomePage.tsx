import { Box, Flex, Grid, Stack, Title, useMantineTheme } from '@mantine/core';
import { CustomTimeline } from './CustomTimeline.tsx';
import { useEffect} from 'react';
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
        clearNavMap();
    }, []);

    if (!isLoaded) {
        return <div>Loading Google Maps...</div>; //debugmap
    }

    return (
        <Box
            bg="primaryBlues.0"
            style={{
                backgroundImage: `radial-gradient(circle at center, white 0%, ${theme.colors.blue[0]} 100%)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            h="100%"
            w="100%"
            p="xl"
            mih={'100vh'}
        >
            <DisclaimerPopup />
            <Grid gutter="md" h="100%" mt={'2%'}>
                {/* Left Context */}
                <Grid.Col span={6} pl="5%" p="lg">
                    <Stack justify="flex-start" h="100%" align="flex-start">
                        <HoverUnderline>
                            <Title
                                order={2}
                                c={theme.colors.secondaryBlues[7]}
                                fz={'xxxl'}
                                w={'auto'}
                            >
                                How Can We Help?
                            </Title>
                        </HoverUnderline>
                        <CustomTimeline />
                    </Stack>
                </Grid.Col>
                {/* Right Content */}
                <Grid.Col span={6}>
                    <Flex
                        h="100%"
                        w={'100%'}
                        align="center"
                        justify="center"
                        // mt="10px"
                        style={{
                            overflow: 'hidden',
                            borderRadius: '8px',
                        }}
                    >
                        <ContentSwitcher />
                    </Flex>
                </Grid.Col>
            </Grid>
        </Box>
    );
}
