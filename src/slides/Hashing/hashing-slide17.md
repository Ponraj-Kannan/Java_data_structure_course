<Slide2 topic="Hashing">
  <template #content>

<div class="slide-h1" style="margin-bottom:12px;">Common <span class="highlight">Mistakes</span> </div>

<div class="scroll-area">
<div class="g2" style="gap:14px;align-items:start;">

<div class="flex-col">
  <div v-click class="card-navy" style="border-radius:10px;">
    <div style="font-size:.82rem;line-height:1.6;color:var(--slate);">
      Even strong students trip on the <strong style="color:var(--red);">same handful</strong> of hashing mistakes, semester after semester. Let's name them so you can avoid them.
    </div>
  </div>

  <div v-click class="card" style="display:flex;gap:10px;align-items:center;">
    <div class="icon-circle ic-red">✕</div>
    <div>
      <div class="slide-h3">Myth: "O(1), always"</div>
      <div class="small-text">Reality: that's the <strong>average</strong> case. A bad hash function or adversarial input can degrade to O(n).</div>
    </div>
  </div>

  <div v-click class="card" style="display:flex;gap:10px;align-items:center;">
    <div class="icon-circle ic-red">✕</div>
    <div>
      <div class="slide-h3">Myth: "Collisions = a bug"</div>
      <div class="small-text">Reality: guaranteed by the pigeonhole principle. The hash function's job is to <strong>minimize</strong> them, not eliminate them.</div>
    </div>
  </div>

  <div v-click class="card" style="display:flex;gap:10px;align-items:center;">
    <div class="icon-circle ic-red">✕</div>
    <div>
      <div class="slide-h3">Myth: "HashMap keeps insertion order"</div>
      <div class="small-text">Reality: plain <span class="mono">HashMap</span>/<span class="mono">dict</span> don't guarantee order. Use <span class="mono">LinkedHashMap</span> if you need it.</div>
    </div>
  </div>
</div>

<div class="flex-col">
  <div v-click class="section-label">Implementation Pitfalls</div>

  <div v-after class="card" style="display:flex;gap:10px;align-items:center;">
    <div class="icon-circle ic-orange">✕</div>
    <div>
      <div class="slide-h3">Mutable keys</div>
      <div class="small-text">If a key's hash-relevant fields change after insertion, it can get permanently <strong>lost</strong> in the wrong bucket.</div>
    </div>
  </div>

  <div v-click class="card" style="display:flex;gap:10px;align-items:center;">
    <div class="icon-circle ic-orange">✕</div>
    <div>
      <div class="slide-h3"><span class="mono">equals()</span> without <span class="mono">hashCode()</span></div>
      <div class="small-text">Breaks the rule that equal objects must share a hash code — silently corrupts lookups.</div>
    </div>
  </div>

  <div v-click class="card" style="display:flex;gap:10px;align-items:center;">
    <div class="icon-circle ic-orange">✕</div>
    <div>
      <div class="slide-h3">Naive deletion in open addressing</div>
      <div class="small-text">Removing without a tombstone marker breaks the probe chain for every later search.</div>
    </div>
  </div>

  <div v-click class="card" style="display:flex;gap:10px;align-items:center;">
    <div class="icon-circle ic-orange">✕</div>
    <div>
      <div class="slide-h3">Ignoring load factor</div>
      <div class="small-text">Never resizing lets performance quietly degrade as more items are inserted.</div>
    </div>
  </div>

  <div v-click class="callout callout-success" style="font-size:.7rem;">
    <div><strong>Warm-up idea:</strong> show a short buggy snippet and have students spot which of these mistakes is hiding in it.</div>
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
