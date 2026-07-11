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
    ['', 'class Node {'], ['', '    int data;'], ['', '    Node prev;'], ['', '    Node next;'],
    ['', '    Node(int data) { this.data = data; this.prev = null; this.next = null; }'], ['', '}'], ['', ''],
    ['', 'class Deque {'],
    ['c_sethead', '    Node front;'],
    ['c_sethead', '    Node rear;'], ['', ''],
    ['c_ins', '    void insertRear(int value) {'],
    ['c_newnode', '        Node newNode = new Node(value);'],
    ['c_setprev', '        newNode.prev = rear;'],
    ['c_setnext', '        newNode.next = null;'],
    ['c_emptycase', '        if (rear == null) {'],
    ['c_emptycase', '            front = newNode;'],
    ['c_emptycase', '            rear = newNode;'],
    ['c_emptycase', '            return;'],
    ['c_emptycase', '        }'],
    ['c_linkrear', '        rear.next = newNode;'],
    ['c_setrear', '        rear = newNode;'],
    ['', '    }'], ['', '}'],
  ],
  c: [
    ['', 'struct Node {'], ['', '    int data;'], ['', '    struct Node *prev;'], ['', '    struct Node *next;'], ['', '};'], ['', ''],
    ['c_sethead', 'struct Node *front = NULL;'],
    ['c_sethead', 'struct Node *rear = NULL;'], ['', ''],
    ['c_ins', 'void insertRear(int value) {'],
    ['c_newnode', '    struct Node *newNode = (struct Node*)malloc(sizeof(struct Node));'],
    ['c_newnode', '    newNode->data = value;'],
    ['c_setprev', '    newNode->prev = rear;'],
    ['c_setnext', '    newNode->next = NULL;'],
    ['c_emptycase', '    if (rear == NULL) {'],
    ['c_emptycase', '        front = newNode;'],
    ['c_emptycase', '        rear = newNode;'],
    ['c_emptycase', '        return;'],
    ['c_emptycase', '    }'],
    ['c_linkrear', '    rear->next = newNode;'],
    ['c_setrear', '    rear = newNode;'],
    ['', '}'],
  ],
  cpp: [
    ['', 'struct Node {'], ['', '    int data;'], ['', '    Node *prev;'], ['', '    Node *next;'],
    ['', '    Node(int val) { data = val; prev = NULL; next = NULL; }'], ['', '};'], ['', ''],
    ['c_sethead', 'Node *front = NULL;'],
    ['c_sethead', 'Node *rear = NULL;'], ['', ''],
    ['c_ins', 'void insertRear(int value) {'],
    ['c_newnode', '    Node *newNode = new Node(value);'],
    ['c_setprev', '    newNode->prev = rear;'],
    ['c_setnext', '    newNode->next = NULL;'],
    ['c_emptycase', '    if (rear == NULL) {'],
    ['c_emptycase', '        front = newNode;'],
    ['c_emptycase', '        rear = newNode;'],
    ['c_emptycase', '        return;'],
    ['c_emptycase', '    }'],
    ['c_linkrear', '    rear->next = newNode;'],
    ['c_setrear', '    rear = newNode;'],
    ['', '}'],
  ],
  python: [
    ['', 'class Node:'],
    ['', '    def __init__(self, data):'],
    ['', '        self.data = data'],
    ['', '        self.prev = None'],
    ['', '        self.next = None'], ['', ''],
    ['', 'class Deque:'],
    ['c_sethead', '    def __init__(self):'],
    ['c_sethead', '        self.front = None'],
    ['c_sethead', '        self.rear = None'], ['', ''],
    ['c_ins', '    def insert_rear(self, value):'],
    ['c_newnode', '        new_node = Node(value)'],
    ['c_setprev', '        new_node.prev = self.rear'],
    ['c_setnext', '        new_node.next = None'],
    ['c_emptycase', '        if self.rear is None:'],
    ['c_emptycase', '            self.front = new_node'],
    ['c_emptycase', '            self.rear = new_node'],
    ['c_emptycase', '            return'],
    ['c_linkrear', '        self.rear.next = new_node'],
    ['c_setrear', '        self.rear = new_node'],
  ],
  javascript: [
    ['', 'class Node {'],
    ['', '  constructor(data) { this.data = data; this.prev = null; this.next = null; }'],
    ['', '}'], ['', ''],
    ['', 'class Deque {'],
    ['c_sethead', '  constructor() { this.front = null; this.rear = null; }'], ['', ''],
    ['c_ins', '  insertRear(value) {'],
    ['c_newnode', '    const newNode = new Node(value);'],
    ['c_setprev', '    newNode.prev = this.rear;'],
    ['c_setnext', '    newNode.next = null;'],
    ['c_emptycase', '    if (this.rear === null) {'],
    ['c_emptycase', '      this.front = newNode;'],
    ['c_emptycase', '      this.rear = newNode;'],
    ['c_emptycase', '      return;'],
    ['c_emptycase', '    }'],
    ['c_linkrear', '    this.rear.next = newNode;'],
    ['c_setrear', '    this.rear = newNode;'],
    ['', '  }'], ['', '}'],
  ],
};

