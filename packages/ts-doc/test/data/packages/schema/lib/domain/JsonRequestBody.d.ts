import { JsonMediaType } from "../interfaces";
import { JsonMap } from "./JsonMap";
import { JsonSchema } from "./JsonSchema";
export interface JsonRequestBodyOptions {
    description: string;
    content: {
        [media: string]: JsonSchema;
    };
    required: boolean;
}
export declare class JsonRequestBody extends JsonMap<JsonRequestBodyOptions> {
    constructor(obj?: Partial<JsonRequestBodyOptions>);
    description(description: string): this;
    content(content: {
        [media: string]: JsonMediaType;
    }): this;
    addContent(mediaType: string, schema: JsonSchema): this;
    required(required: boolean): this;
}
