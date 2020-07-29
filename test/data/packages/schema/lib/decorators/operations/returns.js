"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@tsed/core");
const httpStatusMessages_1 = require("../../constants/httpStatusMessages");
const JsonEntityStore_1 = require("../../domain/JsonEntityStore");
const JsonResponse_1 = require("../../domain/JsonResponse");
const JsonSchema_1 = require("../../domain/JsonSchema");
const isSuccessStatus_1 = require("../../utils/isSuccessStatus");
const mapHeaders_1 = require("../../utils/mapHeaders");
function initSchemaAction(ctx) {
    const { status, model, response, store, schema } = ctx;
    const operation = store.operation;
    const currentStatus = status || "default";
    ctx.response = operation.addResponse(currentStatus, response).getResponseOf(currentStatus);
    if (isSuccessStatus_1.isSuccessStatus(status) || currentStatus === "default") {
        if (model) {
            store.type = model;
        }
        ctx.response.$schema = ctx.response.$schema || store.schema;
    }
    else {
        ctx.response.$schema = new JsonSchema_1.JsonSchema({ type: model || String });
    }
    ctx.response.$schema.assign(schema || {});
}
function setContentTypeAction({ contentType, model, response, store }) {
    const operation = store.operation;
    if (!core_1.isPrimitiveOrPrimitiveClass(model)) {
        contentType = "text/json";
    }
    contentType && operation.addProduce(contentType);
    response.addContent(contentType || "*/*", store.schema);
}
function checkPrimitive(model) {
    if (core_1.isPrimitiveOrPrimitiveClass(model)) {
        throw new Error("Returns.Of cannot be used with the following primitive classes: String, Number, Boolean");
    }
}
function checkCollection(model) {
    if (core_1.isCollection(model)) {
        throw new Error("Returns.Nested cannot be used with the following classes: Map, Set, Array, String, Number, Boolean");
    }
}
/**
 * Add responses documentation for a specific status code.
 *
 * ::: tip
 * Returns decorator API in v5 is completely different. If you are on Ts.ED v5 checkout our v5 documentation instead.
 * :::
 *
 * ## Usage
 *
 * Ts.ED v6 API introducing the chaining decorator concept. Now a decorator like Returns can be used with another decorators like Description.
 *
 * ```typescript
 *  @Returns(404, String).Description("Not Found")
 *  @Returns(200, Model).Description("Success")
 *  async myMethod(): Promise<Model>  {
 *
 *  }
 * ```
 *
 * ::: tip
 * TypeScript and you IDE will discover automatically the chained decorators. But for more details you can look on @@ReturnsChainedDecorators@@, to now
 * what chained decorators are available under Returns decorator.
 * :::
 *
 * This example will produce this documentation in swagger:
 *
 * ```json
 * {
 *   "responses": {
 *     "404": {
 *       "description": "Description",
 *       "schema": {"type": "string"}
 *     },
 *     "2OO": {
 *       "description": "Description",
 *       "schema": {"$ref": "..."}
 *     }
 *   }
 * }
 * ```
 *
 * ## Declaring an Array
 *
 * The array declaration change in v6. Use chained decorators to declare an array with model.
 *
 * ```typescript
 *  @Returns(200, Array).Of(Model).Description("Success")
 *  async myMethod(): Promise<Model>  {
 *
 *  }
 * ```
 *
 * ### Declaring a generic model
 *
 * Something, it might be useful to use generic models. TypeScript doesn't store the generic type in the metadata. This is why we need to
 * declare explicitly the generic models with the decorators.
 *
 * One of the generic's usage, can be a list pagination. With Ts.ED v6 it's now possible to declare generic and generate the appropriate Open Spec.
 *
 * Starting with the pagination model. By using @@Generics@@ and @@CollectionOf@@.
 *
 * ```typescript
 * @Generics("T")
 * class Pagination<T> {
 *  @CollectionOf("T")
 *  data: T[];
 *
 *  @Property()
 *  totalCount: number;
 * }
 * ```
 *
 * Now, we need a model to use it with the generic Pagination model:
 *
 * ```typescript
 * class Product {
 *  @Property()
 *  id: string;
 *
 *  @Property()
 *  title: string;
 * }
 * ```
 *
 * Finally, we can use our models on a method as following:
 *
 * ```typescript
 * class Controller {
 *   @OperationPath("POST", "/")
 *   @Returns(200, Pagination).Of(Product).Description("description")
 *   async method(): Promise<Pagination<Product> | null> {
 *     return null;
 *   }
 * }
 * ```
 *
 * ### Declaring a nested generics models
 *
 * It's also possible to declare a nested generics models in order to have `Pagination<Submission<Product>>`:
 *
 * ```typescript
 * class Controller {
 *   @OperationPath("POST", "/")
 *   @Returns(200, Pagination).Of(Submission).Nested(Product).Description("description")
 *   async method(): Promise<Pagination<Submission<Product>> | null> {
 *     return null;
 *   }
 * }
 * ```
 *
 * And here is the Submission model:
 *
 * ```typescript
 * @Generics("T")
 * class Submission<T> {
 *   @Property()
 *   _id: string;
 *   @Property("T")
 *   data: T;
 * }
 * ```
 *
 * @param status
 * @param model
 * @decorator
 * @swagger
 * @schema
 * @methodDecorator
 * @operation
 */
