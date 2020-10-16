import * as express from "express";
import { getChannelTypes } from "../../river";

const route = express.Router();

route.get("/", async (req, resp) => {
    try {
        const items = await getChannelTypes();
        resp.json(items);
    } catch (err) {
        resp.status(500);
        resp.end();
        console.error("error on feeds.types.get /", err);
    }
});

export { route };
