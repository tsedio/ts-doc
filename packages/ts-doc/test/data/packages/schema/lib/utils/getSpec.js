"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const core_1 = require("@tsed/core");
const JsonEntityStore_1 = require("../domain/JsonEntityStore");
const SpecTypes_1 = require("../domain/SpecTypes");
const buildPath_1 = require("./buildPath");
const getOperationsStores_1 = require("./getOperationsStores");
const mergeOperation_1 = require("./mergeOperation");
const operationIdFormatter_1 = require("./operationIdFormatter");
const caches = new Map();
function get(model, options, cb) {
  if (!caches.has(model)) {
    caches.set(model, new Map());
  }
  const cache = caches.get(model);
  const key = JSON.stringify(options);
  if (!cache.has(key)) {
    cache.set(key, cb());
  }
  return cache.get(key);
}
/**
 * Return the swagger or open spec for the given class
 * @param model
 * @param options
 */
function getSpec(model, options = {}) {
  if (!options.spec || options.spec === SpecTypes_1.SpecTypes.JSON) {
    options.spec = SpecTypes_1.SpecTypes.SWAGGER;
  }
  options = {
    operationIdFormatter: options.operationIdFormatter || operationIdFormatter_1.operationIdFormatter(options.operationIdPattern),
    ...options,
    root: false,
    spec: options.spec
  };
  return get(model, options, () => {
    const store = JsonEntityStore_1.JsonEntityStore.from(model);
    const {spec = SpecTypes_1.SpecTypes.SWAGGER, schemas = {}, paths = {}, rootPath = "/", tags = []} = options;
    const ctrlPath = store.path;
    const defaultTags = core_1.cleanObject({
      name: store.schema.getName(),
      description: store.schema.get("description")
    });
    const specJson = {paths};
    getOperationsStores_1.getOperationsStores(model).forEach((operationStore) => {
      const operation = operationStore.operation.toJSON({...options, spec, schemas});
      operationStore.operation.operationPaths.forEach(({path, method}) => {
        if (method) {
          mergeOperation_1.mergeOperation(specJson, operation, {
            rootPath: buildPath_1.buildPath(rootPath + ctrlPath),
            path,
            method,
            defaultTags,
            tags,
            operationId: (path) => {
              var _a;
              return (_a = options.operationIdFormatter) === null || _a === void 0
                ? void 0
                : _a.call(
                    options,
                    operationStore.parent.schema.get("name") || operationStore.parent.targetName,
                    operationStore.propertyName,
                    path
                  );
            }
          });
        }
      });
    });
    specJson.tags = core_1.uniqBy(tags, "name");
    if (spec === SpecTypes_1.SpecTypes.OPENAPI) {
      specJson.components = {
        schemas
      };
    } else {
      specJson.definitions = schemas;
    }
    return specJson;
  });
}
exports.getSpec = getSpec;
//# sourceMappingURL=getSpec.js.map
