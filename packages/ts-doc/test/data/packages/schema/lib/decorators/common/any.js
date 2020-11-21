"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const jsonEntityFn_1 = require("./jsonEntityFn");
/**
 * Set the type of the array items.
 *
 * ## Example
 *
 * ```typescript
 * class Model {
 *    @Any()
 *    property: any;
 *
 *    @Any(String, Number, Boolean)
 *    property: string | number | boolean;
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
 *       "type": ["integer", "number", "string", "boolean", "array", "object", "null"]
 *     }
 *   }
 * }
 * ```
 *
 * @returns {Function}
 * @decorator
 * @ajv
 * @jsonMapper
 * @swagger
 * @schema
 * @propertyDecorator
 * @paramDecorator
 * @model
 */
function Any(...types) {
  return jsonEntityFn_1.JsonEntityFn((store) => {
    store.itemSchema.any(...types);
  });
}
exports.Any = Any;
//# sourceMappingURL=any.js.map
