"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@tsed/core");
const JsonAliasMap_1 = require("../domain/JsonAliasMap");
const SpecTypes_1 = require("../domain/SpecTypes");
const ignoreHook_1 = require("../hooks/ignoreHook");
const generics_1 = require("./generics");
const getInheritedStores_1 = require("./getInheritedStores");
const getJsonEntityStore_1 = require("./getJsonEntityStore");
const IGNORES = ["name", "$required", "$hooks", "_nestedGenerics"];
function isEmptyProperties(key, value) {
    return typeof value === "object" && ["items", "properties", "additionalProperties"].includes(key) && Object.keys(value).length === 0;
}
function shouldMapAlias(key, value, useAlias) {
    return typeof value === "object" && useAlias && ["properties", "additionalProperties"].includes(key);
}
function getRequired(schema, useAlias) {
    return Array.from(schema.$required).map(key => (useAlias ? schema.alias.get(key) || key : key));
}
function createRef(value, options = {}) {
    const store = getJsonEntityStore_1.getJsonEntityStore(value.class);
    const name = store.schema.getName() || value.getName();
    if (value.hasGenerics) {
        return serializeAny(store.schema, {
            ...options,
            ...generics_1.popGenerics(value),
            root: false
        });
    }
    if (options.schemas && !options.schemas[name]) {
        options.schemas[name] = {}; // avoid infinite calls
        options.schemas[name] = serializeAny(store.schema, generics_1.mapGenericsOptions({
            ...options,
            root: false
        }));
    }
    const { host = `#/${options.spec === "openapi3" ? "components/schemas" : "definitions"}` } = options;
    return {
        $ref: `${host}/${name}`
    };
}
exports.createRef = createRef;
function serializeItem(value, options) {
    if (value && value.isClass) {
        return createRef(value, { ...options, root: false });
    }
    return serializeAny(value, { ...options, root: false });
}
exports.serializeItem = serializeItem;
function serializeInherited(obj, target, options = {}) {
    const stores = Array.from(getInheritedStores_1.getInheritedStores(target).entries()).filter(([model]) => core_1.classOf(model) !== core_1.classOf(target));
    if (stores.length) {
        const schema = stores.reduce((obj, [, store]) => {
            return core_1.deepExtends(obj, serializeJsonSchema(store.schema, { root: true, ...options }));
        }, {});
        obj = core_1.deepExtends(schema, obj);
    }
    return obj;
}
exports.serializeInherited = serializeInherited;
/**
 * Serialize class which inherit from Map like JsonMap, JsonOperation, JsonParameter.
 * @param input
 * @param options
 */
function serializeMap(input, options = {}) {
    options = generics_1.mapGenericsOptions(options);
    return Array.from(input.entries()).reduce((obj, [key, value]) => {
        obj[key] = serializeItem(value, options);
        return obj;
    }, {});
}
exports.serializeMap = serializeMap;
/**
 * Serialize Any object to a json schema
 * @param input
 * @param options
 */
function serializeObject(input, options) {
    return Object.entries(input).reduce((obj, [key, value]) => {
        if (!ignoreHook_1.alterIgnore(value, options)) {
            obj[key] = serializeItem(value, options);
        }
        return obj;
    }, core_1.isArray(input) ? [] : {});
}
exports.serializeObject = serializeObject;
function serializeAny(input, options = {}) {
    options.schemas = options.schemas || {};
    if (typeof input !== "object" || input === null) {
        return input;
    }
    if ("toJSON" in input) {
        return input.toJSON(generics_1.mapGenericsOptions(options));
    }
    return serializeObject(input, options);
}
exports.serializeAny = serializeAny;
function serializeGenerics(obj, options) {
    const { generics } = options;
    if (generics && obj.$ref) {
        if (generics.has(obj.$ref)) {
            const model = {
                class: generics.get(obj.$ref)
            };
            if (options.nestedGenerics.length === 0) {
                return createRef(model, {
                    ...options,
                    generics: undefined
                });
            }
            const store = getJsonEntityStore_1.getJsonEntityStore(model.class);
            return serializeJsonSchema(store.schema, {
                ...options,
                ...generics_1.popGenerics(options),
                root: false
            });
        }
    }
    return obj;
}
exports.serializeGenerics = serializeGenerics;
/**
 * Convert JsonSchema instance to plain json object
 * @param schema
 * @param options
 */
function serializeJsonSchema(schema, options = {}) {
    const { useAlias = true, schemas = {}, root = true, genericTypes } = options;
    let obj = Array.from(schema.entries()).reduce((item, [key, value]) => {
        if (IGNORES.includes(key)) {
            return item;
        }
        if (key === "type") {
            value = schema.getJsonType();
        }
        if (key === "examples" && core_1.isObject(value) && options.spec !== SpecTypes_1.SpecTypes.SWAGGER) {
            value = Object.values(value);
        }
        if (!root && ["properties", "additionalProperties", "items"].includes(key) && value.isClass) {
            value = createRef(value, {
                ...options,
                useAlias,
                schemas,
                root: false
            });
        }
        else {
            value = serializeAny(value, {
                ...options,
                useAlias,
                schemas,
                root: false,
                genericTypes,
                genericLabels: schema.genericLabels
            });
        }
        if (isEmptyProperties(key, value)) {
            return item;
        }
        if (shouldMapAlias(key, value, useAlias)) {
            value = JsonAliasMap_1.mapAliasedProperties(value, schema.alias);
        }
        item[key] = value;
        return item;
    }, {});
    if (schema.isClass) {
        obj = serializeInherited(obj, schema.getComputedType(), { ...options, root: false, schemas });
    }
    obj = serializeGenerics(obj, { ...options, root: false, schemas });
    if (schema.$required.size) {
        obj.required = getRequired(schema, useAlias);
    }
    return obj;
}
exports.serializeJsonSchema = serializeJsonSchema;
//# sourceMappingURL=serializeJsonSchema.js.map