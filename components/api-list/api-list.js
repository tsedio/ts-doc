const { symbolsQuery } = require("../../lib/context");

module.exports = {
  name: "apiList",
  trim: true,
  /**
   *
   * @param query
   * @returns {{symbols: Array, mapSymbolInfo: module.exports.mapSymbolInfo}}
   */
  method(query) {
    return {
      apiSymbols: symbolsQuery(query)
    };
  }
};