import React, {useEffect, useRef} from 'react';
import './LeafletStyles.css';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useMap } from 'react-leaflet';

interface RoutingProps {
    waypointOne: L.LatLng;
    waypointTwo: L.LatLng;
}

const Routing: React.FC<RoutingProps> = (props) => {
    const map = useMap();
    const routingControlRef = useRef<L.Routing.Control | null>(null);

    useEffect(() => {
        if (!map) return;
        routingControlRef.current = L.Routing.control({
            //Waypoints are only set here, so to update them again, the object must be fully replaced.
            //This is done by updating its key prop in MapAPIComponent.tsx
            waypoints: [props.waypointOne, props.waypointTwo],
            routeWhileDragging: true,
            //Adds waypoints indicating start and end
            addWaypoints: true,
            useZoomParameter: true,
            lineOptions: {
                styles: [{ color: 'blue', weight: 6 }],
                extendToWaypoints: false,
                missingRouteTolerance: 0,
            },
        }).addTo(map);


        return () => {
            //Removes the current routing control ref after it's done using it
            if (routingControlRef.current) {
                map.removeControl(routingControlRef.current);
            }
        };
    }, [map]);
    return null;
};

export default Routing;
