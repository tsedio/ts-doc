"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
function getVariable(subpath) {
  const splited = subpath.split(".");
  const name = splited.splice(0, 1)[0];
  return {
    name,
    postfix: splited.length ? `.${splited.join(".")}` : ""
  };
}
function getJsonPathParameters(base, path = "") {
  if (path instanceof RegExp) {
    path = path.toString().replace(/^\//, "").replace(/\/$/, "").replace(/\\/, "");
  }
  const params = [];
  const paths = [];
  let isOptional = false;
  let current = "";
  `${base}${path}`
    .replace(/\((.*)\)/gi, "")
    .split("/")
    .filter((o) => !!o)
    .map((key) => {
      const subpath = key.replace(":", "").replace("?", "");
      if (key.includes(":")) {
        const optional = key.includes("?");
        // Append previous config
        if (optional && !isOptional) {
          isOptional = true;
          paths.push({
            path: current,
            parameters: [].concat(params)
          });
        }
        const {name, postfix} = getVariable(subpath);
        current += `/{${name}}${postfix}`;
        params.push({
          in: "path",
          name,
          type: "string",
          required: true
        });
        if (optional && isOptional) {
          paths.push({
            path: current,
            parameters: [].concat(params)
          });
        }
      } else {
        current += `/${key}`;
      }
    });
  return paths.length
    ? paths
    : [
        {
          path: current,
          parameters: [].concat(params)
        }
      ];
}
exports.getJsonPathParameters = getJsonPathParameters;
//# sourceMappingURL=getJsonPathParameters.js.map
