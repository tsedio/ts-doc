import { DecoratorTypes, Entity, EntityOptions, Store, Type } from "@tsed/core";
import { JsonOperation } from "./JsonOperation";
import { JsonParameter } from "./JsonParameter";
import { JsonSchema } from "./JsonSchema";
export interface JsonEntityStoreOptions extends EntityOptions {
    [key: string]: any;
}
export declare class JsonEntityStore extends Entity implements JsonEntityStoreOptions {
    static entities: Map<DecoratorTypes, Type<JsonEntityStore>>;
    readonly store: Store;
    readonly isStore = true;
    /**
     * List of children JsonEntityStore (properties or methods or params)
     */
    readonly children: Map<string | number, JsonEntityStore>;
    /**
     * Path used to generate open spec.
     */
    path: string;
    /**
     * Ref to JsonSchema
     */
    protected _schema: JsonSchema;
    /**
     * Ref to JsonOperation when the decorated object is a method.
     */
    protected _operation: JsonOperation;
    /**
     * Ref to JsonParameter when the decorated object is a parameter.
     */
    protected _parameter: JsonParameter;
    [key: string]: any;
    constructor(options: JsonEntityStoreOptions);
    /**
     * Return the JsonSchema
     */
    get schema(): JsonSchema;
    /**
     * Return the JsonOperation
     */
    get operation(): JsonOperation | undefined;
    /**
     * Return the JsonParameter
     */
    get parameter(): JsonParameter | undefined;
    get nestedGenerics(): Type<any>[][];
    set nestedGenerics(nestedGenerics: Type<any>[][]);
    /**
     *
     * @returns {Type<any>}
     */
    get type(): Type<any> | any;
    /**
     * Get original type without transformation
     * @param value
     */
    set type(value: Type<any> | any);
    /**
     * Return the itemSchema computed type. if the type is a function used for recursive model, the function will be called to
     * get the right type.
     */
    get computedType(): any;
    get itemSchema(): JsonSchema;
    get parentSchema(): JsonSchema;
    get parent(): JsonEntityStore;
    /**
     *
     * @param args
     */
    static from<T extends JsonEntityStore = JsonEntityStore>(...args: any[]): NonNullable<T>;
    static fromMethod(target: any, propertyKey: string | symbol): JsonEntityStore;
    protected build(): void;
    protected createProperty(): any;
    protected createOperation(): JsonOperation;
    protected createParameter(): JsonParameter;
}
