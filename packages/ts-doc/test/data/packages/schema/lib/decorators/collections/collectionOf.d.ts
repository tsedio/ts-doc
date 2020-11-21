export interface ArrayOfChainedDecorators {
    (...args: any): any;
    /**
     * An array instance is valid against `minItems` if its size is greater than, or equal to, the value of this keyword.
     *
     * ::: warning
     * The value `minItems` MUST be a non-negative integer.
     * :::
     *
     * ::: tip
     * Omitting this keyword has the same behavior as a value of 0.
     * :::
     */
    MinItems(minItems: number): this;
    /**
     * The value `maxItems` MUST be a non-negative integer.
     *
     * An array instance is valid against `maxItems` if its size is less than, or equal to, the value of this keyword.
     *
     * :: warning
     * The value `maxItems` MUST be a non-negative integer.
     * :::
     */
    MaxItems(maxItems: number): this;
    /**
     * Set the type of the item collection. The possible value is String, Boolean, Number, Date, Object, Class, etc...
     *
     * The array instance will be valid against "contains" if at least one of its elements is valid against the given schema.
     */
    Contains(): this;
    /**
     * If this keyword has boolean value false, the instance validates successfully. If it has boolean value true, the instance validates successfully if all of its elements are unique.
     */
    UniqueItems(uniqueItems: boolean): this;
}
export interface MapOfChainedDecorators {
    (...args: any): any;
    /**
     * An object instance is valid against `minProperties` if its number of properties is less than, or equal to, the value of this keyword.
     *
     * ::: warning
     * The value of this keyword MUST be a non-negative integer.
     * :::
     */
    MinProperties(minProperties: number): this;
    /**
     * An object instance is valid against `maxProperties` if its number of properties is less than, or equal to, the value of this keyword.
     *
     * ::: warning
     * The value of this keyword MUST be a non-negative integer.
     * :::
     */
    MaxProperties(maxProperties: number): this;
}
export interface CollectionOfChainedDecorators extends MapOfChainedDecorators, ArrayOfChainedDecorators {
}
/**
 * Set the type of the item collection. The possible value is String, Boolean, Number, Date, Object, Class, etc...
 *
 * ```typescript
 * class Model {
 *    @CollectionOf(String).MinLength(0).MaxLength(0)
 *    property: string[];
 * }
 * ```
 * ::: warning
 * You mustn't use the `type Type = string | number` as parameters Type.
 *
 * This example doesn't work:
 *
 * ```typescript
 * type Type = "string" | "number"
 * class Model {
 *    @CollectionOf(Type)
 *    property: Type[];
 * }
 * ```
 * :::
 *
 * @param {Type<any>} type
 * @param collectionType
 * @decorator
 * @ajv
 * @jsonMapper
 * @swagger
 * @schema
 * @propertyDecorator
 * @paramDecorator
 * @model
 */
export declare function CollectionOf(type: any, collectionType?: any): CollectionOfChainedDecorators;
/**
 * Alias of @@GenericOf@@ decorator.
 * @param type
 * @decorator
 */
export declare function ArrayOf(type: any): ArrayOfChainedDecorators;
/**
 * Alias of @@GenericOf@@ decorator.
 * @param type
 * @decorator
 */
export declare function MapOf(type: any): MapOfChainedDecorators;
