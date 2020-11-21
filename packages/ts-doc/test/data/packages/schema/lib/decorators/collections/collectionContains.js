"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const collectionOf_1 = require("./collectionOf");
/**
 * Set the type of the item collection. The possible value is String, Boolean, Number, Date, Object, Class, etc...
 *
 * The array instance will be valid against "contains" if at least one of its elements is valid against the given schema.
 *
 * ```typescript
 * class Model {
 *    @CollectionContains(String).MinLength(0).MaxLength(0)
 *    property: string[];
 * }
 * ```
 * ::: warning
 * You musn't use the `type Type = string | number` as parameters Type.
 *
 * This example doesn't work:
 *
 * ```typescript
 * type Type = "string" | "number"
 * class Model {
 *    @PropertyType(Type)
 *    property: Type[];
 * }
 * ```
 * :::
 *
 * @param {Type<any>} type
 * @decorator
 * @ajv
 * @jsonMapper
 * @swagger
 * @schema
 * @propertyDecorator
 * @paramDecorator
 * @model
 */
function CollectionContains(type) {
  return collectionOf_1.CollectionOf(type).Contains();
}
exports.CollectionContains = CollectionContains;
//# sourceMappingURL=collectionContains.js.map
