"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonEntityFn_1 = require("./jsonEntityFn");
/**
 * The const keyword is used to restrict a value to a fixed value.
 *
 *
 * ## Example
 * ### With a string
 *
 * ```typescript
 * class Model {
 *    @Const("value1")
 *    property: "value1";
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
 *       "const": "value1"
 *     }
 *   }
 * }
 * ```
 *  * ### With a boolean
 *
 * ```typescript
 * class Model {
 *    @Const(true)
 *    property: boolean;
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
 *       "type": "boolean",
 *       "const": true
 *     }
 *   }
 * }
 * ```
 *
 * @param {string | number | boolean } constValue
 * @decorator
 * @ajv
 * @jsonMapper
 * @swagger
 * @schema
 * @propertyDecorator
 * @model
 */
function Const(constValue) {
    return jsonEntityFn_1.JsonEntityFn(store => {
        store.itemSchema.const(constValue);
    });
}
exports.Const = Const;
//# sourceMappingURL=const.js.map