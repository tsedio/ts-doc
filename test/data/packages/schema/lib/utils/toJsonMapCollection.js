"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsonMap_1 = require("../domain/JsonMap");
function toJsonMapCollection(content) {
    return Object.entries(content).reduce((content, [key, value]) => {
        content.set(key, new JsonMap_1.JsonMap(value));
        return content;
    }, new JsonMap_1.JsonMap());
}
exports.toJsonMapCollection = toJsonMapCollection;
//# sourceMappingURL=toJsonMapCollection.js.map