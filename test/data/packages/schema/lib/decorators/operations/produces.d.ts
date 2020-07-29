/**
 * Add produces metadata on the decorated element.
 *
 * ## Examples
 * ### On method
 *
 * ```typescript
 * class Model {
 *    @Produces("text/html")
 *    id: string;
 * }
 * ```
 *
 * ::: warning
 * For openspec v3 prefer `@Returns().ContentType()` usage (see @@Returns@@).
 * :::
 *
 * @param produces
 * @decorator
 * @swagger
 * @schema
 * @methodDecorator
 * @classDecorator
 * @operation
 */
export declare function Produces(...produces: string[]): (...args: any[]) => any;
