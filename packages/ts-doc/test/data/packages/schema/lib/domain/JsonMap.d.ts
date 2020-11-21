import { JsonSchemaOptions } from "../interfaces";
export declare class JsonMap<T> extends Map<string, any> {
    [key: string]: any;
    constructor(obj?: Partial<T>);
    assign(obj?: Partial<T> & any): this;
    toJSON(options?: JsonSchemaOptions): any;
}
