import Adapter from "../../adapter"

class HotelUserCurrency extends Adapter.Model {
    get tableName() { return 'users_currency'; }
    get hasTimestamps() { return false; }
    get idAttribute() { return 'user_id'; }

	user() {
		return this.belongsTo('HotelUser', 'user_id');
	}
}

export default Adapter.model("HotelUserCurrency", HotelUserCurrency);