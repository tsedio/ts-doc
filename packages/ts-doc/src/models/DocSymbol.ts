import path from "path";
import normalizePath from "normalize-path";
import {context} from "../context";
import {descriptionParser} from "../parsers/description-parser";

const _filterParams = (labels: any) => {
  return labels
    .filter((o: any) => o.key === "param")
    .map((o: any) => {
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
    .filter((o: any) => !!o);
};

export class DocSymbol {
  public abstract: any;
  public description: string = "";
  public docFile: any;
  public exported: any;
  public extends: string = "";
  public implements: any;
  public labels: { key: string, value: string }[] = [];
  public members: any[] = [];
  public overview: string = "";
  public private: boolean;
  public symbolCode: string = "";
  public symbolLabel: string = "";
  public symbolName: string = "";
  public symbolType: string = "";
  public rawContent: any;
  public startLine: number;
  public endLine: number;

  constructor() {
    this.abstract = false;
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
    const {importFrom} = this.module;

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
   * @param line
   * @param description
   */
  appendMember(line: any, description: any) {
    description = descriptionParser(description);

    this.members.push({
      description: description.content,
      labels: description.labels,
      overview: [line.trim()]
    });
  }

  addLineToMember(line: any) {
    this.members[this.members.length - 1].overview.push(line.replace("   ", ""));
  }

  getMembers() {
    return this.members.map((member: any) => {
      member.params = _filterParams(member.labels);
      member.overview = member.overview.join("\n");
      return member;
    });
  }

  async setDocFile(docFile: any) {
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

        const exported = await this.docFile.requireModule();

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

  getParams() {
    return _filterParams(this.labels);
  }
}
