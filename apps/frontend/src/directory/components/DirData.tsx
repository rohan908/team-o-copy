import React, { useEffect, useState, createContext, useContext } from 'react';

export function fetchDirectoryData(building: string) {
  const [data, setData] = useState<Record<string, string>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /*
    useEffect is used in order to get data from the database through an api
    asynchronously
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("fetching");

        // gets directory data through http query from directory.ts
        const res = await fetch(`http://localhost:3001/directory/${building}]`);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        // gets json data from fetched data
        const directoryData = res.json().then(res => {
          console.log(res);
          setData(res);
        });

      } catch (error) {
          console.error('Error fetching directory table', error);
          setError(error instanceof Error ? error.message : 'Failed to load table');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data, loading, error]);
    return null;
}

export default fetchDirectoryData;


