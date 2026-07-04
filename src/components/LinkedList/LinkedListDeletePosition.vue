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
    ['', 'import java.util.Scanner;'],
    ['', ''],
    ['', 'class Node {'],
    ['', '    int data;'],
    ['', '    Node next;'],
    ['', '    Node(int d) {'],
    ['', '        data = d;'],
    ['', '        next = null;'],
    ['', '    }'],
    ['', '}'],
    ['', ''],
    ['', 'class LinkedList {'],
    ['c_sethead', '    Node head;'],
    ['', ''],
    ['c_build', '    void buildList(int[] arr) {'],
    ['c_build', '        for (int val : arr) {'],
    ['c_build', '            Node n = new Node(val);'],
    ['c_build', '            if (head == null) {'],
    ['c_build', '                head = n;'],
    ['c_build', '                continue;'],
    ['c_build', '            }'],
    ['c_build', '            Node t = head;'],
    ['c_build', '            while (t.next != null) t = t.next;'],
    ['c_build', '            t.next = n;'],
    ['c_build', '        }'],
    ['c_build', '    }'],
    ['', ''],
    ['c_delete', '    void deleteAtPosition(int pos) {'],
    ['c_check', '        if (head == null) {'],
    ['c_check', '            System.out.println("Empty");'],
    ['c_check', '            return;'],
    ['c_check', '        }'],
    ['c_movehead', '        if (pos == 1) {'],
    ['c_movehead', '            head = head.next;'],
    ['c_movehead', '            return;'],
    ['c_movehead', '        }'],
    ['c_walk', '        Node temp = head;'],
    ['c_walk', '        for (int i = 1; i < pos - 1 && temp.next != null; i++)'],
    ['c_walk', '            temp = temp.next;'],
    ['c_findnode', '        Node del = temp.next;    // node to delete'],
    ['c_bypass', '        temp.next = del.next;     // bypass'],
    ['c_bypass', '        del = null;               // free'],
    ['c_delete', '    }'],
    ['', ''],
    ['c_display', '    void display() {'],
    ['c_display', '        Node temp = head;'],
    ['c_display', '        while (temp != null) {'],
    ['c_display', '            System.out.print(temp.data + " ");'],
    ['c_display', '            temp = temp.next;'],
    ['c_display', '        }'],
    ['c_display', '    }'],
    ['', ''],
    ['c_main', '    public static void main(String[] args) {'],
    ['c_main', '        Scanner sc = new Scanner(System.in);'],
    ['c_main', '        LinkedList list = new LinkedList();'],
    ['c_main', '        int size = sc.nextInt();'],
    ['c_main', '        int[] arr = new int[size];'],
    ['c_main', '        for (int i = 0; i < size; i++) arr[i] = sc.nextInt();'],
    ['c_build', '        list.buildList(arr);'],
    ['c_main', '        int pos = sc.nextInt();'],
    ['c_delete', '        list.deleteAtPosition(pos);'],
    ['c_display', '        list.display();'],
    ['c_main', '    }'],
    ['', '}'],
  ],
  c: [
    ['', '#include <stdio.h>'],
    ['', '#include <stdlib.h>'],
    ['', ''],
    ['', 'struct Node {'],
    ['', '    int data;'],
    ['', '    struct Node *next;'],
    ['', '};'],
    ['c_sethead', 'struct Node *head = NULL;'],
    ['', ''],
    ['c_build', 'void buildList(int *a, int n) {'],
    ['c_build', '    for (int i = 0; i < n; i++) {'],
    ['c_build', '        struct Node *nd = malloc(sizeof(struct Node));'],
    ['c_build', '        nd->data = a[i];'],
    ['c_build', '        nd->next = NULL;'],
    ['c_build', '        if (!head) {'],
    ['c_build', '            head = nd;'],
    ['c_build', '            continue;'],
    ['c_build', '        }'],
    ['c_build', '        struct Node *t = head;'],
    ['c_build', '        while (t->next) t = t->next;'],
    ['c_build', '        t->next = nd;'],
    ['c_build', '    }'],
    ['c_build', '}'],
    ['', ''],
    ['c_delete', 'void deleteAtPosition(int pos) {'],
    ['c_check', '    if (!head) { printf("Empty\\n"); return; }'],
    ['c_movehead', '    if (pos == 1) {'],
    ['c_movehead', '        struct Node *t = head;'],
    ['c_movehead', '        head = head->next;'],
    ['c_movehead', '        free(t);'],
    ['c_movehead', '        return;'],
    ['c_movehead', '    }'],
    ['c_walk', '    struct Node *temp = head;'],
    ['c_walk', '    for (int i = 1; i < pos - 1 && temp->next; i++)'],
    ['c_walk', '        temp = temp->next;'],
    ['c_findnode', '    struct Node *del = temp->next;'],
    ['c_bypass', '    temp->next = del->next;'],
    ['c_bypass', '    free(del);'],
    ['c_delete', '}'],
    ['', ''],
    ['c_display', 'void display() {'],
    ['c_display', '    struct Node *t = head;'],
    ['c_display', '    while (t) {'],
    ['c_display', '        printf("%d ", t->data);'],
    ['c_display', '        t = t->next;'],
    ['c_display', '    }'],
    ['c_display', '}'],
    ['', ''],
    ['c_main', 'int main() {'],
    ['c_main', '    int n;'],
    ['c_main', '    scanf("%d", &n);'],
    ['c_main', '    int a[n];'],
    ['c_main', '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);'],
    ['c_build', '    buildList(a, n);'],
    ['c_main', '    int pos;'],
    ['c_main', '    scanf("%d", &pos);'],
    ['c_delete', '    deleteAtPosition(pos);'],
    ['c_display', '    display();'],
    ['c_main', '    return 0;'],
    ['c_main', '}'],
  ],
  cpp: [
    ['', '#include <iostream>'],
    ['', 'using namespace std;'],
    ['', ''],
    ['', 'struct Node {'],
    ['', '    int data;'],
    ['', '    Node *next;'],
    ['', '};'],
    ['c_sethead', 'Node *head = NULL;'],
    ['', ''],
    ['c_build', 'void buildList(int *a, int n) {'],
    ['c_build', '    for (int i = 0; i < n; i++) {'],
    ['c_build', '        Node *nd = new Node();'],
    ['c_build', '        nd->data = a[i];'],
    ['c_build', '        nd->next = NULL;'],
    ['c_build', '        if (!head) {'],
    ['c_build', '            head = nd;'],
    ['c_build', '            continue;'],
    ['c_build', '        }'],
    ['c_build', '        Node *t = head;'],
    ['c_build', '        while (t->next) t = t->next;'],
    ['c_build', '        t->next = nd;'],
    ['c_build', '    }'],
    ['c_build', '}'],
    ['', ''],
    ['c_delete', 'void deleteAtPosition(int pos) {'],
    ['c_check', '    if (!head) { cout << "Empty"; return; }'],
    ['c_movehead', '    if (pos == 1) {'],
    ['c_movehead', '        Node *t = head;'],
    ['c_movehead', '        head = head->next;'],
    ['c_movehead', '        delete t;'],
    ['c_movehead', '        return;'],
    ['c_movehead', '    }'],
    ['c_walk', '    Node *temp = head;'],
    ['c_walk', '    for (int i = 1; i < pos - 1 && temp->next; i++)'],
    ['c_walk', '        temp = temp->next;'],
    ['c_findnode', '    Node *del = temp->next;'],
    ['c_bypass', '    temp->next = del->next;'],
    ['c_bypass', '    delete del;'],
    ['c_delete', '}'],
    ['', ''],
    ['c_display', 'void display() {'],
    ['c_display', '    Node *t = head;'],
    ['c_display', '    while (t) {'],
    ['c_display', '        cout << t->data << " ";'],
    ['c_display', '        t = t->next;'],
    ['c_display', '    }'],
    ['c_display', '}'],
    ['', ''],
    ['c_main', 'int main() {'],
    ['c_main', '    int n;'],
    ['c_main', '    cin >> n;'],
    ['c_main', '    int a[n];'],
    ['c_main', '    for (int i = 0; i < n; i++) cin >> a[i];'],
    ['c_build', '    buildList(a, n);'],
    ['c_main', '    int pos;'],
    ['c_main', '    cin >> pos;'],
    ['c_delete', '    deleteAtPosition(pos);'],
    ['c_display', '    display();'],
    ['c_main', '    return 0;'],
    ['c_main', '}'],
  ],
  python: [
    ['', 'class Node:'],
    ['', '    def __init__(self, d):'],
    ['', '        self.data = d'],
    ['', '        self.next = None'],
    ['', ''],
    ['', 'class LinkedList:'],
    ['c_sethead', '    def __init__(self):'],
    ['c_sethead', '        self.head = None'],
    ['', ''],
    ['c_build', '    def build_list(self, arr):'],
    ['c_build', '        for v in arr:'],
    ['c_build', '            n = Node(v)'],
    ['c_build', '            if not self.head:'],
    ['c_build', '                self.head = n'],
    ['c_build', '                continue'],
    ['c_build', '            t = self.head'],
    ['c_build', '            while t.next:'],
    ['c_build', '                t = t.next'],
    ['c_build', '            t.next = n'],
    ['', ''],
    ['c_delete', '    def delete_at_position(self, pos):'],
    ['c_check', '        if not self.head:'],
    ['c_check', '            print("Empty")'],
    ['c_check', '            return'],
    ['c_movehead', '        if pos == 1:'],
    ['c_movehead', '            self.head = self.head.next'],
    ['c_movehead', '            return'],
    ['c_walk', '        temp = self.head'],
    ['c_walk', '        for _ in range(pos - 2):'],
    ['c_walk', '            if not temp.next: break'],
    ['c_walk', '            temp = temp.next'],
    ['c_findnode', '        del_node = temp.next  # node to delete'],
    ['c_bypass', '        temp.next = del_node.next'],
    ['c_bypass', '        del_node = None'],
    ['', ''],
    ['c_display', '    def display(self):'],
    ['c_display', '        t = self.head'],
    ['c_display', '        while t:'],
    ['c_display', '            print(t.data, end=" ")'],
    ['c_display', '            t = t.next'],
    ['', ''],
    ['c_main', 'n = int(input())'],
    ['c_main', 'arr = list(map(int, input().split()))'],
    ['c_main', 'lst = LinkedList()'],
    ['c_build', 'lst.build_list(arr)'],
    ['c_main', 'pos = int(input())'],
    ['c_delete', 'lst.delete_at_position(pos)'],
    ['c_display', 'lst.display()'],
  ],
};

