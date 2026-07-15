<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, watch } from 'vue';

const ADDR = (i) => (i + 1) * 1000;
const fmt = (a) => (a === null || a === undefined ? 'null' : '@' + a);

defineProps({
  topic: {
    type: String,
    required: true,
  },
  subTopic: {
    type: String,
    default: '',
  }
});

const CODES = {
  java: [
    ['', 'class Node {'], ['', '    int data;'], ['', '    Node next;'], ['', '}'], ['', ''],
    ['', 'class CircularQueue {'], ['c_sethead', '    Node front, rear;'], ['c_sethead', '    int size;'], ['', ''],
    ['c_isempty', '    boolean isEmpty() {'],
    ['c_check', '        if (front == null) {'],
    ['c_true', '            return true;'],
    ['c_check', '        }'],
    ['c_false', '        return false;'],
    ['', '    }'], ['', '}'],
  ],
  c: [
    ['c_sethead', 'struct Node *front = NULL, *rear = NULL;'],
    ['c_sethead', 'int size = 0;'], ['', ''],
    ['c_isempty', 'int isEmpty() {'],
    ['c_check', '    if (front == NULL) {'],
    ['c_true', '        return 1;'],
    ['c_check', '    }'],
    ['c_false', '    return 0;'],
    ['', '}'],
  ],
  cpp: [
    ['c_sethead', 'Node *front = NULL, *rear = NULL;'],
    ['c_sethead', 'int size = 0;'], ['', ''],
    ['c_isempty', 'bool isEmpty() {'],
    ['c_check', '    if (front == NULL) {'],
    ['c_true', '        return true;'],
    ['c_check', '    }'],
    ['c_false', '    return false;'],
    ['', '}'],
  ],
  python: [
    ['', 'class CircularQueue:'], ['c_sethead', '    def __init__(self):'],
    ['c_sethead', '        self.front = None'],
    ['c_sethead', '        self.rear = None'],
    ['c_sethead', '        self.size = 0'], ['', ''],
    ['c_isempty', '    def is_empty(self):'],
    ['c_check', '        if self.front is None:'],
    ['c_true', '            return True'],
    ['c_false', '        return False'],
  ],
  javascript: [
    ['', 'class CircularQueue {'], ['c_sethead', '  constructor() {'],
    ['c_sethead', '    this.front = null;'],
    ['c_sethead', '    this.rear = null;'],
    ['c_sethead', '    this.size = 0;'],
    ['', '  }'], ['', ''],
    ['c_isempty', '  isEmpty() {'],
    ['c_check', '    if (this.front === null) {'],
    ['c_true', '      return true;'],
    ['c_check', '    }'],
    ['c_false', '    return false;'],
    ['', '  }'], ['', '}'],
  ],
};

const PSEUDOCODE = [
  'function isEmpty():',
  '    if front is null:',
  '        return true    // no nodes, no circular link either',
  '    return false',
];

function frame(title, rows) {
  return { title, rows };
}

function buildSteps(values) {
  const steps = [];
  const phaseStarts = { isEmpty: 0 };

  // Values represent the queue front → rear, exactly like Enqueue/Front/Dequeue —
  // the FIRST value entered is the front of the queue, not reversed.
  const nodes = values.map((v, i) => ({ val: v, addr: ADDR(i) }));
  const frontAddr = nodes.length ? nodes[0].addr : null;
  const rearAddr = nodes.length ? nodes[nodes.length - 1].addr : null;
  const size = nodes.length;

  const mainFrame = () => frame('main()', [['size', '' + size], ['front', fmt(frontAddr), true], ['rear', fmt(rearAddr), true]]);

  steps.push({
    nodes: [...nodes], frontAddr, rearAddr, size,
    badge: nodes.length
      ? 'Initial circular queue (front \u2192 rear): ' + nodes.map((n) => n.val).join(', ') + ' \u2014 rear links back to front'
      : 'Queue starts empty', code: 'c_isempty',
    vars: [mainFrame()],
  });

  steps.push({
    nodes: [...nodes], frontAddr, rearAddr, size, curAddr: frontAddr,
    badge: 'call isEmpty() \u2192 check front == null', code: 'c_check',
    vars: [mainFrame(), frame('isEmpty()', [])],
  });

  if (nodes.length === 0) {
    steps.push({
      nodes: [], frontAddr: null, rearAddr: null, size: 0, result: true, done: true,
      badge: 'front == null \u2192 return true \u2192 Queue is Empty', code: 'c_true',
      vars: [mainFrame(), frame('isEmpty()', [['return', 'true']])],
    });
  } else {
    steps.push({
      nodes: [...nodes], frontAddr, rearAddr, size, curAddr: frontAddr, result: false, done: true,
      badge: 'front != null \u2192 return false \u2192 Queue is Not Empty (circular link intact)', code: 'c_false',
      vars: [mainFrame(), frame('isEmpty()', [['return', 'false']])],
    });
  }

  return { steps, phaseStarts };
}

