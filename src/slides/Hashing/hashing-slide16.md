<Slide2 topic="Hashing">
  <template #content>

<div class="slide-h1" style="margin-bottom:12px;">Spot the <span class="highlight">Hashing Problem</span></div>

<div class="scroll-area">
<div class="g2" style="gap:14px;align-items:start;">

<div class="flex-col">
  <div v-click class="card-navy" style="border-radius:10px;">
    <div style="font-size:.82rem;line-height:1.6;color:var(--slate);">
      Before writing any code, ask: <strong style="color:var(--red);">"Do I need fast existence, frequency, or pairing checks?"</strong> That's the smell of a hashing problem.
    </div>
  </div>

  <div v-click class="card" style="display:flex;gap:10px;align-items:center;">
    <div class="icon-circle ic-blue">1</div>
    <div>
      <div class="slide-h3">"Have I seen this before?"</div>
      <div class="small-text">→ Use a <span class="mono">Set</span> for O(1) existence checks.</div>
    </div>
  </div>

  <div v-click class="card" style="display:flex;gap:10px;align-items:center;">
    <div class="icon-circle ic-green">2</div>
    <div>
      <div class="slide-h3">"How often does X appear?"</div>
      <div class="small-text">→ Use a <span class="mono">Map&lt;key, count&gt;</span> frequency table.</div>
    </div>
  </div>

  <div v-click class="card" style="display:flex;gap:10px;align-items:center;">
    <div class="icon-circle ic-orange">3</div>
    <div>
      <div class="slide-h3">"Find a pair that satisfies X"</div>
      <div class="small-text">→ Use a <span class="mono">Map&lt;value, index&gt;</span> to check complements instantly.</div>
    </div>
  </div>

  <div v-click class="card" style="display:flex;gap:10px;align-items:center;">
    <div class="icon-circle ic-purple">4</div>
    <div>
      <div class="slide-h3">"Group items by a signature"</div>
      <div class="small-text">→ Use a <span class="mono">Map&lt;signature, list&gt;</span> to bucket related items.</div>
    </div>
  </div>
</div>

<div class="flex-col">
  <div v-click class="section-label">Practice Problems by Level</div>

  <div v-after class="card card-green">
    <div class="slide-h3" style="color:var(--green);">Beginner</div>
    <ul class="small-text" style="margin:4px 0 0 16px;padding:0;">
      <li>Two Sum</li>
      <li>Contains Duplicate</li>
      <li>Valid Anagram</li>
      <li>Ransom Note</li>
      <li>Jewels and Stones</li>
    </ul>
  </div>

  <div v-click class="card card-orange">
    <div class="slide-h3" style="color:var(--orange);">Intermediate</div>
    <ul class="small-text" style="margin:4px 0 0 16px;padding:0;">
      <li>Group Anagrams</li>
      <li>Top K Frequent Elements</li>
      <li>Longest Consecutive Sequence</li>
      <li>Subarray Sum Equals K</li>
      <li>Design HashMap (from scratch)</li>
    </ul>
  </div>

  <div v-click class="card card-purple">
    <div class="slide-h3" style="color:var(--purple);">Advanced</div>
    <ul class="small-text" style="margin:4px 0 0 16px;padding:0;">
      <li>LRU Cache</li>
      <li>LFU Cache</li>
      <li>Design Twitter</li>
      <li>Rabin-Karp (rolling hash)</li>
    </ul>
  </div>

  <div v-click class="callout callout-success" style="font-size:.7rem;">
    <div><strong>Teaching tip:</strong> for each problem, have students say out loud <em>why</em> it's a hashing problem before writing any code.</div>
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
