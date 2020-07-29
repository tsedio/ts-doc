"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@tsed/core");
const getComputedType_1 = require("../utils/getComputedType");
const getJsonType_1 = require("../utils/getJsonType");
const serializeJsonSchema_1 = require("../utils/serializeJsonSchema");
const toJsonRegex_1 = require("../utils/toJsonRegex");
function mapToJsonSchema(item) {
    if (typeof item !== "object") {
        return item;
    }
    if (core_1.isArray(item)) {
        return item.map(mapToJsonSchema);
    }
    return item instanceof JsonSchema ? item : JsonSchema.from(item);
}
function mapProperties(properties) {
    return Object.entries(properties).reduce((properties, [key, schema]) => {
        properties[toJsonRegex_1.toJsonRegex(key)] = core_1.isArray(schema) ? schema.map(mapToJsonSchema) : mapToJsonSchema(schema);
        return properties;
    }, {});
}
class JsonSchema extends Map {
    constructor(obj = {}) {
        super();
        this.$hooks = new core_1.Hooks();
        this.$required = new Set();
        this._nestedGenerics = [];
        this._alias = new Map();
        this._isGeneric = false;
        this._isCollection = false;
        if (obj) {
            this.assign(obj);
        }
    }
    get alias() {
        return this._alias;
    }
    get nestedGenerics() {
        return this._nestedGenerics;
    }
    set nestedGenerics(value) {
        this._nestedGenerics = value;
    }
    get genericLabels() {
        return this._genericLabels;
    }
    set genericLabels(value) {
        this._genericLabels = value;
    }
    get isClass() {
        return core_1.isClass(this.class) && ![Map, Array, Set, Object, Date, Boolean, Number, String].includes(this._target);
    }
    /**
     * Current schema is a collection
     */
    get isCollection() {
        return this._isCollection;
    }
    /**
     * Current schema is a generic
     */
    get isGeneric() {
        return this._isGeneric;
    }
    /**
     * Current schema has generics items
     */
    get hasGenerics() {
        return !!(this.nestedGenerics && this.nestedGenerics.length);
    }
    get genericType() {
        return this.get("$ref");
    }
    get class() {
        return this.getComputedType();
    }
    static from(obj = {}) {
        return new JsonSchema(obj);
    }
    itemSchema(obj = {}) {
        this._itemSchema = this._itemSchema || mapToJsonSchema(obj);
        this._itemSchema.assign(obj);
        return this._itemSchema;
    }
    getAliasOf(property) {
        return this._alias.get(property);
    }
    addAlias(property, alias) {
        this._alias.set(property, alias);
        this._alias.set(alias, property);
        return this;
    }
    removeAlias(property) {
        const alias = this._alias.get(property);
        alias && this._alias.delete(alias);
        this._alias.delete(property);
        return this;
    }
    $id($id) {
        super.set("$id", $id);
        return this;
    }
    $ref($ref) {
        super.set("$ref", $ref);
        return this;
    }
    $schema($schema) {
        super.set("$schema", $schema);
        return this;
    }
    name(name) {
        super.set("name", name);
        return this;
    }
    ignore(cb) {
        if (typeof cb === "boolean") {
            const bool = cb;
            cb = () => bool;
        }
        this.$hooks.on("ignore", cb);
        return this;
    }
    /**
     * This keyword can be used to supply a default JSON value associated with a particular schema.
     * It is RECOMMENDED that a default value be valid against the associated schema.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-7.3
     */
    default(value) {
        super.set("default", value);
        return this;
    }
    /**
     * More readible form of a one-element "enum"
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.24
     */
    const(value) {
        super.set("const", value);
        return this;
    }
    /**
     * This attribute is a string that provides a full description of the of purpose the instance property.
     *
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-7.2
     */
    description(description) {
        super.set("description", description);
        return this;
    }
    /**
     * This keyword determines how child instances validate for arrays, and does not directly validate the immediate instance itself.
     * If "items" is an array of schemas, validation succeeds if every instance element
     * at a position greater than the size of "items" validates against "additionalItems".
     * Otherwise, "additionalItems" MUST be ignored, as the "items" schema
     * (possibly the default value of an empty schema) is applied to all elements.
     * Omitting this keyword has the same behavior as an empty schema.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.10
     */
    additionalItems(additionalItems) {
        super.set("additionalItems", mapToJsonSchema(additionalItems));
        return this;
    }
    /**
     * An array instance is valid against "contains" if at least one of its elements is valid against the given schema.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.14
     */
    contains(contains) {
        super.set("contains", mapToJsonSchema(contains));
        return this;
    }
    /**
     * Array of examples with no validation effect the value of "default" is usable as an example without repeating it under this keyword
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-7.4
     */
    examples(examples) {
        super.set("examples", examples);
        return this;
    }
    /**
     * This keyword determines how child instances validate for arrays, and does not directly validate the immediate instance itself.
     * Omitting this keyword has the same behavior as an empty schema.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.9
     */
    items(items) {
        super.set("items", mapToJsonSchema(items));
        return this;
    }
    /**
     * Must be a non-negative integer.
     * An array instance is valid against "maxItems" if its size is less than, or equal to, the value of this keyword.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.11
     */
    maxItems(maxItems) {
        super.set("maxItems", maxItems);
        return this;
    }
    /**
     * Must be a non-negative integer.
     * An array instance is valid against "maxItems" if its size is greater than, or equal to, the value of this keyword.
     * Omitting this keyword has the same behavior as a value of 0.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.12
     */
    minItems(minItems) {
        super.set("minItems", minItems);
        return this;
    }
    /**
     * If this keyword has boolean value false, the instance validates successfully.
     * If it has boolean value true, the instance validates successfully if all of its elements are unique.
     * Omitting this keyword has the same behavior as a value of false.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.13
     */
    uniqueItems(uniqueItems) {
        super.set("uniqueItems", uniqueItems);
        return this;
    }
    /**
     * Must be a non-negative integer.
     * An object instance is valid against "maxProperties" if its number of properties is less than, or equal to, the value of this keyword.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.15
     */
    maxProperties(maxProperties) {
        super.set("maxProperties", maxProperties);
        return this;
    }
    /**
     * Must be a non-negative integer.
     * An object instance is valid against "maxProperties" if its number of properties is greater than,
     * or equal to, the value of this keyword.
     * Omitting this keyword has the same behavior as a value of 0.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.16
     */
    minProperties(minProperties) {
        super.set("minProperties", minProperties);
        return this;
    }
    /**
     * Elements of this array must be unique.
     * An object instance is valid against this keyword if every item in the array is the name of a property in the instance.
     * Omitting this keyword has the same behavior as an empty array.
     *
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.17
     */
    required(required) {
        this.$required.clear();
        required.forEach((value) => this.$required.add(value));
        return this;
    }
    addRequired(property) {
        this.$required.add(property);
        return this;
    }
    removeRequired(property) {
        this.$required.delete(property);
        return this;
    }
    isRequired(property) {
        return this.$required.has(property);
    }
    /**
     * This keyword determines how child instances validate for objects, and does not directly validate the immediate instance itself.
     * Validation succeeds if, for each name that appears in both the instance and as a name within this keyword's value,
     * the child instance for that name successfully validates against the corresponding schema.
     * Omitting this keyword has the same behavior as an empty object.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.18
     */
    properties(properties) {
        super.set("properties", properties instanceof JsonSchema ? properties : mapProperties(properties));
        return this;
    }
    addProperties(key, schema) {
        const properties = this.get("properties") || {};
        properties[key] = schema;
        return this.properties(properties);
    }
    /**
     * This attribute is an object that defines the schema for a set of property names of an object instance.
     * The name of each property of this attribute's object is a regular expression pattern in the ECMA 262, while the value is a schema.
     * If the pattern matches the name of a property on the instance object, the value of the instance's property
     * MUST be valid against the pattern name's schema value.
     * Omitting this keyword has the same behavior as an empty object.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.19
     */
    patternProperties(patternProperties) {
        super.set("patternProperties", mapProperties(patternProperties));
        return this;
    }
    /**
     * This attribute defines a schema for all properties that are not explicitly defined in an object type definition.
     * If specified, the value MUST be a schema or a boolean.
     * If false is provided, no additional properties are allowed beyond the properties defined in the schema.
     * The default value is an empty schema which allows any value for additional properties.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.20
     */
    additionalProperties(additionalProperties) {
        super.set("additionalProperties", mapToJsonSchema(additionalProperties));
        return this;
    }
    /**
     * This keyword specifies rules that are evaluated if the instance is an object and contains a certain property.
     * Each property specifies a dependency.
     * If the dependency value is an array, each element in the array must be unique.
     * Omitting this keyword has the same behavior as an empty object.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.21
     */
    dependencies(dependencies) {
        super.set("dependencies", mapProperties(dependencies));
        return this;
    }
    /**
     * Takes a schema which validates the names of all properties rather than their values.
     * Note the property name that the schema is testing will always be a string.
     * Omitting this keyword has the same behavior as an empty schema.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.22
     */
    propertyNames(propertyNames) {
        super.set("propertyNames", mapToJsonSchema(propertyNames));
        return this;
    }
    /**
     * This provides an enumeration of all possible values that are valid
     * for the instance property. This MUST be an array, and each item in
     * the array represents a possible value for the instance value. If
     * this attribute is defined, the instance value MUST be one of the
     * values in the array in order for the schema to be valid.
     *
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.23
     */
    enum(enumValues) {
        super.set("enum", core_1.uniq(enumValues));
        return this;
    }
    /**
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-7.1
     */
    definitions(definitions) {
        super.set("definitions", mapProperties(definitions));
        return this;
    }
    /**
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.26
     */
    allOf(allOf) {
        super.set("allOf", allOf.map(mapToJsonSchema));
        return this;
    }
    /**
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.27
     */
    anyOf(anyOf) {
        super.set("anyOf", anyOf.map(mapToJsonSchema));
        return this;
    }
    /**
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.28
     */
    oneOf(oneOf) {
        super.set("oneOf", oneOf.map(mapToJsonSchema));
        return this;
    }
    /**
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.29
     */
    not(not) {
        super.set("not", mapToJsonSchema(not));
        return this;
    }
    /**
     * Must be strictly greater than 0.
     * A numeric instance is valid only if division by this keyword's value results in an integer.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.1
     */
    multipleOf(multipleOf) {
        super.set("multipleOf", multipleOf);
        return this;
    }
    /**
     * Representing an inclusive upper limit for a numeric instance.
     * This keyword validates only if the instance is less than or exactly equal to "maximum".
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.2
     */
    maximum(maximum) {
        super.set("maximum", maximum);
        return this;
    }
    /**
     * Representing an exclusive upper limit for a numeric instance.
     * This keyword validates only if the instance is strictly less than (not equal to) to "exclusiveMaximum".
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.3
     */
    exclusiveMaximum(exclusiveMaximum) {
        super.set("exclusiveMaximum", exclusiveMaximum);
        return this;
    }
    /**
     * Representing an inclusive lower limit for a numeric instance.
     * This keyword validates only if the instance is greater than or exactly equal to "minimum".
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.4
     */
    minimum(minimum) {
        super.set("minimum", minimum);
        return this;
    }
    /**
     * Representing an exclusive lower limit for a numeric instance.
     * This keyword validates only if the instance is strictly greater than (not equal to) to "exclusiveMinimum".
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.5
     */
    exclusiveMinimum(exclusiveMinimum) {
        super.set("exclusiveMinimum", exclusiveMinimum);
        return this;
    }
    /**
     * Must be a non-negative integer.
     * A string instance is valid against this keyword if its length is less than, or equal to, the value of this keyword.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.6
     */
    maxLength(maxLength) {
        super.set("maxLength", maxLength);
        return this;
    }
    /**
     * Must be a non-negative integer.
     * A string instance is valid against this keyword if its length is greater than, or equal to, the value of this keyword.
     * Omitting this keyword has the same behavior as a value of 0.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.7
     */
    minLength(minLength) {
        super.set("minLength", minLength);
        return this;
    }
    /**
     * Should be a valid regular expression, according to the ECMA 262 regular expression dialect.
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.8
     */
    pattern(pattern) {
        super.set("pattern", toJsonRegex_1.toJsonRegex(pattern));
        return this;
    }
    /**
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-8
     */
    format(format) {
        super.set("format", format);
        return this;
    }
    /**
     * A single type, or a union of simple types
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-6.25
     */
    type(type) {
        switch (type) {
            case Map:
                super.set("type", getJsonType_1.getJsonType(type));
                this._target = type;
                this._isCollection = true;
                if (!this.has("additionalProperties")) {
                    super.set("additionalProperties", this.itemSchema({}));
                }
                break;
            case Array:
                super.set("type", getJsonType_1.getJsonType(type));
                this._target = type;
                this._isCollection = true;
                if (!this.has("items")) {
                    super.set("items", this.itemSchema({}));
                }
                break;
            case Set:
                super.set("type", getJsonType_1.getJsonType(type));
                this._target = type;
                this._isCollection = true;
                this.uniqueItems(true);
                if (!this.has("items")) {
                    super.set("items", this.itemSchema({}));
                }
                break;
            case "integer":
                super.set("type", getJsonType_1.getJsonType(type));
                this.integer();
                break;
            case Object:
            case Date:
            case Boolean:
            case Number:
            case String:
                super.set("type", getJsonType_1.getJsonType(type));
                this._target = type;
                if (!this.has("properties")) {
                    super.set("properties", {});
                }
                break;
            default:
                if (core_1.isClass(type) || core_1.isFunction(type)) {
                    super.set("type", undefined);
                    this._target = type;
                    if (!this.has("properties")) {
                        super.set("properties", {});
                    }
                }
                else {
                    const jsonType = getJsonType_1.getJsonType(type);
                    if (jsonType === "generic") {
                        this._isGeneric = true;
                        super.set("$ref", type);
                    }
                    else {
                        super.set("type", jsonType);
                    }
                }
        }
        return this;
    }
    addTypes(...types) {
        types = [].concat(this.get("type")).concat(types);
        types = core_1.uniq(types).map(getJsonType_1.getJsonType);
        this.type(types);
        delete this._target;
    }
    any(...types) {
        types = core_1.uniq(types.length ? types : ["integer", "number", "string", "boolean", "array", "object", "null"]).map(getJsonType_1.getJsonType);
        this.type(types);
        delete this._target;
        return this;
    }
    integer() {
        super.set("type", "integer");
        super.set("multipleOf", 1.0);
        return this;
    }
    /**
     * This attribute is a string that provides a short description of the instance property.
     *
     * @see https://tools.ietf.org/html/draft-wright-json-schema-validation-01#section-7.2
     */
    title(title) {
        super.set("title", title);
        return this;
    }
    toObject(options) {
        return this.toJSON(options);
    }
    toJSON(options = {}) {
        return serializeJsonSchema_1.serializeJsonSchema(this, options);
    }
    assign(obj = {}) {
        if (obj instanceof JsonSchema) {
            obj = obj.toObject();
        }
        Object.entries(obj).forEach(([key, value]) => {
            this.set(key, value);
        });
        return this;
    }
    set(key, value) {
        if (key in this) {
            // @ts-ignore
            this[key](value);
        }
        else {
            super.set(key, value);
        }
        return this;
    }
    /**
     * Return the itemSchema computed type.
     * If the type is a function used for recursive model,
     * the function will be called to get the right type.
     */
    getComputedType() {
        return getComputedType_1.getComputedType(this._target);
    }
    /**
     * Return the Json type as string
     */
    getJsonType() {
        return this.get("type") || getJsonType_1.getJsonType(this.getComputedType());
    }
    /**
     * Get the symbolic name of the entity
     */
    getName() {
        return this.get("name") || (this._target ? core_1.nameOf(core_1.classOf(this.getComputedType())) : "");
    }
}
exports.JsonSchema = JsonSchema;
//# sourceMappingURL=JsonSchema.js.map