<Slide2 topic="Hashing">
  <template #content>

<div class="slide-h1" style="margin-bottom:12px;">Constant-Time Lookup — The <span class="highlight">Payoff</span></div>

<div class="scroll-area">
<div class="g2" style="gap:14px;align-items:start;">

<div class="flex-col">
  <div v-click class="card-navy" style="border-radius:10px;">
    <div style="font-size:.82rem;line-height:1.6;color:var(--slate);">
      Remember our <strong style="color:var(--red);">10,000-record search</strong> from earlier? Here's exactly why hashing solves it.
    </div>
  </div>

  <table v-click class="cmp-table">
    <thead>
      <tr><th>Comparison</th><th>Linear Search</th><th>Hash Table</th></tr>
    </thead>
    <tbody>
      <tr><td>To find one item</td><td>Check every element</td><td>Jump straight there</td></tr>
      <tr><td>Cost</td><td class="no">O(n)</td><td class="yes">O(1) average</td></tr>
      <tr><td>Stays fast as data grows?</td><td class="no">No</td><td class="yes">Yes</td></tr>
    </tbody>
  </table>

  <div v-click class="callout callout-success" style="font-size:.7rem;">
    <div>We traded a <strong>search</strong> problem for an <strong>arithmetic</strong> problem — and arithmetic is fast.</div>
  </div>
</div>

<div class="flex-col">
  <div v-click class="section-label">Finding Roll No. 4521 — Two Ways</div>

  <div v-after class="small-text" style="margin-bottom:4px;">Linear Search — Step by Step</div>
  <div v-after class="arr-strip-with-idx">
    <div class="arr-strip">
      <div class="arr-cell done">✓</div>
      <div class="arr-cell done">✓</div>
      <div class="arr-cell done">✓</div>
      <div class="arr-cell empty">…</div>
      <div class="arr-cell hl">4521</div>
    </div>
    <div class="idx-row">
      <div>0</div><div>1</div><div>2</div><div>…</div><div><span class="ptr">4521</span></div>
    </div>
  </div>
  <div v-after class="small-text" style="margin-top:4px;">Steps taken: <strong>up to 4,521</strong></div>

  <div v-click class="small-text" style="margin-top:14px;margin-bottom:4px;">Hash Table — Direct Jump</div>
  <div v-after class="arr-strip-with-idx">
    <div class="arr-strip">
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell hl">4521</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
    </div>
    <div class="idx-row">
      <div>0</div><div>1</div><div><span class="ptr">2</span></div><div>3</div><div>4</div>
    </div>
  </div>
  <div v-after class="small-text" style="margin-top:4px;">Steps taken: <strong>1</strong></div>

  <div v-click class="callout callout-info" style="font-size:.7rem;margin-top:8px;">
    <div>Like flipping through every page of a dictionary vs. jumping straight to the <span class="mono">"H"</span> tab — same book, wildly different effort.</div>
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
