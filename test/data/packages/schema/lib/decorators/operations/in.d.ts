import { JsonParameterTypes } from "../../domain/JsonParameterTypes";
/**
 * Add a input parameter.
 *
 * ::: warning
 * Don't use decorator with Ts.ED application. Use @@BodyParams@@, @@PathParams@@, etc... instead.
 * :::
 *
 * @param inType
 * @decorator
 * @swagger
 * @schema
 * @paramDecorator
 * @operation
 */
export declare function In(inType: JsonParameterTypes | string): (...args: any[]) => any;
