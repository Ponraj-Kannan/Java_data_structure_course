<Slide2 topic="Hashing">
  <template #content>

<div class="slide-h1" style="margin-bottom:12px;">The <span class="highlight">Hash Function</span> — Key to Index</div>

<div class="scroll-area">
<div class="g2" style="gap:14px;align-items:start;">

<div class="flex-col">
  <div v-click class="card-navy" style="border-radius:10px;">
    <div style="font-size:.82rem;line-height:1.6;color:var(--slate);">
      A <strong style="color:var(--red);">hash function</strong> takes any key and turns it into a number — deterministically, quickly, and spread out evenly across the table.
    </div>
  </div>

  <div v-click class="card card-blue">
    <div class="slide-h3" style="color:var(--blue);">A Good Hash Function Is...</div>
    <div style="display:flex;gap:6px;margin-top:6px;flex-wrap:wrap;">
      <span class="pill pill-red">Deterministic</span>
      <span class="pill pill-blue">Fast</span>
      <span class="pill pill-green">Uniform</span>
    </div>
    <div class="small-text" style="margin-top:6px;">Same key → same index, every time. Cheap to compute. Spreads keys evenly.</div>
  </div>

  <div v-click class="section-label">A Simple Hash Function</div>

  <div v-after class="code-block">
    <span style="color:#6b7280;">// sum of character codes, wrapped into table size</span><br>
    <span style="color:#0e6ead;">int</span> <span style="color:#0e6ead;">hash</span>(<span style="color:#0e6ead;">String</span> <span style="color:#0e6ead;">key</span>, <span style="color:#0e6ead;">int</span> <span style="color:#0e6ead;">tableSize</span>) {<br>
    <span style="padding-left:20px;display:block;"><span style="color:#0e6ead;">int</span> <span style="color:#0e6ead;">sum</span> = <span style="color:#b45309;">0</span>;</span>
    <span style="padding-left:20px;display:block;"><span style="color:#ef5050;">for</span> (<span style="color:#0e6ead;">char</span> <span style="color:#0e6ead;">c</span> : <span style="color:#0e6ead;">key</span>.<span style="color:#0e6ead;">toCharArray</span>()) <span style="color:#0e6ead;">sum</span> += <span style="color:#0e6ead;">c</span>;</span>
    <span style="padding-left:20px;display:block;"><span style="color:#ef5050;">return</span> <span style="color:#0e6ead;">sum</span> % <span style="color:#0e6ead;">tableSize</span>;</span>
    }
  </div>
</div>

<div class="flex-col">
  <div v-click class="section-label">Trace: hash("CAT") with tableSize = 7</div>

  <table v-after class="trace-table">
    <thead><tr><th>Step</th><th>Char (code)</th><th>Running sum</th></tr></thead>
    <tbody>
      <tr v-click><td>1</td><td>C (67)</td><td>67</td></tr>
      <tr v-click><td>2</td><td>A (65)</td><td>132</td></tr>
      <tr v-click class="hl"><td>3</td><td>T (84)</td><td>216</td></tr>
    </tbody>
  </table>

  <div v-click class="output-box">216 % 7 = <strong>5</strong></div>

  <div v-click class="section-label" style="margin-top:6px;">Landing in the Table</div>

  <div v-after class="arr-strip-with-idx">
    <div class="arr-strip">
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell hl">CAT</div>
      <div class="arr-cell empty">?</div>
    </div>
    <div class="idx-row">
      <div>0</div><div>1</div><div>2</div><div>3</div><div>4</div><div><span class="ptr">5</span></div><div>6</div>
    </div>
  </div>

  <div v-click class="callout callout-info" style="font-size:.7rem;">
    <div>Slot 5 is now a <strong>bucket</strong> — a slot that may need to hold more than one item. More on that next.</div>
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
