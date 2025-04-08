import React from 'react';
import MapAPIComponent from "./MapAPIComponent.tsx";
import { Box} from '@mantine/core';
import SelectBox from "./SelectBox.tsx";

export function MapAPIPage() {
    return (
        <>
            <Box
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100vh',
                    overflow: 'hidden'
                }}
            >
                <MapAPIComponent />

                <div
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        zIndex: 9999
                    }}
                >
                </div>
            </Box>
            <div>
                <SelectBox/>
            </div>
        </>
    );
}

export default MapAPIPage;