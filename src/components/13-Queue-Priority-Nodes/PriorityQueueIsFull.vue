<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, watch } from 'vue';

const ADDR = (i) => (i + 1) * 1000;
const TEMP_ADDR = 9999;
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
    ['c_isfull', '    boolean isFull() {'],
    ['c_alloc', '        Node temp;'],
    ['c_alloc', '        try {'],
    ['c_alloc', '            temp = new Node(0, 0);'],
    ['c_allocfail', '        } catch (OutOfMemoryError e) {'],
    ['c_allocfail', '            return true;'],
    ['c_allocfail', '        }'],
    ['c_freetemp', '        temp = null;'],
    ['c_returnfalse', '        return false;'],
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
    ['c_isfull', 'int isFull(void) {'],
    ['c_alloc', '    struct Node *temp = (struct Node *) malloc(sizeof(struct Node));'],
    ['c_allocfail', '    if (temp == NULL) {'],
    ['c_allocfail', '        return 1;'],
    ['c_allocfail', '    }'],
    ['c_freetemp', '    free(temp);'],
    ['c_returnfalse', '    return 0;'],
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
    ['c_isfull', 'bool isFull() {'],
    ['c_alloc', '    Node *temp = nullptr;'],
    ['c_alloc', '    try {'],
    ['c_alloc', '        temp = new Node();'],
    ['c_allocfail', '    } catch (std::bad_alloc&) {'],
    ['c_allocfail', '        return true;'],
    ['c_allocfail', '    }'],
    ['c_freetemp', '    delete temp;'],
    ['c_returnfalse', '    return false;'],
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
    ['c_isfull', '    def is_full(self):'],
    ['c_alloc', '        try:'],
    ['c_alloc', '            temp = Node(0, 0)'],
    ['c_allocfail', '        except MemoryError:'],
    ['c_allocfail', '            return True'],
    ['c_freetemp', '        del temp'],
    ['c_returnfalse', '        return False'],
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
    ['c_isfull', '  isFull() {'],
    ['c_alloc', '    let temp;'],
    ['c_alloc', '    try {'],
    ['c_alloc', '      temp = new Node(0, 0);'],
    ['c_allocfail', '    } catch (e) {'],
    ['c_allocfail', '      return true;'],
    ['c_allocfail', '    }'],
    ['c_freetemp', '    temp = null;'],
    ['c_returnfalse', '    return false;'],
    ['', '  }'], ['', '}'],
  ],
};

