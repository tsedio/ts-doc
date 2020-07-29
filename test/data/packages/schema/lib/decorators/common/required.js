"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@tsed/core");
const allow_1 = require("./allow");
const jsonEntityFn_1 = require("./jsonEntityFn");
const property_1 = require("./property");
/**
 * Add required annotation for a function argument.
 *
 * The @Required decorator can be used on two cases.
 *
 * To decorate a parameters:
 *
 * ```typescript
 * @Post("/")
 * async method(@Required() @BodyParams("field") field: string) {}
 * ```
 *
 * To decorate a model:
 *
 * ```typescript
 * class Model {
 *   @Required()
 *   field: string;
 * }
 * ```
 *
 * > Required will throw a BadRequest when the given value is `null`, an empty string or `undefined`.
 *
 * ### Allow a values
 *
 * In some case, you didn't want trigger a BadRequest when the value is an empty string for example.
 * The decorator `@Allow()`, allow you to configure a value list for which there will be no exception.
 *
 * ```typescript
 * class Model {
 *   @Allow("") // add automatically required flag
 *   field: string;
 * }
 * ```
 *
 * @decorator
 * @ajv
 * @jsonMapper
 * @swagger
 * @schema
 * @propertyDecorator
 * @paramDecorator
 * @model
 */
function Required(required = true, ...allowedRequiredValues) {
    return core_1.applyDecorators(property_1.Property(), required && allow_1.Allow(allowedRequiredValues), jsonEntityFn_1.JsonEntityFn((store, args) => {
        switch (store.decoratorType) {
            case core_1.DecoratorTypes.PARAM:
                store.parameter.required(required);
                break;
            case core_1.DecoratorTypes.PROP:
                required ? store.parentSchema.addRequired(store.propertyName) : store.parentSchema.removeRequired(store.propertyName);
                break;
            default:
                throw new core_1.UnsupportedDecoratorType(Required, args);
        }
    }));
}
exports.Required = Required;
//# sourceMappingURL=required.js.map