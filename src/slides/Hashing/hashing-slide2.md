<Slide2 topic="Hashing">
  <template #content>

<div class="slide-h1" style="margin-bottom:12px;">What is a <span class="highlight">Hash Table?</span></div>

<div class="scroll-area">
<div class="g2" style="gap:14px;align-items:start;">

<div class="flex-col">
  <div v-click class="card-navy" style="border-radius:10px;">
    <div style="font-size:.82rem;line-height:1.6;color:var(--slate);">
      A <strong style="color:var(--red);">hash table</strong> stores data as <strong style="color:var(--green);">key–value pairs</strong>. Give it a key, and it computes exactly where to look — no searching required.
    </div>
  </div>

  <div v-click class="card" style="display:flex;gap:10px;align-items:center;">
    <div class="icon-circle ic-blue">K</div>
    <div>
      <div class="slide-h3">Key</div>
      <div class="small-text">What you search <strong>by</strong> — a roll number, username, or product ID.</div>
    </div>
  </div>

  <div v-click class="card" style="display:flex;gap:10px;align-items:center;">
    <div class="icon-circle ic-green">V</div>
    <div>
      <div class="slide-h3">Value</div>
      <div class="small-text">What you actually <strong>want back</strong> — the student record, profile, or price.</div>
    </div>
  </div>

  <div v-click class="callout callout-info" style="font-size:.7rem;">
    <div><strong>Hash table = </strong>a structure that maps <span class="mono">Key → Value</span>, computing the exact spot for each pair.</div>
  </div>
</div>

<div class="flex-col">
  <div v-click class="section-label">The Cloakroom Analogy</div>

  <div v-click class="card" style="border:1px solid var(--blue);">
    <div class="slide-h3" style="color:var(--blue);">Step 1 — Hand Over Your Bag</div>
    <div class="small-text" style="margin-top:4px;">This is your <strong>value</strong> — the data you want stored.</div>
  </div>

  <div v-click class="card" style="border:1px solid var(--orange);">
    <div class="slide-h3" style="color:var(--orange);">Step 2 — Get a Token Number</div>
    <div class="small-text" style="margin-top:4px;">Computed instantly — this is the <strong>hash function</strong> producing an index.</div>
  </div>

  <div v-click class="card" style="border:1px solid var(--green);">
    <div class="slide-h3" style="color:var(--green);">Step 3 — Show the Token Later</div>
    <div class="small-text" style="margin-top:4px;">No searching shelf by shelf — walk straight to that numbered spot.</div>
  </div>

  <div v-click class="callout callout-success" style="font-size:.7rem;">
    <div>Key in → index computed → <strong>direct access</strong>. That's exactly how a hash table works.</div>
  </div>

  <div v-click class="card card-purple">
    <div class="slide-h3" style="color:var(--purple);">In Code Terms</div>
    <div class="body-text">Key <span class="mono">101</span> → Value <span class="mono">"Aditi Sharma"</span>. Ask for <span class="mono">101</span>, get the name back — instantly.</div>
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
