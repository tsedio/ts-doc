const { symbolTypes, symbolStatus, modules, symbolOf, mapSymbolInfo } = require("../../lib/context");

module.exports = {
  name: "apiSearch",
  trim: true,
  method() {
    return {
      route: "api/index",
      types: symbolTypes(),
      status: symbolStatus()
    };
  }
};