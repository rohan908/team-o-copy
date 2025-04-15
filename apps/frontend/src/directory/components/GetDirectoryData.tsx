import { DirectoryItem } from '../../contexts/DirectoryItem';

export async function fetchDirectoryData(building: string) {
    try {
        console.log('fetching');

        // gets directory data through http query from directory.ts
        const res = await fetch(`/api/directory/${building}`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const directoryData = res.json().then((res) => {
            console.log(res);

            // returns data as javascript object !!
            return res;
        });
    } catch (error) {
        console.error('Error fetching directory table', error);
        return null;
    }
}

export default fetchDirectoryData;
