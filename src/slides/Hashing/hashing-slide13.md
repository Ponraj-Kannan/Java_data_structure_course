<Slide2 topic="Hashing">
  <template #content>

<div class="slide-h1" style="margin-bottom:12px;"><span class="highlight">Rehashing</span> — Growing the Table</div>

<div class="scroll-area">
<div class="g2" style="gap:14px;align-items:start;">

<div class="flex-col">
  <div v-click class="card-navy" style="border-radius:10px;">
    <div style="font-size:.82rem;line-height:1.6;color:var(--slate);">
      As load factor climbs, performance quietly degrades. Rehashing restores speed by giving the table <strong style="color:var(--green);">more room</strong>.
    </div>
  </div>

  <div v-click class="card" style="display:flex;gap:10px;align-items:center;">
    <div class="icon-circle ic-orange">!</div>
    <div>
      <div class="slide-h3">When It Happens</div>
      <div class="small-text">Automatically, once λ crosses a threshold — commonly <strong>~0.75</strong> (e.g. Java's <span class="mono">HashMap</span>).</div>
    </div>
  </div>

  <div v-click class="card" style="border:1px solid var(--blue);">
    <div class="slide-h3" style="color:var(--blue);">How Resizing Works</div>
    <ol class="body-text" style="margin:6px 0 0 18px;padding:0;">
      <li>Allocate a new, larger array (often ~2×, or next prime)</li>
      <li>Recompute <span class="mono">hash(key) % newSize</span> for every existing key</li>
      <li>Reinsert every element into its new position</li>
      <li>Discard the old array</li>
    </ol>
  </div>

  <div v-click class="callout callout-warn" style="font-size:.7rem;">
    <div>Indices aren't just copied over — <span class="mono">% newSize</span> gives <strong>different</strong> results than <span class="mono">% oldSize</span> for almost every key.</div>
  </div>
</div>

<div class="flex-col">
  <div v-click class="section-label">Old Table (size 7) — 5 elements, λ ≈ 0.71</div>

  <div v-after class="arr-strip-with-idx">
    <div class="arr-strip">
      <div class="arr-cell done">7</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell done">31</div>
      <div class="arr-cell hl">25+18</div>
      <div class="arr-cell done">12</div>
      <div class="arr-cell empty">?</div>
    </div>
    <div class="idx-row"><div>0</div><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div></div>
  </div>

  <div v-click class="callout callout-danger" style="font-size:.7rem;">
    <div>λ = 5/7 ≈ <strong>0.71</strong> — threshold crossed. Resize triggered!</div>
  </div>

  <div v-click class="section-label" style="margin-top:8px;">Recomputing Against Size 17</div>

  <table v-after class="trace-table">
    <thead><tr><th>Key</th><th>Old index (%7)</th><th>New index (%17)</th></tr></thead>
    <tbody>
      <tr><td>12</td><td>5</td><td>12</td></tr>
      <tr class="hl"><td>25</td><td>4</td><td>8</td></tr>
      <tr class="hl"><td>18</td><td>4</td><td>1</td></tr>
    </tbody>
  </table>

  <div v-click class="callout callout-success" style="font-size:.7rem;">
    <div><strong>25</strong> and <strong>18</strong> collided in the old table — but land in completely different slots after resizing. Rehashing doesn't just make room, it often resolves old collisions too.</div>
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
