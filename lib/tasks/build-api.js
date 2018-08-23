'use strict';
const logger = require('fancy-log');
const { context } = require('../context');
const { writeSymbol, writeTemplate, writeJson } = require('../write/write');
const { scanFiles, scanComponents } = require('../scan/scan');
const path = require('path');

const options = {
  components: path.join(__dirname, '..', '..', 'components')
};

module.exports = {
  /**
   *
   */
  buildApi(config, pkg) {
    context.root = config.root;
    context.apiDir = config.apiDir;
    context.docsDir = config.docsDir;
    context.libDir = config.libDir;
    context.srcDir = config.srcDir;

    return Promise.resolve()
      .then(() => pkg ? context.importPkg(pkg) : context.readPkg())
      .then(() => scanComponents(options.components))
      .then(() => scanFiles(context.libDir + '/**/*.ts'))
      .then(() =>
         context.symbols.forEach((symbol) => {
          const content = context.components.page(symbol);

          return writeSymbol(symbol, content);
        })
      )
      .then(() => writeTemplate(context.docsDir + '/**/*.{ejs,emd}'))
      .then(() => writeJson())
      .then(() => logger('done'))
      .catch(err => console.error(err));
  }
};