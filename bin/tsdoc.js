#!/usr/bin/env node

const { buildApi } = require("../lib/tasks/build-api");
const projectRoot = process.cwd();

buildApi({
  root: projectRoot,
  apiDir: `${projectRoot}/docs/api`,
  docsDir: `${projectRoot}/docs`,
  srcDir: `${projectRoot}/src`,
  libDir: `${projectRoot}/lib`,
  jsonOutputDir: `${projectRoot}/docs/api`
});