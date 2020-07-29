"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@tsed/core");
const serializeJsonSchema_1 = require("../utils/serializeJsonSchema");
class JsonMap extends Map {
    constructor(obj = {}) {
        super();
        this.assign(obj);
    }
    assign(obj = {}) {
        Object.entries(obj).forEach(([key, value]) => {
            if (core_1.isFunction(this[key])) {
                this[key](value);
            }
            else {
                this.set(key, value);
            }
        });
        return this;
    }
    toJSON(options = {}) {
        return serializeJsonSchema_1.serializeMap(this, options);
    }
}
exports.JsonMap = JsonMap;
//# sourceMappingURL=JsonMap.js.map