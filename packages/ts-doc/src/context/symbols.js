const symbols = new Map();

module.exports = {
  /**
   *
   * @param symbolName
   * @param file
   * @returns {*}
   */
  get(symbolName, file) {
    if (!symbols.has(symbolName)) {
      return undefined;
    }

    if (!file) {
      return symbols.get(symbolName).defaultSymbol;
    }

    return symbols.get(symbolName).get(file);
  },

  getAll(symbolName) {
    return symbols.get(symbolName);
  },
  /**
   *
   * @param symbolName
   * @param file
   * @returns {boolean}
   */
  has(symbolName, file) {
    if (symbols.has(symbolName)) {
      if (file) {
        return symbols.get(symbolName).has(file);
      }
      return true;
    }

    return false;
  },
  /**
   *
   */
  forEach(cb) {
    symbols.forEach((m) => m.forEach((s, key) => cb(s, key)));
  },

  toArray() {
    const list = [];

    this.forEach((symbol) => list.push(symbol));

    return list;
  },
  /**
   *
   * @param symbol
   */
  push(symbol) {
    if (!module.exports.has(symbol.symbolName)) {
      const map = new Map();
      map.set(symbol.file, symbol);
      map.defaultSymbol = symbol;

      symbols.set(symbol.symbolName, map);
      return symbol;
    }

    if (module.exports.has(symbol.symbolName, symbol.file)) {
      const curSymbol = module.exports.get(symbol.symbolName, symbol.file);
      curSymbol.merge(symbol);
      return curSymbol;
    }

    symbols.get(symbol.symbolName).set(symbol.file, symbol);

    return symbol;
  },

  clear() {
    return symbols.clear();
  }
};
