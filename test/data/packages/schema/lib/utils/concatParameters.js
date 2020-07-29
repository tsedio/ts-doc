"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function concatParameters(parameters, operation) {
    return parameters
        .map(param => {
        const f = operation.parameters.find((p) => p.in === param.in && p.name === param.name);
        return f || param;
    })
        .concat(...operation.parameters.filter((param) => param.in !== "path"));
}
exports.concatParameters = concatParameters;
//# sourceMappingURL=concatParameters.js.map