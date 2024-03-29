import { Router } from "express";
import HttpMiddleware from "../middleware";
import HotelUser from "../../database/models/users/user";
import axios from "axios";

export default class HttpStats {
    constructor() {
        let router = Router();

        router.get("/total_online", this.total_online)
        router.get("/online_users", HttpMiddleware.is_authenticated, this.online_users);
        router.get("/has_voted", this.has_voted);

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

    has_voted(req, res, next) {
        axios.get("https://findretros.com/legacy/validate?user=skyhotelofficial&ip=" + req.headers['cf-connecting-ip'])
        .then(response => {
            if(response.data == "2") return res.status(200).json({ hasVoted: "true" });
            if(response.data == "3") return res.status(200).json({ hasVoted: "false" });
            return res.sendStatus(400);
        })
    }
}