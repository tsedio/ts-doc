"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const jsonEntityFn_1 = require("../common/jsonEntityFn");
/**
 * An array instance is valid against `minItems` if its size is greater than, or equal to, the value of this keyword.
 *
 * ::: warning
 * The value `minItems` MUST be a non-negative integer.
 * :::
 *
 * ::: tip
 * Omitting this keyword has the same behavior as a value of 0.
 * :::
 *
 * ## Example
 *
 * ```typescript
 * class Model {
 *    @CollectionOf(String)
 *    @MinItems(10)
 *    property: string[];
 * }
 * ```
 *
 * Will produce:
 *
 * ```json
 * {
 *   "type": "object",
 *   "properties": {
 *     "property": {
 *       "type": "string",
 *       "minItems": 10
 *     }
 *   }
 * }
 * ```
 *
 * @param {number} minItems
 * @decorator
 * @ajv
 * @jsonMapper
 * @swagger
 * @schema
 * @propertyDecorator
 * @paramDecorator
 * @model
 */
function MinItems(minItems) {
  if (minItems < 0) {
    throw new Error("The value of minItems MUST be a non-negative integer.");
  }
  return jsonEntityFn_1.JsonEntityFn((storedJson) => {
    storedJson.schema.minItems(minItems);
  });
}
exports.MinItems = MinItems;
//# sourceMappingURL=minItems.js.map