const PHASES = [
  { id: 'build', label: 'Build' },
  { id: 'delete', label: 'Delete' },
  { id: 'display', label: 'Display' },
];

function frame(title, rows) {
  return { title, rows };
}

function buildSteps(values, pos) {
  const steps = [];
  const phaseStarts = { build: 0 };
  let nodes = [];
  let headAddr = null;
  let addrCounter = 0;

  steps.push({
    nodes: [], headAddr: null,
    badge: 'Read input → size=' + values.length + ', pos=' + pos, code: 'c_main',
    vars: [frame('main()', [['size', '' + values.length], ['pos', '' + pos], ['head', 'null', true]])],
  });

  values.forEach((v, li) => {
    const a = ADDR(addrCounter++);
    nodes = [...nodes, { val: v, addr: a }];
    if (li === 0) headAddr = a;
    steps.push({
      nodes: [...nodes], headAddr, badge: 'build: add ' + v + ' @' + a, code: 'c_build',
      vars: [
        frame('main()', [['size', '' + values.length], ['pos', '' + pos], ['head', fmt(headAddr), true]]),
        frame('buildList()', [['i', '' + li], ['n', fmt(a), true]]),
      ],
    });
  });

  phaseStarts.delete = steps.length;
  steps.push({
    nodes: [...nodes], headAddr, badge: 'deleteAtPosition(pos=' + pos + '): check', code: 'c_check',
    vars: [frame('deleteAtPosition(pos=' + pos + ')', [['pos', '' + pos], ['head', fmt(headAddr), true]])],
  });
  if (nodes.length === 0) {
    // empty list, do nothing more
  } else if (pos === 1) {
    const delAddr = headAddr;
    const newHead = nodes.length > 1 ? nodes[1].addr : null;
    steps.push({
      nodes: [...nodes], headAddr, delAddr,
      badge: 'pos=1 → delete head @' + delAddr + ', head = ' + fmt(newHead), code: 'c_movehead',
      vars: [frame('deleteAtPosition(pos=1)', [['head', fmt(newHead), true]])],
    });
    nodes.shift(); headAddr = newHead;
    steps.push({
      nodes: [...nodes], headAddr, badge: 'head node freed → done', code: 'c_movehead',
      vars: [frame('deleteAtPosition(pos=1)', [['head', fmt(headAddr), true]])],
    });
  } else {
    // walk to pos-1
    for (let t = 0; t < pos - 2 && t < nodes.length - 1; t++) {
      steps.push({
        nodes: [...nodes], headAddr, tempAddr: nodes[t].addr, curAddr: nodes[t].addr,
        badge: 'walk i=' + (t + 1) + ' → temp=@' + nodes[t].addr, code: 'c_walk',
        vars: [frame('deleteAtPosition(pos=' + pos + ')', [['pos', '' + pos], ['temp', fmt(nodes[t].addr), true], ['i', '' + (t + 1)]])],
      });
    }
    const tIdx = Math.min(pos - 2, nodes.length - 2);
    const prevNode = nodes[tIdx];
    const delIdx = tIdx + 1;
    if (delIdx < nodes.length) {
      const delNode = nodes[delIdx];
      steps.push({
        nodes: [...nodes], headAddr, tempAddr: prevNode.addr, curAddr: prevNode.addr, delAddr: delNode.addr,
        badge: 'del = temp.next = @' + delNode.addr + ' (node to delete)', code: 'c_findnode',
        vars: [frame('deleteAtPosition(pos=' + pos + ')', [['temp', fmt(prevNode.addr), true], ['del', fmt(delNode.addr), true]])],
      });
      const afterDel = delIdx + 1 < nodes.length ? nodes[delIdx + 1].addr : null;
      steps.push({
        nodes: [...nodes], headAddr, tempAddr: prevNode.addr, curAddr: prevNode.addr, delAddr: delNode.addr, cutAddr: delNode.addr,
        badge: 'bypass: temp.next = del.next = ' + fmt(afterDel), code: 'c_bypass',
        vars: [frame('deleteAtPosition(pos=' + pos + ')', [['temp', fmt(prevNode.addr), true], ['del', fmt(delNode.addr), true]])],
      });
      nodes.splice(delIdx, 1);
      steps.push({
        nodes: [...nodes], headAddr, tempAddr: prevNode.addr,
        badge: 'node @' + delNode.addr + ' freed → done', code: 'c_bypass',
        vars: [frame('deleteAtPosition(pos=' + pos + ')', [['temp', fmt(prevNode.addr), true], ['del', 'null', true]])],
      });
    }
  }

  phaseStarts.display = steps.length;
  let printed = [];
  steps.push({
    nodes: [...nodes], headAddr, tempAddr: headAddr, badge: 'display(): start', code: 'c_display', out: [],
    vars: [frame('display()', [['temp', fmt(headAddr), true]])],
  });
  for (let t = 0; t < nodes.length; t++) {
    printed = [...printed, nodes[t].val];
    steps.push({
      nodes: [...nodes], headAddr, tempAddr: nodes[t].addr, curAddr: nodes[t].addr,
      badge: 'display(): print ' + nodes[t].val, code: 'c_display', out: [...printed],
      vars: [frame('display()', [['temp', fmt(nodes[t].addr), true]])],
    });
  }
  steps.push({
    nodes: [...nodes], headAddr, tempAddr: null, badge: 'display(): done',
    code: 'c_display', out: [...printed], done: true,
    vars: [frame('display()', [['temp', 'null', true]])],
  });

  return { steps, phaseStarts };
}

