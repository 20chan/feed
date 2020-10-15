export interface IFeedChannel {
    _id?: string;
    subscribe: string;
    title: string;
    description: string;
    link: string;
}

export interface FeedChannel extends IFeedChannel {
    items: IFeedItem[];
}

export interface IFeedItem {
    _id?: string;
    channel: string;
    read: boolean;
    updated: boolean;
    title: string;
    description: string;
    link: string;
    guid: string;
}

export interface ISubscribe {
    _id?: string;
    type: string;
    url: string;
}
