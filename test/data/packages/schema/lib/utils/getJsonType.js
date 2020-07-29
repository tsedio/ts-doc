"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@tsed/core");
/**
 *
 * @type {string[]}
 */
exports.JSON_TYPES = ["string", "number", "integer", "boolean", "object", "array", "null", "any"];
function getJsonType(value) {
    if (value === null) {
        return "null";
    }
    if (core_1.isPrimitiveOrPrimitiveClass(value)) {
        if (exports.JSON_TYPES.indexOf(value) > -1) {
            return value;
        }
        if (typeof value === "string") {
            return "generic";
        }
        return core_1.primitiveOf(value);
    }
    if (core_1.isArrayOrArrayClass(value)) {
        if (value !== Array) {
            return value.map(getJsonType);
        }
        return "array";
    }
    if (value === Set) {
        return "array";
    }
    if (core_1.isDate(value)) {
        return "string";
    }
    return "object";
}
exports.getJsonType = getJsonType;
//# sourceMappingURL=getJsonType.js.map