// ── reactive state ──────────────────────────────────────────────
const inpSize = ref(4);
const inpElems = ref('10 20 30 40');
const lang = ref('java');
const speed = ref(650);
const si = ref(0);
const playing = ref(false);
const vizHeight = ref(265);
const tableHeight = ref(60);
const leftWidth = ref(50);
const rightTab = ref('code');

const stepsData = reactive(buildSteps([10, 20, 30, 40]));
const steps = computed(() => stepsData.steps);
const phaseStarts = computed(() => stepsData.phaseStarts);
const s = computed(() => steps.value[Math.max(0, Math.min(si.value, steps.value.length - 1))]);
const codeLines = computed(() => CODES[lang.value] || []);

let playTimer = null;

function applyInput() {
  const n = parseInt(inpSize.value, 10) || 0;
  let arr = String(inpElems.value)
    .split(/[\s,]+/)
    .filter((x) => x !== '')
    .map(Number)
    .filter((x) => !isNaN(x));

  if (n < 0 || (n > 0 && arr.length < n)) {
    alert('Enter a valid size (0 or more) and at least that many elements before visualizing.');
    return;
  }
  arr = arr.slice(0, n);
  inpSize.value = n;
  inpElems.value = arr.join(' ');

  playing.value = false;
  const built = buildSteps(arr);
  stepsData.steps = built.steps;
  stepsData.phaseStarts = built.phaseStarts;
  si.value = 0;
}

function stepBy(d) {
  si.value = Math.max(0, Math.min(steps.value.length - 1, si.value + d));
}

function togglePlay() {
  const next = !playing.value;
  if (next && si.value >= steps.value.length - 1) si.value = 0;
  playing.value = next;
}

function tick() {
  clearTimeout(playTimer);
  if (!playing.value) return;
  if (si.value >= steps.value.length - 1) {
    playing.value = false;
    return;
  }
  playTimer = setTimeout(() => {
    si.value = Math.min(steps.value.length - 1, si.value + 1);
    tick();
  }, 2100 - speed.value);
}

watch(playing, (v) => {
  if (v) tick();
  else clearTimeout(playTimer);
});

function resetAll() {
  playing.value = false;
  si.value = 0;
}

function nodeLabel(n) {
  const labels = [];
  if (n.addr === s.value.frontAddr) labels.push('front \u2192');
  if (n.addr === s.value.rearAddr) labels.push('rear \u2192');
  return labels.join(' ');
}

// ── keyboard shortcuts ──────────────────────────────────────────
function onKeydown(e) {
  const tag = e.target.tagName;
  if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
  if (e.key === 'ArrowRight') stepBy(1);
  if (e.key === 'ArrowLeft') stepBy(-1);
  if (e.key === ' ') {
    e.preventDefault();
    togglePlay();
  }
}

// ── resizers ─────────────────────────────────────────────────────
const mainRef = ref(null);
const leftColRef = ref(null);
const hResizerRef = ref(null);
const vizResizerRef = ref(null);
const tableResizerRef = ref(null);

