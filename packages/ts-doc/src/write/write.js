"use strict";
const path = require("path");
const fsExtra = require("fs-extra");
const logger = require("fancy-log");
const chalk = require("chalk");
const {context, symbolTypes, symbolStatus} = require("../context");
const {render} = require("../render/render");
const {scanTemplate} = require("../scan/scan");

module.exports = {
  /**
   *
   * @param templatePattern
   */
  writeTemplate(templatePattern) {
    scanTemplate(templatePattern).forEach((file) => {
      const outfile = file.replace(/.ejs|.emd/, ".md");
      logger(`Write '${chalk.cyan(outfile)}'`);
      const content = render(file);

      try {
        fsExtra.mkdirsSync(outfile);
      } catch (er) {}
      fsExtra.writeFileSync(outfile, content.trim(), {
        encoding: "utf8",
        flag: "w+"
      });
    });
  },
  /**
   *
   * @param symbol
   * @param content
   */
  writeSymbol(symbol, content) {
    if (symbol.symbolName.trim() === "") {
      console.error("Symbol empty =>", symbol);
      return;
    }

    try {
      fsExtra.mkdirsSync(path.dirname(symbol.outputPath), {});
    } catch (er) {}
    fsExtra.writeFileSync(symbol.outputPath, content.trim(), {
      flag: "w+"
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
      const {symbolName, module, exported, symbolType, symbolLabel, symbolCode, labels} = symbol;

      const key = module.moduleName;
      acc[key] = acc[key] || {symbols: [], name: key};

      const status = labels.map((o) => o.key).filter((key) => ["param", "params", "returns", "decorators"].indexOf(key) === -1);

      if (status.indexOf("experimental") === -1 && status.indexOf("deprecated") === -1) {
        status.push("stable");
      }

      acc[key].symbols.push({
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
