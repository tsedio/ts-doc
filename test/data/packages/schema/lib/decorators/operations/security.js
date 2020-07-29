"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@tsed/core");
const jsonEntityFn_1 = require("../common/jsonEntityFn");
/**
 * Add security metadata on the decorated method.
 *
 * ## Examples
 * ### On method
 *
 * ```typescript
 * @Controller("/")
 * class ModelCtrl {
 *    @Security("write:calendars")
 *    async method() {}
 * }
 * ```
 *
 * @param name
 * @param scopes
 * @decorator
 * @swagger
 * @schema
 * @methodDecorator
 * @classDecorator
 * @operation
 */
function Security(name, ...scopes) {
    return jsonEntityFn_1.JsonEntityFn((store, args) => {
        switch (store.decoratorType) {
            case core_1.DecoratorTypes.METHOD:
                store.operation.addSecurityScopes(name, scopes);
                break;
            case core_1.DecoratorTypes.CLASS:
                core_1.decorateMethodsOf(args[0], Security(name, ...scopes));
                break;
            default:
                throw new core_1.UnsupportedDecoratorType(Security, args);
        }
    });
}
exports.Security = Security;
//# sourceMappingURL=security.js.map