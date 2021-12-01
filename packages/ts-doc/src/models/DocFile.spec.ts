import fs from "fs";
import path from "path";
import normalizePath from "normalize-path";
import readPkgUp from "read-pkg-up";
import {DocFile} from "./DocFile";
import {context} from "../context/context";
import {expect, Sinon} from "../test/tools";

const sandbox = Sinon.createSandbox()
describe("DocFile", () => {
  let docFile: any;

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

    sandbox.stub(fs, "readFileSync").returns("content file");
    sandbox.stub(readPkgUp, "sync").returns({packageJson: {name: "@scope/common"}} as any);
    docFile = new DocFile(path.join(process.cwd(), "/packages/common/di/lib/file.d.ts"));
  });


  after(() => {
    sandbox.restore();
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
