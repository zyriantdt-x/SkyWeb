import { Router } from "express";

import HttpAuthenticate from "./authenticate";

export default class HttpAuthentication {
    constructor() {
        let router = Router();

        router.use("/authenticate", new HttpAuthenticate)

        return router;
    }
}