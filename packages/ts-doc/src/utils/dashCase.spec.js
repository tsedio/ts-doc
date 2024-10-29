const {expect} = require("chai");
const {dashCase} = require("./dashCase");

describe("dashCase", () => {
  it("should convert camelCase to dash-case", () => {
    expect(dashCase("camelCase")).to.equal("camel-case");
    expect(dashCase("camelCase-test")).to.equal("camel-case-test");
    expect(dashCase("")).to.equal("");
    expect(dashCase("XMLHttpRequest")).to.equal("xml-http-request");
    expect(dashCase("__foo_bar__")).to.equal("foo-bar");
    expect(dashCase("  spaced  words  ")).to.equal("spaced-words");
  });
});
