import { ObjectId } from "mongodb";

export interface IFeedChannel {
    title: string;
    description: string;
    link: string;
    items: IFeedItem[];
}

export interface IFeedItem {
    title: string;
    description: string;
    link: string;
    guid: string;
}

export interface FeedChannel {
    _id?: ObjectId;
    subscribe: string;
    title: string;
    description: string;
    link: string;
}

export interface FeedItem extends IFeedItem {
    _id?: ObjectId;
    channel: string;
    read: boolean;
    updated: boolean;
}

export interface ISubscribe {
    _id?: ObjectId;
    type: string;
    url: string;
}
