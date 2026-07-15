<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, watch } from 'vue';

defineProps({
  topic: { type: String, required: true },
  subTopic: { type: String, default: '' }
});

const CODES = {
  java: [
    ['', 'class Stack {'],
    ['c_fields', '    int[] arr;'],
    ['c_fields', '    int capacity;'],
    ['c_fields', '    int top;'], ['', ''],
    ['c_ctor', '    Stack(int size) {'],
    ['c_ctor', '        capacity = size;'],
    ['c_ctor', '        arr = new int[capacity];'],
    ['c_ctor', '        top = -1;'],
    ['c_ctor', '    }'], ['', ''],
    ['c_isempty', '    boolean isEmpty() {'],
    ['c_check', '        return top == -1;'],
    ['', '    }'], ['', '}'],
  ],
  c: [
    ['', '#define MAX 100'], ['', ''],
    ['', 'struct Stack {'],
    ['c_fields', '    int arr[MAX];'],
    ['c_fields', '    int capacity;'],
    ['c_fields', '    int top;'],
    ['', '};'], ['', ''],
    ['c_isempty', 'int isEmpty(struct Stack *s) {'],
    ['c_check', '    return s->top == -1;'],
    ['', '}'],
  ],
  cpp: [
    ['', 'class Stack {'],
    ['', 'public:'],
    ['c_fields', '    int *arr;'],
    ['c_fields', '    int capacity;'],
    ['c_fields', '    int top;'], ['', ''],
    ['c_ctor', '    Stack(int size) {'],
    ['c_ctor', '        capacity = size;'],
    ['c_ctor', '        arr = new int[capacity];'],
    ['c_ctor', '        top = -1;'],
    ['c_ctor', '    }'], ['', ''],
    ['c_isempty', '    bool isEmpty() {'],
    ['c_check', '        return top == -1;'],
    ['', '    }'], ['', '};'],
  ],
  python: [
    ['', 'class Stack:'],
    ['c_ctor', '    def __init__(self, capacity):'],
    ['c_ctor', '        self.capacity = capacity'],
    ['c_ctor', '        self.arr = [None] * capacity'],
    ['c_ctor', '        self.top = -1'], ['', ''],
    ['c_isempty', '    def is_empty(self):'],
    ['c_check', '        return self.top == -1'],
  ],
  javascript: [
    ['', 'class Stack {'],
    ['c_ctor', '  constructor(capacity) {'],
    ['c_ctor', '    this.capacity = capacity;'],
    ['c_ctor', '    this.arr = new Array(capacity);'],
    ['c_ctor', '    this.top = -1;'],
    ['c_ctor', '  }'], ['', ''],
    ['c_isempty', '  isEmpty() {'],
    ['c_check', '    return this.top === -1;'],
    ['', '  }'], ['', '}'],
  ],
};

const PSEUDOCODE = [
  'function isEmpty():',
  '    return top == -1',
];

function frame(title, rows) { return { title, rows }; }