function initHResizer() {
  const rsz = hResizerRef.value;
  const main = mainRef.value;
  if (!rsz || !main) return;
  let dragging = false, startX = 0, startW = 0;

  const onDown = (e) => {
    dragging = true;
    startX = e.clientX;
    startW = leftColRef.value.offsetWidth;
    rsz.classList.add('drag');
    document.body.style.userSelect = 'none';
  };
  const onMove = (e) => {
    if (!dragging) return;
    const mainW = main.offsetWidth;
    const newW = Math.max(200, Math.min(mainW - 200, startW + e.clientX - startX));
    leftWidth.value = (newW / mainW) * 100;
  };
  const onUp = () => {
    if (!dragging) return;
    dragging = false;
    rsz.classList.remove('drag');
    document.body.style.userSelect = '';
  };
  rsz.addEventListener('mousedown', onDown);
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
  return () => {
    rsz.removeEventListener('mousedown', onDown);
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
  };
}

function initVResizer(elRef, valueRef, minH, maxH) {
  const rsz = elRef.value;
  if (!rsz) return;
  let dragging = false, startY = 0, startH = 0;

  const onDown = (e) => {
    dragging = true;
    startY = e.clientY;
    startH = valueRef.value;
    rsz.classList.add('drag');
    document.body.style.userSelect = 'none';
    e.preventDefault();
  };
  const onMove = (e) => {
    if (!dragging) return;
    valueRef.value = Math.max(minH, Math.min(maxH, startH + (e.clientY - startY)));
  };
  const onUp = () => {
    if (!dragging) return;
    dragging = false;
    rsz.classList.remove('drag');
    document.body.style.userSelect = '';
  };
  rsz.addEventListener('mousedown', onDown);
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
  return () => {
    rsz.removeEventListener('mousedown', onDown);
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
  };
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
  cleanupFns.forEach((fn) => fn && fn());
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
    <!-- TOOLBAR -->
    <div class="ll-toolbar">
      <label>Size</label>
      <input type="number" min="0" v-model="inpSize" class="ll-num-input" />
      <label>Initial queue (front → rear)</label>
      <input
        type="text"
        v-model="inpElems"
        placeholder="Enter numbers separated by spaces, or leave blank"
        class="ll-text-input"
      />
      <button class="ll-viz-btn" @click="applyInput">▶ Visualize</button>

      <div class="ll-nav-controls">
        <button class="ll-nav-btn" title="First step" @click="stepBy(-steps.length)">«</button>
        <button class="ll-nav-btn" @click="stepBy(-1)">‹ Prev</button>
        <button class="ll-play-btn" @click="togglePlay">{{ playing ? '⏸ Pause' : '▶ Play' }}</button>
        <button class="ll-nav-btn" @click="stepBy(1)">Next ›</button>
        <button class="ll-nav-btn" title="Last step" @click="stepBy(steps.length)">»</button>
      </div>
    </div>

    <!-- MAIN -->
    <div class="ll-main" ref="mainRef">
      <div class="ll-left-col" ref="leftColRef" :style="{ width: leftWidth + '%' }">
        <!-- VIZ -->
        <div class="ll-viz-wrap" :style="{ height: vizHeight + 'px' }">
          <div class="ll-perm-area">
            <div class="ll-ptrs">
              <div class="ll-ptr-chip">front = <b class="ll-c-blue">{{ fmt(s.frontAddr) }}</b></div>
              <div class="ll-ptr-chip">rear = <b class="ll-c-purple">{{ fmt(s.rearAddr) }}</b></div>
              <div class="ll-ptr-chip">size = <b class="ll-c-orange">{{ s.size }}</b></div>
              <div v-if="s.result !== undefined" class="ll-ptr-chip">
                isEmpty() = <b :class="s.result ? 'll-c-orange' : 'll-c-green'">{{ s.result }}</b>
              </div>
            </div>

            <div class="ll-stage">
              <template v-for="(n, idx) in s.nodes" :key="n.addr">
                <div class="ll-nwrap">
                  <div class="ll-who">{{ nodeLabel(n) }}</div>
                  <div class="ll-addr">@{{ n.addr }}</div>
                  <div class="ll-node">
                    <div
                      class="ll-box"
                      :class="{ 'll-box-cur': n.addr === s.curAddr }"
                    >
                      <div class="ll-data">{{ n.val }}</div>
                      <div class="ll-ptr">
                        <small>next</small>{{ idx < s.nodes.length - 1 ? fmt(s.nodes[idx + 1].addr) : (s.nodes.length ? '\u21BA' + fmt(s.frontAddr) : 'null') }}
                      </div>
                    </div>
                    <span class="ll-arrow" v-if="idx < s.nodes.length - 1">→</span>
                  </div>
                </div>
              </template>

              <div v-if="!s.nodes.length" class="ll-empty-note">queue is empty — front = rear = null</div>

              <div v-if="s.nodes.length" class="ll-wraparrow">
                &#x27F2; {{ s.nodes.length === 1 ? 'single node points back to itself (self-loop)' : 'rear wraps back to front — circular structure maintained' }}
              </div>
            </div>

            <div v-if="s.result !== undefined" class="ll-result-banner" :class="s.result ? 'll-result-true' : 'll-result-false'">
              {{ s.result ? '✔ Queue is Empty' : '✔ Queue is Not Empty' }}
            </div>
          </div>
        </div>
        <div class="ll-vresizer" ref="vizResizerRef"></div>

        <!-- LEGEND -->
        <div class="ll-legend">
          <span class="ll-leg"><span class="ll-legdot ll-legdot-existing"></span>queue node</span>
          <span class="ll-leg"><span class="ll-legdot ll-legdot-cur"></span>front (being checked)</span>
        </div>

        <!-- VAR FRAMES -->
        <div class="ll-table-area" :style="{ height: tableHeight + 'px' }">
          <div class="ll-table-title">Variable frames — innermost = current</div>
          <div class="ll-stack-line">
            <template v-if="s.vars && s.vars.length">
              <div
                v-for="(f, depth) in s.vars"
                :key="depth"
                class="ll-frame"
                :class="{ 'll-frame-cur': depth === s.vars.length - 1 }"
                :style="{ marginLeft: depth * 14 + 'px' }"
              >
                {{ f.title }}(<span v-for="(r, i) in f.rows" :key="i">
                  <span v-if="i > 0">, </span>
                  <span class="ll-fname">{{ r[0] }}</span>=<span
                    :class="r[2] ? 'll-c-blue' : (depth === s.vars.length - 1 ? 'll-c-orange' : 'll-c-green')"
                    style="font-weight:700"
                  >{{ r[1] }}</span>
                </span>)<span v-if="depth === s.vars.length - 1" class="ll-now"> ◄ current</span>
              </div>
            </template>
            <template v-else>—</template>
          </div>
        </div>
        <div class="ll-vresizer" ref="tableResizerRef"></div>

        <!-- BADGE -->
        <div class="ll-badge-wrap">
          <div class="ll-badge">{{ s.badge }}</div>
        </div>
      </div>

      <div class="ll-resizer" ref="hResizerRef"></div>

      <!-- RIGHT PANEL -->
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
            <pre class="ll-pre"><span
              v-for="(line, i) in codeLines"
              :key="i"
              class="ll-codeline"
              :class="{ 'll-hl': line[0] && line[0] === s.code }"
            >{{ line[1] === '' ? ' ' : line[1] }}
</span></pre>
          </div>

          <div v-else-if="rightTab === 'pseudo'" class="ll-code-scroll">
            <pre class="ll-pre"><span v-for="(line, i) in PSEUDOCODE" :key="i" class="ll-codeline">{{ line }}
</span></pre>
          </div>

          <div v-else class="ll-info-scroll">
            <h3>Algorithm — isEmpty (Circular Queue)</h3>
            <p>
              <code>isEmpty()</code> answers a single question: does the queue currently have any nodes? Because
              a circular linked-list queue still keeps a direct <code>front</code> pointer, the check is exactly
              the same as for a plain linked-list queue: <code>front == null</code> — no traversal, no counting,
              and no need to look at the <code>rear.next \u2192 front</code> circular link at all.
            </p>
            <h3>Time & Space Complexity</h3>
            <table class="ll-complexity-table">
              <thead>
                <tr><th>Case</th><th>Time</th><th>Why</th></tr>
              </thead>
              <tbody>
                <tr><td>Best / Average / Worst</td><td>O(1)</td><td>a single pointer comparison — the size of the queue never matters</td></tr>
                <tr><td>Space</td><td>O(1)</td><td>no extra memory is used</td></tr>
              </tbody>
            </table>
            <h3>Key Observations</h3>
            <ol>
              <li><code>isEmpty()</code> is the guard every other operation should call first: <code>dequeue()</code> and <code>front()</code> both rely on it (directly or via the same <code>front == null</code> check) to detect Queue Underflow before touching any pointers or the circular link.</li>
              <li>Checking <code>front == null</code> is equivalent to checking <code>size == 0</code>, but it doesn't depend on a separate counter being kept in sync — some implementations skip the <code>size</code> field entirely and rely only on <code>front</code>.</li>
              <li>A single-node circular queue (where the node points back to itself) is <b>not</b> empty — only when <code>front</code> itself is <code>null</code> does the queue qualify as empty, and at that point <code>rear</code> must be <code>null</code> too, with no circular link left to maintain.</li>
            </ol>
            <h3>Edge Cases</h3>
            <ol>
              <li><b>Freshly created queue:</b> <code>front</code> and <code>rear</code> both start as <code>null</code>, so <code>isEmpty()</code> returns <code>true</code> immediately.</li>
              <li><b>After dequeuing the last node:</b> once the only remaining node is removed, both <code>front</code> and <code>rear</code> become <code>null</code> again and <code>isEmpty()</code> returns <code>true</code>.</li>
              <li><b>Any non-empty queue:</b> regardless of how many nodes exist and wrap around (one or a thousand), <code>isEmpty()</code> returns <code>false</code> the same way — in O(1).</li>
            </ol>
            <p class="ll-note">
              Note: unlike an array-based circular queue, there is no companion <code>isFull()</code> to pair with
              <code>isEmpty()</code> here — a circular linked-list queue has no fixed capacity, so only the empty
              boundary is ever meaningful.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <div class="ll-footer">
      Step {{ si + 1 }} / {{ steps.length }}
      <span class="ll-speed-wrap">
        Speed
        <input type="range" min="100" max="2000" step="100" v-model.number="speed" />
      </span>
    </div>
  </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ll-root * {
  box-sizing: border-box;
}
.ll-root {
  --coral: #F04D4D;
  --coral-dark: #d93e3e;
  --coral-light: #fff0f0;
  --bg: #f5f6fa;
  --surface: #ffffff;
  --surface2: #f1f4f9;
  --border: #e2e8f0;
  --border2: #cbd5e1;
  --text: #1e293b;
  --text2: #475569;
  --muted: #94a3b8;
  --blue: #3b82f6;
  --blue-light: #eff6ff;
  --green: #22c55e;
  --green-light: #f0fdf4;
  --orange: #f97316;
  --orange-light: #fff7ed;
  --purple: #9333ea;
  --node: #1d4ed8;
  --nodeNew: #15803d;
  --nodeCur: #c2410c;
  --shadow-sm: 0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04);
  --radius: 8px;
  --radius-sm: 6px;

  background: var(--bg);
  color: var(--text);
  font-family: 'Segoe UI', system-ui, sans-serif;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  height: 50vh;
  min-height: 600px;
  overflow: hidden;
  width: 100%;
}

