import fs from "fs";
import ejs from "ejs";
import {context, modules} from "../context";

export function render(filename: string, scope: Record<string, any> = {}) {
  const {components, symbols, version, projectName} = context;

  scope = Object.assign(scope, {
    version,
    scope: context.scope,
    projectName,
    components,
    symbols,
    modules: modules()
  });

  const template = fs.readFileSync(filename, {encoding: "utf8"});

  return ejs.render(template, scope, {
    filename,
    rmWhitespace: false
  });
}
