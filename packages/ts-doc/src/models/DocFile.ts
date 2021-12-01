import path from "path";
import fs from "fs";
import normalizePath from "normalize-path";
import readPkgUp from "read-pkg-up";
import {context} from "../context";
import type {DocSymbol} from "./DocSymbol";

const mapExported = new Map();

export class DocFile {
  readonly contents: string;
  readonly file: string;
  readonly symbols: Map<string, DocSymbol> = new Map();
  /**
   *
   * @param file
   */
  constructor(file: string) {
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
    const pkg: any = readPkgUp.sync({cwd: packageDir})

    const {
      packageJson: {name}
    } = pkg;

    return {
      modulePath: normalizePath(packageDir),
      moduleName: name,
      importFrom: name,
      pkgName: name.replace(context.scope, "").replace("/", "")
    };
  }

  async requireModule() {
    const {modulePath} = this.module;
    let file = path.join(modulePath, "index.js");

    if (fs.existsSync(path.join(modulePath, "package.json"))) {
      const pkg = await import(path.join(modulePath, "package.json"))
      file = path.join(modulePath, pkg.main);
    }

    if (mapExported.has(file)) {
      return mapExported.get(file);
    }

    if (fs.existsSync(file)) {
      mapExported.set(file, await import(file));
      return mapExported.get(file);
    }

    return undefined;
  }
}
