<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';

const props = defineProps({
  topic:    { type: String, default: 'Binary Search Tree — Largest Element' },
  subTopic: { type: String, default: 'Rightmost Node Traversal' },
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
    ['',              'class BST {'],
    ['',              '    Node root;'],
    ['',              ''],
    ['c_call',        '    int findLargest(Node root) {'],
    ['c_nullCheck',   '        if (root == null) {'],
    ['c_nullReturn',  '            return -1; // Tree is Empty'],
    ['',              '        }'],
    ['c_initCurr',    '        Node curr = root;'],
    ['c_whileLoop',   '        while (curr.right != null) {'],
    ['c_moveRight',   '            curr = curr.right;'],
    ['',              '        }'],
    ['c_return',      '        return curr.data;'],
    ['',              '    }'],
    ['',              ''],
    ['c_main',        '    public static void main(String[] args) {'],
    ['c_main',        '        BST tree = new BST();'],
    ['c_main',        '        // ... build BST ...'],
    ['c_main',        '        int largest = tree.findLargest(tree.root);'],
    ['c_main',        '        System.out.println("Largest Element: " + largest);'],
    ['c_main',        '    }'],
    ['',              '}'],
  ],
  c: [
    ['c_call',        'int findLargest(struct Node* root) {'],
    ['c_nullCheck',   '    if (root == NULL) {'],
    ['c_nullReturn',  '        return -1; // Tree is Empty'],
    ['',              '    }'],
    ['c_initCurr',    '    struct Node* curr = root;'],
    ['c_whileLoop',   '    while (curr->right != NULL) {'],
    ['c_moveRight',   '        curr = curr->right;'],
    ['',              '    }'],
    ['c_return',      '    return curr->data;'],
    ['',              '}'],
    ['',              ''],
    ['c_main',        'int main() {'],
    ['c_main',        '    // ... build BST ...'],
    ['c_main',        '    int largest = findLargest(root);'],
    ['c_main',        '    printf("Largest Element: %d\\n", largest);'],
    ['c_main',        '    return 0;'],
    ['',              '}'],
  ],
  cpp: [
    ['c_call',        'int findLargest(Node* root) {'],
    ['c_nullCheck',   '    if (root == nullptr) {'],
    ['c_nullReturn',  '        return -1; // Tree is Empty'],
    ['',              '    }'],
    ['c_initCurr',    '    Node* curr = root;'],
    ['c_whileLoop',   '    while (curr->right != nullptr) {'],
    ['c_moveRight',   '        curr = curr->right;'],
    ['',              '    }'],
    ['c_return',      '    return curr->data;'],
    ['',              '}'],
    ['',              ''],
    ['c_main',        'int main() {'],
    ['c_main',        '    // ... build BST ...'],
    ['c_main',        '    int largest = findLargest(root);'],
    ['c_main',        '    cout << "Largest Element: " << largest << endl;'],
    ['c_main',        '    return 0;'],
    ['',              '}'],
  ],
  python: [
    ['c_call',        'def find_largest(root):'],
    ['c_nullCheck',   '    if root is None:'],
    ['c_nullReturn',  '        return None'],
    ['c_initCurr',    '    curr = root'],
    ['c_whileLoop',   '    while curr.right is not None:'],
    ['c_moveRight',   '        curr = curr.right'],
    ['c_return',      '    return curr.data'],
    ['',              ''],
    ['c_main',        '# build BST ...'],
    ['c_main',        'largest = find_largest(root)'],
    ['c_main',        'print("Largest Element:", largest)'],
  ],
};

const PSEUDOCODE = [
  'procedure findLargest(root):',
  '    if root is null:',
  '        return null          // Tree is Empty',
  '',
  '    curr = root',
  '',
  '    while curr.right != null:',
  '        curr = curr.right    // Traverse to right child',
  '',
  '    return curr.data         // Rightmost node contains largest value',
];

function frame(title, rows) { return { title, rows }; }

function parseInputTokens(inputStr) {
  const raw = inputStr.trim().split(/[\s,]+/).filter(Boolean).slice(0, 15);
  return raw.map(tok => {
    const lower = tok.toLowerCase();
    if (lower === 'null' || lower === 'n' || lower === 'none' || tok === '-') {
      return null;
    }
    const num = Number(tok);
    return Number.isFinite(num) ? num : null;
  });
}

