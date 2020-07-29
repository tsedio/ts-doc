"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonEntityFn_1 = require("./jsonEntityFn");
/**
 * The value of `maximum` MUST be a number, representing an inclusive upper limit for a numeric instance.
 *
 * If the instance is a number, then this keyword validates only if the instance is less than or exactly equal to `maximum`.
 *
 * ## Example
 * ### With primitive type
 *
 * ```typescript
 * class Model {
 *    @Maximum(10)
 *    property: number;
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
 *       "type": "number",
 *       "maximum": 10
 *     }
 *   }
 * }
 * ```
 *
 * ### With array type
 *
 * ```typescript
 * class Model {
 *    @Maximum(10)
 *    @PropertyType(Number)
 *    property: number[];
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
 *       "items": {
 *          "type": "number",
 *          "maximum": 10
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * @param {number} maximum The maximum value allowed
 * @param {boolean} exclusive Same effect as ExclusiveMaximum decorator.
 * @decorator
 * @ajv
 * @jsonMapper
 * @swagger
 * @schema
 * @propertyDecorator
 * @paramDecorator
 * @model
 */
function Maximum(maximum, exclusive = false) {
    return jsonEntityFn_1.JsonEntityFn(store => {
        exclusive ? store.itemSchema.exclusiveMaximum(maximum) : store.itemSchema.maximum(maximum);
    });
}
exports.Maximum = Maximum;
function Max(maximum, exclusive = false) {
    return Maximum(maximum, exclusive);
}
exports.Max = Max;
//# sourceMappingURL=maximum.js.map