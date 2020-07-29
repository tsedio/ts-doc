import { Type } from "@tsed/core";
import { IParamOptions } from "../../interfaces/IParamOptions";
/**
 * BodyParams return the value from [request.body](http://expressjs.com/en/4x/api.html#req.body) object.
 *
 * #### Example
 *
 * ```typescript
 * @Controller('/')
 * class MyCtrl {
 *    @Post('/')
 *    create(@BodyParams() body: any) {
 *       console.log('Entire body', body);
 *    }
 *
 *    @Post('/')
 *    create(@BodyParams('id') id: string) {
 *       console.log('ID', id);
 *    }
 *
 *    @Post('/')
 *    create(@BodyParams('user') user: User) { // with deserialization
 *       console.log('user', user);
 *    }
 *
 *    @Post('/')
 *    create(@BodyParams('users', User) users: User[]) { // with deserialization
 *       console.log('users', users);
 *    }
 * }
 * ```
 * > For more information on deserialization see [converters](/docs/converters.md) page.
 *
 * @param expression The path of the property to get.
 * @param useType The type of the class that to be used to deserialize the data.
 * @decorator
 * @returns {Function}
 */
export declare function BodyParams(expression: string, useType: Type<any>): ParameterDecorator;
export declare function BodyParams(expression: string): ParameterDecorator;
export declare function BodyParams(useType: Type<any>): ParameterDecorator;
export declare function BodyParams(options: IParamOptions<any>): ParameterDecorator;
export declare function BodyParams(): ParameterDecorator;
