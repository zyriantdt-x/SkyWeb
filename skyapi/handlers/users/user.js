import HotelUser from "../../database/models/users/user";
import bcrypt from "bcrypt";

export default class UserHandler {
    static get_user(id) {
        return new Promise((resolve, reject) => {
            if(id == null) return reject(new Error("invalid_arguments"));

            return new HotelUser({ id: id }).fetch()
            .then(result => {
                if(result == null) return reject(new Error("not_found"));

                result = result.toJSON();

                result.password = null;
                result.auth_ticket = null;

                return resolve(result);
            });
        })
    }

    static get_user_by_login(username, password) {
        return new Promise((resolve, reject) => {
            if(username == null || password == null) return reject(new Error("invalid_arguments"));

            let encryptedPassword = bcrypt(password);

            return new HotelUser({ username: username, password: encryptedPassword }).fetch()
            .then(result => {
                if(result == null) return reject(new Error("not_found"));

                result = result.toJSON();

                result.password = undefined;
                result.auth_ticket = undefined;

                return resolve(result);
            });
        })
    }
}