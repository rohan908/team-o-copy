// MapAPIPage.tsx
import React, { useState } from 'react';
import { Box } from '@mantine/core';
import * as L from 'leaflet';
import SelectBox from './SelectBox.tsx';
import MapAPIComponent from './MapAPIComponent.tsx';

export function MapAPIPage() {
    // Store hospital coordinate from the user
    const [selectedHospital, setSelectedHospital] = useState<L.LatLng | null>(null);

    const handleSelectHospital = (coord: L.LatLng) => {
        setSelectedHospital(coord);
    };

    return (
        <Box
            style={{
                position: 'absolute',
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
                zIndex: 1, // must exceed map’s z-index
            }}
        >
            {/* Map behind */}
            <MapAPIComponent hospitalCoord={selectedHospital} />

            {/* SelectBox on top */}
            <div
                style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '3rem',
                    zIndex: 9999, // must exceed map’s z-index
                }}
            >
                <SelectBox onSelectHospital={handleSelectHospital} />
            </div>
        </Box>
    );
}

export default MapAPIPage;
