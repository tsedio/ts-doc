"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const core_1 = require("@tsed/core");
const jsonEntityFn_1 = require("../common/jsonEntityFn");
/**
 * Set a swagger operationId explicitly.
 *
 * @param operationId
 * @decorator
 * @swagger
 * @schema
 * @methodDecorator
 * @operation
 */
function OperationId(operationId) {
  return jsonEntityFn_1.JsonEntityFn((store, args) => {
    if (store.decoratorType !== core_1.DecoratorTypes.METHOD) {
      throw new core_1.UnsupportedDecoratorType(OperationId, args);
    }
    store.operation.operationId(operationId);
  });
}
exports.OperationId = OperationId;
//# sourceMappingURL=operationId.js.map
