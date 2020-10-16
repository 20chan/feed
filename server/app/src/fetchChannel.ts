import { Channel, ChannelItem, IChannel, IChannelItem, ISubscribe } from "./entities";
import { findChannel, findChannelItem, insertChannel, insertChannelItem, updateChannel, updateChannelItem } from "./channels";
import { fetchFeed } from "./river";

const getUpdatedChannel = async (subscribe: ISubscribe, feed: IChannel): Promise<Channel> => {
    const id = subscribe._id?.toString() || "";
    const channel = await findChannel(id);
    if (channel === null) {
        const update: Channel = {
            subscribe: id,
            name: subscribe.name,
            title: feed.title,
            description: feed.description,
            link: feed.link,
        };
        const insert = await insertChannel(update);
        return {
            ...update,
            _id: insert.insertedId,
        };
    } else {
        const update: Channel = {
            ...channel,
            name: subscribe.name,
            title: feed.title,
            description: feed.description,
            link: feed.link,
        };
        if (channel.title !== feed.title || channel.description !== feed.description || channel.link !== feed.link || channel.name !== subscribe.name) {
            await updateChannel(update);
        }
        return update;
    }
};

const updateChannelItem = async (channel: string, feed: IChannelItem): Promise<ChannelItem> => {
    const item = await findChannelItem(feed.guid);
    if (item === null) {
        const update: ChannelItem = {
            channel,
            read: false,
            updated: true,
            ...feed,
        };
        const insert = await insertChannelItem(update);
        return {
            ...update,
            _id: insert.insertedId,
        };
    } else {
        const changed = feed.title !== item.title || feed.description !== item.description || feed.link !== item.link;
        const update: ChannelItem = {
            ...item,
            title: feed.title,
            description: feed.description,
            link: feed.link,
            updated: changed,
        };
        if (changed) {
            await updateChannelItem(update);
        }
        return update;
    }
};

export const fetchChannel = async (subscribe: ISubscribe) => {
    const feed = await fetchFeed(subscribe.type, subscribe.url);
    if (feed === null || feed.items === undefined) {
        throw new Error("fetch failed");
    }
    const channel = await getUpdatedChannel(subscribe, feed);
    await Promise.all(feed.items.map(async (item) => {
        await updateChannelItem(channel._id?.toString()!, item);
    }));
};