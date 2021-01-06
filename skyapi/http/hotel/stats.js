import { Router } from "express";
import HotelUser from "../../database/models/users/user";

export default class HttpStats {
    constructor() {
        let router = Router();

        router.get("/total_online", this.total_online)

        return router;
    }

    total_online(req, res, next) {
        new HotelUser().where({ online: '1' }).count()
        .then(result => {
            return res.status(200).json({ online: result });
        })
    }
}