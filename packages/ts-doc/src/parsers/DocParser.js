"use strict";
const {context} = require("../context");
const {DocSymbolParser} = require("./DocSymbolParser");
const {sumBracket} = require("./sum-bracket");

const {stripsTags} = require("../utils/strips");
const {logger} = require("../context/context");

const EXPORT_PATTERN = /^export /;

function isOpenedComment(line) {
  return line.trim() === "/**";
}

function isClosedComment(line) {
  return line.trim() === "*/";
}

function isExportedSymbol(line) {
  return line.match(EXPORT_PATTERN);
}

function isNotFunctionSymbol(line) {
  return line.match(/{$/) && line.indexOf("function") === -1;
}

function isExported(line) {
  return line.trim().match(/export \* from/);
}

class DocParser {
  constructor(contents) {
    this.symbols = new Map();
    this.contents = contents;
  }

  static async parse(docFile) {
    const {symbols} = new DocParser(docFile.contents).parse();

    const promises = await Promise.all(
      [...symbols.values()].map(async (symbol) => {
        try {
          await symbol.setDocFile(docFile);

          return symbol;
        } catch (er) {
          logger.error("Fail to process symbol", {symbol, error: er});
        }
      })
    );

    const parsedSymbols = await Promise.all(promises);

    for (const symbol of parsedSymbols) {
      if (symbol) {
        const newSymbol = context.symbols.push(symbol);

        docFile.symbols.set(newSymbol.symbolName, newSymbol);
      }
    }

    return docFile.symbols;
  }

  /**
   *
   */
  parse() {
    this.currentSymbol = undefined;
    this.tabLevel = 0;
    this.currentComment = [];
    this.inComment = 0;
    let content = this.contents.split("/** */");
    content = stripsTags(content[content.length - 1]);

    content
      .split("\n")
      .map((line, index, map) => this.parseLine(line, index, map))
      .join("\n");

    return this;
  }

  /**
   *
   * @param line
   * @param index
   * @param map
   */
  parseLine(line, index, map) {
    if (line.trim() === "") {
      return;
    }

    if (isExported(line)) {
      return;
    }

    if (isOpenedComment(line)) {
      if (this.inComment === 0) {
        this.currentComment = [];
      }
      this.inComment++;
      return;
    }

    if (isClosedComment(line)) {
      this.inComment--;
      return;
    }

    if (this.inComment > 0) {
      this.currentComment.push(line.trim().replace(/^\* |^\*/, ""));
      return;
    }

    this.tabLevel += sumBracket(line);

    if (this.tabLevel === 0 && this.currentSymbol) {
      this.endSymbol(index);
    }

    if (this.tabLevel >= 1 && this.currentSymbol) {
      const currentLvl = this.tabLevel - sumBracket(line);

      if (currentLvl === 1) {
        this.currentSymbol.appendMember(line, this.currentComment.join("\n"));
      } else {
        this.currentSymbol.addLineToMember(line);
      }

      this.currentComment = [];
      return;
    }

    if (this.isEligibleSymbol(line)) {
      this.createSymbol(line, index, map);

      if (line.match(/;$/)) {
        this.endSymbol(index);
      }

      return;
    }

    return line;
  }

  isEligibleSymbol(line) {
    return (this.tabLevel === 0 && isNotFunctionSymbol(line)) || (isExportedSymbol(line) && this.currentSymbol === undefined);
  }

  createSymbol(line, index, map) {
    const symbolParser = new DocSymbolParser(line, this.currentComment.join("\n").trim());
    let symbol = symbolParser.parse();
    symbol.rawContent = map;

    if (this.symbols.has(symbolParser.symbol.symbolName)) {
      symbol = this.symbols.get(symbolParser.symbol.symbolName);
    } else {
      symbol.startLine = index;
    }

    symbol.endLine = index;

    this.setSymbol(symbol, map);

    this.currentComment = [];
    this.currentSymbol = symbol;

    return symbol;
  }

  endSymbol(index) {
    this.currentSymbol.endLine = index;
    this.setSymbol(this.currentSymbol);
    this.currentSymbol = undefined;
  }

  setSymbol(symbol) {
    if (symbol.symbolName === "" || symbol.symbolName === "let") {
      return;
    }

    if (symbol.labels.find(({key}) => key === "ignore")) {
      return;
    }

    this.symbols.set(symbol.symbolName, symbol);
    this.buildSymbolOverview(symbol);
  }

  buildSymbolOverview(symbol) {
    symbol.overview = symbol.rawContent
      .slice(symbol.startLine, symbol.endLine + 1)
      .join("\n")
      .trim()
      .replace(EXPORT_PATTERN, "");
  }
}

module.exports.DocParser = DocParser;
