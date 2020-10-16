import * as express from "express";
import { ObjectId } from "../../db";
import { ChannelItem } from "../../entities";
import * as db from "../../channels";

const route = express.Router();

route.get("/", async (req, resp) => {
    try {
        const items = await db.getAllChannels();
        resp.json(items);
    } catch (err) {
        resp.status(500);
        resp.end();
        console.error("error on feeds.channels.get /", err);
    }
});

route.get("/:id", async (req, resp) => {
    const id = req.params.id;
    try {
        const item = await db.getChannel(new ObjectId(id));
        if (item === null) {
            resp.status(404);
            resp.end();
        } else {
            resp.json(item);
        }
    } catch {
        resp.status(400);
        resp.end();
    }
});

route.get("/:id/items", async (req, resp) => {
    const id = req.params.id;
    try {
        const item = await db.getAllChannelItems(id);
        resp.json(item);
    } catch (err) {
        resp.status(500);
        resp.end();
        console.error(`error on feeds.channels.get /${id}/items/`, err);
    }
});

route.get("/:id/items/:itemId", async (req, resp) => {
    const itemId = req.params.itemId;
    try {
        const item = await db.getChannelItem(new ObjectId(itemId));
        if (item === null) {
            resp.status(404);
            resp.end();
        } else {
            resp.json(item);
        }
    } catch {
        resp.status(400);
        resp.end();
    }
});

route.delete("/all/items/all", async (req, resp) => {
    const id = req.params.id;
    try {
        const items = await db.getAllChannels();
        await Promise.all(items.map(c => db.deleteAllChannelItemsInChannel(c._id!.toString())));
        resp.status(200);
        resp.end();
    } catch {
        resp.status(400);
        resp.end();
    }
});

route.delete("/:id/items/all", async (req, resp) => {
    const id = req.params.id;
    try {
        await db.deleteAllChannelItemsInChannel(id);
        resp.status(200);
        resp.end();
    } catch {
        resp.status(400);
        resp.end();
    }
});

route.delete("/:id/items/:itemId", async (req, resp) => {
    const itemId = req.params.itemId;
    try {
        await db.deleteChannelItem(new ObjectId(itemId));
        resp.status(200);
        resp.end();
    } catch {
        resp.status(400);
        resp.end();
    }
});

route.post("/:id/items/:itemId/read", async (req, resp) => {
    const itemId = req.params.itemId;
    try {
        const item = await db.getChannelItem(new ObjectId(itemId));
        if (item === null) {
            resp.status(404);
            resp.end();
        } else {
            const update: ChannelItem = {
                ...item,
                read: true,
                updated: false,
            };
            await db.updateChannelItem(update);
            resp.json(update);
        }
    } catch {
        resp.status(400);
        resp.end();
    }
});

export { route };