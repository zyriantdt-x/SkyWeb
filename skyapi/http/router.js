import { Router } from "express";
import HttpHotel from "./hotel/index";
import HttpAuthentication from "./authentication/index";
import bcrypt from "bcrypt";

export default class HttpRouter {
    constructor() {
        let router = Router();

        router.use("/hotel", new HttpHotel);
        router.use("/authentication", new HttpAuthentication);
        router.get("/encrypt", (req, res, next) => { return res.send(bcrypt.hashSync("password", __config.password_salt)) })

        return router;
    }
}