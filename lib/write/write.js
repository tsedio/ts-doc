"use strict";
const path = require("path");
const glob = require("glob");
const fsExtra = require("fs-extra");
const { $log } = require("ts-log-debug");
const { context } = require("../context");
const { render } = require("../render/render");
const { scanTemplate } = require("../scan/scan");


module.exports = {
  /**
   *
   * @param templatePattern
   */
  writeTemplate(templatePattern) {
    scanTemplate(templatePattern)
      .forEach((file) => {
        const outfile = file.replace(/.ejs|.emd/, ".md");
        $log.info("Write", outfile);

        const content = render(file);

        fsExtra.writeFile(outfile, content, {
          encoding: "utf8",
          flag: "w"
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
    const file = path.join(symbol.module.docPath, symbol.symbolName.toLowerCase() + ".md");
    $log.info("Write", file);
    const outFile = path.join(context.apiDir, file);

    fsExtra.writeFile(outFile, content, {
      encoding: "utf8",
      flag: "w"
    });
  }
};
