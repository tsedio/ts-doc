"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@tsed/core");
function getComputedType(target) {
    if (core_1.isPromise(target)) {
        return Object;
    }
    if (core_1.isClass(target) ||
        core_1.isSymbol(target) ||
        core_1.isPrimitiveOrPrimitiveClass(target) ||
        core_1.isClassObject(target) ||
        core_1.isDate(target) ||
        core_1.isCollection(target)) {
        return core_1.classOf(target);
    }
    if (core_1.isArrowFn(target)) {
        return target();
    }
    return target;
}
exports.getComputedType = getComputedType;
//# sourceMappingURL=getComputedType.js.map