function buildBST(values) {
  const nodes = [];
  const edges = [];
  const validVals = values.filter(v => v !== null);
  if (!validVals.length) return { nodes, edges, rootId: null };

  nodes.push({ id: 0, val: validVals[0], left: null, right: null, addr: ADDR(0) });
  const rootId = 0;

  for (let i = 1; i < validVals.length; i++) {
    const val = validVals[i];
    const newNodeId = nodes.length;
    nodes.push({ id: newNodeId, val, left: null, right: null, addr: ADDR(newNodeId) });

    let curr = nodes[0];
    while (true) {
      if (val < curr.val) {
        if (curr.left === null) {
          curr.left = newNodeId;
          edges.push({ from: curr.id, to: newNodeId });
          break;
        } else {
          curr = nodes[curr.left];
        }
      } else {
        if (curr.right === null) {
          curr.right = newNodeId;
          edges.push({ from: curr.id, to: newNodeId });
          break;
        } else {
          curr = nodes[curr.right];
        }
      }
    }
  }

  return { nodes, edges, rootId };
}

function buildSteps(nodes, edges, rootId) {
  const steps    = [];
  const nodesMap = {};
  nodes.forEach(n => (nodesMap[n.id] = n));

  const visitedList = [];
  let largestVal = null;
  let foundId = null;
  let isEmpty = false;
  let isDone = false;

  function snap(currId, badge, code) {
    const varRows = [
      ['root', rootId !== null ? fmt(ADDR(rootId)) : 'null', true],
      ...(currId !== null && currId !== undefined ? [['curr', fmt(ADDR(currId)), true]] : []),
    ];
    if (currId !== null && currId !== undefined && nodesMap[currId]) {
      varRows.push(['curr.data', '' + nodesMap[currId].val]);
    }
    if (largestVal !== null) {
      varRows.push(['largest', '' + largestVal]);
    }

    steps.push({
      nodes:       nodes.map(n => ({ ...n })),
      edges:       edges.map(e => ({ ...e })),
      rootId,
      currId:      currId ?? null,
      foundId:     foundId ?? null,
      visitedList: [...visitedList],
      badge,
      code,
      largestVal,
      isEmpty,
      isDone,
      vars:        [frame('findLargest(root)', varRows)],
    });
  }

  if (rootId === null) {
    isEmpty = true;
    isDone = true;
    snap(null, 'main(): Call findLargest(root = null).', 'c_main');
    snap(null, 'Call findLargest(root = null)', 'c_call');
    snap(null, 'Check: root == null? → TRUE (Tree is Empty)', 'c_nullCheck');
    snap(null, 'root is null → Return null / -1. Tree is Empty.', 'c_nullReturn');
    return steps;
  }

  snap(null, 'main(): Start finding largest element by calling findLargest(root).', 'c_main');
  snap(null, `Call findLargest(root = @${ADDR(rootId)})`, 'c_call');
  snap(null, `Check: root == null? → FALSE (Tree is non-empty)`, 'c_nullCheck');

  let currId = rootId;
  snap(currId, `curr = root → Initialize pointer curr at root node (@${ADDR(currId)}, val=${nodesMap[currId].val}).`, 'c_initCurr');

  while (currId !== null && currId !== undefined) {
    visitedList.push(currId);
    const currNode = nodesMap[currId];
    const rightExist = currNode.right !== null && currNode.right !== undefined;

    snap(currId,
      `Check: curr.right != null? → ${rightExist ? `TRUE (@${ADDR(currNode.right)}, val=${nodesMap[currNode.right].val}). Right child exists.` : 'FALSE (curr.right is null). Rightmost node reached!'}`,
      'c_whileLoop'
    );

    if (rightExist) {
      currId = currNode.right;
      snap(currId, `curr = curr.right → Traverse to right child @${ADDR(currId)} (val=${nodesMap[currId].val}).`, 'c_moveRight');
    } else {
      largestVal = currNode.val;
      foundId = currId;
      snap(currId, `Rightmost node reached at @${ADDR(currId)} (val=${largestVal}). Largest Element in BST = ${largestVal}.`, 'c_return');
      break;
    }
  }

  isDone = true;
  snap(foundId, `Search complete! Largest Element in Binary Search Tree = ${largestVal}.`, 'c_main');
  return steps;
}

