import { JsonExternalDocumentation, JsonHeader, JsonSecurityRequirement, JsonSchemaOptions, JsonTag } from "../interfaces";
import { JsonMap } from "./JsonMap";
import { JsonParameter } from "./JsonParameter";
import { JsonResponse } from "./JsonResponse";
export interface JsonMethodPath {
    path: string | RegExp;
    method: string;
    [key: string]: any;
}
export interface JsonOperationOptions {
    tags: string[];
    summary: string;
    description: string;
    consumes: string[];
    produces: string[];
    operationId: string;
    parameters: JsonParameter[];
    deprecated: boolean;
    security?: JsonSecurityRequirement[];
    responses: any;
    externalDocs: JsonExternalDocumentation;
}
export declare class JsonOperation extends JsonMap<JsonOperationOptions> {
    readonly operationPaths: Map<string, JsonMethodPath>;
    private _status;
    constructor(obj?: Partial<JsonOperationOptions>);
    get response(): JsonResponse | undefined;
    get status(): number;
    tags(tags: JsonTag[]): this;
    addTags(tags: JsonTag[]): this;
    summary(summary: string): this;
    operationId(operationId: string): this;
    responses(responses: JsonMap<any>): this;
    defaultStatus(status: number): void;
    getStatus(): number;
    addResponse(statusCode: string | number, response: JsonResponse): this;
    getResponses(): JsonMap<JsonResponse>;
    getResponseOf(status: number | string): JsonResponse;
    getHeadersOf(status: number): {
        [key: string]: JsonHeader;
    };
    security(security: JsonSecurityRequirement): this;
    addSecurityScopes(name: string, scopes: string[]): this;
    description(description: string): this;
    deprecated(deprecated: boolean): this;
    parameters(parameters: JsonParameter[]): this;
    addParameter(index: number, parameter: JsonParameter): void;
    consumes(consumes: string[]): this;
    produces(produces: string[]): this;
    addProduce(produce: string): void;
    addOperationPath(method: string, path: string | RegExp, options?: any): this;
    toJSON(options?: JsonSchemaOptions): any;
}
