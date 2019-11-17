#!/usr/bin/env node
const fs = require("fs");
const {buildApi} = require("../src/tasks/build-api");

const file = `${process.cwd()}/tsdoc.config.js`;
let config = {
  rootDir: process.cwd(),
  packagesDir: "packages/",
  scanPatterns: [
    "<rootDir>/packages/**/lib/**/*.d.ts",
    "!node_modules"
  ],
  outputDir: "<rootDir>/docs/api",
  baseUrl: "/api",
  jsonOutputDir: "<rootDir>/docs/.vuepress/public",
  modules: {}
};

if (fs.existsSync(file)) {
  config = require(file);
}

buildApi(config);
