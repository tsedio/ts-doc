const { highlight } = require("../../lib/parsers/highlight");

module.exports = {
  name: "codeHighlight",
  trim: false,
  method(overview, symbolName, deprecated) {
    const code = highlight(overview, symbolName);
    return { code, deprecated };
  }
};