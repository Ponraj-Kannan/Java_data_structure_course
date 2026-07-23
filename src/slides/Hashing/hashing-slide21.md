<Slide2 topic="Hashing">
  <template #content>

<div class="slide-h1" style="margin-bottom:12px;">Keep Practicing — <span class="highlight">Further Reading</span></div>

<div class="scroll-area">
<div class="g2" style="gap:14px;align-items:start;">

<div class="flex-col">
  <div v-click class="card-navy" style="border-radius:10px;">
    <div style="font-size:.82rem;line-height:1.6;color:var(--slate);">
      Understanding hashing conceptually is step one. Real fluency comes from solving problems until the patterns feel <strong style="color:var(--green);">automatic</strong>.
    </div>
  </div>

  <div v-click class="card" style="border:1px solid var(--blue);">
    <div class="slide-h3" style="color:var(--blue);">Where to Practice</div>
    <ul class="body-text" style="margin:6px 0 0 18px;padding:0;">
      <li>LeetCode — "Hash Table" tag</li>
      <li>GeeksforGeeks — Hashing article series</li>
      <li>Striver's SDE Sheet — Hashing section</li>
    </ul>
  </div>

  <div v-click class="card" style="border:1px solid var(--orange);">
    <div class="slide-h3" style="color:var(--orange);">Suggested Order</div>
    <ol class="body-text" style="margin:6px 0 0 18px;padding:0;">
      <li>Re-implement chaining insert/search from memory</li>
      <li>Solve the Beginner list from earlier</li>
      <li>Move to Intermediate, then Advanced</li>
    </ol>
  </div>
</div>

<div class="flex-col">
  <div v-click class="section-label">Self-Check Before You Move On</div>

  <div v-after class="card" style="display:flex;gap:10px;align-items:center;">
    <div class="icon-circle ic-green">✓</div>
    <div>
      <div class="small-text">Can you explain hashing to a friend in under 2 minutes using the cloakroom analogy?</div>
    </div>
  </div>

  <div v-click class="card" style="display:flex;gap:10px;align-items:center;">
    <div class="icon-circle ic-green">✓</div>
    <div>
      <div class="small-text">Can you code chaining insert/search from memory, without looking back?</div>
    </div>
  </div>

  <div v-click class="card" style="display:flex;gap:10px;align-items:center;">
    <div class="icon-circle ic-green">✓</div>
    <div>
      <div class="small-text">Can you explain average O(1) vs worst-case O(n) confidently, unprompted?</div>
    </div>
  </div>

  <div v-click class="card card-purple">
    <div class="slide-h3" style="color:var(--purple);">Looking Ahead</div>
    <div class="body-text">Whatever comes next in the course, the mental habit you just built — <strong>compute, don't search</strong> — will show up again and again.</div>
  </div>

  <div v-click class="callout callout-success" style="font-size:.7rem;">
    <div><strong>That's a wrap on Hashing.</strong> Questions?</div>
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
