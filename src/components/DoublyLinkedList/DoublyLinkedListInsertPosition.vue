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
    ['', 'class Node {'],
    ['c_nodeNew', '    int data;'],
    ['c_nodeNew', '    Node prev, next;'],
    ['c_nodeNew', '    Node(int d) { data=d; prev=next=null; }'],
    ['', '}'],
    ['', 'class DLL {'],
    ['c_sethead', '    Node head = null;'],
    ['', ''],
    ['c_build', '    void buildList(int[] arr) {'],
    ['c_build', '        for (int v : arr) insertEnd(v);'],
    ['c_build', '    }'],
    ['', ''],
    ['c_insert', '    void insertAt(int data, int pos) {'],
    ['c_nodeNew', '        Node newNode = new Node(data);'],
    ['c_sethead', '        if (pos == 1) {'],
    ['c_sethead', '            newNode.next = head;'],
    ['c_sethead', '            if (head != null) head.prev = newNode;'],
    ['c_sethead', '            head = newNode;'],
    ['c_sethead', '            return;'],
    ['c_sethead', '        }'],
    ['c_walk', '        Node temp = head;'],
    ['c_walk', '        int i = 1;'],
    ['c_walk', '        while (temp != null && i < pos - 1) {'],
    ['c_walk', '            temp = temp.next;'],
    ['c_walk', '            i++;'],
    ['c_walk', '        }'],
    ['c_setnewlinks', '        if (temp == null) return;'],
    ['c_setnewlinks', '        newNode.next = temp.next;'],
    ['c_setnewlinks', '        newNode.prev = temp;'],
    ['c_rewire', '        if (temp.next != null)'],
    ['c_rewire', '            temp.next.prev = newNode;'],
    ['c_rewire', '        temp.next = newNode;'],
    ['', '    }'],
    ['', ''],
    ['c_display', '    void display() {'],
    ['c_display', '        Node t = head;'],
    ['c_display', '        while (t != null) {'],
    ['c_display', '            System.out.print(t.data + " ");'],
    ['c_display', '            t = t.next;'],
    ['c_display', '        }'],
    ['', '    }'],
    ['', ''],
    ['c_main', '    public static void main(String[] a) {'],
    ['c_main', '        DLL list = new DLL();'],
    ['c_main', '        java.util.Scanner sc = new java.util.Scanner(System.in);'],
    ['c_main', '        int size = sc.nextInt();'],
    ['c_main', '        int[] arr = new int[size];'],
    ['c_main', '        for (int i = 0; i < size; i++) arr[i] = sc.nextInt();'],
    ['c_build', '        list.buildList(arr);'],
    ['c_main', '        int val = sc.nextInt();'],
    ['c_main', '        int pos = sc.nextInt();'],
    ['c_insert', '        list.insertAt(val, pos);'],
    ['c_display', '        list.display();'],
    ['c_main', '    }'],
    ['', '}'],
  ],
  c: [
    ['', '#include <stdio.h>'],
    ['', '#include <stdlib.h>'],
    ['', ''],
    ['', 'struct Node {'],
    ['c_nodeNew', '    int data;'],
    ['c_nodeNew', '    struct Node *prev, *next;'],
    ['', '};'],
    ['', ''],
    ['c_sethead', 'struct Node *head = NULL;'],
    ['', ''],
    ['c_build', 'void insertEnd(int d) {'],
    ['c_build', '    struct Node *n = malloc(sizeof(struct Node));'],
    ['c_build', '    n->data = d;'],
    ['c_build', '    n->prev = NULL; n->next = NULL;'],
    ['c_build', '    if (!head) { head = n; return; }'],
    ['c_build', '    struct Node *t = head;'],
    ['c_build', '    while (t->next) t = t->next;'],
    ['c_build', '    t->next = n; n->prev = t;'],
    ['}', ''],
    ['', ''],
    ['c_insert', 'void insertAt(int data, int pos) {'],
    ['c_nodeNew', '    struct Node *n = malloc(sizeof(struct Node));'],
    ['c_nodeNew', '    n->data = data;'],
    ['c_nodeNew', '    n->prev = NULL; n->next = NULL;'],
    ['c_sethead', '    if (pos == 1) {'],
    ['c_sethead', '        n->next = head;'],
    ['c_sethead', '        if (head) head->prev = n;'],
    ['c_sethead', '        head = n; return;'],
    ['c_sethead', '    }'],
    ['c_walk', '    struct Node *t = head;'],
    ['c_walk', '    int i = 1;'],
    ['c_walk', '    while (t && i < pos - 1) {'],
    ['c_walk', '        t = t->next; i++;'],
    ['c_walk', '    }'],
    ['c_setnewlinks', '    if (!t) return;'],
    ['c_setnewlinks', '    n->next = t->next;'],
    ['c_setnewlinks', '    n->prev = t;'],
    ['c_rewire', '    if (t->next) t->next->prev = n;'],
    ['c_rewire', '    t->next = n;'],
    ['}', ''],
    ['', ''],
    ['c_display', 'void display() {'],
    ['c_display', '    struct Node *t = head;'],
    ['c_display', '    while (t) {'],
    ['c_display', '        printf("%d ", t->data);'],
    ['c_display', '        t = t->next;'],
    ['c_display', '    }'],
    ['}', ''],
    ['', ''],
    ['c_main', 'int main() {'],
    ['c_main', '    int sz, v, pos;'],
    ['c_main', '    scanf("%d", &sz);'],
    ['c_build', '    for (int i = 0; i < sz; i++) {'],
    ['c_build', '        scanf("%d", &v);'],
    ['c_build', '        insertEnd(v);'],
    ['c_build', '    }'],
    ['c_main', '    scanf("%d %d", &v, &pos);'],
    ['c_insert', '    insertAt(v, pos);'],
    ['c_display', '    display();'],
    ['c_main', '    return 0;'],
    ['}', ''],
  ],
  cpp: [
    ['', '#include <iostream>'],
    ['', 'using namespace std;'],
    ['', ''],
    ['', 'struct Node {'],
    ['c_nodeNew', '    int data;'],
    ['c_nodeNew', '    Node *prev, *next;'],
    ['', '};'],
    ['', ''],
    ['c_sethead', 'Node *head = nullptr;'],
    ['', ''],
    ['c_build', 'void insertEnd(int d) {'],
    ['c_build', '    Node *n = new Node();'],
    ['c_build', '    n->data = d;'],
    ['c_build', '    n->prev = nullptr; n->next = nullptr;'],
    ['c_build', '    if (!head) { head = n; return; }'],
    ['c_build', '    Node *t = head;'],
    ['c_build', '    while (t->next) t = t->next;'],
    ['c_build', '    t->next = n; n->prev = t;'],
    ['}', ''],
    ['', ''],
    ['c_insert', 'void insertAt(int data, int pos) {'],
    ['c_nodeNew', '    Node *n = new Node();'],
    ['c_nodeNew', '    n->data = data;'],
    ['c_nodeNew', '    n->prev = nullptr; n->next = nullptr;'],
    ['c_sethead', '    if (pos == 1) {'],
    ['c_sethead', '        n->next = head;'],
    ['c_sethead', '        if (head) head->prev = n;'],
    ['c_sethead', '        head = n; return;'],
    ['c_sethead', '    }'],
    ['c_walk', '    Node *t = head;'],
    ['c_walk', '    int i = 1;'],
    ['c_walk', '    while (t && i < pos - 1) {'],
    ['c_walk', '        t = t->next; i++;'],
    ['c_walk', '    }'],
    ['c_setnewlinks', '    if (!t) return;'],
    ['c_setnewlinks', '    n->next = t->next;'],
    ['c_setnewlinks', '    n->prev = t;'],
    ['c_rewire', '    if (t->next) t->next->prev = n;'],
    ['c_rewire', '    t->next = n;'],
    ['}', ''],
    ['', ''],
    ['c_display', 'void display() {'],
    ['c_display', '    Node *t = head;'],
    ['c_display', '    while (t) {'],
    ['c_display', '        cout << t->data << " ";'],
    ['c_display', '        t = t->next;'],
    ['c_display', '    }'],
    ['}', ''],
    ['', ''],
    ['c_main', 'int main() {'],
    ['c_main', '    int sz, v, pos;'],
    ['c_main', '    cin >> sz;'],
    ['c_build', '    for (int i = 0; i < sz; i++) {'],
    ['c_build', '        cin >> v;'],
    ['c_build', '        insertEnd(v);'],
    ['c_build', '    }'],
    ['c_main', '    cin >> v >> pos;'],
    ['c_insert', '    insertAt(v, pos);'],
    ['c_display', '    display();'],
    ['c_main', '    return 0;'],
    ['}', ''],
  ],
  python: [
    ['', 'class Node:'],
    ['c_nodeNew', '    def __init__(self, d):'],
    ['c_nodeNew', '        self.data = d'],
    ['c_nodeNew', '        self.prev = None'],
    ['c_nodeNew', '        self.next = None'],
    ['', ''],
    ['', 'class DLL:'],
    ['c_sethead', '    def __init__(self):'],
    ['c_sethead', '        self.head = None'],
    ['', ''],
    ['c_build', '    def insert_end(self, d):'],
    ['c_build', '        n = Node(d)'],
    ['c_build', '        if not self.head:'],
    ['c_build', '            self.head = n'],
    ['c_build', '            return'],
    ['c_build', '        t = self.head'],
    ['c_build', '        while t.next:'],
    ['c_build', '            t = t.next'],
    ['c_build', '        t.next = n'],
    ['c_build', '        n.prev = t'],
    ['', ''],
    ['c_insert', '    def insert_at(self, data, pos):'],
    ['c_nodeNew', '        n = Node(data)'],
    ['c_sethead', '        if pos == 1:'],
    ['c_sethead', '            n.next = self.head'],
    ['c_sethead', '            if self.head:'],
    ['c_sethead', '                self.head.prev = n'],
    ['c_sethead', '            self.head = n'],
    ['c_sethead', '            return'],
    ['c_walk', '        temp = self.head'],
    ['c_walk', '        i = 1'],
    ['c_walk', '        while temp and i < pos - 1:'],
    ['c_walk', '            temp = temp.next'],
    ['c_walk', '            i += 1'],
    ['c_setnewlinks', '        if not temp: return'],
    ['c_setnewlinks', '        n.next = temp.next'],
    ['c_setnewlinks', '        n.prev = temp'],
    ['c_rewire', '        if temp.next:'],
    ['c_rewire', '            temp.next.prev = n'],
    ['c_rewire', '        temp.next = n'],
    ['', ''],
    ['c_display', '    def display(self):'],
    ['c_display', '        t = self.head'],
    ['c_display', '        while t:'],
    ['c_display', '            print(t.data, end=" ")'],
    ['c_display', '            t = t.next'],
    ['', ''],
    ['c_main', 'lst = DLL()'],
    ['c_main', 'sz = int(input())'],
    ['c_build', 'for _ in range(sz):'],
    ['c_build', '    lst.insert_end(int(input()))'],
    ['c_main', 'val, pos = int(input()), int(input())'],
    ['c_insert', 'lst.insert_at(val, pos)'],
    ['c_display', 'lst.display()'],
  ],
};

