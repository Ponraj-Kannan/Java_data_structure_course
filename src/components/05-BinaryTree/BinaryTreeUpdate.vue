<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';

const props = defineProps({
  topic:    { type: String, default: 'Binary Tree — Update Node Value' },
  subTopic: { type: String, default: 'Search & Replace Value using BFS' },
});

const ADDR = (i) => (i + 1) * 1000;
const fmt  = (a) => {
  if (a === null || a === undefined) return 'null';
  const str = String(a);
  return str.startsWith('@') ? str : '@' + str;
};

/* ------------------------------------------------------------------ */
/* Source code — tagged per logical step                               */
/* ------------------------------------------------------------------ */
const CODES = {
  java: [
    ['', 'class BinaryTree {'],
    ['', '    Node root;'],
    ['', ''],
    ['c_call',        '    boolean updateValue(int oldVal, int newVal) {'],
    ['c_nullCheck',   '        if (root == null) {'],
    ['c_nullReturn',  '            return false;'],
    ['',              '        }'],
    ['c_initQueue',   '        Queue<Node> q = new LinkedList<>();'],
    ['c_enqueueRoot', '        q.add(root);'],
    ['c_whileLoop',   '        while (!q.isEmpty()) {'],
    ['c_dequeue',     '            Node curr = q.poll();'],
    ['c_checkVal',    '            if (curr.data == oldVal) {'],
    ['c_updateVal',   '                curr.data = newVal;'],
    ['c_returnTrue',  '                return true;'],
    ['',              '            }'],
    ['c_leftCheck',   '            if (curr.left != null) {'],
    ['c_enqueueLeft', '                q.add(curr.left);'],
    ['',              '            }'],
    ['c_rightCheck',  '            if (curr.right != null) {'],
    ['c_enqueueRight','                q.add(curr.right);'],
    ['',              '            }'],
    ['',              '        }'],
    ['c_notFound',    '        return false;'],
    ['',              '    }'],
    ['', ''],
    ['c_main',        '    public static void main(String[] args) {'],
    ['c_main',        '        BinaryTree tree = new BinaryTree();'],
    ['c_main',        '        // ... build tree level order ...'],
    ['c_main',        '        boolean ok = tree.updateValue(oldVal, newVal);'],
    ['c_main',        '    }'],
    ['', '}'],
  ],
  c: [
    ['c_call',        'int updateValue(struct Node* root, int oldVal, int newVal) {'],
    ['c_nullCheck',   '    if (root == NULL) {'],
    ['c_nullReturn',  '        return 0;'],
    ['',              '    }'],
    ['c_initQueue',   '    struct Node* q[512]; int f = 0, r = 0;'],
    ['c_enqueueRoot', '    q[r++] = root;'],
    ['c_whileLoop',   '    while (f < r) {'],
    ['c_dequeue',     '        struct Node* curr = q[f++];'],
    ['c_checkVal',    '        if (curr->data == oldVal) {'],
    ['c_updateVal',   '            curr->data = newVal;'],
    ['c_returnTrue',  '            return 1;'],
    ['',              '        }'],
    ['c_leftCheck',   '        if (curr->left != NULL) {'],
    ['c_enqueueLeft', '            q[r++] = curr->left;'],
    ['',              '        }'],
    ['c_rightCheck',  '        if (curr->right != NULL) {'],
    ['c_enqueueRight','            q[r++] = curr->right;'],
    ['',              '        }'],
    ['',              '    }'],
    ['c_notFound',    '    return 0;'],
    ['',              '}'],
    ['', ''],
    ['c_main',        'int main() {'],
    ['c_main',        '    // ... build tree level order ...'],
    ['c_main',        '    int ok = updateValue(root, oldVal, newVal);'],
    ['c_main',        '    return 0;'],
    ['',              '}'],
  ],
  cpp: [
    ['c_call',        'bool updateValue(Node* root, int oldVal, int newVal) {'],
    ['c_nullCheck',   '    if (root == nullptr) {'],
    ['c_nullReturn',  '        return false;'],
    ['',              '    }'],
    ['c_initQueue',   '    queue<Node*> q;'],
    ['c_enqueueRoot', '    q.push(root);'],
    ['c_whileLoop',   '    while (!q.empty()) {'],
    ['c_dequeue',     '        Node* curr = q.front(); q.pop();'],
    ['c_checkVal',    '        if (curr->data == oldVal) {'],
    ['c_updateVal',   '            curr->data = newVal;'],
    ['c_returnTrue',  '            return true;'],
    ['',              '        }'],
    ['c_leftCheck',   '        if (curr->left != nullptr) {'],
    ['c_enqueueLeft', '            q.push(curr->left);'],
    ['',              '        }'],
    ['c_rightCheck',  '        if (curr->right != nullptr) {'],
    ['c_enqueueRight','            q.push(curr->right);'],
    ['',              '        }'],
    ['',              '    }'],
    ['c_notFound',    '    return false;'],
    ['',              '}'],
    ['', ''],
    ['c_main',        'int main() {'],
    ['c_main',        '    // ... build tree level order ...'],
    ['c_main',        '    bool ok = updateValue(root, oldVal, newVal);'],
    ['c_main',        '    return 0;'],
    ['',              '}'],
  ],
  python: [
    ['c_call',        'def update_value(root, old_val, new_val):'],
    ['c_nullCheck',   '    if root is None:'],
    ['c_nullReturn',  '        return False'],
    ['c_initQueue',   '    q = deque([root])'],
    ['c_whileLoop',   '    while q:'],
    ['c_dequeue',     '        curr = q.popleft()'],
    ['c_checkVal',    '        if curr.data == old_val:'],
    ['c_updateVal',   '            curr.data = new_val'],
    ['c_returnTrue',  '            return True'],
    ['c_leftCheck',   '        if curr.left is not None:'],
    ['c_enqueueLeft', '            q.append(curr.left)'],
    ['c_rightCheck',  '        if curr.right is not None:'],
    ['c_enqueueRight','            q.append(curr.right)'],
    ['c_notFound',    '    return False'],
    ['', ''],
    ['c_main',        '# build tree level order ...'],
    ['c_main',        'ok = update_value(root, old_val, new_val)'],
  ],
};

