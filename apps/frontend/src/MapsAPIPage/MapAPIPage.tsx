import React, { useState } from 'react';
import { Box } from '@mantine/core';
import * as L from 'leaflet';
import SelectBox from './SelectBox.tsx';
import GoogleMapsAPI from "./GoogleMapsAPI.tsx";
import {useJsApiLoader } from "@react-google-maps/api"; //this is better than LoadScript
import {useTimeline} from '../HomePage/TimeLineContext';

export function MapAPIPage() {
    const {userCoordinates, travelMode, selectedHospital} = useTimeline();
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
          // PLEASE EACH PERSON USE PERSONAL KEY, EVERY TIME IT LOADS IT CALLS THE API
          libraries: ['places'], //required for location autocomplete in textbox
      });

    if (!isLoaded && !travelMode) {
    return <div>Loading Google Maps...</div>; //debugmap
  }
    return (
      <Box  pos="relative" w="100%" h="100vh">
        <Box
          pos="absolute"
          w="100%"
          h="100%">
        <GoogleMapsAPI/>
        </Box>
          <SelectBox/>
      </Box>
    );
}

export default MapAPIPage;
