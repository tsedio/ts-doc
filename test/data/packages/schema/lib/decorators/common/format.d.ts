import { ValueOf } from "@tsed/core";
import { JsonFormatTypes } from "../../domain/JsonFormatTypes";
/**
 * The following formats are supported for string validation with `format` keyword:
 *
 * - **date**: full-date according to RFC3339.
 * - **time**: time with optional time-zone.
 * - **date-time**: date-time from the same source (time-zone is mandatory). date, time and date-time validate ranges in full mode and only regexp in fast mode (see options).
 * - **uri**: full uri with optional protocol.
 * - **url**: URL record.
 * - **uri-template**: URI template according to RFC6570
 * - **email**: email address.
 * - **hostname**: host name according to RFC1034.
 * - **ipv4**: IP address v4.
 * - **ipv6**: IP address v6.
 * - **regex**: tests whether a string is a valid regular expression by passing it to RegExp constructor.
 * - **uuid**: Universally Unique IDentifier according to RFC4122.
 * - **json-pointer**: JSON-pointer according to RFC6901.
 * - **relative-json-pointer**: relative JSON-pointer according to this draft.
 *
 * ## Example
 * ### With primitive type
 *
 * ```typescript
 * class Model {
 *    @Format("email")
 *    property: string;
 * }
 * ```
 *
 * ```json
 * {
 *   "type": "object",
 *   "properties": {
 *     "property": {
 *       "type": "string",
 *       "format": "email"
 *     }
 *   }
 * }
 * ```
 *
 * ### With array type
 *
 * ```typescript
 * class Model {
 *    @Format("email")
 *    @CollectionOf(String)
 *    property: string[];
 * }
 * ```
 *
 * Will produce:
 *
 * ```json
 * {
 *   "type": "object",
 *   "properties": {
 *     "property": {
 *       "type": "array",
 *       "items": {
 *          "type": "string",
 *          "format": "email"
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * @param {string} format
 * @decorator
 * @ajv
 * @jsonMapper
 * @swagger
 * @schema
 * @propertyDecorator
 * @paramDecorator
 */
export declare function Format(format: JsonFormatTypes | ValueOf<JsonFormatTypes>): (...args: any[]) => any;
/**
 * Apply an email validation on property.
 *
 * ## Example
 * ### With primitive type
 *
 * ```typescript
 * class Model {
 *    @Email()
 *    property: string;
 * }
 * ```
 *
 * Will produce:
 *
 * ```json
 * {
 *   "type": "object",
 *   "properties": {
 *     "property": {
 *       "type": "string",
 *       "format": "email"
 *     }
 *   }
 * }
 * ```
 *
 * ### With array type
 *
 * ```typescript
 * class Model {
 *    @Email()
 *    @CollectionOf(String)
 *    property: string[];
 * }
 * ```
 *
 * Will produce:
 *
 * ```json
 * {
 *   "type": "object",
 *   "properties": {
 *     "property": {
 *       "type": "array",
 *       "items": {
 *          "type": "string",
 *          "format": "email"
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * > See [Format](api/common/jsonschema/schema) decorator.
 * @returns {Function}
 * @decorator
 * @ajv
 * @schema
 * @swagger
 * @model
 * @propertyDecorator
 * @paramDecorator
 */
export declare function Email(): (...args: any[]) => any;
/**
 * Apply a date-time validation on property.
 *
 * ## Example
 * ### With primitive type
 *
 * ```typescript
 * class Model {
 *    @DateTime()
 *    property: string;
 * }
 * ```
 *
 * Will produce:
 *
 * ```json
 * {
 *   "type": "object",
 *   "properties": {
 *     "property": {
 *       "type": "string",
 *       "format": "date-time"
 *     }
 *   }
 * }
 * ```
 *
 * ### With array type
 *
 * ```typescript
 * class Model {
 *    @DateTime()
 *    @CollectionOf(String)
 *    property: string[];
 * }
 * ```
 *
 * Will produce:
 *
 * ```json
 * {
 *   "type": "object",
 *   "properties": {
 *     "property": {
 *       "type": "array",
 *       "items": {
 *          "type": "string",
 *          "format": "date-time"
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * > See [Format](api/common/jsonschema/schema) decorator.
 * @returns {Function}
 * @decorator
 * @ajv
 * @property
 * @parameter
 * @schema
 * @auto-map The data will be stored on the right place according to the type and collectionType (primitive or collection).
 */
