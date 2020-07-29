"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@tsed/core");
const jsonEntityFn_1 = require("../common/jsonEntityFn");
/**
 * Add consumes metadata on the decorated element.
 *
 * ## Examples
 *
 * ```typescript
 * class Model {
 *    @Consumes("application/x-www-form-urlencoded")
 *    id: string;
 * }
 * ```
 *
 * @param consumes
 * @decorator
 * @swagger
 * @schema
 * @methodDecorator
 * @classDecorator
 * @operation
 */
function Consumes(...consumes) {
    return jsonEntityFn_1.JsonEntityFn((store, args) => {
        switch (store.decoratorType) {
            case core_1.DecoratorTypes.METHOD:
                store.operation.consumes(consumes);
                break;
            case core_1.DecoratorTypes.CLASS:
                core_1.decorateMethodsOf(args[0], Consumes(...consumes));
                break;
            default:
                throw new core_1.UnsupportedDecoratorType(Consumes, args);
        }
    });
}
exports.Consumes = Consumes;
//# sourceMappingURL=consumes.js.map