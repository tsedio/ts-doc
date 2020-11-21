const {expect} = require("chai");
const symbolParamsComponent = require("./symbol-params");

describe("Symbol-params.spec.js", () => {
  it("should return object", () => {
    const params = [
      {
        paramKey: "cb",
        type: null,
        description: "Callback to know if the property must be ignored"
      }
    ];
    const overview = "function Ignore(cb?: boolean | IgnoreCallback): (...args: any[]) => any;";

    const result = symbolParamsComponent.method(params, overview);

    expect(result).to.deep.equal({
      params: [
        {
          description: "Optional. Callback to know if the property must be ignored",
          paramKey: "cb",
          type: '`boolean` "&#124;" `IgnoreCallback`'
        }
      ]
    });
  });
});
