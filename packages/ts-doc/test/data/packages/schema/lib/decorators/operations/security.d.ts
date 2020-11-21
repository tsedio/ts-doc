/**
 * Add security metadata on the decorated method.
 *
 * ## Examples
 * ### On method
 *
 * ```typescript
 * @Controller("/")
 * class ModelCtrl {
 *    @Security("write:calendars")
 *    async method() {}
 * }
 * ```
 *
 * @param name
 * @param scopes
 * @decorator
 * @swagger
 * @schema
 * @methodDecorator
 * @classDecorator
 * @operation
 */
export declare function Security(name: string, ...scopes: string[]): (...args: any[]) => any;
