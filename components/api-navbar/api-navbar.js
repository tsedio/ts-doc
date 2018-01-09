const { symbolTypes, symbolStatus } = require("../../lib/context");

module.exports = {
  name: "apiNavbar",
  trim: true,
  method() {
    return {
      types: symbolTypes(),
      status: symbolStatus()
    };
  }
};