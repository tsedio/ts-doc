"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generics_1 = require("../utils/generics");
const serializeJsonSchema_1 = require("../utils/serializeJsonSchema");
const JsonMap_1 = require("./JsonMap");
const JsonParameterTypes_1 = require("./JsonParameterTypes");
const SpecTypes_1 = require("./SpecTypes");
class JsonParameterOptions {
}
exports.JsonParameterOptions = JsonParameterOptions;
class JsonParameter extends JsonMap_1.JsonMap {
    constructor() {
        super(...arguments);
        this.nestedGenerics = [];
    }
    name(name) {
        this.set("name", name);
        return this;
    }
    description(description) {
        this.set("description", description);
        return this;
    }
    in(inType, expression = "") {
        this.set("in", inType.toLowerCase());
        this.expression = expression;
        return this;
    }
    required(required) {
        this.set("required", required);
        return this;
    }
    schema(schema) {
        this.$schema = schema;
        return this;
    }
    toJSON(options = {}) {
        if (!JsonParameterTypes_1.isParameterType(this.get("in"))) {
            return null;
        }
        const schemas = { ...options.schemas };
        const { type, schema, ...parameter } = super.toJSON(options);
        const jsonSchema = serializeJsonSchema_1.serializeItem(this.$schema, {
            ...options,
            ...generics_1.popGenerics(this)
        });
        parameter.required = parameter.required || this.get("in") === "path";
        if (!jsonSchema.$ref && (this.get("in") === "path" || Object.keys(jsonSchema).length === 1)) {
            parameter.type = jsonSchema.type;
        }
        else if (options.spec === SpecTypes_1.SpecTypes.SWAGGER && this.get("in") === "query") {
            if (jsonSchema.$ref) {
                return this.refToParameters(parameter, options, schemas);
            }
            if (jsonSchema.type === "array") {
                return {
                    ...parameter,
                    type: "array",
                    collectionFormat: "multi",
                    items: {
                        type: "string"
                    }
                };
            }
            return {
                ...parameter,
                ...jsonSchema
            };
        }
        else {
            parameter.schema = jsonSchema;
        }
        return parameter;
    }
    refToParameters(parameter, options, schemas) {
        const schema = options.schemas[this.$schema.getName()];
        if (options.schemas[this.$schema.getName()] && !schemas[this.$schema.getName()]) {
            delete options.schemas[this.$schema.getName()];
        }
        return Object.entries(schema.properties || {}).reduce((params, [key, prop]) => {
            return [
                ...params,
                {
                    ...parameter,
                    name: key,
                    required: (schema.required || []).includes(key),
                    ...prop
                }
            ];
        }, []);
    }
}
exports.JsonParameter = JsonParameter;
//# sourceMappingURL=JsonParameter.js.map