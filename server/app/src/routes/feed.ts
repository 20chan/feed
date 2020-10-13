import * as express from "express";
import { route as types } from "./feeds/types";
import { route as subscribes } from "./feeds/subscribes";

const route = express.Router();

route.get("/health", (req, resp) => {
    resp.send("healthcheck");
});

route.use("/types", types);
route.use("/subscribes", subscribes);

export { route };