const PHASES = [
  { id: 'build', label: 'Build' },
  { id: 'insert', label: 'Insert' },
  { id: 'display', label: 'Display' },
];

function frame(title, rows) {
  return { title, rows };
}

function buildSteps(values, insVal, pos) {
  const steps = [];
  const phaseStarts = { build: 0 };
  let nodes = [];
  const headAddr = () => (nodes.length ? nodes[0].addr : null);
  const sz = '' + values.length;
  steps.push({
    nodes: [], head: null, badge: 'Build DLL: size=' + sz, code: 'c_build',
    vars: [frame('main()', [['size', sz], ['head', 'null', true]])],
  });
  // build phase
  values.forEach((v, li) => {
    const addr = ADDR(li);
    if (!nodes.length) { nodes = [{ val: v, addr }]; }
    else {
      const lastI = nodes.length - 1;
      steps.push({
        nodes: nodes.slice(), head: headAddr(), tempAddr: nodes[lastI].addr, neuAddr: addr,
        badge: 'build: append ' + v + ' @' + addr, code: 'c_build',
        vars: [frame('main()', [['i', '' + li], ['head', fmt(headAddr()), true]])],
      });
      nodes = [...nodes, { val: v, addr }];
    }
    steps.push({
      nodes: nodes.slice(), head: headAddr(), neuAddr: addr,
      badge: 'build: node ' + v + ' appended @' + addr, code: 'c_build',
      vars: [frame('main()', [['i', '' + li], ['head', fmt(headAddr()), true]])],
    });
  });
  // read pos/val
  phaseStarts.insert = steps.length;
  const newAddr = ADDR(nodes.length);
  steps.push({
    nodes: nodes.slice(), head: headAddr(),
    badge: 'insertAt(val=' + insVal + ', pos=' + pos + ')', code: 'c_main',
    vars: [frame('main()', [['size', sz], ['val', '' + insVal], ['pos', '' + pos], ['head', fmt(headAddr()), true]])],
  });
  // create new node
  steps.push({
    nodes: nodes.slice(), head: headAddr(), pending: { val: insVal, addr: newAddr }, pendPrev: null, pendNext: null,
    badge: 'create newNode(' + insVal + ') @' + newAddr, code: 'c_nodeNew',
    vars: [frame('main()', [['size', sz], ['val', '' + insVal], ['pos', '' + pos]]), frame('insertAt(' + insVal + ',' + pos + ')', [['newNode', fmt(newAddr), true]])],
  });
  const insertIdx = pos - 1; // 0-based index where new node goes
  if (pos === 1) {
    const oldHead = headAddr();
    steps.push({
      nodes: nodes.slice(), head: oldHead, pending: { val: insVal, addr: newAddr }, pendPrev: null, pendNext: oldHead, headPrevOverride: newAddr, curAddr: oldHead,
      badge: 'pos=1: newNode.next=head, head.prev=newNode', code: 'c_sethead',
      vars: [frame('insertAt(' + insVal + ',' + pos + ')', [['newNode', fmt(newAddr), true]])],
    });
    nodes = [{ val: insVal, addr: newAddr }, ...nodes];
    steps.push({
      nodes: nodes.slice(), head: newAddr, neuAddr: newAddr,
      badge: 'head = newNode @' + newAddr, code: 'c_sethead',
      vars: [frame('insertAt(' + insVal + ',' + pos + ')', [['newNode', fmt(newAddr), true]])],
    });
  } else {
    const tIdx = Math.min(pos - 2, nodes.length - 1);
    for (let t = 0; t < tIdx; t++) {
      steps.push({
        nodes: nodes.slice(), head: headAddr(), tempAddr: nodes[t].addr, curAddr: nodes[t].addr,
        badge: 'walk: temp @' + nodes[t].addr + ', i=' + (t + 1) + ' < pos-1=' + (pos - 1), code: 'c_walk',
        vars: [frame('insertAt(' + insVal + ',' + pos + ')', [['temp', fmt(nodes[t].addr), true], ['i', '' + (t + 1)]])],
      });
    }
    const pivot = nodes[tIdx];
    const nextNode = tIdx + 1 < nodes.length ? nodes[tIdx + 1] : null;
    steps.push({
      nodes: nodes.slice(), head: headAddr(), tempAddr: pivot.addr, curAddr: pivot.addr,
      pending: { val: insVal, addr: newAddr }, pendPrev: pivot.addr, pendNext: nextNode ? nextNode.addr : null,
      badge: 'set newNode.next=@' + (nextNode ? nextNode.addr : 'null') + ', newNode.prev=@' + pivot.addr, code: 'c_setnewlinks',
      vars: [frame('insertAt(' + insVal + ',' + pos + ')', [['temp', fmt(pivot.addr), true], ['newNode', fmt(newAddr)]])],
    });
    // rewire
    nodes.splice(tIdx + 1, 0, { val: insVal, addr: newAddr });
    steps.push({
      nodes: nodes.slice(), head: headAddr(), tempAddr: pivot.addr, neuAddr: newAddr,
      badge: 'rewire: temp.next=newNode, (nextNode).prev=newNode', code: 'c_rewire',
      vars: [frame('insertAt(' + insVal + ',' + pos + ')', [['temp', fmt(pivot.addr), true], ['newNode', fmt(newAddr)]])],
    });
  }
  // display
  phaseStarts.display = steps.length;
  let printed = [];
  for (let t = 0; t < nodes.length; t++) {
    printed = [...printed, nodes[t].val];
    steps.push({
      nodes: nodes.slice(), head: headAddr(), tempAddr: nodes[t].addr, curAddr: nodes[t].addr,
      badge: 'display(): print ' + nodes[t].val, code: 'c_display', out: printed.slice(),
      vars: [frame('display()', [['temp', fmt(nodes[t].addr), true]])],
    });
  }
  steps.push({
    nodes: nodes.slice(), head: headAddr(), badge: 'display(): done', code: 'c_display', out: printed.slice(),
    vars: [frame('display()', [['temp', 'null', true]])],
  });

  return { steps, phaseStarts };
}

