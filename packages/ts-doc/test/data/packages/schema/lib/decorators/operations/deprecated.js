"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const core_1 = require("@tsed/core");
const jsonEntityFn_1 = require("../common/jsonEntityFn");
/**
 * Add deprecated metadata on the decorated element.
 *
 * ## Examples
 *
 * ```typescript
 *
 * @Deprecated()
 * class MyCtrl {
 *   @Deprecated()
 *   @Get("/")
 *   method(){
 *   }
 * }
 * ```
 *
 * @param deprecated
 * @decorator
 * @swagger
 * @schema
 * @methodDecorator
 * @classDecorator
 */
function Deprecated(deprecated = true) {
  return jsonEntityFn_1.JsonEntityFn((store, args) => {
    switch (store.decoratorType) {
      case core_1.DecoratorTypes.METHOD:
        store.operation.deprecated(deprecated);
        break;
      case core_1.DecoratorTypes.CLASS:
        core_1.decorateMethodsOf(args[0], Deprecated(deprecated));
        break;
      default:
        throw new core_1.UnsupportedDecoratorType(Deprecated, args);
    }
  });
}
exports.Deprecated = Deprecated;
//# sourceMappingURL=deprecated.js.map
