import express from "express";
import bodyParser from "body-parser";
import useragent from "express-useragent";

import HttpRouter from "./router";

export default class HttpServer {
    constructor() {
        let app = express();

        app.set('trust proxy', true);

        app.use(express.static(__base + '/dist'));

        app.use(useragent.express());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        app.use("/api", new HttpRouter);

        app.get("/*", (req, res, next) => {
            if (req.url === '/api') return next();
            
            return res.sendFile(__base + '/dist/index.html');
        });

        return app;
    }
}