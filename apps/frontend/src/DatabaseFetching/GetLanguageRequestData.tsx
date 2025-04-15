export async function fetchLanguageRequestData() {
    try {
        console.log('fetching');

        // gets directory data through http query from directory.ts
        const res = await fetch('/api/languageSR');

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const languageRequestData = res.json().then((res) => {
            console.log(res);

            // returns data as javascript object !!
            return res;
        });
    } catch (error) {
        console.error('Error fetching language request table', error);
        return null;
    }
}

export default fetchLanguageRequestData;
