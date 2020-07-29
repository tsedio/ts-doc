"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonEntityFn_1 = require("./jsonEntityFn");
/**
 * Declare a new property on a model.
 *
 * @param type
 * @decorator
 * @ajv
 * @jsonMapper
 * @swagger
 * @schema
 * @propertyDecorator
 * @model
 */
function Property(type) {
    return jsonEntityFn_1.JsonEntityFn(store => {
        if (type) {
            store.itemSchema.type(type);
        }
    });
}
exports.Property = Property;
//# sourceMappingURL=property.js.map