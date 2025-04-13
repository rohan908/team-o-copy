import React from 'react';
import {GoogleMap, LoadScript} from "@react-google-maps/api";
import {Box} from '@mantine/core';

const GoogleMapsAPI: React.FC = () =>{
  return(
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      {/*APIProvider component requires a key, PLEASE EACH PERSON USE PERSONAL KEY, EVERY TIME IT LOADS IT CALLS THE API*/}
      <Box style={{position: 'relative', width: '100%', height: '100%'}} >
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        zoom={8}
        center={{lat:42.093429, lng:-71.268228}} //20 patriot location
        onCenterChanged={()=>console.log("Camera changed")}
      />
    </Box>

</LoadScript>
  )
}

export default GoogleMapsAPI;
