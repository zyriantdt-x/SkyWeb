import { response, Router } from "express";
import axios from "axios";

import HttpUsers from "./users";
import HttpStats from "./stats";

export default class HttpHotel {
    constructor() {
        let router = Router();

        router.use("/users", new HttpUsers);
        router.use("/stats", new HttpStats);

        router.get("/badge/:badgedata", this.get_badge_data)

        return router;
    }

    get_badge_data(req, res, next) {
        axios.get("https://assets.habboon.pw/habbo-imaging/badge/" + req.params.badgedata, { responseType: 'arraybuffer' })
        .then(response => {
            res.set("content-type", "image/gif").send(response.data);
        })
    }
}