// ── reactive state ──────────────────────────────────────────────
const inpSize = ref(4);
const inpElems = ref('3 10 14 7');
const inpVal = ref(99);
const inpPos = ref(3);
const lang = ref('java');
const speed = ref(650);
const si = ref(0);
const playing = ref(false);
const vizHeight = ref(265);
const tableHeight = ref(60);
const leftWidth = ref(58);

const stepsData = reactive(buildSteps([3, 10, 14, 7], 99, 3));
const steps = computed(() => stepsData.steps);
const phaseStarts = computed(() => stepsData.phaseStarts);
const s = computed(() => steps.value[Math.max(0, Math.min(si.value, steps.value.length - 1))]);
const codeLines = computed(() => CODES[lang.value] || []);

let playTimer = null;

function applyInput() {
  const sz = parseInt(inpSize.value, 10);
  let arr = String(inpElems.value)
    .split(/[\s,]+/)
    .filter((x) => x !== '')
    .map(Number)
    .filter((n) => !isNaN(n));
  const iv = parseInt(inpVal.value, 10);
  const pos = parseInt(inpPos.value, 10);
  if (!arr.length || isNaN(iv) || isNaN(pos)) {
    alert('Fill all fields.');
    return;
  }
  if (sz > 0 && sz < arr.length) arr = arr.slice(0, sz);
  inpSize.value = arr.length;
  inpElems.value = arr.join(' ');
  playing.value = false;
  const built = buildSteps(arr, iv, pos);
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

function jumpToPhase(pid) {
  if (phaseStarts.value[pid] !== undefined) si.value = phaseStarts.value[pid];
}

function isPhaseActive(pid, idx) {
  const nextId = idx + 1 < PHASES.length ? PHASES[idx + 1].id : null;
  const start = phaseStarts.value[pid] ?? Infinity;
  const nextStart = nextId ? (phaseStarts.value[nextId] ?? Infinity) : Infinity;
  return si.value >= start && (nextStart === Infinity || si.value < nextStart);
}

function nodeLabel(n) {
  const labels = [];
  if (n.addr === s.value.head) labels.push('head');
  if (s.value.tempAddr === n.addr) labels.push('temp');
  return labels.length ? labels.join('/') + ' →' : '';
}

function resetCode() {
  // no-op placeholder: code view is read-only / auto-highlighted in this version
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
      <input type="number" min="1" v-model="inpSize" class="ll-num-input" />
      <label>Elements</label>
      <input
        type="text"
        v-model="inpElems"
        placeholder="Enter numbers separated by spaces"
        class="ll-text-input"
      />
      <label>Insert value</label>
      <input type="number" v-model="inpVal" class="ll-num-input" />
      <label>Position</label>
      <input type="number" min="1" v-model="inpPos" class="ll-num-input" title="1-based position" />
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
              <div class="ll-ptr-chip">head = <b class="ll-c-blue">{{ fmt(s.head) }}</b></div>
              <div v-if="s.tempAddr !== undefined" class="ll-ptr-chip">
                temp = <b class="ll-c-orange">{{ fmt(s.tempAddr) }}</b>
              </div>
            </div>

            <div class="ll-stage">
              <div v-for="(n, idx) in s.nodes" :key="n.addr" class="ll-nwrap">
                <div class="ll-who">{{ nodeLabel(n) }}</div>
                <div class="ll-addr">@{{ n.addr }}</div>
                <div class="ll-node">
                  <div
                    class="ll-box"
                    :class="[
                      n.addr === s.neuAddr ? 'll-box-new' : '',
                      n.addr === s.curAddr ? 'll-box-cur' : '',
                      n.addr === s.delAddr ? 'll-box-del' : '',
                    ]"
                  >
                    <div class="ll-ptr ll-ptr-prev">
                      <small>prev</small>{{ fmt(idx === 0 ? (s.headPrevOverride !== undefined ? s.headPrevOverride : null) : s.nodes[idx - 1].addr) }}
                    </div>
                    <div class="ll-data">{{ n.val }}</div>
                    <div class="ll-ptr">
                      <small>next</small>{{ fmt(idx < s.nodes.length - 1 ? s.nodes[idx + 1].addr : null) }}
                    </div>
                  </div>
                  <span
                    class="ll-arrow"
                    :class="{ 'll-arrow-cut': idx < s.nodes.length - 1 && s.nodes[idx + 1].addr === s.delAddr }"
                  >{{ idx < s.nodes.length - 1 ? '⇄' : '' }}</span>
                </div>
              </div>

              <div v-if="s.pending" class="ll-nwrap ll-nwrap-pend">
                <div class="ll-who ll-c-green">newNode →</div>
                <div class="ll-addr">@{{ s.pending.addr }}</div>
                <div class="ll-node">
                  <div class="ll-box ll-box-new">
                    <div class="ll-ptr ll-ptr-prev"><small>prev</small>{{ fmt(s.pendPrev) }}</div>
                    <div class="ll-data">{{ s.pending.val }}</div>
                    <div class="ll-ptr"><small>next</small>{{ fmt(s.pendNext) }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="ll-outbox">
              <span class="ll-outlabel">Output:</span>
              <span v-for="(v, i) in s.out" :key="i" class="ll-outv">{{ v }}</span>
            </div>
          </div>
        </div>
        <div class="ll-vresizer" ref="vizResizerRef"></div>

        <!-- LEGEND -->
        <div class="ll-legend">
          <span class="ll-leg"><span class="ll-legdot ll-legdot-existing"></span>existing node</span>
          <span class="ll-leg"><span class="ll-legdot ll-legdot-new"></span>new node</span>
          <span class="ll-leg"><span class="ll-legdot ll-legdot-cur"></span>temp (walking)</span>
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

      <!-- CODE PANEL -->
      <div class="ll-right-col">
        <div class="ll-code-panel">
          <div class="ll-code-header">
            <select v-model="lang" class="ll-lang-select">
              <option value="java">Java</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="python">Python</option>
            </select>
            <button class="ll-reset-btn" @click="resetCode">↺ Reset</button>
          </div>
          <div class="ll-code-scroll">
            <pre class="ll-pre"><span
              v-for="(line, i) in codeLines"
              :key="i"
              class="ll-codeline"
              :class="{ 'll-hl': line[0] && line[0] === s.code }"
            >{{ line[1] === '' ? ' ' : line[1] }}
</span></pre>
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
  /* background-color: #5f87c7; */
}
.slide-body {
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  height: 100%;
}

.cont {
  background-color: #ef5050;
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
  scrollbar-width:none;

  overflow-x: auto;
  overflow-y: auto;
  scrollbar-width:thin;
}

/* HEADER */
.ll-hdr {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px;
  height: 48px;
  flex-shrink: 0;
  border-bottom: 1px solid var(--border2);
}
.ll-hdr h1 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text2);
  letter-spacing: -.3px;
  flex: 1;
  margin: 0;
}
.ll-phasebar {
  display: flex;
  gap: 8px;
  align-items: center;
}
.ll-phase-btn {
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  border: 1.5px solid rgba(255,255,255,.5);
  background: rgba(255,255,255,.15);
  color: rgba(255,105,105,.85);
  transition: all .15s;
  white-space: nowrap;
}
.ll-phase-btn:hover {
  background: rgba(255,255,255,.28);
  border-color: rgba(255,255,255,.8);
  color: #fff;
}
.ll-phase-btn.active {
  background: #fff;
  color: var(--coral);
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
  min-width: 200px;
  height: 78%;
}

