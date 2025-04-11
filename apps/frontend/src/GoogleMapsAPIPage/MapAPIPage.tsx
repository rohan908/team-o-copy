// MapAPIPage.tsx
import React, { useState } from 'react';
import { Box, Button } from '@mantine/core';
import MapAPIComponent from './MapAPIComponent';
import { useMediaQuery } from '@mantine/hooks';
import {Link} from "react-router-dom";
//
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
    </Box>
  );
}

export default MapAPIPage;
