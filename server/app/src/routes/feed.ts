import * as express from "express";
import { route as types } from "./feeds/types";
import { route as subscribes } from "./feeds/subscribes";
import { route as channels } from "./feeds/channels";
import { route as fetch } from "./feeds/fetch";

const route = express.Router();

route.get("/health", (req, resp) => {
    resp.send("healthcheck");
});

route.use("/types", types);
route.use("/subscribes", subscribes);
route.use("/channels", channels);
route.use("/fetch", fetch);

export { route };