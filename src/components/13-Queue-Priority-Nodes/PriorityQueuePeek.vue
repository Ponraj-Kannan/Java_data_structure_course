<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, watch } from 'vue';

const ADDR = (i) => (i + 1) * 1000;
const fmt = (a) => (a === null || a === undefined ? 'null' : '@' + a);

defineProps({
  topic: { type: String, required: true },
  subTopic: { type: String, default: '' }
});

const CODES = {
  java: [
    ['', 'class Node {'],
    ['', '    int value;'],
    ['', '    int priority;'],
    ['', '    Node next;'], ['', ''],
    ['', '    Node(int value, int priority) {'],
    ['', '        this.value = value;'],
    ['', '        this.priority = priority;'],
    ['', '        this.next = null;'],
    ['', '    }'], ['', '}'], ['', ''],
    ['', 'class PriorityQueue {'],
    ['', '    Node head;'],
    ['', '    int size;'], ['', ''],
    ['c_peek', '    int peek() {'],
    ['c_emptycheck', '        if (head == null) {'],
    ['c_emptycheck', '            return -1;'],
    ['c_emptycheck', '        }'],
    ['c_read', '        Node peekNode = head;'],
    ['c_return', '        return peekNode.value;'],
    ['', '    }'], ['', '}'],
  ],
  c: [
    ['', 'struct Node {'],
    ['', '    int value;'],
    ['', '    int priority;'],
    ['', '    struct Node *next;'],
    ['', '};'], ['', ''],
    ['', 'struct Node *head = NULL;'],
    ['', 'int size = 0;'], ['', ''],
    ['c_peek', 'int peek(void) {'],
    ['c_emptycheck', '    if (head == NULL) {'],
    ['c_emptycheck', '        return -1;'],
    ['c_emptycheck', '    }'],
    ['c_read', '    struct Node *peekNode = head;'],
    ['c_return', '    return peekNode->value;'],
    ['', '}'],
  ],
  cpp: [
    ['', 'struct Node {'],
    ['', '    int value;'],
    ['', '    int priority;'],
    ['', '    Node *next;'],
    ['', '};'], ['', ''],
    ['', 'Node *head = NULL;'],
    ['', 'int size = 0;'], ['', ''],
    ['c_peek', 'int peek() {'],
    ['c_emptycheck', '    if (head == NULL) {'],
    ['c_emptycheck', '        return -1;'],
    ['c_emptycheck', '    }'],
    ['c_read', '    Node *peekNode = head;'],
    ['c_return', '    return peekNode->value;'],
    ['', '}'],
  ],
  python: [
    ['', 'class Node:'],
    ['', '    def __init__(self, value, priority):'],
    ['', '        self.value = value'],
    ['', '        self.priority = priority'],
    ['', '        self.next = None'], ['', ''],
    ['', 'class PriorityQueue:'],
    ['', '    def __init__(self):'],
    ['', '        self.head = None'],
    ['', '        self.size = 0'], ['', ''],
    ['c_peek', '    def peek(self):'],
    ['c_emptycheck', '        if self.head is None:'],
    ['c_emptycheck', '            return None'],
    ['c_read', '        peek_node = self.head'],
    ['c_return', '        return peek_node.value'],
  ],
  javascript: [
    ['', 'class Node {'],
    ['', '  constructor(value, priority) {'],
    ['', '    this.value = value;'],
    ['', '    this.priority = priority;'],
    ['', '    this.next = null;'],
    ['', '  }'], ['', '}'], ['', ''],
    ['', 'class PriorityQueue {'],
    ['', '  constructor() {'],
    ['', '    this.head = null;'],
    ['', '    this.size = 0;'],
    ['', '  }'], ['', ''],
    ['c_peek', '  peek() {'],
    ['c_emptycheck', '    if (this.head === null) {'],
    ['c_emptycheck', '      return null;'],
    ['c_emptycheck', '    }'],
    ['c_read', '    const peekNode = this.head;'],
    ['c_return', '    return peekNode.value;'],
    ['', '  }'], ['', '}'],
  ],
};

const PSEUDOCODE = [
  'function peek():',
  '    if head is null:',
  '        return null',
  '    peekNode = head',
  '    return peekNode.value',
];

function frame(title, rows) { return { title, rows }; }

