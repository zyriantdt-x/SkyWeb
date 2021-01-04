import HotelUser from "../../database/models/users/user";
import Session from "../../database/models/api/session";

export default class SessionHandler {
    static makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }
    static create_session(user_id, user_ip, user_agent) {
        return new Promise((resolve, reject) => {
            if(user_id == null) return reject(new Error('invalid_parameters'));

            this.destroy_session(user_id)
            .then(result => {
                return new Session({
                    id: null,
                    user_id: user_id,
                    user_session: "SKY-" + this.makeid(32),
                    user_ip: user_ip,
                    user_agent: JSON.stringify(user_agent)
                }).save(null, {method: 'insert'});
            })
            .then(result => {
                if(result == null) return reject(new Error('invalid_session'));
                return resolve(result.toJSON());
            })
            .catch((err) =>
            {
                return reject(err);
            });
        });
    }

    static validate_session(user_session, user_ip, user_agent) {
        return new Promise((resolve, reject) => {
            
            if(user_session == null || user_ip == null || user_agent == null) return reject(new Error('invalid_session'));

            new Session({ 
                user_session: user_session, 
                user_ip: user_ip, 
                user_agent: user_agent
            })
            .fetch({ withRelated: ['user'] })
            .then(result => {
                if(result == null) return res.status(403).json({ error: "no_session_exists" });
    
                return resolve(result);
            })
            .catch(err => {
                return reject(err);
            })
        });
    }

    static destroy_session(user_id) {
        return new Promise((resolve, reject) => {
            if(user_id == null) return reject(new Error('invalid_parameters'));

            return new Session().query((qb) => {
                qb.where('user_id', user_id);
            }).fetchAll()
            .then((result) =>
            {
                if(result == null) return resolve(false);
                result.forEach((session) =>
                {
                    session.destroy();
                });
                return resolve(true);
            })
            .catch((err) =>
            {
                return reject(err);
            });
        });
    }
}