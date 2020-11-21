"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const core_1 = require("@tsed/core");
const getJsonEntityStore_1 = require("./getJsonEntityStore");
/**
 * Return store and his inherited stores
 * @param target
 */
function getInheritedStores(target) {
  const store = target.isStore ? target : getJsonEntityStore_1.getJsonEntityStore(target);
  if (!store.$inherited) {
    store.$inherited = core_1
      .ancestorsOf(store.target)
      .reverse()
      .reduce((context, model) => {
        return context.set(model, getJsonEntityStore_1.getJsonEntityStore(model));
      }, new Map());
  }
  return store.$inherited;
}
exports.getInheritedStores = getInheritedStores;
//# sourceMappingURL=getInheritedStores.js.map
