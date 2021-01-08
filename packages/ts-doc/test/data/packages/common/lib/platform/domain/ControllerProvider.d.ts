import { Type } from "@tsed/core";
import { Provider } from "@tsed/di";
import { JsonEntityStore } from "@tsed/schema";
import { ControllerMiddlewares, EndpointMetadata } from "../../mvc";
import { PlatformRouterMethods } from "../interfaces/PlatformRouterMethods";
export interface IChildrenController extends Type<any> {
    $parentCtrl?: ControllerProvider;
}
export declare class ControllerProvider<T = any> extends Provider<T> {
    readonly entity: JsonEntityStore;
    private router;
    /**
     * Controllers that depend to this controller.
     * @type {Array}
     * @private
     */
    private _children;
    constructor(provide: any);
    get path(): string;
    set path(path: string);
    /**
     *
     * @returns {Endpoint[]}
     */
    get endpoints(): EndpointMetadata[];
    /**
     *
     * @returns {Type<any>[]}
     */
    get children(): IChildrenController[];
    /**
     *
     * @param children
     */
    set children(children: IChildrenController[]);
    /**
     *
     */
    get routerOptions(): any;
    /**
     *
     * @param value
     */
    set routerOptions(value: any);
    /**
     *
     * @returns {ControllerProvider}
     */
    get parent(): any;
    /**
     *
     * @returns {any[]}
     */
    get middlewares(): ControllerMiddlewares;
    /**
     *
     * @param middlewares
     */
    set middlewares(middlewares: ControllerMiddlewares);
    /**
     * Resolve final endpoint url.
     */
    getEndpointUrl(routerPath?: string): string;
    /**
     *
     */
    hasEndpointUrl(): boolean;
    /**
     *
     * @returns {boolean}
     */
    hasChildren(): boolean;
    /**
     *
     * @returns {boolean}
     */
    hasParent(): boolean;
    getRouter<T extends PlatformRouterMethods = any>(): T;
    setRouter(router: PlatformRouterMethods): this;
}
