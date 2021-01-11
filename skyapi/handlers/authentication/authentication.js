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
            if(user_name == null || user_pass == null) return reject({ message: "invalid_parameters_login" });

            return new HotelUser({username: user_name}).fetch({
                columns: ['id', 'username', 'password']
            })
            .then(result => {
                let userInfo = result.toJSON();

                if(bcrypt.compareSync(user_pass, userInfo.password) == false) return reject({ message: "incorrect_password" });

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
                return reject({ message: "user_does_not_exist" });
            })
        })
    }

    static validate_username(user_name) {
        return new Promise((resolve, reject) =>
        {
            let regex = new RegExp(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{1,20}$/g);
            
            if(user_name == null || regex.test(user_name) == false) return reject({ message: 'invalid_paramemters'});

            //__config.hotel.prohibited_usernames.forEach((username) =>
            //{
            //    if(user_name.indexOf(username) != -1) return reject(new Error('username_unavailable'));
            //});

            return new HotelUser({username: user_name}).fetch()

            .then((result) =>
            {
                if(result == null) return resolve(null);

                return reject({ message: 'username_unavailable' });
            })

            .catch((err) =>
            {
                return resolve(null);
            });
        });
    }

    static validate_email(email_address)
    {
        return new Promise((resolve, reject) =>
        {
            let regex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g);
            
            if(email_address == null || regex.test(email_address) == false) return reject({ message: 'invalid_paramemters' });

            return new HotelUser({mail: email_address}).fetch()

            .then((result) =>
            {
                if(result == null) return resolve(null);

                return reject({ message: 'email_unavailable' });
            })

            .catch((err) =>
            {
                return resolve(err);
            });
        });
    }

    static register(username, password, email, user_ip) {
        return new Promise((resolve, reject) => {
            if(username == null || password == null || email == null) return reject({ message: "invalid_parameters_reg" });

            return this.validate_username(username)
            .then(() => { 
                return this.validate_email(email)
            })
            .then(() => {
                return new HotelUser({
                    id: null,
                    username: username,
                    real_name: '',
                    password: bcrypt.hashSync(password, __config.password_salt),
                    mail: email,
                    mail_verified: '0',
                    account_created: Math.floor(Date.now() / 1000),
                    account_day_of_birth: '0',
                    last_login: Math.floor(Date.now() / 1000),
                    last_online: Math.floor(Date.now() / 1000),
                    motto: __config.hotel.new_user.motto,
                    look: __config.hotel.new_user.figure,
                    gender: __config.hotel.new_user.gender,
                    rank: __config.hotel.new_user.rank,
                    credits: __config.hotel.new_user.credits,
                    pixels: __config.hotel.new_user.duckets,
                    points: __config.hotel.new_user.diamonds,
                    online: '0',
                    auth_ticket: '',
                    ip_register: user_ip,
                    ip_current: user_ip,
                    machine_id: '',
                    home_room: __config.hotel.new_user.home_room
                }).save(null, {method: 'insert'});
            })
            .then((result) => {
                return resolve(null)
            })
            .catch(err => {
                return reject(err);
            })
        })
    }
}