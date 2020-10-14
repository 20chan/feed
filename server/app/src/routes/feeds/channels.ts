import * as express from "express";
import { ObjectId } from "../../db";
import { FeedItem } from "../../entities";
import * as db from "../../feed";

const route = express.Router();

route.get("/", async (req, resp) => {
    try {
        const items = await db.getAllFeedChannels();
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
        const item = await db.getFeedChannel(new ObjectId(id));
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
        const item = await db.getAllFeedItems(id);
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
        const item = await db.getFeedItem(new ObjectId(itemId));
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

route.post("/:id/items/:itemId/read", async (req, resp) => {
    const itemId = req.params.itemId;
    try {
        const item = await db.getFeedItem(new ObjectId(itemId));
        if (item === null) {
            resp.status(404);
            resp.end();
        } else {
            const update: FeedItem = {
                ...item,
                read: true,
                updated: false,
            };
            await db.updateFeedItem(update);
            resp.json(update);
        }
    } catch {
        resp.status(400);
        resp.end();
    }
});

export { route };