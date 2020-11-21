const path = require("path");
const normalizePath = require("normalize-path");
const {context} = require("../context");
const {descriptionParser} = require("../parsers/description-parser.js");

const _filterParams = (labels) => {
  return labels
    .filter((o) => o.key === "param")
    .map((o) => {
      let type = o.value.match(/{(.*)}/);

      if (type) {
        o.value = o.value.replace(/{(.*)}/, "").trim();
        type = type[1];
      }

      const spaceIndex = o.value.trim().indexOf(" ");
      if (spaceIndex === -1) {
        return;
      }

      const paramKey = o.value.slice(0, spaceIndex);
      const description = o.value.slice(spaceIndex + 1, o.value.length);
      return {
        paramKey,
        type,
        description
      };
    })
    .filter((o) => !!o);
};

class DocSymbol {
  constructor() {
    this.symbolName = "";
    this.abstract = false;
    this.symbolType = "";
    this.symbolLabel = "";
    this.symbolCode = "";
    this.extends = "";
    this.implements = [];
    this.members = [];
    this.description = "";
    this.exported = false;
    this.labels = [];
  }

  get path() {
    return this.docFile.path;
  }

  get srcPath() {
    return this.docFile.srcPath;
  }

  /**
   *
   * @returns {*}
   */
  get file() {
    return this.docFile.file;
  }

  /**
   *
   * @returns {*}
   */
  get relativePackagePath() {
    return this.docFile.relativePackagePath;
  }

  /**
   *
   * @returns {*|string|rules.module}
   */
  get module() {
    return this.docFile.module;
  }

  /**
   *
   * @returns {string}
   */
  get githubUrl() {
    return `${context.host}${this.docFile.relativePath}#L${0}-L${0}`;
  }

  /**
   *
   * @returns {string}
   */
  get importFrom() {
    const {importFrom, modulePath} = this.module;

    if (!this.private) {
      return importFrom;
    }

    return path.join(context.scope, this.docFile.relativePackagePath.replace(/\.ts$/, ""));
  }

  /**
   *
   * @returns {void | string | *}
   */
  get relativePath() {
    return normalizePath(this.docFile.srcPath.replace(context.rootDir, ""));
  }

  /**
   *
   * @returns {*}
   */
  get url() {
    const url = [
      context.baseUrl,
      normalizePath(path.dirname(this.docFile.relativePackagePath)), //.replace(/\.ts$/, '')
      `${this.symbolName}.html`
    ].join("/");

    return context.outputResolver(url);
  }

  /**
   *
   * @returns {*}
   */
  get outputPath() {
    const file = normalizePath(path.join(context.outputDir, path.dirname(this.docFile.relativePackagePath), `${this.symbolName}.md`));

    return context.outputResolver(file);
  }

  /**
   *
   * @param tabLevel
   * @param line
   * @param description
   */
  appendMember(line, description) {
    description = descriptionParser(description);

    this.members.push({
      description: description.content,
      labels: description.labels,
      overview: [line.trim()]
    });
  }

  addLineToMember(line) {
    this.members[this.members.length - 1].overview.push(line.replace("   ", ""));
  }

  getMembers() {
    return this.members.map((member) => {
      member.params = _filterParams(member.labels);
      member.overview = member.overview.join("\n");
      return member;
    });
  }

  setDocFile(docFile) {
    this.docFile = docFile;

    if (this.relativePath.match("decorators") && this.symbolType === "function") {
      this.symbolType = "decorator";
      this.symbolLabel = context.symbolTypes["decorator"].label;
      this.symbolCode = context.symbolTypes["decorator"].code;
    }

    if (this.relativePath.match("services") && this.symbolType === "function") {
      this.symbolType = "service";
      this.symbolLabel = context.symbolTypes["service"].label;
      this.symbolCode = context.symbolTypes["service"].code;
    }

    if (this.private === undefined) {
      if (this.symbolType !== "interface") {
        this.private = true;

        const exported = this.docFile.requireModule();

        if (exported) {
          const symbolPrivate = exported[this.symbolName.trim()];

          this.private = !symbolPrivate;
        }

        if (this.private) {
          this.labels.push({key: "private", value: "private"});
        }
      }
    }
  }

  isPrivate() {
    return this.private;
  }

  hasLabel(key) {
    return !!this.labels.find((label) => label.key === key);
  }

  merge(symbol) {
    if (symbol.symbolType !== "const") {
      this.symbolType = symbol.symbolType;
      this.symbolCode = symbol.symbolCode;
      this.symbolLabel = symbol.symbolLabel;
    }

    if (this.description === "") {
      this.description = symbol.description;
      this.labels = symbol.labels;
    }

    if (this.overview !== symbol.overview) {
      this.overview = this.overview + "\n" + symbol.overview;
    }
  }

  getParams() {
    return _filterParams(this.labels);
  }
}

module.exports.DocSymbol = DocSymbol;
