import React, { useState, useEffect } from 'react';
import {GoogleMap,LoadScript,Marker,DirectionsRenderer} from '@react-google-maps/api';
// loading overlay to show map activity
import {LoadingOverlay} from "@mantine/core";

// Map container styling
// Needs to be changed, just getting functional atm (4/11)
const containerStyle = {
  width: '100%',
  height: '100%',
};

// default lat/lng from leaflet version
const defaultCenter = {
  lat: 42.09593582153,
  long:-71.26322174072266,
}

// same as leaflet version, just changed variable names
interface MapAPIComponentProps {
  hospitalCoord?:{lat:number;long : number} | null; // new prop
}

const MapAPIComponent: React.FC<MapAPIComponentProps> = ({ hospitalCoord }) => {
  // Start them off as invalid so no route is drawn initially
  // current location
  const [wayOne, setWayOne] = useState<{ lat: number; long: number }>({lat: -1000, long: -1000});
  // hospital location state
  const [wayTwo, setWayTwo] = useState<{ lat: number; long: number }>({lat: -1000, long: -1000});
  // commenting out for now (4/11)
  //const [keyCount, setKeyCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasLoadedLocation, setHasLoadedLocation] = useState(false);
  // travel mode (for future)
  const [travelMode, setTravelMode] = useState("");

  // Each time parent passes new hospital coord, update wayTwo and force re-render
  useEffect(() => {
    if (hospitalCoord) {
      setWayTwo(hospitalCoord);
      // not using setKeyCount (4/11)
      // setKeyCount((count) => count + 1);
    }
  }, [hospitalCoord]);
  //
  return (
    <>
    </>
  );
};
export default MapAPIComponent;
