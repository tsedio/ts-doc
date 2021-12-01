import {context} from "./context";
import {DocSymbol} from "../models/DocSymbol";

const find = (list: any[], value: any) => {
  return ([] as any[]).concat(list).indexOf(value) > -1;
};

export const rules: Record<string, any> = {
  module: (q: any[], symbol: DocSymbol) => find(q, symbol.module.docPath),
  symbolType: (q: any[], symbol: DocSymbol) => find(q, symbol.symbolType),
  symbolName: (q: any[], symbol: DocSymbol) => find(q, symbol.symbolName),
  label: (q: any[], symbol: DocSymbol) => symbol.labels.find((label: any) => find(q, label.key))
};

export const findSymbols = (symbols: DocSymbol[], options: any) => {
  context.symbols.forEach((symbol: any) => {
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

/**
 *
 * @param options
 * @returns {any[]}
 */
export function symbolsQuery(options: any) {
  let symbols: DocSymbol[] = [];

  [].concat(options).forEach((options) => {
    findSymbols(symbols, options);
  });

  return symbols.sort((a, b) => {
    if (a.symbolName < b.symbolName) return -1;
    if (a.symbolName > b.symbolName) return 1;
    return 0;
  });
}
