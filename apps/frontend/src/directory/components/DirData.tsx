import React, { useEffect, useState, createContext, useContext } from 'react';


// starting state is empty array
export let Patriot20: { title: string; slug: string, coords: number[] }[] = [];
export let Patriot22: { title: string; slug: string, coords: number[] }[] = [];

export function CreateDirectoryArraysForFrontend() {

    const dirArr = useContext(DirectoryContext);
    useEffect(() => {

        const fetchData = async () => {
            console.log("fetching");
            // gets the department names and building through https query from directory.ts
            await fetch(`http://localhost:3001/directory/fulldirectory`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json(); // parse the JSON from response body
                })
                .then(data => {
                    // stores building data to be accessed

                    Patriot20.splice(0, Patriot20.length, ...data[0]);
                    Patriot22.splice(0, Patriot22.length, ...data[1]);


                })
                .catch(err => console.error("Fetch failed:", err));

            // tester console outputs
            console.log("AHHHHHHHHHHHHHH");
            console.log(Patriot20.toString());
            console.log(Patriot22.toString());
            console.log("AHHHHHHHHHHHHHH");
        };

        fetchData();
    }, []);
    return null;
}

export default CreateDirectoryArraysForFrontend;
