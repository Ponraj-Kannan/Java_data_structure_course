<Slide2 topic="Hashing">
  <template #content>

<div class="slide-h1" style="margin-bottom:12px;">Time Complexity — <span class="highlight">O(1) or O(n)?</span></div>

<div class="scroll-area">
<div class="g2" style="gap:14px;align-items:start;">

<div class="flex-col">
  <div v-click class="card-navy" style="border-radius:10px;">
    <div style="font-size:.82rem;line-height:1.6;color:var(--slate);">
      The exact question every interviewer eventually asks: <em>"Isn't hashing supposed to be O(1)? Then why do people say O(n)?"</em>
    </div>
  </div>

  <table v-click class="trace-table">
    <thead><tr><th>Case</th><th>Scenario</th><th>Complexity</th></tr></thead>
    <tbody>
      <tr><td>Best</td><td>Every key lands in its own bucket</td><td>O(1)</td></tr>
      <tr><td>Average</td><td>Good hash function, load factor controlled</td><td>O(1)</td></tr>
      <tr class="hl"><td>Worst</td><td>All keys collide into one bucket</td><td>O(n)</td></tr>
    </tbody>
  </table>

  <div v-click class="card card-blue">
    <div class="slide-h3" style="color:var(--blue);">Why Average Holds</div>
    <div class="body-text">With a good hash function and load factor kept in check (via rehashing), the expected items per bucket stays small and roughly <strong>constant</strong> — no matter how large the table grows.</div>
  </div>

  <div v-click class="card card-red">
    <div class="slide-h3" style="color:var(--red-dark);">Why Worst Case Exists</div>
    <div class="body-text">A poor hash function — or a deliberately crafted adversarial input — can force every key into the <strong>same</strong> bucket. Lookup then degrades to a plain linear scan through that one chain.</div>
  </div>
</div>

<div class="flex-col">
  <div v-click class="section-label">Same 5 Keys, Same 5 Buckets — Different Luck</div>

  <div v-after class="small-text">Best Case — every key its own bucket</div>
  <div v-after class="arr-strip-with-idx">
    <div class="arr-strip">
      <div class="arr-cell done">A</div>
      <div class="arr-cell done">B</div>
      <div class="arr-cell done">C</div>
      <div class="arr-cell done">D</div>
      <div class="arr-cell done">E</div>
    </div>
  </div>

  <div v-click class="small-text" style="margin-top:10px;">Average Case — one short chain</div>
  <div v-after class="arr-strip-with-idx">
    <div class="arr-strip">
      <div class="arr-cell done">A</div>
      <div class="arr-cell done">B</div>
      <div class="arr-cell hl">C→D</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell done">E</div>
    </div>
  </div>

  <div v-click class="small-text" style="margin-top:10px;">Worst Case — everything in one bucket</div>
  <div v-after class="arr-strip-with-idx">
    <div class="arr-strip">
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell hl">A→B→C→D→E</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
    </div>
  </div>

  <div v-click class="callout callout-success" style="font-size:.7rem;margin-top:8px;">
    <div><strong>Interview bonus:</strong> Java 8+'s <span class="mono">HashMap</span> converts a bucket's list into a balanced tree once it grows past 8 nodes — capping the true worst case at O(log n) instead of O(n).</div>
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