@keyframes ll-pop {
  from { transform: scale(.3); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.slide-wrapper {
  margin-top: -10px;
  margin-left: -30px;
  width: 107%;
  max-height: 100%;
  font-size: 0.8rem;
  font-weight: 400;
}
.slide-body {
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  height: 100%;
}

.navbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  padding: 0 10px;
  background-color: #ffffff;
  position: fixed;
  width: 94.7%;
}
.navbar > img {
  height: 30px;
}
.navbar-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  background-color: #ef5050;
  color: #ffffff;
  width: 80%;
  padding-left: 10px;
  margin-left: -10px;
  border-radius: 5px;
}
.row-main {
  width: 100%;
  height: 90%;
  margin-top: 37px;
  overflow-x: auto;
  overflow-y: auto;
  scrollbar-width: thin;
}

/* TOOLBAR */
.ll-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 16px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  flex-wrap: wrap;
  box-shadow: var(--shadow-sm);
}
.ll-toolbar label {
  font-size: 11px;
  color: var(--muted);
  white-space: nowrap;
  font-weight: 500;
}
.ll-num-input,
.ll-text-input {
  background: var(--surface);
  border: 1px solid var(--border2);
  color: var(--text);
  border-radius: var(--radius-sm);
  padding: 5px 8px;
  font-size: 13px;
  font-family: monospace;
  transition: border-color .15s;
}
.ll-num-input { width: 60px; }
.ll-text-input { width: 200px; padding: 5px 10px; }
.ll-num-input:focus,
.ll-text-input:focus {
  outline: none;
  border-color: var(--coral);
  box-shadow: 0 0 0 3px rgba(240,77,77,.1);
}
.ll-viz-btn {
  background: var(--coral);
  color: #fff;
  border: none;
  padding: 6px 16px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  box-shadow: var(--shadow-sm);
  transition: filter .15s;
}
.ll-viz-btn:hover { filter: brightness(1.08); }

