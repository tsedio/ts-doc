const path = require("path");
const {DocSymbol} = require("./DocSymbol");
const context = require("../context/context");
const {expect} = require("../test/tools");

describe("DocSymbol", () => {
  before(async () => {
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

    this.docSymbol = new DocSymbol();
    this.docSymbol.symbolName = "SymbolName";
    this.docSymbol.symbolType = "Const";
    await this.docSymbol.setDocFile({
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
      importModule() {
        return {};
      }
    });
  });

  it("should return the symbolName", () => {
    expect(this.docSymbol.symbolName).to.eq("SymbolName");
  });

  it("should return the file", () => {
    expect(this.docSymbol.file).to.eq(path.join(process.cwd(), "/packages/common/di/lib/file.d.ts"));
  });

  it("should return the path", () => {
    expect(this.docSymbol.path).to.eq(path.join(process.cwd(), "/packages/common/di/lib/file.ts"));
  });

  it("should return the srcPath", () => {
    expect(this.docSymbol.srcPath).to.eq(path.join(process.cwd(), "/packages/common/di/src/file.ts"));
  });

  it("should return the relativePackagePath", () => {
    expect(this.docSymbol.relativePackagePath).to.eq("/common/di/src/file.ts");
  });

  it("should return the module description", () => {
    expect(this.docSymbol.module).to.deep.eq({
      importFrom: "@scope/common",
      moduleName: "@scope/common/di",
      modulePath: path.join(process.cwd(), "/packages/common"),
      pkgName: "common",
      subPkgName: "di"
    });
  });

  it("should return the githubUrl", () => {
    expect(this.docSymbol.githubUrl).to.eq("https://github.com/repo/blob/v1.0.0/packages/common/di/src/file.ts#L0-L0");
  });

  it("should return the importFrom", () => {
    expect(this.docSymbol.importFrom).to.eq("@scope/common/di/src/file");
  });

  it("should return the relativePath", () => {
    expect(this.docSymbol.relativePath).to.eq("/packages/common/di/src/file.ts");
  });

  it("should return the url", () => {
    expect(this.docSymbol.url).to.eq("/api/common/di/const-symbol-name.html");
  });

  it("should return the outputPath", () => {
    expect(this.docSymbol.outputPath).to.eq(path.join(process.cwd(), "/docs/api/common/di/const-symbol-name.md"));
  });
});
