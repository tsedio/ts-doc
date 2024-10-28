"use strict";
const logger = require("fancy-log");
const chalk = require("chalk");
const {context} = require("../context");
const {writeSymbol, writeJson} = require("../write/write");
const {scanFiles, scanComponents} = require("../scan/scan");

module.exports = {
  /**
   *
   */
  buildApi(config) {
    context.set(config);
    return Promise.resolve()
      .then(() => context.readPkg())
      .then(() => scanComponents(context.templatesDir))
      .then(() => scanFiles(context.scanPatterns))
      .then(() => {
        let symbols = 0;
        context.symbols.forEach((symbol) => {
          const content = context.components.page(symbol);
          symbols++;
          return writeSymbol(symbol, content);
        });
        logger(chalk.green(symbols) + " symbols write");
      })
      .then(() => writeJson())
      .then(() => logger("done"))
      .catch((err) => console.error(err));
  }
};
