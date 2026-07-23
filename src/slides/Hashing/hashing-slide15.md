<Slide2 topic="Hashing">
  <template #content>

<div class="slide-h1" style="margin-bottom:12px;">Where <span class="highlight">Hashing</span> Runs the World</div>

<div class="scroll-area">
<div class="flex-col" style="gap:14px;">

<div class="g3" style="gap:10px;">

  <div v-click class="card card-red" style="text-align:center;">
    <div class="icon-circle ic-red" style="margin:0 auto 6px;">D</div>
    <div class="slide-h3" style="color:var(--red-dark);">Dictionaries / Maps</div>
    <div class="small-text" style="margin-top:4px;">Core of HashMap, dict, unordered_map — key → value in O(1) average.</div>
  </div>

  <div v-click class="card card-blue" style="text-align:center;">
    <div class="icon-circle ic-blue" style="margin:0 auto 6px;">S</div>
    <div class="slide-h3" style="color:var(--blue);">Sets</div>
    <div class="small-text" style="margin-top:4px;">Fast membership checks — <span class="mono">in</span>, <span class="mono">contains</span> — without scanning.</div>
  </div>

  <div v-click class="card card-green" style="text-align:center;">
    <div class="icon-circle ic-green" style="margin:0 auto 6px;">I</div>
    <div class="slide-h3" style="color:var(--green);">DB Indexing</div>
    <div class="small-text" style="margin-top:4px;">Hash indexes locate rows directly instead of scanning the table.</div>
  </div>

  <div v-click class="card card-orange" style="text-align:center;">
    <div class="icon-circle ic-orange" style="margin:0 auto 6px;">C</div>
    <div class="slide-h3" style="color:var(--orange);">Caching</div>
    <div class="small-text" style="margin-top:4px;">Web/CDN caches key content by URL hash for instant retrieval.</div>
  </div>

  <div v-click class="card card-purple" style="text-align:center;">
    <div class="icon-circle ic-purple" style="margin:0 auto 6px;">P</div>
    <div class="slide-h3" style="color:var(--purple);">Password Storage</div>
    <div class="small-text" style="margin-top:4px;">A one-way, salted hash is stored — never the password itself.</div>
  </div>

  <div v-click class="card card-teal" style="text-align:center;">
    <div class="icon-circle ic-teal" style="margin:0 auto 6px;">T</div>
    <div class="slide-h3" style="color:var(--teal);">Compiler Symbol Tables</div>
    <div class="small-text" style="margin-top:4px;">Variable/function names hashed to find type, scope, and location fast.</div>
  </div>

  <div v-click class="card card-red" style="text-align:center;">
    <div class="icon-circle ic-red" style="margin:0 auto 6px;">R</div>
    <div class="slide-h3" style="color:var(--red-dark);">Duplicate Detection</div>
    <div class="small-text" style="margin-top:4px;">Compare content hashes to spot duplicates without comparing every byte.</div>
  </div>

  <div v-click class="card card-blue" style="text-align:center;">
    <div class="icon-circle ic-blue" style="margin:0 auto 6px;">F</div>
    <div class="slide-h3" style="color:var(--blue);">Frequency Counting</div>
    <div class="small-text" style="margin-top:4px;">Word frequency, character frequency, "most common element" problems.</div>
  </div>

  <div v-click class="card card-green" style="text-align:center;">
    <div class="icon-circle ic-green" style="margin:0 auto 6px;">Q</div>
    <div class="slide-h3" style="color:var(--green);">Fast Searching</div>
    <div class="small-text" style="margin-top:4px;">Any "have I seen this?" check across large datasets, instantly.</div>
  </div>

</div>

<div v-click class="callout callout-success" style="font-size:.7rem;">
  <div>If you've ever pressed <span class="mono">Ctrl+F</span>, logged into a website, or watched a video buffer instantly — hashing was already at work.</div>
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
