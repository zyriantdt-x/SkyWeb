import Adapter from "../../adapter"

class HotelUserCurrency extends Adapter.Model {
    get tableName() { return 'users_currency'; }
    get hasTimestamps() { return false; }

    user() {
        return this.hasOne("HotelUser", "id", "user_id")
    }
}

export default Adapter.model("HotelUserCurrency", HotelUserCurrency);