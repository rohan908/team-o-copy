import { Box, Button, Stack, Text, Timeline, Transition } from '@mantine/core';
import React, { useState } from 'react';
import { IconArrowZigZag, IconMap2, IconFileInfo } from '@tabler/icons-react';
import { useTimeline } from './TimeLineContext.tsx';
import { GmapsStartSelector } from './GmapsStartSelector.tsx';
import { GmapsDestinationSelector } from './GmapsDestinationSelector.tsx';
import { useForm } from '@mantine/form';

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
    //FILL IN CONTENT HERE FOR EACH SUBSECTION

    const getCurrTabContent = (i: number) => {
        switch (i) {
            case 0: //Go To Hospital (GMAPS)
                return (
                    <Stack gap={2}>
                        <GmapsStartSelector required {...form.getInputProps('startLocation')} />
                        <GmapsDestinationSelector required {...form.getInputProps('hospital')} />
                        <Button type="submit">Submit</Button>
                    </Stack>
                );
            case 1: //Indoor Nav
                return <Stack gap={2}>Option 2</Stack>;
            case 2:
                return <Text>Please Select a Service Request</Text>;
        }
    };

    const titlesInfo = [
        { title: 'Go To Hospital', icon: <IconMap2 size={16} /> },
        { title: 'Navigate to Hospital', icon: <IconArrowZigZag size={16} /> },
        { title: 'Request Services', icon: <IconFileInfo size={16} /> },
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
        }
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Timeline active={activeSection} bulletSize={24} lineWidth={2}>
                {titlesInfo.map((item, i: number) => (
                    <Timeline.Item
                        key={i}
                        bullet={<div onClick={() => handleClickChangeButton(i)}> {item.icon} </div>}
                        title={item.title}
                    >
                        <Transition
                            mounted={activeSection === i}
                            transition="scale-y"
                            duration={500}
                            exitDuration={200}
                            timingFunction="ease-out"
                        >
                            {(
                                styles //Transition is a bad component and it is hell that it requires this actually SCREAMING AT THIS BUG WHY WHY WHY HWHYYWYYWYWY
                            ) => (
                                <Stack gap={2} style={styles}>
                                    {getCurrTabContent(i)}
                                </Stack>
                            )}
                        </Transition>
                    </Timeline.Item>
                ))}
            </Timeline>
        </form>
    );
};
