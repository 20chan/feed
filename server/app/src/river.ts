import fetch from "node-fetch";

const RIVER_ADDR = process.env.RIVER_ADDR || "localhost:8080";

const FEEDS_URL = `${RIVER_ADDR}/api/feeds`;

export const getFeedTypes = async (): Promise<string[]> => {
    const resp = await fetch(FEEDS_URL);
    return await resp.json();
};