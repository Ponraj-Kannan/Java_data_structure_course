<Slide2 topic="Hashing">
  <template #content>

<div class="slide-h1" style="margin-bottom:12px;"><span class="highlight">Separate Chaining</span> — Full Walkthrough</div>

<div class="scroll-area">
<div class="g2" style="gap:14px;align-items:start;">

<div class="flex-col">
  <div v-click class="card-navy" style="border-radius:10px;">
    <div style="font-size:.82rem;line-height:1.6;color:var(--slate);">
      Each bucket holds a small <strong style="color:var(--red);">linked list</strong>. On collision, simply <strong style="color:var(--green);">append</strong> the new item to that bucket's list.
    </div>
  </div>

  <div v-click class="card" style="border:1px solid var(--blue);">
    <div class="slide-h3" style="color:var(--blue);">Working Process</div>
    <ol class="body-text" style="margin:6px 0 0 18px;padding:0;">
      <li>Compute <span class="mono">index = hash(key) % size</span></li>
      <li>Go to <span class="mono">table[index]</span></li>
      <li>If empty, insert directly</li>
      <li>If occupied, <strong>append</strong> to that bucket's list</li>
      <li>To search: jump to the bucket, then scan its (short) list</li>
    </ol>
  </div>

  <table v-click class="cmp-table">
    <thead><tr><th>Advantages</th><th>Disadvantages</th></tr></thead>
    <tbody>
      <tr><td class="yes">Simple to implement</td><td class="no">Extra memory for pointers</td></tr>
      <tr><td class="yes">Degrades gracefully</td><td class="no">Worst case: one long list — O(n)</td></tr>
      <tr><td class="yes">Deletion is easy</td><td class="no">Poor cache locality</td></tr>
    </tbody>
  </table>
</div>

<div class="flex-col">
  <div v-click class="section-label">Watch a Bucket Grow</div>

  <div v-after class="small-text">After inserting "CAT"</div>
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
    <div class="idx-row"><div>0</div><div>1</div><div>2</div><div>3</div><div>4</div><div><span class="ptr">5</span></div><div>6</div></div>
  </div>

  <div v-click class="small-text" style="margin-top:8px;">After inserting "ACT" — collision!</div>
  <div v-after class="arr-strip-with-idx">
    <div class="arr-strip">
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell hl">CAT→ACT</div>
      <div class="arr-cell empty">?</div>
    </div>
    <div class="idx-row"><div>0</div><div>1</div><div>2</div><div>3</div><div>4</div><div><span class="ptr">5</span></div><div>6</div></div>
  </div>

  <div v-click class="small-text" style="margin-top:8px;">After inserting "TCA" — collision again!</div>
  <div v-after class="arr-strip-with-idx">
    <div class="arr-strip">
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell hl">CAT→ACT→TCA</div>
      <div class="arr-cell empty">?</div>
    </div>
    <div class="idx-row"><div>0</div><div>1</div><div>2</div><div>3</div><div>4</div><div><span class="ptr">5</span></div><div>6</div></div>
  </div>

  <div v-click class="callout callout-info" style="font-size:.7rem;margin-top:8px;">
    <div>Search cost in a bucket grows with its chain length. If <strong>every</strong> key collided into one bucket, we'd be back to O(n).</div>
  </div>

  <div v-click class="callout callout-success" style="font-size:.7rem;">
    <div><strong>Try it live:</strong> have students hash their own names into a 7-bucket table on the board and chain any collisions themselves.</div>
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
