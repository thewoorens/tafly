export async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        console.info(`API - GET | URL: ${url} | STATUS: ${response.status} RESULT: ${response}`);
        return await response.json();
    } catch (error) {
        console.error(`API - GET | ERROR => ${error.message}`);
        return null;
    }
}
