import * as mongo from "mongodb";
import { DB } from "./db";
import { IChannel, IChannelItem, Channel, ChannelItem } from "./entities";

const getFeedChannels = () => {
    return DB.client.db("feed").collection<Channel>("channels");
};

const getFeedItems = () => {
    return DB.client.db("feed").collection<ChannelItem>("feeds");
};

export const getAllFeedChannels = () => {
    return getFeedChannels().find().toArray();
};

export const getFeedChannel = (_id: mongo.ObjectId) => {
    return getFeedChannels().findOne({_id});
};

export const findFeedChannel = (subscribe: string) => {
    return getFeedChannels().findOne({"subscribe": subscribe});
};

export const insertFeedChannel = (item: Channel) => {
    return getFeedChannels().insertOne(item);
};

export const updateFeedChannel = (item: Channel) => {
    return getFeedChannels().updateOne({"_id": item._id}, { $set: item });
};

export const deleteFeedChannel = (_id: mongo.ObjectId) => {
    return getFeedChannels().deleteOne({_id});
};

export const getAllFeedItems = (channel: string) => {
    return getFeedItems().find({"channel": channel}).toArray();
};

export const getFeedItem = (_id: mongo.ObjectId) => {
    return getFeedItems().findOne({_id});
};

export const findFeedItem = (guid: string) => {
    return getFeedItems().findOne({"guid": guid});
};

export const insertFeedItem = (item: ChannelItem) => {
    return getFeedItems().insertOne(item);
};

export const updateFeedItem = (item: ChannelItem) => {
    return getFeedItems().updateOne({"_id": item._id}, { $set: item });
};

export const deleteFeedItem = (_id: mongo.ObjectId) => {
    return getFeedItems().deleteOne({_id});
};

export const deleteAllFeedItemsInChannel = (channel: string) => {
    return getFeedItems().deleteMany({"channel": channel});
};