.ll-nav-controls {
  display: flex;
  margin-left: auto;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  flex-wrap: wrap;
}
.ll-nav-btn {
  background: var(--surface2);
  border: 1px solid var(--border2);
  color: var(--text2);
  padding: 5px 11px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all .15s;
  white-space: nowrap;
}
.ll-nav-btn:hover {
  background: var(--surface);
  border-color: var(--coral);
  color: var(--coral);
}
.ll-play-btn {
  background: var(--blue-light);
  border: 1px solid var(--blue);
  color: var(--blue);
  min-width: 72px;
  font-weight: 600;
  padding: 5px 11px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 12px;
  transition: all .15s;
}
.ll-play-btn:hover {
  background: var(--blue);
  color: #fff;
}

/* MAIN LAYOUT */
.ll-main {
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
}
.ll-left-col {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 200px;
  max-width: 72%;
}
.ll-resizer {
  width: 5px;
  cursor: col-resize;
  background: var(--border);
  flex-shrink: 0;
  transition: background .15s;
  position: relative;
  z-index: 20;
}
.ll-resizer:hover,
.ll-resizer.drag {
  background: var(--coral);
}
.ll-right-col {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  min-width: 0;
  height: 78%;
}

/* VIZ AREA */
.ll-viz-wrap {
  flex-shrink: 0;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
}
.ll-perm-area {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 100%;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}
.ll-ptrs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding: 10px 16px 4px;
  min-height: 36px;
}
.ll-ptr-chip {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 3px 10px;
  font-size: 12px;
  font-family: monospace;
  box-shadow: var(--shadow-sm);
}
.ll-c-blue { color: var(--blue); }
.ll-c-orange { color: var(--orange); }
.ll-c-green { color: var(--green); }
.ll-c-purple { color: var(--purple); }

