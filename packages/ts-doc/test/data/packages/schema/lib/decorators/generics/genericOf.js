"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const JsonEntityStore_1 = require("../../domain/JsonEntityStore");
/**
 * Set the types of a Generic class.
 *
 * ## Example
 *
 * ```typescript
 * class Product {
 *   @Property()
 *   label: string;
 * }
 *
 * @Generics("T")
 * class Paginated<T> {
 *   @CollectionOf("T")
 *   data: T[];
 *
 *   @Property()
 *   totalCount: number;
 * }
 *
 * class Payload {
 *    @GenericOf(Product)
 *    products: Paginated<Product>;
 * }
 * ```
 *
 * ## Example with nested generics
 *
 * ```typescript
 * class Product {
 *   @Property()
 *   label: string;
 * }
 *
 * @Generics("T")
 * class Paginated<T> {
 *   @CollectionOf("T")
 *   data: T[];
 *
 *   @Property()
 *   totalCount: number;
 * }
 *
 * @Generics("D")
 * class Submission<D> {
 *   @Property()
 *   _id: string;
 *
 *   @Property("D")
 *   data: D;
 * }
 *
 * class Payload {
 *    @GenericOf(Submissions).Nested(Product)
 *    submissions: Paginated<Submission<Product>>;
 * }
 * ```
 *
 * @param {Type<any>[]} generics
 * @decorator
 * @ajv
 * @jsonMapper
 * @swagger
 * @schema
 * @propertyDecorator
 * @paramDecorator
 * @model
 */
function GenericOf(...generics) {
  const nestedGenerics = [generics];
  const decorator = (...args) => {
    const store = JsonEntityStore_1.JsonEntityStore.from(...args);
    store.nestedGenerics = nestedGenerics;
  };
  decorator.Nested = (...generics) => {
    nestedGenerics.push(generics);
    return decorator;
  };
  return decorator;
}
exports.GenericOf = GenericOf;
//# sourceMappingURL=genericOf.js.map
