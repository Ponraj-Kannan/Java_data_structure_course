<Slide2 topic="Hashing">
  <template #content>

<div class="slide-h1" style="margin-bottom:12px;">Hashing — <span class="highlight">The Complete Picture</span></div>

<div class="scroll-area">
<div class="g2" style="gap:14px;align-items:start;">

<div class="flex-col">
  <div v-click class="card-navy" style="border-radius:10px;">
    <div style="font-size:.82rem;line-height:1.6;color:var(--slate);">
      Hashing solves one problem: finding things <strong style="color:var(--green);">fast</strong>, without searching. A hash function turns any key into an index — giving average <strong style="color:var(--red);">O(1)</strong> access instead of an O(n) scan.
    </div>
  </div>

  <div v-click class="card" style="display:flex;gap:10px;align-items:center;">
    <div class="icon-circle ic-red">1</div>
    <div>
      <div class="slide-h3">Collisions are guaranteed</div>
      <div class="small-text">Not a flaw — the pigeonhole principle makes them mathematically certain.</div>
    </div>
  </div>

  <div v-click class="card" style="display:flex;gap:10px;align-items:center;">
    <div class="icon-circle ic-blue">2</div>
    <div>
      <div class="slide-h3">Two resolution philosophies</div>
      <div class="small-text">Chaining lets buckets hold more. Open Addressing finds another slot instead.</div>
    </div>
  </div>

  <div v-click class="card" style="display:flex;gap:10px;align-items:center;">
    <div class="icon-circle ic-green">3</div>
    <div>
      <div class="slide-h3">Load factor + rehashing</div>
      <div class="small-text">Keep performance close to O(1) over the table's entire lifetime.</div>
    </div>
  </div>

  <div v-click class="card" style="display:flex;gap:10px;align-items:center;">
    <div class="icon-circle ic-orange">4</div>
    <div>
      <div class="slide-h3">Average O(1), Worst O(n)</div>
      <div class="small-text">Know the difference — it's the single most common interview follow-up.</div>
    </div>
  </div>
</div>

<div class="flex-col">
  <div v-click class="section-label">Everything We Covered</div>

  <div v-after style="display:flex;gap:6px;flex-wrap:wrap;">
    <span class="pill pill-red">Hash Function</span>
    <span class="pill pill-blue">Hash Table</span>
    <span class="pill pill-green">Buckets</span>
    <span class="pill pill-red">Collisions</span>
    <span class="pill pill-blue">Separate Chaining</span>
    <span class="pill pill-green">Linear Probing</span>
    <span class="pill pill-red">Quadratic Probing</span>
    <span class="pill pill-blue">Double Hashing</span>
    <span class="pill pill-green">Load Factor</span>
    <span class="pill pill-red">Rehashing</span>
    <span class="pill pill-blue">O(1) Average</span>
    <span class="pill pill-green">O(n) Worst Case</span>
    <span class="pill pill-red">Real-World Applications</span>
  </div>

  <div v-click class="callout callout-success" style="font-size:.7rem;margin-top:10px;">
    <div>Same core idea, everywhere: <strong>compute, don't search.</strong></div>
  </div>

  <div v-click class="card card-purple" style="margin-top:6px;">
    <div class="slide-h3" style="color:var(--purple);">What's Next</div>
    <div class="body-text">Practice questions, predict-the-output traces, and mock interview problems — time to put it all to work.</div>
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
