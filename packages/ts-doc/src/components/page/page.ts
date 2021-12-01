export const page = {
  name: "page",
  trim: false,
  method(symbol: any) {
    let params = [],
      hasParams = false;
    let description = symbol.description || "";

    if (symbol.symbolType === "function" || symbol.symbolType === "decorator") {
      params = symbol.getParams();
      hasParams = params.length && symbol.overview.match(/\((.*)\):/);
    }

    return {
      params,
      hasParams,
      symbol,
      description
    };
  }
};
