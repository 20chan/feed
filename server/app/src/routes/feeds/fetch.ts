import * as express from "express";
import { FetchJob } from "../../jobs/fetchJob";

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

export { route };