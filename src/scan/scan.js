'use strict';

const globby = require('globby');
const path = require('path');
const chalk = require('chalk');
const logger = require('fancy-log');
const fsExtra = require('fs-extra');
const { render } = require('../render/render');
const { context } = require('../context');
const { trim } = require('../utils/trim');
const { DocParser } = require('../parsers/DocParser');
const { DocFile } = require('../models/DocFile');

module.exports = {
  /**
   *
   * @param directory
   */
  scanComponents(directory) {
    logger('Scan components \'' + chalk.cyan(directory) + '\'');

    const files = globby.sync(path.join(directory, '**/*.ejs'));

    files.forEach((file) => {
      const component = require(file.replace('.ejs', '.js'));

      context.components[component.name] = (...args) => {
        const content = render(file, component.method(...args));

        if (component.trim) {
          return trim(content);
        }
        return '\n' + content + '\n';
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
    let files = globby.sync(templatePattern);

    return files.filter((file) => file.indexOf('/_build') === -1);
  },
  /**
   *
   * @param patterns
   */
  scanFiles(patterns) {
    logger('Scan folders \'' + chalk.cyan(JSON.stringify(patterns)) + '\'');
    let files = globby.sync(patterns);

    return files
      .map(file => new DocFile(file))
      .map(docFile => {

        try {
          new DocParser(docFile).parse();

          docFile.symbols.forEach((symbol) => {
            if (symbol.symbolName.trim() === '') {
              return;
            }
            logger('Scanned symbol \'' + chalk.cyan(symbol.symbolName) + '\'');
            symbol.setDocFile(docFile);
          });

          return docFile;

        } catch (er) {
          logger.error(chalk.red(er), er.stack);
        }

      });
  }
};