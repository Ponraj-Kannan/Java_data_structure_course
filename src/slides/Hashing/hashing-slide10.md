<Slide2 topic="Hashing">
  <template #content>

<div class="slide-h1" style="margin-bottom:12px;"><span class="highlight">Double Hashing</span> — Different Strides for Different Keys</div>

<div class="scroll-area">
<div class="g2" style="gap:14px;align-items:start;">

<div class="flex-col">
  <div v-click class="card-navy" style="border-radius:10px;">
    <div style="font-size:.82rem;line-height:1.6;color:var(--slate);">
      Use a <strong style="color:var(--red);">second hash function</strong> to pick the step size — so different colliding keys take different-length strides instead of following one shared path.
    </div>
  </div>

  <div v-click class="card" style="border:1px solid var(--blue);">
    <div class="slide-h3" style="color:var(--blue);">Working Process</div>
    <ol class="body-text" style="margin:6px 0 0 18px;padding:0;">
      <li>Compute <span class="mono">index = hash1(key) % size</span></li>
      <li>If empty, insert there</li>
      <li>If occupied, compute <span class="mono">step = hash2(key)</span></li>
      <li>Probe <span class="mono">(hash1 + i × step) % size</span> for <span class="mono">i = 1, 2, 3…</span></li>
    </ol>
  </div>

  <table v-click class="cmp-table">
    <thead><tr><th>Advantages</th><th>Disadvantages</th></tr></thead>
    <tbody>
      <tr><td class="yes">Best collision-spreading of the three</td><td class="no">More computation per probe</td></tr>
      <tr><td class="yes">Rarely repeats another key's path</td><td class="no"><span class="mono">hash2</span> must be chosen carefully (never 0)</td></tr>
    </tbody>
  </table>
</div>

<div class="flex-col">
  <div v-click class="section-label">Same 3 Colliding Keys, One More Technique</div>

  <div v-after class="small-text">hash1(key) = key % 10 &nbsp;|&nbsp; hash2(key) = 7 − (key % 7)</div>

  <div v-click class="small-text" style="margin-top:8px;">Insert 13 → hash1 = 3 → empty → place</div>
  <div v-after class="arr-strip-with-idx">
    <div class="arr-strip">
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell hl">13</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
    </div>
    <div class="idx-row"><div>0</div><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div><div>8</div><div>9</div></div>
  </div>

  <div v-click class="small-text" style="margin-top:8px;">Insert 23 → occupied! hash2(23) = 5 → probe (3+5)%10 = 8</div>
  <div v-after class="arr-strip-with-idx">
    <div class="arr-strip">
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell done">13</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell hl">23</div>
      <div class="arr-cell empty">?</div>
    </div>
    <div class="idx-row"><div>0</div><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div><div><span class="ptr">8</span></div><div>9</div></div>
  </div>

  <div v-click class="small-text" style="margin-top:8px;">Insert 33 → occupied! hash2(33) = 2 → probe (3+2)%10 = 5</div>
  <div v-after class="arr-strip-with-idx">
    <div class="arr-strip">
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell done">13</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell hl">33</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell done">23</div>
      <div class="arr-cell empty">?</div>
    </div>
    <div class="idx-row"><div>0</div><div>1</div><div>2</div><div>3</div><div>4</div><div><span class="ptr">5</span></div><div>6</div><div>7</div><div>8</div><div>9</div></div>
  </div>

  <div v-click class="callout callout-info" style="font-size:.7rem;">
    <div><strong>All three, side by side:</strong> Linear → 3,4,5 (packed tight). Quadratic → 3,4,7 (a little spread). Double Hashing → 3,5,8 (widely spread — each key takes its own stride).</div>
  </div>

  <div v-click class="callout callout-success" style="font-size:.7rem;">
    <div><strong>Try it live:</strong> change the <span class="mono">hash2</span> formula and watch every probe path reshuffle in real time.</div>
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
