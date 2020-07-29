"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonEntityFn_1 = require("./jsonEntityFn");
/**
 * Add title metadata on the decorated element.
 *
 * ## Example
 *
 * ```typescript
 * class Model {
 *    @Title("title")
 *    id: string;
 * }
 * ```
 *
 * Will produce:
 *
 * ```json
 * {
 *   "type": "object",
 *   "properties": {
 *     "id": {
 *        "type": "string",
 *        "title": "title"
 *     }
 *   }
 * }
 * ```
 *
 * @param {string} title
 * @decorator
 * @ajv
 * @jsonMapper
 * @swagger
 * @schema
 * @propertyDecorator
 * @paramDecorator
 * @model
 */
function Title(title) {
    return jsonEntityFn_1.JsonEntityFn((entity) => {
        entity.schema.title(title);
    });
}
exports.Title = Title;
//# sourceMappingURL=title.js.map