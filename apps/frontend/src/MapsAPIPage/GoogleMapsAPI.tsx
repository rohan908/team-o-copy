import React, {useEffect, useRef, useState} from 'react';
import {GoogleMap} from "@react-google-maps/api";
import {Box, ScrollArea, Text } from '@mantine/core';

interface GoogleMapProps {
    selectedHospital: google.maps.LatLngLiteral | null;
    userCoordinate: google.maps.LatLngLiteral | null;
    travelMode: google.maps.TravelMode | null;

}

const GoogleMapsAPI: React.FC<GoogleMapProps> = (props) =>{
    const {selectedHospital, userCoordinate, travelMode } = props;
    const mapRef = useRef<google.maps.Map | null>(null);
    const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
    const [steps, setSteps] = useState<string[]>([]);

    const handleMapLoad = (map: google.maps.Map) => {
        mapRef.current = map;
    };
    useEffect(() => {
        if (!userCoordinate || !selectedHospital || !mapRef.current) return;
        const directionsService = new google.maps.DirectionsService();
        if (!directionsRendererRef.current) {
            directionsRendererRef.current = new google.maps.DirectionsRenderer();
            directionsRendererRef.current.setMap(mapRef.current);
        }
        directionsService.route({
            origin: userCoordinate,
            destination: selectedHospital,
            travelMode: travelMode,
        },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK && directionsRendererRef.current) { //make
                    directionsRendererRef.current.setDirections(result)
                    const newSteps = result.routes[0].legs[0].steps.map(
                        (step) => step.instructions
                    );
                    setSteps(newSteps);
                }
                else{
                    console.error("Routing failed:", status);
                }
            }
        )
    }, [userCoordinate, selectedHospital]);

    return (
        <>
          <Box pos="relative" w="100%" h="100vh">
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    zoom={10}
                    center={selectedHospital ?? { lat: 42.093429, lng: -71.268228 }}
                    onLoad={handleMapLoad}
                />
            {steps.length > 0 && (
                <Box //custom box for directions
                    pos="absolute"
                    top="4rem"
                    right="0.5rem"
                    w={300}
                    maw={500}
                    bg="white"
                    p="md"
                    radius="md"
                    shadow="md"
                >
                  <Text fw={700} mb="sm">Directions:</Text>
                  <ScrollArea h={400}>

                    <ol style={{ paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
                        {steps.map((step, index) => (
                            <li
                                key={index}
                                dangerouslySetInnerHTML={{ __html: step }}
                                style={{ marginBottom: '0.5rem' }}
                            />
                        ))}
                    </ol>
                  </ScrollArea>
                </Box>
            )}
          </Box>
        </>
    );
}

export default GoogleMapsAPI;
