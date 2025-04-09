import React, { useEffect, useState } from 'react';
import BuildingBox from './components/BuildingBox.tsx';
import axios from 'axios';


// define a DirectoryLink type for useState
type DirectoryLink = {
    title: string;
    path: string;
};

export function Directory() {
    // starting state is empty array
    const [buildingALinks, setBuildingALinks] = useState<DirectoryLink[]>([]);
    const [buildingBLinks, setBuildingBLinks] = useState<DirectoryLink[]>([]);

    useEffect(() => {

        const fetchData = async () => {
            console.log("fetching");
            // gets the department names and building through https query from directory.ts
            await fetch(`http://localhost:3001/directory/directorybuilding`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json(); // parse the JSON from response body
                })
                .then(data => {
                    // stores building data to be accessed
                    const Patriot20 = data[0];
                    const Patriot22 = data[1];

                    // creates url for clicking each department for Patriot 20
                    const buildingALinks = Patriot20.map((item: { title: string; slug: string }) => ({
                        title: item.title,
                        path: `/directory/${item.slug}`,
                    }));

                    // creates url for clicking each department for Patriot 22
                    const buildingBLinks = Patriot22.map((item: { title: string; slug: string }) => ({
                        title: item.title,
                        path: `/directory/${item.slug}`,
                    }));

                    // building info to be displayed
                    setBuildingALinks(buildingALinks);
                    setBuildingBLinks(buildingBLinks);

                })
                .catch(err => console.error("Fetch failed:", err));

            // tester console outputs
            console.log(buildingALinks.toString());
            console.log(buildingBLinks.toString());
        };

        fetchData();
    }, []);


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-center mb-8">Directory Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BuildingBox directoryList={buildingALinks} building={20} />
                <BuildingBox directoryList={buildingBLinks} building={22} />
            </div>
        </div>
    );
}

export default Directory;