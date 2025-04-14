import { useEffect, useState } from 'react';
import BuildingBox from "./components/BuildingBox";
import { Patriot20, Patriot22 } from './components/DirData';
import CreateDirectoryArraysForFrontend from "./components/DirData";

type DirectoryLink = {
    title: string;
    path: string;
};

export function Directory() {
    const buildingALinks = Patriot20.map(item => ({
        title: item.title,
        path: `/directory/${item.slug}`,
    }));

    const buildingBLinks = Patriot22.map(item => ({
        title: item.title,
        path: `/directory/${item.slug}`,
    }));


    return (
        <>
        <div className="p-6">
            <h1 className="text-2xl font-bold text-center mb-8">Directory Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BuildingBox directoryList={buildingALinks} building={20} />
                <BuildingBox directoryList={buildingBLinks} building={22} />
            </div>
        </div>
            </>
    );
}

export default Directory;

