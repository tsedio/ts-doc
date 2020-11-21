"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const core_1 = require("@tsed/core");
const jsonEntityFn_1 = require("../common/jsonEntityFn");
/**
 * Add produces metadata on the decorated element.
 *
 * ## Examples
 * ### On method
 *
 * ```typescript
 * class Model {
 *    @Produces("text/html")
 *    id: string;
 * }
 * ```
 *
 * ::: warning
 * For openspec v3 prefer `@Returns().ContentType()` usage (see @@Returns@@).
 * :::
 *
 * @param produces
 * @decorator
 * @swagger
 * @schema
 * @methodDecorator
 * @classDecorator
 * @operation
 */
function Produces(...produces) {
  return jsonEntityFn_1.JsonEntityFn((store, args) => {
    switch (store.decoratorType) {
      case core_1.DecoratorTypes.METHOD:
        store.operation.produces(produces);
        break;
      case core_1.DecoratorTypes.CLASS:
        core_1.decorateMethodsOf(args[0], Produces(...produces));
        break;
      default:
        throw new core_1.UnsupportedDecoratorType(Produces, args);
    }
  });
}
exports.Produces = Produces;
//# sourceMappingURL=produces.js.map
