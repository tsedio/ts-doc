const context = require("./context");
/**
 *
 * @returns {Array}
 */
module.exports = {
  /**
   *
   * @returns {Array}
   */
  symbolStatus() {
    const list = [];
    Object.keys(context.status).forEach((k) => {
      list.push(context.status[k]);
    });

    return list;
  }
};
