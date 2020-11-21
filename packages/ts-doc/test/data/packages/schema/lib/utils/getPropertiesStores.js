"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const getInheritedStores_1 = require("./getInheritedStores");
const getJsonEntityStore_1 = require("./getJsonEntityStore");
/**
 * Return the list of properties including properties from inherited classes
 * @param target
 */
function getPropertiesStores(target) {
  const store = target.isStore ? target : getJsonEntityStore_1.getJsonEntityStore(target);
  if (!store.$properties) {
    const stores = getInheritedStores_1.getInheritedStores(store);
    store.$properties = new Map();
    stores.forEach((currentStore) => {
      currentStore.children.forEach((propStore) => {
        if (!store.$properties.has(propStore.propertyKey)) {
          store.$properties.set(propStore.propertyKey, propStore);
        }
      });
    });
  }
  return store.$properties;
}
exports.getPropertiesStores = getPropertiesStores;
//# sourceMappingURL=getPropertiesStores.js.map
