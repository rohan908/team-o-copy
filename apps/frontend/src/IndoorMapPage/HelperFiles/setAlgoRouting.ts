import axios from 'axios';

export async function setAlgo(algo: number) {
    try {
        const response = await axios.post('api/graph/setAlgo', {
            pathAlgo: algo,
        });
        console.log('got response back', response);
        return response;
        /* this error handler is buggin
    if (!data.success) {
        throw new Error(data.error || 'Failed to find path');
    }

    // Return just the path array from the result
    return data.result.path;
    */
    } catch (error) {
        console.error('Error finding path:', error);
        throw error;
    }
}

export async function getAlgoId(): Promise<number> {
    try {
        const response = await axios.get<number>('api/graph/getAlgo');
        const algoId: number = response.data;
        return algoId;
    } catch (error) {
        console.error('Error finding path:', error);
        throw error;
    }
}
