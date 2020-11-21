import { Type } from "@tsed/core";
import { JsonSchemaOptions } from "../interfaces";
export interface SpecSerializerOptions extends JsonSchemaOptions {
    /**
     * Paths
     */
    paths?: any;
    /**
     *
     */
    rootPath?: string;
    /**
     *
     * @param target
     * @param propertyKey
     */
    operationIdFormatter?: (name: string, propertyKey: string, path: string) => string;
    /**
     *
     */
    operationIdPattern?: string;
}
/**
 * Return the swagger or open spec for the given class
 * @param model
 * @param options
 */
export declare function getSpec(model: Type<any>, options?: SpecSerializerOptions): any;
