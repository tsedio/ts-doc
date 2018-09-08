const { highlight } = require("../../src/highlight");

module.exports = {
  name: "codeHighlight",
  trim: false,
  method(overview, symbolName, deprecated) {
    const code = highlight(overview, symbolName);
    return { code, deprecated };
  }
};