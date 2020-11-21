"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const core_1 = require("@tsed/core");
const JsonOperation_1 = require("./JsonOperation");
const JsonParameter_1 = require("./JsonParameter");
const JsonSchema_1 = require("./JsonSchema");
const getSchema = (type) => {
  if (core_1.isCollection(type) || !core_1.isClass(type)) {
    return JsonSchema_1.JsonSchema.from({
      type
    });
  }
  return JsonEntityStore.from(type).schema;
};
class JsonEntityStore extends core_1.Entity {
  constructor(options) {
    super(options);
    this.isStore = true;
    /**
     * List of children JsonEntityStore (properties or methods or params)
     */
    this.children = new Map();
    /**
     * Path used to generate open spec.
     */
    this.path = "/";
    this.store = options.store;
    /* istanbul ignore next */
    if (options.children) {
      this.children = options.children;
    }
    this.build();
  }
  /**
   * Return the JsonSchema
   */
  get schema() {
    return this._schema;
  }
  /**
   * Return the JsonOperation
   */
  get operation() {
    return this._operation;
  }
  /**
   * Return the JsonParameter
   */
  get parameter() {
    return this._parameter;
  }
  get nestedGenerics() {
    switch (this.decoratorType) {
      case core_1.DecoratorTypes.PARAM:
        return this.parameter.nestedGenerics;
      default:
        return this.schema.nestedGenerics;
    }
  }
  set nestedGenerics(nestedGenerics) {
    switch (this.decoratorType) {
      case core_1.DecoratorTypes.PARAM:
        this.parameter.nestedGenerics = nestedGenerics;
        break;
      default:
        this.schema.nestedGenerics = nestedGenerics;
        break;
    }
  }
  /**
   *
   * @returns {Type<any>}
   */
  get type() {
    return this._type;
  }
  /**
   * Get original type without transformation
   * @param value
   */
  set type(value) {
    this._type = value;
    this.build();
  }
  /**
   * Return the itemSchema computed type. if the type is a function used for recursive model, the function will be called to
   * get the right type.
   */
  get computedType() {
    return this.itemSchema.getComputedType();
  }
  get itemSchema() {
    return this.isCollection ? this.schema.itemSchema() : this.schema;
  }
  get parentSchema() {
    return this.parent.schema;
  }
  get parent() {
    const {target, propertyKey, decoratorType} = this;
    switch (decoratorType) {
      case core_1.DecoratorTypes.PARAM:
        return JsonEntityStore.fromMethod(target, propertyKey);
      case core_1.DecoratorTypes.METHOD:
      case core_1.DecoratorTypes.PROP:
        return JsonEntityStore.from(target);
    }
    return this;
  }
  /**
   *
   * @param args
   */
  static from(...args) {
    const store = core_1.Store.from(...args);
    if (!store.has(JsonEntityStore)) {
      const entityStore = JsonEntityStore.entities.get(core_1.decoratorTypeOf(args)) || JsonEntityStore;
      const jsonSchemaStore = new entityStore({
        store,
        target: args[0],
        propertyKey: args[1],
        index: typeof args[2] === "number" ? args[2] : undefined,
        descriptor: typeof args[2] === "object" ? args[2] : undefined
      });
      store.set(JsonEntityStore, jsonSchemaStore);
    }
    return store.get(JsonEntityStore);
  }
  static fromMethod(target, propertyKey) {
    return this.from(target, propertyKey, core_1.descriptorOf(target, propertyKey));
  }
  build() {
    if (!this._type) {
      let type;
      switch (this.decoratorType) {
        case core_1.DecoratorTypes.PARAM:
          type = core_1.Store.getParamTypes(this.target, this.propertyKey)[this.index];
          break;
        case core_1.DecoratorTypes.CLASS:
          type = this.target;
          break;
        case core_1.DecoratorTypes.PROP:
          type = core_1.Store.getType(this.target, this.propertyKey);
          break;
        case core_1.DecoratorTypes.METHOD:
          type = core_1.Store.getReturnType(this.target, this.propertyKey);
          type = core_1.isPromise(type) ? undefined : type;
          break;
      }
      if (core_1.isCollection(type)) {
        this.collectionType = type;
      } else {
        this._type = type;
      }
    }
    this._type = this._type || Object;
    switch (this.decoratorType) {
      default:
        this._schema = JsonSchema_1.JsonSchema.from();
        break;
      case core_1.DecoratorTypes.CLASS:
        this._schema = JsonSchema_1.JsonSchema.from({
          type: this.type
        });
        break;
      case core_1.DecoratorTypes.METHOD:
        this._operation = this.createOperation();
        break;
      case core_1.DecoratorTypes.PARAM:
        this._parameter = this.createParameter();
        break;
      case core_1.DecoratorTypes.PROP:
        this._schema = this.createProperty();
        break;
    }
  }
  createProperty() {
    const parentStore = this.parent;
    const properties = parentStore.schema.get("properties");
    let schema = properties[this.propertyName];
    if (!schema) {
      parentStore.children.set(this.propertyName, this);
      schema = JsonSchema_1.JsonSchema.from({
        type: this.collectionType || this.type
      });
      if (this.collectionType) {
        schema.itemSchema(this.type);
      }
    }
    parentStore.schema.addProperties(this.propertyName, schema);
    return schema;
  }
  createOperation() {
    const parentStore = this.parent;
    // response schema of the method
    let operation = this.operation;
    if (!operation) {
      operation = new JsonOperation_1.JsonOperation();
      parentStore.children.set(this.propertyName, this);
    }
    if (core_1.isCollection(this._type)) {
      this.collectionType = this._type;
      delete this._type;
    }
    this._schema = JsonSchema_1.JsonSchema.from({
      type: this.collectionType || this.type
    });
    if (this.collectionType) {
      this._schema.itemSchema(this.type);
    }
    parentStore.schema.addProperties(this.propertyName, this.schema);
    return operation;
  }
  createParameter() {
    var _a;
    const parentStore = this.parent;
    let parameter = this.parameter;
    if (!parameter) {
      parameter = new JsonParameter_1.JsonParameter();
      parentStore.children.set(this.index, this);
      this._schema = getSchema(this.collectionType || this.type);
      parameter.schema(this._schema);
      if (this.collectionType) {
        this._schema.itemSchema(getSchema(this.type));
      }
      (_a = parentStore.operation) === null || _a === void 0 ? void 0 : _a.addParameter(this.index, parameter);
    }
    return parameter;
  }
}
exports.JsonEntityStore = JsonEntityStore;
JsonEntityStore.entities = new Map();
//# sourceMappingURL=JsonEntityStore.js.map