.ll-stage {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 4px 16px 8px;
  min-height: 80px;
  gap: 0;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
}
.ll-empty-note {
  color: var(--muted);
  font-style: italic;
  font-size: 12.5px;
  padding: 12px 4px;
}
.ll-nwrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
}
.ll-addr {
  font-size: 10px;
  color: var(--muted);
  margin-bottom: 2px;
  font-family: 'Consolas', monospace;
}
.ll-who {
  font-size: 10px;
  color: var(--blue);
  height: 13px;
  margin-bottom: 1px;
  white-space: normal;
  word-break: break-word;
  font-weight: 600;
  text-align: center;
  max-width: 110px;
}
.ll-node {
  display: flex;
  align-items: center;
  min-width: 0;
}
.ll-box {
  display: flex;
  border: 2px solid var(--blue);
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--node);
  width: 90px;
  flex-shrink: 1;
  color: #fff;
  animation: ll-pop .3s ease;
  box-shadow: var(--shadow-sm);
}
.ll-box-cur {
  border-color: var(--orange);
  background: var(--nodeCur);
  box-shadow: 0 0 0 3px rgba(249,115,22,.25);
}
.ll-data {
  padding: 7px 12px;
  font-weight: 700;
  font-size: 16px;
}
.ll-ptr {
  padding: 7px 6px;
  background: rgba(0,0,0,.2);
  font-size: 11px;
  color: rgba(255,255,255,.75);
  border-left: 1px solid rgba(255,255,255,.15);
  font-family: 'Consolas', monospace;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.1;
}
.ll-ptr small {
  color: rgba(255,255,255,.5);
  font-size: 9px;
}
.ll-arrow {
  font-size: 20px;
  color: var(--blue);
  padding: 0 4px;
  align-self: center;
  margin-top: 11px;
}
.ll-wraparrow {
  width: calc(100% - 32px);
  margin: 4px 16px 2px;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  color: var(--purple);
  background: #faf5ff;
  border: 1px dashed var(--purple);
  border-radius: var(--radius-sm);
  animation: ll-wrap-pulse 1.8s ease-in-out infinite;
  box-sizing: border-box;
}
@keyframes ll-wrap-pulse {
  0%, 100% { opacity: .55; }
  50% { opacity: 1; }
}
.ll-result-banner {
  width: calc(100% - 32px);
  margin: 4px 16px 8px;
  padding: 7px 12px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  border-radius: var(--radius-sm);
  box-sizing: border-box;
}
.ll-result-true {
  background: var(--orange);
}
.ll-result-false {
  background: var(--green);
}

