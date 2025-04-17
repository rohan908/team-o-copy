import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mantine/core';
import * as L from 'leaflet';
import SelectBox from './SelectBox.tsx';
import GoogleMapsAPI from "./GoogleMapsAPI.tsx";
import {useJsApiLoader } from "@react-google-maps/api"; //this is better than LoadScript
import { useMediaQuery } from '@mantine/hooks';

interface MapAPIPageProps {
  onSelectHospital: (hospital: string | null) => void;
  onDepartmentSelect: (department: string | null) => void;
}


export function MapAPIPage({ onSelectHospital, onDepartmentSelect }: MapAPIPageProps) {
    // Store hospital coordinate from the user
    const [selectedHospital, setSelectedHospital] = useState<L.LatLng | null>(null);
    const [selectedHospitalName, setSelectedHospitalName] = useState<string | null>(null);
    const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [userCoordinates, setUserCoordinates] = useState<{ lat: number; long: number } | null>(null);
    const [travelMode, setTravelMode] = useState<google.maps.TravelMode | null>(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
          // PLEASE EACH PERSON USE PERSONAL KEY, EVERY TIME IT LOADS IT CALLS THE API

          libraries: ['places'], //required for location autocomplete in textbox
      });
  const handleSelectHospital = (coord: L.LatLng) => {
        setSelectedHospital(coord);
    };
    if (!isLoaded && !travelMode) {
    return <div>Loading Google Maps...</div>; //debugmap
  }

  const handleSelectHospitalName = (name: string | null) => {
    setSelectedHospitalName(name);
    onSelectHospital(name); // Pass hospital name to parent
  };
    return (
      <Box  pos="relative" w="100%" h="100vh">
        <Box
          pos="absolute"
          w="100%"
          h="100%">
        <GoogleMapsAPI
            selectedHospital={
              selectedHospital? { lat: selectedHospital.lat, lng: selectedHospital.lng } : null}
            userCoordinate={
              userCoordinates ? { lat: userCoordinates.lat, lng: userCoordinates.long } : null}
            travelMode={travelMode ?? google.maps.TravelMode.DRIVING}/>
        </Box>
          <SelectBox onSelectHospital={handleSelectHospital}
                           onSetUserCoordinates={setUserCoordinates}
                           onSetTravelMode={setTravelMode}
                           onSetSelectedHospitalName={handleSelectHospitalName}
                           onSetSelectedDepartment={(dept) => {
                             setSelectedDepartment(dept);
                             onDepartmentSelect(dept);}}/>
      </Box>
    );
}

export default MapAPIPage;
