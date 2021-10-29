const {context} = require("../context");
const path = require("path");
const fs = require("fs");
const normalizePath = require("normalize-path");
const readPkgUp = require("read-pkg-up");
const mapExported = new Map();

class DocFile {
  /**
   *
   * @param file
   */
  constructor(file) {
    this.file = normalizePath(file);
    this.symbols = new Map();
    this.contents = fs.readFileSync(file).toString();
  }

  get path() {
    return normalizePath((this.file || "").replace(".d.ts", ".ts"));
  }

  get srcPath() {
    return normalizePath(context.srcResolver(this.path));
  }

  get relativePackagePath() {
    const p = normalizePath(path.join(context.rootDir, context.packagesDir));

    return normalizePath(this.srcPath.replace(p, ""));
  }

  get relativePath() {
    return normalizePath(this.srcPath.replace(`${context.rootDir}/`, ""));
  }

  get module() {
    const [packagePath] = this.relativePackagePath.split("/src");
    const packageDir = path.join(context.rootDir, context.packagesDir, packagePath);

    const {
      packageJson: {name}
    } = readPkgUp.sync({cwd: packageDir});

    return {
      modulePath: normalizePath(packageDir),
      moduleName: name,
      importFrom: name,
      pkgName: name.replace(context.scope, "").replace("/", "")
    };
  }

  requireModule() {
    const {modulePath} = this.module;
    let file = path.join(modulePath, "index.js");

    if (fs.existsSync(path.join(modulePath, "package.json"))) {
      const pkg = require(path.join(modulePath, "package.json"));
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
}

module.exports.DocFile = DocFile;