// Cell phases while rendered:
//   'empty'  - unused slot, drawn dashed and blank
//   'normal' - an occupied, settled slot
//   'cur'    - the top slot, highlighted while top is being compared to -1
//              (only appears when the stack is not empty - there is no
//              cell to highlight when top is already -1)
function buildSteps(capacity, values) {
  const steps = [];
  const phaseStarts = { isEmpty: 0 };

  const n = values.length;
  const topIdx = n - 1;
  const empty = topIdx === -1;

  const valAt = {};
  const stateAt = {};
  values.forEach((v, i) => { valAt[i] = v; stateAt[i] = 'normal'; });

  const fnLabel = 'isEmpty()';

  function cells() {
    const arr = [];
    for (let i = 0; i < capacity; i++) {
      const st = stateAt[i];
      if (!st) { arr.push({ idx: i, val: undefined, state: 'empty' }); continue; }
      arr.push({ idx: i, val: valAt[i], state: st });
    }
    return arr;
  }

  function pushStep(opts) {
    steps.push({
      cells: cells(),
      topIdx, capacity,
      size: topIdx + 1,
      result: opts.result,
      badge: opts.badge,
      code: opts.code,
      vars: opts.vars,
    });
  }

  pushStep({
    badge: 'Initial stack \u2014 size ' + (topIdx + 1) + ' / capacity ' + capacity + ' \u2014 ' + fnLabel + ' called',
    code: 'c_isempty',
    vars: [frame('main()', [['capacity', String(capacity), true], ['top', String(topIdx), true]])],
  });

  // --- return top == -1: evaluate the condition. If the stack is not
  // empty, briefly highlight the top cell as the evidence for "false".
  if (!empty) stateAt[topIdx] = 'cur';
  pushStep({
    badge: empty
      ? 'top == -1 \u2192 true \u2192 the stack is Empty'
      : 'top == -1 \u2192 false (top = ' + topIdx + ') \u2192 the stack is Not Empty',
    code: 'c_check',
    result: empty,
    vars: [frame('main()', [['capacity', String(capacity), true], ['top', String(topIdx), true]]), frame(fnLabel, [['top == -1', String(empty), true]])],
  });

  if (!empty) stateAt[topIdx] = 'normal';
  pushStep({
    badge: fnLabel + ' returns ' + empty + ' \u2014 Stack is ' + (empty ? 'Empty' : 'Not Empty'),
    code: 'c_isempty',
    result: empty,
    vars: [frame('main()', [['capacity', String(capacity), true], ['top', String(topIdx), true]])],
  });

  return { steps, phaseStarts };
}

const inpCapacity = ref(5);
const inpElems = ref('10 20 30');
const lang = ref('java');
const speed = ref(650);
const si = ref(0);
const playing = ref(false);
const vizHeight = ref(265);
const tableHeight = ref(60);
const leftWidth = ref(50);
const rightTab = ref('code');

const stepsData = reactive(buildSteps(5, [10, 20, 30]));
const steps = computed(() => stepsData.steps);
const phaseStarts = computed(() => stepsData.phaseStarts);
const s = computed(() => steps.value[Math.max(0, Math.min(si.value, steps.value.length - 1))]);
const codeLines = computed(() => CODES[lang.value] || []);

let playTimer = null;

function applyInput() {
  const raw = String(inpElems.value).trim();
  let arr = raw === '' ? [] : raw.split(/[\s,]+/).filter(x => x !== '').map(Number).filter(n => !isNaN(n));
  if (raw !== '' && !arr.length) { alert('Enter valid numbers separated by spaces, or clear the field for an empty stack.'); return; }

  let cap = parseInt(inpCapacity.value, 10);
  if (isNaN(cap) || cap < 0) { alert('Enter a valid capacity (0 or more).'); return; }
  if (arr.length > cap) arr = arr.slice(0, cap);
  inpElems.value = arr.join(' ');
  inpCapacity.value = cap;

  playing.value = false;
  const built = buildSteps(cap, arr);
  stepsData.steps = built.steps;
  stepsData.phaseStarts = built.phaseStarts;
  si.value = 0;
}

function stepBy(d) { si.value = Math.max(0, Math.min(steps.value.length - 1, si.value + d)); }
function togglePlay() {
  const next = !playing.value;
  if (next && si.value >= steps.value.length - 1) si.value = 0;
  playing.value = next;
}
function tick() {
  clearTimeout(playTimer);
  if (!playing.value) return;
  if (si.value >= steps.value.length - 1) { playing.value = false; return; }
  playTimer = setTimeout(() => { si.value = Math.min(steps.value.length - 1, si.value + 1); tick(); }, 2100 - speed.value);
}
watch(playing, v => { if (v) tick(); else clearTimeout(playTimer); });

function cellLabel(cell) {
  if (cell.idx === s.value.topIdx && s.value.topIdx !== -1) return 'top \u2192';
  return '';
}

function onKeydown(e) {
  const tag = e.target.tagName;
  if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
  if (e.key === 'ArrowRight') stepBy(1);
  if (e.key === 'ArrowLeft') stepBy(-1);
  if (e.key === ' ') { e.preventDefault(); togglePlay(); }
}