const PSEUDOCODE = [
  'function insertRear(value):',
  '    newNode = new Node(value)',
  '    newNode.prev = rear',
  '    newNode.next = null',
  '    if rear is null:',
  '        front = newNode',
  '        rear = newNode',
  '        return',
  '    rear.next = newNode',
  '    rear = newNode',
];

function frame(title, rows) { return { title, rows }; }

function buildSteps(values, insertValue) {
  const steps = [];
  const phaseStarts = { insert: 0 };

  const nodes0 = values.map((v, i) => ({ val: v, addr: ADDR(i) }));
  const n = nodes0.length;
  const frontAddr0 = n > 0 ? nodes0[0].addr : null;
  const rearAddr0 = n > 0 ? nodes0[n - 1].addr : null;
  const newAddr = (nodes0.length ? Math.max(...nodes0.map(nd => nd.addr)) : 0) + 500;
  const fnLabel = 'insertRear(' + insertValue + ')';

  steps.push({
    nodes: [...nodes0], frontAddr: frontAddr0, rearAddr: rearAddr0,
    badge: 'Initial deque with ' + n + ' node(s) \u2014 ' + fnLabel + ' called',
    code: 'c_ins',
    vars: [frame('main()', [['front', fmt(frontAddr0), true], ['rear', fmt(rearAddr0), true]])],
  });

  steps.push({
    nodes: [...nodes0], frontAddr: frontAddr0, rearAddr: rearAddr0,
    badge: 'Create newNode(' + insertValue + ') @' + newAddr,
    code: 'c_newnode',
    newAddr, newVal: insertValue,
    vars: [frame('main()', [['front', fmt(frontAddr0), true], ['rear', fmt(rearAddr0), true]]), frame(fnLabel, [['newNode', fmt(newAddr), true]])],
  });

  steps.push({
    nodes: [...nodes0], frontAddr: frontAddr0, rearAddr: rearAddr0,
    badge: 'newNode.prev = rear \u2192 newNode points backward to ' + fmt(rearAddr0),
    code: 'c_setprev',
    newAddr, newVal: insertValue,
    vars: [frame('main()', [['front', fmt(frontAddr0), true], ['rear', fmt(rearAddr0), true]]), frame(fnLabel, [['newNode', fmt(newAddr), true]])],
  });

  steps.push({
    nodes: [...nodes0], frontAddr: frontAddr0, rearAddr: rearAddr0,
    badge: 'newNode.next = null \u2192 newNode will become the new rear (nothing after it)',
    code: 'c_setnext',
    newAddr, newVal: insertValue,
    vars: [frame('main()', [['front', fmt(frontAddr0), true], ['rear', fmt(rearAddr0), true]]), frame(fnLabel, [['newNode', fmt(newAddr), true]])],
  });

  if (n === 0) {
    steps.push({
      nodes: [...nodes0], frontAddr: frontAddr0, rearAddr: rearAddr0,
      badge: 'rear == null \u2192 the deque is currently empty',
      code: 'c_emptycase',
      newAddr, newVal: insertValue,
      vars: [frame('main()', [['front', 'null', true], ['rear', 'null', true]]), frame(fnLabel, [['newNode', fmt(newAddr), true]])],
    });
    const newNode = { val: insertValue, addr: newAddr };
    steps.push({
      nodes: [newNode], frontAddr: newAddr, rearAddr: newAddr,
      badge: 'front = newNode; rear = newNode \u2192 newNode @' + newAddr + ' is the only node (front and rear both point to it)',
      code: 'c_emptycase',
      vars: [frame('main()', [['front', fmt(newAddr), true], ['rear', fmt(newAddr), true]])],
    });
    steps.push({
      nodes: [newNode], frontAddr: newAddr, rearAddr: newAddr,
      badge: fnLabel + ' complete \u2014 deque now has 1 node',
      code: 'c_ins',
      vars: [frame('main()', [['front', fmt(newAddr), true], ['rear', fmt(newAddr), true]])],
    });
    return { steps, phaseStarts };
  }

  steps.push({
    nodes: [...nodes0], frontAddr: frontAddr0, rearAddr: rearAddr0,
    badge: 'rear != null \u2192 deque is not empty, link the current rear forward to newNode',
    code: 'c_linkrear',
    curAddr: rearAddr0,
    newAddr, newVal: insertValue,
    vars: [frame('main()', [['front', fmt(frontAddr0), true], ['rear', fmt(rearAddr0), true]]), frame(fnLabel, [['newNode', fmt(newAddr), true]])],
  });

  steps.push({
    nodes: [...nodes0], frontAddr: frontAddr0, rearAddr: rearAddr0,
    badge: 'rear.next = newNode \u2192 @' + rearAddr0 + '.next now points forward to newNode @' + newAddr,
    code: 'c_linkrear',
    curAddr: rearAddr0,
    newAddr, newVal: insertValue,
    vars: [frame('main()', [['front', fmt(frontAddr0), true], ['rear', fmt(rearAddr0), true]]), frame(fnLabel, [['newNode', fmt(newAddr), true]])],
  });

  const newNode = { val: insertValue, addr: newAddr };
  const finalNodes = [...nodes0, newNode];
  steps.push({
    nodes: finalNodes, frontAddr: frontAddr0, rearAddr: newAddr,
    badge: 'rear = newNode \u2192 newNode @' + newAddr + ' is now the rear, deque has ' + (n + 1) + ' node(s)',
    code: 'c_setrear',
    newAddr,
    vars: [frame('main()', [['front', fmt(frontAddr0), true], ['rear', fmt(newAddr), true]])],
  });

  steps.push({
    nodes: finalNodes, frontAddr: frontAddr0, rearAddr: newAddr,
    badge: fnLabel + ' complete \u2014 deque now has ' + (n + 1) + ' node(s)',
    code: 'c_ins',
    vars: [frame('main()', [['front', fmt(frontAddr0), true], ['rear', fmt(newAddr), true]])],
  });

  return { steps, phaseStarts };
}

