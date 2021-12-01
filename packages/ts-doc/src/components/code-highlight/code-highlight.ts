import {stripsComments} from "../../utils/strips";
import {highlight} from "../../highlight";

export const codeHighlight = {
  name: "code-highlight",
  trim: false,
  method(overview: string, symbolName: string, deprecated: boolean) {
    const code = highlight(stripsComments(overview), symbolName);
    return {code, deprecated};
  }
};
