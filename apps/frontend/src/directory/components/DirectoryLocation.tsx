import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

// define a DirectoryLink type for useState
type DirectoryLink = {
    title: string;
    path: string;
};

export function DirectoryLocation() {
    // starting state is empty array
    const [title, setTitle] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {

            const response = await fetch('/api/directory-data');

            // takes response from get query and recieves patriot20+22 arrays
            const { Patriot20, Patriot22 } = await response.json();

            const { topic } = useParams<{ topic: string }>();

            const allTopics = [...Patriot20, ...Patriot22];
            const match = allTopics.find(item => item.slug === topic);
            const title = match?.title ?? 'Unknown Topic';

            setTitle(title);
        };

        fetchData();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl">Directory Page</h1>
            <p className="mt-4">You selected: <strong>{title}</strong></p>
        </div>
    );
}

export default DirectoryLocation;
