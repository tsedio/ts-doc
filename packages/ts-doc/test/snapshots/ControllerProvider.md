
---
meta:
 - name: keywords
   description: api typescript node.js documentation ControllerProvider class
---
# Class ControllerProvider

<Badge text="Class" type="class"/>  <Badge text="private" title="private" type="private"/>
<!-- Summary -->
<section class="table-features"><table class="is-full-width"><tbody><tr><th>Module</th><td><div class="lang-typescript"><span class="token keyword">import</span> { ControllerProvider }&nbsp;<span class="token keyword">from</span>&nbsp;<span class="token string">"@tsed/common/src/platform/domain/ControllerProvider"</span></div></td></tr><tr><th>Source</th><td><a href="https://github.com/repo/blob/v1.0.0/packages/common/src/platform/domain/ControllerProvider.ts#L0-L0">/packages/common/src/platform/domain/ControllerProvider.ts</a></td></tr></tbody></table></section>

<!-- Overview -->
## Overview


<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang "><span class="token keyword">class</span> ControllerProvider&lt;T<span class="token punctuation"> = </span><span class="token keyword">any</span>&gt; <span class="token keyword">extends</span> Provider&lt;T&gt; <span class="token punctuation">{</span>
    <span class="token keyword">readonly</span> entity<span class="token punctuation">:</span> <a href="/api/schema/domain/class-json-entity-store.html"><span class="token">JsonEntityStore</span></a><span class="token punctuation">;</span>
    
    
    
    <span class="token keyword">constructor</span><span class="token punctuation">(</span>provide<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    get <span class="token function">path</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">;</span>
    set <span class="token function">path</span><span class="token punctuation">(</span>path<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    get <span class="token function">endpoints</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> EndpointMetadata<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    
    get <span class="token function">children</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <a href="/api/common/platform/domain/interface-i-children-controller.html"><span class="token">IChildrenController</span></a><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    
    set <span class="token function">children</span><span class="token punctuation">(</span>children<span class="token punctuation">:</span> <a href="/api/common/platform/domain/interface-i-children-controller.html"><span class="token">IChildrenController</span></a><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    get <span class="token function">routerOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">;</span>
    
    set <span class="token function">routerOptions</span><span class="token punctuation">(</span>value<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    get <span class="token function">parent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">;</span>
    
    get <span class="token function">middlewares</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> ControllerMiddlewares<span class="token punctuation">;</span>
    
    set <span class="token function">middlewares</span><span class="token punctuation">(</span>middlewares<span class="token punctuation">:</span> ControllerMiddlewares<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token function">getEndpointUrl</span><span class="token punctuation">(</span>routerPath?<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">;</span>
    
    <span class="token function">hasEndpointUrl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">boolean</span><span class="token punctuation">;</span>
    
    <span class="token function">hasChildren</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">boolean</span><span class="token punctuation">;</span>
    
    <span class="token function">hasParent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">boolean</span><span class="token punctuation">;</span>
    getRouter&lt;T <span class="token keyword">extends</span> PlatformRouterMethods<span class="token punctuation"> = </span><span class="token keyword">any</span>&gt;<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> T<span class="token punctuation">;</span>
    <span class="token function">setRouter</span><span class="token punctuation">(</span>router<span class="token punctuation">:</span> PlatformRouterMethods<span class="token punctuation">)</span><span class="token punctuation">:</span> this<span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre></div>



<!-- Members -->




## Constructor


::: v-pre


<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang "><span class="token keyword">constructor</span><span class="token punctuation">(</span>provide<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre></div>



:::



Controllers that depend to this controller.




## Members


::: v-pre

<div class="method-overview">
<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang "><span class="token keyword">readonly</span> entity<span class="token punctuation">:</span> <a href="/api/schema/domain/class-json-entity-store.html"><span class="token">JsonEntityStore</span></a><span class="token punctuation">;</span></code></pre></div>

</div>



:::



***



::: v-pre

<div class="method-overview">
<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang ">get <span class="token function">path</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">;</span></code></pre></div>

</div>



:::



***



::: v-pre

<div class="method-overview">
<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang ">set <span class="token function">path</span><span class="token punctuation">(</span>path<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre></div>

</div>



:::



***



::: v-pre

<div class="method-overview">
<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang ">get <span class="token function">endpoints</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> EndpointMetadata<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span></code></pre></div>

</div>



:::



***



::: v-pre

<div class="method-overview">
<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang ">get <span class="token function">children</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <a href="/api/common/platform/domain/interface-i-children-controller.html"><span class="token">IChildrenController</span></a><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span></code></pre></div>

</div>



:::



***



::: v-pre

<div class="method-overview">
<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang ">set <span class="token function">children</span><span class="token punctuation">(</span>children<span class="token punctuation">:</span> <a href="/api/common/platform/domain/interface-i-children-controller.html"><span class="token">IChildrenController</span></a><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre></div>

</div>



:::



***



::: v-pre

<div class="method-overview">
<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang ">get <span class="token function">routerOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">;</span></code></pre></div>

</div>



:::



***



::: v-pre

<div class="method-overview">
<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang ">set <span class="token function">routerOptions</span><span class="token punctuation">(</span>value<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre></div>

</div>



:::



***



::: v-pre

<div class="method-overview">
<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang ">get <span class="token function">parent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">;</span></code></pre></div>

</div>



:::



***



::: v-pre

<div class="method-overview">
<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang ">get <span class="token function">middlewares</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> ControllerMiddlewares<span class="token punctuation">;</span></code></pre></div>

</div>



:::



***



::: v-pre

<div class="method-overview">
<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang ">set <span class="token function">middlewares</span><span class="token punctuation">(</span>middlewares<span class="token punctuation">:</span> ControllerMiddlewares<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre></div>

</div>



:::



***



::: v-pre

<div class="method-overview">
<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang "><span class="token function">getEndpointUrl</span><span class="token punctuation">(</span>routerPath?<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">;</span></code></pre></div>

</div>



Resolve final endpoint url.



:::



***



::: v-pre

<div class="method-overview">
<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang "><span class="token function">hasEndpointUrl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">boolean</span><span class="token punctuation">;</span></code></pre></div>

</div>



:::



***



::: v-pre

<div class="method-overview">
<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang "><span class="token function">hasChildren</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">boolean</span><span class="token punctuation">;</span></code></pre></div>

</div>



:::



***



::: v-pre

<div class="method-overview">
<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang "><span class="token function">hasParent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">boolean</span><span class="token punctuation">;</span></code></pre></div>

</div>



:::



***



::: v-pre

<div class="method-overview">
<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang ">getRouter&lt;T <span class="token keyword">extends</span> PlatformRouterMethods<span class="token punctuation"> = </span><span class="token keyword">any</span>&gt;<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> T<span class="token punctuation">;</span></code></pre></div>

</div>



:::



***



::: v-pre

<div class="method-overview">
<div class="language-typescript"><pre class="language-typescript" v-pre=""><code class="typescript-lang "><span class="token function">setRouter</span><span class="token punctuation">(</span>router<span class="token punctuation">:</span> PlatformRouterMethods<span class="token punctuation">)</span><span class="token punctuation">:</span> this<span class="token punctuation">;</span></code></pre></div>

</div>



:::









