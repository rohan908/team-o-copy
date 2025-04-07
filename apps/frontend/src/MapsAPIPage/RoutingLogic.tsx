import React, {useEffect, useReducer, useRef, useState} from 'react';
import './LeafletStyles.css';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useMap } from 'react-leaflet';
import {latLng} from "leaflet";

interface RoutingProps {
    waypointOne: L.LatLng;
    waypointTwo: L.LatLng;
}

const Routing: React.FC<RoutingProps> = (props) => {
    const map = useMap();
    const routingControlRef = useRef<L.Routing.Control | null>(null);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        if (!map) return;
        routingControlRef.current = L.Routing.control({
            waypoints: [props.waypointOne, props.waypointTwo],
            routeWhileDragging: true,
            addWaypoints: true,
            lineOptions: {
                styles: [{ color: 'blue', weight: 6 }],
                extendToWaypoints: false,
                missingRouteTolerance: 0,
            },
        }).addTo(map);

        function updateStartCoordinates(waypoint: L.LatLng){
            if (!routingControlRef.current) return;
            const newLat = waypoint.lat
            const newLng = waypoint.lng
            routingControlRef.current.setWaypoints([
                L.latLng(newLat, newLng),
                routingControlRef.current.getWaypoints()[1].latLng,
            ]);
        }

        function updateEndCoordinates(waypoint: L.LatLng){
            if (!routingControlRef.current) return;
            const newLat = waypoint.lat
            const newLng = waypoint.lng
            routingControlRef.current.setWaypoints([
                routingControlRef.current.getWaypoints()[0].latLng,
                L.latLng(newLat, newLng),
            ]);
        }

        setInterval(function () {
            forceUpdate();
        }, 1000);

        return () => {
            if (routingControlRef.current) {
                map.removeControl(routingControlRef.current);
            }
        };
    }, [map]);



    return null;
};

export default Routing;
