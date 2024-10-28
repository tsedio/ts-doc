const {existsSync, writeFileSync, readFileSync} = require("fs");
const {resolve, join} = require("path");
const {scanComponents, scanFiles} = require("../src/scan/scan");
const {context} = require("../src/context");
const path = require("path");

const ROOT_DIR = __dirname;
const SNAPSHOTS_DIR = resolve(join(ROOT_DIR, "snapshots"));
const COMPONENTS_DIR = resolve(join(ROOT_DIR, "../components"));
const DATA_DIR = resolve(join(ROOT_DIR, "data"));

async function compilePage() {
  context.symbols.clear();
  context.github = "https://github.com/repo";
  context.version = "1.0.0";
  context.settings = {
    rootDir: DATA_DIR,
    packagesDir: "packages/",
    baseUrl: "/api",
    scope: "@tsed",
    scanPatterns: ["<rootDir>/packages/**/lib/**/*.d.ts"],
    templatesDir: COMPONENTS_DIR,
    modules: {}
  };

  context.logger = () => {};
  context.logger.error = console.error;

  await scanComponents(context.settings.templatesDir);
  await scanFiles(context.scanPatterns);

  return context.symbols.toArray().reduce((map, symbol) => {
    return map.set(symbol.symbolName, {
      symbol,
      ...symbol,
      key: symbol.symbolName,
      content: context.components.page(symbol)
    });
  }, new Map());
}

exports.compilePage = compilePage;

function getSnapshot(symbol, write) {
  if (!symbol) {
    return "";
  }

  const {key, content} = symbol;
  const file = join(SNAPSHOTS_DIR, `${key}.md`);

  if (!existsSync(file) || write) {
    writeFileSync(file, content, {encoding: "utf8"});
  }

  return readFileSync(file, {encoding: "utf8"});
}

exports.getSnapshot = getSnapshot;
