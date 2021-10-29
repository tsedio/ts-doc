
---
meta:
 - name: keywords
   description: api typescript node.js documentation ReturnsChainedDecorators interface
---
# Interface ReturnsChainedDecorators

<Badge text="Interface" type="interface"/>
<!-- Summary -->
<section class="table-features"><table class="is-full-width"><tbody><tr><th>Module</th><td><div class="lang-typescript"><span class="token keyword">import</span> { ReturnsChainedDecorators }&nbsp;<span class="token keyword">from</span>&nbsp;<span class="token string">"@tsed/ts-doc"</span></div></td></tr><tr><th>Source</th><td><a href="https://github.com/repo/blob/v1.0.0/packages/schema/src/decorators/operations/returns.ts#L0-L0">/packages/schema/src/decorators/operations/returns.ts</a></td></tr></tbody></table></section>

<!-- Overview -->
## Overview


<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang "><span class="token keyword">interface</span> ReturnsChainedDecorators <span class="token keyword">extends</span> MethodDecorator <span class="token punctuation">{</span>
    
    <span class="token function">ContentType</span><span class="token punctuation">(</span>value<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">)</span><span class="token punctuation">:</span> this<span class="token punctuation">;</span>
    
    <span class="token function"><a href="/api/schema/decorators/common/Description.html"><span class="token">Description</span></a></span><span class="token punctuation">(</span>description<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">)</span><span class="token punctuation">:</span> this<span class="token punctuation">;</span>
    
    <span class="token function">Examples</span><span class="token punctuation">(</span>examples<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">)</span><span class="token punctuation">:</span> this<span class="token punctuation">;</span>
    
    <span class="token function">Type</span><span class="token punctuation">(</span>type<span class="token punctuation">:</span> Type&lt;<span class="token keyword">any</span>&gt; | <span class="token keyword">any</span><span class="token punctuation">)</span><span class="token punctuation">:</span> this<span class="token punctuation">;</span>
    
    <span class="token function">Status</span><span class="token punctuation">(</span>status<span class="token punctuation">:</span> <span class="token keyword">string</span> | <span class="token keyword">number</span><span class="token punctuation">)</span><span class="token punctuation">:</span> this<span class="token punctuation">;</span>
    
    <span class="token function">Of</span><span class="token punctuation">(</span>...types<span class="token punctuation">:</span> <span class="token punctuation">(</span>Type&lt;<span class="token keyword">any</span>&gt; | <span class="token keyword">any</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">:</span> this<span class="token punctuation">;</span>
    
    <span class="token function">Nested</span><span class="token punctuation">(</span>...generics<span class="token punctuation">:</span> <span class="token punctuation">(</span>Type&lt;<span class="token keyword">any</span>&gt; | <span class="token keyword">any</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">:</span> this<span class="token punctuation">;</span>
    
    <span class="token function">Header</span><span class="token punctuation">(</span>key<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">,</span> value<span class="token punctuation">:</span> <span class="token keyword">number</span> | <span class="token keyword">string</span> | <span class="token punctuation">(</span><a href="/api/schema/interfaces/JsonHeader.html"><span class="token">JsonHeader</span></a> & <span class="token punctuation">{</span>
        value?<span class="token punctuation">:</span> <span class="token keyword">string</span> | <span class="token keyword">number</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span> this<span class="token punctuation">;</span>
    
    <span class="token function">Headers</span><span class="token punctuation">(</span>headers<span class="token punctuation">:</span> <a href="/api/schema/interfaces/JsonHeaders.html"><span class="token">JsonHeaders</span></a><span class="token punctuation">)</span><span class="token punctuation">:</span> this<span class="token punctuation">;</span>
    
    <span class="token function"><a href="/api/schema/decorators/common/Schema.html"><span class="token">Schema</span></a></span><span class="token punctuation">(</span>schema<span class="token punctuation">:</span> Partial&lt;<a href="/api/schema/domain/JsonSchemaObject.html"><span class="token">JsonSchemaObject</span></a>&gt;<span class="token punctuation">)</span><span class="token punctuation">:</span> this<span class="token punctuation">;</span>
    <span class="token punctuation">[</span>key<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">]</span><span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre></div>



<!-- Members -->




## Members


::: v-pre

<div class="method-overview">
<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang "><span class="token function">ContentType</span><span class="token punctuation">(</span>value<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">)</span><span class="token punctuation">:</span> this<span class="token punctuation">;</span></code></pre></div>

</div>



Set a Content-Type for the current response



:::



***



::: v-pre

<div class="method-overview">
<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang "><span class="token function"><a href="/api/schema/decorators/common/Description.html"><span class="token">Description</span></a></span><span class="token punctuation">(</span>description<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">)</span><span class="token punctuation">:</span> this<span class="token punctuation">;</span></code></pre></div>

</div>



Add a description



:::



***



::: v-pre

<div class="method-overview">
<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang "><span class="token function">Examples</span><span class="token punctuation">(</span>examples<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">)</span><span class="token punctuation">:</span> this<span class="token punctuation">;</span></code></pre></div>

</div>



Add examples



:::



***



::: v-pre

<div class="method-overview">
<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang "><span class="token function">Type</span><span class="token punctuation">(</span>type<span class="token punctuation">:</span> Type&lt;<span class="token keyword">any</span>&gt; | <span class="token keyword">any</span><span class="token punctuation">)</span><span class="token punctuation">:</span> this<span class="token punctuation">;</span></code></pre></div>

</div>



Change the model type



:::



***



::: v-pre

<div class="method-overview">
<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang "><span class="token function">Status</span><span class="token punctuation">(</span>status<span class="token punctuation">:</span> <span class="token keyword">string</span> | <span class="token keyword">number</span><span class="token punctuation">)</span><span class="token punctuation">:</span> this<span class="token punctuation">;</span></code></pre></div>

</div>



Change the status



:::



***



::: v-pre

<div class="method-overview">
<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang "><span class="token function">Of</span><span class="token punctuation">(</span>...types<span class="token punctuation">:</span> <span class="token punctuation">(</span>Type&lt;<span class="token keyword">any</span>&gt; | <span class="token keyword">any</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">:</span> this<span class="token punctuation">;</span></code></pre></div>

</div>



Add the nested types



:::



***



::: v-pre

<div class="method-overview">
<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang "><span class="token function">Nested</span><span class="token punctuation">(</span>...generics<span class="token punctuation">:</span> <span class="token punctuation">(</span>Type&lt;<span class="token keyword">any</span>&gt; | <span class="token keyword">any</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">:</span> this<span class="token punctuation">;</span></code></pre></div>

</div>



Declare a nested generic models



:::



***



::: v-pre

<div class="method-overview">
<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang "><span class="token function">Header</span><span class="token punctuation">(</span>key<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">,</span> value<span class="token punctuation">:</span> <span class="token keyword">number</span> | <span class="token keyword">string</span> | <span class="token punctuation">(</span><a href="/api/schema/interfaces/JsonHeader.html"><span class="token">JsonHeader</span></a> & <span class="token punctuation">{</span>
     value?<span class="token punctuation">:</span> <span class="token keyword">string</span> | <span class="token keyword">number</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span> this<span class="token punctuation">;</span></code></pre></div>

</div>



Add header.



:::



***



::: v-pre

<div class="method-overview">
<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang "><span class="token function">Headers</span><span class="token punctuation">(</span>headers<span class="token punctuation">:</span> <a href="/api/schema/interfaces/JsonHeaders.html"><span class="token">JsonHeaders</span></a><span class="token punctuation">)</span><span class="token punctuation">:</span> this<span class="token punctuation">;</span></code></pre></div>

</div>



Add headers



:::



***



::: v-pre

<div class="method-overview">
<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang "><span class="token function"><a href="/api/schema/decorators/common/Schema.html"><span class="token">Schema</span></a></span><span class="token punctuation">(</span>schema<span class="token punctuation">:</span> Partial&lt;<a href="/api/schema/domain/JsonSchemaObject.html"><span class="token">JsonSchemaObject</span></a>&gt;<span class="token punctuation">)</span><span class="token punctuation">:</span> this<span class="token punctuation">;</span></code></pre></div>

</div>



Assign partial schema



:::



***



::: v-pre

<div class="method-overview">
<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang "><span class="token punctuation">[</span>key<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">]</span><span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">;</span></code></pre></div>

</div>



:::