const inpElems  = ref('5 3 7 2 4 6 8');
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
  nodes: [], edges: [], vars: [], badge: '', rootId: null, currId: null, foundId: null, visitedList: [], largestVal: null, isEmpty: false, isDone: false,
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

const vizContainerW = ref(640);
const vizContainerH = ref(320);
const vizSvgRef     = ref(null);
let   vizRO         = null;

const NODE_W = 132, NODE_BOX_H = 44, NODE_H = 68;
const MAX_COLS = 7, MAX_DEPTH = 2, SPACING_X = 70, LEVEL_H = 80;
const PAD_TOP = 35, PAD_BOTTOM = 0, PAD_SIDE = 50;
const START_Y = PAD_TOP + NODE_BOX_H / 2;
const TREE_W = PAD_SIDE + MAX_COLS * SPACING_X;
const FIXED_TOTAL_W = TREE_W + PAD_SIDE;
const FIXED_TOTAL_H = START_Y + MAX_DEPTH * LEVEL_H + NODE_H / 2 + PAD_BOTTOM;
const FIXED_VIEWBOX = '0 0 ' + FIXED_TOTAL_W + ' ' + FIXED_TOTAL_H;

const treeLayout = computed(() => {
  const step = currentStep.value;
  if (!step || !step.nodes || !step.nodes.length) {
    return { positions: {}, edges: [], viewBox: FIXED_VIEWBOX, nodeW: NODE_W, nodeBoxH: NODE_BOX_H, nodeH: NODE_H };
  }

  const nodesMap = {};
  step.nodes.forEach(n => {
    nodesMap[n.id] = { ...n };
  });

  const rootId = step.rootId;
  if (rootId === null || rootId === undefined || !nodesMap[rootId]) {
    return { positions: {}, edges: step.edges || [], viewBox: FIXED_VIEWBOX, nodeW: NODE_W, nodeBoxH: NODE_BOX_H, nodeH: NODE_H };
  }

  function assignDepth(id, depth) {
    if (id === null || id === undefined || !nodesMap[id]) return;
    nodesMap[id].depth = depth;
    assignDepth(nodesMap[id].left, depth + 1);
    assignDepth(nodesMap[id].right, depth + 1);
  }
  assignDepth(rootId, 0);

  const inOrderNodes = [];
  function inOrder(id) {
    if (id === null || id === undefined || !nodesMap[id]) return;
    inOrder(nodesMap[id].left);
    inOrderNodes.push(id);
    inOrder(nodesMap[id].right);
  }
  inOrder(rootId);

  const rawX = {};
  const SPACING = 90;
  inOrderNodes.forEach((id, idx) => {
    rawX[id] = idx * SPACING;
  });

  function adjustParentX(id) {
    if (id === null || id === undefined || !nodesMap[id]) return;
    const node = nodesMap[id];
    adjustParentX(node.left);
    adjustParentX(node.right);

    if (node.left !== null && node.left !== undefined && nodesMap[node.left] &&
        node.right !== null && node.right !== undefined && nodesMap[node.right]) {
      rawX[id] = (rawX[node.left] + rawX[node.right]) / 2;
    }
  }
  adjustParentX(rootId);

  let minX = Infinity, maxX = -Infinity, maxDepth = 0;
  inOrderNodes.forEach(id => {
    if (rawX[id] < minX) minX = rawX[id];
    if (rawX[id] > maxX) maxX = rawX[id];
    if ((nodesMap[id].depth || 0) > maxDepth) maxDepth = nodesMap[id].depth;
  });

  const PAD_SIDE = 70;
  const CANVAS_W = 640;
  const contentW = (maxX - minX) + 2 * PAD_SIDE;
  const shiftX = Math.max(0, (CANVAS_W - contentW) / 2);
  const totalW = Math.max(CANVAS_W, contentW);
  const totalH = Math.max(320, START_Y + maxDepth * LEVEL_H + NODE_H / 2 + 20);

  const positions = {};
  inOrderNodes.forEach(id => {
    const node = nodesMap[id];
    positions[id] = {
      x: rawX[id] - minX + PAD_SIDE + shiftX,
      y: START_Y + (node.depth || 0) * LEVEL_H,
    };
  });

  const viewBox = '0 0 ' + totalW + ' ' + totalH;

  return {
    positions,
    edges: step.edges || [],
    viewBox,
    nodeW: NODE_W,
    nodeBoxH: NODE_BOX_H,
    nodeH: NODE_H,
    spacingX: SPACING,
    levelH: LEVEL_H,
    treeWidth: totalW
  };
});

