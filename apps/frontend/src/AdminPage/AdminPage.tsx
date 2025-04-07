import React from 'react';
import {DatabaseController} from './DatabaseController';
import {LanguageServiceRequestViewer} from './LanguageSRViewer.tsx'
export function AdminPage() {
    return (
        <div className="p-10">
            <h1 className="font-bold text-xl pb-4">Admin Page</h1>
            <DatabaseController table={"directory"}></DatabaseController>
        </div>
    );
}

export default AdminPage;
