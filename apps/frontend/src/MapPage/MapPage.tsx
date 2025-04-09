import React from 'react';
import HoverInfoComponent from './HoverInfoComponent.tsx';

export function MapPage() {
    return (
        <div className="p-10">
            <h1 className="font-bold text-xl pb-4">Map Page</h1>
            <HoverInfoComponent mapVersion={0} offsetData={[0,0]}></HoverInfoComponent>
        </div>
    );
}

export default MapPage;