function pos(id) { return treeLayout.value.positions[id] || { x: 0, y: 0 }; }
function edgeCoords(e) {
  const pFrom = pos(e.from), pTo = pos(e.to);
  const fromNode = nodesById.value[e.from];
  const isLeft = fromNode && fromNode.left === e.to;
  const hw = (treeLayout.value.nodeW || 132) / 2 * 0.6;
  const nbh = treeLayout.value.nodeBoxH || 44;
  return { x1: isLeft ? pFrom.x - hw : pFrom.x + hw, y1: pFrom.y, x2: pTo.x, y2: pTo.y - nbh / 2 };
}
function getPointerBadgesForNode(id) {
  const step = currentStep.value;
  if (!step) return [];
  const ptrs = [];
  if (step.rootId === id) ptrs.push({ name: 'root', label: 'root', color: '#3b82f6' });
  if (step.currId === id) ptrs.push({ name: 'curr', label: 'curr', color: '#f97316' });
  const count = ptrs.length;
  if (!count) return [];
  const nodeX = pos(id).x, nodeY = pos(id).y;
  const nbh = treeLayout.value.nodeBoxH || 44;
  const spread = Math.min(30, (treeLayout.value.nodeW || 132) * 0.22);
  return ptrs.map((p, i) => {
    let xOffset = 0;
    if (count === 2) xOffset = i === 0 ? -spread : spread;
    return { ...p, x: nodeX + xOffset, yText: nodeY - nbh / 2 - 22, yArrow: nodeY - nbh / 2 - 8 };
  });
}
function nodeBoxClass(n) {
  const step = currentStep.value;
  if (!step) return '';
  if (step.foundId === n.id) return 'bst-box-found';
  if (step.currId === n.id) return 'bt-box-cur';
  if ((step.visitedList || []).includes(n.id)) return 'bst-box-visited';
  return '';
}

