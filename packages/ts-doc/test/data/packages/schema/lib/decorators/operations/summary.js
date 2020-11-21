"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const core_1 = require("@tsed/core");
const jsonEntityFn_1 = require("../common/jsonEntityFn");
/**
 * Add summary metadata on the decorated element.
 *
 * ## Examples
 * ### On method
 *
 * ```typescript
 * class Model {
 *    @Summary("summary")
 *    id: string;
 * }
 * ```
 *
 * @param summary
 * @decorator
 * @swagger
 * @schema
 * @methodDecorator
 * @operation
 */
function Summary(summary) {
  return jsonEntityFn_1.JsonEntityFn((store, args) => {
    if (store.decoratorType !== core_1.DecoratorTypes.METHOD) {
      throw new core_1.UnsupportedDecoratorType(Summary, args);
    }
    store.operation.summary(summary);
  });
}
exports.Summary = Summary;
//# sourceMappingURL=summary.js.map
