import path from "path";
import fsExtra from "fs-extra";
import logger from "fancy-log";
import chalk from "chalk";
import {context, symbolStatus, symbolTypes} from "../context";
import {DocSymbol} from "../models/DocSymbol";

/**
 *
 * @param symbol
 * @param content
 */
export function writeSymbol(symbol: DocSymbol, content: string) {
  if (symbol.symbolName.trim() === "") {
    console.error("Symbol empty =>", symbol);
    return;
  }

  try {
    fsExtra.mkdirsSync(path.dirname(symbol.outputPath));
  } catch (er) {
  }

  fsExtra.writeFileSync(symbol.outputPath, content.trim(), {
    flag: "w+"
  });

  logger(`Write '${chalk.cyan(symbol.outputPath.replace(context.rootDir, ""))}'`);
}

export function writeJson() {
  if (!context.jsonOutputDir) {
    return;
  }

  const outFile = path.join(context.jsonOutputDir, "api.json");

  const {version, scope} = context;

  const modules = context.symbols.toArray().reduce((acc: any[], symbol: DocSymbol) => {
    const {symbolName, module, exported, symbolType, symbolLabel, symbolCode, labels} = symbol;

    const key = module.moduleName;
    acc[key] = acc[key] || {symbols: [], name: key};

    const status = labels.map((o: any) => o.key).filter((key: any) => ["param", "params", "returns", "decorators"].indexOf(key) === -1);

    if (status.indexOf("experimental") === -1 && status.indexOf("deprecated") === -1) {
      status.push("stable");
    }

    acc[key].symbols.push({
      path: symbol.url.replace(".html", ""),
      symbolName,
      module: module.moduleName,
      abstract: module.abstract,
      exported,
      symbolType,
      symbolLabel,
      symbolCode,
      status
    });

    return acc;
  }, {});

  const obj = {
    version,
    scope,
    symbolTypes: symbolTypes(),
    symbolStatus: symbolStatus(),
    modules
  };

  fsExtra.writeFileSync(outFile, JSON.stringify(obj, null, 2), {
    flag: "w+"
  });
  logger(`Write api.json '${chalk.cyan(outFile)}'`);
}
