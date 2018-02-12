const { context } = require('../context/index');
const path = require('path');
const fs = require('fs');

// const {$log} = require("ts-log-debug");

class DocFile {
  /**
   *
   * @param file
   */
  constructor(file) {
    this.file = file;
    this.path = (file || '').replace(path.join(context.libDir), '').replace('.d.ts', '.ts');
    this.srcPath = path.resolve(path.join(context.root, 'src', this.path));

    this.symbol = path.basename(file).replace('.d.ts', '');
    this.module = this.getModule();
    this.symbols = new Map();

    this.originalContents = fs.readFileSync(this.srcPath).toString();
    this.contents = fs.readFileSync(file).toString();

    // $log.debug("DocFile created from", this.file);
  }

  getModule() {
    const [pkgName, subPkgName] = this.path.replace(/^\//, '').split('/');
    const pkgSettings = context.modules[pkgName];
    let packagePath = pkgName;

    if (typeof pkgSettings === 'object' && context.modules[pkgName][subPkgName]) {
      packagePath = pkgName + '/' + subPkgName;
    }

    if (context.scope) {
      return {
        name: context.scope + '/' + packagePath,
        importFrom: context.scope + '/' + pkgName,
        pkgName,
        subPkgName,
        docPath: packagePath,
        srcPath: path.join(context.root, 'src', packagePath),
        moduleSrcPath: context.srcDir + '/' + packagePath,
        moduleLibPath: context.libDir + '/' + pkgName
      };
    }

    const isCommon = packagePath.indexOf('common/') > -1;
    const name = isCommon ? context.projectName : (context.projectName + '/' + pkgName);
    const srcPath = path.resolve(
      isCommon ? path.join(context.root, 'src') : path.join(context.root, 'src', pkgName)
    );

    return {
      name,
      pkgName,
      importFrom: name,
      docPath: packagePath,
      srcPath,
      moduleSrcPath: context.srcDir + '/' + pkgName,
      moduleLibPath: context.libDir + '/' + pkgName
    };
  }
}

module.exports.DocFile = DocFile;