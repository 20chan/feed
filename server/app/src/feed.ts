import * as mongo from "mongodb";
import { DB, mapMongoItem } from "./db";
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

export const getFeedChannel = (id: string) => {
    return getFeedChannels().findOne({"_id": new mongo.ObjectID(id)});
};

export const findFeedChannel = (subscribe: string) => {
    return getFeedChannels().findOne({"subscribe": subscribe});
};

export const insertFeedChannel = (item: FeedChannel) => {
    return getFeedChannels().insertOne(item);
};

export const updateFeedChannel = (item: FeedChannel) => {
    return getFeedChannels().updateOne({"_id": new mongo.ObjectID(item.id)}, { $set: item });
};

export const deleteFeedChannel = (id: string) => {
    return getFeedChannels().deleteOne({"_id": new mongo.ObjectID(id)});
};

export const getAllFeedItems = (channel: string) => {
    return getFeedItems().find({"channel": channel}).toArray();
};

export const getFeedItem = (id: string) => {
    return getFeedItems().findOne({"_id": new mongo.ObjectID(id)});
};

export const findFeedItem = (guid: string) => {
    return getFeedItems().findOne({"guid": guid});
};

export const insertFeedItem = (item: FeedItem) => {
    return getFeedItems().insertOne(item);
};

export const updateFeedItem = (item: FeedItem) => {
    return getFeedItems().updateOne({"_id": new mongo.ObjectID(item.id)}, { $set: item });
};

export const deleteFeedItem = (id: string) => {
    return getFeedItems().deleteOne({"_id": new mongo.ObjectID(id)});
};

export const mapMongoChannel = (item: any) => mapMongoItem<FeedChannel>(item);

export const mapMongoFeedItem = (item: any) => mapMongoItem<FeedItem>(item);