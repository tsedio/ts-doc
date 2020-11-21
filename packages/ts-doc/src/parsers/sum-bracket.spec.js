const {expect} = require("chai");
const {sumBracket} = require("./sum-bracket");

describe("sumBracket", () => {
  it("should return the right result", () => {
    expect(sumBracket('import { JsonHeader, JsonHeaders } from "../../interfaces/JsonOpenSpec";')).to.equal(0);
    expect(sumBracket("export interface ReturnsChainedDecorators extends MethodDecorator {")).to.equal(1);
    expect(sumBracket("Header(key: string, value: number | string | (JsonHeader & {")).to.equal(1);
    expect(sumBracket("value?: string | number;")).to.equal(0);
    expect(sumBracket("})): this;")).to.equal(-1);
  });
});
