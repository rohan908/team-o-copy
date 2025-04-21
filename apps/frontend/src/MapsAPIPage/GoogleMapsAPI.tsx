import React, {useEffect, useRef, useState} from 'react';
import {GoogleMap} from "@react-google-maps/api";
import {Box, ScrollArea, Text, List, Button} from '@mantine/core';
import { useTimeline } from '../HomePage/TimeLineContext';
import {useSpeech}  from 'react-text-to-speech';


const GoogleMapsAPI= () =>{
    const {selectedHospital, userCoordinates, travelMode } = useTimeline();
    const mapRef = useRef<google.maps.Map | null>(null);
    const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
    const [steps, setSteps] = useState<{ instruction: string; distance: string; duration: string }[]>([]);

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
        directionsService.route({
            origin: userCoordinates,
            destination: selectedHospital,
            travelMode: travelMode ?? google.maps.TravelMode.DRIVING
          },
          (result, status) => {
                if (status === google.maps.DirectionsStatus.OK && directionsRendererRef.current) { //make
                    directionsRendererRef.current.setDirections(result)
                    const newSteps = result.routes[0].legs[0].steps.map((step) => ( {
                      instruction: step.instructions,
                      distance: step.distance.text,
                      duration: step.duration.text
                  }));
                    setSteps(newSteps);
                }
                else{
                    console.error("Routing failed:", status);
                }
            }
        )
    }, [userCoordinates, selectedHospital, travelMode]);

   const speechText = steps.map((step) =>
     step.instruction.replace(/<[^>]+>/g, '')).join('...');

    const {
      speechStatus,
      start,
      stop,
    } = useSpeech({ text: speechText });

    const handleToggle = () => {
      if (speechStatus === 'started') {
        stop();
      } else {
        start();
      }
    };

    return (
        <>
          <Box pos="relative" w="100%" h="100vh">
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    zoom={10}
                    center={selectedHospital ?? { lat: 42.093429, lng: -71.268228 }}
                    onLoad={handleMapLoad}
                    options={{
                      disableDefaultUI: true,
                      mapTypeId: 'satellite',
                      mapTypeControl: 'true',
                    }}/>
            {steps.length > 0 && (
                <Box //custom box for directions
                    pos="absolute"
                    top="4rem"
                    right="0.5rem"
                    maw={250}
                    bg="white"
                    p="md"
                    radius="md"
                    shadow="md"
                    bd ="1px solid white"
                    style={{borderRadius: "10px"}}
                >
                  <Text fw={700} mb="sm">Directions:</Text>
                  <ScrollArea h={250}>

                    <List type="ordered" pl="md" mt="sm">
                      {steps.map((step, index) => (
                        <List.Item key={index}>
                          <Text size="xs" color="dimmed" mt={2}>
                            ({step.distance}, {step.duration})
                          </Text>
                          <Box dangerouslySetInnerHTML={{ __html: step.instruction }} mb="sm" />
                        </List.Item>
                        ))}
                    </List>
                  </ScrollArea>
                  <Box mt="sm">
                    <Button
                      fullWidth
                      onClick={handleToggle}
                      color={speechStatus === 'started' ? 'red' : 'blue'}
                      variant="light"
                    >
                      {speechStatus === 'started' ? 'Stop' : 'Play Directions'}
                    </Button>
                  </Box>
                </Box>
            )}
          </Box>
        </>
    );
}

export default GoogleMapsAPI;
