<Slide2 topic="Hashing">
  <template #content>

<div class="slide-h1" style="margin-bottom:12px;">Collision Resolution — <span class="highlight">The Full Comparison</span></div>

<div class="scroll-area">
<div class="flex-col" style="gap:14px;">

<div v-click class="card-navy" style="border-radius:10px;">
  <div style="font-size:.82rem;line-height:1.6;color:var(--slate);">
    There's no single "best" technique — every choice trades off <strong style="color:var(--red);">memory</strong>, <strong style="color:var(--green);">speed</strong>, and <strong style="color:var(--blue);">simplicity</strong> differently. This table is one of the highest-yield interview references in this entire topic.
  </div>
</div>

<table v-click class="cmp-table">
  <thead>
    <tr><th></th><th>Separate Chaining</th><th>Linear Probing</th><th>Quadratic Probing</th><th>Double Hashing</th></tr>
  </thead>
  <tbody>
    <tr><td>Extra memory</td><td class="no">Yes (pointers)</td><td class="yes">No</td><td class="yes">No</td><td class="yes">No</td></tr>
    <tr><td>Cache performance</td><td class="no">Poor</td><td class="yes">Excellent</td><td class="yes">Good</td><td class="yes">Good</td></tr>
    <tr><td>Clustering</td><td class="yes">None</td><td class="no">Primary</td><td class="no">Secondary</td><td class="yes">Minimal</td></tr>
    <tr><td>Deletion</td><td class="yes">Easy</td><td class="no">Hard (tombstones)</td><td class="no">Hard (tombstones)</td><td class="no">Hard (tombstones)</td></tr>
    <tr><td>Table can be "full"?</td><td class="yes">Yes, degrades gracefully</td><td class="no">Must stay &lt;100%</td><td class="no">Must stay &lt;100%</td><td class="no">Must stay &lt;100%</td></tr>
    <tr><td>Implementation complexity</td><td class="yes">Low</td><td class="yes">Low</td><td class="no">Medium</td><td class="no">Medium–High</td></tr>
  </tbody>
</table>

<div v-click class="callout callout-info" style="font-size:.7rem;">
  <div><strong>No free lunch:</strong> Chaining is the safest all-rounder. Open addressing (Linear/Quadratic/Double) trades safety margin for raw cache speed — and Double Hashing trades a little extra computation for the best spread.</div>
</div>

<div v-click class="callout callout-success" style="font-size:.7rem;">
  <div><strong>Classroom exercise:</strong> "You're building a spell-checker with millions of words and frequent deletions — which technique would you pick, and why?" Let students argue it out using this table.</div>
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
