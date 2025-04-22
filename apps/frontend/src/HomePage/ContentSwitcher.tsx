import { Container, Box, Image, Text, Card, Button, Group, Select } from '@mantine/core';
import { useTimeline } from './TimeLineContext';
import { DraggableMap } from '../IndoorMapPage/DraggableMap';
import { useState } from 'react';
import ServiceRequestPage from '../service-request/ServiceRequestPage.tsx';
import GoogleMapsAPI from '../MapsAPIPage/GoogleMapsAPI.tsx';
import { Step } from '../MapsAPIPage/Steps.ts';
import { useJsApiLoader } from '@react-google-maps/api';

export function ContentSwitcher() {
    const { activeSection, travelMode, selectedService } = useTimeline();
    const [steps, setSteps] = useState<Step[]>([]);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        // PLEASE EACH PERSON USE PERSONAL KEY, EVERY TIME IT LOADS IT CALLS THE API
        libraries: ['places'], //required for location autocomplete in textbox
    });

    const content = () => {
        switch (activeSection) {
            case 0: //GMAPS
                if (!isLoaded && !travelMode) {
                    return <div>Loading Google Maps...</div>; //debugmap
                }
                return <GoogleMapsAPI onStepsUpdate={setSteps} />;
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
        <Box
            w="100%"
            h="100%"
            p="xxl"
            style={{
                borderRadius: '8px',
                boxShadow: 'inset 0px 0px 10px 2px rgba(0, 0, 0, 1)',
                overflow: 'hidden',
            }}
        >
            {content()}
        </Box>
    );
}
