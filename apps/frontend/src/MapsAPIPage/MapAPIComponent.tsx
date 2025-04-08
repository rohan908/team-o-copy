import React, { useState, useEffect } from 'react';
import "./LeafletStyles.css";
import { MapContainer, TileLayer, useMapEvent, useMapEvents } from 'react-leaflet';
import { LoadingOverlay } from '@mantine/core';
import * as L from 'leaflet';
import 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import Routing from './RoutingLogic.tsx';

interface MapAPIComponentProps {
    hospitalCoord?: L.LatLng | null; // new prop
}

const MapAPIComponent: React.FC<MapAPIComponentProps> = ({ hospitalCoord }) => {
    // Start them off as invalid so no route is drawn initially
    const [wayOne, setWayOne] = useState(new L.LatLng(-1000, -1000));
    const [wayTwo, setWayTwo] = useState(new L.LatLng(-1000, -1000));
    const [keyCount, setKeyCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasLoadedLocation, setHasLoadedLocation] = useState(false);

    // Each time parent passes new hospital coord, update wayTwo and force re-render
    useEffect(() => {
        if (hospitalCoord) {
            setWayTwo(hospitalCoord);
            setKeyCount((count) => count + 1);
        }
    }, [hospitalCoord]);

    function LocationMarker() {
        const map = useMapEvents({
            layeradd() {
                if (!hasLoadedLocation) {
                    setLoading(true);
                    map.locate();
                    setHasLoadedLocation(true);
                }
            },
            // Called after map.locate() finds your location.
            locationfound(e) {
                setWayOne(e.latlng);
                setLoading(false);
                // Force re-render if we have a valid hospital selected
                if (hospitalCoord) {
                    setKeyCount((count) => count + 1);
                }
            },
        });
        return null;
    }

    function SetViewOnClick() {
        // Smoothly transitions the map when you click instead of a snapping movement
        const map = useMapEvent('click', (e) => {
            map.setView(e.latlng, map.getZoom());
        });
        return null;
    }

    // Decide if the route can be shown
    const canRoute =
        wayOne.lat !== -1000 &&
        wayOne.lng !== -1000 &&
        wayTwo.lat !== -1000 &&
        wayTwo.lng !== -1000;

    return (
        <>
            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
                crossOrigin=""
            />
            <script
                src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
                integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
                crossOrigin=""
            ></script>

            <MapContainer
                id="map-container"
                center={[42.09593582153, -71.26322174072266]}
                zoom={8}
                scrollWheelZoom={false}
            >
                {canRoute && (
                    <Routing key={keyCount} waypointOne={wayOne} waypointTwo={wayTwo} />
                )}

                <LoadingOverlay
                    visible={loading}
                    zIndex={1000}
                    overlayProps={{ radius: 'sm', blur: 2 }}
                />
                <LocationMarker />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <SetViewOnClick />
            </MapContainer>
        </>
    );
};

export default MapAPIComponent;
