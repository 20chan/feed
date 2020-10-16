import * as mongo from "mongodb";
import { DB } from "./db";
import { IChannel, IChannelItem, Channel, ChannelItem } from "./entities";

const getChannels = () => {
    return DB.client.db("feed").collection<Channel>("channels");
};

const getChannelItems = () => {
    return DB.client.db("feed").collection<ChannelItem>("channelItems");
};

export const getAllChannels = () => {
    return getChannels().find().toArray();
};

export const getChannel = (_id: mongo.ObjectId) => {
    return getChannels().findOne({_id});
};

export const findChannel = (subscribe: string) => {
    return getChannels().findOne({"subscribe": subscribe});
};

export const insertChannel = (item: Channel) => {
    return getChannels().insertOne(item);
};

export const updateChannel = (item: Channel) => {
    return getChannels().updateOne({"_id": item._id}, { $set: item });
};

export const deleteChannel = (_id: mongo.ObjectId) => {
    return getChannels().deleteOne({_id});
};

export const getAllChannelItems = (channel: string) => {
    return getChannelItems().find({"channel": channel}).toArray();
};

export const getChannelItem = (_id: mongo.ObjectId) => {
    return getChannelItems().findOne({_id});
};

export const findChannelItem = (guid: string) => {
    return getChannelItems().findOne({"guid": guid});
};

export const insertChannelItem = (item: ChannelItem) => {
    return getChannelItems().insertOne(item);
};

export const updateChannelItem = (item: ChannelItem) => {
    return getChannelItems().updateOne({"_id": item._id}, { $set: item });
};

export const deleteChannelItem = (_id: mongo.ObjectId) => {
    return getChannelItems().deleteOne({_id});
};

export const deleteAllChannelItemsInChannel = (channel: string) => {
    return getChannelItems().deleteMany({"channel": channel});
};

export const mapChannelItems = (ids: string[]) => {
    return Promise.all(ids.map(i => getChannelItem(new mongo.ObjectID(i))));
};