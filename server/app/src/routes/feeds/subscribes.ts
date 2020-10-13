import * as express from "express";
import * as db from "../../subscribes";

const route = express.Router();

route.get("/", async (req, resp) => {
    try {
        const items = await db.getAllSubscribes();
        resp.json(items.map(item => db.mapMongo(item)));
    } catch (err) {
        resp.status(500);
        resp.end();
        console.error("error on subscribes.get /", err);
    }
});

route.get("/:id", async (req, resp) => {
    const id = req.params.id;
    try {
        const item = db.getSubscribe(id);
        resp.json(db.mapMongo(item));
    } catch {
        resp.status(404);
        resp.end();
    }
});

route.post("/", async (req, resp) => {
    try {
        const item: db.ISubscribe = {
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
            id,
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
        await db.deleteSubscribe(id);
        resp.status(200);
        resp.end();
    } catch {
        resp.status(404);
        resp.end();
    }
});

export { route };