/* RESIZERS */
.ll-vresizer {
  height: 5px;
  cursor: row-resize;
  background: var(--border);
  flex-shrink: 0;
  transition: background .15s;
  position: relative;
  z-index: 20;
}
.ll-vresizer:hover,
.ll-vresizer.drag {
  background: var(--coral);
}

/* LEGEND */
.ll-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 14px;
  padding: 6px 12px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  background: var(--surface2);
}
.ll-leg {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: var(--text2);
}
.ll-legdot {
  width: 11px;
  height: 11px;
  border-radius: 3px;
  flex-shrink: 0;
  display: inline-block;
}
.ll-legdot-existing {
  background: var(--node);
  border: 1.5px solid var(--blue);
}
.ll-legdot-cur {
  background: var(--nodeCur);
  border: 1.5px solid var(--orange);
}

/* VAR FRAMES */
.ll-table-area {
  flex-shrink: 0;
  padding: 8px 14px;
  border-bottom: 1px solid var(--border);
  overflow-x: hidden;
  overflow-y: auto;
  background: var(--surface);
  min-width: 0;
  box-sizing: border-box;
}
.ll-table-title {
  font-size: 10px;
  color: var(--muted);
  margin-bottom: 4px;
  font-style: italic;
}
.ll-stack-line {
  font-family: 'Consolas', monospace;
  font-size: 12px;
  line-height: 1.8;
}
.ll-frame {
  font-family: 'Consolas', monospace;
  font-size: 11.5px;
  color: var(--text2);
  padding: 1px 0;
  white-space: nowrap;
}
.ll-frame-cur {
  color: var(--orange);
  background: var(--orange-light);
  border-radius: 4px;
  padding: 1px 5px;
}
.ll-fname { color: var(--text2); }
.ll-now {
  color: var(--orange);
  font-size: 10px;
  margin-left: 6px;
}

/* BADGE */
.ll-badge-wrap {
  padding: 6px 10px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  min-height: 36px;
  display: flex;
  align-items: center;
  background: var(--surface);
}
.ll-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: var(--radius-sm);
  border-left: 3px solid var(--coral);
  background: var(--coral-light);
  font-size: 11px;
  color: var(--coral-dark);
  line-height: 1.4;
  word-break: break-word;
  font-weight: 500;
}

