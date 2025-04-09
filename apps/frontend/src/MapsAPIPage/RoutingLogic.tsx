import React, { useEffect, useRef } from 'react';
import './LeafletStyles.css';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useMap } from 'react-leaflet';

interface RoutingProps {
    waypointOne: L.LatLng;
    waypointTwo: L.LatLng;
}

const Routing: React.FC<RoutingProps> = ({ waypointOne, waypointTwo }) => {
    const map = useMap();
    const routingControlRef = useRef<L.Routing.Control | null>(null);

    useEffect(() => {
        if (!map) return;

        routingControlRef.current = L.Routing.control({
            waypoints: [waypointOne, waypointTwo],
            routeWhileDragging: false,
            addWaypoints: false,
            useZoomParameter: true,
            lineOptions: {
                styles: [{ color: 'blue', weight: 6 }],
                extendToWaypoints: false,
                missingRouteTolerance: 0,
            },
            draggableWaypoints: false,
        } as L.Routing.RoutingControlOptions & { draggableWaypoints: boolean })
            .addTo(map);

        return () => {
            if (routingControlRef.current) {
                map.removeControl(routingControlRef.current);
            }
        };
    }, [map, waypointOne, waypointTwo]);

    return null;
};

export default Routing;
