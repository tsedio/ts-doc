export declare enum OperationMethods {
    ALL = "ALL",
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    HEAD = "HEAD",
    DELETE = "DELETE",
    OPTIONS = "OPTIONS",
    CUSTOM = "CUSTOM"
}
/**
 * Declare new Operation with his path and http method.
 *
 * @param method
 * @param path
 * @decorator
 * @swagger
 * @schema
 * @methodDecorator
 * @operation
 */
export declare function OperationPath(method: OperationMethods | string, path?: string | RegExp): (...args: any[]) => any;
