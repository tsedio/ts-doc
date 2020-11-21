"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const jsonEntityFn_1 = require("./jsonEntityFn");
/**
 * Accept unknown properties on the deserialized model
 * @param bool
 * @decorator
 * @ajv
 * @swagger
 * @schema
 * @jsonMapper
 * @propertyDecorator
 * @classDecorator
 * @model
 */
function AdditionalProperties(bool) {
  return jsonEntityFn_1.JsonEntityFn((entity, parameters) => {
    entity.itemSchema.additionalProperties(bool);
  });
}
exports.AdditionalProperties = AdditionalProperties;
//# sourceMappingURL=additionalProperties.js.map
