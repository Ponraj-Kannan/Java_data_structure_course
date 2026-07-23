<Slide2 topic="Hashing">
  <template #content>

<div class="slide-h1" style="margin-bottom:12px;">Build It Yourself — <span class="highlight">HashMap from Scratch</span></div>

<div class="scroll-area">
<div class="g2" style="gap:14px;align-items:start;">

<div class="flex-col">
  <div v-click class="card-navy" style="border-radius:10px;">
    <div style="font-size:.82rem;line-height:1.6;color:var(--slate);">
      A classic interview ask: <strong style="color:var(--red);">implement a HashMap</strong> using chaining. Let's assemble it from everything we've learned.
    </div>
  </div>

  <div v-click class="section-label">The Skeleton</div>
  <div v-after class="code-block">
    <span style="color:#ef5050;">class</span> <span style="color:#0e6ead;">MyHashMap</span>&lt;K,V&gt; {<br>
    <span style="padding-left:16px;display:block;"><span style="color:#0e6ead;">LinkedList</span>&lt;Entry&gt;[] <span style="color:#0e6ead;">buckets</span>;</span>
    <span style="padding-left:16px;display:block;"><span style="color:#0e6ead;">int</span> <span style="color:#0e6ead;">size</span> = <span style="color:#b45309;">16</span>;</span>
    <br>
    <span style="padding-left:16px;display:block;"><span style="color:#0e6ead;">MyHashMap</span>() { <span style="color:#0e6ead;">buckets</span> = <span style="color:#ef5050;">new</span> <span style="color:#0e6ead;">LinkedList</span>[<span style="color:#0e6ead;">size</span>]; }</span>
    <br>
    <span style="padding-left:16px;display:block;"><span style="color:#0e6ead;">int</span> <span style="color:#0e6ead;">indexFor</span>(K key) {</span>
    <span style="padding-left:32px;display:block;"><span style="color:#ef5050;">return</span> <span style="color:#0e6ead;">Math</span>.<span style="color:#0e6ead;">abs</span>(key.<span style="color:#0e6ead;">hashCode</span>()) % <span style="color:#0e6ead;">size</span>;</span>
    <span style="padding-left:16px;display:block;">}</span>
    }
  </div>

  <div v-click class="section-label" style="margin-top:6px;">put(key, value)</div>
  <div v-after class="code-block">
    <span style="color:#0e6ead;">void</span> <span style="color:#0e6ead;">put</span>(K key, V value) {<br>
    <span style="padding-left:16px;display:block;"><span style="color:#0e6ead;">int</span> <span style="color:#0e6ead;">i</span> = <span style="color:#0e6ead;">indexFor</span>(key);</span>
    <span style="padding-left:16px;display:block;"><span style="color:#ef5050;">if</span> (<span style="color:#0e6ead;">buckets</span>[i] == <span style="color:#ef5050;">null</span>) <span style="color:#0e6ead;">buckets</span>[i] = <span style="color:#ef5050;">new</span> <span style="color:#0e6ead;">LinkedList</span>&lt;&gt;();</span>
    <span style="padding-left:16px;display:block;"><span style="color:#ef5050;">for</span> (Entry e : <span style="color:#0e6ead;">buckets</span>[i])</span>
    <span style="padding-left:32px;display:block;"><span style="color:#ef5050;">if</span> (e.key.<span style="color:#0e6ead;">equals</span>(key)) { e.value = value; <span style="color:#ef5050;">return</span>; }</span>
    <span style="padding-left:16px;display:block;"><span style="color:#0e6ead;">buckets</span>[i].<span style="color:#0e6ead;">add</span>(<span style="color:#ef5050;">new</span> Entry(key, value));</span>
    }
  </div>
</div>

<div class="flex-col">
  <div v-click class="section-label">get(key)</div>
  <div v-after class="code-block">
    V <span style="color:#0e6ead;">get</span>(K key) {<br>
    <span style="padding-left:16px;display:block;"><span style="color:#0e6ead;">int</span> <span style="color:#0e6ead;">i</span> = <span style="color:#0e6ead;">indexFor</span>(key);</span>
    <span style="padding-left:16px;display:block;"><span style="color:#ef5050;">if</span> (<span style="color:#0e6ead;">buckets</span>[i] == <span style="color:#ef5050;">null</span>) <span style="color:#ef5050;">return</span> <span style="color:#ef5050;">null</span>;</span>
    <span style="padding-left:16px;display:block;"><span style="color:#ef5050;">for</span> (Entry e : <span style="color:#0e6ead;">buckets</span>[i])</span>
    <span style="padding-left:32px;display:block;"><span style="color:#ef5050;">if</span> (e.key.<span style="color:#0e6ead;">equals</span>(key)) <span style="color:#ef5050;">return</span> e.value;</span>
    <span style="padding-left:16px;display:block;"><span style="color:#ef5050;">return</span> <span style="color:#ef5050;">null</span>;</span>
    }
  </div>

  <div v-click class="section-label" style="margin-top:6px;">remove(key)</div>
  <div v-after class="code-block">
    <span style="color:#0e6ead;">void</span> <span style="color:#0e6ead;">remove</span>(K key) {<br>
    <span style="padding-left:16px;display:block;"><span style="color:#0e6ead;">int</span> <span style="color:#0e6ead;">i</span> = <span style="color:#0e6ead;">indexFor</span>(key);</span>
    <span style="padding-left:16px;display:block;"><span style="color:#ef5050;">if</span> (<span style="color:#0e6ead;">buckets</span>[i] == <span style="color:#ef5050;">null</span>) <span style="color:#ef5050;">return</span>;</span>
    <span style="padding-left:16px;display:block;"><span style="color:#0e6ead;">buckets</span>[i].<span style="color:#0e6ead;">removeIf</span>(e -&gt; e.key.<span style="color:#0e6ead;">equals</span>(key));</span>
    }
  </div>

  <div v-click class="callout callout-info" style="font-size:.7rem;">
    <div>Notice: every method starts the <strong>same way</strong> — compute the index. That's the technique's DNA.</div>
  </div>

  <div v-click class="callout callout-success" style="font-size:.7rem;">
    <div><strong>Interview follow-up to expect:</strong> "How would you handle resizing?" — that's your cue to bring up load factor and rehashing.</div>
  </div>
</div>

</div>
</div>

  </template>
</Slide2>

<style scoped>
.scroll-area {
  max-height: 100%;
  height: 100%;
  overflow-y: auto;
  padding-right: 12px;
  scrollbar-gutter: stable;
}
.scroll-area::-webkit-scrollbar {
  width: 6px;
}
.scroll-area::-webkit-scrollbar-track {
  background: transparent;
}
.scroll-area::-webkit-scrollbar-thumb {
  background: var(--border-strong, #cbd5e1);
  border-radius: 999px;
}
.scroll-area::-webkit-scrollbar-thumb:hover {
  background: var(--slate, #94a3b8);
}
</style>