// Single source of truth for where a node belongs in the priority-ordered list.
// Mirrors the insert() algorithm's head-check/while-loop rules exactly:
//   - returns -1 when the node should become the new head (empty list, or its
//     priority is strictly greater than the current head's priority)
//   - otherwise returns the index of the node it should be inserted directly after
//     (ties keep existing nodes ahead of the new one, i.e. stable/FIFO among equal priorities)
function findInsertIndex(nodes, priority) {
  if (nodes.length === 0 || priority > nodes[0].priority) return -1;
  let idx = 0;
  while (idx + 1 < nodes.length && nodes[idx + 1].priority >= priority) idx++;
  return idx;
}

// Performs a single priority-queue insertion (no animation/steps involved), built on
// findInsertIndex so this uses the exact same ordering rule as the animated insert below.
function insertSorted(nodes, headAddr, node) {
  const idx = findInsertIndex(nodes, node.priority);
  if (idx === -1) {
    return { nodes: [node, ...nodes], headAddr: node.addr };
  }
  const newNodes = [...nodes];
  newNodes.splice(idx + 1, 0, node);
  return { nodes: newNodes, headAddr };
}

// Builds the initial linked list by inserting every parsed "Elements" entry one at a time
// through insertSorted/findInsertIndex - the same priority-queue insertion logic used by
// the insert visualizer - instead of laying nodes out in raw input order.
function buildInitialList(elements) {
  let nodes = [];
  let headAddr = null;
  elements.forEach((el, i) => {
    const node = { val: el.value, priority: el.priority, addr: ADDR(i) };
    const result = insertSorted(nodes, headAddr, node);
    nodes = result.nodes;
    headAddr = result.headAddr;
  });
  return { nodes, headAddr };
}

// Node phases while rendered:
//   'peeking' - the head node being inspected; it stays in the list throughout,
//               since peek() never removes or modifies anything
function buildSteps(elements) {
  const steps = [];
  const phaseStarts = { peek: 0 };

  // The list is (re)built through the exact same priority-queue insertion logic
  // used by the insert visualizer, so peek() always starts from a correctly
  // ordered queue (highest priority at head) rather than raw input order.
  const initial = buildInitialList(elements);
  let nodes = initial.nodes;
  let headAddr = initial.headAddr;
  let size = nodes.length;

  const mainFrame = () => frame('main()', [['size', String(size), true], ['head', fmt(headAddr), true]]);
  const peekFrame = (extra) => frame('peek()', [...(extra || [])]);

  function pushStep(opts) {
    steps.push({
      nodes: [...nodes],
      headAddr, size,
      peekAddr: opts.peekAddr,
      peekVal: opts.peekVal,
      peekPri: opts.peekPri,
      badge: opts.badge,
      code: opts.code,
      vars: opts.vars,
    });
  }

  pushStep({
    badge: 'Initial list \u2014 size ' + size + ' \u2014 peek() called',
    code: 'c_peek',
    vars: [mainFrame()],
  });

  const isEmpty = nodes.length === 0;

  if (isEmpty) {
    pushStep({
      badge: 'head == null \u2192 the queue is empty, nothing to peek at',
      code: 'c_emptycheck',
      vars: [mainFrame(), peekFrame()],
    });

    pushStep({
      badge: 'peek() returns null \u2014 the queue is unchanged',
      code: 'c_emptycheck',
      vars: [mainFrame()],
    });

    return { steps, phaseStarts };
  }

  pushStep({
    badge: 'head != null \u2192 the queue is non-empty, proceed to read the highest-priority node',
    code: 'c_emptycheck',
    vars: [mainFrame(), peekFrame()],
  });

  const headNode = nodes[0];
  pushStep({
    badge: 'peekNode = head \u2192 peekNode = ' + fmt(headNode.addr) + ' (value ' + headNode.val + ', priority ' + headNode.priority + ')',
    code: 'c_read',
    peekAddr: headNode.addr,
    vars: [mainFrame(), peekFrame([['peekNode', fmt(headNode.addr), true]])],
  });

  pushStep({
    badge: 'peek() returns ' + headNode.val + ' \u2014 the node stays in the list, head and size are unchanged',
    code: 'c_return',
    peekAddr: headNode.addr, peekVal: headNode.val, peekPri: headNode.priority,
    vars: [mainFrame(), peekFrame([['peekNode', fmt(headNode.addr), true]])],
  });

  return { steps, phaseStarts };
}

const inpElems = ref('20:5 10:3 15:5');
const lang = ref('java');
const speed = ref(650);
const si = ref(0);
const playing = ref(false);
const vizHeight = ref(265);
const tableHeight = ref(60);
const leftWidth = ref(50);
const rightTab = ref('code');

