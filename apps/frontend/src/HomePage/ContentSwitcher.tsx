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
                return <Image src="/ProofOfConceptHomePageImages/GmapsImg.png" mah="100%" maw="100%" objectFit="contain" />;
            case 1: //Indoor Nav
                return <Image src="/ProofOfConceptHomePageImages/FloorPlanPathing.png" mah="100%" maw="100%" objectFit="contain" />;
            case 2: //Service Request
                return <ServiceRequestPage mah="100%" maw="100%" objectFit="contain" />;
        }
    };
    return <Container h="100%" p='0'>{content()}</Container>;
}
