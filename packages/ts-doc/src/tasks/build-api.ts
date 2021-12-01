import logger from "fancy-log";
import chalk from "chalk";
import {context} from "../context";
import {writeJson, writeSymbol} from "../write/write";
import {scanComponents, scanFiles} from "../scan/scan";

export async function buildApi(config: any) {
  context.set(config);
  try {
    await context.readPkg();
    await scanComponents();
    await scanFiles(context.scanPatterns);

    let symbols = 0;

    context.symbols.forEach((symbol) => {
      const renderer = context.components.get("page");

      if (renderer) {
        const content = renderer(symbol);
        symbols++;

        return writeSymbol(symbol, content);
      }
    });
    logger(`${chalk.green(symbols)} symbols write`);

    // .then(() => writeTemplate(context.docsDir + '/**/*.{ejs,emd}'))
    await writeJson();
    await logger("done");
  } catch (err) {
    console.error(err);
  }
}
