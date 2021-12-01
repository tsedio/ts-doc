// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'chai... Remove this comment to see the full error message
import {expect} from "chai";
import {highlight} from "./index";

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Highlight", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("should highlight content", () => {
    const content =
      "export declare function UseFilter(token: Type<any> | ParamTypes | string, options?: IParamOptions<any>): ParameterDecorator;";
    const ctx = {
      symbols: new Map()
    };

    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ symbols: Map<any, any>; }' is ... Remove this comment to see the full error message
    const result = highlight(content, "UseFilter", ctx);

    expect(result).to.equal(
      '<span class="token keyword">export</span> declare function <span class="token function">UseFilter</span><span class="token punctuation">(</span>token<span class="token punctuation">:</span> Type&lt;<span class="token keyword">any</span>&gt; | ParamTypes | <span class="token keyword">string</span><span class="token punctuation">,</span> options?<span class="token punctuation">:</span> IParamOptions&lt;<span class="token keyword">any</span>&gt;<span class="token punctuation">)</span><span class="token punctuation">:</span> ParameterDecorator<span class="token punctuation">;</span>'
    );
  });
});
