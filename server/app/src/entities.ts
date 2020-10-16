import { ObjectId } from "mongodb";

export interface IChannel {
    title: string;
    description: string;
    link: string;
    items: IChannelItem[];
}

export interface IChannelItem {
    title: string;
    description: string;
    link: string;
    guid: string;
}

export interface Channel {
    _id?: ObjectId;
    subscribe: string;
    name: string;
    title: string;
    description: string;
    link: string;
}

export interface ChannelItem extends IChannelItem {
    _id?: ObjectId;
    channel: string;
    read: boolean;
    updated: boolean;
}

export interface IFeedChannelConfig {
    name: string;
    index: number;
}

export interface IFeedChannel {
    _id?: ObjectId;
    config: IFeedChannelConfig;
    items: string[];
}

export interface ISubscribe {
    _id?: ObjectId;
    type: string;
    url: string;
}
