import { JsonSchema } from "../domain/JsonSchema";
import { JsonSchemaOptions } from "../interfaces";
import { GenericsContext } from "./generics";
export declare function createRef(value: any, options?: JsonSchemaOptions): any;
export declare function serializeItem(value: any, options: JsonSchemaOptions): any;
export declare function serializeInherited(obj: any, target: any, options?: JsonSchemaOptions): any;
/**
 * Serialize class which inherit from Map like JsonMap, JsonOperation, JsonParameter.
 * @param input
 * @param options
 */
export declare function serializeMap(input: Map<string, any>, options?: JsonSchemaOptions): any;
/**
 * Serialize Any object to a json schema
 * @param input
 * @param options
 */
export declare function serializeObject(input: any, options: JsonSchemaOptions): any;
export declare function serializeAny(input: any, options?: JsonSchemaOptions): any;
export declare function serializeGenerics(obj: any, options: GenericsContext): any;
/**
 * Convert JsonSchema instance to plain json object
 * @param schema
 * @param options
 */
export declare function serializeJsonSchema(schema: JsonSchema, options?: JsonSchemaOptions): any;
