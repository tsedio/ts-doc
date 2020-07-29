"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@tsed/core");
const jsonEntityFn_1 = require("../common/jsonEntityFn");
function mapTags(tags) {
    return tags.map((tag) => {
        if (typeof tag === "string") {
            return {
                name: tag
            };
        }
        return tag;
    });
}
/**
 * Add tags metadata on the decorated element.
 *
 * ## Examples
 * ### On method
 *
 * ```typescript
 * @Controller("/")
 * class MyController {
 *  @Tags("api")
 *  get() {}
 * }
 * ```
 *
 * @param tags
 * @decorator
 * @swagger
 * @schema
 * @methodDecorator
 * @classDecorator
 * @operation
 */
function Tags(...tags) {
    return jsonEntityFn_1.JsonEntityFn((store, args) => {
        switch (store.decoratorType) {
            case core_1.DecoratorTypes.METHOD:
                store.operation.addTags(mapTags(tags));
                break;
            case core_1.DecoratorTypes.CLASS:
                core_1.decorateMethodsOf(args[0], Tags(...tags));
                break;
            default:
                throw new core_1.UnsupportedDecoratorType(Tags, args);
        }
    });
}
exports.Tags = Tags;
//# sourceMappingURL=tags.js.map