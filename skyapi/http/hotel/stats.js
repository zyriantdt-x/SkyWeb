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
        if(!req.headers['CF-Connecting-IP']) req.headers['CF-Connecting-IP'] = req.connection.remoteAddress;
        axios.get("https://findretros.com/legacy/validate?user=skyhotelofficial&ip=" + req.headers['CF-Connecting-IP'])
        .then(response => {
            if(response == "2") return res.status(200).json({ hasVoted: "true" });
            if(response == "3") return res.status(200).json({ hasVoted: "false" });
            return res.status(400);
        })
    }
}