function applyInput() {
  const tokens = parseInputTokens(inpElems.value);
  clearTimeout(playTimer);
  playing.value = false;
  if (!tokens.length) { steps.value = []; si.value = 0; return; }
  const { nodes, edges, rootId } = buildBST(tokens);
  steps.value = buildSteps(nodes, edges, rootId);
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

function initHResizer() {
  const rsz = hResizerRef.value;
  if (!rsz) return;
  let dragging = false, startX = 0, startW = 0;
  const onDown = e => { dragging = true; startX = e.clientX; startW = leftWidth.value; rsz.classList.add('drag'); document.body.style.userSelect = 'none'; };
  const onMove = e => { if (!dragging) return; const cW = rsz.parentElement.getBoundingClientRect().width; leftWidth.value = Math.max(20, Math.min(80, startW + ((e.clientX - startX) / cW) * 100)); };
  const onUp   = () => { if (!dragging) return; dragging = false; rsz.classList.remove('drag'); document.body.style.userSelect = ''; };
  rsz.addEventListener('mousedown', onDown); document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', onUp);
  return () => { rsz.removeEventListener('mousedown', onDown); document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
}
function initVResizer(refElem, valueRef, minH, maxH) {
  const rsz = refElem.value;
  if (!rsz) return;
  let dragging = false, startY = 0, startH = 0;
  const onDown = e => { dragging = true; startY = e.clientY; startH = valueRef.value; rsz.classList.add('drag'); document.body.style.userSelect = 'none'; };
  const onMove = e => { if (!dragging) return; valueRef.value = Math.max(minH, Math.min(maxH, startH + (e.clientY - startY))); };
  const onUp   = () => { if (!dragging) return; dragging = false; rsz.classList.remove('drag'); document.body.style.userSelect = ''; };
  rsz.addEventListener('mousedown', onDown); document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', onUp);
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
  cleanupFns.push(initVResizer(vizResizerRef, vizHeight, 160, 480));
  cleanupFns.push(initVResizer(tableResizerRef, tableHeight, 50, 200));
  applyInput();
  if (vizSvgRef.value) {
    vizRO = new ResizeObserver(entries => {
      for (const entry of entries) { vizContainerW.value = entry.contentRect.width || 640; vizContainerH.value = entry.contentRect.height || 320; }
    });
    vizRO.observe(vizSvgRef.value);
    const rect = vizSvgRef.value.getBoundingClientRect();
    vizContainerW.value = rect.width || 640; vizContainerH.value = rect.height || 320;
  }
});
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown);
  clearTimeout(playTimer);
  cleanupFns.forEach(fn => fn && fn());
  if (vizRO) vizRO.disconnect();
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
          <div class="ll-toolbar">
            <label>BST Elements</label>
            <input type="text" v-model="inpElems" placeholder="e.g. 5 3 7 2 4 6 8" class="ll-text-input" @keyup.enter="applyInput" />
            <button class="ll-viz-btn" @click="applyInput">&#9654; Visualize</button>
            <div class="ll-nav-controls">
              <button class="ll-nav-btn" title="First step" @click="stepBy(-steps.length)">&#171;</button>
              <button class="ll-nav-btn" @click="stepBy(-1)">&#8249; Prev</button>
              <button class="ll-play-btn" @click="togglePlay">{{ playing ? '⏸ Pause' : '▶ Play' }}</button>
              <button class="ll-nav-btn" @click="stepBy(1)">Next &#8250;</button>
              <button class="ll-nav-btn" title="Last step" @click="stepBy(steps.length)">&#187;</button>
            </div>
          </div>

          <div class="ll-main" ref="mainRef">
            <div class="ll-left-col" ref="leftColRef" :style="{ width: leftWidth + '%' }">
              <div class="ll-viz-wrap" :style="{ height: vizHeight + 'px' }">
                <div class="ll-perm-area" ref="vizSvgRef">
                  <div class="ll-ptrs">
                    <div class="ll-ptr-chip">root = <b class="ll-c-blue">{{ fmt(s.rootId !== null && s.rootId !== undefined ? ADDR(s.rootId) : null) }}</b></div>
                    <div v-if="s.currId !== null && s.currId !== undefined" class="ll-ptr-chip">curr = <b class="ll-c-orange">{{ fmt(ADDR(s.currId)) }}</b></div>
                    <div v-else-if="steps.length" class="ll-ptr-chip">curr = <b class="ll-c-orange">null</b></div>
                    <div v-if="s.isEmpty" class="ll-ptr-chip bst-empty-chip">Tree is Empty</div>
                    <div v-else-if="s.largestVal !== null" class="ll-ptr-chip bst-result-chip">Largest Element = <b>{{ s.largestVal }}</b></div>
                    <div v-else class="ll-ptr-chip bst-calculating-chip">Finding Largest…</div>
                  </div>
                  <svg class="ll-svg" :viewBox="treeLayout.viewBox" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
                    <line v-for="(e, i) in treeLayout.edges" :key="'e-' + i"
                      :x1="edgeCoords(e).x1" :y1="edgeCoords(e).y1"
                      :x2="edgeCoords(e).x2" :y2="edgeCoords(e).y2" class="bt-edge-line" />
                    <g v-for="n in s.nodes" :key="'ptrs' + n.id">
                      <template v-for="p in getPointerBadgesForNode(n.id)" :key="p.name">
                        <text :x="p.x" :y="p.yText" text-anchor="middle" :fill="p.color" class="heap-ptr-txt">{{ p.label }}</text>
                        <text :x="p.x" :y="p.yArrow" text-anchor="middle" :fill="p.color" class="heap-ptr-arrow">&#8595;</text>
                      </template>
                    </g>
                    <foreignObject v-for="n in s.nodes" :key="'n' + n.id"
                      :x="pos(n.id).x - (treeLayout.nodeW || 132) / 2" :y="pos(n.id).y - (treeLayout.nodeBoxH || 44) / 2"
                      :width="treeLayout.nodeW || 132" :height="treeLayout.nodeH || 68">
                      <div xmlns="http://www.w3.org/1999/xhtml" class="ll-node-wrap">
                        <div class="ll-box" :class="nodeBoxClass(n)">
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

              <div class="ll-legend">
                <span class="ll-leg"><span class="ll-legdot ll-legdot-normal"></span>unvisited</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-current"></span>curr pointer</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-visited"></span>visited node</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-found"></span>largest element</span>
              </div>

              <div class="ll-table-area" :style="{ height: tableHeight + 'px' }">
                <div class="ll-table-title">Call stack frames / variables</div>
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
                      </span>)
                    </div>
                  </template>
                  <template v-else>&mdash;</template>
                </div>
              </div>
              <div class="ll-vresizer" ref="tableResizerRef"></div>

              <div class="ll-badge-wrap">
                <div class="ll-badge" :class="{ 'bst-badge-done': s.isDone }">{{ s.badge }}</div>
              </div>
            </div>

            <div class="ll-resizer" ref="hResizerRef"></div>

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
                <div v-if="rightTab === 'code'" class="ll-code-scroll">
                  <pre class="ll-pre"><span v-for="(line, i) in codeLines" :key="i"
                    class="ll-codeline" :class="{ 'll-hl': line[0] && line[0] === s.code }"
                  >{{ line[1] === '' ? ' ' : line[1] }}
