const {join} = require("path");
const fixPath = require("normalize-path");

process.env.NODE_ENV = "test";
const rootDir = __dirname;

module.exports = {
  require: [
    !process.argv.includes("ts-node/register") && "ts-node/register/transpile-only"
  ].filter(Boolean),
  recursive: true,
  reporter: "dot",
  spec: [
    "packages/**/*.spec.ts"
  ]
};
