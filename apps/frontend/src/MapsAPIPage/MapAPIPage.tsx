import React from 'react';
import MapAPIComponent from "./MapAPIComponent.tsx";

export function MapAPIPage() {
    return (
        <div className="p-10">
            <h1 className="font-bold text-xl pb-4">Map Page</h1>
            <MapAPIComponent></MapAPIComponent>
        </div>
    );
}

export default MapAPIPage;
