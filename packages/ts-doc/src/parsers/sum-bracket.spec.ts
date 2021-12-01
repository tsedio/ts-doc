// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'chai... Remove this comment to see the full error message
import {expect} from "chai";
import {sumBracket} from "./sum-bracket";

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("sumBracket", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("should return the right result", () => {
    expect(sumBracket('import { JsonHeader, JsonHeaders } from "../../interfaces/JsonOpenSpec";')).to.equal(0);
    expect(sumBracket("export interface ReturnsChainedDecorators extends MethodDecorator {")).to.equal(1);
    expect(sumBracket("Header(key: string, value: number | string | (JsonHeader & {")).to.equal(1);
    expect(sumBracket("value?: string | number;")).to.equal(0);
    expect(sumBracket("})): this;")).to.equal(-1);
  });
});
