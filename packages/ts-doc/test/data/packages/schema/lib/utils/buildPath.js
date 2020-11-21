"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
/**
 * Return a sanitized path
 * @param path
 */
function buildPath(path) {
  return path.split("/").filter(Boolean).join("/");
}
exports.buildPath = buildPath;
//# sourceMappingURL=buildPath.js.map
