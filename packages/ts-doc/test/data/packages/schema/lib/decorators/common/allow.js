"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const core_1 = require("@tsed/core");
const jsonEntityFn_1 = require("./jsonEntityFn");
function applyStringRule(store, values) {
  if (store.type === String) {
    if (!values.includes("")) {
      // Disallow empty string
      (!store.schema.has("minLength") || store.schema.get("minLength") === 0) && store.schema.minLength(1);
    } else {
      store.schema.delete("minLength");
    }
  }
}
function applyNullRule(store, values) {
  if (values.includes(null)) {
    if (store.schema.isClass) {
      const properties = store.parent.schema.get("properties");
      if (properties && properties[store.propertyKey]) {
        const propSchema = properties[store.propertyKey];
        properties[store.propertyKey] = {
          oneOf: [
            {
              type: "null"
            },
            propSchema
          ]
        };
      }
    } else {
      store.schema.addTypes("null");
    }
  }
}
/**
 * Add allowed values when the property or parameters is required.
 *
 * #### Example on parameter:
 *
 * ```typescript
 * @Post("/")
 * async method(@Allow("") @BodyParams("field") field: string) {}
 * ```
 * > Required will throw a BadRequest when the given value is `null` or `undefined` but not for an empty string.
 *
 * #### Example on model:
 *
 * ```typescript
 * class Model {
 *   @Allow("")
 *   field: string;
 * }
 * ```
 *
 * @returns {Function}
 * @decorator
 * @ajv
 * @jsonMapper
 * @swagger
 * @schema
 * @propertyDecorator
 * @paramDecorator
 * @model
 */
function Allow(...values) {
  return core_1.applyDecorators(
    jsonEntityFn_1.JsonEntityFn((store, args) => {
      switch (store.decoratorType) {
        case core_1.DecoratorTypes.PARAM:
          store.parameter.required(true);
          applyStringRule(store, values);
          applyNullRule(store, values);
          break;
        case core_1.DecoratorTypes.PROP:
          store.parentSchema.addRequired(store.propertyName);
          applyStringRule(store, values);
          applyNullRule(store, values);
          break;
        default:
          throw new core_1.UnsupportedDecoratorType(Allow, args);
      }
    })
  );
}
exports.Allow = Allow;
//# sourceMappingURL=allow.js.map
