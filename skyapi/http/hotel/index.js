import { response, Router } from "express";
import axios from "axios";
import fs from "fs"

import HttpUsers from "./users";
import HttpStats from "./stats";
import HttpLocale from "./locale";

export default class HttpHotel {
    constructor() {
        let router = Router();

        router.use("/users", new HttpUsers);
        router.use("/stats", new HttpStats);
        router.use("/locale", new HttpLocale);

        router.get("/badge/:badgedata", this.get_badge_data)

        return router;
    }

    get_badge_data(req, res, next) {
        if(fs.existsSync(__base + "/dist/assets/custombadges/" + req.params.badgedata)) {
            return res.set("content-type", "image/gif").sendFile(__base + "/dist/assets/custombadges/" + req.params.badgedata);
        }
        axios.get("https://assets.habboon.pw/habbo-imaging/badge/" + req.params.badgedata, { responseType: 'arraybuffer' })
        .then(response => {
            res.set("content-type", "image/gif").send(response.data);
        })
    }
}