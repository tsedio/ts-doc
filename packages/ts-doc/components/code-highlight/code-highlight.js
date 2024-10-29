const {stripsComments} = require("../../src/utils/strips");
const {highlight} = require("./highlight");

module.exports = {
  name: "codeHighlight",
  trim: false,
  method(overview, symbolName, deprecated) {
    const code = highlight(stripsComments(overview), symbolName);
    return {code, deprecated};
  }
};