/* ------------------------------------------------------------------ */
/* Pseudocode                                                          */
/* ------------------------------------------------------------------ */
const PSEUDOCODE = [
  'procedure updateValue(root, oldVal, newVal):',
  '    if root is null:',
  '        return false',
  '',
  '    queue = [root]',
  '',
  '    while queue is not empty:',
  '        curr = dequeue(queue)',
  '',
  '        if curr.data == oldVal:',
  '            curr.data = newVal     // Update value!',
  '            return true',
  '',
  '        if curr.left != null:',
  '            enqueue(queue, curr.left)',
  '        if curr.right != null:',
  '            enqueue(queue, curr.right)',
  '',
  '    return false                 // Target Not Found',
];

function frame(title, rows) { return { title, rows }; }

/* ------------------------------------------------------------------ */
/* Level order tree builder (instant — silent)                         */
/* ------------------------------------------------------------------ */
function buildLevelOrderTree(values) {
  const nodes = [];
  const edges = [];
  if (!values.length) return { nodes, edges, rootId: null };

  values.forEach((v, i) => {
    nodes.push({ id: i, val: v, left: null, right: null, addr: ADDR(i) });
  });

  const rootId = 0;
  const q = [0];
  let idx = 1;

  while (q.length && idx < nodes.length) {
    const parentId = q.shift();
    if (idx < nodes.length) {
      nodes[parentId].left = idx;
      edges.push({ from: parentId, to: idx });
      q.push(idx);
      idx++;
    }
    if (idx < nodes.length) {
      nodes[parentId].right = idx;
      edges.push({ from: parentId, to: idx });
      q.push(idx);
      idx++;
    }
  }

  return { nodes, edges, rootId };
}

/* ------------------------------------------------------------------ */
/* Step generation                                                     */
/* ------------------------------------------------------------------ */
function buildSteps(initialNodes, initialEdges, rootId, oldVal, newVal) {
  const steps = [];

  const nodes = initialNodes.map(n => ({ ...n }));
  const edges = initialEdges.map(e => ({ ...e }));
  const nodesMap = {};
  nodes.forEach(n => (nodesMap[n.id] = n));

  const visitedArr = [];
  const queue = [];

  function snap(currId, updatedId, badge, code) {
    steps.push({
      nodes:      nodes.map(n => ({ ...n })),
      edges:      edges.map(e => ({ ...e })),
      rootId,
      currId:     currId    ?? null,
      updatedId:  updatedId ?? null,
      visitedArr: [...visitedArr],
      queueIds:   [...queue],
      badge,
      code,
      vars: [
        frame('updateValue(oldVal, newVal)', [
          ['oldVal', '' + oldVal],
          ['newVal', '' + newVal],
          ['root', rootId !== null ? fmt(ADDR(rootId)) : 'null', true],
          ...(currId !== null && currId !== undefined ? [['curr', fmt(ADDR(currId)), true]] : []),
          ['q.size', '' + queue.length],
        ]),
      ],
    });
  }

  if (rootId === null) {
    snap(null, null, 'Tree is empty — update cannot run.', 'c_nullCheck');
    return steps;
  }

  snap(null, null, `updateValue(oldVal = ${oldVal}, newVal = ${newVal}) called.`, 'c_main');
  snap(null, null, `Call updateValue(root, ${oldVal}, ${newVal})`, 'c_call');

  const rootNull = rootId === null;
  snap(null, null, `Check: root == null? → ${rootNull ? 'TRUE' : 'FALSE'}`, 'c_nullCheck');

  if (rootNull) {
    snap(null, null, 'root == null → return false.', 'c_nullReturn');
    return steps;
  }

  snap(null, null, 'Initialize Queue q for Level Order search.', 'c_initQueue');

  queue.push(rootId);
  snap(null, null, `q.add(root) → Enqueue root (@${ADDR(rootId)}, val=${nodesMap[rootId].val}).`, 'c_enqueueRoot');

  let isUpdated = false;

  while (queue.length > 0) {
    snap(null, null, `while (!q.isEmpty()) → ${queue.length} node(s) in queue.`, 'c_whileLoop');

    const currId = queue.shift();
    const curr = nodesMap[currId];

    snap(currId, null, `Dequeue: curr = q.poll() → curr = @${curr.addr} (val=${curr.val}).`, 'c_dequeue');

    const isMatch = curr.val === oldVal;
    snap(currId, null, `Compare: if (curr.data == oldVal) → (${curr.val} == ${oldVal}) → ${isMatch ? 'TRUE — Target Found!' : 'FALSE — No match'}`, 'c_checkVal');

    if (isMatch) {
      // Update value in diagram
      curr.val = newVal;
      snap(currId, currId, `curr.data = newVal → Updated node @${curr.addr} value from ${oldVal} to ${newVal}!`, 'c_updateVal');
      snap(currId, currId, `Value Updated Successfully! return true.`, 'c_returnTrue');
      isUpdated = true;
      break;
    }

    visitedArr.push(currId);

    const leftExist = curr.left !== null;
    snap(currId, null, `Check: curr.left != null? → ${leftExist ? `TRUE (@${ADDR(curr.left)})` : 'FALSE'}`, 'c_leftCheck');
    if (leftExist) {
      queue.push(curr.left);
      snap(currId, null, `q.add(curr.left) → Enqueue left child @${ADDR(curr.left)}.`, 'c_enqueueLeft');
    }

    const rightExist = curr.right !== null;
    snap(currId, null, `Check: curr.right != null? → ${rightExist ? `TRUE (@${ADDR(curr.right)})` : 'FALSE'}`, 'c_rightCheck');
    if (rightExist) {
      queue.push(curr.right);
      snap(currId, null, `q.add(curr.right) → Enqueue right child @${ADDR(curr.right)}.`, 'c_enqueueRight');
    }
  }

  if (!isUpdated) {
    snap(null, null, `while (!q.isEmpty()) → Queue is EMPTY! Target value ${oldVal} NOT FOUND. return false.`, 'c_notFound');
  }

  return steps;
}

