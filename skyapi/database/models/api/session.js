import Adapter from "../../adapter"

class Session extends Adapter.Model {
    get tableName() { return 'sky_session'; }
    get hasTimestamps() { return false; }

    user() {
        return this.belongsTo("HotelUser", "user_id", "id")
    }
}

export default Adapter.model("Session", Session);