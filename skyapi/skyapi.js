import HttpServer from "./http/server";

export default class SkyAPI {
    constructor(base, config) {
        global.__base   = base;
        global.__config = config;

        this.start_server(new HttpServer, config.port);
    }

    start_server(app, port) {
        app.listen(port, () => {
            console.log(`[SkyWeb] - Web server running on port ${port}`);
        });
    }
}