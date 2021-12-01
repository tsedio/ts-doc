import {context} from "../context";
import {DocSymbolParser} from "./DocSymbolParser";
import {sumBracket} from "./sum-bracket";
import {stripsTags} from "../utils/strips";
import {DocFile} from "../models/DocFile";
import {DocSymbol} from "../models/DocSymbol";

const EXPORT_PATTERN = /^export /;

function isOpenedComment(line: any) {
  return line.trim() === "/**";
}

function isClosedComment(line: any) {
  return line.trim() === "*/";
}

function isExportedSymbol(line: any) {
  return line.match(EXPORT_PATTERN);
}

function isNotFunctionSymbol(line: any) {
  return line.match(/{$/) && line.indexOf("function") === -1;
}

function isExported(line: any) {
  return line.trim().match(/export \* from/);
}

export class DocParser {
  readonly symbols: Map<string, any> = new Map();
  currentComment: any;
  currentSymbol: any;
  inComment: any;
  tabLevel: any;

  constructor(public readonly contents: string) {
  }

  static async parse(docFile: DocFile) {
    const {symbols} = new DocParser(docFile.contents).parse();

    const promises = [...symbols.values()].map(async (symbol: any) => {
      await symbol.setDocFile(docFile);
      symbol = context.symbols.push(symbol);
      docFile.symbols.set(symbol.symbolName, symbol);
    });

    await Promise.all(promises);

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

    const content = this.contents.split("/** */");

    stripsTags(content[content.length - 1])
      .split("\n")
      .map((line: string, index: number, map: string[]) => this.parseLine(line, index, map))
      .join("\n");

    return this;
  }

  protected isEligibleSymbol(line: string) {
    return (this.tabLevel === 0 && isNotFunctionSymbol(line)) || (isExportedSymbol(line) && this.currentSymbol === undefined);
  }

  /**
   *
   * @param line
   * @param index
   * @param map
   */
  protected parseLine(line: string, index: number, map: string[]) {
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

  protected createSymbol(line: string, index: number, map: string[]) {
    const symbolParser = new DocSymbolParser(line, this.currentComment.join("\n").trim());
    let symbol = symbolParser.parse();
    symbol.rawContent = map;

    if (this.symbols.has(symbolParser.symbol.symbolName)) {
      symbol = this.symbols.get(symbolParser.symbol.symbolName);
    } else {
      symbol.startLine = index;
    }

    symbol.endLine = index;

    this.setSymbol(symbol);

    this.currentComment = [];
    this.currentSymbol = symbol;

    return symbol;
  }

  protected endSymbol(index: number) {
    this.currentSymbol.endLine = index;
    this.setSymbol(this.currentSymbol);
    this.currentSymbol = undefined;
  }

  protected setSymbol(symbol: DocSymbol) {
    if (symbol.symbolName === "" || symbol.symbolName === "let") {
      return;
    }

    if (symbol.labels.find(({
                              key
                            }: any) => key === "ignore")) {
      return;
    }

    this.symbols.set(symbol.symbolName, symbol);
    this.buildSymbolOverview(symbol);
  }

  protected buildSymbolOverview(symbol: DocSymbol) {
    symbol.overview = symbol.rawContent
      .slice(symbol.startLine, symbol.endLine + 1)
      .join("\n")
      .trim()
      .replace(EXPORT_PATTERN, "");
  }
}
