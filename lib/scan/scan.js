"use strict";

const glob = require("glob");
const path = require("path");
const chalk = require('chalk');
const logger = require('fancy-log');
const fsExtra = require("fs-extra");
const { render } = require('../render/render');
const { context } = require('../context');
const { trim } = require('../utils/trim');
const { Parser } = require('../parsers/Parser');
const { DocFile } = require('../models/DocFile');

module.exports = {
  /**
   *
   * @param directory
   */
  scanComponents(directory) {
    logger('Scan components \'' + chalk.cyan(directory) + '\'');

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

      logger('Import component \'' + chalk.cyan(path.basename(file)) + '\'');
    });

    return files;
  },
  /**
   *
   */
  scanTemplate(templatePattern) {
    logger('Scan template directory \'' + chalk.cyan(templatePattern) + '\'');
    let files = glob.sync(templatePattern);

    return files.filter((file) => file.indexOf("/_build") === -1);
  },
  /**
   *
   * @param pattern
   */
  scanFiles(pattern) {
    logger('Scan folders \'' + chalk.cyan(pattern) + '\'');
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
            logger('Scanned symbol \'' + chalk.cyan(symbol.symbolName) + '\'');
            symbol.setDocFile(docFile);
          });

          return docFile;

        } catch (er) {
          logger.error(chalk.red(er));
        }

      });
  }
};