"use strict";

const glob = require("glob");
const path = require("path");
const fsExtra = require("fs-extra");
const { render } = require("../render/render");
const { context } = require("../context");
const { trim } = require("../utils/trim");
const { $log } = require("ts-log-debug");
const { Parser } = require("../parsers/Parser");
const { DocFile } = require("../models/DocFile");

module.exports = {
  /**
   *
   * @param directory
   */
  scanComponents(directory) {
    $log.info("Scan components", directory);

    const files = glob.sync(path.join(directory, "**/*.ejs"));

    files.forEach((file) => {
      const component = require(file.replace(".ejs", ".js"));

      context.components[component.name] = (...args) => {
        const content = render(file, component.method(...args));

        if (component.trim) {
          return trim(content);
        }
        return "\n" + content + "\n";
      };

      $log.info("Import component", path.basename(file));
    });

    return files;
  },
  /**
   *
   */
  scanTemplate(templatePattern) {
    $log.info("Scan template directory", templatePattern);
    let files = glob.sync(templatePattern);

    return files.filter((file) => file.indexOf("/_build") === -1);
  },
  /**
   *
   * @param pattern
   */
  scanFiles(pattern) {
    $log.info("Scan folders", pattern);
    let files = glob.sync(pattern);

    return files
      .filter((file) => !file.match(/Express.d.ts|lib\/index.ts/))
      .map(file => new DocFile(file))
      .map(docFile => {

        try {
          const parser = new Parser(docFile).parse();
          docFile.symbols = parser.symbols;

          fsExtra.mkdirsSync(path.join(context.apiDir, docFile.module.docPath));

          docFile.symbols.forEach((symbol) => {
            if (symbol.symbolName.trim() === "") {
              return;
            }
            $log.info("Scanned symbol", symbol.symbolName);
            symbol.setDocFile(docFile);
          });

          return docFile;

        } catch (er) {
          $log.error(er);
        }

      });
  }
};