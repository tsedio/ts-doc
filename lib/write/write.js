'use strict';
const path = require('path');
const fsExtra = require('fs-extra');
const logger = require('fancy-log');
const chalk = require('chalk');
const { context } = require('../context');
const { render } = require('../render/render');
const { scanTemplate } = require('../scan/scan');


module.exports = {
  /**
   *
   * @param templatePattern
   */
  writeTemplate(templatePattern) {
    scanTemplate(templatePattern)
      .forEach((file) => {
        const outfile = file.replace(/.ejs|.emd/, '.md');
        logger(`Write '${chalk.cyan(outfile)}'`);
        const content = render(file);

        fsExtra.writeFile(outfile, content, {
          encoding: 'utf8',
          flag: 'w'
        });
      });
  },
  /**
   *
   * @param symbol
   * @param content
   */
  writeSymbol(symbol, content) {

    if (symbol.symbolName.trim() === '') {
      console.error('Symbol empty =>', symbol);
      return;
    }
    const file = path.join(symbol.module.docPath, symbol.symbolName.toLowerCase() + '.md');
    logger(`Write '${chalk.cyan(file)}'`);
    const outFile = path.join(context.apiDir, file);

    fsExtra.writeFile(outFile, content.trim(), {
      encoding: 'utf8',
      flag: 'w'
    });
  }
};