const inpSize = ref(3);
const inpElems = ref('10 20 30');
const inpValue = ref(5);
const lang = ref('java');
const speed = ref(650);
const si = ref(0);
const playing = ref(false);
const vizHeight = ref(265);
const tableHeight = ref(60);
const leftWidth = ref(50);
const rightTab = ref('code');

const stepsData = reactive(buildSteps([10, 20, 30], 5));
const steps = computed(() => stepsData.steps);
const phaseStarts = computed(() => stepsData.phaseStarts);
const s = computed(() => steps.value[Math.max(0, Math.min(si.value, steps.value.length - 1))]);
const codeLines = computed(() => CODES[lang.value] || []);

let playTimer = null;

function applyInput() {
  const raw = String(inpElems.value).trim();
  let arr = raw === '' ? [] : raw.split(/[\s,]+/).filter(x => x !== '').map(Number).filter(n => !isNaN(n));
  if (raw !== '' && !arr.length) { alert('Enter valid numbers separated by spaces, or clear the field for an empty deque.'); return; }
  const sz = parseInt(inpSize.value, 10);
  if (!isNaN(sz) && sz >= 0 && sz < arr.length) arr = arr.slice(0, sz);
  inpSize.value = arr.length;
  inpElems.value = arr.join(' ');

  const val = parseInt(inpValue.value, 10);
  if (isNaN(val)) { alert('Enter a valid number to insert.'); return; }

  playing.value = false;
  const built = buildSteps(arr, val);
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
  if (n.addr === s.value.frontAddr) labels.push('front \u2192');
  if (n.addr === s.value.rearAddr) labels.push('rear \u2192');
  if (n.addr === s.value.newAddr && n.addr !== s.value.frontAddr && n.addr !== s.value.rearAddr) labels.push('new \u2192');
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
      <label>Size</label>
      <input type="number" min="0" v-model="inpSize" class="ll-num-input" />
      <label>Elements </label>
      <input type="text" v-model="inpElems" placeholder="Enter numbers, or leave blank for empty deque" style="width: 180px;" class="ll-text-input" />
      <label>Value</label>
      <input type="number" v-model="inpValue" class="ll-num-input" />
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
              <div class="ll-ptr-chip">front = <b class="ll-c-blue">{{ fmt(s.frontAddr) }}</b></div>
              <div class="ll-ptr-chip">rear = <b class="ll-c-purple">{{ fmt(s.rearAddr) }}</b></div>
              <div v-if="s.newAddr !== undefined" class="ll-ptr-chip">
                new = <b class="ll-c-green">{{ fmt(s.newAddr) }}</b>
              </div>
            </div>

            <div class="ll-stage">
              <template v-for="(n, idx) in s.nodes" :key="n.addr">
                <div class="ll-nwrap">
                  <div class="ll-who" :class="{ 'll-c-green': n.addr === s.newAddr }">{{ nodeLabel(n) }}</div>
                  <div class="ll-addr">@{{ n.addr }}</div>
                  <div class="ll-node">
                    <div
                      class="ll-box ll-box-deque"
                      :class="{
                        'll-box-new': n.addr === s.newAddr,
                        'll-box-cur': n.addr === s.curAddr && n.addr !== s.newAddr
                      }"
                    >
                      <div class="ll-ptr ll-ptr-left"><small>prev</small>{{ idx > 0 ? fmt(s.nodes[idx - 1].addr) : 'null' }}</div>
                      <div class="ll-data">{{ n.val }}</div>
                      <div class="ll-ptr"><small>next</small>{{ idx < s.nodes.length - 1 ? fmt(s.nodes[idx + 1].addr) : 'null' }}</div>
                    </div>
                    <span class="ll-arrow" v-if="idx < s.nodes.length - 1">&#8644;</span>
                  </div>
                </div>
              </template>

              <div v-if="s.newAddr !== undefined && !s.nodes.some(nd => nd.addr === s.newAddr)" class="ll-nwrap ll-nwrap-pending">
                <div class="ll-who ll-c-green">newNode &rarr;</div>
                <div class="ll-addr">@{{ s.newAddr }}</div>
                <div class="ll-node">
                  <div class="ll-box ll-box-deque ll-box-new ll-box-pending">
                    <div class="ll-ptr ll-ptr-left"><small>prev</small>{{ s.code === 'c_newnode' ? '?' : fmt(s.rearAddr) }}</div>
                    <div class="ll-data">{{ s.newVal }}</div>
                    <div class="ll-ptr"><small>next</small>{{ (s.code === 'c_newnode' || s.code === 'c_setprev') ? '?' : 'null' }}</div>
                  </div>
                </div>
              </div>

              <div v-if="s.nodes.length === 0 && s.newAddr === undefined" class="ll-empty-state">
                Deque is empty
              </div>
            </div>
          </div>
        </div>
        <div class="ll-vresizer" ref="vizResizerRef"></div>

        <div class="ll-legend">
          <span class="ll-leg"><span class="ll-legdot ll-legdot-existing"></span>existing node</span>
          <span class="ll-leg"><span class="ll-legdot ll-legdot-new"></span>newly inserted node</span>
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
                <tr><td>Empty deque</td><td>O(1)</td><td>just set front and rear to the new node</td></tr>
                <tr><td>Non-empty deque</td><td>O(1)</td><td>the <code>rear</code> pointer gives direct access &mdash; no traversal is ever needed</td></tr>
                <tr><td>Space</td><td>O(1)</td><td>only one new node is allocated</td></tr>
              </tbody>
            </table>
            <p class="ll-note">
              Key observation: because the deque is built on a <b>doubly linked list</b> with both a
              <code>front</code> and a <code>rear</code> pointer, and every node stores both
              <code>prev</code> and <code>next</code>, inserting at either end never requires walking
              the list. This is what makes a linked-list deque support <b>O(1)</b> insertion and deletion
              at <b>both</b> ends &mdash; unlike a singly linked list, where operating on the front is easy
              but reaching the rear (without a dedicated <code>rear</code> pointer) would require an O(n)
              traversal to find the last node.
            </p>
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
.ll-stage { display: flex; align-items: flex-start; flex-wrap: wrap; padding: 4px 16px 8px; min-height: 80px; gap: 6px 6px; width: 100%; box-sizing: border-box; min-width: 0; }
.ll-nwrap { display: flex; flex-direction: column; align-items: center; min-width: 0; }
.ll-addr { font-size: 10px; color: var(--muted); margin-bottom: 2px; font-family: 'Consolas', monospace; }
.ll-who { font-size: 10px; color: var(--blue); height: 13px; margin-bottom: 1px; white-space: normal; word-break: break-word; font-weight: 600; text-align: center; max-width: 130px; }
.ll-node { display: flex; align-items: center; min-width: 0; }
.ll-box { display: flex; border: 2px solid var(--blue); border-radius: var(--radius-sm); overflow: hidden; background: var(--node); width: 90px; flex-shrink: 1; color: #fff; animation: ll-pop .3s ease; box-shadow: var(--shadow-sm); }
.ll-box-deque { width: 132px; }
.ll-box-cur { border-color: var(--orange); background: var(--nodeCur); box-shadow: 0 0 0 3px rgba(249,115,22,.25); }
.ll-box-del { border-color: var(--red) !important; background: var(--nodeDel) !important; box-shadow: 0 0 0 3px rgba(239,68,68,.3) !important; animation: ll-del-pulse 1s ease-in-out infinite !important; }
.ll-box-new { border-color: var(--green) !important; background: var(--nodeNew) !important; box-shadow: 0 0 0 3px rgba(34,197,94,.3) !important; }
.ll-nwrap-pending { margin-left: 22px; }
.ll-box-pending { border-style: dashed; }
.ll-data { padding: 7px 10px; font-weight: 700; font-size: 15px; flex: 1; text-align: center; }
.ll-ptr { padding: 6px 5px; background: rgba(0,0,0,.2); font-size: 10px; color: rgba(255,255,255,.75); border-left: 1px solid rgba(255,255,255,.15); font-family: 'Consolas', monospace; display: flex; flex-direction: column; justify-content: center; line-height: 1.1; text-align: center; }
.ll-ptr-left { border-left: none; border-right: 1px solid rgba(255,255,255,.15); }
.ll-ptr small { color: rgba(255,255,255,.5); font-size: 9px; }
.ll-arrow { font-size: 18px; color: var(--blue); padding: 0 8px; align-self: center; margin-top: 11px; }
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
