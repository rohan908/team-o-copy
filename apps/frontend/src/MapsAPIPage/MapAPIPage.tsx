// MapAPIPage.tsx
import React, { useState } from 'react';
import { Box, Button } from '@mantine/core';
import * as L from 'leaflet';
import SelectBox from './SelectBox.tsx';
import GoogleMapsAPI from "./GoogleMapsAPI.tsx";
import {useJsApiLoader } from "@react-google-maps/api"; //this is better than LoadScript

import { useMediaQuery } from '@mantine/hooks';
import {Link} from "react-router-dom";

export function MapAPIPage() {
    // Store hospital coordinate from the user
    const [selectedHospital, setSelectedHospital] = useState<L.LatLng | null>(null);
    const [isSelectBoxCollapsed, setIsSelectBoxCollapsed] = useState(false);
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [userCoordinates, setUserCoordinates] = useState<{ lat: number; long: number } | null>(null);

    const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      // PLEASE EACH PERSON USE PERSONAL KEY, EVERY TIME IT LOADS IT CALLS THE API

      libraries: ['places'], //required for location autocomplete in textbox
  });

    const handleSelectHospital = (coord: L.LatLng) => {
        setSelectedHospital(coord);
    };
    if (!isLoaded) {
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
          />
            <div
                style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '3rem',
                    zIndex: 9999, // must exceed map’s z-index
                }}
            >
                <SelectBox onSelectHospital={handleSelectHospital}
                           onCollapseChange={setIsSelectBoxCollapsed}
                           onSetUserCoordinates={setUserCoordinates} // ← THIS IS MISSING!

                />
            </div>
            {isSelectBoxCollapsed && (
                <div
                    style={{
                        position: 'fixed',
                        zIndex: 9999,
                        bottom: isMobile ? '5rem' : '0rem', // mobile vs desktop
                        pointerEvents: 'auto',
                        right: isMobile ? '13rem' : '5rem',

                        ...(window.innerWidth <= 768 && {
                            bottom: '4rem', // On mobile, float above SelectBox
                        }),
                    }}
                >
                    <Button
                        color="dark"
                        size="lg"
                        fw={600}
                        bg="green"
                        component={Link}
                        to={"/BFSMapPage"}
                        style={{
                            borderRadius: '50px',
                            padding: '0.5rem 1rem',
                            fontSize: '0.85rem',
                            backgroundColor: 'green',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        I've Arrived
                    </Button>
                </div>
            )}
        </Box>
    );
}

export default MapAPIPage;
