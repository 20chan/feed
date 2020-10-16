export interface IFeedChannelConfig {
    name: string;
    index: number;
    channels: string[];
    stack: boolean;
    updates: boolean;
}

export interface IFeedChannel {
    _id?: string;
    config: IFeedChannelConfig;
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
    name: string;
}
