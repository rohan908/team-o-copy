import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { Box } from '@mantine/core';
import { useTimeline } from '../HomePage/TimeLineContext';
import { Step } from './Steps';

interface GoogleMapsAPIProps {
    onStepsUpdate?: (steps: Step[]) => void; //make this input optional
}

export function hospitalCoordinates(hospital: string | null): google.maps.LatLngLiteral | null {
    switch (hospital) {
        case '20 Patriot Pl':
            return { lat: 42.09190044054284, lng: -71.26640734850004 }; //this is fixed location for pharmacy, should route to specific parking lot
        case '22 Patriot Pl':
            return { lat: 42.09190044054284, lng: -71.26640734850004 };
        case 'Chestnut Hill':
            return { lat: 42.32636099324175, lng: -71.1492697651447 };
        case 'Faulkner Hospital':
            return { lat: 42.30198339966857, lng: -71.12743582275311 };
        case 'BWH Campus':
            return { lat: 42.33636274679939, lng: -71.10897247577398 };
    }
    return null;
}

const GoogleMapsAPI = (props: GoogleMapsAPIProps) => {
    const onStepsUpdate = props.onStepsUpdate;
    const { selectedHospital, userCoordinates, travelMode, mapRef, directionsRendererRef } =
        useTimeline();
    console.log(selectedHospital + ' ' + userCoordinates + ' ' + travelMode);

    const handleMapLoad = (map: google.maps.Map) => {
        mapRef.current = map;
    };

    useEffect(() => {
        if (!userCoordinates || !selectedHospital || !travelMode || !mapRef.current) {
            if (directionsRendererRef.current) {
                directionsRendererRef.current.setDirections({ routes: [] }); // Clear old route, if directions aren't filled completely
            }
            return;
        }
        const directionsService = new google.maps.DirectionsService();
        if (!directionsRendererRef.current) {
            directionsRendererRef.current = new google.maps.DirectionsRenderer();
        }
        directionsRendererRef.current.setMap(mapRef.current);
        directionsService.route(
            {
                origin: userCoordinates,
                destination: hospitalCoordinates(selectedHospital)!,
                travelMode: travelMode ?? google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK && directionsRendererRef.current) {
                    //make
                    directionsRendererRef.current.setDirections(result);
                    const newSteps = result!.routes[0].legs[0].steps.map((step) => ({
                        instruction: step.instructions,
                        distance: step.distance!.text,
                        duration: step.duration!.text,
                    }));
                    if (onStepsUpdate) {
                        onStepsUpdate(newSteps);
                    } //if passed prop, then run
                } else {
                    console.error('Routing failed:', status);
                }
            }
        );
    }, [
        userCoordinates,
        selectedHospital,
        travelMode,
        mapRef.current,
        directionsRendererRef.current,
    ]);
    return (
        <>
            <Box pos="relative" w="100%" h="100%" bg="primaryBlues.0">
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    zoom={10}
                    center={
                        hospitalCoordinates(selectedHospital) ?? { lat: 42.093429, lng: -71.268228 }
                    }
                    onLoad={handleMapLoad}
                    options={{
                        fullscreenControl: false,
                        disableDefaultUI: true,
                        mapTypeId: 'satellite',
                        mapTypeControl: false,
                    }}
                />
            </Box>
        </>
    );
};

export default GoogleMapsAPI;
