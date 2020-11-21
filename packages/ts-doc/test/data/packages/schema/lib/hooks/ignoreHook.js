"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
function alterIgnore(schema, options) {
  var _a;
  return (_a = schema === null || schema === void 0 ? void 0 : schema.$hooks) === null || _a === void 0
    ? void 0
    : _a.alter("ignore", false, [options]);
}
exports.alterIgnore = alterIgnore;
//# sourceMappingURL=ignoreHook.js.map
