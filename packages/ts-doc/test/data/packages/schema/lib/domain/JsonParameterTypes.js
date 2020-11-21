"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var JsonParameterTypes;
(function (JsonParameterTypes) {
  JsonParameterTypes["BODY"] = "body";
  JsonParameterTypes["PATH"] = "path";
  JsonParameterTypes["QUERY"] = "query";
  JsonParameterTypes["HEADER"] = "header";
  JsonParameterTypes["COOKIES"] = "cookies";
})((JsonParameterTypes = exports.JsonParameterTypes || (exports.JsonParameterTypes = {})));
function isParameterType(type) {
  return Object.values(JsonParameterTypes).includes(String(type).toLowerCase());
}
exports.isParameterType = isParameterType;
//# sourceMappingURL=JsonParameterTypes.js.map
