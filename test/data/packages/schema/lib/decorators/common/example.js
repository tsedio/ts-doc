"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@tsed/core");
const jsonEntityFn_1 = require("./jsonEntityFn");
function Example(name, description) {
    let example;
    if (description) {
        example = { [name]: description };
    }
    else {
        example = name;
        if (typeof name === "string") {
            example = [].concat(example);
        }
    }
    return jsonEntityFn_1.JsonEntityFn((store, args) => {
        switch (core_1.getDecoratorType(args, true)) {
            case core_1.DecoratorTypes.CLASS:
            case core_1.DecoratorTypes.PROP:
                store.schema.examples(example);
                break;
            default:
                throw new core_1.UnsupportedDecoratorType(Example, args);
        }
    });
}
exports.Example = Example;
//# sourceMappingURL=example.js.map