const {context} = require("../context");
const path = require("path");
const fs = require("fs/promises");
const fsSync = require("fs");
const normalizePath = require("normalize-path");
const readPkgUp = require("read-pkg-up");
const {logger} = require("../context/context");
const mapExported = new Map();

class DocFile {
  /**
   *
   * @param file
   */
  constructor(file) {
    this.file = normalizePath(file);
    this.symbols = new Map();
    this.contents = fsSync.readFileSync(file).toString();
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

  async importModule() {
    const {modulePath} = this.module;
    let file = path.join(modulePath, "index.js");
    try {
      if (fsSync.existsSync(path.join(modulePath, "package.json"))) {
        const pkg = JSON.parse(await fs.readFile(path.join(modulePath, "package.json"), {encoding: "utf-8"}));
        file = path.join(modulePath, pkg.main);
      }

      if (mapExported.has(file)) {
        return mapExported.get(file);
      }

      if (fsSync.existsSync(file)) {
        mapExported.set(file, await import(file));
        return mapExported.get(file);
      }
    } catch (er) {
      logger.error("Fail to import module", {file, modulePath, error: er});
    }
    return undefined;
  }
}

module.exports.DocFile = DocFile;
