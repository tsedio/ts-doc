export declare type AliasType = string | number | symbol;
export declare type AliasMap = Map<AliasType, AliasType>;
export declare function mapAliasedProperties(value: any, alias: AliasMap): any;