/* CODE / INFO PANEL */
.ll-code-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
.ll-code-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  box-shadow: var(--shadow-sm);
  flex-wrap: wrap;
}
.ll-tabbar {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}
.ll-tab-btn {
  background: var(--surface2);
  border: 1px solid var(--border2);
  color: var(--text2);
  padding: 5px 11px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 11px;
  font-weight: 600;
  transition: all .15s;
  white-space: nowrap;
}
.ll-tab-btn:hover {
  border-color: var(--coral);
  color: var(--coral);
}
.ll-tab-btn.active {
  background: var(--coral);
  border-color: var(--coral);
  color: #fff;
}
.ll-lang-select {
  background: var(--surface2);
  border: 1px solid var(--border2);
  color: var(--text);
  padding: 5px 28px 5px 10px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  min-width: 110px;
  margin-left: auto;
  transition: border-color .15s;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2394a3b8'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
}
.ll-lang-select:focus {
  outline: none;
  border-color: var(--coral);
  box-shadow: 0 0 0 3px rgba(240,77,77,.1);
}

.ll-code-scroll {
  flex: 1;
  overflow: auto;
  padding: 14px 16px;
  background: #f8fafc;
  min-width: 0;
}
.ll-pre {
  font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
  font-size: 12px;
  line-height: 1.65;
  white-space: pre-wrap;
  word-break: break-all;
  color: var(--text);
  margin: 0;
}
.ll-codeline {
  display: block;
  padding: 0 16px;
  margin: 0 -16px;
}
.ll-hl {
  background: #dcfce7;
  color: #15803d;
  border-radius: 3px;
  border-left: 2px solid var(--green);
}

.ll-info-scroll {
  flex: 1;
  overflow: auto;
  padding: 16px 20px;
  background: var(--surface);
  color: var(--text2);
  font-size: 13px;
  line-height: 1.6;
}
.ll-info-scroll h3 {
  margin: 0 0 10px;
  color: var(--text);
  font-size: 15px;
  font-weight: 700;
}
.ll-info-scroll h3:not(:first-child) { margin-top: 16px; }
.ll-info-scroll p { margin: 0 0 10px; }
.ll-info-scroll ol { margin: 0 0 10px; padding-left: 20px; }
.ll-info-scroll li { margin-bottom: 6px; }
.ll-info-scroll code {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 1px 5px;
  font-family: 'Consolas', monospace;
  font-size: 12px;
  color: var(--coral-dark);
}
.ll-complexity-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 14px;
  font-size: 12.5px;
}
.ll-complexity-table th,
.ll-complexity-table td {
  border: 1px solid var(--border);
  padding: 8px 10px;
  text-align: left;
}
.ll-complexity-table th {
  background: var(--surface2);
  color: var(--text);
  font-weight: 700;
}
.ll-complexity-table td:nth-child(2) {
  font-family: 'Consolas', monospace;
  font-weight: 700;
  color: var(--coral-dark);
}
.ll-note {
  background: var(--orange-light);
  border-left: 3px solid var(--orange);
  border-radius: var(--radius-sm);
  padding: 8px 12px;
  font-size: 12.5px;
  color: var(--text2);
}

/* FOOTER */
.ll-footer {
  padding: 4px 16px;
  font-size: 11px;
  color: var(--muted);
  border-top: 1px solid var(--border);
  background: var(--surface);
  flex-shrink: 0;
  display: flex;
  align-items: center;
}
.ll-speed-wrap {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: 16px;
}
.ll-speed-wrap input[type=range] {
  width: 90px;
  accent-color: var(--coral);
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .ll-main { flex-direction: column; }
  .ll-left-col, .ll-right-col { max-width: 100% !important; width: 100% !important; }
  .ll-resizer { display: none; }
  .ll-toolbar { flex-direction: column; align-items: stretch; }
  .ll-nav-controls { margin-left: 0; justify-content: center; }
}
</style>