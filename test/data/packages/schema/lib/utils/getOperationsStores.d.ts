import { Type } from "@tsed/core";
import { JsonEntityStore } from "../domain/JsonEntityStore";
export declare function getOperationsStores<T = JsonEntityStore>(target: Type<any> | any): Map<string, T>;
