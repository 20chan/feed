import { Channel, ChannelItem, IChannel, IChannelItem, ISubscribe } from "./entities";
import { findChannel, findChannelItem, insertChannel, insertChannelItem, updateChannel, updateChannelItem } from "./channels";
import { fetchChannel } from "./river";
import { clearFeedChannelItems, findFeedChannelSubscribes, getAllFeedChannels, updateFeedChannel } from "./feeds";
import { getAllSubscribes } from "./subscribes";
import { response } from "express";

type ChannelItemUpdateResult = {
    new: boolean;
    updated: boolean;
    item: ChannelItem;
};

const getUpdatedChannel = async (subscribe: ISubscribe, feed: IChannel): Promise<Channel> => {
    const id = subscribe._id?.toString() || "";
    const channel = await findChannel(id);
    if (channel === null) {
        const update: Channel = {
            subscribe: id,
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
            title: feed.title,
            description: feed.description,
            link: feed.link,
        };
        if (channel.title !== feed.title || channel.description !== feed.description || channel.link !== feed.link) {
            await updateChannel(update);
        }
        return update;
    }
};

const getUpdatedChannelItem = async (channel: string, feed: IChannelItem): Promise<ChannelItemUpdateResult> => {
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
            new: true,
            updated: true,
            item: {
            ...update,
            _id: insert.insertedId,
        }};
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
        return {
            new: false,
            updated: changed,
            item: update,
        };
    }
};

export const fetchSubscribes = async () => {
    const subscribes = await getAllSubscribes();

    await prepareFeedChannels();
    await Promise.all(subscribes.map(fetchSubscribe));
};

const fetchSubscribe = async (subscribe: ISubscribe) => {
    const channel = await fetchChannel(subscribe.type, subscribe.url);
    if (channel === null || channel.items === undefined) {
        throw new Error("fetch failed");
    }
    const channelUpdated = await getUpdatedChannel(subscribe, channel);
    const feeds = await findFeedChannelSubscribes(channelUpdated._id!.toString());
    const feedUpdates = await Promise.all(channel.items.map(async (item) => {
        const result = await getUpdatedChannelItem(channelUpdated._id!.toString(), item);
        return {
            id: result.item._id!.toString(),
            feeds: feeds.filter(f => {
                const needAppend = result.new || !result.item.read || result.updated && f.config.updates;
                return needAppend;
            })
        };
    }));

    for (const u of feedUpdates) {
        u.feeds.forEach(f => f.items.push(u.id));
    }

    await Promise.all(feeds.map(updateFeedChannel));
};

const prepareFeedChannels = async () => {
    const feedChannels = await getAllFeedChannels();
    feedChannels.map(async c => {
        if (!c.config.stack) {
            await clearFeedChannelItems(c._id!);
        }
    });
};