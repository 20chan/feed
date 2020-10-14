import { FeedChannel, FeedItem, IFeedChannel, IFeedItem, ISubscribe } from "../entities";
import { findFeedChannel, findFeedItem, insertFeedChannel, insertFeedItem, updateFeedChannel, updateFeedItem } from "../feed";
import { fetchFeed } from "../river";

const getUpdatedChannel = async (subscribe: string, feed: IFeedChannel): Promise<FeedChannel> => {
    const channel = await findFeedChannel(subscribe);
    if (channel === null) {
        const update: FeedChannel = {
            subscribe,
            title: feed.title,
            description: feed.description,
            link: feed.link,
        };
        const insert = await insertFeedChannel(update);
        return {
            ...update,
            id: insert.insertedId.toHexString(),
        };
    } else {
        const update: FeedChannel = {
            ...channel,
            title: feed.title,
            description: feed.description,
            link: feed.link,
        };
        if (channel.title !== feed.title || channel.description !== feed.description || channel.link !== feed.link) {
            await updateFeedChannel(update);
        }
        return update;
    }
};

const updateChannelItem = async (channel: string, feed: IFeedItem): Promise<FeedItem> => {
    const item = await findFeedItem(feed.guid);
    if (item === null) {
        const update: FeedItem = {
            channel,
            read: false,
            updated: true,
            ...feed,
        };
        const insert = await insertFeedItem(update);
        return {
            ...update,
            id: insert.insertedId.toHexString(),
        };
    } else {
        const changed = feed.title !== item.title || feed.description !== item.description || feed.link !== item.link;
        const update: FeedItem = {
            ...item,
            title: feed.title,
            description: feed.description,
            link: feed.link,
            updated: changed,
        };
        if (changed) {
            await updateFeedItem(update);
        }
        return update;
    }
};

export const fetchChannel = async (subscribe: ISubscribe) => {
    const subsId = subscribe.id || "";
    const feed = await fetchFeed(subscribe.type, subscribe.url);
    if (feed === null) {
        throw new Error("fetch failed");
    }
    const channel = await getUpdatedChannel(subsId, feed);
    await Promise.all(feed.items.map(async (item) => {
        await updateChannelItem(channel.id!, item);
    }));
};