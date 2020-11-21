"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const mapHeaders_1 = require("../utils/mapHeaders");
const serializeJsonSchema_1 = require("../utils/serializeJsonSchema");
const toJsonMapCollection_1 = require("../utils/toJsonMapCollection");
const JsonMap_1 = require("./JsonMap");
const SpecTypes_1 = require("./SpecTypes");
class JsonResponse extends JsonMap_1.JsonMap {
  constructor(obj = {}) {
    super(obj);
    this.content(obj.content || {});
  }
  description(description) {
    this.set("description", description);
    return this;
  }
  headers(headers) {
    this.set("headers", mapHeaders_1.mapHeaders(headers));
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
  toJSON(options = {}) {
    const response = super.toJSON(options);
    if (options.spec !== SpecTypes_1.SpecTypes.OPENAPI) {
      delete response.content;
      response.schema = serializeJsonSchema_1.serializeItem(this.$schema, options);
    }
    return response;
  }
}
exports.JsonResponse = JsonResponse;
//# sourceMappingURL=JsonResponse.js.map
