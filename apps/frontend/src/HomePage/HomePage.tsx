import { Box, Flex, Grid, Stack, Title, useMantineTheme } from '@mantine/core';
import { CustomTimeline } from './CustomTimeline.tsx';
import { useEffect, useState } from 'react';
import { ContentSwitcher } from './ContentSwitcher.tsx';
import { HoverUnderline } from '../common-compoents/HoverUnderline.js';
import { useTimeline } from './TimeLineContext.tsx';

export function HomePage() {
    const theme = useMantineTheme();

    const {
        setActiveSection,
        setSelectedHospital,
        setUserCoordinates,
        setTravelMode,
        setDepartment,
        setSelectedService,
    } = useTimeline();

    // useEffect to clear the context when we go back to the home page
    useEffect(() => {
        setActiveSection(0);
        setSelectedHospital(null);
        setUserCoordinates(null);
        setTravelMode(null);
        setDepartment('');
        setSelectedService('');
    }, []);

    return (
        <Box bg={theme.colors.blue[0]} h="100%" w="100%" p="xl" pos="absolute">
            <Grid gutter="md" h="100%" mt={'2%'}>
                {/* Left Context */}
                <Grid.Col span={6} pl="5%">
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
                <Grid.Col span={5}>
                    <Flex h="100%" align="center" justify="center" pt="6%">
                        <ContentSwitcher />
                    </Flex>
                </Grid.Col>
            </Grid>
        </Box>
    );
}
