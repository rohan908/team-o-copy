import { Container, Box, Image, Text, Card, Button, Group, Select } from '@mantine/core';
import { useTimeline } from './TimeLineContext';
import { DraggableMap } from '../IndoorMapPage/DraggableMap';
import { useState } from 'react';
import ServiceRequestPage from '../service-request/ServiceRequestPage.tsx';

export function ContentSwitcher() {
    const { activeSection, travelMode, startNodeId, endNodeId, selectedService } = useTimeline();

    const content = () => {
        switch (activeSection) {
            case 0: //GMAPS
                return <Image src="/ProofOfConceptHomePageImages/GmapsImg.png" />;
            case 1: //Indoor Nav
                return <Image src="/ProofOfConceptHomePageImages/FloorPlanPathing.png" />;
            case 2: //Request Services
                return <ServiceRequestPage />;
        }
    };

    return <Container h="100%">{content()}</Container>;
}
