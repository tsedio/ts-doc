import {context} from "./context";

export function modules() {
  return Object.keys(context.modules).reduce((acc, key) => {
    const mods = context.modules[key];
    if (typeof mods === "string") {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      acc.push(mods);
    } else {
      Object.keys(mods).forEach((subKey) => {
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
        acc.push(mods[subKey]);
      });
    }
    return acc;
  }, []);
}