/* ------------------------------------------------------------------ */
/* Reactive state                                                      */
/* ------------------------------------------------------------------ */
const inpElems  = ref('1 2 3 4 5 6 7');
const inpOldVal = ref(5);
const inpNewVal = ref(99);
const lang      = ref('java');
const rightTab  = ref('code');
const speed     = ref(900);
const si        = ref(0);
const playing   = ref(false);
const steps     = ref([]);

const vizHeight   = ref(320);
const tableHeight = ref(90);
const leftWidth   = ref(58);

const mainRef         = ref(null);
const leftColRef      = ref(null);
const hResizerRef     = ref(null);
const vizResizerRef   = ref(null);
const tableResizerRef = ref(null);

let playTimer = null;

const currentStep = computed(() => steps.value[si.value] || {
  nodes: [], edges: [], vars: [], badge: '', rootId: null, currId: null, updatedId: null, visitedArr: [], queueIds: [],
});
const s         = computed(() => currentStep.value);
const codeLines = computed(() => CODES[lang.value] || []);

const nodesById = computed(() => {
  const m = {};
  (currentStep.value.nodes || []).forEach(n => (m[n.id] = n));
  return m;
});

function childAddr(childId) {
  if (childId === null || childId === undefined) return null;
  return nodesById.value[childId] ? nodesById.value[childId].addr : null;
}

/* ------------------------------------------------------------------ */
/* Tree layout                                                         */
/* ------------------------------------------------------------------ */
const NODE_W     = 132;
const NODE_BOX_H = 44;
const NODE_H     = 68;
const SPACING_X  = 145;
const START_Y    = 82;
const LEVEL_H    = 116;

const treeLayout = computed(() => {
  const step = currentStep.value;
  const byId = nodesById.value;
  if (!step || !step.nodes || step.nodes.length === 0)
    return { positions: {}, edges: [], width: 640, height: 260 };

  const depth = {};
  if (step.rootId !== null && step.rootId !== undefined && byId[step.rootId]) {
    const queue = [[step.rootId, 0]];
    while (queue.length) {
      const [id, d] = queue.shift();
      depth[id] = d;
      const n = byId[id];
      if (n) {
        if (n.left  !== null && byId[n.left]) queue.push([n.left,  d + 1]);
        if (n.right !== null && byId[n.right]) queue.push([n.right, d + 1]);
      }
    }
  }

  const order = [];
  function inorder(id) {
    if (id === null || id === undefined) return;
    const n = byId[id];
    if (!n) return;
    inorder(n.left);
    order.push(id);
    inorder(n.right);
  }
  if (step.rootId !== null && step.rootId !== undefined && byId[step.rootId]) inorder(step.rootId);

  const positions = {};
  order.forEach((id, idx) => {
    positions[id] = {
      x: idx * SPACING_X + SPACING_X / 2 + 20,
      y: START_Y + (depth[id] || 0) * LEVEL_H,
    };
  });

  const maxDepth = Math.max(0, ...Object.values(depth), 0);
  const width    = Math.max(order.length * SPACING_X + 40, 260);
  const height   = START_Y + maxDepth * LEVEL_H + NODE_H + 40;
  return { positions, edges: step.edges || [], width, height };
});

function pos(id) {
  return treeLayout.value.positions[id] || { x: 0, y: 0 };
}

function edgeCoords(e) {
  const pFrom    = pos(e.from);
  const pTo      = pos(e.to);
  const fromNode = nodesById.value[e.from];
  const isLeft   = fromNode && fromNode.left === e.to;
  return {
    x1: isLeft ? pFrom.x - 40 : pFrom.x + 40,
    y1: pFrom.y,
    x2: pTo.x,
    y2: pTo.y - NODE_BOX_H / 2,
  };
}

function getPointerBadgesForNode(id) {
  const step = currentStep.value;
  if (!step) return [];
  const ptrs = [];
  if (step.rootId    === id) ptrs.push({ name: 'root',    label: 'root',    color: '#3b82f6' });
  if (step.currId    === id) ptrs.push({ name: 'curr',    label: 'curr',    color: '#f97316' });
  if (step.updatedId === id) ptrs.push({ name: 'updated', label: 'updated', color: '#22c55e' });

  const count = ptrs.length;
  if (count === 0) return [];
  const nodeX = pos(id).x;
  const nodeY = pos(id).y;
  return ptrs.map((p, i) => {
    let xOffset = (i - (count - 1) / 2) * 44;
    return { ...p, x: nodeX + xOffset, yText: nodeY - NODE_BOX_H / 2 - 22, yArrow: nodeY - NODE_BOX_H / 2 - 8 };
  });
}

function nodeState(n) {
  const step = currentStep.value;
  if (!step) return 'normal';
  if (step.updatedId === n.id) return 'updated';
  if (step.currId    === n.id) return 'current';
  if ((step.visitedArr || []).includes(n.id)) return 'visited';
  return 'normal';
}

