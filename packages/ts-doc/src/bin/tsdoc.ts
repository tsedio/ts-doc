#!/usr/bin/env node
import fs from "fs";
import {buildApi} from "../tasks/build-api";

const file = `${process.cwd()}/tsdoc.config.js`;
let config = {
  rootDir: process.cwd(),
  packagesDir: "packages/",
  scanPatterns: ["<rootDir>/packages/**/lib/**/*.d.ts", "!node_modules"],
  outputDir: "<rootDir>/docs/api",
  baseUrl: "/api",
  jsonOutputDir: "<rootDir>/docs/.vuepress/public",
  modules: {}
};

if (fs.existsSync(file)) {
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Buffer' is not assignable to par... Remove this comment to see the full error message
  config = JSON.parse(fs.readFileSync(file));
}

buildApi(config);
