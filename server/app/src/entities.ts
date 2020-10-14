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
    id?: string;
    subscribe: string;
    title: string;
    description: string;
    link: string;
}

export interface FeedItem extends IFeedItem {
    id?: string;
    channel: string;
    read: boolean;
    updated: boolean;
}

export interface ISubscribe {
    id?: string;
    type: string;
    url: string;
}
