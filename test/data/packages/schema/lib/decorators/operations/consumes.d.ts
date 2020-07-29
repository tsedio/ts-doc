/**
 * Add consumes metadata on the decorated element.
 *
 * ## Examples
 *
 * ```typescript
 * class Model {
 *    @Consumes("application/x-www-form-urlencoded")
 *    id: string;
 * }
 * ```
 *
 * @param consumes
 * @decorator
 * @swagger
 * @schema
 * @methodDecorator
 * @classDecorator
 * @operation
 */
export declare function Consumes(...consumes: string[]): (...args: any[]) => any;
