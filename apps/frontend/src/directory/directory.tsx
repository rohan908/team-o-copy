import React, { useEffect, useState } from 'react';
import BuildingBox from './components/BuildingBox.tsx';
import axios from 'axios';


/*
  !!! THIS FILE IS DEPRECATED WILL NOT BE USING GOING FORWARD
  !!! WILL REMOVE SOON
 */

// define a DirectoryLink type for useState
type DirectoryLink = {
    title: string;
    path: string;
};

export function Directory() {
    // starting state is empty array
    const [Patriot20, setPatriot20] = useState<[]>([]);
    const [Patriot22, setPatriot22] = useState<[]>([]);

    const [linkedPatriot20, setPatriot20Links] = useState<DirectoryLink[]>([]);
    const [linkedPatriot22, setPatriot22Links] = useState<DirectoryLink[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log("fetching");
            // gets the department names from a specified building
            const p20 = await fetch(`http://localhost:3001/directory/:Patriot-20`);
            if (!p20.ok) {
              throw new Error(`HTTP error! status: ${p20.status}`);
            }
            const directoryDataPatriot20 = p20.json().then(res => {
              setPatriot20(res);
            });

            // gets the department names from a specified building
            const p22 = await fetch(`http://localhost:3001/directory/:Patriot-22`);
            if (!p22.ok) {
              throw new Error(`HTTP error! status: ${p22.status}`);
            }
            const directoryDataPatriot22 = p22.json().then(res => {
              setPatriot20(res);
            });


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
                    setPatriot20Links(buildingALinks);
                    setPatriot22Links(buildingBLinks);

                //.catch(err => console.error("Fetch failed:", err));

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
                <BuildingBox directoryList={Patriot20} building={20} />
                <BuildingBox directoryList={Patriot22} building={22} />
            </div>
        </div>
    );
}

export default Directory;
