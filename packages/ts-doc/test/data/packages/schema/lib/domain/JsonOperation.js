"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const core_1 = require("@tsed/core");
const httpStatusMessages_1 = require("../constants/httpStatusMessages");
const isSuccessStatus_1 = require("../utils/isSuccessStatus");
const JsonMap_1 = require("./JsonMap");
const JsonParameter_1 = require("./JsonParameter");
const JsonParameterTypes_1 = require("./JsonParameterTypes");
const JsonRequestBody_1 = require("./JsonRequestBody");
const JsonResponse_1 = require("./JsonResponse");
const JsonSchema_1 = require("./JsonSchema");
const SpecTypes_1 = require("./SpecTypes");
class JsonOperation extends JsonMap_1.JsonMap {
  constructor(obj = {}) {
    super({parameters: [], responses: new JsonMap_1.JsonMap(), ...obj});
    this.operationPaths = new Map();
  }
  get response() {
    return this.getResponses().get(this.getStatus().toString());
  }
  get status() {
    return this._status;
  }
  tags(tags) {
    super.set("tags", tags);
    return this;
  }
  addTags(tags) {
    tags = core_1.uniqBy([...(this.get("tags") || []), ...tags], "name");
    return this.tags(tags);
  }
  summary(summary) {
    super.set("summary", summary);
    return this;
  }
  operationId(operationId) {
    this.set("operationId", operationId);
    return this;
  }
  responses(responses) {
    this.set("responses", responses);
    return this;
  }
  defaultStatus(status) {
    this._status = status;
  }
  getStatus() {
    return this._status || 200;
  }
  addResponse(statusCode, response) {
    if (isSuccessStatus_1.isSuccessStatus(statusCode) && !this._status) {
      const res = this.getResponseOf(200);
      this.getResponses().set(statusCode.toString(), res).delete("200");
      this.defaultStatus(Number(statusCode));
    }
    const currentCode = statusCode === "default" ? this.getStatus().toString() : statusCode.toString();
    const currentResponse = this.getResponses().get(currentCode);
    if (!currentResponse) {
      this.getResponses().set(currentCode, response);
    } else {
      response.forEach((value, key) => {
        if (!["content"].includes(key)) {
          currentResponse.set(key, core_1.deepExtends(currentResponse.get(key), value));
        }
      });
    }
    return this;
  }
  getResponses() {
    return this.get("responses");
  }
  getResponseOf(status) {
    return (status === "default" ? this.response : this.getResponses().get(String(status))) || new JsonResponse_1.JsonResponse();
  }
  getHeadersOf(status) {
    return this.getResponseOf(status).get("headers") || {};
  }
  security(security) {
    this.set("security", security);
    return this;
  }
  addSecurityScopes(name, scopes) {
    const security = this.get("security") || {};
    security[name] = core_1.uniq([...(security[name] || []), ...scopes]);
    return this.security(security);
  }
  description(description) {
    super.set("description", description);
    return this;
  }
  deprecated(deprecated) {
    super.set("deprecated", deprecated);
    return this;
  }
  parameters(parameters) {
    super.set("parameters", parameters);
    return this;
  }
  addParameter(index, parameter) {
    this.get("parameters")[index] = parameter;
  }
  consumes(consumes) {
    super.set("consumes", consumes);
    return this;
  }
  produces(produces) {
    super.set("produces", produces);
    return this;
  }
  addProduce(produce) {
    const produces = core_1.uniq([].concat(this.get("produces"), produce)).filter(Boolean);
    this.set("produces", produces);
  }
  addOperationPath(method, path, options = {}) {
    this.operationPaths.set(String(method) + String(path), {
      ...options,
      method,
      path
    });
    return this;
  }
  toJSON(options = {}) {
    const operation = super.toJSON(options);
    const bodyParameters = [];
    const parameters = [];
    this.get("parameters").forEach((parameter) => {
      if (!JsonParameterTypes_1.isParameterType(this.get("in"))) {
        if (parameter.get("in")) {
          if (parameter.get("in") === JsonParameterTypes_1.JsonParameterTypes.BODY) {
            bodyParameters.push(parameter);
          } else {
            parameters.push(...[].concat(parameter.toJSON(options)));
          }
        }
      }
    });
    operation.parameters = parameters.filter(Boolean);
    if (this.get("responses").size === 0) {
      operation.responses = {
        200: {
          description: httpStatusMessages_1.HTTP_STATUS_MESSAGES[200]
        }
      };
    }
    if (bodyParameters.length) {
      const parameter = buildSchemaFromBodyParameters(bodyParameters);
      if (options.spec === SpecTypes_1.SpecTypes.OPENAPI) {
        operation.requestBody = toRequestBody(this, parameter).toJSON(options);
      } else {
        operation.parameters.push(toJsonParameter(parameter).toJSON(options));
      }
    }
    if (options.spec === SpecTypes_1.SpecTypes.OPENAPI) {
      delete operation.consumes;
      delete operation.produces;
    }
    return operation;
  }
}
exports.JsonOperation = JsonOperation;
function toRequestBody(operation, {schema, ...props}) {
  var _a;
  const requestBody = new JsonRequestBody_1.JsonRequestBody(props);
  const consumes = ((_a = operation.get("consumes")) === null || _a === void 0 ? void 0 : _a.length)
    ? operation.get("consumes")
    : ["application/json"];
  consumes.forEach((consume) => {
    requestBody.addContent(consume, schema);
  });
  return requestBody;
}
function toJsonParameter(parameter) {
  return new JsonParameter_1.JsonParameter({
    in: JsonParameterTypes_1.JsonParameterTypes.BODY,
    name: JsonParameterTypes_1.JsonParameterTypes.BODY,
    ...parameter
  });
}
function buildSchemaFromBodyParameters(parameters) {
  let schema = new JsonSchema_1.JsonSchema();
  const props = {};
  const refs = [];
  let propsLength = 0;
  parameters.forEach((parameter) => {
    const name = parameter.get("name");
    Array.from(parameter.entries())
      .filter(([key]) => !["in", "name"].includes(key))
      .forEach(([key, value]) => {
        if (props[key] === undefined) {
          props[key] = value;
        }
      });
    if (name) {
      schema.addProperties(name, parameter.$schema);
      if (parameter.get("required")) {
        schema.addRequired(name);
      }
      propsLength++;
    } else {
      refs.push(parameter.$schema);
    }
  });
  if (propsLength) {
    schema.type("object");
  } else if (refs.length === 1) {
    schema = refs[0];
  }
  if (refs.length >= 2) {
    schema.allOf(refs);
  }
  return {schema, required: false, ...props};
}
//# sourceMappingURL=JsonOperation.js.map
