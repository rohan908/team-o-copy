import {
    Box,
    Button,
    Collapse,
    Flex,
    Stack,
    Text,
    Timeline,
    Title,
    useMantineTheme,
} from '@mantine/core';
import React from 'react';
import { IconArrowZigZag, IconMap2, IconFileInfo } from '@tabler/icons-react';
import { useTimeline } from './TimeLineContext.tsx';
import { GmapsStartSelector } from './GmapsStartSelector.tsx';
import { GmapsDestinationSelector } from './GmapsDestinationSelector.tsx';
import { ParkingSelector } from './ParkingSelector.tsx';
import { DepartmentSelector } from './DepartmentSelector.tsx';
import { Link } from 'react-router-dom';
import { ModeOfTravelSelector } from './ModeOfTravelSelector.tsx';
import { AlgorithmSelector } from './AlgorithmSelector.tsx';
import { useUser } from '@clerk/clerk-react';
import { useMemo } from 'react';
import {TravelSelectorButtons} from "../common-compoents/TravelSelectorButtons.tsx";

export const CustomTimeline = () => {
    const theme = useMantineTheme();
    const { activeSection: originalActiveSection, setActiveSection } = useTimeline();
    const { isSignedIn } = useUser();

    //FILL IN CONTENT HERE FOR EACH SUBSECTION

    // TODO: redo the form so instead it passes the necessary context to each component and then those components have a onChange{(value) => set...(value | '')}
    const getCurrTabContent = (i: number) => {
        switch (i) {
            case 0: //Go To Hospital (GMAPS)
                return (
                    <Stack gap={2} w="100%">
                        <GmapsStartSelector />
                        <GmapsDestinationSelector />
                        <TravelSelectorButtons w={"50px"} h={"50px"}/>
                        <Flex justify={'end'}>
                            <Link to="map-API">
                                <Button bg={theme.colors.secondaryBlues[7]} fw={'300'}>
                                    Expand Directions
                                </Button>
                            </Link>
                        </Flex>
                        {/*<Link to="log-in-page">
                            <Button>Temp nav to old login page</Button>
                        </Link>*/}
                    </Stack>
                );
            case 1: //Indoor Nav
                return (
                    <Stack gap={2}>
                        <ParkingSelector />
                        <DepartmentSelector />
                        <AlgorithmSelector />
                        <Flex justify={'end'}>
                            <Link to="IndoorMapPage">
                                <Button bg={theme.colors.secondaryBlues[7]} fw={'300'}>
                                    Expand Directions
                                </Button>
                            </Link>
                        </Flex>
                    </Stack>
                );
            case 2:
                return (
                    <Text c={theme.colors.secondaryBlues[8]}>Please Select a Service Request</Text>
                );
        }
    };

    const allTitlesInfo = [
        { title: 'Go To Hospital', icon: <IconMap2 size={28} /> },
        { title: 'Navigate The Hospital', icon: <IconArrowZigZag size={28} /> },
        { title: 'Request Services', icon: <IconFileInfo size={28} /> },
    ];

    const titlesInfo = useMemo(() => {
        return isSignedIn ? allTitlesInfo : allTitlesInfo.slice(0, 2);
    }, [isSignedIn]);

    const activeSection = useMemo(() => {
        if (!isSignedIn && originalActiveSection === 2) {
            setActiveSection(0);
            return 0;
        }
        return originalActiveSection;
    }, [isSignedIn, originalActiveSection, setActiveSection]);

    const handleClickChangeButton = (i: number) => {
        if (i !== activeSection) setActiveSection(i);
    };

    return (
        <Timeline
            active={activeSection}
            bulletSize={50}
            color={theme.colors.primaryBlues[8]}
            lineWidth={2}
            mt={'lg'}
            style={{ cursor: 'default' }}
        >
            {titlesInfo.map((item, i: number) => (
                <Timeline.Item
                    key={i}
                    bullet={<div> {item.icon} </div>}
                    onClick={() => handleClickChangeButton(i)}
                    c={theme.colors.secondaryBlues[7]}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        width: '100%',
                    }}
                    pr={'xl'}
                    pb={'lg'}
                >
                    <Title order={1} fz={'xl'} pt={'5px'} mb={'sm'}>
                        {item.title}
                    </Title>
                    <Collapse
                        in={activeSection === i}
                        transitionDuration={500}
                        transitionTimingFunction="ease"
                    >
                        <Box w="100%">{getCurrTabContent(i)}</Box>
                    </Collapse>
                </Timeline.Item>
            ))}
        </Timeline>
    );
};
