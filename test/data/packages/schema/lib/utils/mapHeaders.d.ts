import { JsonHeader, JsonHeaders } from "../interfaces/JsonOpenSpec";
/**
 * Map input header to a standard open spec header
 * @param headers
 */
export declare function mapHeaders(headers: JsonHeaders): {
    [key: string]: JsonHeader;
};
