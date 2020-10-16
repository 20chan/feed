import fetch from "node-fetch";
import { IChannel } from "./entities";

const RIVER_ADDR = process.env.RIVER_ADDR || "localhost:8080";

const FEEDS_URL = `${RIVER_ADDR}/api/feeds`;

export const getChannelTypes = async (): Promise<string[] | null> => {
    try {
        const resp = await fetch(FEEDS_URL);
        return await resp.json();
    } catch {
        return null;
    }
};

export const fetchChannel = async (type: string, url: string): Promise<IChannel | null> => {
    try {
        const resp = await fetch(`${FEEDS_URL}/${type}?url=${url}`);
        return await resp.json();
    } catch {
        return null;
    }
};
