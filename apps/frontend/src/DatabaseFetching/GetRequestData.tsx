export async function fetchRequestData(requestName: string) {
    try {
        console.log('fetching');

        // gets directory data through http query from directory.ts
        const res = await fetch('/api/${requestName}');

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        // returns data as a Promise !!
        return res;
    } catch (error) {
        console.error('Error fetching request table', error);
        return null;
    }
}

export default fetchRequestData;