/* ------------------------------------------------------------------ */
/* Playback controls                                                   */
/* ------------------------------------------------------------------ */
function applyInput() {
  const arr = inpElems.value
    .trim().split(/\s+/).filter(Boolean).map(Number).filter(n => Number.isFinite(n));
  const oldV = parseInt(inpOldVal.value) || 0;
  const newV = parseInt(inpNewVal.value) || 0;
  clearTimeout(playTimer);
  playing.value = false;
  if (!arr.length) { steps.value = []; si.value = 0; return; }
  const { nodes, edges, rootId } = buildLevelOrderTree(arr);
  steps.value = buildSteps(nodes, edges, rootId, oldV, newV);
  si.value = 0;
}

function stepBy(n) {
  if (!steps.value.length) return;
  si.value = Math.min(steps.value.length - 1, Math.max(0, si.value + n));
}

function tick() {
  if (si.value >= steps.value.length - 1) { playing.value = false; clearTimeout(playTimer); return; }
  si.value++;
  playTimer = setTimeout(tick, speed.value);
}

function togglePlay() {
  if (!steps.value.length) return;
  if (playing.value) { playing.value = false; clearTimeout(playTimer); return; }
  if (si.value >= steps.value.length - 1) si.value = 0;
  playing.value = true;
  tick();
}

watch(speed, nv => { if (playing.value) { clearTimeout(playTimer); playTimer = setTimeout(tick, nv); } });

