import * as express from "express";
import * as mongo from "mongodb";
import { DB } from "../db";

const routes = express.Router();

interface Alias {
    id?: string;
    url: string;
    alias: string;
}

const getAliases = () => {
    return DB.client.db('aka').collection('aliases');
};

const mapMongoItem = <T>(item: any): T => {
    return {
        id: item._id,
        ...item,
    };
};

routes.get("/alias", (req, resp) => {
    const collection = getAliases();
    collection.find().toArray((err, items) => {
        if (err) {
            resp.status(500);
            console.error("error on fitness.get /alias", err);
        } else {
            resp.json(items.map(item => mapMongoItem<Alias>(item)));
        }
    });
});

routes.get("/alias/:id", async (req, resp) => {
    const id = req.params.id;
    const collection = getAliases();
    try {
        const result = await collection.findOne({"_id": new mongo.ObjectID(id)});
        const item = mapMongoItem<Alias>(result);
        resp.json(item);
    } catch {
        resp.status(404);
    }
});

routes.post("/alias", async (req, resp) => {
    const collection = getAliases();
    try {
        const item: Alias = {
            ...req.body,
        };
        await collection.insertOne(item);
        resp.send({"error": false});
    } catch {
        resp.status(400);
        resp.send({"error": true});
    }
});

routes.put("/alias/:id", async (req, resp) => {
    const id = req.params.id;
    const collection = getAliases();
    try {
        const item: Alias = {
            ...req.body,
        };
        await collection.updateOne({"_id": new mongo.ObjectID(id)}, item);
        resp.send({"error": false});
    } catch {
        resp.status(404);
        resp.send({"error": true});
    }
});

routes.delete("/alias/:id", async (req, resp) => {
    const id = req.params.id;
    const collection = getAliases();
    try {
        await collection.deleteOne({"_id": new mongo.ObjectID(id)});
        resp.send({"error": false});
    } catch {
        resp.status(404);
        resp.send({"error": true});
    }
});

export { routes };