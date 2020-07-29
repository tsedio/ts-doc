"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Proxy to avoid circular ref
 * @param target
 */
function getJsonEntityStore(target) {
    return require("../domain/JsonEntityStore").JsonEntityStore.from(target);
}
exports.getJsonEntityStore = getJsonEntityStore;
//# sourceMappingURL=getJsonEntityStore.js.map