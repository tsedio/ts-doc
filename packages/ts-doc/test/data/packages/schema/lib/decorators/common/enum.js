"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const core_1 = require("@tsed/core");
const jsonEntityFn_1 = require("./jsonEntityFn");
const transformTsEnum = (enumValue) => {
  return Object.keys(enumValue).reduce((acc, key) => {
    if (isNaN(+key)) {
      const value = enumValue[key];
      return acc.concat(value);
    }
    return acc;
  }, []);
};
/**
 * The enum keyword is used to restrict a value to a fixed set of values.
 * It must be an array with at least one element, where each element is unique.
 *
 * Elements in the array might be of any value, including null.
 *
 * ## Example
 * ### With primitive type
 *
 * ```typescript
 * class Model {
 *    @Enum("value1", "value2")
 *    property: "value1" | "value2";
 * }
 * ```
 *
 * Will produce:
 *
 * ```json
 * {
 *   "type": "object",
 *   "properties": {
 *     "property": {
 *       "type": "string",
 *       "enum": ["value1", "value2"]
 *     }
 *   }
 * }
 * ```
 *
 * ### With array type
 *
 * ```typescript
 * class Model {
 *    @Enum("value1", "value2")
 *    property: ("value1" | "value2")[];
 * }
 * ```
 *
 * Will produce:
 *
 * ```json
 * {
 *   "type": "object",
 *   "properties": {
 *     "property": {
 *       "type": "array",
 *       "items": {
 *          "type": "string",
 *          "enum": ["value1", "value2"]
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * ### With Typescript Enum
 *
 * ```typescript
 * enum SomeEnum {
 *    ENUM_1 = "enum1",
 *    ENUM_2 = "enum2"
 * }
 *
 * class Model {
 *    @Enum(SomeEnum)
 *    property: SomeEnum;
 * }
 * ```
 *
 * Will produce:
 *
 * ```json
 * {
 *   "type": "object",
 *   "properties": {
 *     "property": {
 *        "type": "string",
 *        "enum": ["enum1", "enum2"]
 *     }
 *   }
 * }
 * ```
 *
 * @param {string | number | boolean | {}} enumValue
 * @param enumValues
 * @decorator
 * @ajv
 * @jsonMapper
 * @swagger
 * @schema
 * @propertyDecorator
 * @paramDecorator
 * @model
 */
function Enum(enumValue, ...enumValues) {
  return jsonEntityFn_1.JsonEntityFn((store) => {
    const values = [enumValue].concat(enumValues).reduce((acc, value) => {
      if (core_1.isObject(value)) {
        value = transformTsEnum(value);
      }
      return acc.concat(value);
    }, []);
    const types = values.reduce((set, value) => set.add(typeof value), new Set());
    store.itemSchema.enum(values).any(...types);
  });
}
exports.Enum = Enum;
//# sourceMappingURL=enum.js.map
