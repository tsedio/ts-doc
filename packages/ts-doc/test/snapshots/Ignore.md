
---
sidebar: auto
meta:
 - name: keywords
   description: api typescript node.js documentation Ignore decorator
---
# Ignore <Badge text="Decorator" type="decorator"/>  <Badge text="validation" title="validation" type="validation"/> <Badge text="swagger" title="swagger" type="swagger"/> <Badge text="schema" title="schema" type="schema"/> <Badge text="private" title="private" type="private"/>
<!-- Summary -->
<section class="symbol-info"><table class="is-full-width"><tbody><tr><th>Module</th><td><div class="lang-typescript"><span class="token keyword">import</span> { Ignore }&nbsp;<span class="token keyword">from</span>&nbsp;<span class="token string">"@tsed/schema/src/decorators/common/ignore"</span></div></td></tr><tr><th>Source</th><td><a href="https://github.com/repo/blob/v1.0.0/packages/schema/src/decorators/common/ignore.ts#L0-L0">/packages/schema/src/decorators/common/ignore.ts</a></td></tr></tbody></table></section>

<!-- Overview -->
## Overview


<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang ">function <span class="token function">Ignore</span><span class="token punctuation">(</span>cb?<span class="token punctuation">:</span> <span class="token keyword">boolean</span> | <a href="/api/schema/interfaces/IgnoreCallback.html"><span class="token">IgnoreCallback</span></a><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>...args<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> =&gt; <span class="token keyword">any</span><span class="token punctuation">;</span></code></pre></div>




<!-- Params -->
Param | Type | Description
---|---|---
 cb | `boolean` "&#124;" <a href="/api/schema/interfaces/IgnoreCallback.html"><span class="token">IgnoreCallback</span></a> | Optional. Callback to know if the property must be ignored 



<!-- Description -->
## Description

Ignore the property when JsonMapper serialize the class to a Plain Object JavaScript.

::: warning
Swagger will not generate documentation for the ignored property.
:::

```typescript
class User {
  @Ignore()
  _id: string;

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Ignore((value, ctx) => !ctx.mongoose) // don't ignore prop only if mongoose
  password: string;
}
```

The controller:
```typescript
import {Post, Controller, BodyParams} from "@tsed/common";
import {Person} from "../models/Person";

@Controller("/")
export class UsersCtrl {
  @Get("/")
  get(): User {
    const user = new User();
    user._id = "12345";
    user.firstName = "John";
    user.lastName = "Doe";
    user.password = "secretpassword";
    return
  }
}
```

The expected json object:

```json
{
 "firstName": "John",
 "lastName": "Doe"
}
```



