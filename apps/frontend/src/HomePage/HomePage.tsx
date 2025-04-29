import { Box, Flex, Grid, Stack, Title, useMantineTheme } from '@mantine/core';
import { CustomTimeline } from './CustomTimeline.tsx';
import { useEffect, useState } from 'react';
import { ContentSwitcher } from './ContentSwitcher.tsx';
import { HoverUnderline } from '../common-compoents/HoverUnderline.js';
import { useTimeline } from './TimeLineContext.tsx';
import { useJsApiLoader } from '@react-google-maps/api';
import { DisclaimerPopup } from './Disclaimer/DisclaimerPopup.tsx';
import { NavSelectionItem } from '../contexts/NavigationItem.ts';
import { useNavSelectionContext } from '../contexts/NavigationContext.tsx';
import styles from './HomePage.module.css';
import { useNavigate } from 'react-router-dom';
export function HomePage() {
    const theme = useMantineTheme();

    const NavSelection = useNavSelectionContext();

    const navigate = useNavigate();

    const {
        setActiveSection,
        setSelectedHospital,
        setUserCoordinates,
        setTravelMode,
        setDepartment,
        setSelectedService,
        setSelectedAlgorithm,
    } = useTimeline();

    const [isExpanding, setIsExpanding] = useState(false);

    const handleExpand = (state: boolean, route: string): void => {
        setIsExpanding(state);

        setTimeout(() => {
            navigate(route);
        }, 2000);
    };

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
            bg="primaryBlues.0"
            style={{
                backgroundImage: `radial-gradient(circle at center, white 0%, ${theme.colors.blue[0]} 100%)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            h="100%"
            w="100%"
            mih={'100vh'}
            p="xl"
        >
            <DisclaimerPopup />
            <Grid
                gutter="md"
                h="100%"
                mt={'2%'}
                className={`${styles.container} ${isExpanding ? styles.expanded : styles.notExpanded}`}
                grow
            >
                {/* Left Context */}
                <Grid.Col className={styles.leftColumn} pl="5%" p="xl" span={isExpanding ? 0 : 6}>
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
                        <CustomTimeline onExpand={handleExpand} />
                    </Stack>
                </Grid.Col>
                {/* Right Content */}
                <Grid.Col className={styles.rightColumn} span={isExpanding ? 10 : 6}>
                    <Flex h="100%" w={'100%'} align="center" justify="center" pt="6%">
                        <ContentSwitcher />
                    </Flex>
                </Grid.Col>
            </Grid>
        </Box>
    );
}
