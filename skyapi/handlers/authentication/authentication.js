import HotelUser from "../../database/models/users/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    static login(user_name, user_pass, user_ip) {
        return new Promise((resolve, reject) => {
            if(user_name == null || user_pass == null) return reject({ error: "invalid_parameters_login" });

            return new HotelUser({username: user_name}).fetch({
                columns: ['id', 'username', 'password']
            })
            .then(result => {
                let userInfo = result.toJSON();

                if(bcrypt.compareSync(user_pass, userInfo.password) == false) return reject({ error: "incorrect_password" });

                let key = jwt.sign({
                    id: userInfo.id
                }, __config.jwtsecret);

                return new HotelUser({ id: userInfo.id }).fetch({
                    columns: [
                        "id",
                        "username",
                        "rank",
                        "credits",
                        "pixels",
                        "look",
                        "gender",
                        "motto",
                        "ip_current"
                    ]
                })
                .then(usrx => {
                    usrx.set({ ip_current: user_ip });
                    usrx.save();
                    let userDataToUse = usrx.toJSON();

                    let toReturn = {
                        "token": key,
                        "user": userDataToUse
                    }
                    return resolve(toReturn);
                })
            })
            .catch(error => {
                return reject({ error: "user_does_not_exist" });
            })
        })
    }
}