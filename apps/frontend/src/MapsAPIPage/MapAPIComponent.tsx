import React, {useEffect, useRef, MouseEvent, MouseEventHandler} from 'react';
import {useState} from 'react';
import {Simulate} from "react-dom/test-utils";
import mouseOver = Simulate.mouseOver;
import "./LeafletStyles.css";
import { Container } from '@mantine/core';
import {LayersControl, MapContainer, Marker, Popup, TileLayer, useMapEvent, useMapEvents,} from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import Routing from './RoutingLogic.tsx'
import keyDown = Simulate.keyDown;

const MapAPIComponent = () => {
    const [currentLocationToggle, setCurrentLocationToggle] = useState(false);
    const [wayOne, setWayOne] = useState(new L.LatLng(0, 0));
    const [wayTwo, setWayTwo] = useState(new L.LatLng(0, 0));
    const [keyCount, setKeyCount] = useState(0);


    function LocationMarker() {
        const [position, setPosition] = useState(new L.LatLng(40, -70));
        const map = useMapEvents({
            keypress(e){
                if (e.originalEvent.key == "e"){
                    map.locate();
                }
                if (e.originalEvent.key == "q"){
                    setWayTwo(new L.LatLng(42.0959358215332, -71.26322174072266));
                    setKeyCount(count => count + 1);
                }
                if (e.originalEvent.key == "w"){
                    setWayTwo(new L.LatLng(42.0959358215332, -71.26322174072266));
                    setKeyCount(count => count + 1);
                }
            },
            locationfound(e) {
                setWayOne(e.latlng)
                setPosition(e.latlng)
                setKeyCount(count => count + 1);
                if (currentLocationToggle) {
                   // map.flyTo(e.latlng, map.getMaxZoom())
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
            <p>
                Click the map and press E to set your starting location to your current location.
                (It may take a few moments)
                <br />
                Click the map and press W to set 20 Patriot Place to your destination. (It may take
                a few moments)
                <br />
                Click the map and press Q to set 22 Patriot Place to your destination. (It may take
                a few moments)
            </p>
            <MapContainer
                id="map-container"
                center={[42.0959358215332, -71.26322174072266]}
                zoom={8}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <SetViewOnClick />
                <LocationMarker />
                <Routing key={keyCount} waypointOne={wayOne} waypointTwo={wayTwo} />
            </MapContainer>
        </>
    );
}

export default MapAPIComponent;