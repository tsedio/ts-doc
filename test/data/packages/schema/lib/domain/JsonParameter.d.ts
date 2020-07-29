import { Type } from "@tsed/core";
import { JsonSchemaOptions } from "../interfaces";
import { NestedGenerics } from "../utils/generics";
import { JsonMap } from "./JsonMap";
import { JsonParameterTypes } from "./JsonParameterTypes";
import { JsonSchema } from "./JsonSchema";
export declare class JsonParameterOptions {
    name: string;
    description: string;
    in: JsonParameterTypes | string;
    required: boolean;
    schema: JsonSchema;
}
export declare class JsonParameter extends JsonMap<JsonParameterOptions> implements NestedGenerics {
    nestedGenerics: Type<any>[][];
    $schema: JsonSchema;
    name(name: string): this;
    description(description: string): this;
    in(inType: string, expression?: string | any): this;
    required(required: boolean): this;
    schema(schema: JsonSchema): this;
    toJSON(options?: JsonSchemaOptions): any;
    private refToParameters;
}
