import { Type } from "@tsed/core";
import { JsonEntityStore } from "../domain/JsonEntityStore";
/**
 * Return the list of properties including properties from inherited classes
 * @param target
 */
export declare function getPropertiesStores<T extends JsonEntityStore = JsonEntityStore>(target: Type<any> | any): Map<string | symbol | number, T>;
