import React from 'react';
import {APIProvider, Map, MapCameraChangedEvent} from "@vis.gl/react-google-maps";
import {Box} from '@mantine/core';

const GoogleMapsAPI: React.FC = () =>{
  return(
    <APIProvider apiKey={"AIzaSyCaFWSHL9LuEE8ImJiUpxWrucfysx70F2k"} onLoad={()=>console.log("Maps API loaded")}>
      <Box style={{position: 'relative', width: '100%', height: '100%'}} >
      <Map
        defaultZoom={8}
        defaultCenter={{lat:42.093429, lng:-71.268228}}
        onCameraChanged={(e: MapCameraChangedEvent)=>console.log("Camera changed", e.detail.center)}
        style={{width:'100%', height:'100%'}}/>
    </Box>

</APIProvider>
  )
}

export default GoogleMapsAPI;
