#!/usr/bin/env node

const { buildApi } = require('../src/tasks/build-api');

buildApi({
  rootDir: process.cwd(),
  packagesDir: 'packages/',
  scanPatterns: [
    '<rootDir>/packages/**/lib/**/*.d.ts',
    '!node_modules'
  ],
  outputDir: '<rootDir>/docs/api',
  baseUrl: '/api',
  jsonOutputDir: '<rootDir>/docs/.vuepress/public',
  modules: {}
});