const fs = require("fs");
const path = require("path");
const {DocFile} = require("./DocFile");
const context = require("../context/context");
const {Sinon, expect} = require("../test/tools");
const readPkgUp = require("read-pkg-up");
const normalizePath = require("normalize-path");

describe("DocFile", () => {
  let docFile;
  before(() => {
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

    Sinon.stub(fs, "readFileSync").returns("content file");
    Sinon.stub(readPkgUp, "sync").returns({packageJson: {name: "@scope/common"}});
    docFile = new DocFile(path.join(process.cwd(), "/packages/common/di/lib/file.d.ts"));
  });

  after(() => {
    fs.readFileSync.restore();
    readPkgUp.sync.restore();
  });

  it("should return the file", () => {
    expect(docFile.file).to.eq(path.join(process.cwd(), "/packages/common/di/lib/file.d.ts"));
  });

  it("should return the path", () => {
    expect(docFile.path).to.eq(path.join(process.cwd(), "/packages/common/di/lib/file.ts"));
  });

  it("should return the srcPath", () => {
    expect(docFile.srcPath).to.eq(path.join(process.cwd(), "/packages/common/di/src/file.ts"));
  });

  it("should return the relativePackagePath", () => {
    expect(docFile.relativePackagePath).to.eq("/common/di/src/file.ts");
  });

  it("should return the relativePath", () => {
    expect(docFile.relativePath).to.eq("packages/common/di/src/file.ts");
  });

  it("should return the module description", () => {
    expect(docFile.module).to.deep.eq({
      importFrom: "@scope/common",
      moduleName: "@scope/common",
      modulePath: normalizePath(process.cwd() + "/packages/common/di"),
      pkgName: "common"
    });
  });
});
