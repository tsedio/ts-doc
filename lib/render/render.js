const fs = require('fs');
const ejs = require('ejs');
const { context, modules } = require('../context');

module.exports = {
  /**
   *
   * @param filename
   * @param scope
   * @returns {String}
   */
  render(filename, scope = {}) {
    const { components, symbols, version, projectName } = context;

    scope = Object.assign(scope, {
      version,
      scope: context.scope,
      projectName,
      components,
      symbols,
      modules: modules()
    });

    const template = fs.readFileSync(filename, { encoding: 'utf8' });

    return ejs.render(template, scope, {
      filename
    });
  }
};