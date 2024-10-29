const {expect} = require("chai");
const {highlight} = require("./highlight");

describe("Highlight", () => {
  it("should highlight content", () => {
    const content =
      "export declare function UseFilter(token: Type<any> | ParamTypes | string, options?: IParamOptions<any>): ParameterDecorator;";
    const ctx = {
      symbols: new Map()
    };

    const result = highlight(content, "UseFilter", ctx);

    expect(result).to.equal(
      '<span class="token keyword">export</span> declare function <span class="token function">UseFilter</span><span class="token punctuation">(</span>token<span class="token punctuation">:</span> Type&lt;<span class="token keyword">any</span>&gt; | ParamTypes | <span class="token keyword">string</span><span class="token punctuation">,</span> options?<span class="token punctuation">:</span> IParamOptions&lt;<span class="token keyword">any</span>&gt;<span class="token punctuation">)</span><span class="token punctuation">:</span> ParameterDecorator<span class="token punctuation">;</span>'
    );
  });
});
