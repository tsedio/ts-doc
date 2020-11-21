
---
sidebar: auto
meta:
 - name: keywords
   description: api typescript node.js documentation MaxLength decorator
---
# MaxLength <Badge text="Decorator" type="decorator"/>  <Badge text="ajv" title="ajv" type="ajv"/> <Badge text="jsonMapper" title="jsonMapper" type="jsonMapper"/> <Badge text="swagger" title="swagger" type="swagger"/> <Badge text="schema" title="schema" type="schema"/> <Badge text="propertyDecorator" title="propertyDecorator" type="propertyDecorator"/> <Badge text="paramDecorator" title="paramDecorator" type="paramDecorator"/> <Badge text="model" title="model" type="model"/> <Badge text="private" title="private" type="private"/>
<!-- Summary -->
<section class="symbol-info"><table class="is-full-width"><tbody><tr><th>Module</th><td><div class="lang-typescript"><span class="token keyword">import</span> { MaxLength }&nbsp;<span class="token keyword">from</span>&nbsp;<span class="token string">"@tsed/schema/src/decorators/common/maxLength"</span></div></td></tr><tr><th>Source</th><td><a href="https://github.com/repo/blob/v1.0.0/packages/schema/src/decorators/common/maxLength.ts#L0-L0">/packages/schema/src/decorators/common/maxLength.ts</a></td></tr></tbody></table></section>

<!-- Overview -->
## Overview


<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang ">function <span class="token function">MaxLength</span><span class="token punctuation">(</span>maxLength<span class="token punctuation">:</span> <span class="token keyword">number</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>...args<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> =&gt; <span class="token keyword">any</span><span class="token punctuation">;</span></code></pre></div>




<!-- Params -->
Param | Type | Description
---|---|---
 maxLength | `number` | The maximum length allowed 



<!-- Description -->
## Description

A string instance is valid against this keyword if its length is greater than, or equal to, the value of this keyword.

The length of a string instance is defined as the number of its characters as defined by [RFC 7159](http://json-schema.org/latest/json-schema-validation.html#RFC7159).

::: warning
The value of maxLength MUST be a non-negative integer.
:::

::: tip
Omitting this keyword has the same behavior as a value of 0.
:::

## Example
### With primitive type

```typescript
class Model {
   @MaxLength(10)
   property: number;
}
```

Will produce:

```json
{
  "type": "object",
  "properties": {
    "property": {
      "type": "string",
      "maxLength": 10
    }
  }
}
```

### With array type

```typescript
class Model {
   @MaxLength(10)
   @CollectionOf(String)
   property: string[];
}
```

Will produce:

```json
{
  "type": "object",
  "properties": {
    "property": {
      "type": "array",
      "items": {
         "type": "string",
         "maxLength": 10
      }
    }
  }
}
```




