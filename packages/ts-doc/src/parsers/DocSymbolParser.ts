import {DocSymbol} from "../models/DocSymbol";
import {descriptionParser} from "./description-parser";
import {context} from "../context";

export class DocSymbolParser {
  description: { content: string, labels: { value: string, key: string }[] };
  symbol: DocSymbol;

  constructor(public line: string, description: string) {
    this.line = line;

    this.description = descriptionParser(description);
    this.symbol = new DocSymbol();

    this.symbol.description = this.description.content;
    this.symbol.labels = this.symbol.labels.concat(this.description.labels);
  }

  parse() {
    try {
      if (this.line.match(/class |interface |enum /)) {
        this.parseClass();
      } else {
        this.parseOtherSymbol();
      }
    } catch (er) {
      console.error(this.line, er);
    }

    return this.symbol;
  }

  /**
   *
   */
  parseClass() {
    let line = this.line
      .split(" ")
      .filter((word, index, map) => this.parseKeyword(word, index, map))
      .join(" ");

    this.symbol.implements = line
      .replace("implements ", "")
      .replace("{", "")
      .trim()
      .split(" ")
      .filter((o: any) => o !== "")
      .filter((o: any) => !o.match(">"))
      .filter((o: any) => !o.match(">"))
      .map((o: any) => o.split("<")[0])
      .filter((o: any) => o !== this.symbol.symbolName);
  }

  /**
   *
   */
  parseOtherSymbol() {
    this.line = this.line.replace(/^export /, "");

    const {symbol, line} = this;
    symbol.exported = true;

    const isFunction = line.match(/^function (\w+)\(|^const (\w+): \(/);
    const matched = line.match(/^(\w+) (\w+)/);

    if (matched) {
      if (isFunction) {
        symbol.symbolType = "function";

        if (symbol.labels.find((item: any) => item.key === "decorator")) {
          symbol.symbolType = "decorator";
        }
      } else {
        symbol.symbolType = matched[1];
      }

      symbol.symbolName = matched[2];

      try {
        symbol.symbolLabel = context.symbolTypes[symbol.symbolType].label;
        symbol.symbolCode = context.symbolTypes[symbol.symbolType].code;
      } catch (er) {
        console.error("====> Symbol", this.symbol.symbolType); //context.symbolTypes);
      }
    }
  }

  /**
   *
   * @param word
   * @param index
   * @param map
   * @returns {boolean}
   */
  parseKeyword(word: string, index: number, map: string[]) {
    if (word.match(/,<>/)) {
      return true;
    }

    if (word === "export") {
      this.symbol.exported = true;
      return false;
    }

    if (word === "abstract") {
      this.symbol.abstract = true;
      return false;
    }
    if (word.match(/class$|interface$|enum$/)) {
      this.symbol.symbolType = word;
      this.symbol.symbolCode = context.symbolTypes[word].code;
      this.symbol.symbolLabel = context.symbolTypes[word].label;
      this.symbol.symbolName = map[index + 1].split("<")[0];
      return false;
    }

    if (word === "extends") {
      this.symbol.extends = map[index + 1];
      return false;
    }

    return !(word === this.symbol.symbolName || word === this.symbol.extends);
  }
}
