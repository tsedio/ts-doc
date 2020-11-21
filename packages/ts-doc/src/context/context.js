const readPkgUp = require("read-pkg-up");
const logger = require("fancy-log");
const normalizePath = require("normalize-path");

const SYMBOL_TYPES = {
  "@": {value: "decorator", label: "Decorator"},
  T: {value: "type", label: "Type alias"},
  C: {value: "class", label: "Class"},
  S: {value: "service", label: "Service"},
  I: {value: "interface", label: "Interface"},
  K: {value: "const", label: "Constant"},
  E: {value: "enum", label: "Enum"},
  F: {value: "function", label: "Function"}
};

const SYMBOL_STATUS = {
  S: {value: "stable", label: "Stable"},
  D: {value: "deprecated", label: "Deprecated"},
  E: {value: "experimental", label: "Experimental"},
  P: {value: "private", label: "Private"},
  O: {value: "public", label: "Public"}
};

const reverseKeys = (obj) => {
  Object.keys(obj).forEach((key) => {
    obj[key].code = key;
    obj[obj[key].value] = obj[key];
  });

  return obj;
};

module.exports = {
  settings: {},
  symbolTypes: reverseKeys(SYMBOL_TYPES),
  symbolStatus: SYMBOL_STATUS,
  status: SYMBOL_STATUS,
  symbols: require("./symbols"),
  /**
   *
   */
  components: {},

  logger: logger,

  get rootDir() {
    return normalizePath(this.settings.rootDir);
  },

  get packagesDir() {
    return normalizePath(this.settings.packagesDir);
  },

  get scanPatterns() {
    return this.settings.scanPatterns.map((s) => {
      return s.replace("<rootDir>", this.rootDir);
    });
  },
  get outputDir() {
    return normalizePath(this.settings.outputDir.replace("<rootDir>", this.rootDir));
  },

  get jsonOutputDir() {
    return normalizePath(this.settings.jsonOutputDir.replace("<rootDir>", this.rootDir));
  },

  get baseUrl() {
    return this.settings.baseUrl;
  },

  get scope() {
    return this.settings.scope;
  },

  get modules() {
    return this.settings.modules;
  },

  get host() {
    return `${this.github}/blob/v${this.version}/`;
  },

  srcResolver(dtsFile) {
    dtsFile = normalizePath(dtsFile);
    dtsFile = normalizePath(this.settings.srcResolver ? this.settings.srcResolver(dtsFile) : dtsFile.replace("lib/", "src/"));

    return dtsFile;
  },

  outputResolver(file) {
    file = normalizePath(file);
    file = normalizePath(
      this.settings.outputFileResolver ? this.settings.outputFileResolver(file) : file.replace("src/", "").replace("lib/", "")
    );

    return file;
  },

  set(obj) {
    this.settings = obj;
  },

  readPkg() {
    return readPkgUp().then((result) => {
      module.exports.importPkg(result.packageJson);
      return result.packageJson;
    });
  },

  importPkg(pkg) {
    const {name, repository, version, tsdoc} = pkg;

    this.github = repository.url.replace(".git", "").replace("git+", "");
    this.version = version;
    this.projectName = name;

    if (tsdoc) {
      this.settings.modules = tsdoc.modules;
      this.settings.scope = tsdoc.scope;
    }
  }
};