function parseElements(raw) {
  const s = String(raw).trim();
  if (s === '') return [];
  const tokens = s.split(/[\s,]+/).filter(x => x !== '');
  const out = [];
  for (const t of tokens) {
    const parts = t.split(':');
    if (parts.length !== 2) return null;
    const v = Number(parts[0]);
    const p = Number(parts[1]);
    if (isNaN(v) || isNaN(p)) return null;
    out.push({ value: v, priority: p });
  }
  return out;
}

const initElems = parseElements(inpElems.value) || [];
const stepsData = reactive(buildSteps(initElems));
const steps = computed(() => stepsData.steps);
const phaseStarts = computed(() => stepsData.phaseStarts);
const s = computed(() => steps.value[Math.max(0, Math.min(si.value, steps.value.length - 1))]);
const codeLines = computed(() => CODES[lang.value] || []);

let playTimer = null;

function applyInput() {
  const elems = parseElements(inpElems.value);
  if (elems === null) { alert('Enter elements as value:priority pairs separated by spaces, e.g. 20:5 10:3, or clear the field for an empty list.'); return; }
  inpElems.value = elems.map(e => e.value + ':' + e.priority).join(' ');

  playing.value = false;
  const built = buildSteps(elems);
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

function nodeLabel(n) {
  const labels = [];
  if (n.addr === s.value.headAddr) labels.push('head \u2192');
  if (n.addr === s.value.peekAddr) labels.push('peek \u2192');
  return labels.join(' ');
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
      <label>Elements</label>
      <input type="text" v-model="inpElems" placeholder="e.g. 20:5 10:3 15:5, or leave blank for an empty list" class="ll-text-input" style="width: 220px;"/>
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
              <div class="ll-ptr-chip">head = <b class="ll-c-blue">{{ fmt(s.headAddr) }}</b></div>
              <div v-if="s.peekAddr !== undefined" class="ll-ptr-chip">peekNode = <b class="ll-c-cyan">@{{ s.peekAddr }}</b></div>
              <div class="ll-ptr-chip">size = <b class="ll-c-purple">{{ s.size }}</b></div>
              <div v-if="s.peekVal !== undefined" class="ll-ptr-chip">peeked = <b class="ll-c-cyan">{{ s.peekVal }} (P:{{ s.peekPri }})</b></div>
            </div>

            <div class="ll-stage">
              <template v-for="(n, idx) in s.nodes" :key="n.addr">
                <div class="ll-nwrap">
                  <div class="ll-who" :class="{ 'll-c-cyan': n.addr === s.peekAddr }">{{ nodeLabel(n) }}</div>
                  <div class="ll-addr">@{{ n.addr }}</div>
                  <div class="ll-node">
                    <div
                      class="ll-box"
                      :class="{ 'll-box-peeking': n.addr === s.peekAddr }"
                    >
                      <div class="ll-data">
                        <div class="pq-node-val">{{ n.val }}</div>
                        <div class="pq-node-pri">P:{{ n.priority }}</div>
                      </div>
                      <div class="ll-ptr">
                        <small>next</small>{{ idx < s.nodes.length - 1 ? fmt(s.nodes[idx + 1].addr) : 'null' }}
                      </div>
                    </div>
                    <span class="ll-arrow" v-if="idx < s.nodes.length - 1">&#8594;</span>
                  </div>
                </div>
              </template>

              <div v-if="!s.nodes.length" class="ll-empty-note">queue is empty &mdash; head = null</div>
            </div>
          </div>
        </div>
        <div class="ll-vresizer" ref="vizResizerRef"></div>

        <div class="ll-legend">
          <span class="ll-leg"><span class="ll-legdot ll-legdot-existing"></span>existing node</span>
          <span class="ll-leg"><span class="ll-legdot ll-legdot-peeking"></span>node being peeked (head)</span>
        </div>

        <div class="ll-table-area" :style="{ height: tableHeight + 'px' }">
          <div class="ll-table-title">Variable frames &mdash; innermost = active call</div>
          <div class="ll-stack-line">
            <template v-if="s.vars && s.vars.length">
              <div v-for="(f, depth) in s.vars" :key="depth" class="ll-frame" :class="{ 'll-frame-cur': depth === s.vars.length - 1 }" :style="{ marginLeft: depth * 14 + 'px' }">
                {{ f.title }}(<span v-for="(r, i) in f.rows" :key="i">
                  <span v-if="i > 0">, </span>
                  <span class="ll-fname">{{ r[0] }}</span>=<span :class="r[2] ? 'll-c-blue' : (depth === s.vars.length - 1 ? 'll-c-orange' : 'll-c-green')" style="font-weight:700">{{ r[1] }}</span>
                </span>)<span v-if="depth === s.vars.length - 1" class="ll-now"> &#9668; active</span>
              </div>
            </template>
            <template v-else>&mdash;</template>
          </div>
        </div>
        <div class="ll-vresizer" ref="tableResizerRef"></div>

        <div class="ll-badge-wrap">
          <div class="ll-badge">{{ s.badge }}</div>
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
            <h3>Algorithm</h3>
            <p>The list is always kept sorted in <b>descending priority order</b> (that's what <code>insert()</code> guarantees), so <code>head</code> always already points to the highest-priority node. <code>peek()</code> simply checks whether the queue is empty, then reads and returns <code>head</code>'s value &mdash; nothing about the list is ever modified: <code>head</code> stays the same, <code>size</code> stays the same, and no node is created, moved, or removed.</p>
            <h3>Time &amp; Space Complexity</h3>
            <table class="ll-complexity-table">
              <thead><tr><th>Case</th><th>Time</th><th>Why</th></tr></thead>
              <tbody>
                <tr><td>Empty queue</td><td>O(1)</td><td>a single null check, then return immediately</td></tr>
                <tr><td>Non-empty queue</td><td>O(1)</td><td>the max is always at <code>head</code> &mdash; it's a direct read, no traversal</td></tr>
                <tr><td>Space</td><td>O(1)</td><td>no new memory is allocated and no existing node is touched</td></tr>
              </tbody>
            </table>
            <p class="ll-note">
              Key observation: <code>peek()</code> is the cheapest possible operation on this structure &mdash;
              it's a read-only O(1) lookup with zero side effects, because <code>insert()</code> already did the
              work of keeping the highest-priority element at <code>head</code>.
            </p>
            <h3>Advantages</h3>
            <p>Inspecting the highest-priority element costs nothing beyond a null check and a single field read &mdash; no traversal, no pointer rewiring, and no risk of losing data, since nothing is removed. It's safe to call repeatedly without changing the queue's state.</p>
            <h3>Limitations</h3>
            <p><code>peek()</code> only tells you what the next <code>extractMax()</code> would return &mdash; it can't be used to inspect any other element in the queue, since only <code>head</code> is directly reachable in O(1). Like the other operations, it relies entirely on <code>insert()</code> having kept the list correctly sorted.</p>
            <h3>Queue vs Circular Queue vs Deque vs Priority Queue</h3>
            <p>A <b>Queue</b>'s peek reads the front element in FIFO order. A <b>Circular Queue</b>'s peek reads the same logical front, just at whatever physical index it currently wraps to. A <b>Deque</b> can peek at either end. A <b>Priority Queue</b>'s peek always reads the highest-priority element &mdash; here, that's guaranteed to be <code>head</code>, so it needs no search either.</p>
            <h3>Key Observations</h3>
            <p><code>peek()</code>, <code>insert()</code>, and <code>extractMax()</code> together form the priority queue's full interface: <code>insert()</code> pays O(n) to keep the list sorted; <code>peek()</code> and <code>extractMax()</code> both then get an O(1) shortcut to the maximum because that ordering work was already done. <code>peek()</code> is the strict subset of <code>extractMax()</code> that reads without removing.</p>
            <h3>Edge Cases</h3>
            <p><b>Empty queue:</b> <code>peek()</code> returns <code>null</code> (or a sentinel value) without touching <code>head</code>. <b>Single-node queue:</b> <code>peek()</code> returns that node's value and the queue is left exactly as it was. <b>Repeated calls:</b> since <code>peek()</code> never mutates the queue, calling it any number of times in a row always returns the same value.</p>
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
  --node: #1d4ed8; --cyan: #0891b2; --nodePeek: #0e7490;
  --shadow-sm: 0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04);
  --radius: 8px; --radius-sm: 6px;
  background: var(--bg); color: var(--text);
  font-family: 'Segoe UI', system-ui, sans-serif; font-size: 13px;
  display: flex; flex-direction: column; height: 50vh; min-height: 600px; overflow: hidden; width: 100%;
}
@keyframes ll-pop { from { transform: scale(.3); opacity: 0; } to { transform: scale(1); opacity: 1; } }
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
.ll-c-blue { color: var(--blue); } .ll-c-orange { color: var(--orange); } .ll-c-green { color: var(--green); } .ll-c-purple { color: var(--purple); } .ll-c-cyan { color: var(--cyan); }
.ll-stage { display: flex; align-items: flex-start; flex-wrap: wrap; padding: 4px 16px 8px; min-height: 80px; gap: 0; width: 100%; box-sizing: border-box; min-width: 0; }
.ll-empty-note { color: var(--muted); font-style: italic; font-size: 12.5px; padding: 12px 4px; }
.ll-nwrap { display: flex; flex-direction: column; align-items: center; min-width: 0; }
.ll-addr { font-size: 10px; color: var(--muted); margin-bottom: 2px; font-family: 'Consolas', monospace; }
.ll-who { font-size: 10px; color: var(--blue); height: 13px; margin-bottom: 1px; white-space: normal; word-break: break-word; font-weight: 600; text-align: center; max-width: 130px; }
.ll-node { display: flex; align-items: center; min-width: 0; }
.ll-box { display: flex; border: 2px solid var(--blue); border-radius: var(--radius-sm); overflow: hidden; background: var(--node); width: 100px; flex-shrink: 1; color: #fff; animation: ll-pop .3s ease; box-shadow: var(--shadow-sm); }
.ll-box-peeking { border-color: var(--cyan); background: var(--nodePeek); box-shadow: 0 0 0 3px rgba(8,145,178,.25); }
.ll-data { padding: 6px 10px; font-weight: 700; font-size: 15px; display: flex; flex-direction: column; justify-content: center; line-height: 1.15; }
.pq-node-val { font-size: 15px; font-weight: 700; }
.pq-node-pri { font-size: 10px; font-weight: 600; opacity: .9; margin-top: 2px; }
.ll-ptr { padding: 7px 6px; background: rgba(0,0,0,.2); font-size: 11px; color: rgba(255,255,255,.75); border-left: 1px solid rgba(255,255,255,.15); font-family: 'Consolas', monospace; display: flex; flex-direction: column; justify-content: center; line-height: 1.1; }
.ll-ptr small { color: rgba(255,255,255,.5); font-size: 9px; }
.ll-arrow { font-size: 20px; color: var(--blue); padding: 0 4px; align-self: center; margin-top: 11px; }
.ll-vresizer { height: 5px; cursor: row-resize; background: var(--border); flex-shrink: 0; transition: background .15s; position: relative; z-index: 20; }
.ll-vresizer:hover, .ll-vresizer.drag { background: var(--coral); }
.ll-legend { display: flex; flex-wrap: wrap; gap: 6px 14px; padding: 6px 12px; border-bottom: 1px solid var(--border); flex-shrink: 0; background: var(--surface2); }
.ll-leg { display: flex; align-items: center; gap: 5px; font-size: 11px; color: var(--text2); }
.ll-legdot { width: 11px; height: 11px; border-radius: 3px; flex-shrink: 0; display: inline-block; }
.ll-legdot-existing { background: var(--node); border: 1.5px solid var(--blue); }
.ll-legdot-peeking { background: var(--nodePeek); border: 1.5px solid var(--cyan); }
.ll-table-area { flex-shrink: 0; padding: 8px 14px; border-bottom: 1px solid var(--border); overflow-x: hidden; overflow-y: auto; background: var(--surface); min-width: 0; box-sizing: border-box; }
.ll-table-title { font-size: 10px; color: var(--muted); margin-bottom: 4px; font-style: italic; }
.ll-stack-line { font-family: 'Consolas', monospace; font-size: 12px; line-height: 1.8; }
.ll-frame { font-family: 'Consolas', monospace; font-size: 11.5px; color: var(--text2); padding: 1px 0; white-space: nowrap; }
.ll-frame-cur { color: var(--orange); background: var(--orange-light); border-radius: 4px; padding: 1px 5px; }
.ll-fname { color: var(--text2); }
.ll-now { color: var(--orange); font-size: 10px; margin-left: 6px; }
.ll-badge-wrap { padding: 6px 10px; border-bottom: 1px solid var(--border); flex-shrink: 0; min-height: 36px; display: flex; align-items: center; background: var(--surface); }
.ll-badge { display: inline-block; padding: 4px 12px; border-radius: var(--radius-sm); border-left: 3px solid var(--coral); background: var(--coral-light); font-size: 11px; color: var(--coral-dark); line-height: 1.4; word-break: break-word; font-weight: 500; }
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
.ll-info-scroll h3:not(:first-child) { margin-top: 16px; }
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
