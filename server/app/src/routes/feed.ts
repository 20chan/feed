import * as express from "express";
import { route as subscribes } from "./feeds/subscribes";

const route = express.Router();

route.get("/health", (req, resp) => {
    resp.send("healthcheck");
});

route.use("/subscribes", route);

export { route };