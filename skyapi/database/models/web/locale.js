import Adapter from "../../adapter"

class WebLocale extends Adapter.Model {
    get tableName() { return 'web_locale'; }
    get hasTimestamps() { return false; }
}

export default Adapter.model("WebLocale", WebLocale);