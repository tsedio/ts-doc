export declare enum JsonParameterTypes {
    BODY = "body",
    PATH = "path",
    QUERY = "query",
    HEADER = "header",
    COOKIES = "cookies"
}
export declare function isParameterType(type: string): boolean;
