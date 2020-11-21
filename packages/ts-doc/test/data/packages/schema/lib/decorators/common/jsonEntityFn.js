"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const domain_1 = require("../../domain");
/**
 * Decorator util to compose another decorator. See @@Description@@ decorator implementation for more details.
 *
 * ## Usage
 *
 * ```typescript
 * export function Description(description: any) {
 *   return JsonEntityFn((entity: JsonEntityStore, args: DecoratorParameters) => {
 *       entity.itemSchema.description(description)
 *   });
 * }
 * ```
 *
 * @param fn
 * @decorator
 * @utils
 * @model
 */
function JsonEntityFn(fn) {
  return (...parameters) => {
    const result = fn(domain_1.JsonEntityStore.from(...parameters), parameters);
    if (typeof result === "function") {
      result(...parameters);
    }
  };
}
exports.JsonEntityFn = JsonEntityFn;
//# sourceMappingURL=jsonEntityFn.js.map
