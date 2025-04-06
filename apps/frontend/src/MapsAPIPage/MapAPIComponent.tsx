import React, {useEffect, useRef, MouseEvent, MouseEventHandler} from 'react';
import {useState} from 'react';
import {Simulate} from "react-dom/test-utils";
import mouseOver = Simulate.mouseOver;
import "./LeafletStyles.css";
import { Container } from '@mantine/core';
import {MapContainer, Marker, Popup, TileLayer, useMapEvent, useMapEvents, } from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import Routing from './RoutingLogic.tsx'

const MapAPIComponent = () => {
    const [currentLocationToggle, setCurrentLocationToggle] = useState(false);
    const [wayOne, setWayOne] = useState(new L.LatLng(42.2751056, -71.8013164));
    const [wayTwo, setWayTwo] = useState(new L.LatLng(42.0959358215332, -71.26322174072266));

    function LocationMarker() {
        const [position, setPosition] = useState(null);
        const map = useMapEvents({
            click() {
                map.locate();
            },
            locationfound(e) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setPosition(e.latlng)
                if (currentLocationToggle) {
                    map.flyTo(e.latlng, map.getMaxZoom())
                }
            },
        })
        return position === null ? null : (
            <Marker position={position}>
                <Popup>You are here</Popup>
            </Marker>
        )
    }



    function SetViewOnClick({ }) {
        if (!currentLocationToggle) {
            const map = useMapEvent('click', (e) => {
                map.setView(e.latlng, map.getZoom())
            })
        }
        return null
    }

    return (
        <>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                  integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
                  crossOrigin=""/>
            <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
                    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
                    crossOrigin=""></script>
            <p>
                <label>
                    <input
                        type="checkbox"
                        onChange={() => {
                            setCurrentLocationToggle(!currentLocationToggle);
                        }}
                    />
                </label>
                Check this to view your location on click
            </p>
            <MapContainer id="map-container" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <SetViewOnClick/>
                <LocationMarker/>
                <Routing waypointOne={wayOne} waypointTwo={wayTwo}/>
            </MapContainer>
        </>

    );
}

export default MapAPIComponent;