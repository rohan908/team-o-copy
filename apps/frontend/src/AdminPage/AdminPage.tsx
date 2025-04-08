import React from 'react';
import {DatabaseController} from './DatabaseController';
import {CSVTable} from './CSVTable';

export function AdminPage() {
    return (
        <div className="p-10">
            <h1 className="font-bold text-xl pb-4">Admin Page</h1>
            <DatabaseController table={"directory"}></DatabaseController>
            <CSVTable table="directory"/>
        </div>
    );
}

export default AdminPage;
