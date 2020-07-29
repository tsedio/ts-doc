import { Hooks, ValueOf } from "@tsed/core";
import { JSONSchema6, JSONSchema6Definition, JSONSchema6Type, JSONSchema6TypeName, JSONSchema6Version } from "json-schema";
import { JsonSchemaOptions } from "../interfaces";
import { IgnoreCallback } from "../interfaces/IgnoreCallback";
import { NestedGenerics } from "../utils/generics";
import { AliasMap, AliasType } from "./JsonAliasMap";
import { JsonFormatTypes } from "./JsonFormatTypes";
export interface JsonSchemaObject extends JSONSchema6 {
    type: (any | JSONSchema6TypeName) | (any | JSONSchema6TypeName)[];
    additionalProperties?: boolean | JSONSchema6 | any;
    propertyNames?: boolean | JSONSchema6 | any;
    items?: (any | JSONSchema6Definition) | (any | JSONSchema6Definition)[];
}
export declare class JsonSchema extends Map<string, any> implements NestedGenerics {
    readonly $hooks: Hooks;
    readonly $required: Set<string>;
    private _genericLabels;
    private _nestedGenerics;
    private _alias;
    private _itemSchema;
    private _target;
    private _isGeneric;
    private _isCollection;
    constructor(obj?: JsonSchema | Partial<JsonSchemaObject>);
    get alias(): AliasMap;
    get nestedGenerics(): any[];
    set nestedGenerics(value: any[]);
    get genericLabels(): string[];
    set genericLabels(value: string[]);
    get isClass(): boolean;
    /**
     * Current schema is a collection
     */
    get isCollection(): boolean;
    /**
     * Current schema is a generic
     */
    get isGeneric(): boolean;
    /**
     * Current schema has generics items
     */
    get hasGenerics(): boolean;
    get genericType(): string;
    get class(): any;
    static from(obj?: Partial<JsonSchemaObject>): JsonSchema;
    itemSchema(obj?: JsonSchemaObject | JsonSchema | any): JsonSchema;
    getAliasOf(property: AliasType): string | number | symbol | undefined;
    addAlias(property: AliasType, alias: AliasType): this;
    removeAlias(property: AliasType): this;
    $id($id: string): this;
    $ref($ref: string): this;
    $schema($schema: JSONSchema6Version): this;
    name(name: string): this;
    ignore(cb: boolean | IgnoreCallback): this;
    /**
     * This keyword can be used to supply a default JSON value associated with a particular schema.
     * It is RECOMMENDED that a default value be valid against the associated schema.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-7.3
     */
    default(value: JSONSchema6Type): this;
    /**
     * More readible form of a one-element "enum"
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.24
     */
    const(value: JSONSchema6Type): this;
    /**
     * This attribute is a string that provides a full description of the of purpose the instance property.
     *
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-7.2
     */
    description(description: string): this;
    /**
     * This keyword determines how child instances validate for arrays, and does not directly validate the immediate instance itself.
     * If "items" is an array of schemas, validation succeeds if every instance element
     * at a position greater than the size of "items" validates against "additionalItems".
     * Otherwise, "additionalItems" MUST be ignored, as the "items" schema
     * (possibly the default value of an empty schema) is applied to all elements.
     * Omitting this keyword has the same behavior as an empty schema.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.10
     */
    additionalItems(additionalItems: boolean | JsonSchemaObject): this;
    /**
     * An array instance is valid against "contains" if at least one of its elements is valid against the given schema.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.14
     */
    contains(contains: JSONSchema6Definition): this;
    /**
     * Array of examples with no validation effect the value of "default" is usable as an example without repeating it under this keyword
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-7.4
     */
    examples(examples: JSONSchema6Type[]): this;
    /**
     * This keyword determines how child instances validate for arrays, and does not directly validate the immediate instance itself.
     * Omitting this keyword has the same behavior as an empty schema.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.9
     */
    items(items: JsonSchema | JsonSchemaObject | (JsonSchemaObject | JsonSchema)[]): this;
    /**
     * Must be a non-negative integer.
     * An array instance is valid against "maxItems" if its size is less than, or equal to, the value of this keyword.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.11
     */
    maxItems(maxItems: number): this;
    /**
     * Must be a non-negative integer.
     * An array instance is valid against "maxItems" if its size is greater than, or equal to, the value of this keyword.
     * Omitting this keyword has the same behavior as a value of 0.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.12
     */
    minItems(minItems: number): this;
    /**
     * If this keyword has boolean value false, the instance validates successfully.
     * If it has boolean value true, the instance validates successfully if all of its elements are unique.
     * Omitting this keyword has the same behavior as a value of false.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.13
     */
    uniqueItems(uniqueItems: boolean): this;
    /**
     * Must be a non-negative integer.
     * An object instance is valid against "maxProperties" if its number of properties is less than, or equal to, the value of this keyword.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.15
     */
    maxProperties(maxProperties: number): this;
    /**
     * Must be a non-negative integer.
     * An object instance is valid against "maxProperties" if its number of properties is greater than,
     * or equal to, the value of this keyword.
     * Omitting this keyword has the same behavior as a value of 0.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.16
     */
    minProperties(minProperties: number): this;
    /**
     * Elements of this array must be unique.
     * An object instance is valid against this keyword if every item in the array is the name of a property in the instance.
     * Omitting this keyword has the same behavior as an empty array.
     *
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.17
     */
    required(required: string[]): this;
    addRequired(property: string): this;
    removeRequired(property: string): this;
    isRequired(property: string): boolean;
    /**
     * This keyword determines how child instances validate for objects, and does not directly validate the immediate instance itself.
     * Validation succeeds if, for each name that appears in both the instance and as a name within this keyword's value,
     * the child instance for that name successfully validates against the corresponding schema.
     * Omitting this keyword has the same behavior as an empty object.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.18
     */
    properties(properties: JsonSchema | {
        [key: string]: JsonSchemaObject;
    }): this;
    addProperties(key: string, schema: JsonSchemaObject | JsonSchema): this;
    /**
     * This attribute is an object that defines the schema for a set of property names of an object instance.
     * The name of each property of this attribute's object is a regular expression pattern in the ECMA 262, while the value is a schema.
     * If the pattern matches the name of a property on the instance object, the value of the instance's property
     * MUST be valid against the pattern name's schema value.
     * Omitting this keyword has the same behavior as an empty object.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.19
     */
    patternProperties(patternProperties: {
        [p: string]: JsonSchemaObject | JsonSchema;
    }): this;
    /**
     * This attribute defines a schema for all properties that are not explicitly defined in an object type definition.
     * If specified, the value MUST be a schema or a boolean.
     * If false is provided, no additional properties are allowed beyond the properties defined in the schema.
     * The default value is an empty schema which allows any value for additional properties.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.20
     */
    additionalProperties(additionalProperties: boolean | JsonSchemaObject | JsonSchema): this;
    /**
     * This keyword specifies rules that are evaluated if the instance is an object and contains a certain property.
     * Each property specifies a dependency.
     * If the dependency value is an array, each element in the array must be unique.
     * Omitting this keyword has the same behavior as an empty object.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.21
     */
    dependencies(dependencies: {
        [p: string]: JSONSchema6Definition | JsonSchema | string[];
    }): this;
    /**
     * Takes a schema which validates the names of all properties rather than their values.
     * Note the property name that the schema is testing will always be a string.
     * Omitting this keyword has the same behavior as an empty schema.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.22
     */
    propertyNames(propertyNames: JSONSchema6Definition | JsonSchema): this;
    /**
     * This provides an enumeration of all possible values that are valid
     * for the instance property. This MUST be an array, and each item in
     * the array represents a possible value for the instance value. If
     * this attribute is defined, the instance value MUST be one of the
     * values in the array in order for the schema to be valid.
     *
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.23
     */
    enum(enumValues: JSONSchema6Type[]): this;
    /**
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-7.1
     */
    definitions(definitions: {
        [p: string]: JsonSchemaObject | JsonSchema;
    }): this;
    /**
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.26
     */
    allOf(allOf: (JsonSchemaObject | JsonSchema)[]): this;
    /**
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.27
     */
    anyOf(anyOf: (JsonSchemaObject | JsonSchema)[]): this;
    /**
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.28
     */
    oneOf(oneOf: (JsonSchemaObject | JsonSchema)[]): this;
    /**
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.29
     */
    not(not: JsonSchemaObject | JsonSchema): this;
    /**
     * Must be strictly greater than 0.
     * A numeric instance is valid only if division by this keyword's value results in an integer.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.1
     */
    multipleOf(multipleOf: number): this;
    /**
     * Representing an inclusive upper limit for a numeric instance.
     * This keyword validates only if the instance is less than or exactly equal to "maximum".
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.2
     */
    maximum(maximum: number): this;
    /**
     * Representing an exclusive upper limit for a numeric instance.
     * This keyword validates only if the instance is strictly less than (not equal to) to "exclusiveMaximum".
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.3
     */
    exclusiveMaximum(exclusiveMaximum: number): this;
    /**
     * Representing an inclusive lower limit for a numeric instance.
     * This keyword validates only if the instance is greater than or exactly equal to "minimum".
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.4
     */
    minimum(minimum: number): this;
    /**
     * Representing an exclusive lower limit for a numeric instance.
     * This keyword validates only if the instance is strictly greater than (not equal to) to "exclusiveMinimum".
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.5
     */
    exclusiveMinimum(exclusiveMinimum: number): this;
    /**
     * Must be a non-negative integer.
     * A string instance is valid against this keyword if its length is less than, or equal to, the value of this keyword.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.6
     */
    maxLength(maxLength: number): this;
    /**
     * Must be a non-negative integer.
     * A string instance is valid against this keyword if its length is greater than, or equal to, the value of this keyword.
     * Omitting this keyword has the same behavior as a value of 0.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.7
     */
    minLength(minLength: number): this;
    /**
     * Should be a valid regular expression, according to the ECMA 262 regular expression dialect.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.8
     */
    pattern(pattern: string | RegExp): this;
    /**
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-8
     */
    format(format: JsonFormatTypes | ValueOf<JsonFormatTypes>): this;
    /**
     * A single type, or a union of simple types
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.25
     */
    type(type: any | JSONSchema6TypeName | JSONSchema6TypeName[]): this;
    addTypes(...types: any[]): void;
    any(...types: any[]): this;
    integer(): this;
    /**
     * This attribute is a string that provides a short description of the instance property.
     *
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-7.2
     */
    title(title: string): this;
    toObject(options?: JsonSchemaOptions): any;
    toJSON(options?: JsonSchemaOptions): any;
    assign(obj?: JsonSchema | Partial<JsonSchemaObject>): this;
    set(key: string, value: any): this;
    /**
     * Return the itemSchema computed type.
     * If the type is a function used for recursive model,
     * the function will be called to get the right type.
     */
    getComputedType(): any;
    /**
     * Return the Json type as string
     */
    getJsonType(): string;
    /**
     * Get the symbolic name of the entity
     */
    getName(): any;
}
