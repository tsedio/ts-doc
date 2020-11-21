import { Type } from "@tsed/core";
import { JsonEntityStore } from "../domain/JsonEntityStore";
/**
 * Return store and his inherited stores
 * @param target
 */
export declare function getInheritedStores(target: Type<any> | any): Map<Type<any>, JsonEntityStore>;
