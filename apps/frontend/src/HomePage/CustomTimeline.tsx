import {
    Box,
    Button,
    Collapse,
    Flex,
    Stack,
    Text,
    Timeline,
    Title,
    Transition,
    useMantineTheme,
} from '@mantine/core';
import React, { useState } from 'react';
import { IconArrowZigZag, IconMap2, IconFileInfo } from '@tabler/icons-react';
import { useTimeline } from './TimeLineContext.tsx';
import { GmapsStartSelector } from './GmapsStartSelector.tsx';
import { GmapsDestinationSelector } from './GmapsDestinationSelector.tsx';
import { useForm } from '@mantine/form';
import { ParkingSelector } from './ParkingSelector.tsx';
import { DepartmentSelector } from './DepartmentSelector.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { ModeOfTravelSelector } from './ModeOfTravelSelector.tsx';
import { AlgorithmSelector } from './AlgorithmSelector.tsx';

export const CustomTimeline = () => {
    const {
        activeSection,
        setActiveSection,
        currDirectoryDestination,
        setCurrDirectoryDestination,
        selectedHospital,
        setSelectedHospital,
        userCoordinates,
        setUserCoordinates,
        travelMode,
        setTravelMode,
    } = useTimeline();

    const theme = useMantineTheme();

    //FILL IN CONTENT HERE FOR EACH SUBSECTION

    // TODO: redo the form so instead it passes the necessary context to each component and then those components have a onChange{(value) => set...(value | '')}
    const getCurrTabContent = (i: number) => {
        switch (i) {
            case 0: //Go To Hospital (GMAPS)
                return (
                    <Stack gap={2} w="100%">
                        <GmapsStartSelector required {...form.getInputProps('startLocation')} />
                        <GmapsDestinationSelector required {...form.getInputProps('hospital')} />
                        <ModeOfTravelSelector required {...form.getInputProps('modeOfTravel')} />
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
                        <ParkingSelector required {...form.getInputProps('hospital')} />
                        <DepartmentSelector
                            required
                            {...form.getInputProps('departmentDestination')}
                        />
                        <AlgorithmSelector
                            required
                            {...form.getInputProps('departmentDestination')}
                        />
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

    const titlesInfo = [
        { title: 'Go To Hospital', icon: <IconMap2 size={28} /> },
        { title: 'Navigate to Hospital', icon: <IconArrowZigZag size={28} /> },
        { title: 'Request Services', icon: <IconFileInfo size={28} /> },
    ];

    const handleClickChangeButton = (i: number) => {
        if (i !== activeSection) setActiveSection(i);
    };

    const form = useForm({
        initialValues: {
            startLocation: '',
            hospital: '',
        },
    });

    const handleSubmit = (values: any) => {
        switch (activeSection) {
            case 0:
                setUserCoordinates(values.startLocation);
                setSelectedHospital(values.hospital);
                break;
            case 1:
                setCurrDirectoryDestination(values.hospital);
                break;
        }
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
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
                        bullet={<div onClick={() => handleClickChangeButton(i)}> {item.icon} </div>}
                        c={theme.colors.secondaryBlues[7]}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                        }}
                        pr={'xl'}
                        pb={'lg'}
                    >
                        <Title order={1} fz={'xl'} pt={'5px'} mb={'sm'}>
                            {item.title}
                        </Title>
                        <Collapse
                            in={activeSection === i}
                            transitionDuration={300}
                            transitionTimingFunction="ease-out"
                        >
                            <Box w="100%">{getCurrTabContent(i)}</Box>
                        </Collapse>
                    </Timeline.Item>
                ))}
            </Timeline>
        </form>
    );
};
