import HotelUser from "../../database/models/users/user";
import Session from "../../database/models/api/session";
import SessionHandler from "./session";
import bcrypt from "bcrypt";

export default class AuthenticationHandler {
    static makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

     static set_auth_token(user_id) {
         return new Promise((resolve, reject) => {
            return new HotelUser({ id: user_id }).fetch({
                columns: ['id', 'auth_ticket']
            })
            .then(result => {
                result.set({ auth_ticket: "SKYSSO-" + this.makeid(32) });
                result.save();
                resolve(result.toJSON().auth_ticket);
            })
         })
     }

    static login(user_name, user_pass, user_ip, user_agent) {
        return new Promise((resolve, reject) => {
            if(user_name == null || user_pass == null || user_ip == null || user_agent == null) return reject({ error: "invalid_parameters_login" });

            return new HotelUser({username: user_name}).fetch({
                columns: ['id', 'username', 'password', 'auth_ticket', 'ip_last']
            })
            .then(result => {
                if(result == null) return reject({ error: "invalid_user" });

                let user_info = result.toJSON();

                if(bcrypt.compareSync(user_pass, user_info.password) == false) return reject({ error: "incorrect_password" });

                return SessionHandler.create_session(user_info.id, user_ip, user_agent)
                .then(session => {
                    if(session == null) return reject("invalid_session");

                    result.set({auth_ticket: session.user_session, ip_last: user_ip})
                    
                    return result.save()
                    .then((result) =>
                    {
                        return resolve(session);
                    })
                })
                .catch(err => {
                    return reject({ error: err.detail });
                })
            })
            .catch(err => {
                reject({ error: "no_user_exists" })
            })
        });
    }
}