/* VIZ AREA */
.ll-viz-wrap {
  flex-shrink: 0;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  position: relative;
  overflow: auto;
}
.ll-perm-area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 100%;
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

.ll-stage {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 4px 16px 8px;
  min-height: 80px;
}
.ll-nwrap {
  display: flex;
  flex-direction: column;
  align-items: center;
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
  white-space: nowrap;
  font-weight: 600;
}
.ll-node {
  display: flex;
  align-items: center;
}
.ll-box {
  display: flex;
  border: 2px solid var(--blue);
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--node);
  min-width: 90px;
  color: #fff;
  animation: ll-pop .3s ease;
  box-shadow: var(--shadow-sm);
}
.ll-box-new {
  border-color: var(--green);
  background: var(--nodeNew);
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
.ll-outbox {
  margin: 4px 16px 8px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 7px 14px;
  font-family: 'Consolas', monospace;
  font-size: 15px;
  min-height: 36px;
  display: flex;
  align-items: center;
  gap: 4px;
  width: calc(100% - 32px);
}
.ll-outlabel {
  color: var(--muted);
  font-size: 11px;
  margin-right: 6px;
  font-weight: 500;
}
.ll-outv {
  color: var(--text);
  font-weight: 700;
  margin-right: 8px;
  animation: ll-pop .3s ease;
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
.ll-legdot-new {
  background: var(--nodeNew);
  border: 1.5px solid var(--green);
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
  overflow: auto;
  background: var(--surface);
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

/* CODE PANEL */
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
.ll-reset-btn {
  margin-left: auto;
  background: var(--surface2);
  border: 1px solid var(--border2);
  color: var(--coral);
  padding: 5px 11px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;
  transition: all .15s;
}
.ll-reset-btn:hover {
  background: var(--coral-light);
  border-color: var(--coral);
}
.ll-code-scroll {
  flex: 1;
  overflow: auto;
  padding: 14px 16px;
  background: #f8fafc;
}
.ll-pre {
  font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
  font-size: 12px;
  line-height: 1.65;
  white-space: pre;
  color: var(--text);
  margin: 0;
}
.ll-codeline {
  display: block;
  margin: 0 -16px;
  padding: 0 16px;
}
.ll-hl {
  background: #dcfce7;
  color: #15803d;
  border-radius: 3px;
  border-left: 2px solid var(--green);
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

/* DLL ADDITIONS */
.ll-ptr-prev {
  border-left: none;
  border-right: 1px solid rgba(255,255,255,.15);
}
.ll-arrow-cut {
  color: #b91c1c;
  text-decoration: line-through;
}
.ll-box-del {
  border-color: #b91c1c;
  background: #b91c1c;
  box-shadow: 0 0 0 3px rgba(220,38,38,.3);
}
.ll-box-del .ll-data {
  text-decoration: line-through;
}
.ll-nwrap-pend {
  margin-left: 22px;
}
</style>
