import {context} from "./context";

export function symbolTypes() {
  const list: any = [];
  Object.keys(context.symbolTypes)
    .filter((key) => key.length === 1)
    .sort()
    .forEach((k) => {
      list.push(context.symbolTypes[k]);
    });

  return list;
}
