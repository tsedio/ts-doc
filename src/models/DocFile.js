const { context } = require('../context/index');
const path = require('path');
const fs = require('fs');
const mapExported = new Map();

class DocFile {
  /**
   *
   * @param file
   */
  constructor(file) {
    this.file = file;
    this.symbols = new Map();
    this.contents = fs.readFileSync(file).toString();
  }

  get path() {
    return (this.file || '').replace('.d.ts', '.ts');
  }

  get srcPath() {
    return context.srcResolver(this.path);
  }

  get relativePackagePath() {
    const p = path.join(context.rootDir, context.packagesDir);
    return this.srcPath.replace(p, '');
  }

  get relativePath() {
    return this.srcPath.replace(`${context.rootDir}/`, '');
  }

  get module() {
    const [pkgName, subPkgName] = this.relativePackagePath.replace(/^\//, '').split('/');
    const pkgSettings = context.modules[pkgName];
    let moduleName = pkgName;

    if (typeof pkgSettings === 'object' && context.modules[pkgName][subPkgName]) {
      moduleName = pkgName + '/' + subPkgName;
    }

    return {
      modulePath: path.join(context.rootDir, context.packagesDir, pkgName),
      moduleName: `${context.scope}/${moduleName}`,
      importFrom: `${context.scope}/${pkgName}`,
      pkgName,
      subPkgName
    };
  }

  requireModule() {
    const { modulePath } = this.module;
    let file = path.join(modulePath, 'index.js');

    if (fs.existsSync(path.join(modulePath, 'package.json'))) {
      const pkg = require(path.join(modulePath, 'package.json'));
      file = path.join(modulePath, pkg.main);
    }

    if (mapExported.has(file)) {
      return mapExported.get(file);
    }

    if (fs.existsSync(file)) {
      mapExported.set(file, require(file));
      return mapExported.get(file);
    }

    return undefined;
  }

  // getModule() {
  //   const [pkgName, subPkgName] = this.path.replace(/^\//, '').split('/');
  //   const pkgSettings = context.modules[pkgName];
  //   let packagePath = pkgName;
  //
  //   if (typeof pkgSettings === 'object' && context.modules[pkgName][subPkgName]) {
  //     packagePath = pkgName + '/' + subPkgName;
  //   }
  //
  //   if (context.scope) {
  //     return {
  //       name: context.scope + '/' + packagePath,
  //       importFrom: context.scope + '/' + pkgName,
  //       pkgName,
  //       subPkgName
  //       // moduleSrcPath: path.join(context.rootDir,
  //       // moduleLibPath: context.libDir + '/' + pkgName
  //     };
  //   }
  //
  //   /*const isCommon = packagePath.indexOf('common/') > -1;
  //   const name = isCommon ? context.projectName : (context.projectName + '/' + pkgName);
  //   const srcPath = path.resolve(
  //     isCommon ? path.join(context.srcDir) : path.join(context.srcDir, pkgName)
  //   );
  //
  //   return {
  //     name,
  //     pkgName,
  //     importFrom: name,
  //     docPath: packagePath,
  //     srcPath,
  //     moduleSrcPath: context.srcDir + '/' + pkgName,
  //     moduleLibPath: context.libDir + '/' + pkgName
  //   };*/
  // }
}

module.exports.DocFile = DocFile;