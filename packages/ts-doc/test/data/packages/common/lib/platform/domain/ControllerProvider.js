"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.ControllerProvider = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@tsed/core");
const di_1 = require("@tsed/di");
const schema_1 = require("@tsed/schema");
const mvc_1 = require("../../mvc");
const routerOptions_1 = require("../constants/routerOptions");
class ControllerProvider extends di_1.Provider {
  constructor(provide) {
    super(provide);
    /**
     * Controllers that depend to this controller.
     * @type {Array}
     * @private
     */
    this._children = [];
    this.type = di_1.ProviderType.CONTROLLER;
    this.entity = schema_1.JsonEntityStore.from(provide);
  }
  get path() {
    return this.entity.path;
  }
  set path(path) {
    this.entity.path = path;
  }
  /**
   *
   * @returns {Endpoint[]}
   */
  get endpoints() {
    return mvc_1.EndpointMetadata.getEndpoints(this.provide);
  }
  /**
   *
   * @returns {Type<any>[]}
   */
  get children() {
    return this._children;
  }
  /**
   *
   * @param children
   */
  set children(children) {
    this._children = children;
    this._children.forEach((d) => (d.$parentCtrl = this));
  }
  /**
   *
   */
  get routerOptions() {
    return this.store.get(routerOptions_1.ROUTER_OPTIONS) || {};
  }
  /**
   *
   * @param value
   */
  set routerOptions(value) {
    this.store.set(routerOptions_1.ROUTER_OPTIONS, value);
  }
  /**
   *
   * @returns {ControllerProvider}
   */
  get parent() {
    return this.provide.$parentCtrl;
  }
  /**
   *
   * @returns {any[]}
   */
  get middlewares() {
    return Object.assign(
      {
        use: [],
        useAfter: [],
        useBefore: []
      },
      this.store.get("middlewares") || {}
    );
  }
  /**
   *
   * @param middlewares
   */
  set middlewares(middlewares) {
    const mdlwrs = this.middlewares;
    const concat = (key, a, b) => (a[key] = a[key].concat(b[key]));
    Object.keys(middlewares).forEach((key) => {
      concat(key, mdlwrs, middlewares);
    });
    this.store.set("middlewares", mdlwrs);
  }
  /**
   * Resolve final endpoint url.
   */
  getEndpointUrl(routerPath) {
    return (routerPath === this.path ? this.path : (routerPath || "") + this.path).replace(/\/\//gi, "/");
  }
  /**
   *
   */
  hasEndpointUrl() {
    return !!this.path;
  }
  /**
   *
   * @returns {boolean}
   */
  hasChildren() {
    return !!this.children.length;
  }
  /**
   *
   * @returns {boolean}
   */
  hasParent() {
    return !!this.provide.$parentCtrl;
  }
  getRouter() {
    return this.router;
  }
  setRouter(router) {
    this.router = router;
    return this;
  }
}
tslib_1.__decorate(
  [core_1.NotEnumerable(), tslib_1.__metadata("design:type", schema_1.JsonEntityStore)],
  ControllerProvider.prototype,
  "entity",
  void 0
);
tslib_1.__decorate([core_1.NotEnumerable(), tslib_1.__metadata("design:type", Object)], ControllerProvider.prototype, "router", void 0);
tslib_1.__decorate([core_1.NotEnumerable(), tslib_1.__metadata("design:type", Array)], ControllerProvider.prototype, "_children", void 0);
tslib_1.__decorate(
  [core_1.Enumerable(), tslib_1.__metadata("design:type", String), tslib_1.__metadata("design:paramtypes", [String])],
  ControllerProvider.prototype,
  "path",
  null
);
tslib_1.__decorate(
  [core_1.Enumerable(), tslib_1.__metadata("design:type", Array), tslib_1.__metadata("design:paramtypes", [Array])],
  ControllerProvider.prototype,
  "children",
  null
);
exports.ControllerProvider = ControllerProvider;
//# sourceMappingURL=ControllerProvider.js.map
