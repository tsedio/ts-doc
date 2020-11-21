"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const core_1 = require("@tsed/core");
const jsonEntityFn_1 = require("./jsonEntityFn");
/**
 * Add a description to the class, method or property
 *
 * ## Examples
 * ### On class
 *
 * ```typescript
 * @Description("description")
 * class Model {
 *
 * }
 * ```
 *
 * ### On method
 *
 * ```typescript
 * @Controller("/")
 * class ModelCtrl {
 *    @Description("description")
 *    async method() {}
 * }
 * ```
 *
 * ### On parameter
 *
 * ```typescript
 * @Controller("/")
 * class ModelCtrl {
 *    async method(@Description("description") @PathParam("id") id: string) {}
 * }
 * ```
 *
 * ### On property
 *
 * ```typescript
 * class Model {
 *    @Description("description")
 *    id: string;
 * }
 * ```
 *
 * @param {string} description
 * @decorator
 * @ajv
 * @jsonMapper
 * @swagger
 * @schema
 * @propertyDecorator
 * @paramDecorator
 * @classDecorator
 * @methodDecorator
 * @model
 */
function Description(description) {
  return jsonEntityFn_1.JsonEntityFn((store, args) => {
    var _a, _b;
    switch (core_1.getDecoratorType(args, true)) {
      case core_1.DecoratorTypes.PROP:
      case core_1.DecoratorTypes.CLASS:
        store.schema.description(description);
        break;
      case core_1.DecoratorTypes.PARAM:
        (_a = store.parameter) === null || _a === void 0 ? void 0 : _a.description(description);
        break;
      case core_1.DecoratorTypes.METHOD:
        (_b = store.operation) === null || _b === void 0 ? void 0 : _b.description(description);
        break;
      default:
        throw new core_1.UnsupportedDecoratorType(Description, args);
    }
  });
}
exports.Description = Description;
//# sourceMappingURL=description.js.map
