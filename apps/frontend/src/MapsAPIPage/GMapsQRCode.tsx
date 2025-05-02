import { Box } from '@mantine/core';
import { useTimeline } from '../HomePage/TimeLineContext.tsx';
import { hospitalCoordinates } from './GoogleMapsAPI.tsx';
import QRCode from 'react-qr-code';

function getPlaceID(hospital: string | null): string | null {
    switch (hospital) {
        case '20 Patriot Pl':
            return 'ChIJKQrcBrd85IkRhhpDZMarvhQ'; //this is fixed location for pharmacy, should route to specific parking lot
        case '22 Patriot Pl':
            return 'ChIJKQrcBrd85IkRhhpDZMarvhQ';
        case 'Chestnut Hill':
            return 'ChIJ-yFeu_5444kRSgebQwOgOWQ';
        case 'Faulkner Hospital':
            return 'ChIJe4Tn7Dt544kRiHltu65tXWY';
        case 'BWH Campus':
            return 'ChIJmaJkZ45544kRI0cpJGPCIs8';
    }
    return null;
}

const GMapsQRCode = () => {
    const { selectedHospital, userCoordinates, travelMode, mapRef, directionsRendererRef } =
        useTimeline();
    if (!selectedHospital || !userCoordinates || !travelMode) return null;
    // conver the , to %2C
    const baseUrl: string = 'https://www.google.com/maps/dir/?api=1';

    console.log('selectedHospital', selectedHospital);
    console.log('userCoordinates', userCoordinates);
    console.log('travelMode', travelMode);

    const parcedUserCoordinates = `${userCoordinates.lat}` + '%2C' + `${userCoordinates.lng}`;

    const hopitalCoordinates = hospitalCoordinates(selectedHospital);
    console.log('hopitalCoordinates', hopitalCoordinates);

    const parcedHopitalCoordinates =
        `${hopitalCoordinates!.lat}` + '%2C' + `${hopitalCoordinates!.lng}`;
    console.log('parcedHopitalCoordinates', parcedHopitalCoordinates);

    const locationID = getPlaceID(selectedHospital);
    console.log('locationID', locationID);

    const origin: string = '&origin=' + parcedUserCoordinates;
    console.log('origin', origin);
    const destination: string = '&destination=' + parcedHopitalCoordinates;
    const destination_place_id: string = '&destination_place_id=' + locationID;
    console.log('destination_place_id', destination_place_id);
    const googleTravelmode: string = '&travelmode=' + travelMode; //travelMode;
    const dir_action: string = '&dir_action=navigate';

    const googleMapURL =
        baseUrl + origin + destination + destination_place_id + dir_action + googleTravelmode;
    console.log('full URL: ', googleMapURL);

    return (
        <>
            <Box>
                <h1>{googleMapURL}</h1>
            </Box>
            <div style={{ height: 'auto', margin: '0 auto', maxWidth: 64, width: '100%' }}>
                <QRCode
                    size={256}
                    style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                    value={googleMapURL}
                    viewBox={`0 0 256 256`}
                />
            </div>
        </>
    );
};

export default GMapsQRCode;
