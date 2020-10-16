import * as express from "express";
import { mapChannelItems } from "../../channels";
import { ObjectId } from "../../db";
import { IFeedChannel } from "../../entities";
import * as db from "../../feeds";

const route = express.Router();

route.get("/", async (req, resp) => {
    try {
        const items = await db.getAllFeedChannels();
        resp.json(items);
    } catch (err) {
        resp.status(500);
        resp.end();
        console.error("error on feeds.feeds.get /", err);
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
        const channel = await db.getFeedChannel(new ObjectId(id));
        if (channel === null) {
            resp.status(404);
            resp.end();
            return;
        }
        const items = mapChannelItems(channel.items);
        resp.json(items);
    } catch (err) {
        resp.status(500);
        resp.end();
        console.error(`error on feeds.feeds.get /${id}/items/`, err);
    }
});


route.post("/", async (req, resp) => {
    try {
        const item: IFeedChannel = {
            ...req.body,
        };
        await db.insertFeedChannel(item);
        resp.status(200);
        resp.end();
    } catch (err) {
        resp.status(400);
        resp.end();
    }
});

route.put("/:id", async (req, resp) => {
    const id = req.params.id;
    try {
        // todo: check item is valid
        const item = {
            ...req.body,
            _id: new ObjectId(id),
        };
        await db.updateFeedChannel(item);
        resp.status(200);
        resp.end();
    } catch {
        resp.status(404);
        resp.end();
    }
});

route.delete("/:id", async (req, resp) => {
    const id = req.params.id;
    try {
        await db.deleteFeedChannel(new ObjectId(id));
        resp.status(200);
        resp.end();
    } catch {
        resp.status(404);
        resp.end();
    }
});

export { route };