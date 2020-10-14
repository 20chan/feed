import * as mongo from "mongodb";
import { DB } from "./db";
import { IFeedChannel, IFeedItem, FeedChannel, FeedItem } from "./entities";

const getFeedChannels = () => {
    return DB.client.db("feed").collection<FeedChannel>("channels");
};

const getFeedItems = () => {
    return DB.client.db("feed").collection<FeedItem>("feeds");
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

export const insertFeedChannel = (item: FeedChannel) => {
    return getFeedChannels().insertOne(item);
};

export const updateFeedChannel = (item: FeedChannel) => {
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

export const insertFeedItem = (item: FeedItem) => {
    return getFeedItems().insertOne(item);
};

export const updateFeedItem = (item: FeedItem) => {
    return getFeedItems().updateOne({"_id": item._id}, { $set: item });
};

export const deleteFeedItem = (_id: mongo.ObjectId) => {
    return getFeedItems().deleteOne({_id});
};