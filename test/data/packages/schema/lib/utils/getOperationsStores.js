"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getInheritedStores_1 = require("./getInheritedStores");
const getJsonEntityStore_1 = require("./getJsonEntityStore");
function getOperationsStores(target) {
    const store = target.isStore ? target : getJsonEntityStore_1.getJsonEntityStore(target);
    if (!store.$operations) {
        const stores = getInheritedStores_1.getInheritedStores(store);
        store.$operations = new Map();
        stores.forEach(currentStore => {
            currentStore.children.forEach(propStore => {
                if (propStore.operation && !store.$operations.has(propStore.propertyKey)) {
                    store.$operations.set(propStore.propertyKey, propStore);
                }
            });
        });
    }
    return store.$operations;
}
exports.getOperationsStores = getOperationsStores;
//# sourceMappingURL=getOperationsStores.js.map