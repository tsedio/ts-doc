const DEFAULT_KEY = "$$default"
export class Symbols {
  #symbols: Map<string, Map<string, any>> = new Map();

  get size() {
    return this.#symbols.size
  }

  /**
   *
   * @param symbolName
   * @param file
   * @returns {*}
   */
  get(symbolName: string, file?: any) {
    if (!this.#symbols.has(symbolName)) {
      return undefined;
    }

    const item = this.#symbols.get(symbolName)

    if (item) {
      if (!file) {
        return item.get(DEFAULT_KEY);
      }

      return item.get(file);
    }
  }

  getAll(symbolName: string) {
    return this.#symbols.get(symbolName);
  }

  /**
   *
   * @param symbolName
   * @param file
   * @returns {boolean}
   */
  has(symbolName: string, file?: string) {
    if (this.#symbols.has(symbolName)) {
      if (file) {
        return this.#symbols.get(symbolName)!.has(file);
      }
      return true;
    }

    return false;
  }

  /**
   *
   */
  forEach(cb: (symbol: any, key: string) => void) {
    this.#symbols.forEach((m) => m.forEach((s: any, key: any) => {
      if (!key.includes(DEFAULT_KEY)) {
        cb(s, key);
      }
    }));
  }

  toArray() {
    const list: any = [];

    this.forEach((symbol: any) => list.push(symbol));

    return list;
  }

  /**
   *
   * @param symbol
   */
  push(symbol: any) {
    if (!this.has(symbol.symbolName)) {
      const map = new Map();
      map.set(symbol.file, symbol);
      map.set(DEFAULT_KEY, symbol);

      this.#symbols.set(symbol.symbolName, map);
      return symbol;
    }

    if (this.has(symbol.symbolName, symbol.file)) {
      const curSymbol = this.get(symbol.symbolName, symbol.file);
      curSymbol.merge(symbol);
      return curSymbol;
    }

    this.#symbols.get(symbol.symbolName)!.set(symbol.file, symbol);

    return symbol;
  }

  clear() {
    return this.#symbols.clear();
  }
}