function Returns(status, model) {
    const response = new JsonResponse_1.JsonResponse();
    const schema = {};
    let contentType;
    if (status && httpStatusMessages_1.HTTP_STATUS_MESSAGES[status]) {
        response.description(httpStatusMessages_1.HTTP_STATUS_MESSAGES[status]);
    }
    const actions = [initSchemaAction, setContentTypeAction];
    const decorator = (...args) => {
        const type = core_1.getDecoratorType(args, true);
        if (type === core_1.DecoratorTypes.METHOD) {
            const store = JsonEntityStore_1.JsonEntityStore.from(...args);
            if (store.operation) {
                const ctx = { status, contentType, response, model, store, schema };
                actions.forEach((action) => {
                    action(ctx);
                });
            }
        }
        else {
            throw new core_1.UnsupportedDecoratorType(Returns, args);
        }
    };
    decorator.Headers = (headers) => {
        response.headers({
            ...(response.get("headers") || {}),
            ...mapHeaders_1.mapHeaders(headers)
        });
        return decorator;
    };
    decorator.Header = (key, value) => {
        decorator.Headers({
            [key]: value
        });
        return decorator;
    };
    decorator.ContentType = (value) => {
        contentType = value;
        return decorator;
    };
    decorator.Description = (description) => {
        response.description(description);
        return decorator;
    };
    decorator.Examples = (examples) => {
        response.set("examples", core_1.isString(examples) ? [examples] : examples);
        return decorator;
    };
    decorator.Type = (type) => {
        model = type;
        return decorator;
    };
    decorator.Of = (...types) => {
        checkPrimitive(model);
        actions.push(ctx => {
            const { store } = ctx;
            if (core_1.isCollection(model)) {
                // @ts-ignore
                store._type = types[0];
                store.itemSchema.assign({ type: types[0] });
            }
            else {
                store.nestedGenerics.push(types);
            }
        });
        return decorator;
    };
    decorator.Nested = (...generics) => {
        checkPrimitive(model);
        checkCollection(model);
        actions.push(ctx => {
            const { store } = ctx;
            store.nestedGenerics.push(generics);
        });
        return decorator;
    };
    decorator.Schema = (input) => {
        core_1.deepExtends(schema, input);
        return decorator;
    };
    decorator.Status = (code) => {
        status = code;
        return decorator;
    };
    return decorator;
}
exports.Returns = Returns;
//# sourceMappingURL=returns.js.map