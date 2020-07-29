"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toJsonMapCollection_1 = require("../utils/toJsonMapCollection");
const JsonMap_1 = require("./JsonMap");
class JsonRequestBody extends JsonMap_1.JsonMap {
    constructor(obj = {}) {
        super(obj);
        this.content(obj.content || {});
    }
    description(description) {
        this.set("description", description);
        return this;
    }
    content(content) {
        this.set("content", toJsonMapCollection_1.toJsonMapCollection(content));
        return this;
    }
    addContent(mediaType, schema) {
        const content = this.get("content");
        const mediaContent = new JsonMap_1.JsonMap();
        mediaContent.set("schema", schema);
        content.set(mediaType, mediaContent);
        return this;
    }
    required(required) {
        this.set("required", required);
        return this;
    }
}
exports.JsonRequestBody = JsonRequestBody;
//# sourceMappingURL=JsonRequestBody.js.map