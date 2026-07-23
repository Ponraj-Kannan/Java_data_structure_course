<Slide2 topic="Hashing">
  <template #content>

<div class="slide-h1" style="margin-bottom:12px;">Why Do We Need <span class="highlight">Hashing?</span></div>

<div class="scroll-area">
<div class="g2" style="gap:14px;align-items:start;">

<div class="flex-col">
  <div v-click class="card-navy" style="border-radius:10px;">
    <div style="font-size:.82rem;line-height:1.6;color:var(--slate);">
      Imagine finding <strong style="color:var(--red);">one student's record</strong> among <strong style="color:var(--green);">10,000 records</strong>. Would you really check every single one?
    </div>
  </div>

  <div v-click class="card card-red">
    <div class="slide-h3" style="color:var(--red-dark);">Without Hashing — Painful!</div>
    <div class="code-block" style="margin-top:6px;font-size:.7rem;">
      <span style="color:#ef5050;">for</span> (<span style="color:#0e6ead;">int</span> <span style="color:#0e6ead;">i</span> = <span style="color:#b45309;">0</span>; <span style="color:#0e6ead;">i</span> &lt; <span style="color:#b45309;">10000</span>; <span style="color:#0e6ead;">i</span>++)<br>
      <span style="padding-left:20px;display:block;"><span style="color:#ef5050;">if</span> (<span style="color:#0e6ead;">records</span>[<span style="color:#0e6ead;">i</span>].<span style="color:#0e6ead;">rollNo</span> == <span style="color:#0e6ead;">target</span>)</span>
      <span style="padding-left:40px;display:block;"><span style="color:#ef5050;">return</span> <span style="color:#0e6ead;">records</span>[<span style="color:#0e6ead;">i</span>];</span>
    </div>
    <div class="small-text" style="margin-top:4px;">Worst case: <strong>10,000 comparisons</strong> just to find one record.</div>
  </div>

  <div v-click class="card card-green">
    <div class="slide-h3" style="color:var(--green);">With Hashing — Instant!</div>
    <div class="code-block" style="margin-top:6px;font-size:.7rem;">
      <span style="color:#0e6ead;">int</span> <span style="color:#0e6ead;">index</span> = <span style="color:#0e6ead;">hash</span>(<span style="color:#0e6ead;">target</span>);<br>
      <span style="color:#ef5050;">return</span> <span style="color:#0e6ead;">records</span>[<span style="color:#0e6ead;">index</span>];  <span style="color:#6b7280;">// done!</span>
    </div>
    <div class="small-text" style="margin-top:4px;">One calculation. One jump. <strong>Done.</strong></div>
  </div>
</div>

<div class="flex-col">
  <div v-click class="section-label">Searching a Big List — One by One</div>

  <div v-after class="arr-strip-with-idx">
    <div class="arr-strip">
      <div class="arr-cell done">101</div>
      <div class="arr-cell done">102</div>
      <div class="arr-cell hl">103</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">…</div>
    </div>
    <div class="idx-row">
      <div>0</div><div>1</div><div><span class="ptr">2</span></div><div>3</div><div>4</div><div>9999</div>
    </div>
  </div>

  <div v-click class="callout callout-warn" style="font-size:.7rem;">
    <div>To find roll number <span class="mono">108</span>, we may need to check all the way to index <span class="mono">9999</span>. That's <strong>O(n)</strong> in the worst case.</div>
  </div>

  <div v-click class="card card-blue">
    <div class="slide-h3" style="color:var(--blue);">What if we skipped the search entirely?</div>
    <div style="display:flex;gap:6px;margin-top:6px;flex-wrap:wrap;">
      <span class="pill pill-red">No scanning</span>
      <span class="pill pill-blue">Direct jump</span>
      <span class="pill pill-green">Same speed, any size</span>
    </div>
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

