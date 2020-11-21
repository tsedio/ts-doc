/**
 * Add summary metadata on the decorated element.
 *
 * ## Examples
 * ### On method
 *
 * ```typescript
 * class Model {
 *    @Summary("summary")
 *    id: string;
 * }
 * ```
 *
 * @param summary
 * @decorator
 * @swagger
 * @schema
 * @methodDecorator
 * @operation
 */
export declare function Summary(summary: string): (...args: any[]) => any;
