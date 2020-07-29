import { JSONSchema6Type } from "json-schema";
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
export declare function Const(constValue: JSONSchema6Type | any): (...args: any[]) => any;
