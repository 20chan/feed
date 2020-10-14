import * as mongo from "mongodb";
import { DB } from "./db";
import { ISubscribe } from "./entities";

const getSubscribes = () => {
    return DB.client.db("feed").collection<ISubscribe>("subscribes");
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
    return getSubscribes().updateOne({"_id": item._id}, { $set: item });
};

export const deleteSubscribe = (_id: mongo.ObjectID) => {
    return getSubscribes().deleteOne({_id});
};