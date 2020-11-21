"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const JsonEntityStore_1 = require("../../domain/JsonEntityStore");
/**
 * Set the type of the item collection. The possible value is String, Boolean, Number, Date, Object, Class, etc...
 *
 * ```typescript
 * class Model {
 *    @CollectionOf(String).MinLength(0).MaxLength(0)
 *    property: string[];
 * }
 * ```
 * ::: warning
 * You mustn't use the `type Type = string | number` as parameters Type.
 *
 * This example doesn't work:
 *
 * ```typescript
 * type Type = "string" | "number"
 * class Model {
 *    @CollectionOf(Type)
 *    property: Type[];
 * }
 * ```
 * :::
 *
 * @param {Type<any>} type
 * @param collectionType
 * @decorator
 * @ajv
 * @jsonMapper
 * @swagger
 * @schema
 * @propertyDecorator
 * @paramDecorator
 * @model
 */
function CollectionOf(type, collectionType) {
  const schema = {};
  let contains = false;
  const decorator = (...args) => {
    const store = JsonEntityStore_1.JsonEntityStore.from(...args);
    // const itemSchema = store.itemSchema.toJSON();
    if (collectionType) {
      store.collectionType = collectionType;
      store.schema.type(collectionType);
    }
    store.type = type;
    // console.log(type);
    store.itemSchema.type(type);
    // console.log(store.itemSchema.getComputedType(), schema);
    // store.itemSchema.assign({...itemSchema, type});
    store.schema.assign(schema);
    if (store.isArray && contains) {
      store.schema.set("contains", store.schema.get("items"));
      store.schema.delete("items");
    }
  };
  decorator.MinItems = (minItems) => {
    schema.minItems = minItems;
    return decorator;
  };
  decorator.MaxItems = (maxItems) => {
    schema.maxItems = maxItems;
    return decorator;
  };
  decorator.MinProperties = (minProperties) => {
    schema.minProperties = minProperties;
    return decorator;
  };
  decorator.MaxProperties = (maxProperties) => {
    schema.maxProperties = maxProperties;
    return decorator;
  };
  decorator.Contains = () => {
    contains = true;
    return decorator;
  };
  decorator.UniqueItems = (uniqueItems = true) => {
    schema.uniqueItems = uniqueItems;
    return decorator;
  };
  return decorator;
}
exports.CollectionOf = CollectionOf;
/**
 * Alias of @@GenericOf@@ decorator.
 * @param type
 * @decorator
 */
function ArrayOf(type) {
  return CollectionOf(type, Array);
}
exports.ArrayOf = ArrayOf;
/**
 * Alias of @@GenericOf@@ decorator.
 * @param type
 * @decorator
 */
function MapOf(type) {
  return CollectionOf(type, Map);
}
exports.MapOf = MapOf;
//# sourceMappingURL=collectionOf.js.map
