import { Container, Box, Image, Text, Card, Button, Group, Select } from '@mantine/core';
import { useTimeline } from './TimeLineContext';
import { DraggableMap } from '../IndoorMapPage/DraggableMap';
import { useState } from 'react';

export function ContentSwitcher() {
    const { activeSection, travelMode, startNodeId, endNodeId, selectedService } = useTimeline();

    const content = () => {
        switch (activeSection) {
            case 0: //GMAPS
                return <Image src="/heroimage.jpg" />;
            case 1: //Indoor Nav
                return <DraggableMap startNodeId={startNodeId} endNodeId={endNodeId} />;
            case 2: //Request Services
                return <Image src="doctorStudioGhibli.png" />;
        }
    };

    return <Container h="100%">{content()}</Container>;
}
