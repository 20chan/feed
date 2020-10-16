import * as mongo from "mongodb";
import { DB } from "./db";
import { IFeedChannel, IFeedChannelConfig } from "./entities";

const getFeedChannels = () => {
    return DB.client.db("feed").collection<IFeedChannel>("feeds");
};

export const getAllFeedChannels = () => {
    return getFeedChannels().find().toArray();
};

export const findFeedChannels = (id: string) => {
    return getFeedChannels().findOne({"_id": new mongo.ObjectID(id)});
};

export const insertFeedChannels = (item: IFeedChannel) => {
    return getFeedChannels().insertOne(item);
};

export const updateFeedChannels = (item: IFeedChannel) => {
    return getFeedChannels().updateOne({"_id": item._id}, { $set: item });
};

export const deleteFeedChannels = (_id: mongo.ObjectID) => {
    return getFeedChannels().deleteOne({_id});
};