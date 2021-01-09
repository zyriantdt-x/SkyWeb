import { Router } from "express";
import HttpMiddleware from "../middleware";
import HotelUser from "../../database/models/users/user";

export default class HttpStats {
    constructor() {
        let router = Router();

        router.get("/total_online", this.total_online)
        router.get("/online_users", HttpMiddleware.is_authenticated, this.online_users);

        return router;
    }

    total_online(req, res, next) {
        new HotelUser().where({ online: '1' }).count()
        .then(result => {
            return res.status(200).json({ online: result });
        })
    }

    online_users(req, res, next) {
        new HotelUser().where({ online: '1' }).fetchAll({
            columns: [
                'id',
                'username',
                'look',
                'online'
            ]
        }).then(result => {
            return res.status(200).json({ online: result.toJSON() });
        })
    }
}