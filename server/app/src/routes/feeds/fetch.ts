import * as express from "express";
import { fetchChannel } from "../../jobs/fetchFeeds";
import { getSubscribe } from "../../subscribes";

const route = express.Router();

route.get("/:id", async (req, resp) => {
    const id = req.params.id;
    const subscribe = await getSubscribe(id);
    if (subscribe === null) {
        resp.status(404);
        resp.end();
        return;
    }
    try {
        fetchChannel(subscribe);
        resp.end();
    } catch {
        resp.status(400);
        resp.end();
    }
});

export { route };