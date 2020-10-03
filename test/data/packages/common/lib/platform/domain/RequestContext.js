"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@tsed/di");
const RequestLogger_1 = require("./RequestLogger");
class RequestContext extends Map {
    constructor({ id, injector, logger, response, request, endpoint, ...options }) {
        super();
        /**
         * Date when request have been handled by the server. @@RequestLogger@@ use this date to log request duration.
         */
        this.dateStart = new Date();
        /**
         * The request container used by the Ts.ED DI. It contain all services annotated with `@Scope(ProviderScope.REQUEST)`
         */
        this.container = new di_1.LocalsContainer();
        this.id = id;
        injector && (this.injector = injector);
        response && (this.response = response);
        request && (this.request = request);
        endpoint && (this.endpoint = endpoint);
        this.logger = new RequestLogger_1.RequestLogger(logger, {
            id,
            startDate: this.dateStart,
            ...options
        });
    }
    async destroy() {
        await this.container.destroy();
        this.logger.destroy();
        this.response.destroy();
        this.request.destroy();
        // @ts-ignore
        delete this.container;
        // @ts-ignore
        delete this.logger;
        // @ts-ignore
        delete this.injector;
        // @ts-ignore
        delete this.endpoint;
        // @ts-ignore
        delete this.response;
    }
    async emit(eventName, ...args) {
        return this.injector && this.injector.emit(eventName, ...args);
    }
}
exports.RequestContext = RequestContext;
//# sourceMappingURL=RequestContext.js.map