const PSEUDOCODE = [
  'function isFull():',
  '    temp = allocate new Node()   // attempt a test allocation',
  '    if temp is null:',
  '        return true               // allocation failed -> queue is full',
  '    free(temp)                    // discard the test allocation',
  '    return false                  // allocation succeeded -> queue is not full',
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

// A linked-list priority queue has no fixed backing array, so it has no natural
// "capacity" - isFull() cannot compare size against a limit the way an array-based
// queue would. Instead it simulates the only real constraint the structure has:
// whether the system can still hand out memory for one more node. It performs a
// small test allocation, inspects whether that allocation succeeded, immediately
// releases it again (it was only a probe), and reports the result. memoryAvailable
// is the simulated outcome of that test allocation, supplied by the toolbar control
// since a real "out of memory" condition can't be triggered on demand from here.
//
// temp phases while rendered:
//   'allocating' - the test allocation has been requested but not yet resolved
//   'allocated'  - the allocation succeeded; temp is a real (temporary) node
//   'freed'      - the test node has been released again, queue is untouched
//   'failed'     - the allocation failed; no memory was reserved
function buildSteps(elements, memoryAvailable) {
  const steps = [];
  const phaseStarts = { isFull: 0 };

  // The list is (re)built through the exact same priority-queue insertion logic
  // used by the insert visualizer, so isFull() always starts from a correctly
  // ordered queue rather than raw input order.
  const initial = buildInitialList(elements);
  let nodes = initial.nodes;
  let headAddr = initial.headAddr;
  let size = nodes.length;

  const mainFrame = () => frame('main()', [['size', String(size), true], ['head', fmt(headAddr), true]]);
  const isFullFrame = (extra) => frame('isFull()', [...(extra || [])]);

  function pushStep(opts) {
    steps.push({
      nodes: [...nodes],
      headAddr, size,
      tempAddr: opts.tempAddr,
      tempStatus: opts.tempStatus,
      resultVal: opts.resultVal,
      badge: opts.badge,
      code: opts.code,
      vars: opts.vars,
    });
  }

  pushStep({
    badge: 'Initial list \u2014 size ' + size + ' \u2014 isFull() called',
    code: 'c_isfull',
    vars: [mainFrame()],
  });

  pushStep({
    badge: 'temp = allocate new Node() \u2192 attempting to reserve memory for a test node',
    code: 'c_alloc',
    tempAddr: TEMP_ADDR, tempStatus: 'allocating',
    vars: [mainFrame(), isFullFrame([['temp', 'allocating\u2026', true]])],
  });

  if (memoryAvailable) {
    pushStep({
      badge: 'temp != null \u2192 allocation succeeded, memory is available on the system',
      code: 'c_allocfail',
      tempAddr: TEMP_ADDR, tempStatus: 'allocated',
      vars: [mainFrame(), isFullFrame([['temp', fmt(TEMP_ADDR), true]])],
    });

    pushStep({
      badge: 'temp is freed \u2014 it was only a test allocation, the queue itself is unchanged',
      code: 'c_freetemp',
      tempAddr: TEMP_ADDR, tempStatus: 'freed',
      vars: [mainFrame(), isFullFrame([['temp', 'null', true]])],
    });

    pushStep({
      badge: 'isFull() returns false \u2014 the queue is NOT full, a new node could be allocated',
      code: 'c_returnfalse',
      resultVal: false,
      vars: [mainFrame()],
    });
  } else {
    pushStep({
      badge: 'temp == null \u2192 allocation failed, the system has run out of memory',
      code: 'c_allocfail',
      tempStatus: 'failed',
      vars: [mainFrame(), isFullFrame([['temp', 'null', true]])],
    });

    pushStep({
      badge: 'isFull() returns true \u2014 the queue IS full, no more nodes can be allocated',
      code: 'c_allocfail',
      resultVal: true,
      vars: [mainFrame()],
    });
  }

  return { steps, phaseStarts };
}

const inpElems = ref('20:5 10:3 15:5');
const memoryScenario = ref('available');
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
const stepsData = reactive(buildSteps(initElems, memoryScenario.value === 'available'));
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
  const built = buildSteps(elems, memoryScenario.value === 'available');
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
  return n.addr === s.value.headAddr ? 'head \u2192' : '';
}

function tempStatusText(status) {
  if (status === 'allocating') return 'allocating\u2026';
  if (status === 'allocated') return 'reserved';
  if (status === 'freed') return 'freed';
  if (status === 'failed') return 'OOM \u2014 failed';
  return '';
}