const mainRef = ref(null);
const leftColRef = ref(null);
const hResizerRef = ref(null);
const vizResizerRef = ref(null);
const tableResizerRef = ref(null);

function initHResizer() {
  const rsz = hResizerRef.value, main = mainRef.value;
  if (!rsz || !main) return;
  let dragging = false, startX = 0, startW = 0;
  const onDown = e => { dragging = true; startX = e.clientX; startW = leftColRef.value.offsetWidth; rsz.classList.add('drag'); document.body.style.userSelect = 'none'; };
  const onMove = e => { if (!dragging) return; const mainW = main.offsetWidth; leftWidth.value = (Math.max(200, Math.min(mainW - 200, startW + e.clientX - startX)) / mainW) * 100; };
  const onUp = () => { if (!dragging) return; dragging = false; rsz.classList.remove('drag'); document.body.style.userSelect = ''; };
  rsz.addEventListener('mousedown', onDown);
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
  return () => { rsz.removeEventListener('mousedown', onDown); document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
}

function initVResizer(elRef, valueRef, minH, maxH) {
  const rsz = elRef.value;
  if (!rsz) return;
  let dragging = false, startY = 0, startH = 0;
  const onDown = e => { dragging = true; startY = e.clientY; startH = valueRef.value; rsz.classList.add('drag'); document.body.style.userSelect = 'none'; e.preventDefault(); };
  const onMove = e => { if (!dragging) return; valueRef.value = Math.max(minH, Math.min(maxH, startH + (e.clientY - startY))); };
  const onUp = () => { if (!dragging) return; dragging = false; rsz.classList.remove('drag'); document.body.style.userSelect = ''; };
  rsz.addEventListener('mousedown', onDown);
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
  return () => { rsz.removeEventListener('mousedown', onDown); document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
}

let cleanupFns = [];
onMounted(() => {
  document.addEventListener('keydown', onKeydown);
  cleanupFns.push(initHResizer());
  cleanupFns.push(initVResizer(vizResizerRef, vizHeight, 160, 480));
  cleanupFns.push(initVResizer(tableResizerRef, tableHeight, 50, 200));
});
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown);
  clearTimeout(playTimer);
  cleanupFns.forEach(fn => fn && fn());
});
</script>

