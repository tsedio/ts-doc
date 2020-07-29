"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@tsed/core");
const jsonEntityFn_1 = require("../common/jsonEntityFn");
/**
 * Set class path to expose all endpoints
 *
 * ::: warning
 * Don't use this decorator to change the path if you develop your application with Ts.ED.
 * :::
 *
 * @param path
 * @decorator
 * @swagger
 * @schema
 * @classDecorator
 * @operation
 */
function Path(path) {
    return jsonEntityFn_1.JsonEntityFn((store, args) => {
        if (store.decoratorType !== core_1.DecoratorTypes.CLASS) {
            throw new core_1.UnsupportedDecoratorType(Path, args);
        }
        store.path = path;
    });
}
exports.Path = Path;
//# sourceMappingURL=path.js.map