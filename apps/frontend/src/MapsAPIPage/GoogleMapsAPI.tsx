import React, {useEffect, useRef, useState} from 'react';
import {GoogleMap} from "@react-google-maps/api";
import {Box} from '@mantine/core';

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
            <Box style={{ position: 'relative', width: '100%', height: '100%' }}>
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    zoom={10}
                    center={selectedHospital ?? { lat: 42.093429, lng: -71.268228 }}
                    onLoad={handleMapLoad}
                />
            </Box>

            {steps.length > 0 && (
                <Box
                    style={{
                        position: 'absolute',
                        top: '3rem',
                        right: '2rem',
                        maxHeight: '500px',
                        width: '300px',
                        overflowY: 'auto',
                        backgroundColor: 'white',
                        padding: '1rem',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                        zIndex: 9999,
                    }}
                >
                    <strong>Directions:</strong>
                    <ol style={{ paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
                        {steps.map((step, index) => (
                            <li
                                key={index}
                                dangerouslySetInnerHTML={{ __html: step }}
                                style={{ marginBottom: '0.5rem' }}
                            />
                        ))}
                    </ol>
                </Box>
            )}
        </>
    );
}

export default GoogleMapsAPI;
