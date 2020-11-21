"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const change_case_1 = require("change-case");
function operationIdFormatter(pattern = "%c.%m") {
  const OPERATION_IDS = new Map();
  return (name, propertyKey, path = "") => {
    const operationId = change_case_1.camelCase(pattern.replace(/%c/, name).replace(/%m/, propertyKey));
    const operationKey = name + propertyKey;
    if (!OPERATION_IDS.has(operationKey)) {
      OPERATION_IDS.set(operationKey, 0);
      return operationId;
    }
    // try with paths
    const result = path.match(/{(\w+)}/gi);
    if (result) {
      const operationKey = name + propertyKey + result[0];
      if (!OPERATION_IDS.has(operationKey)) {
        OPERATION_IDS.set(operationKey, 0);
        return change_case_1.camelCase(`${operationId} By ${result}`);
      }
    }
    const id = OPERATION_IDS.get(operationKey) + 1;
    OPERATION_IDS.set(operationKey, id);
    return `${operationId}_${id}`;
  };
}
exports.operationIdFormatter = operationIdFormatter;
//# sourceMappingURL=operationIdFormatter.js.map