<template>
  <div class="slide-wrapper">
    <div class="navbar">
      <h2 class="navbar-title">{{ topic }}</h2>
      <img src="../assets/logo.png" />
    </div>
    <div class="slide-body">
      <div class="row-main">
        <div class="ll-root">
    <div class="ll-toolbar">
      <label>Capacity</label>
      <input type="number" min="0" v-model="inpCapacity" class="ll-num-input" />
      <label>Elements </label>
      <input type="text" v-model="inpElems" placeholder="Enter numbers, or leave blank for an empty stack" class="ll-text-input" />
      <button class="ll-viz-btn" @click="applyInput">&#9654; Visualize</button>
      <div class="ll-nav-controls">
        <button class="ll-nav-btn" title="First step" @click="stepBy(-steps.length)">&#171;</button>
        <button class="ll-nav-btn" @click="stepBy(-1)">&#8249; Prev</button>
        <button class="ll-play-btn" @click="togglePlay">{{ playing ? '\u23F8 Pause' : '\u25B6 Play' }}</button>
        <button class="ll-nav-btn" @click="stepBy(1)">Next &#8250;</button>
        <button class="ll-nav-btn" title="Last step" @click="stepBy(steps.length)">&#187;</button>
      </div>
    </div>

    <div class="ll-main" ref="mainRef">
      <div class="ll-left-col" ref="leftColRef" :style="{ width: leftWidth + '%' }">
        <div class="ll-viz-wrap" :style="{ height: vizHeight + 'px' }">
          <div class="ll-perm-area">
            <div class="ll-ptrs">
              <div class="ll-ptr-chip">capacity = <b class="ll-c-blue">{{ s.capacity }}</b></div>
              <div class="ll-ptr-chip">top = <b class="ll-c-orange">{{ s.topIdx }}</b></div>
              <div class="ll-ptr-chip">size = <b class="ll-c-purple">{{ s.size }}</b></div>
              <div v-if="s.result !== undefined" class="ll-ptr-chip">
                isEmpty = <b :class="s.result ? 'll-c-red' : 'll-c-green'">{{ s.result }}</b>
              </div>
            </div>

            <div class="ll-arr-track">
              <template v-for="cell in s.cells" :key="cell.idx">
                <div class="ll-arr-cell-wrap">
                  <div class="ll-who" :class="{ 'll-c-orange': cell.state === 'cur' }">{{ cellLabel(cell) }}</div>
                  <div
                    class="ll-arr-box"
                    :class="{
                      'll-box-empty': cell.state === 'empty',
                      'll-box-cur': cell.state === 'cur'
                    }"
                  >
                    {{ cell.state === 'empty' ? '' : cell.val }}
                  </div>
                  <div class="ll-arr-idx">[{{ cell.idx }}]</div>
                </div>
              </template>

              <div v-if="s.capacity === 0" class="ll-empty-state">
                Capacity is 0 &mdash; no array cells
              </div>
            </div>
          </div>
        </div>
        <div class="ll-vresizer" ref="vizResizerRef"></div>

        <div class="ll-legend">
          <span class="ll-leg"><span class="ll-legdot ll-legdot-existing"></span>occupied cell</span>
          <span class="ll-leg"><span class="ll-legdot" style="background:var(--surface2); border:1.5px dashed var(--border2);"></span>empty cell</span>
          <span class="ll-leg"><span class="ll-legdot ll-legdot-cur"></span>top &mdash; checked, not modified</span>
        </div>

        <div class="ll-table-area" :style="{ height: tableHeight + 'px' }">
          <div class="ll-table-title">Variable frames &mdash; innermost = current</div>
          <div class="ll-stack-line">
            <template v-if="s.vars && s.vars.length">
              <div v-for="(f, depth) in s.vars" :key="depth" class="ll-frame" :class="{ 'll-frame-cur': depth === s.vars.length - 1 }" :style="{ marginLeft: depth * 14 + 'px' }">
                {{ f.title }}(<span v-for="(r, i) in f.rows" :key="i">
                  <span v-if="i > 0">, </span>
                  <span class="ll-fname">{{ r[0] }}</span>=<span :class="r[2] ? 'll-c-blue' : (depth === s.vars.length - 1 ? 'll-c-orange' : 'll-c-green')" style="font-weight:700">{{ r[1] }}</span>
                </span>)<span v-if="depth === s.vars.length - 1" class="ll-now"> &#9668; current</span>
              </div>
            </template>
            <template v-else>&mdash;</template>
          </div>
        </div>
        <div class="ll-vresizer" ref="tableResizerRef"></div>

        <div class="ll-badge-wrap">
          <div class="ll-badge" :class="{ 'll-badge-error': s.invalid }">{{ s.badge }}</div>
        </div>
      </div>

      <div class="ll-resizer" ref="hResizerRef"></div>

      <div class="ll-right-col">
        <div class="ll-code-panel">
          <div class="ll-code-header">
            <div class="ll-tabbar">
              <button class="ll-tab-btn" :class="{ active: rightTab === 'code' }" @click="rightTab = 'code'">Code</button>
              <button class="ll-tab-btn" :class="{ active: rightTab === 'pseudo' }" @click="rightTab = 'pseudo'">Pseudocode</button>
              <button class="ll-tab-btn" :class="{ active: rightTab === 'complexity' }" @click="rightTab = 'complexity'">Complexity</button>
            </div>
            <select v-if="rightTab === 'code'" v-model="lang" class="ll-lang-select">
              <option value="java">Java</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
            </select>
          </div>

          <div v-if="rightTab === 'code'" class="ll-code-scroll">
            <pre class="ll-pre"><span v-for="(line, i) in codeLines" :key="i" class="ll-codeline" :class="{ 'll-hl': line[0] && line[0] === s.code }">{{ line[1] === '' ? ' ' : line[1] }}
