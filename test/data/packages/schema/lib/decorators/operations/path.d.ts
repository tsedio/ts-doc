/**
 * Set class path to expose all endpoints
 *
 * ::: warning
 * Don't use this decorator to change the path if you develop your application with Ts.ED.
 * :::
 *
 * @param path
 * @decorator
 * @swagger
 * @schema
 * @classDecorator
 * @operation
 */
export declare function Path(path: string): (...args: any[]) => any;
