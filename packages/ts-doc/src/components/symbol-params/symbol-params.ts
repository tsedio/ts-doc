import {bindSymbols} from "../../highlight";
import {context} from "../../context/context"

export const symbolParams = {
  name: "symbol-params",
  trim: false,
  method(params: { paramKey: string, type: string, description: string}[], overview: string) {
    const signatureMatch = overview.match(/\((.*)\):/);
    const signature = signatureMatch ? signatureMatch[1] + "," : "";

    const mapped = params.map((param: any) => {
      const matched = signature.match(new RegExp(`${param.paramKey}(\\?)?:?(.[^,]+),`));

      if (matched) {
        const type = (param.type || matched[2] ? matched[2].trim() : "")
          .split("|")
          .map((type) => {
            type = bindSymbols(type.trim(), "", context);

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
      }
    }).filter(Boolean);

    return {
      params: mapped
    };
  }
};
