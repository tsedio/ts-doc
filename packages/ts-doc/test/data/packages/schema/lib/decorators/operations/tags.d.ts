import { JsonTag } from "../../interfaces/JsonOpenSpec";
/**
 * Add tags metadata on the decorated element.
 *
 * ## Examples
 * ### On method
 *
 * ```typescript
 * @Controller("/")
 * class MyController {
 *  @Tags("api")
 *  get() {}
 * }
 * ```
 *
 * @param tags
 * @decorator
 * @swagger
 * @schema
 * @methodDecorator
 * @classDecorator
 * @operation
 */
export declare function Tags(...tags: (string | JsonTag)[]): (...args: any[]) => any;
