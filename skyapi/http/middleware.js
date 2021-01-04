import SessionHandler from "../handlers/authentication/session";

export default class HttpMiddleware {
    static is_authenticated(req, res, next) {
        if(!req.headers.authentication) return res.status(200).json({ error: "no_auth_header" });

        SessionHandler.validate_session(req.headers.authentication, req.connection.remoteAddress, req.useragent)
        .then(session => {
            if(session == null) return res.status(200).json({ error: "no_session_exists" });

            req.sky_session = session.toJSON();

            return next()
        })
        .catch(err => {
            return res.status(200).json({ error: "no_session_exists" });
        })
    }
}