</span></pre>
          </div>

          <div v-else-if="rightTab === 'pseudo'" class="ll-code-scroll">
            <pre class="ll-pre"><span v-for="(line, i) in PSEUDOCODE" :key="i" class="ll-codeline">{{ line }}
</span></pre>
          </div>

          <div v-else class="ll-info-scroll">
            <h3>Time &amp; Space Complexity</h3>
            <table class="ll-complexity-table">
              <thead><tr><th>Case</th><th>Time</th><th>Why</th></tr></thead>
              <tbody>
                <tr><td>Empty stack</td><td>O(1)</td><td>a single comparison, <code>top == -1</code>, is enough</td></tr>
                <tr><td>Non-empty stack (any size)</td><td>O(1)</td><td>same single comparison &mdash; the stack's size never matters</td></tr>
                <tr><td>Space</td><td>O(1)</td><td>only a boolean result is produced &mdash; nothing is allocated</td></tr>
              </tbody>
            </table>
            <p class="ll-note">
              Key observation: because every push/pop keeps <code>top</code> perfectly in sync with how
              many elements are present, checking for emptiness never has to look at the array itself
              &mdash; the single sentinel value <code>top == -1</code> is sufficient and is always O(1),
              regardless of the stack's capacity or current size.
            </p>
            <h3>Advantages</h3>
            <p>A trivial, constant-time guard that other operations (like pop and peek) rely on before touching the array, preventing invalid reads.</p>
            <h3>Limitations</h3>
            <p>It only reports whether the stack is empty right now &mdash; the result can become stale immediately if another push or pop happens afterwards, so it must be re-checked before each dependent operation.</p>
            <h3>Key Observations</h3>
            <p><code>top</code> is initialized to <b>-1</b> when the stack is created, and every successful pop that empties the stack brings it back to exactly <b>-1</b> &mdash; there is no other value that means "empty".</p>
            <h3>Edge Cases</h3>
            <p><b>Freshly created stack:</b> <code>top == -1</code>, so isEmpty correctly reports <code>true</code> before anything has ever been pushed. <b>After popping the last element:</b> <code>top</code> returns to -1 and isEmpty again reports <code>true</code>. <b>Any stack with at least one element:</b> <code>top &gt;= 0</code>, so isEmpty always reports <code>false</code>, even at full capacity.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="ll-footer">
      Step {{ si + 1 }} / {{ steps.length }}
      <span class="ll-speed-wrap">Speed <input type="range" min="100" max="2000" step="100" v-model.number="speed" /></span>
    </div>
  </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ll-root * { box-sizing: border-box; }
