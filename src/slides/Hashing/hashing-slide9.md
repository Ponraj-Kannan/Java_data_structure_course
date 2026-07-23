<Slide2 topic="Hashing">
  <template #content>

<div class="slide-h1" style="margin-bottom:12px;"><span class="highlight">Quadratic Probing</span> — Bigger Jumps, Less Clustering</div>

<div class="scroll-area">
<div class="g2" style="gap:14px;align-items:start;">

<div class="flex-col">
  <div v-click class="card-navy" style="border-radius:10px;">
    <div style="font-size:.82rem;line-height:1.6;color:var(--slate);">
      Same idea as linear probing, but instead of checking the very <strong style="color:var(--red);">next slot</strong>, we jump using growing <strong style="color:var(--green);">squared steps</strong>: +1, +4, +9…
    </div>
  </div>

  <div v-click class="card" style="border:1px solid var(--blue);">
    <div class="slide-h3" style="color:var(--blue);">Working Process</div>
    <ol class="body-text" style="margin:6px 0 0 18px;padding:0;">
      <li>Compute <span class="mono">index = hash(key) % size</span></li>
      <li>If empty, insert there</li>
      <li>If occupied, try <span class="mono">index + 1²</span></li>
      <li>Then <span class="mono">index + 2²</span>, <span class="mono">index + 3²</span>… until empty</li>
    </ol>
  </div>

  <table v-click class="cmp-table">
    <thead><tr><th>Advantages</th><th>Disadvantages</th></tr></thead>
    <tbody>
      <tr><td class="yes">Reduces primary clustering</td><td class="no">Secondary clustering remains</td></tr>
      <tr><td class="yes">Still no extra memory</td><td class="no">May miss a free slot unless size is prime</td></tr>
      <tr><td class="yes">Fairly simple to code</td><td class="no">Slightly more computation per probe</td></tr>
    </tbody>
  </table>
</div>

<div class="flex-col">
  <div v-click class="section-label">Insert 13, 23 → slots 3, 4 filled (same as linear so far)</div>

  <div v-after class="arr-strip-with-idx">
    <div class="arr-strip">
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell done">13</div>
      <div class="arr-cell done">23</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
    </div>
    <div class="idx-row"><div>0</div><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div><div>8</div><div>9</div></div>
  </div>

  <div v-click class="small-text" style="margin-top:8px;">Now insert 33 → hash(33) = 3 → collision! Probe: index + 1² = 4</div>
  <div v-after class="arr-strip-with-idx">
    <div class="arr-strip">
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell done">13</div>
      <div class="arr-cell hl2">23</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
    </div>
    <div class="idx-row"><div>0</div><div>1</div><div>2</div><div>3</div><div><span class="ptr">4</span></div><div>5</div><div>6</div><div>7</div><div>8</div><div>9</div></div>
  </div>

  <div v-click class="small-text" style="margin-top:6px;">Still occupied → try index + 2² = 7 → empty!</div>
  <div v-after class="arr-strip-with-idx">
    <div class="arr-strip">
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell done">13</div>
      <div class="arr-cell done">23</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell hl">33</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
    </div>
    <div class="idx-row"><div>0</div><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div><span class="ptr">7</span></div><div>8</div><div>9</div></div>
  </div>

  <div v-click class="callout callout-info" style="font-size:.7rem;">
    <div>Compare to <strong>Linear Probing</strong>: the same 3 keys packed tightly into indices 3, 4, 5. Quadratic spreads the last one out to index 7.</div>
  </div>

  <div v-click class="callout callout-warn" style="font-size:.7rem;">
    <div><strong>Secondary clustering:</strong> keys with the same home index always follow the identical probe path. Also — quadratic probing can fail to find a free slot unless the table size is <strong>prime</strong>.</div>
  </div>

  <div v-click class="callout callout-success" style="font-size:.7rem;">
    <div><strong>Try it live:</strong> run the same colliding keys through Linear and Quadratic side-by-side and let students spot the difference themselves.</div>
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
