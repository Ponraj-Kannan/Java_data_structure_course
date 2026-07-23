<Slide2 topic="Hashing">
  <template #content>

<div class="slide-h1" style="margin-bottom:4px;text-align:center;"><span class="highlight">Hashing</span></div>
<div class="small-text" style="text-align:center;margin-bottom:16px;">Data Structures &amp; Algorithms — Placement Prep Track</div>

<div class="scroll-area">
<div class="flex-col" style="gap:14px;">

<div v-click class="card-navy" style="border-radius:10px;text-align:center;">
  <div style="font-size:.9rem;line-height:1.6;color:var(--slate);">
    <strong style="color:var(--red);">Compute, don't search.</strong> By the end of this module, you'll know exactly why that one sentence explains one of the most powerful ideas in computer science.
  </div>
</div>

<div class="g2" style="gap:10px;">
  <div v-click class="card card-blue" style="text-align:center;">
    <div class="slide-h3" style="color:var(--blue);">Phase A</div>
    <div class="small-text" style="margin-top:4px;">Foundations — the problem, the hash function, the payoff</div>
  </div>
  <div v-click class="card card-orange" style="text-align:center;">
    <div class="slide-h3" style="color:var(--orange);">Phase B</div>
    <div class="small-text" style="margin-top:4px;">Collisions — why they happen, four ways to resolve them</div>
  </div>
  <div v-click class="card card-green" style="text-align:center;">
    <div class="slide-h3" style="color:var(--green);">Phase C</div>
    <div class="small-text" style="margin-top:4px;">Tuning &amp; Scaling — load factor, rehashing, complexity</div>
  </div>
  <div v-click class="card card-purple" style="text-align:center;">
    <div class="slide-h3" style="color:var(--purple);">Phase D</div>
    <div class="small-text" style="margin-top:4px;">Applications &amp; Interviews — where it's used, how it's tested</div>
  </div>
</div>

<div v-click class="callout callout-success" style="font-size:.75rem;text-align:center;">
  <div>21 slides. One core idea. Let's begin.</div>
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