/* ------------------------------------------------------------------ */
/* Resizers                                                            */
/* ------------------------------------------------------------------ */
function initHResizer() {
  const rsz = hResizerRef.value;
  if (!rsz) return;
  let dragging = false, startX = 0, startW = 0;
  const onDown = e => { dragging = true; startX = e.clientX; startW = leftWidth.value; rsz.classList.add('drag'); document.body.style.userSelect = 'none'; };
  const onMove = e => { if (!dragging) return; const cW = rsz.parentElement.getBoundingClientRect().width; leftWidth.value = Math.max(20, Math.min(80, startW + ((e.clientX - startX) / cW) * 100)); };
  const onUp   = () => { if (!dragging) return; dragging = false; rsz.classList.remove('drag'); document.body.style.userSelect = ''; };
  rsz.addEventListener('mousedown', onDown);
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
  return () => { rsz.removeEventListener('mousedown', onDown); document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
}

function initVResizer(refElem, valueRef, minH, maxH) {
  const rsz = refElem.value;
  if (!rsz) return;
  let dragging = false, startY = 0, startH = 0;
  const onDown = e => { dragging = true; startY = e.clientY; startH = valueRef.value; rsz.classList.add('drag'); document.body.style.userSelect = 'none'; };
  const onMove = e => { if (!dragging) return; valueRef.value = Math.max(minH, Math.min(maxH, startH + (e.clientY - startY))); };
  const onUp   = () => { if (!dragging) return; dragging = false; rsz.classList.remove('drag'); document.body.style.userSelect = ''; };
  rsz.addEventListener('mousedown', onDown);
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
  return () => { rsz.removeEventListener('mousedown', onDown); document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
}

let cleanupFns = [];

function onKeydown(e) {
  if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
  if (e.key === 'ArrowRight') stepBy(1);
  else if (e.key === 'ArrowLeft') stepBy(-1);
  else if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown);
  cleanupFns.push(initHResizer());
  cleanupFns.push(initVResizer(vizResizerRef,   vizHeight,   160, 480));
  cleanupFns.push(initVResizer(tableResizerRef, tableHeight, 50,  200));
  applyInput();
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
      <img src="../../assets/logo.png" alt="Logo" />
    </div>

    <div class="slide-body">
      <div class="row-main">
        <div class="ll-root">

          <!-- TOOLBAR -->
          <div class="ll-toolbar">
            <label>Elements</label>
            <input type="text" v-model="inpElems" placeholder="e.g. 1 2 3 4 5 6 7" class="ll-text-input" @keyup.enter="applyInput" />
            <label>Old Val</label>
            <input type="number" v-model.number="inpOldVal" class="ll-num-input" @keyup.enter="applyInput" />
            <label>New Val</label>
            <input type="number" v-model.number="inpNewVal" class="ll-num-input" @keyup.enter="applyInput" />
            <button class="ll-viz-btn" @click="applyInput">&#9654; Visualize</button>

            <div class="ll-nav-controls">
              <button class="ll-nav-btn" title="First step" @click="stepBy(-steps.length)">&#171;</button>
              <button class="ll-nav-btn" @click="stepBy(-1)">&#8249; Prev</button>
              <button class="ll-play-btn" @click="togglePlay">{{ playing ? '⏸ Pause' : '▶ Play' }}</button>
              <button class="ll-nav-btn" @click="stepBy(1)">Next &#8250;</button>
              <button class="ll-nav-btn" title="Last step" @click="stepBy(steps.length)">&#187;</button>
            </div>
          </div>

          <!-- MAIN -->
          <div class="ll-main" ref="mainRef">
            <div class="ll-left-col" ref="leftColRef" :style="{ width: leftWidth + '%' }">

              <!-- VIZ -->
              <div class="ll-viz-wrap" :style="{ height: vizHeight + 'px' }">
                <div class="ll-perm-area">
                  <div class="ll-ptrs">
                    <div class="ll-ptr-chip">target = <b class="ll-c-coral">{{ inpOldVal }}</b></div>
                    <div class="ll-ptr-chip">newVal = <b class="ll-c-green">{{ inpNewVal }}</b></div>
                    <div class="ll-ptr-chip">root = <b class="ll-c-blue">{{ fmt(s.rootId !== null && s.rootId !== undefined ? ADDR(s.rootId) : null) }}</b></div>
                    <div v-if="s.currId !== null && s.currId !== undefined" class="ll-ptr-chip">curr = <b class="ll-c-orange">{{ fmt(ADDR(s.currId)) }}</b></div>
                    <div v-if="s.updatedId !== null && s.updatedId !== undefined" class="ll-ptr-chip bs-found-chip">&#10003; Value Updated Successfully!</div>
                    <div v-if="s.code === 'c_notFound'" class="ll-ptr-chip bs-notfound-chip">&#10007; Target Not Found</div>
                  </div>

                  <svg class="ll-svg"
                    :viewBox="`0 0 ${treeLayout.width} ${treeLayout.height}`"
                    :width="treeLayout.width" :height="treeLayout.height">

                    <line v-for="(e, i) in treeLayout.edges" :key="'e-' + i"
                      :x1="edgeCoords(e).x1" :y1="edgeCoords(e).y1"
                      :x2="edgeCoords(e).x2" :y2="edgeCoords(e).y2"
                      class="bt-edge-line" />

                    <g v-for="n in s.nodes" :key="'ptrs' + n.id">
                      <template v-for="p in getPointerBadgesForNode(n.id)" :key="p.name">
                        <text :x="p.x" :y="p.yText" text-anchor="middle" :fill="p.color" class="heap-ptr-txt">{{ p.label }}</text>
                        <text :x="p.x" :y="p.yArrow" text-anchor="middle" :fill="p.color" class="heap-ptr-arrow">&#8595;</text>
                      </template>
                    </g>

                    <foreignObject v-for="n in s.nodes" :key="'n' + n.id"
                      :x="pos(n.id).x - NODE_W / 2" :y="pos(n.id).y - NODE_BOX_H / 2"
                      :width="NODE_W" :height="NODE_H">
                      <div xmlns="http://www.w3.org/1999/xhtml" class="ll-node-wrap">
                        <div class="ll-box" :class="{
                          'upd-box-updated': nodeState(n) === 'updated',
                          'upd-box-current': nodeState(n) === 'current',
                          'upd-box-visited': nodeState(n) === 'visited',
                        }">
                          <div class="ll-node-top">
                            <div class="ll-ptr ll-ptr-prev"><small>left</small>{{ fmt(childAddr(n.left)) }}</div>
                            <div class="ll-data">{{ n.val }}</div>
                            <div class="ll-ptr"><small>right</small>{{ fmt(childAddr(n.right)) }}</div>
                          </div>
                        </div>
                        <div class="ll-addr-outside">@{{ n.addr }}</div>
                      </div>
                    </foreignObject>
                  </svg>
                </div>
              </div>
              <div class="ll-vresizer" ref="vizResizerRef"></div>

              <!-- LIVE QUEUE STRIP -->
              <div class="ll-queue-area">
                <span class="ll-queue-label">Queue q:</span>
                <template v-if="s.queueIds && s.queueIds.length">
                  <template v-for="(qid, qi) in s.queueIds" :key="qid + '_' + qi">
                    <span class="ll-queue-chip">
                      {{ nodesById[qid] ? nodesById[qid].val : '?' }}<span class="ll-queue-addr">&#64;{{ nodesById[qid] ? nodesById[qid].addr : '?' }}</span>
                    </span>
                    <span v-if="qi < s.queueIds.length - 1" class="ll-queue-arrow">&#8594;</span>
                  </template>
                </template>
                <span v-else class="ll-queue-empty">empty</span>
              </div>

              <!-- LEGEND -->
              <div class="ll-legend">
                <span class="ll-leg"><span class="ll-legdot ll-legdot-normal"></span>unvisited</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-current"></span>curr (comparing)</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-visited"></span>searched (no match)</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-updated"></span>value updated</span>
              </div>

              <!-- VAR FRAMES -->
              <div class="ll-table-area" :style="{ height: tableHeight + 'px' }">
                <div class="ll-table-title">Variable frames &mdash; innermost = current</div>
                <div class="ll-stack-line">
                  <template v-if="s.vars && s.vars.length">
                    <div v-for="(f, depth) in s.vars" :key="depth"
                      class="ll-frame" :class="{ 'll-frame-cur': depth === s.vars.length - 1 }"
                      :style="{ marginLeft: depth * 14 + 'px' }">
                      {{ f.title }}(<span v-for="(r, i) in f.rows" :key="i">
                        <span v-if="i > 0">, </span>
                        <span class="ll-fname">{{ r[0] }}</span>=<span
                          :class="r[2] ? 'll-c-blue' : (depth === s.vars.length - 1 ? 'll-c-orange' : 'll-c-green')"
                          style="font-weight:700">{{ r[1] }}</span>
                      </span>)<span v-if="depth === s.vars.length - 1" class="ll-now"> &#9668; current</span>
                    </div>
                  </template>
                  <template v-else>&mdash;</template>
                </div>
              </div>
              <div class="ll-vresizer" ref="tableResizerRef"></div>

              <!-- BADGE -->
              <div class="ll-badge-wrap">
                <div class="ll-badge" :class="{
                  'bs-badge-found':    s.code === 'c_updateVal' || s.code === 'c_returnTrue',
                  'bs-badge-notfound': s.code === 'c_notFound',
                }">{{ s.badge }}</div>
              </div>
            </div>

            <div class="ll-resizer" ref="hResizerRef"></div>

            <!-- CODE PANEL -->
            <div class="ll-right-col">
              <div class="ll-code-panel">
                <div class="ll-code-header">
                  <div class="ll-tabbar">
                    <button class="ll-tab-btn" :class="{ active: rightTab === 'code' }"       @click="rightTab = 'code'">Code</button>
                    <button class="ll-tab-btn" :class="{ active: rightTab === 'pseudo' }"     @click="rightTab = 'pseudo'">Pseudocode</button>
                    <button class="ll-tab-btn" :class="{ active: rightTab === 'complexity' }" @click="rightTab = 'complexity'">Complexity</button>
                  </div>
                  <select v-if="rightTab === 'code'" v-model="lang" class="ll-lang-select">
                    <option value="java">Java</option>
                    <option value="c">C</option>
                    <option value="cpp">C++</option>
                    <option value="python">Python</option>
                  </select>
                </div>

                <!-- Code tab -->
                <div v-if="rightTab === 'code'" class="ll-code-scroll">
                  <pre class="ll-pre"><span v-for="(line, i) in codeLines" :key="i"
                    class="ll-codeline" :class="{ 'll-hl': line[0] && line[0] === s.code }"
                  >{{ line[1] === '' ? ' ' : line[1] }}
