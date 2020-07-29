import { DecoratorTypes, Type } from "@tsed/core";
import { JsonEntityStore } from "../../domain/JsonEntityStore";
/**
 * Declare a new JsonEntityStore class for a specific decorator type.
 *
 * @ignore
 * @param type
 * @decorator
 */
export declare function JsonEntityComponent(type: DecoratorTypes): (target: Type<JsonEntityStore>) => void;
