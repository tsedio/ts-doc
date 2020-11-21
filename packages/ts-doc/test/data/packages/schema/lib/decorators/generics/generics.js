"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const JsonEntityStore_1 = require("../../domain/JsonEntityStore");
/**
 * Define generics list. This list is used by @@GenericOf@@ and the @@getJsonSchema@@ function to build the correct JsonSchema.
 *
 * See @@GenericOf@@ decorator for more details.
 *
 * @param generics
 * @decorator
 * @ajv
 * @jsonMapper
 * @swagger
 * @schema
 * @propertyDecorator
 * @paramDecorator
 * @model
 */
function Generics(...generics) {
  return (target) => {
    const storedSchema = JsonEntityStore_1.JsonEntityStore.from(target);
    storedSchema.schema.genericLabels = generics;
  };
}
exports.Generics = Generics;
//# sourceMappingURL=generics.js.map
