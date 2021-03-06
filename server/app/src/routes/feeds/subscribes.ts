import * as express from "express";
import * as db from "../../subscribes";
import { ISubscribe } from "../../entities";
import { ObjectId } from "../../db";

const route = express.Router();

route.get("/", async (req, resp) => {
    try {
        const items = await db.getAllSubscribes();
        resp.json(items);
    } catch (err) {
        resp.status(500);
        resp.end();
        console.error("error on feeds.subscribes.get /", err);
    }
});

route.get("/:id", async (req, resp) => {
    const id = req.params.id;
    try {
        const item = db.getSubscribe(id);
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

route.post("/", async (req, resp) => {
    try {
        const item: ISubscribe = {
            ...req.body,
        };
        // todo: check item is valid
        await db.insertSubscribe(item);
        resp.status(200);
        resp.end();
    } catch {
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
        await db.updateSubscribe(item);
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
        await db.deleteSubscribe(new ObjectId(id));
        resp.status(200);
        resp.end();
    } catch {
        resp.status(404);
        resp.end();
    }
});

export { route };