import HotelUser from "../database/models/users/user";
import jwt from "jsonwebtoken";

export default class HttpMiddleware {
    static is_authenticated(req, res, next) {
        const authHeader = req.headers['authorization'];
        if(!authHeader) return res.sendStatus(401);
        let token = authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)

        jwt.verify(token, __config.jwtsecret, (err, user) => {
            if (err) return res.sendStatus(401)
            let userId = user.id;

            new HotelUser({ id: userId }).fetch()
            .then(result => {
                req.sky_session = result.toJSON();
                return next();
            })
            .catch(err => {
                console.log(err);
                return res.sendStatus(401);
            })
        })
    }
}