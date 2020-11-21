/**
 * The value of `exclusiveMinimum` MUST be number, representing an exclusive upper limit for a numeric instance.
 *
 * If the instance is a number, then the instance is valid only if it has a value strictly greater than (not equal to) `exclusiveMinimum`.
 *
 * ## Example
 * ### With primitive type
 *
 * ```typescript
 * class Model {
 *    @ExclusiveMinimum(10)
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
 *       "exclusiveMinimum": 10
 *     }
 *   }
 * }
 * ```
 *
 * ### With array type
 *
 * ```typescript
 * class Model {
 *    @ExclusiveMinimum(10)
 *    @CollectionOf(Number)
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
 *          "exclusiveMinimum": 10
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * @param minimum
 * @param {boolean} exclusiveMinimum
 * @decorator
 * @ajv
 * @jsonMapper
 * @swagger
 * @schema
 * @propertyDecorator
 * @paramDecorator
 * @model
 */
export declare function ExclusiveMinimum(minimum: number, exclusiveMinimum?: boolean): (...args: any[]) => any;
