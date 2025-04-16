// MOVE THIS INTO SEPARATE FOLDER ON FRONTEND, LIKE DATABASE FETCHING OR
// SOMETHING.

// fetches specific departments from the node table
export async function fetchDirectoryData(mapID: string) {
    try {
        console.log('fetching');

        // gets directory data through http query from Directory.ts
        const res = await fetch(`/api/directory/${mapID}`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        // returns data as promise !!
        return res;

    } catch (error) {
        console.error('Error fetching directory table', error);
        return null;
    }
}

// fetches all nodes in the node table
export async function fetchAllNodeData() {
  try {
    console.log('fetching');

    // gets all node data through http query from Directory.ts
    const res = await fetch(`/api/directory/allNodes`);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    // returns data as promise !!
    return res;

  } catch (error) {
    console.error('Error fetching directory table', error);
    return null;
  }
}

export default fetchDirectoryData;
