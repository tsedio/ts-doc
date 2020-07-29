"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@tsed/core");
const jsonEntityFn_1 = require("../common/jsonEntityFn");
/**
 * Add a input parameter.
 *
 * ::: warning
 * Don't use decorator with Ts.ED application. Use @@BodyParams@@, @@PathParams@@, etc... instead.
 * :::
 *
 * @param inType
 * @decorator
 * @swagger
 * @schema
 * @paramDecorator
 * @operation
 */
function In(inType) {
    return jsonEntityFn_1.JsonEntityFn((store, args) => {
        if (store.decoratorType !== core_1.DecoratorTypes.PARAM) {
            throw new core_1.UnsupportedDecoratorType(In, args);
        }
        store.parameter.in(inType);
    });
}
exports.In = In;
//# sourceMappingURL=in.js.map