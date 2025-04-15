// MapAPIPage.tsx
import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mantine/core';
import * as L from 'leaflet';
import SelectBox from './SelectBox.tsx';
import GoogleMapsAPI from "./GoogleMapsAPI.tsx";
import {useJsApiLoader } from "@react-google-maps/api"; //this is better than LoadScript
import { useMediaQuery } from '@mantine/hooks';

export function MapAPIPage() {
    // Store hospital coordinate from the user
    const [selectedHospital, setSelectedHospital] = useState<L.LatLng | null>(null);
    const [isSelectBoxCollapsed, setIsSelectBoxCollapsed] = useState(false);
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [userCoordinates, setUserCoordinates] = useState<{ lat: number; long: number } | null>(null);
    const [travelMode, setTravelMode] = useState<google.maps.TravelMode | null>(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
          // PLEASE EACH PERSON USE PERSONAL KEY, EVERY TIME IT LOADS IT CALLS THE API

          libraries: ['places'], //required for location autocomplete in textbox
      });
      useEffect(() => {
        if (isLoaded && !travelMode) {
          setTravelMode(google.maps.TravelMode.DRIVING);
        }
      }, [isLoaded, travelMode]);



  const handleSelectHospital = (coord: L.LatLng) => {
        setSelectedHospital(coord);
    };
    if (!isLoaded && !travelMode) {
    return <div>Loading Google Maps...</div>; //debugmap
  }


    return (
        <Box
            style={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
                zIndex: 1, // must exceed map’s z-index
            }}
        >
            {/* Map behind */}
          <GoogleMapsAPI
            selectedHospital={
              selectedHospital
                ? { lat: selectedHospital.lat, lng: selectedHospital.lng }
                : null
            }
            userCoordinate={
              userCoordinates
                ? { lat: userCoordinates.lat, lng: userCoordinates.long }
                : null
            }
            travelMode={travelMode ?? google.maps.TravelMode.DRIVING}
          />
            <Box
                style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '3rem',
                    zIndex: 9999, // must exceed map’s z-index
                }}
            >
                <SelectBox onSelectHospital={handleSelectHospital}
                           onSetUserCoordinates={setUserCoordinates}
                           onSetTravelMode={setTravelMode}
                />
            </Box>
        </Box>
    );
}

export default MapAPIPage;
