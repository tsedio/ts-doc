const context = require("./context");
module.exports = {
  /**
   *
   * @returns {any[]}
   */
  modules() {
    return Object.keys(context.modules).reduce((acc, key) => {
      const mods = context.modules[key];
      if (typeof mods === "string") {
        acc.push(mods);
      } else {
        Object.keys(mods).forEach((subKey) => {
          acc.push(mods[subKey]);
        });
      }
      return acc;
    }, []);
  }
};
