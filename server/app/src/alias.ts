import * as mongo from "mongodb";
import { DB } from "./db";

export interface Alias {
    id?: string;
    url: string;
    alias: string;
}

export const mapMongoItem = <T>(item: any): T => {
    return {
        id: item._id,
        ...item,
        _id: undefined,
    };
};


export const getAliases = () => {
    return DB.client.db('aka').collection('aliases');
};

export const getAlias = async (alias: string) => {
    try {
        const result = await getAliases().findOne({"alias": alias});
        const item = mapMongoItem<Alias>(result);
        return item;
    } catch {
        return null;
    }
};

export const isValidUrl = (url: string) => {
    try {
        const _ = new URL(url);
    } catch {
        return false;
    }
    return true;
};