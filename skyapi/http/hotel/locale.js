import { Router } from "express"
import WebLocale from "../../database/models/web/locale"

export default class HttpLocale {
    constructor() {
        let router = Router();

        router.post("/get_locale", this.get_locale);

        return router;
    }

    get_locale(req, res, next) {
        if(req.body.key == null) return res.sendStatus(400)
        new WebLocale({ key: req.body.key }).fetch()
        .then(result => {
            return res.status(200).json({ string: result.toJSON().value });
        })
        .catch(err => {
            return res.sendStatus(400);
        })
    }
}