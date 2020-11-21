"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const core_1 = require("@tsed/core");
const jsonEntityFn_1 = require("./jsonEntityFn");
/**
 * Add a name metadata on the decorated element.
 *
 * ## Examples
 * ### On parameters
 *
 * ```typescript
 * async myMethod(@Name("nameOf") @PathParams("id") id: string): Promise<Model>  {
 *
 * }
 * ```
 *
 * ### On parameters
 *
 * ```typescript
 * @Name("AliasName")
 * @Controller("/")
 * class ModelCtrl {
 *
 * }
 * ```
 *
 * @param name
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
function Name(name) {
  return jsonEntityFn_1.JsonEntityFn((store, args) => {
    switch (core_1.decoratorTypeOf(args)) {
      case core_1.DecoratorTypes.CLASS:
        store.schema.name(name);
        break;
      case core_1.DecoratorTypes.PARAM:
        store.parameter.name(name);
        break;
      default:
        store.parent.schema.addAlias(args[1], name);
    }
  });
}
exports.Name = Name;
//# sourceMappingURL=name.js.map
