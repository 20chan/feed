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
    console.log(subscribe);
    try {
        await fetchChannel(subscribe);
        resp.end();
    } catch (err) {
        console.error(`error on feeds.fetch.get /${id}`, err);
        resp.status(500);
        resp.end();
    }
});

export { route };