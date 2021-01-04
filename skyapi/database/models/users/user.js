import Adapter from "../../adapter"

class HotelUser extends Adapter.Model {
    get tableName() { return 'users'; }
    get hasTimestamps() { return false; }

    rank() {
        return this.hasOne("HotelRank", "id", "rank");
    }
}

export default Adapter.model("HotelUser", HotelUser);