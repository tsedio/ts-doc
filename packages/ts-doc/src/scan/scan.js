"use strict";

const globby = require("globby");
const path = require("path");
const chalk = require("chalk");
const {render} = require("../render/render");
const {context} = require("../context");
const {trim} = require("../utils/trim");
const {DocParser} = require("../parsers/DocParser");
const {DocFile} = require("../models/DocFile");

module.exports = {
  async scanComponents(directory) {
    context.logger("Scan components '" + chalk.cyan(directory) + "'");

    const files = await globby(path.join(directory, "**/*.ejs"));

    const promises = files.map(async (file) => {
      try {
        const mod = await import(file.replace(".ejs", ".js"));
        const component = mod.default || mod;

        context.components[component.name] = (...args) => {
          const content = render(file, component.method(...args));

          if (component.trim) {
            return trim(content);
          }
          return "\n" + content + "\n";
        };

        context.logger("Import component '" + chalk.cyan(path.basename(file)) + "'");
      } catch (er) {
        context.logger.error("Fail to load template", chalk.red(er), er.stack);
      }
    });

    await Promise.all(promises);

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
  async scanFiles(patterns) {
    context.logger("Scan folders '" + chalk.cyan(JSON.stringify(patterns)) + "'");

    let symbolsSize = 0;
    const files = await globby(patterns);

    for (const file of files) {
      try {
        const symbols = await DocParser.parse(new DocFile(file));

        symbols.forEach((symbol) => {
          context.logger(`Scanned symbol '${chalk.cyan(symbol.symbolName)}'`);
          symbolsSize++;
        });
      } catch (er) {
        context.logger.error(chalk.red(er), er.stack);
      }
    }

    context.logger(`${chalk.green(symbolsSize)} scanned symbols`);
  }
};