export declare function DateTime(): (...args: any[]) => any;
/**
 * Apply a time validation on property.
 *
 * ## Example
 * ### With primitive type
 *
 * ```typescript
 * class Model {
 *    @Time()
 *    property: string;
 * }
 * ```
 *
 * Will produce:
 *
 * ```json
 * {
 *   "type": "object",
 *   "properties": {
 *     "property": {
 *       "type": "string",
 *       "format": "time"
 *     }
 *   }
 * }
 * ```
 *
 * ### With array type
 *
 * ```typescript
 * class Model {
 *    @Time()
 *    @CollectionOf(String)
 *    property: string[];
 * }
 * ```
 *
 * Will produce:
 *
 * ```json
 * {
 *   "type": "object",
 *   "properties": {
 *     "property": {
 *       "type": "array",
 *       "items": {
 *          "type": "string",
 *          "format": "time"
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * > See [Format](api/common/jsonschema/schema) decorator.
 * @returns {Function}
 * @decorator
 * @ajv
 * @property
 * @parameter
 * @schema
 * @auto-map The data will be stored on the right place according to the type and collectionType (primitive or collection).
 */
export declare function DateFormat(): (...args: any[]) => any;
/**
 * Apply a time validation on property.
 *
 * ## Example
 * ### With primitive type
 *
 * ```typescript
 * class Model {
 *    @TimeFormat()
 *    property: string;
 * }
 * ```
 *
 * Will produce:
 *
 * ```json
 * {
 *   "type": "object",
 *   "properties": {
 *     "property": {
 *       "type": "string",
 *       "format": "time"
 *     }
 *   }
 * }
 * ```
 *
 * ### With array type
 *
 * ```typescript
 * class Model {
 *    @TimeFormat()
 *    @CollectionOf(String)
 *    property: string[];
 * }
 * ```
 *
 * Will produce:
 *
 * ```json
 * {
 *   "type": "object",
 *   "properties": {
 *     "property": {
 *       "type": "array",
 *       "items": {
 *          "type": "string",
 *          "format": "time"
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * > See [Format](api/common/jsonschema/schema) decorator.
 * @returns {Function}
 * @decorator
 * @ajv
 * @property
 * @parameter
 * @schema
 * @auto-map The data will be stored on the right place according to the type and collectionType (primitive or collection).
 */
export declare function TimeFormat(): (...args: any[]) => any;
/**
 * Apply a uri validation on property.
 *
 * ## Example
 * ### With primitive type
 *
 * ```typescript
 * class Model {
 *    @Uri()
 *    property: string;
 * }
 * ```
 *
 * Will produce:
 *
 * ```json
 * {
 *   "type": "object",
 *   "properties": {
 *     "property": {
 *       "type": "string",
 *       "format": "uri"
 *     }
 *   }
 * }
 * ```
 *
 * ### With array type
 *
 * ```typescript
 * class Model {
 *    @Uri()
 *    @CollectionOf(String)
 *    property: string[];
 * }
 * ```
 *
 * Will produce:
 *
 * ```json
 * {
 *   "type": "object",
 *   "properties": {
 *     "property": {
 *       "type": "array",
 *       "items": {
 *          "type": "string",
 *          "format": "uri"
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * > See [Format](api/common/jsonschema/schema) decorator.
 * @returns {Function}
 * @decorator
 * @ajv
 * @property
 * @parameter
 * @schema
 * @auto-map The data will be stored on the right place according to the type and collectionType (primitive or collection).
 */
export declare function Uri(): (...args: any[]) => any;