function tempChipValue(step) {
  if (step.tempStatus === 'allocated') return fmt(step.tempAddr);
  if (step.tempStatus === 'allocating') return 'allocating\u2026';
  if (step.tempStatus === 'freed') return 'null (freed)';
  if (step.tempStatus === 'failed') return 'null (failed)';
  return 'null';
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
      <label>Memory</label>
      <select v-model="memoryScenario" class="ll-mem-select">
        <option value="available">Available</option>
        <option value="full">Exhausted (simulate OOM)</option>
      </select>
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
              <div class="ll-ptr-chip">size = <b class="ll-c-purple">{{ s.size }}</b></div>
              <div v-if="s.tempStatus" class="ll-ptr-chip">temp = <b class="ll-c-orange">{{ tempChipValue(s) }}</b></div>
              <div v-if="s.resultVal !== undefined" class="ll-ptr-chip">isFull() = <b :class="s.resultVal ? 'll-c-coral' : 'll-c-green'">{{ s.resultVal }}</b></div>
            </div>

            <div class="ll-stage">
              <template v-for="(n, idx) in s.nodes" :key="n.addr">
                <div class="ll-nwrap">
                  <div class="ll-who">{{ nodeLabel(n) }}</div>
                  <div class="ll-addr">@{{ n.addr }}</div>
                  <div class="ll-node">
                    <div class="ll-box">
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

              <div v-if="s.tempStatus" class="ll-nwrap ll-temp-wrap">
                <div class="ll-who ll-c-orange">test alloc</div>
                <div class="ll-addr">{{ s.tempStatus === 'failed' ? 'no memory reserved' : fmt(s.tempAddr) }}</div>
                <div class="ll-node">
                  <div
                    class="ll-box ll-box-temp"
                    :class="{ 'll-box-temp-freed': s.tempStatus === 'freed', 'll-box-temp-failed': s.tempStatus === 'failed' }"
                  >
                    <div class="ll-data">
                      <div class="pq-node-val">temp</div>
                      <div class="pq-node-pri">{{ tempStatusText(s.tempStatus) }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ll-vresizer" ref="vizResizerRef"></div>

        <div class="ll-legend">
          <span class="ll-leg"><span class="ll-legdot ll-legdot-existing"></span>existing node</span>
          <span class="ll-leg"><span class="ll-legdot ll-legdot-temp"></span>test allocation (reserved / freed)</span>
          <span class="ll-leg"><span class="ll-legdot ll-legdot-failed"></span>allocation failed (out of memory)</span>
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
            <p>A priority queue built on a <b>linked list</b> has no fixed-size backing array, so it has no natural "capacity" the way an array-based queue does &mdash; new nodes can always be inserted, in whatever position the priority ordering puts them, as long as the operating system can still hand out memory. <code>isFull()</code> therefore never compares <code>size</code> against a limit; instead it simulates the only real constraint the list-based queue has: whether a new <code>Node</code> can actually be allocated. It performs a small test allocation, checks whether that allocation succeeded, immediately releases it again (since it was only a probe), and reports the result &mdash; <code>head</code>, <code>size</code>, and the chain of existing nodes are never touched.</p>
            <h3>Time &amp; Space Complexity</h3>
            <table class="ll-complexity-table">
              <thead><tr><th>Case</th><th>Time</th><th>Why</th></tr></thead>
              <tbody>
                <tr><td>Memory available</td><td>O(1)</td><td>a single test allocation, an immediate free, then return &mdash; independent of queue size</td></tr>
                <tr><td>Memory exhausted</td><td>O(1)</td><td>the failed allocation is detected immediately, no traversal needed</td></tr>
                <tr><td>Space</td><td>O(1)</td><td>the probe node is released before <code>isFull()</code> returns, so it never persists</td></tr>
              </tbody>
            </table>
            <p class="ll-note">
              Key observation: <code>isFull()</code> costs the same O(1) regardless of how many elements
              are already queued, because it never looks at the chain &mdash; it only asks the memory
              allocator a single yes/no question.
            </p>
            <h3>Advantages</h3>
            <p>Because growth isn't bounded by a fixed array size, the queue can keep accepting <code>insert()</code> calls far longer than an array-based implementation &mdash; it becomes "full" only when the whole system genuinely runs out of usable memory, an extremely rare, environment-level condition rather than a property of the data structure itself.</p>
            <h3>Limitations</h3>
            <p><code>isFull()</code> can only approximate memory availability at the exact moment it's called &mdash; a test allocation succeeding doesn't guarantee the very next <code>insert()</code> will too, since available memory can change between calls. Repeatedly allocating and freeing a probe node also adds a small (though still O(1)) overhead of its own.</p>
            <h3>Queue vs Circular Queue vs Deque vs Priority Queue</h3>
            <p>An array-based <b>Queue</b> or <b>Circular Queue</b> has a hard <code>isFull()</code> check against a fixed capacity (rear reaching the array bound, or the wrap-around condition). A fixed-array <b>Deque</b> behaves the same way. A linked-list <b>Priority Queue</b> &mdash; like this one &mdash; has no such fixed bound, so its <code>isFull()</code> means something fundamentally different: a memory-availability probe rather than a capacity comparison.</p>
            <h3>Key Observations</h3>
            <p><code>insert()</code> and <code>peek()</code> both reason about the ordered chain of nodes &mdash; <code>head</code>, priorities, pointers. <code>isFull()</code> reasons about none of that: it never reads or writes <code>head</code> or <code>size</code>, and interacts purely with the underlying memory allocator.</p>
            <h3>Edge Cases</h3>
            <p><b>Plenty of memory:</b> the test allocation always succeeds, so <code>isFull()</code> returns <code>false</code> no matter how many elements are already queued. <b>System genuinely out of memory:</b> the test allocation fails, <code>isFull()</code> returns <code>true</code>, and the next real <code>insert()</code> would be expected to fail too. <b>Empty queue:</b> <code>isFull()</code> behaves identically whether the queue is empty or has elements, since it's checking memory, not queue length.</p>
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
.ll-mem-select { background: var(--surface); border: 1px solid var(--border2); color: var(--text); padding: 5px 26px 5px 10px; border-radius: var(--radius-sm); font-size: 12px; font-weight: 500; cursor: pointer; transition: border-color .15s; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2394a3b8'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 9px center; }
.ll-mem-select:focus { outline: none; border-color: var(--coral); box-shadow: 0 0 0 3px rgba(240,77,77,.1); }
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
.ll-c-blue { color: var(--blue); } .ll-c-orange { color: var(--orange); } .ll-c-green { color: var(--green); } .ll-c-purple { color: var(--purple); } .ll-c-cyan { color: var(--cyan); } .ll-c-coral { color: var(--coral-dark); }
.ll-stage { display: flex; align-items: flex-start; flex-wrap: wrap; padding: 4px 16px 8px; min-height: 80px; gap: 0; width: 100%; box-sizing: border-box; min-width: 0; }
.ll-empty-note { color: var(--muted); font-style: italic; font-size: 12.5px; padding: 12px 4px; }
.ll-nwrap { display: flex; flex-direction: column; align-items: center; min-width: 0; }
.ll-temp-wrap { margin-left: 22px; }
.ll-addr { font-size: 10px; color: var(--muted); margin-bottom: 2px; font-family: 'Consolas', monospace; }
.ll-who { font-size: 10px; color: var(--blue); height: 13px; margin-bottom: 1px; white-space: normal; word-break: break-word; font-weight: 600; text-align: center; max-width: 130px; }
.ll-node { display: flex; align-items: center; min-width: 0; }
.ll-box { display: flex; border: 2px solid var(--blue); border-radius: var(--radius-sm); overflow: hidden; background: var(--node); width: 100px; flex-shrink: 1; color: #fff; animation: ll-pop .3s ease; box-shadow: var(--shadow-sm); }
.ll-box-temp { border-color: var(--orange); background: var(--orange); box-shadow: 0 0 0 3px rgba(249,115,22,.25); justify-content: center; }
.ll-box-temp-freed { border-style: dashed; background: var(--muted); box-shadow: none; opacity: .75; }
.ll-box-temp-failed { border-color: var(--coral); background: var(--coral); box-shadow: 0 0 0 3px rgba(240,77,77,.25); }
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
.ll-legdot-temp { background: var(--orange); border: 1.5px solid var(--orange); }
.ll-legdot-failed { background: var(--coral); border: 1.5px solid var(--coral); }
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
