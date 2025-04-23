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

    function hospitalCoordinates(hospital: string | null): google.maps.LatLngLiteral | null {
        switch (hospital) {
            case '20 Patriot Pl':
                return { lat: 42.092759710546595, lng: -71.26611460791148 }; //this is fixed location for pharmacy, should route to specific parking lot
            case '22 Patriot Pl':
                return { lat: 42.09304546224412, lng: -71.26680481859991 };
            case 'Chestnut Hill':
                return { lat: 42.32624893122403, lng: -71.14948990068949 };
            case 'pharmacy':
                return { lat: 42.093429, lng: -71.268228 };
        }
        return null;
    }

    const handleMapLoad = (map: google.maps.Map) => {
        mapRef.current = map;
    };

    useEffect(() => {
        if (!userCoordinates || !selectedHospital || !travelMode || !mapRef.current) return;
        const directionsService = new google.maps.DirectionsService();
        if (!directionsRendererRef.current) {
            directionsRendererRef.current = new google.maps.DirectionsRenderer();
            directionsRendererRef.current.setMap(mapRef.current);
        }
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
    }, [userCoordinates, selectedHospital, travelMode]);
    return (
        <>
            <Box pos="relative" w="100%" h="100%">
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    zoom={hospitalCoordinates(selectedHospital) ? 18.6 : 10}
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
