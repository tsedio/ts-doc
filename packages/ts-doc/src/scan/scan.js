"use strict";

const globby = require("globby");
const path = require("path");
const chalk = require("chalk");
const logger = require("fancy-log");
const {render} = require("../render/render");
const {context} = require("../context");
const {trim} = require("../utils/trim");
const {DocParser} = require("../parsers/DocParser");
const {DocFile} = require("../models/DocFile");

module.exports = {
  /**
   *
   * @param directory
   */
  scanComponents(directory) {
    context.logger("Scan components '" + chalk.cyan(directory) + "'");

    const files = globby.sync(path.join(directory, "**/*.ejs"));

    files.forEach((file) => {
      const component = require(file.replace(".ejs", ".js"));

      context.components[component.name] = (...args) => {
        const content = render(file, component.method(...args));

        if (component.trim) {
          return trim(content);
        }
        return "\n" + content + "\n";
      };

      context.logger("Import component '" + chalk.cyan(path.basename(file)) + "'");
    });

    return files;
  },
  /**
   *
   */
  scanTemplate(templatePattern) {
    context.logger("Scan template directory '" + chalk.cyan(templatePattern) + "'");
    let files = globby.sync(templatePattern);

    return files.filter((file) => file.indexOf("/_build") === -1);
  },
  /**
   *
   * @param patterns
   */
  scanFiles(patterns) {
    context.logger("Scan folders '" + chalk.cyan(JSON.stringify(patterns)) + "'");

    let symbolsSize = 0;

    globby.sync(patterns).forEach((file) => {
      try {
        DocParser.parse(new DocFile(file)).forEach((symbol) => {
          context.logger(`Scanned symbol '${chalk.cyan(symbol.symbolName)}'`);
          symbolsSize++;
        });
      } catch (er) {
        context.logger.error(chalk.red(er), er.stack);
      }
    });

    context.logger(`${chalk.green(symbolsSize)} scanned symbols`);
  }
};
