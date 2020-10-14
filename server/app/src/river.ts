import fetch from "node-fetch";
import { IFeedChannel } from "./entities";

const RIVER_ADDR = process.env.RIVER_ADDR || "localhost:8080";

const FEEDS_URL = `${RIVER_ADDR}/api/feeds`;

export const getFeedTypes = async (): Promise<string[] | null> => {
    try {
        const resp = await fetch(FEEDS_URL);
        return await resp.json();
    } catch {
        return null;
    }
};

export const fetchFeed = async (type: string, url: string): Promise<IFeedChannel | null> => {
    try {
        const resp = await fetch(`${FEEDS_URL}/${type}/${url}`);
        return await resp.json();
    } catch {
        return null;
    }
};
