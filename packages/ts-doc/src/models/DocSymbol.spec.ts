import path from "path";
import {DocSymbol} from "./DocSymbol";
import {context} from "../context/context";
import {expect} from "../test/tools";

describe("DocSymbol", () => {
  let docSymbol: DocSymbol;

  before(() => {
    context.github = "https://github.com/repo";
    context.version = "1.0.0";

    context.set({
      rootDir: path.join(process.cwd()),
      packagesDir: "packages/",
      scanPatterns: ["<rootDir>/packages/**/lib/**/*.d.ts", "!node_modules"],
      outputDir: "<rootDir>/docs/api",
      baseUrl: "/api",
      jsonOutputDir: "<rootDir>/docs/.vuepress/public",
      scope: "@scope",
      modules: {
        core: "core",
        common: {
          di: "common/di"
        }
      }
    });

    docSymbol = new DocSymbol();
    docSymbol.symbolName = "SymbolName";

    docSymbol.setDocFile({
      file: path.join(process.cwd(), "/packages/common/di/lib/file.d.ts"),
      path: path.join(process.cwd(), "/packages/common/di/lib/file.ts"),
      srcPath: path.join(process.cwd(), "/packages/common/di/src/file.ts"),
      relativePackagePath: "/common/di/src/file.ts",
      relativePath: "packages/common/di/src/file.ts",
      module: {
        importFrom: "@scope/common",
        moduleName: "@scope/common/di",
        modulePath: path.join(process.cwd(), "/packages/common"),
        pkgName: "common",
        subPkgName: "di"
      },
      requireModule() {
        return {};
      }
    });
  });

  it("should return the symbolName", () => {
    expect(docSymbol.symbolName).to.eq("SymbolName");
  });

  it("should return the file", () => {
    expect(docSymbol.file).to.eq(path.join(process.cwd(), "/packages/common/di/lib/file.d.ts"));
  });

  it("should return the path", () => {
    expect(docSymbol.path).to.eq(path.join(process.cwd(), "/packages/common/di/lib/file.ts"));
  });

  it("should return the srcPath", () => {
    expect(docSymbol.srcPath).to.eq(path.join(process.cwd(), "/packages/common/di/src/file.ts"));
  });

  it("should return the relativePackagePath", () => {
    expect(docSymbol.relativePackagePath).to.eq("/common/di/src/file.ts");
  });

  it("should return the module description", () => {
    expect(docSymbol.module).to.deep.eq({
      importFrom: "@scope/common",
      moduleName: "@scope/common/di",
      modulePath: path.join(process.cwd(), "/packages/common"),
      pkgName: "common",
      subPkgName: "di"
    });
  });

  it("should return the githubUrl", () => {
    expect(docSymbol.githubUrl).to.eq("https://github.com/repo/blob/v1.0.0/packages/common/di/src/file.ts#L0-L0");
  });

  it("should return the importFrom", () => {
    expect(docSymbol.importFrom).to.eq("@scope/common/di/src/file");
  });

  it("should return the relativePath", () => {
    expect(docSymbol.relativePath).to.eq("/packages/common/di/src/file.ts");
  });

  it("should return the url", () => {
    expect(docSymbol.url).to.eq("/api/common/di/SymbolName.html");
  });

  it("should return the outputPath", () => {
    expect(docSymbol.outputPath).to.eq(path.join(process.cwd(), "/docs/api/common/di/SymbolName.md"));
  });
});
