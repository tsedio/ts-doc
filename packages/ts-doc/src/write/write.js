"use strict";
const path = require("path");
const fsExtra = require("fs-extra");
const logger = require("fancy-log");
const chalk = require("chalk");
const {context, symbolTypes, symbolStatus} = require("../context");

let cache = new Set();

module.exports = {
  /**
   *
   * @param symbol
   * @param content
   */
  async writeSymbol(symbol, content) {
    if (symbol.symbolName.trim() === "") {
      return;
    }

    // prevent duplicate write
    if (cache.has(symbol.outputPath)) {
      return;
    }

    cache.add(symbol.outputPath);

    try {
      await fsExtra.mkdirs(path.dirname(symbol.outputPath), {});
    } catch (error) {
      if (error.code !== "EEXIST") {
        logger.warn(`Failed to create directory for ${symbol.outputPath}: ${error.message}`);
        throw error;
      }
    }

    await fsExtra.writeFile(symbol.outputPath, content.trim(), {
      flag: "w"
    });

    logger(`Write '${chalk.cyan(symbol.outputPath.replace(context.rootDir, ""))}'`);
  },

  writeJson() {
    if (!context.jsonOutputDir) {
      return;
    }

    const outFile = path.join(context.jsonOutputDir, "api.json");
    const {version, scope} = context;

    const modules = context.symbols.toArray().reduce((acc, symbol) => {
      const {symbolName, module, exported, symbolType, symbolLabel, symbolCode, labels, id} = symbol;

      const key = module.moduleName;
      acc[key] = acc[key] || {symbols: [], name: key};

      const status = labels.map((o) => o.key).filter((key) => ["param", "params", "returns", "decorators"].indexOf(key) === -1);

      if (status.indexOf("experimental") === -1 && status.indexOf("deprecated") === -1) {
        status.push("stable");
      }

      acc[key].symbols.push({
        id,
        path: symbol.url.replace(".html", ""),
        symbolName,
        module: module.moduleName,
        abstract: module.abstract,
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
};
