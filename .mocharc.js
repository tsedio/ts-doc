process.env.NODE_ENV = "test";

module.exports = {
  recursive: true,
  reporter: "dot",
  spec: ["packages/**/*.spec.js"]
};
