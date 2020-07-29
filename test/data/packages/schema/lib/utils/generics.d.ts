import { Type } from "@tsed/core";
export declare type GenericsMap = Map<string, Type<any>>;
export interface GenericTypes {
    genericTypes: Type<any>[];
    [key: string]: any;
}
export interface GenericLabels {
    genericLabels: string[];
    [key: string]: any;
}
export interface NestedGenerics {
    nestedGenerics: Type<any>[][];
    [key: string]: any;
}
export interface GenericsContext extends GenericTypes, GenericLabels, NestedGenerics {
    generics: GenericsMap;
}
/**
 *
 * @param genericLabels
 * @param genericTypes
 */
export declare function getGenericsMap(genericLabels: string[], genericTypes: Type<any>[]): GenericsMap;
/**
 *
 * @param options
 */
export declare function mapGenericsOptions(options: Partial<GenericTypes & GenericLabels>): Partial<GenericTypes & GenericLabels>;
/**
 *
 * @param value
 */
export declare function popGenerics(value: NestedGenerics): NestedGenerics & GenericTypes;
