import React from 'react';
import {DatabaseController} from './DatabaseController';
export function DisplayRequestsPage() {
    return (
        <div className="p-10">
            <h1 className="font-bold text-xl pb-4">Display Requests Page</h1>
            <DatabaseController table={"directory"}></DatabaseController>
        </div>
    );
}

export default DisplayRequestsPage;
