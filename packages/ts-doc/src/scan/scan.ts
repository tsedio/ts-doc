import globby from "globby";
import path from "path";
import chalk from "chalk";
import {render} from "../render/render";
import {context} from "../context";
import {trim} from "../utils/trim";
import {DocParser} from "../parsers/DocParser";
import {DocFile} from "../models/DocFile";
import * as Components from "../components";
import {DocSymbol} from "../models/DocSymbol";

const TEMPLATE_DIR = path.resolve(__dirname, "..", "..", "src", "components");

export async function scanComponents() {
  Object.entries(Components).map(([key, component]: [string, {method: any, name: string, trim: boolean}]) => {
    const file = path.join(TEMPLATE_DIR, component.name, `${component.name}.ejs`);

    context.components.set(key, (...args) => {
      const content = render(file, component.method(...args));

      if (component.trim) {
        return trim(content);
      }

      return "\n" + content + "\n";
    });

    context.logger("Import component '" + chalk.cyan(path.basename(file)) + "'");
  });
}

/**
 *
 * @param patterns
 */
export async function scanFiles(patterns: string | string[]) {
  context.logger("Scan folders '" + chalk.cyan(JSON.stringify(patterns)) + "'");

  let symbolsSize = 0;
  const files = await globby(patterns);

  const promises = files.map(async (file) => {
    try {
      const symbols = await DocParser.parse(new DocFile(file));

      symbols.forEach((symbol) => {
        context.logger(`Scanned symbol '${chalk.cyan(symbol.symbolName)}'`);
        symbolsSize++;
      });
    } catch (er) {
      context.logger.error(chalk.red(er), er.stack);
    }
  });

  await Promise.all(promises);

  context.logger(`${chalk.green(symbolsSize)} scanned symbols`);
}
