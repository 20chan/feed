import * as express from "express";
import { getAlias } from "../alias";

const routes = express.Router();

routes.get("/:alias", async (req, resp) => {
    const alias = req.params.alias;
    const item = await getAlias(alias);
    if (item === null) {
        resp.status(404);
        resp.end();
        return;
    }
    resp.redirect(item.url);
    resp.end();
});

export { routes };