</span></pre>
                </div>
                <div v-else-if="rightTab === 'pseudo'" class="ll-code-scroll">
                  <pre class="ll-pre"><span v-for="(line, i) in PSEUDOCODE" :key="i" class="ll-codeline">{{ line === '' ? ' ' : line }}
</span></pre>
                </div>
                <div v-else class="ll-info-scroll">
                  <h3>Time &amp; Space Complexity &mdash; Largest Element in BST</h3>
                  <table class="ll-complexity-table">
                    <thead><tr><th>Metric</th><th>Complexity</th><th>Why</th></tr></thead>
                    <tbody>
                      <tr><td>Time Complexity (Balanced BST)</td><td>O(log N)</td><td>Traverses down the right branch of height h = log&#8322; N.</td></tr>
                      <tr><td>Time Complexity (Skewed BST)</td><td>O(N)</td><td>In a right-skewed tree, traverses all N nodes to the rightmost leaf.</td></tr>
                      <tr><td>Space Complexity</td><td>O(1)</td><td>Iterative rightward traversal requires constant auxiliary space.</td></tr>
                    </tbody>
                  </table>
                  <p class="ll-note">
                    <b>BST Invariant:</b><br/>
                    In a Binary Search Tree, for any node X, all elements in X's right subtree are strictly greater than X. Therefore, the largest element in a BST is always located at the <b>rightmost node</b> (the node with <code>right == null</code>).
                  </p>
                  <h3>Algorithm Steps</h3>
                  <p>1. Check if <code>root == null</code>. If true, return null (tree is empty).<br/>
                     2. Initialize <code>curr = root</code>.<br/>
                     3. While <code>curr.right != null</code>, set <code>curr = curr.right</code>.<br/>
                     4. Return <code>curr.data</code> as the largest element.</p>
                </div>
              </div>
            </div>
          </div>

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
  --node: #1d4ed8; --nodeCur: #c2410c; --nodeVisited: #64748b; --nodeFound: #15803d;
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
.ll-text-input { background: var(--surface); border: 1px solid var(--border2); color: var(--text); border-radius: var(--radius-sm); padding: 5px 10px; font-size: 13px; font-family: monospace; transition: border-color .15s; width: 240px; }
.ll-text-input:focus { outline: none; border-color: var(--coral); box-shadow: 0 0 0 3px rgba(240,77,77,.1); }
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
.ll-viz-wrap { flex-shrink: 0; background: var(--surface); border-bottom: 1px solid var(--border); position: relative; overflow: hidden; }
.ll-perm-area { display: flex; flex-direction: column; align-items: stretch; height: 100%; }
.ll-ptrs { display: flex; gap: 8px; flex-wrap: wrap; padding: 10px 16px 4px; min-height: 36px; }
.ll-ptr-chip { background: var(--surface2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 3px 10px; font-size: 12px; font-family: monospace; box-shadow: var(--shadow-sm); }
.bst-result-chip      { background: var(--green-light); border-color: var(--green); color: #15803d; font-weight: 700; }
.bst-calculating-chip { background: var(--orange-light); border-color: var(--orange); color: #c2410c; font-weight: 600; }
.bst-empty-chip       { background: var(--coral-light); border-color: var(--coral); color: var(--coral-dark); font-weight: 600; }
.ll-c-blue   { color: var(--blue); }
.ll-c-orange { color: var(--orange); }
.ll-c-green  { color: var(--green); }
.ll-svg { display: block; flex: 1; min-height: 0; }
.bt-edge-line { stroke: #cbd5e1; stroke-width: 2px; }
.heap-ptr-txt   { font-size: 13px; font-weight: 800; font-family: 'Consolas', 'Fira Code', monospace; }
.heap-ptr-arrow { font-size: 14px; font-weight: 900; font-family: system-ui, sans-serif; }
.ll-node-wrap { display: flex; flex-direction: column; align-items: center; width: 100%; height: 100%; }
.ll-box { display: flex; flex-direction: column; border: 2px solid var(--blue); border-radius: var(--radius-sm); overflow: hidden; background: var(--node); width: 100%; height: 44px; color: #fff; animation: ll-pop .3s ease; box-shadow: var(--shadow-sm); transition: background .3s, border-color .3s; }
.bt-box-cur      { border-color: var(--orange) !important; background: var(--nodeCur)      !important; box-shadow: 0 0 0 3px rgba(249,115,22,.25) !important; }
.bst-box-visited { border-color: var(--border2)  !important; background: var(--nodeVisited)  !important; }
.bst-box-found   { border-color: var(--green)    !important; background: var(--nodeFound)    !important; box-shadow: 0 0 0 3px rgba(34,197,94,.3)   !important; }
.ll-node-top { display: flex; flex: 1; width: 100%; height: 100%; }
.ll-data { padding: 4px 4px; font-weight: 700; font-size: 14px; display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1.2; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; line-height: 1.1; }
.ll-ptr { padding: 2px 4px; background: rgba(0,0,0,.2); font-size: 10px; color: rgba(255,255,255,.85); border-left: 1px solid rgba(255,255,255,.15); font-family: 'Consolas', monospace; display: flex; flex-direction: column; align-items: center; justify-content: center; line-height: 1.1; flex: 1; }
.ll-ptr-prev { border-left: none; border-right: 1px solid rgba(255,255,255,.15); }
.ll-ptr small { color: rgba(255,255,255,.5); font-size: 9px; }
.ll-addr-outside { font-size: 11px; font-weight: 600; font-family: 'Consolas', 'Fira Code', monospace; color: #475569; margin-top: 3px; text-align: center; line-height: 1; white-space: nowrap; }
.ll-vresizer { height: 5px; cursor: row-resize; background: var(--border); flex-shrink: 0; transition: background .15s; position: relative; z-index: 20; }
.ll-vresizer:hover, .ll-vresizer.drag { background: var(--coral); }
.ll-legend { display: flex; flex-wrap: wrap; gap: 6px 14px; padding: 6px 12px; border-bottom: 1px solid var(--border); flex-shrink: 0; background: var(--surface2); }
.ll-leg { display: flex; align-items: center; gap: 5px; font-size: 11px; color: var(--text2); }
.ll-legdot { width: 11px; height: 11px; border-radius: 3px; flex-shrink: 0; display: inline-block; }
.ll-legdot-normal   { background: var(--node);        border: 1.5px solid var(--blue); }
.ll-legdot-current  { background: var(--nodeCur);     border: 1.5px solid var(--orange); }
.ll-legdot-visited  { background: var(--nodeVisited); border: 1.5px solid var(--border2); }
.ll-legdot-found    { background: var(--nodeFound);   border: 1.5px solid var(--green); }
.ll-table-area { flex-shrink: 0; padding: 8px 14px; border-bottom: 1px solid var(--border); overflow: auto; background: var(--surface); }
.ll-table-title { font-size: 10px; color: var(--muted); margin-bottom: 4px; font-style: italic; }
.ll-stack-line { font-family: 'Consolas', monospace; font-size: 12px; line-height: 1.8; }
.ll-frame { font-family: 'Consolas', monospace; font-size: 11.5px; color: var(--text2); padding: 1px 0; white-space: nowrap; }
.ll-frame-cur { color: var(--orange); background: var(--orange-light); border-radius: 4px; padding: 1px 5px; }
.ll-fname { color: var(--text2); }
.ll-badge-wrap { padding: 6px 10px; border-bottom: 1px solid var(--border); flex-shrink: 0; min-height: 36px; display: flex; align-items: center; background: var(--surface); }
.ll-badge { display: inline-block; padding: 4px 12px; border-radius: var(--radius-sm); border-left: 3px solid var(--coral); background: var(--coral-light); font-size: 11px; color: var(--coral-dark); line-height: 1.4; word-break: break-word; font-weight: 500; }
.bst-badge-done { border-left-color: var(--green) !important; background: var(--green-light) !important; color: #15803d !important; }
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
