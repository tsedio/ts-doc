const {bindSymbols} = require("../code-highlight/highlight");
module.exports = {
  name: "symbolParams",
  trim: false,
  method(params, overview) {
    const signatureMatch = overview.match(/\((.*)\):/);
    const signature = signatureMatch[1] + ",";

    params = params.map((param) => {
      const matched = signature.match(new RegExp(`${param.paramKey}(\\?)?:?(.[^,]+),`));
      const type = (param.type || matched[2] ? matched[2].trim() : "")
        .split("|")
        .map((type) => {
          type = bindSymbols(type.trim(), "");

          if (type.startsWith("<") && type.endsWith(">")) {
            return type;
          }

          return `\`${type}\``;
        })
        .join("|");

      const description = (matched[1] ? "Optional. " : "") + param.description.replace(/Optional\.?/gi, "").trim();

      return {
        paramKey: param.paramKey,
        type: type.replace(/\|/gi, ' "&#124;" '),
        description
      };
    });

    return {
      params
    };
  }
};
