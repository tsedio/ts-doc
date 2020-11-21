import { Type } from "@tsed/core";
import { JSONSchema6TypeName } from "json-schema";
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
export declare function Any(...types: (JSONSchema6TypeName | Type<any> | any)[]): (...args: any[]) => any;