</span></pre>
                </div>

                <!-- Pseudocode tab -->
                <div v-else-if="rightTab === 'pseudo'" class="ll-code-scroll">
                  <pre class="ll-pre"><span v-for="(line, i) in PSEUDOCODE" :key="i" class="ll-codeline">{{ line === '' ? ' ' : line }}
</span></pre>
                </div>

                <!-- Complexity tab -->
                <div v-else class="ll-info-scroll">
                  <h3>Time &amp; Space Complexity &mdash; Binary Tree Update Node Value</h3>
                  <table class="ll-complexity-table">
                    <thead><tr><th>Case</th><th>Time</th><th>Why</th></tr></thead>
                    <tbody>
                      <tr><td>Best Case</td><td>O(1)</td><td>Target is at the root node &mdash; updated on the first iteration.</td></tr>
                      <tr><td>Average Case</td><td>O(N)</td><td>Level Order Search: visits nodes level by level until target is found.</td></tr>
                      <tr><td>Worst Case</td><td>O(N)</td><td>Target is at the last node or not present in the tree.</td></tr>
                      <tr><td>Space Complexity (Queue)</td><td>O(W) &approx; O(N)</td><td>Queue holds at most W nodes at the widest level (up to N/2 nodes).</td></tr>
                    </tbody>
                  </table>
                  <p class="ll-note">
                    <b>BFS Search &amp; Update Pattern:</b><br/>
                    Locates the target node in level order sequence using a queue. As soon as a matching node is dequeued, its value is directly overwritten with <code>newVal</code>, and the search terminates immediately!
                  </p>
                  <h3>Algorithm Steps</h3>
                  <p>1. If <code>root == null</code>, return false.<br/>
                     2. Initialize Queue <code>q</code> and enqueue <code>root</code>.<br/>
                     3. While <code>q</code> is not empty:<br/>
                        &nbsp;&nbsp;&bull; Dequeue <code>curr = q.poll()</code>.<br/>
                        &nbsp;&nbsp;&bull; If <code>curr.data == oldVal</code> &rarr; set <code>curr.data = newVal</code> and return <b>true</b> (Value Updated!).<br/>
                        &nbsp;&nbsp;&bull; If <code>curr.left != null</code> &rarr; enqueue <code>curr.left</code>.<br/>
                        &nbsp;&nbsp;&bull; If <code>curr.right != null</code> &rarr; enqueue <code>curr.right</code>.<br/>
                     4. Return <b>false</b> (Target Not Found).</p>
                </div>
              </div>
            </div>
          </div>

          <!-- FOOTER -->
          <div class="ll-footer">
            Step {{ si + 1 }} / {{ steps.length || 1 }}
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
  --blue: #3b82f6; --blue-light: #eff6ff;
  --green: #22c55e; --green-light: #f0fdf4;
  --orange: #f97316; --orange-light: #fff7ed;
  --node: #1d4ed8; --nodeUpdated: #15803d; --nodeCur: #c2410c; --nodeVisited: #64748b;
  --shadow-sm: 0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04);
  --radius: 8px; --radius-sm: 6px;
  background: var(--bg); color: var(--text);
  font-family: 'Segoe UI', system-ui, sans-serif; font-size: 13px;
  display: flex; flex-direction: column; height: 50vh; min-height: 600px; overflow: hidden; width: 100%;
}
@keyframes ll-pop { from { transform: scale(.3); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.slide-wrapper { margin-top: -10px; margin-left: -30px; width: 107%; max-height: 100%; font-size: 0.8rem; font-weight: 400; }
.slide-body { display: flex; flex-direction: column; border-radius: 4px; height: 100%; }
.navbar { display: flex; flex-direction: row; justify-content: space-between; align-items: center; gap: 0.75rem; padding: 0 10px; background-color: #ffffff; position: fixed; width: 94.7%; z-index: 10; }
.navbar > img { height: 30px; }
.navbar-title { margin: 0; font-size: 1.5rem; font-weight: 700; background-color: #ef5050; color: #ffffff; width: 80%; padding-left: 10px; margin-left: -10px; border-radius: 5px; }
.row-main { width: 100%; height: 90%; margin-top: 37px; overflow-x: auto; overflow-y: auto; scrollbar-width: thin; }
.ll-toolbar { display: flex; align-items: center; gap: 8px; padding: 7px 16px; background: var(--surface); border-bottom: 1px solid var(--border); flex-shrink: 0; flex-wrap: wrap; box-shadow: var(--shadow-sm); }
.ll-toolbar label { font-size: 11px; color: var(--muted); white-space: nowrap; font-weight: 500; }
.ll-num-input, .ll-text-input { background: var(--surface); border: 1px solid var(--border2); color: var(--text); border-radius: var(--radius-sm); padding: 5px 8px; font-size: 13px; font-family: monospace; transition: border-color .15s; }
.ll-num-input { width: 60px; }
.ll-text-input { width: 180px; padding: 5px 10px; }
.ll-num-input:focus, .ll-text-input:focus { outline: none; border-color: var(--coral); box-shadow: 0 0 0 3px rgba(240,77,77,.1); }
.ll-viz-btn { background: var(--coral); color: #fff; border: none; padding: 6px 16px; border-radius: var(--radius-sm); cursor: pointer; font-size: 12px; font-weight: 600; box-shadow: var(--shadow-sm); transition: filter .15s; }
.ll-viz-btn:hover { filter: brightness(1.08); }
.ll-nav-controls { display: flex; margin-left: auto; align-items: center; gap: 4px; flex-shrink: 0; }
.ll-nav-btn { background: var(--surface2); border: 1px solid var(--border2); color: var(--text2); padding: 5px 11px; border-radius: var(--radius-sm); cursor: pointer; font-size: 12px; font-weight: 500; transition: all .15s; white-space: nowrap; }
.ll-nav-btn:hover { background: var(--surface); border-color: var(--coral); color: var(--coral); }
.ll-play-btn { background: var(--blue-light); border: 1px solid var(--blue); color: var(--blue); min-width: 72px; font-weight: 600; padding: 5px 11px; border-radius: var(--radius-sm); cursor: pointer; font-size: 12px; transition: all .15s; }
.ll-play-btn:hover { background: var(--blue); color: #fff; }
.ll-main { display: flex; flex: 1; overflow: hidden; position: relative; }
.ll-left-col { display: flex; flex-direction: column; overflow: hidden; min-width: 200px; max-width: 72%; }
.ll-resizer { width: 5px; cursor: col-resize; background: var(--border); flex-shrink: 0; transition: background .15s; position: relative; z-index: 20; }
.ll-resizer:hover, .ll-resizer.drag { background: var(--coral); }
.ll-right-col { display: flex; flex-direction: column; flex: 1; overflow: hidden; min-width: 200px; min-height: 0; }
.ll-viz-wrap { flex-shrink: 0; background: var(--surface); border-bottom: 1px solid var(--border); position: relative; overflow: auto; }
.ll-perm-area { display: flex; flex-direction: column; align-items: flex-start; min-height: 100%; }
.ll-ptrs { display: flex; gap: 8px; flex-wrap: wrap; padding: 10px 16px 4px; min-height: 36px; }
.ll-ptr-chip { background: var(--surface2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 3px 10px; font-size: 12px; font-family: monospace; box-shadow: var(--shadow-sm); }
.bs-found-chip    { background: var(--green-light); border-color: var(--green); color: #15803d; font-weight: 700; }
.bs-notfound-chip { background: #fff7ed; border-color: var(--orange); color: #9a3412; font-weight: 700; }
.ll-c-blue   { color: var(--blue); }
.ll-c-orange { color: var(--orange); }
.ll-c-green  { color: var(--green); font-weight: 700; }
.ll-c-coral  { color: var(--coral); font-weight: 700; }
.ll-svg { display: block; }
.bt-edge-line { stroke: #cbd5e1; stroke-width: 2px; }
.heap-ptr-txt   { font-size: 12px; font-weight: 800; font-family: 'Consolas', 'Fira Code', monospace; }
.heap-ptr-arrow { font-size: 14px; font-weight: 900; font-family: system-ui, sans-serif; }
.ll-node-wrap { display: flex; flex-direction: column; align-items: center; width: 100%; height: 100%; }
.ll-box { display: flex; flex-direction: column; border: 2px solid var(--blue); border-radius: var(--radius-sm); overflow: hidden; background: var(--node); width: 100%; height: 44px; color: #fff; animation: ll-pop .3s ease; box-shadow: var(--shadow-sm); transition: background .3s, border-color .3s, box-shadow .3s; }
.upd-box-updated { border-color: #22c55e !important; background: var(--nodeUpdated) !important; box-shadow: 0 0 0 4px rgba(34,197,94,.4) !important; }
.upd-box-current { border-color: var(--orange) !important; background: var(--nodeCur) !important; box-shadow: 0 0 0 3px rgba(249,115,22,.25) !important; }
.upd-box-visited { border-color: #94a3b8 !important; background: var(--nodeVisited) !important; opacity: 0.7; }
.ll-node-top { display: flex; flex: 1; width: 100%; height: 100%; }
.ll-data { padding: 4px 8px; font-weight: 700; font-size: 15px; display: flex; align-items: center; justify-content: center; flex: 1.2; }
.ll-ptr { padding: 2px 4px; background: rgba(0,0,0,.2); font-size: 10px; color: rgba(255,255,255,.85); border-left: 1px solid rgba(255,255,255,.15); font-family: 'Consolas', monospace; display: flex; flex-direction: column; align-items: center; justify-content: center; line-height: 1.1; flex: 1; }
.ll-ptr-prev { border-left: none; border-right: 1px solid rgba(255,255,255,.15); }
.ll-ptr small { color: rgba(255,255,255,.5); font-size: 9px; }
.ll-addr-outside { font-size: 11px; font-weight: 600; font-family: 'Consolas', 'Fira Code', monospace; color: #475569; margin-top: 3px; text-align: center; line-height: 1; white-space: nowrap; }
.ll-vresizer { height: 5px; cursor: row-resize; background: var(--border); flex-shrink: 0; transition: background .15s; position: relative; z-index: 20; }
.ll-vresizer:hover, .ll-vresizer.drag { background: var(--coral); }
.ll-queue-area { display: flex; align-items: center; gap: 5px; padding: 5px 14px; border-bottom: 1px solid var(--border); flex-shrink: 0; background: var(--surface2); flex-wrap: wrap; min-height: 34px; }
.ll-queue-label { font-size: 11px; font-weight: 700; color: var(--text2); white-space: nowrap; font-family: 'Consolas', monospace; margin-right: 4px; }
.ll-queue-chip { background: var(--blue-light); border: 1.5px solid var(--blue); border-radius: var(--radius-sm); padding: 2px 8px; font-size: 11px; font-family: 'Consolas', monospace; color: var(--blue); font-weight: 700; white-space: nowrap; }
.ll-queue-addr { color: var(--muted); font-size: 10px; margin-left: 4px; }
.ll-queue-arrow { color: var(--muted); font-size: 14px; line-height: 1; }
.ll-queue-empty { color: var(--muted); font-size: 11px; font-style: italic; }
.ll-legend { display: flex; flex-wrap: wrap; gap: 6px 14px; padding: 6px 12px; border-bottom: 1px solid var(--border); flex-shrink: 0; background: var(--surface2); }
.ll-leg { display: flex; align-items: center; gap: 5px; font-size: 11px; color: var(--text2); }
.ll-legdot { width: 11px; height: 11px; border-radius: 3px; flex-shrink: 0; display: inline-block; }
.ll-legdot-normal  { background: var(--node);        border: 1.5px solid var(--blue); }
.ll-legdot-current { background: var(--nodeCur);     border: 1.5px solid var(--orange); }
.ll-legdot-visited { background: var(--nodeVisited); border: 1.5px solid #94a3b8; opacity: .75; }
.ll-legdot-updated { background: var(--nodeUpdated); border: 1.5px solid var(--green); }
.ll-table-area { flex-shrink: 0; padding: 8px 14px; border-bottom: 1px solid var(--border); overflow: auto; background: var(--surface); }
.ll-table-title { font-size: 10px; color: var(--muted); margin-bottom: 4px; font-style: italic; }
.ll-stack-line { font-family: 'Consolas', monospace; font-size: 12px; line-height: 1.8; }
.ll-frame { font-family: 'Consolas', monospace; font-size: 11.5px; color: var(--text2); padding: 1px 0; white-space: nowrap; }
.ll-frame-cur { color: var(--orange); background: var(--orange-light); border-radius: 4px; padding: 1px 5px; }
.ll-fname { color: var(--text2); }
.ll-now { color: var(--orange); font-size: 10px; margin-left: 6px; }
.ll-badge-wrap { padding: 6px 10px; border-bottom: 1px solid var(--border); flex-shrink: 0; min-height: 36px; display: flex; align-items: center; background: var(--surface); }
.ll-badge { display: inline-block; padding: 4px 12px; border-radius: var(--radius-sm); border-left: 3px solid var(--coral); background: var(--coral-light); font-size: 11px; color: var(--coral-dark); line-height: 1.4; word-break: break-word; font-weight: 500; }
.bs-badge-found    { border-left-color: var(--green) !important; background: var(--green-light) !important; color: #166534 !important; }
.bs-badge-notfound { border-left-color: #f97316 !important; background: #fff7ed !important; color: #9a3412 !important; }
.ll-code-panel { display: flex; flex-direction: column; height: 75%; overflow: hidden; }
.ll-code-header { display: flex; align-items: center; gap: 8px; padding: 8px 14px; background: var(--surface); border-bottom: 1px solid var(--border); flex-shrink: 0; box-shadow: var(--shadow-sm); flex-wrap: wrap; }
.ll-tabbar { display: flex; gap: 4px; flex-wrap: wrap; }
.ll-tab-btn { background: var(--surface2); border: 1px solid var(--border2); color: var(--text2); padding: 5px 11px; border-radius: var(--radius-sm); cursor: pointer; font-size: 11px; font-weight: 600; transition: all .15s; white-space: nowrap; }
.ll-tab-btn:hover { border-color: var(--coral); color: var(--coral); }
.ll-tab-btn.active { background: var(--coral); border-color: var(--coral); color: #fff; }
.ll-lang-select { background: var(--surface2); border: 1px solid var(--border2); color: var(--text); padding: 5px 28px 5px 10px; border-radius: var(--radius-sm); font-size: 12px; font-weight: 500; cursor: pointer; min-width: 110px; margin-left: auto; transition: border-color .15s; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2394a3b8'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; }
.ll-lang-select:focus { outline: none; border-color: var(--coral); box-shadow: 0 0 0 3px rgba(240,77,77,.1); }
.ll-code-scroll { flex: 1; overflow: auto; min-height: 0; padding: 14px 16px; background: #f8fafc; scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent; }
.ll-pre { font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace; font-size: 12px; line-height: 1.65; white-space: pre; color: var(--text); margin: 0; }
.ll-codeline { display: block; margin: 0 -16px; padding: 0 16px; }
.ll-hl { background: #dcfce7; color: #15803d; border-radius: 3px; border-left: 2px solid var(--green); }
.ll-info-scroll { flex: 1; overflow: auto; min-height: 0; padding: 16px 20px; background: var(--surface); color: var(--text2); font-size: 13px; line-height: 1.6; }
.ll-info-scroll h3 { margin: 0 0 10px; color: var(--text); font-size: 14px; font-weight: 700; }
.ll-info-scroll h3:not(:first-child) { margin-top: 18px; }
.ll-info-scroll p { margin: 0 0 10px; }
.ll-info-scroll b { color: var(--text); }
.ll-info-scroll code { background: var(--surface2); border: 1px solid var(--border); border-radius: 4px; padding: 1px 5px; font-family: 'Consolas', monospace; font-size: 12px; color: var(--coral-dark); }
.ll-complexity-table { width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 12.5px; }
.ll-complexity-table th, .ll-complexity-table td { border: 1px solid var(--border); padding: 8px 10px; text-align: left; }
.ll-complexity-table th { background: var(--surface2); color: var(--text); font-weight: 700; }
.ll-complexity-table td:nth-child(2) { font-family: 'Consolas', monospace; font-weight: 700; color: var(--coral-dark); white-space: nowrap; }
.ll-note { background: var(--orange-light); border-left: 3px solid var(--orange); border-radius: var(--radius-sm); padding: 8px 12px; font-size: 12.5px; color: var(--text2); margin-bottom: 10px; }
.ll-footer { padding: 4px 16px; font-size: 11px; color: var(--muted); border-top: 1px solid var(--border); background: var(--surface); flex-shrink: 0; display: flex; align-items: center; }
.ll-speed-wrap { display: flex; align-items: center; gap: 5px; margin-left: 16px; }
.ll-speed-wrap input[type=range] { width: 90px; accent-color: var(--coral); }
</style>
