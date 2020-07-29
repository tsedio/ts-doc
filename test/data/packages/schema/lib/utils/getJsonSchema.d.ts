import { Type } from "@tsed/core";
import { JsonEntityStore } from "../domain/JsonEntityStore";
import { JsonSchemaOptions } from "../interfaces";
export declare function getJsonSchema(model: Type<any> | JsonEntityStore, options?: JsonSchemaOptions): any;
