const path = require("path");
const {context} = require("../context/index");
const {descriptionParser} = require("../parsers/description-parser.js");

const mapExported = new Map();

const getExportedModule = (path) => {

  if (!mapExported.has(path)) {
    mapExported.set(path, require(path));
  }

  return mapExported.get(path);
};

const _filterParams = (labels) => {

  return labels.filter(o => o.key === "param")
    .map(o => {
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
    .filter(o => !!o);
};

class DocSymbol {

  constructor() {
    this.symbolName = "";
    this.module = "";
    this.github = "";
    this.url = "";
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

  /**
   *
   * @param tabLevel
   * @param line
   * @param description
   */
  appendMember(tabLevel, line, description) {

    if (tabLevel > 1) {
      this.members[this.members.length - 1].overview.push(line.replace("   ", ""));
      return;
    }

    if (line.indexOf("}") > -1) {
      this.members[this.members.length - 1].overview.push(line.replace("   ", ""));
      return;
    }

    description = descriptionParser(description);

    this.members.push({
      description: description.content,
      labels: description.labels,
      overview: [line.trim().replace(";", "")]
    });

  }

  getMembers() {
    return this.members.map(member => {
      member.params = _filterParams(member.labels);
      member.overview = member.overview.join("\n");
      return member;
    });
  }

  setDocFile(docFile) {
    this.file = docFile.file;
    this.path = docFile.path;
    this.srcPath = docFile.srcPath;
    this.module = docFile.module;
    this.url = `${context.host}${docFile.path}#L${0}-L${0}`;

    if (this.path.match("decorators")) {
      this.symbolType = "decorator";
      this.symbolLabel = context.symbolTypes["decorator"].label;
      this.symbolCode = context.symbolTypes["decorator"].code;
    }

    if (this.path.match("services")) {
      this.symbolType = "service";
      this.symbolLabel = context.symbolTypes["service"].label;
      this.symbolCode = context.symbolTypes["service"].code;
    }
    this.isPrivate();
  }

  isPrivate() {
    if (this.private === undefined) {
      if (this.symbolType !== "interface") {
        try {
          const exported = getExportedModule(this.module.moduleLibPath + "/index.js");
          const symbolPrivate = exported[this.symbolName.trim()];

          this.private = !symbolPrivate;
          if (this.private) {
            this.labels.push({key: "private", value: "private"});
          }
        } catch (er) {
          this.private = true;
          this.labels.push({key: "private", value: "private"});
          console.error("Error on exported module", this.module.moduleLibPath + "/index.js", this.symbolName.trim(), er);
        }
      }
    }

    return this.private;
  }

  hasLabel(key) {
    return !!this.labels.find(label => label.key === key);
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

  modulePath() {
    const isPrivate = this.isPrivate();

    if (!isPrivate) {
      return this.module.importFrom;
    }

    if (context.scope) {
      const src = this.srcPath
        .replace(path.join(context.srcDir, this.module.pkgName) + "/", "")
        .replace(/\.ts$/, "");

      return context.scope + "/" + this.module.pkgName + "/" + src;
    }

    const src = context.libDir.replace(context.root, "");
    const entityPath = this.srcPath.replace(context.srcDir, src).replace(/\.ts$/, "");
    return context.projectName + entityPath;
  }

  apiPath() {
    return "/" + path.join("api", path.dirname(this.path), this.symbolName);
  }

  getParams() {
    return _filterParams(this.labels);
  }

  serialize() {
    return [
      this.module.docPath,
      this.symbolName,
      this.symbolType,
      this.symbolCode,
      this.hasLabel("deprecated"),
      this.hasLabel("stable"),
      this.hasLabel("experimental"),
      this.hasLabel("private")
    ].join(";");
  }
}

module.exports.DocSymbol = DocSymbol;