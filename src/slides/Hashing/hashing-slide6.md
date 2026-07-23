<Slide2 topic="Hashing">
  <template #content>

<div class="slide-h1" style="margin-bottom:12px;">Two Philosophies for <span class="highlight">Resolving Collisions</span></div>

<div class="scroll-area">
<div class="g2" style="gap:14px;align-items:start;">

<div class="flex-col">
  <div v-click class="card-navy" style="border-radius:10px;">
    <div style="font-size:.82rem;line-height:1.6;color:var(--slate);">
      We can't <strong style="color:var(--red);">prevent</strong> collisions — only <strong style="color:var(--green);">manage</strong> them well. There are two philosophies for what happens next.
    </div>
  </div>

  <div v-click class="card card-blue">
    <div class="slide-h3" style="color:var(--blue);">Philosophy 1 — Separate Chaining</div>
    <div class="body-text">Let a bucket hold more than one item. Each bucket becomes a small list.</div>
  </div>

  <div v-click class="card card-green">
    <div class="slide-h3" style="color:var(--green);">Philosophy 2 — Open Addressing</div>
    <div class="body-text">Everyone gets their own slot. If yours is taken, find another slot in the same array.</div>
  </div>

  <div v-click class="callout callout-info" style="font-size:.7rem;">
    <div>Every technique we cover next is a variation of <strong>one of these two ideas</strong>.</div>
  </div>
</div>

<div class="flex-col">
  <div v-click class="section-label">The Fork in the Road</div>

  <div v-after class="small-text" style="margin-bottom:4px;">Separate Chaining</div>
  <div v-after class="arr-strip-with-idx">
    <div class="arr-strip">
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell hl">CAT+ACT</div>
      <div class="arr-cell empty">?</div>
    </div>
    <div class="idx-row"><div>0</div><div>1</div><div>2</div><div>3</div></div>
  </div>
  <div v-after class="small-text" style="text-align:center;margin-top:2px;">Both live in slot 2's list</div>

  <div v-click class="small-text" style="margin-top:14px;margin-bottom:4px;">Open Addressing</div>
  <div v-after class="arr-strip-with-idx">
    <div class="arr-strip">
      <div class="arr-cell empty">?</div>
      <div class="arr-cell empty">?</div>
      <div class="arr-cell done">CAT</div>
      <div class="arr-cell hl">ACT</div>
    </div>
    <div class="idx-row"><div>0</div><div>1</div><div><span class="ptr">2</span></div><div>3</div></div>
  </div>
  <div v-after class="small-text" style="text-align:center;margin-top:2px;">ACT collided at 2, moved to slot 3</div>

  <div v-click class="card card-purple" style="margin-top:10px;">
    <div class="slide-h3" style="color:var(--purple);">Coming Up</div>
    <div style="display:flex;gap:6px;margin-top:6px;flex-wrap:wrap;">
      <span class="pill pill-blue">Separate Chaining</span>
      <span class="pill pill-green">Linear Probing</span>
      <span class="pill pill-red">Quadratic Probing</span>
      <span class="pill pill-blue">Double Hashing</span>
    </div>
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