.ll-root {
  --coral: #F04D4D; --coral-dark: #d93e3e; --coral-light: #fff0f0;
  --bg: #f5f6fa; --surface: #ffffff; --surface2: #f1f4f9;
  --border: #e2e8f0; --border2: #cbd5e1; --text: #1e293b; --text2: #475569; --muted: #94a3b8;
  --blue: #3b82f6; --blue-light: #eff6ff; --green: #22c55e; --green-light: #f0fdf4;
  --orange: #f97316; --orange-light: #fff7ed; --purple: #9333ea;
  --red: #ef4444; --red-dark: #991b1b; --red-light: #fef2f2;
  --node: #1d4ed8; --nodeNew: #15803d; --nodeCur: #c2410c; --nodeDel: #991b1b;
  --shadow-sm: 0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04);
  --radius: 8px; --radius-sm: 6px;
  background: var(--bg); color: var(--text);
  font-family: 'Segoe UI', system-ui, sans-serif; font-size: 13px;
  display: flex; flex-direction: column; height: 50vh; min-height: 600px; overflow: hidden; width: 100%;
}
@keyframes ll-pop { from { transform: scale(.3); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes ll-del-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }
.slide-wrapper { margin-top: -10px; margin-left: -30px; width: 107%; max-height: 100%; font-size: 0.8rem; font-weight: 400; }
.slide-body { display: flex; flex-direction: column; border-radius: 4px; height: 100%; }
.navbar { display: flex; flex-direction: row; justify-content: space-between; align-items: center; gap: 0.75rem; padding: 0 10px; background-color: #ffffff; position: fixed; width: 94.7%; }
.navbar > img { height: 30px; }
.navbar-title { margin: 0; font-size: 1.5rem; font-weight: 700; background-color: #ef5050; color: #ffffff; width: 80%; padding-left: 10px; margin-left: -10px; border-radius: 5px; }
.row-main { width: 100%; height: 90%; margin-top: 37px; overflow-x: auto; overflow-y: auto; scrollbar-width: thin; }
.ll-toolbar { display: flex; align-items: center; gap: 8px; padding: 7px 16px; background: var(--surface); border-bottom: 1px solid var(--border); flex-shrink: 0; flex-wrap: wrap; box-shadow: var(--shadow-sm); }
.ll-toolbar label { font-size: 11px; color: var(--muted); white-space: nowrap; font-weight: 500; }
.ll-num-input, .ll-text-input { background: var(--surface); border: 1px solid var(--border2); color: var(--text); border-radius: var(--radius-sm); padding: 5px 8px; font-size: 13px; font-family: monospace; transition: border-color .15s; }
.ll-num-input { width: 60px; }
.ll-text-input { width: 220px; padding: 5px 10px; }
.ll-num-input:focus, .ll-text-input:focus { outline: none; border-color: var(--coral); box-shadow: 0 0 0 3px rgba(240,77,77,.1); }
.ll-viz-btn { background: var(--coral); color: #fff; border: none; padding: 6px 16px; border-radius: var(--radius-sm); cursor: pointer; font-size: 12px; font-weight: 600; box-shadow: var(--shadow-sm); transition: filter .15s; }
.ll-viz-btn:hover { filter: brightness(1.08); }
.ll-nav-controls { display: flex; margin-left: auto; align-items: center; gap: 4px; flex-shrink: 0; flex-wrap: wrap; }
.ll-nav-btn { background: var(--surface2); border: 1px solid var(--border2); color: var(--text2); padding: 5px 11px; border-radius: var(--radius-sm); cursor: pointer; font-size: 12px; font-weight: 500; transition: all .15s; white-space: nowrap; }
.ll-nav-btn:hover { background: var(--surface); border-color: var(--coral); color: var(--coral); }
.ll-play-btn { background: var(--blue-light); border: 1px solid var(--blue); color: var(--blue); min-width: 72px; font-weight: 600; padding: 5px 11px; border-radius: var(--radius-sm); cursor: pointer; font-size: 12px; transition: all .15s; }
.ll-play-btn:hover { background: var(--blue); color: #fff; }
.ll-main { display: flex; flex: 1; overflow: hidden; position: relative; }
.ll-left-col { display: flex; flex-direction: column; overflow: hidden; min-width: 200px; max-width: 72%; }
.ll-resizer { width: 5px; cursor: col-resize; background: var(--border); flex-shrink: 0; transition: background .15s; position: relative; z-index: 20; }
.ll-resizer:hover, .ll-resizer.drag { background: var(--coral); }
.ll-right-col { display: flex; flex-direction: column; flex: 1; overflow: hidden; min-width: 0; height: 78%; }
.ll-viz-wrap { flex-shrink: 0; background: var(--surface); border-bottom: 1px solid var(--border); position: relative; overflow-x: hidden; overflow-y: auto; }
.ll-perm-area { display: flex; flex-direction: column; align-items: stretch; min-height: 100%; width: 100%; min-width: 0; box-sizing: border-box; }
.ll-ptrs { display: flex; gap: 8px; flex-wrap: wrap; padding: 10px 16px 4px; min-height: 36px; width: 100%; box-sizing: border-box; min-width: 0; }
.ll-ptr-chip { background: var(--surface2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 3px 10px; font-size: 12px; font-family: monospace; box-shadow: var(--shadow-sm); white-space: nowrap; flex-shrink: 0; }
.ll-c-blue { color: var(--blue); } .ll-c-orange { color: var(--orange); } .ll-c-green { color: var(--green); } .ll-c-purple { color: var(--purple); } .ll-c-red { color: var(--red); }
.ll-arr-track { display: flex; align-items: flex-start; flex-wrap: wrap; padding: 10px 16px 8px; min-height: 100px; gap: 8px; width: 100%; box-sizing: border-box; min-width: 0; }
.ll-arr-cell-wrap { display: flex; flex-direction: column; align-items: center; min-width: 0; }
.ll-who { font-size: 10px; color: var(--blue); height: 13px; margin-bottom: 1px; white-space: normal; word-break: break-word; font-weight: 600; text-align: center; max-width: 130px; }
.ll-arr-box { width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; border: 2px solid var(--blue); border-radius: var(--radius-sm); background: var(--node); color: #fff; font-weight: 700; font-size: 15px; box-shadow: var(--shadow-sm); animation: ll-pop .3s ease; }
.ll-box-empty { background: var(--surface2) !important; border: 2px dashed var(--border2) !important; color: var(--muted); box-shadow: none !important; animation: none !important; }
.ll-box-cur { border-color: var(--orange) !important; background: var(--nodeCur) !important; box-shadow: 0 0 0 3px rgba(249,115,22,.25) !important; }
.ll-box-del { border-color: var(--red) !important; background: var(--nodeDel) !important; box-shadow: 0 0 0 3px rgba(239,68,68,.3) !important; animation: ll-del-pulse 1s ease-in-out infinite !important; }
.ll-box-new { border-color: var(--green) !important; background: var(--nodeNew) !important; box-shadow: 0 0 0 3px rgba(34,197,94,.3) !important; }
.ll-box-pending { border-style: dashed; }
.ll-nwrap-pending { margin-left: 6px; }
.ll-arr-idx { font-size: 10px; color: var(--muted); margin-top: 3px; font-family: 'Consolas', monospace; }
.ll-empty-state { display: flex; align-items: center; justify-content: center; width: 100%; min-height: 60px; color: var(--muted); font-size: 13px; font-style: italic; }
.ll-vresizer { height: 5px; cursor: row-resize; background: var(--border); flex-shrink: 0; transition: background .15s; position: relative; z-index: 20; }
.ll-vresizer:hover, .ll-vresizer.drag { background: var(--coral); }
.ll-legend { display: flex; flex-wrap: wrap; gap: 6px 14px; padding: 6px 12px; border-bottom: 1px solid var(--border); flex-shrink: 0; background: var(--surface2); }
.ll-leg { display: flex; align-items: center; gap: 5px; font-size: 11px; color: var(--text2); }
.ll-legdot { width: 11px; height: 11px; border-radius: 3px; flex-shrink: 0; display: inline-block; }
.ll-legdot-existing { background: var(--node); border: 1.5px solid var(--blue); }
.ll-legdot-cur { background: var(--nodeCur); border: 1.5px solid var(--orange); }
.ll-legdot-del { background: var(--nodeDel); border: 1.5px solid var(--red); }
.ll-legdot-new { background: var(--nodeNew); border: 1.5px solid var(--green); }
.ll-table-area { flex-shrink: 0; padding: 8px 14px; border-bottom: 1px solid var(--border); overflow-x: hidden; overflow-y: auto; background: var(--surface); min-width: 0; box-sizing: border-box; }
.ll-table-title { font-size: 10px; color: var(--muted); margin-bottom: 4px; font-style: italic; }
.ll-stack-line { font-family: 'Consolas', monospace; font-size: 12px; line-height: 1.8; }
.ll-frame { font-family: 'Consolas', monospace; font-size: 11.5px; color: var(--text2); padding: 1px 0; white-space: nowrap; }
.ll-frame-cur { color: var(--orange); background: var(--orange-light); border-radius: 4px; padding: 1px 5px; }
.ll-fname { color: var(--text2); }
.ll-now { color: var(--orange); font-size: 10px; margin-left: 6px; }
.ll-badge-wrap { padding: 6px 10px; border-bottom: 1px solid var(--border); flex-shrink: 0; min-height: 36px; display: flex; align-items: center; background: var(--surface); }
.ll-badge { display: inline-block; padding: 4px 12px; border-radius: var(--radius-sm); border-left: 3px solid var(--coral); background: var(--coral-light); font-size: 11px; color: var(--coral-dark); line-height: 1.4; word-break: break-word; font-weight: 500; }
.ll-badge-error { border-left-color: var(--red); background: var(--red-light); color: var(--red-dark); }
.ll-code-panel { display: flex; flex-direction: column; height: 100%; overflow: hidden; }
.ll-code-header { display: flex; align-items: center; gap: 8px; padding: 8px 14px; background: var(--surface); border-bottom: 1px solid var(--border); flex-shrink: 0; box-shadow: var(--shadow-sm); flex-wrap: wrap; }
.ll-tabbar { display: flex; gap: 4px; flex-wrap: wrap; }
.ll-tab-btn { background: var(--surface2); border: 1px solid var(--border2); color: var(--text2); padding: 5px 11px; border-radius: var(--radius-sm); cursor: pointer; font-size: 11px; font-weight: 600; transition: all .15s; white-space: nowrap; }
.ll-tab-btn:hover { border-color: var(--coral); color: var(--coral); }
.ll-tab-btn.active { background: var(--coral); border-color: var(--coral); color: #fff; }
.ll-lang-select { background: var(--surface2); border: 1px solid var(--border2); color: var(--text); padding: 5px 28px 5px 10px; border-radius: var(--radius-sm); font-size: 12px; font-weight: 500; cursor: pointer; min-width: 110px; margin-left: auto; transition: border-color .15s; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2394a3b8'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; }
.ll-lang-select:focus { outline: none; border-color: var(--coral); box-shadow: 0 0 0 3px rgba(240,77,77,.1); }
.ll-code-scroll { flex: 1; overflow: auto; padding: 14px 16px; background: #f8fafc; min-width: 0; }
.ll-pre { font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace; font-size: 12px; line-height: 1.65; white-space: pre-wrap; word-break: break-all; color: var(--text); margin: 0; }
.ll-codeline { display: block; padding: 0 16px; margin: 0 -16px; }
.ll-hl { background: #dcfce7; color: #15803d; border-radius: 3px; border-left: 2px solid var(--green); }
.ll-info-scroll { flex: 1; overflow: auto; padding: 16px 20px; background: var(--surface); color: var(--text2); font-size: 13px; line-height: 1.6; }
.ll-info-scroll h3 { margin: 0 0 10px; color: var(--text); font-size: 15px; font-weight: 700; }
.ll-info-scroll h3:not(:first-child) { margin-top: 18px; }
.ll-info-scroll p { margin: 0 0 10px; }
.ll-info-scroll code { background: var(--surface2); border: 1px solid var(--border); border-radius: 4px; padding: 1px 5px; font-family: 'Consolas', monospace; font-size: 12px; color: var(--coral-dark); }
.ll-complexity-table { width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 12.5px; }
.ll-complexity-table th, .ll-complexity-table td { border: 1px solid var(--border); padding: 8px 10px; text-align: left; }
.ll-complexity-table th { background: var(--surface2); color: var(--text); font-weight: 700; }
.ll-complexity-table td:nth-child(2) { font-family: 'Consolas', monospace; font-weight: 700; color: var(--coral-dark); }
.ll-note { background: var(--orange-light); border-left: 3px solid var(--orange); border-radius: var(--radius-sm); padding: 8px 12px; font-size: 12.5px; color: var(--text2); }
.ll-footer { padding: 4px 16px; font-size: 11px; color: var(--muted); border-top: 1px solid var(--border); background: var(--surface); flex-shrink: 0; display: flex; align-items: center; }
.ll-speed-wrap { display: flex; align-items: center; gap: 5px; margin-left: 16px; }
.ll-speed-wrap input[type=range] { width: 90px; accent-color: var(--coral); }
@media (max-width: 900px) {
  .ll-main { flex-direction: column; }
  .ll-left-col, .ll-right-col { max-width: 100% !important; width: 100% !important; }
  .ll-resizer { display: none; }
  .ll-toolbar { flex-direction: column; align-items: stretch; }
  .ll-nav-controls { margin-left: 0; justify-content: center; }
}
</style>
