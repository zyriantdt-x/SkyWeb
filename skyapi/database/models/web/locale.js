import Adapter from "../../adapter"

class WebLocale extends Adapter.Model {
    get tableName() { return 'web_locales'; }
    get hasTimestamps() { return false; }
}

export default Adapter.model("WebLocale", WebLocale);