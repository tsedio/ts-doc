const context = require("./context");
/**
 *
 * @returns {Array}
 */
module.exports = {
  symbolTypes() {
    const list = [];
    Object.keys(context.symbolTypes)
      .filter(key => key.length === 1)
      .sort()
      .forEach((k) => {
        list.push(context.symbolTypes[k]);
      });

    return list;
  }
};