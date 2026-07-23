<Slide2 topic="Hashing">
  <template #content>

<div class="slide-h1" style="margin-bottom:12px;">Check Your Understanding — <span class="highlight">Quick-Fire Recap</span></div>

<div class="scroll-area">
<div class="g2" style="gap:14px;align-items:start;">

<div class="flex-col">
  <div v-click class="section-label">Conceptual — Think Before You Answer</div>

  <div v-after class="card" style="border:1px solid var(--blue);">
    <div class="slide-h3" style="color:var(--blue);">Q1. Why is lookup O(1) on average, but array search O(n)?</div>
  </div>
  <div v-click class="callout callout-info" style="font-size:.7rem;">
    <div><strong>A:</strong> We compute the position directly instead of scanning for it.</div>
  </div>

  <div v-click class="card" style="border:1px solid var(--orange);margin-top:8px;">
    <div class="slide-h3" style="color:var(--orange);">Q2. Why are collisions mathematically unavoidable?</div>
  </div>
  <div v-click class="callout callout-info" style="font-size:.7rem;">
    <div><strong>A:</strong> Pigeonhole principle — more possible keys than buckets.</div>
  </div>

  <div v-click class="card" style="border:1px solid var(--green);margin-top:8px;">
    <div class="slide-h3" style="color:var(--green);">Q3. Why doesn't rehashing's O(n) cost break the "O(1) average" claim?</div>
  </div>
  <div v-click class="callout callout-info" style="font-size:.7rem;">
    <div><strong>A:</strong> It happens rarely — the cost amortizes to O(1) per insertion over time.</div>
  </div>
</div>

<div class="flex-col">
  <div v-click class="section-label">Predict the Output — Grab a Pen</div>

  <div v-after class="card" style="border:1px solid var(--blue);">
    <div class="slide-h3" style="color:var(--blue);">Q4. hash(key) = key % 5. Insert 10, 15, 25, 7, 12 (Chaining). Which bucket ends up with 3 items?</div>
  </div>
  <div v-click class="callout callout-info" style="font-size:.7rem;">
    <div><strong>A:</strong> Bucket 0 — 10, 15, and 25 all hash to 0.</div>
  </div>

  <div v-click class="card" style="border:1px solid var(--orange);margin-top:8px;">
    <div class="slide-h3" style="color:var(--orange);">Q5. hash(key) = key % 10. Insert 34, 12, 42, 7, 22 (Linear Probing). Where does 42 land?</div>
  </div>
  <div v-click class="callout callout-info" style="font-size:.7rem;">
    <div><strong>A:</strong> Index 3 — home index 2 is already taken by 12, so it probes forward.</div>
  </div>

  <div v-click class="card" style="border:1px solid var(--green);margin-top:8px;">
    <div class="slide-h3" style="color:var(--green);">Q6. A table of size 8 holds 6 elements. Load factor? Rehash at threshold 0.75?</div>
  </div>
  <div v-click class="callout callout-info" style="font-size:.7rem;">
    <div><strong>A:</strong> λ = 0.75 — right at the typical threshold; most implementations resize now.</div>
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
