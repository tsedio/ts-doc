export const symbolHeader = {
  name: "symbol-header",
  trim: true,
  method(symbol: any) {
    const ignoreLabels = ["type", "returns", "decorator", "param", "constructor"];
    const id = symbol.symbolName.replace(/ /gi, "").toLowerCase();
    let isPrivateAdded: any;

    const labels = (symbol.labels || [])
      .filter((label: any) => ignoreLabels.indexOf(label.key) === -1)
      .filter((label: any) => {
        if (label.key === "private" && !isPrivateAdded) {
          isPrivateAdded = true;
          return true;
        }
        if (label.key === "private") {
          return !isPrivateAdded;
        }
        return true;
      });

    return {
      id,
      symbol,
      labels
    };
  }
};
