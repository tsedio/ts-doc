const context = require("./context");
module.exports = {
  /**
   *
   * @returns {any[]}
   */
  modules() {
    return Object.keys(context.modules).map(key => context.modules[key]);
  }
};