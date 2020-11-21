"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
function toJsonRegex(pattern) {
  return String(pattern).replace(/^(\/)(.*)(\/)$/, "$2");
}
exports.toJsonRegex = toJsonRegex;
//# sourceMappingURL=toJsonRegex.js.map
