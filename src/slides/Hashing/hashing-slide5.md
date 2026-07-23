<Slide2 topic="Hashing">
  <template #content>

<div class="slide-h1" style="margin-bottom:12px;">Why Do <span class="highlight">Collisions</span> Happen?</div>

<div class="scroll-area">
<div class="g2" style="gap:14px;align-items:start;">

<div class="flex-col">
  <div v-click class="card-navy" style="border-radius:10px;">
    <div style="font-size:.82rem;line-height:1.6;color:var(--slate);">
      If there are <strong style="color:var(--red);">more possible keys</strong> than <strong style="color:var(--green);">buckets</strong>, some keys are guaranteed to share a slot. This isn't a bug — it's math.
    </div>
  </div>

  <div v-click class="card" style="display:flex;gap:10px;align-items:center;">
    <div class="icon-circle ic-orange">P</div>
    <div>
      <div class="slide-h3">The Pigeonhole Principle</div>
      <div class="small-text">More possible keys than buckets → at least two keys <strong>must</strong> eventually share a slot.</div>
    </div>
  </div>

  <div v-click class="card card-red">
    <div class="slide-h3" style="color:var(--red-dark);">A Real Collision</div>
    <div class="code-block" style="margin-top:6px;font-size:.7rem;">
      hash("CAT") = (67+65+84) % 7 = 5<br>
      hash("ACT") = (65+67+84) % 7 = 5
    </div>
    <div class="small-text" style="margin-top:4px;">Same letters, same sum — <strong>same index</strong>, even though the words are different.</div>
  </div>

  <div v-click class="callout callout-warn" style="font-size:.7rem;">
    <div>A collision isn't a mistake in your code. With finite buckets and endless possible keys, it's <strong>guaranteed</strong> to happen eventually.</div>
  </div>
</div>

<div class="flex-col">
  <div v-click class="section-label">Two Keys, One Bucket</div>

  <div v-after style="display:flex;gap:8px;justify-content:center;margin-bottom:6px;">
    <span class="pill pill-blue">CAT</span>
    <span class="pill pill-green">ACT</span>
  </div>

  <div v-after class="arr-strip-with-idx">
    <div class="arr-strip">
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell hl">×2</div>
      <div class="arr-cell empty">?</div>
    </div>
    <div class="idx-row">
      <div>0</div><div>1</div><div>2</div><div>3</div><div>4</div><div><span class="ptr">5</span></div><div>6</div>
    </div>
  </div>

  <div v-click class="callout callout-danger" style="font-size:.7rem;">
    <div>Both <span class="mono">hash("CAT")</span> and <span class="mono">hash("ACT")</span> land on <strong>5</strong>. Same slot, two different keys — a <strong>collision</strong>.</div>
  </div>

  <div v-click class="card card-orange">
    <div class="slide-h3" style="color:var(--orange);">Fun fact — the Birthday Paradox</div>
    <div class="body-text">In a room of just 23 people, there's already about a 50% chance that two people share a birthday—even though there are 365 possible birthdays. Collisions occur much sooner than intuition suggests.</div>
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
