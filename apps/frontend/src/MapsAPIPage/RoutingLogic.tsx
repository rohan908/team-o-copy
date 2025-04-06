import React, {useEffect, useRef, MouseEvent, MouseEventHandler} from 'react';
import {useState} from 'react';
import {Simulate} from "react-dom/test-utils";
import "./LeafletStyles.css";
import { Container } from '@mantine/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent, useMapEvents,} from 'react-leaflet';

interface RoutingProps {
    waypointOne: L.LatLng;
    waypointTwo: L.LatLng;
}


const Routing: React.FC<RoutingProps> = (props) => {
    const map = useMap();
    const routingControlRef = useRef<L.Routing.Control | null>(null);

    useEffect(() => {
        if (!map) return;

        const routingControl = L.Routing.control({
            waypoints: [props.waypointOne, props.waypointTwo],
            routeWhileDragging: true,
            addWaypoints: true,
            lineOptions: {
                styles: [{ color: 'blue', weight: 6 }],
                extendToWaypoints: false,
                missingRouteTolerance: 0,
            },
        }).addTo(map);

        routingControlRef.current = routingControl;

        return () => {
            if (routingControlRef.current) {
                map.removeControl(routingControlRef.current);
            }
        };
    }, [map]);

    return null;
};

export default Routing;
