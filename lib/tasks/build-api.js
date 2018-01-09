"use strict";

const { context } = require("../context");
const { writeSymbol, writeTemplate } = require("../write/write");
const { scanFiles, scanComponents } = require("../scan/scan");
const path = require("path");

const { $log } = require("ts-log-debug");

$log.name = "DOC";

const options = {
  components: path.join(__dirname, "..", "..", "components")
};

module.exports = {
  /**
   *
   */
  buildApi(config) {
    context.root = config.root;
    context.apiDir = config.apiDir;
    context.docsDir = config.docsDir;
    context.libDir = config.libDir;
    context.srcDir = config.srcDir;

    return context
      .readPkg()
      .then(() => scanComponents(options.components))
      .then(() => scanFiles(context.libDir + "/**/*.ts"))
      .then(() => {
        context.symbols.forEach((symbol) => {
          const content = context.components.page(symbol);
          writeSymbol(symbol, content);
        });
      })
      .then(() => {
        writeTemplate(context.docsDir + "/**/*.ejs");
      })
      .then(() => $log.info("done"))
      .catch(err => console.error(err));
  }
};