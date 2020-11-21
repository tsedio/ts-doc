const context = require("./context");
const find = (list, value) => {
  return [].concat(list).indexOf(value) > -1;
};
const rules = {
  module: (q, symbol) => find(q, symbol.module.docPath),
  symbolType: (q, symbol) => find(q, symbol.symbolType),
  symbolName: (q, symbol) => find(q, symbol.symbolName),
  label: (q, symbol) => symbol.labels.find((label) => find(q, label.key))
};

const findSymbols = (symbols, options) => {
  context.symbols.forEach((symbol) => {
    const keys = Object.keys(options);
    const result = keys.reduce((acc, key) => {
      if (options[key] !== undefined) {
        if (rules[key] && rules[key](options[key], symbol)) {
          return acc + 1;
        }
      }
      return acc;
    }, 0);

    if (result === keys.length) {
      symbols.push(symbol);
    }
  });
};

module.exports = {
  /**
   *
   */
  rules,
  /**
   *
   * @param options
   * @returns {any[]}
   */
  symbolsQuery(options) {
    let symbols = [];

    [].concat(options).forEach((options) => {
      findSymbols(symbols, options);
    });

    return symbols.sort((a, b) => {
      if (a.symbolName < b.symbolName) return -1;
      if (a.symbolName > b.symbolName) return 1;
      return 0;
    });
  }
};
