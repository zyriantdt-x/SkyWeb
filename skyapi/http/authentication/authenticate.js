import { Router } from "express";

import AuthenticationHandler from "../../handlers/authentication/authentication";
import HttpMiddleware from "../middleware";

export default class HttpAuthenticate {
    constructor() {
        let router = Router();

        router.post("/login", this.login)
        router.get("/generate_auth_token", HttpMiddleware.is_authenticated, this.generate_auth_token);

        return router;
    }

    generate_auth_token(req, res, next) {
        AuthenticationHandler.set_auth_token(req.sky_session.id)
        .then(result => {
            return res.status(200).json(result);
        })
    }

    login(req, res, next) {
        if(req.body.sky_username == null || req.body.sky_password == null) return res.status(400).json({ error: "invalid_body" });

        AuthenticationHandler.login(req.body.sky_username, req.body.sky_password, req.connection.remoteAddress, req.useragent)
        .then(result => {
            return res.status(200).json({"token": result});
        })
        .catch(err => {
            return res.status(401).json(err);
        })
    }
}