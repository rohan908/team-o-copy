import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { Box } from '@mantine/core';
import { useTimeline } from '../HomePage/TimeLineContext';
import { Step } from './Steps';

interface GoogleMapsAPIProps {
    onStepsUpdate?: (steps: Step[]) => void; //make this input optional
}

const GoogleMapsAPI = (props: GoogleMapsAPIProps) => {
    const onStepsUpdate = props.onStepsUpdate;
    const { selectedHospital, userCoordinates, travelMode } = useTimeline();
    console.log(selectedHospital + ' ' + userCoordinates + ' ' + travelMode);
    const mapRef = useRef<google.maps.Map | null>(null);
    const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

    const handleMapLoad = (map: google.maps.Map) => {
        mapRef.current = map;
    };

    useEffect(() => {
        if (!userCoordinates || !selectedHospital || !mapRef.current) return;
        const directionsService = new google.maps.DirectionsService();
        if (!directionsRendererRef.current) {
            directionsRendererRef.current = new google.maps.DirectionsRenderer();
            directionsRendererRef.current.setMap(mapRef.current);
        }
        directionsService.route(
            {
                origin: userCoordinates,
                destination: selectedHospital,
                travelMode: travelMode ?? google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK && directionsRendererRef.current) {
                    //make
                    directionsRendererRef.current.setDirections(result);
                    const newSteps = result.routes[0].legs[0].steps.map((step) => ({
                        instruction: step.instructions,
                        distance: step.distance.text,
                        duration: step.duration.text,
                    }));
                    if (onStepsUpdate) {
                        onStepsUpdate(newSteps);
                    } //if passed prop, then run
                } else {
                    console.error('Routing failed:', status);
                }
            }
        );
    }, [userCoordinates, selectedHospital, travelMode]);
    return (
        <>
            <Box pos="relative" w="100%" h="100%">
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    zoom={10}
                    center={selectedHospital ?? { lat: 42.093429, lng: -71.268228 }}
                    onLoad={handleMapLoad}
                    options={{
                        fullscreenControl: false,
                        disableDefaultUI: true,
                        mapTypeId: 'satellite',
                        mapTypeControl: true,
                    }}
                />
            </Box>
        </>
    );
};

export default GoogleMapsAPI;
