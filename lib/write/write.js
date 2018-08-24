'use strict';
const path = require('path');
const util = require('util');
const fsExtra = require('fs-extra');
const logger = require('fancy-log');
const chalk = require('chalk');
const { context, symbolTypes, symbolStatus } = require('../context');
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

        try {
          fsExtra.mkdirsSync(outfile);
        } catch (er) {
        }
        fsExtra.writeFileSync(outfile, content.trim(), {
          encoding: 'utf8',
          flag: 'w+'
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

    const file = path.join(path.dirname(symbol.path), symbol.symbolName + '.md');
    const outFile = path.join(context.apiDir, file);

    try {
      fsExtra.mkdirsSync(path.dirname(outFile), {});
    } catch (er) {
    }
    fsExtra.writeFileSync(outFile, content.trim(), {
      flag: 'w+'
    });
    logger(`Write '${chalk.cyan(file)}'`);
  },

  writeJson() {
    const outFile = path.join(context.apiDir, 'api.json');
    const { version, scope } = context;

    const modules = context.symbols.toArray().reduce((acc, symbol) => {
      const { symbolName, module, exported, symbolType, symbolLabel, symbolCode, labels } = symbol;

      const key = module.name;
      acc[key] = acc[key] || { symbols: [], name: key };

      acc[key].symbols.push({
        path: `/api/${symbol.path}/${symbol.symbolName}`,
        symbolName,
        module: module.name,
        abstract: module.abstract,
        symbolType,
        symbolLabel,
        symbolCode,
        status: labels.map(o => o.key).filter((key) => ['param', 'params', 'returns', 'decorators'].indexOf(key) === -1)
      });

      return acc;
    }, {});

    const obj = {
      version,
      scope,
      symbolTypes: symbolTypes(),
      symbolStatus: symbolStatus(),
      modules
    };

    fsExtra.writeFileSync(outFile, JSON.stringify(obj, null, 2), {
      flag: 'w+'
    });
    logger(`Write api.json '${chalk.cyan(outFile)}'`);
  }
};
