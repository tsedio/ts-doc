"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const jsonEntityFn_1 = require("../common/jsonEntityFn");
/**
 * If this keyword has boolean value false, the instance validates successfully. If it has boolean value true, the instance validates successfully if all of its elements are unique.
 *
 * ## Example
 *
 * ```typescript
 * class Model {
 *    @UniqueItems()  // default true
 *    property: number[];
 * }
 * ```
 *
 *  * ```typescript
 * class Model {
 *    @PropertyType(String)
 *    @UniqueItems()
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
 *       "type": "array",
 *       "uniqueItems": true,
 *       "items": {
 *         "type": "string"
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * @param {boolean} uniqueItems
 * @decorator
 * @ajv
 * @jsonMapper
 * @swagger
 * @schema
 * @propertyDecorator
 * @paramDecorator
 * @model
 */
function UniqueItems(uniqueItems = true) {
  return jsonEntityFn_1.JsonEntityFn((store) => {
    store.schema.uniqueItems(uniqueItems);
  });
}
exports.UniqueItems = UniqueItems;
//# sourceMappingURL=uniqueItems.js.map
