"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsonEntityStore_1 = require("../../domain/JsonEntityStore");
/**
 * Declare a new JsonEntityStore class for a specific decorator type.
 *
 * @ignore
 * @param type
 * @decorator
 */
function JsonEntityComponent(type) {
    return (target) => {
        JsonEntityStore_1.JsonEntityStore.entities.set(type, target);
    };
}
exports.JsonEntityComponent = JsonEntityComponent;
//# sourceMappingURL=jsonEntityComponent.js.map