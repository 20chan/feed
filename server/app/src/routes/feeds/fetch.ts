import * as express from "express";
import { fetchChannel } from "../../fetchChannel";
import { FetchJob } from "../../jobs/fetchJob";
import { getSubscribe } from "../../subscribes";

const route = express.Router();
const job = new FetchJob(5 * 60 * 1000);

route.get("/interval", (req, resp) => {
    resp.json({interval: job.interval});
});

route.post("/", async (req, resp) => {
    try {
        await job.check();
        resp.end();
    } catch (err) {
        console.error(`error on feeds.fetch.post /`, err);
        resp.status(500);
        resp.end();
    }
});

route.post("/:id", async (req, resp) => {
    const id = req.params.id;
    const subscribe = await getSubscribe(id);
    if (subscribe === null) {
        resp.status(404);
        resp.end();
        return;
    }
    try {
        await fetchChannel(subscribe);
        resp.end();
    } catch (err) {
        console.error(`error on feeds.fetch.post /${id}`, err);
        resp.status(500);
        resp.end();
    }
});

export { route };