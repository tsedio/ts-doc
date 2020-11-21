"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
/**
 * Map input header to a standard open spec header
 * @param headers
 */
function mapHeaders(headers) {
  return Object.keys(headers).reduce((newHeaders, key) => {
    const value = headers[key];
    let type = typeof value;
    let options = {
      example: value
    };
    if (type === "object") {
      options = value;
      options.example = options.value === undefined ? options.example : options.value;
      delete options.value;
      type = typeof options.example;
    }
    options.type = options.type || type;
    newHeaders[key] = options;
    return newHeaders;
  }, {});
}
exports.mapHeaders = mapHeaders;
//# sourceMappingURL=mapHeaders.js.map
