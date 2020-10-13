import * as mongo from "mongodb";
import { DB, mapMongoItem } from "./db";

export interface ISubscribe {
    id?: string;
    type: string;
    url: string;
    guid: string;
}

const getSubscribes = () => {
    return DB.client.db("feed").collection("subscribes");
};

export const getAllSubscribes = () => {
    return getSubscribes().find().toArray();
};

export const getSubscribe = (id: string) => {
    return getSubscribes().findOne({"_id": new mongo.ObjectID(id)});
};

export const insertSubscribe = (item: ISubscribe) => {
    return getSubscribes().insertOne(item);
};

export const updateSubscribe = (item: ISubscribe) => {
    return getSubscribes().updateOne({"_id": new mongo.ObjectID(item.id)}, { $set: item });
};

export const deleteSubscribe = (id: string) => {
    return getSubscribes().deleteOne({"_id": new mongo.ObjectID(id)});
};

export const mapMongo = (item: any) => mapMongoItem<ISubscribe>(item);