// ── reactive state ──────────────────────────────────────────────
const inpSize = ref(4);
const inpElems = ref('3 10 14 7');
const inpPos = ref(3);
const lang = ref('java');
const speed = ref(650);
const si = ref(0);
const playing = ref(false);
const vizHeight = ref(265);
const tableHeight = ref(60);
const leftWidth = ref(58);

const stepsData = reactive(buildSteps([3, 10, 14, 7], 3));
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
  if (!arr.length) {
    alert('Enter at least one number.');
    return;
  }
  if (sz > 0 && sz < arr.length) arr = arr.slice(0, sz);
  const pos = parseInt(inpPos.value, 10) || 1;
  inpSize.value = arr.length;
  inpElems.value = arr.join(' ');
  inpPos.value = pos;
  playing.value = false;
  const built = buildSteps(arr, pos);
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
  if (n.addr === s.value.headAddr) labels.push('head →');
  if (n.addr === s.value.tempAddr) labels.push('temp →');
  return labels.join(' ');
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
              <div class="ll-ptr-chip">head = <b class="ll-c-blue">{{ fmt(s.headAddr) }}</b></div>
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
                    :class="n.addr === s.delAddr ? 'll-box-del' : (n.addr === s.curAddr ? 'll-box-cur' : '')"
                  >
                    <div class="ll-data">{{ n.val }}</div>
                    <div class="ll-ptr">
                      <small>next</small>{{ fmt(idx < s.nodes.length - 1 ? s.nodes[idx + 1].addr : null) }}
                    </div>
                  </div>
                  <span
                    class="ll-arrow"
                    :class="{ 'll-arrow-cut': idx < s.nodes.length - 1 && s.nodes[idx + 1].addr === s.cutAddr }"
                  >{{ idx < s.nodes.length - 1 ? '→' : '' }}</span>
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
          <span class="ll-leg"><span class="ll-legdot ll-legdot-cur"></span>temp (walking)</span>
          <span class="ll-leg"><span class="ll-legdot ll-legdot-del"></span>node to delete</span>
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
.ll-box-del {
  border-color: #b91c1c;
  background: #b91c1c;
  opacity: .7;
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
.ll-arrow-cut {
  color: #b91c1c;
  text-decoration: line-through;
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
.ll-legdot-del {
  background: #b91c1c;
  border: 1.5px solid #b91c1c;
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
</style>
