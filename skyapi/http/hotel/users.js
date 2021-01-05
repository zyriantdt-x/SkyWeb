import { Router } from "express";

import HotelRank from "../../database/models/users/rank";
import HotelUser from "../../database/models/users/user"
import HttpMiddleware from "../middleware";

export default class HttpUsers {
    constructor() {
        let router = Router();

        router.get("/current_user", HttpMiddleware.is_authenticated, this.current_user);
        router.get("/staff_page_info", this.staff_page_info);

        return router;
    }

    current_user(req, res, next) {
        new HotelUser({ id: req.sky_session.id }).fetch({
            columns: [
                "id",
                "username",
                "rank",
                "rank_vip",
                "credits",
                "vip_points",
                "activity_points",
                "look",
                "gender",
                "motto",
            ]
        })
        .then(result => {
            return res.status(200).json(result.toJSON());
        })
        .catch(result => {
            return res.status(400).json({ error: "no_row" });
        })
    }

    staff_page_info(req, res, next) { 
        new HotelUser()
        .query((qb) => {
            qb.where("rank", ">", "1").andWhereNot("hidden", "1")
        })
        .fetchAll({
            columns: [
                "id",
                "username",
                "rank",
                "rank_vip",
                "credits",
                "vip_points",
                "activity_points",
                "look",
                "gender",
                "motto",
                "online"
            ],
            withRelated: [ 'rank' ]
        })
        .then(result => {
            if(result == null) return res.status(200).json({ error: "no_row" });

            let response = {
                staff: result.toJSON()
            }

            return res.status(200).json(response);
        })
        .catch(result => {
            console.log(result)
            return res.status(200).json({ error: "no_row" });
        })
    }
}