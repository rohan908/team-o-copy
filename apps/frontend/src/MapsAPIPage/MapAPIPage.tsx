// MapAPIPage.tsx
import React, { useState } from 'react';
import { Box, Button } from '@mantine/core';
import * as L from 'leaflet';
import SelectBox from './SelectBox.tsx';
import MapAPIComponent from './MapAPIComponent.tsx';
import GoogleMapsAPI from "./GoogleMapsAPI.tsx";

import { useMediaQuery } from '@mantine/hooks';
import {Link} from "react-router-dom";

export function MapAPIPage() {
    // Store hospital coordinate from the user
    const [selectedHospital, setSelectedHospital] = useState<L.LatLng | null>(null);
    const [isSelectBoxCollapsed, setIsSelectBoxCollapsed] = useState(false);
    const isMobile = useMediaQuery('(max-width: 768px)');


    const handleSelectHospital = (coord: L.LatLng) => {
        setSelectedHospital(coord);
    };

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
            <GoogleMapsAPI/>

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
