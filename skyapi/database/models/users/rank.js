import Adapter from "../../adapter"

class HotelRank extends Adapter.Model {
    get tableName() { return 'ranks'; }
    get hasTimestamps() { return false; }
}

export default Adapter.model("HotelRank", HotelRank);