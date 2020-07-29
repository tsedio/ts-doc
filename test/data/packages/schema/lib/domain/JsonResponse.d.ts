import { JsonHeader, JsonMediaType, JsonSchemaOptions } from "../interfaces";
import { JsonMap } from "./JsonMap";
import { JsonSchema } from "./JsonSchema";
export interface JsonResponseOptions {
    description: string;
    headers: {
        [header: string]: JsonHeader;
    };
    content: {
        [media: string]: JsonSchema;
    };
    links: {
        [link: string]: any;
    };
}
export declare class JsonResponse extends JsonMap<JsonResponseOptions> {
    $schema: JsonSchema;
    constructor(obj?: Partial<JsonResponseOptions>);
    description(description: string): this;
    headers(headers: {
        [header: string]: string | JsonHeader;
    }): this;
    content(content: {
        [media: string]: JsonMediaType;
    }): this;
    addContent(mediaType: string, schema?: JsonSchema): this;
    toJSON(options?: JsonSchemaOptions): any;
}
