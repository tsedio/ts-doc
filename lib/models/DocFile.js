const { context } = require("../context/index");
const path = require("path");
const fs = require("fs");

// const {$log} = require("ts-log-debug");

class DocFile {
  /**
   *
   * @param file
   */
  constructor(file) {
    this.file = file;
    this.path = (file || "").replace(path.join(context.libDir), "").replace(".d.ts", ".ts");
    this.srcPath = path.resolve(path.join(context.root, "src", this.path));

    this.symbol = path.basename(file).replace(".d.ts", "");
    this.module = this.getModule();
    this.symbols = new Map();

    this.originalContents = fs.readFileSync(this.srcPath).toString();
    this.contents = fs.readFileSync(file).toString();

    // $log.debug("DocFile created from", this.file);
  }

  getModule() {
    const index = this.path.replace(/^\//, "").split("/")[0];
    const docPath = context.modules[index] || "common";
    const isCommon = docPath.indexOf("common/") > -1;
    const name = isCommon ? context.projectName : (context.projectName + "/" + index);
    const srcPath = path.resolve(
      isCommon ? path.join(context.root, "src") : path.join(context.root, "src", index)
    );

    return {
      name,
      importFrom: name,
      docPath,
      srcPath,
      moduleSrcPath: context.srcDir + "/" + index,
      moduleLibPath: context.libDir + "/" + index,
      isCommon
    };
  }
}

module.exports.DocFile = DocFile;