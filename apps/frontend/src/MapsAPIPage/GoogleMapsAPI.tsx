import React, {useEffect, useRef, useState} from 'react';
import {GoogleMap} from "@react-google-maps/api";
import {Box} from '@mantine/core';

interface GoogleMapProps {
    selectedHospital: google.map.LatLngLiteral | null;
    userCoordinate: google.maps.LatLngLiteral | null;
}

const GoogleMapsAPI: React.FC<GoogleMapProps> = (props) =>{
    const {selectedHospital, userCoordinate } = props;
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
            travelMode: google.maps.TravelMode.DRIVING,
        },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK && directionsRendererRef.current) {
                    directionsRendererRef.current.setDirections(result)
                }
                else{
                    console.error("Routing failed:", status);
                }
            }
        )
    }, [userCoordinate, selectedHospital]);

    return(
      <Box style={{position: 'relative', width: '100%', height: '100%'}} >
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        zoom={10}
        center={selectedHospital ?? { lat: 42.093429, lng: -71.268228 }}
        onLoad={handleMapLoad}
      />
    </Box>
  )
}

export default GoogleMapsAPI;
