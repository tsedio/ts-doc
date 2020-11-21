"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const JsonEntityStore_1 = require("../domain/JsonEntityStore");
const SpecTypes_1 = require("../domain/SpecTypes");
const serializeJsonSchema_1 = require("./serializeJsonSchema");
const CACHE_KEY = "$cache:schemes";
function getKey(options) {
  return JSON.stringify(options);
}
function get(entity, options) {
  const cache = entity.store.get(CACHE_KEY) || new Map();
  const key = getKey(options);
  if (!cache.has(key)) {
    const schema = serializeJsonSchema_1.serializeJsonSchema(entity.schema, {...options, root: false});
    if (Object.keys(options.schemas).length) {
      schema.definitions = options.schemas;
    }
    cache.set(key, schema);
  }
  entity.store.set(CACHE_KEY, cache);
  return cache.get(key);
}
function getJsonSchema(model, options = {}) {
  options = {
    ...options,
    root: true,
    spec: options.spec || SpecTypes_1.SpecTypes.JSON,
    schemas: {}
  };
  const entity = model instanceof JsonEntityStore_1.JsonEntityStore ? model : JsonEntityStore_1.JsonEntityStore.from(model);
  return get(entity, options);
}
exports.getJsonSchema = getJsonSchema;
//# sourceMappingURL=getJsonSchema.js.map
