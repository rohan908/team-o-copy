import {useState} from 'react';
import "./LeafletStyles.css";
import {MapContainer, TileLayer, useMapEvent, useMapEvents} from 'react-leaflet';
import { LoadingOverlay } from '@mantine/core';
import * as L from 'leaflet';
import 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import Routing from './RoutingLogic.tsx'

const MapAPIComponent = () => {
    //Default routing coordinates set to -1000, -1000 so they aren't in the way.
    //I can't set them to undefined without errors, so this is the next best thing.
    const [wayOne, setWayOne] = useState(new L.LatLng(-1000, -1000));
    const [wayTwo, setWayTwo] = useState(new L.LatLng(-1000, -1000));
    const [keyCount, setKeyCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasLoadedLocation, setHasLoadedLocation] = useState(false);


    function LocationMarker() {
        const map = useMapEvents({
            layeradd(){
                if (!hasLoadedLocation){
                    setLoading(true);
                    map.locate();
                    //Sets destination to coordinates of 20 Patriot Place.
                    //Calling setKeyCount is necessary to replace the routing component with a new one.
                    //If it isn't fully replaced, it won't update its coordinates.
                    setWayTwo(new L.LatLng(42.09593582153, -71.26322174072266));
                    setKeyCount(count => count + 1);
                    setHasLoadedLocation(true);
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
                <Routing key={keyCount} waypointOne={wayOne} waypointTwo={wayTwo} />
                <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <LocationMarker/>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <SetViewOnClick/>
            </MapContainer>
        </>
    );
}

export default MapAPIComponent;