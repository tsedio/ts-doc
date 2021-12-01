import {existsSync, readFileSync, writeFileSync} from "fs";
import {join, resolve} from "path";
import {scanComponents, scanFiles} from "../src/scan/scan";
import {context} from "../src/context";

const ROOT_DIR = __dirname;
const SNAPSHOTS_DIR = resolve(join(ROOT_DIR, "snapshots"));
const DATA_DIR = resolve(join(ROOT_DIR, "data"));

export async function compilePage() {
  context.symbols.clear();
  context.github = "https://github.com/repo";
  context.version = "1.0.0";
  context.settings = {
    rootDir: DATA_DIR,
    packagesDir: "packages/",
    baseUrl: "/api",
    scope: "@tsed",
    scanPatterns: ["<rootDir>/packages/**/lib/**/*.d.ts"],
    modules: {}
  };

  context.logger = (() => {}) as any;
  context.logger.error = console.error as any;

  await scanComponents();
  await scanFiles(context.scanPatterns);

  return context.symbols.toArray().reduce((map: any, symbol: any) => {
    return map.set(symbol.symbolName, {
      symbol,
      ...symbol,
      key: symbol.symbolName,
      content: context.components.get("page")!(symbol)
    });
  }, new Map());
}

export function getSnapshot(symbol: any, write: any) {
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
