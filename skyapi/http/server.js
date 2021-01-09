import express from "express";
import bodyParser from "body-parser";
import useragent from "express-useragent";

import { IpFilter, IpDeniedError } from "express-ipfilter";

import HttpRouter from "./router";

export default class HttpServer {
    constructor() {
        let app = express();

        app.set('trust proxy', true);

        app.use(IpFilter(__config.allowed_ips, { mode: "allow" }));

        app.use(express.static(__base + '/dist'));

        app.use(useragent.express());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        app.use("/api", new HttpRouter);

        app.get("/*", (req, res, next) => {
            if (req.url === '/api') return next();
            
            return res.sendFile(__base + '/dist/index.html');
        });

        app.use((err, req, res, next) => {
            console.error('Error handler => ', err)
            if (err instanceof IpDeniedError) {
              res.sendStatus(401)
            } else {
              res.sendStatus(err.status || 500)
            }
        })

        return app;
    }
}