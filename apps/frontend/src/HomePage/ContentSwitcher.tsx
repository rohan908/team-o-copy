import { Container, Box, Image, Text, Card, Button, Group, Select } from '@mantine/core';
import { useTimeline } from './TimeLineContext';
import { DraggableMap } from '../IndoorMapPage/DraggableMap';
import { useState } from 'react';
import ServiceRequestPage from '../service-request/ServiceRequestPage.tsx';

export function ContentSwitcher() {
    const { activeSection, travelMode, selectedService } = useTimeline();

    const content = () => {
        switch (activeSection) {
            case 0: //GMAPS
                return (
                    <Image
                        src="/ProofOfConceptHomePageImages/GmapsImg.png"
                        fit={'cover'}
                        w={'100%'}
                        h={'100%'}
                    />
                );
            case 1: //Indoor Nav
                return (
                    <Image
                        src={'/ProofOfConceptHomePageImages/FloorPlanPathing.png'}
                        h={'auto'}
                        w="auto"
                    />
                );
            case 2: //Service Request
                return <ServiceRequestPage />;
        }
    };
    return (
        <Container
            h="100%"
            p="xxl"
            style={{
                borderRadius: '8px',
                boxShadow: 'inset 0px 0px 10px 2px rgba(0, 0, 0, 0.5)',
                overflow: 'hidden',
            }}
        >
            {content()}
        </Container>
    );
}
