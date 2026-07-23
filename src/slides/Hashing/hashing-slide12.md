<Slide2 topic="Hashing">
  <template #content>

<div class="slide-h1" style="margin-bottom:12px;"><span class="highlight">Load Factor</span> — How Full Is Too Full?</div>

<div class="scroll-area">
<div class="g2" style="gap:14px;align-items:start;">

<div class="flex-col">
  <div v-click class="card-navy" style="border-radius:10px;">
    <div style="font-size:.82rem;line-height:1.6;color:var(--slate);">
      Load factor tells us <strong style="color:var(--red);">how full</strong> the hash table currently is — the single number that predicts its performance.
    </div>
  </div>

  <div v-click class="card" style="border:1px solid var(--blue);">
    <div class="slide-h3" style="color:var(--blue);">The Formula</div>
    <div class="code-block" style="margin-top:6px;font-size:.75rem;">
      λ = n / m
    </div>
    <div class="small-text" style="margin-top:4px;"><span class="mono">n</span> = elements stored, <span class="mono">m</span> = number of buckets.</div>
  </div>

  <div v-click class="card card-blue">
    <div class="slide-h3" style="color:var(--blue);">Separate Chaining</div>
    <div class="body-text">Average chain length ≈ λ. Lookup cost grows roughly <strong>linearly</strong> with λ.</div>
  </div>

  <div v-click class="card card-orange">
    <div class="slide-h3" style="color:var(--orange);">Open Addressing</div>
    <div class="body-text">Performance degrades <strong>sharply</strong> as λ approaches 1. Most systems resize around <strong>0.7</strong>.</div>
  </div>
</div>

<div class="flex-col">
  <div v-click class="section-label">The Fuller It Gets…</div>

  <div v-after class="arr-strip-with-idx">
    <div class="arr-strip">
      <div class="arr-cell done">●</div><div class="arr-cell done">●</div><div class="arr-cell done">●</div><div class="arr-cell done">●</div><div class="arr-cell done">●</div>
      <div class="arr-cell empty">?</div><div class="arr-cell empty">?</div><div class="arr-cell empty">?</div><div class="arr-cell empty">?</div><div class="arr-cell empty">?</div>
    </div>
  </div>
  <div v-after class="callout callout-info" style="font-size:.7rem;">
    <div>λ = 5/10 = <strong>0.5</strong> — healthy.</div>
  </div>

  <div v-click class="arr-strip-with-idx" style="margin-top:8px;">
    <div class="arr-strip">
      <div class="arr-cell done">●</div><div class="arr-cell done">●</div><div class="arr-cell done">●</div><div class="arr-cell done">●</div><div class="arr-cell done">●</div>
      <div class="arr-cell done">●</div><div class="arr-cell done">●</div><div class="arr-cell empty">?</div><div class="arr-cell empty">?</div><div class="arr-cell empty">?</div>
    </div>
  </div>
  <div v-after class="callout callout-warn" style="font-size:.7rem;">
    <div>λ = 7/10 = <strong>0.7</strong> — getting full, watch closely.</div>
  </div>

  <div v-click class="arr-strip-with-idx" style="margin-top:8px;">
    <div class="arr-strip">
      <div class="arr-cell done">●</div><div class="arr-cell done">●</div><div class="arr-cell done">●</div><div class="arr-cell done">●</div><div class="arr-cell done">●</div>
      <div class="arr-cell done">●</div><div class="arr-cell done">●</div><div class="arr-cell done">●</div><div class="arr-cell done">●</div><div class="arr-cell empty">?</div>
    </div>
  </div>
  <div v-after class="callout callout-danger" style="font-size:.7rem;">
    <div>λ = 9/10 = <strong>0.9</strong> — dangerously full.</div>
  </div>

  <div v-click class="small-text" style="margin-top:8px;">Most systems automatically resize once λ crosses roughly <strong>0.7–0.75</strong> — right before performance really starts to suffer.</div>
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
