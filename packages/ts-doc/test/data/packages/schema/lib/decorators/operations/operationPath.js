"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const core_1 = require("@tsed/core");
const jsonEntityFn_1 = require("../common/jsonEntityFn");
var OperationMethods;
(function (OperationMethods) {
  OperationMethods["ALL"] = "ALL";
  OperationMethods["GET"] = "GET";
  OperationMethods["POST"] = "POST";
  OperationMethods["PUT"] = "PUT";
  OperationMethods["PATCH"] = "PATCH";
  OperationMethods["HEAD"] = "HEAD";
  OperationMethods["DELETE"] = "DELETE";
  OperationMethods["OPTIONS"] = "OPTIONS";
  OperationMethods["CUSTOM"] = "CUSTOM";
})((OperationMethods = exports.OperationMethods || (exports.OperationMethods = {})));
/**
 * Declare new Operation with his path and http method.
 *
 * @param method
 * @param path
 * @decorator
 * @swagger
 * @schema
 * @methodDecorator
 * @operation
 */
function OperationPath(method, path = "/") {
  return jsonEntityFn_1.JsonEntityFn((store, args) => {
    if (store.decoratorType !== core_1.DecoratorTypes.METHOD) {
      throw new core_1.UnsupportedDecoratorType(OperationPath, args);
    }
    store.operation.addOperationPath(method.toUpperCase(), path);
  });
}
exports.OperationPath = OperationPath;
//# sourceMappingURL=operationPath.js.map
