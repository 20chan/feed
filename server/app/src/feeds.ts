import * as mongo from "mongodb";
import { DB } from "./db";
import { IFeedChannel, IFeedChannelConfig } from "./entities";

const getFeedChannels = () => {
    return DB.client.db("feed").collection<IFeedChannel>("feeds");
};

export const getAllFeedChannels = () => {
    return getFeedChannels().find().toArray();
};

export const getFeedChannel = (id: mongo.ObjectID) => {
    return getFeedChannels().findOne({"_id": id});
};

export const findFeedChannelSubscribes = (channel: string) => {
    return getFeedChannels().find({ "config.channels": channel }).toArray();
};

export const insertFeedChannel = (item: IFeedChannel) => {
    return getFeedChannels().insertOne(item);
};

export const updateFeedChannel = (item: IFeedChannel) => {
    return getFeedChannels().updateOne({"_id": item._id}, { $set: item });
};

export const clearFeedChannelItems = (_id: mongo.ObjectID) => {
    return getFeedChannels().updateOne({_id}, { $set: { items: [] } });
};

export const deleteFeedChannel = (_id: mongo.ObjectID) => {
    return getFeedChannels().deleteOne({_id});
};