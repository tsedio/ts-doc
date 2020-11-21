"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const concatParameters_1 = require("./concatParameters");
const getJsonPathParameters_1 = require("./getJsonPathParameters");
function mergeOperation(obj, operation, {rootPath, operationId, defaultTags, tags, path, method}) {
  return getJsonPathParameters_1.getJsonPathParameters(rootPath, path).reduce((obj, {path, parameters}) => {
    var _a;
    parameters = concatParameters_1.concatParameters(parameters, operation);
    path = !!path ? path : "/";
    const operationTags = ((_a = operation.tags) === null || _a === void 0 ? void 0 : _a.length) ? operation.tags : [defaultTags];
    obj.paths[path] = {
      ...obj.paths[path],
      [method.toLowerCase()]: {
        operationId: operation.operationId || operationId(path),
        ...operation,
        tags: operationTags.map(({name}) => name),
        parameters
      }
    };
    tags.push(...operationTags);
    return obj;
  }, obj);
}
exports.mergeOperation = mergeOperation;
//# sourceMappingURL=mergeOperation.js.map
