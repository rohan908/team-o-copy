import React, {useEffect, useRef, MouseEvent, MouseEventHandler} from 'react';
import {useState} from 'react';
import {Simulate} from "react-dom/test-utils";
import mouseOver = Simulate.mouseOver;
import "./LeafletStyles.css";
import { Container } from '@mantine/core';
import {LayersControl, MapContainer, Marker, Popup, TileLayer, useMapEvent, useMapEvents, Tooltip} from 'react-leaflet';
import { LoadingOverlay } from '@mantine/core';
import * as L from 'leaflet';
import 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import Routing from './RoutingLogic.tsx'
import keyDown = Simulate.keyDown;

const MapAPIComponent = () => {
    //Default routing coordinates set to -1000, -1000 so they aren't in the way.
    //I can't set them to undefined without errors, so this is the next best thing.
    const [wayOne, setWayOne] = useState(new L.LatLng(-1000, -1000));
    const [wayTwo, setWayTwo] = useState(new L.LatLng(-1000, -1000));
    const [keyCount, setKeyCount] = useState(0);
    const [loading, setLoading] = useState(false);


    function LocationMarker() {
        const map = useMapEvents({
            overlayadd(e){
                //e.name corresponds to the name of the clicked overlay option. Very convenient once I figured it out.
                if (e.name == "Click Here to set Current Location"){
                    setLoading(true);
                    map.locate();
                }
                if (e.name == "Click Here to set destination to 20 Patriot Place"){
                    setLoading(true);
                    //Sets destination to coordinates of 20 Patriot Place.
                    //Calling setKeyCount is necessary to replace the routing component with a new one.
                    //If it isn't fully replaced, it won't update its coordinates.
                    setWayTwo(new L.LatLng(42.0959358215332, -71.26322174072266));
                    setKeyCount(count => count + 1);
                    setLoading(false);
                }
            },
            //Called after map.locate() finds your location.
            locationfound(e) {
                setWayOne(e.latlng)
                setKeyCount(count => count + 1);
                setLoading(false);
            },
        })
        //Blank return so it doesn't yell at me
        return null;
    }


    function SetViewOnClick({ }) {
        //Smoothly transitions the map when you click instead of a snapping movement
        const map = useMapEvent('click', (e) => {
            map.setView(e.latlng, map.getZoom())
        })
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
            <MapContainer
                id="map-container"
                center={[42.0959358215332, -71.26322174072266]}
                zoom={8}
                scrollWheelZoom={false}
            >
                <LayersControl>
                    <LayersControl.Overlay name="Click Here to set Current Location">
                        <Marker position={[-1000,-1000]} opacity={0}>
                        </Marker>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name="Click Here to set destination to 20 Patriot Place">
                        <Marker position={[-1000,-1000]} opacity={0}>
                        </Marker>
                    </LayersControl.Overlay>
                </LayersControl>
                <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
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