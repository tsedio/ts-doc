#!/usr/bin/env node
const fs = require("fs");
const {buildApi} = require("../src/tasks/build-api");

let config = {
  rootDir: process.cwd(),
  packagesDir: "packages/",
  scanPatterns: ["<rootDir>/packages/**/lib/**/*.d.ts", "!node_modules"],
  outputDir: "<rootDir>/docs/api",
  baseUrl: "/api",
  jsonOutputDir: "<rootDir>/docs/.vuepress/public",
  modules: {}
};

const fileJS = `${process.cwd()}/tsdoc.config.js`;
if (fs.existsSync(fileJS)) {
  config = require(fileJS);
}

const fileCJS = `${process.cwd()}/tsdoc.config.cjs`;
if (fs.existsSync(fileCJS)) {
  config = require(fileCJS);
}

buildApi(config);
