<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';

const props = defineProps({
  topic:    { type: String, default: 'Binary Tree — Level Order Creation' },
  subTopic: { type: String, default: 'BFS-based Level Order Insertion' },
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
    ['', 'import java.util.*;'],
    ['', ''],
    ['', 'class Node {'],
    ['c_createNode', '    int data;'],
    ['c_createNode', '    Node left, right;'],
    ['c_createNode', '    Node(int d) {'],
    ['c_setData',    '        this.data = d;'],
    ['c_setLeft',    '        this.left = null;'],
    ['c_setRight',   '        this.right = null;'],
    ['c_createNode', '    }'],
    ['', '}'],
    ['', ''],
    ['', 'class BinaryTree {'],
    ['', '    Node root = null;'],
    ['', ''],
    ['', '    void insert(int val) {'],
    ['c_createNode', '        Node newNode = new Node(val);'],
    ['c_rootCheck',  '        if (root == null) {'],
    ['c_rootAssign', '            root = newNode;'],
    ['c_rootReturn', '            return;'],
    ['',             '        }'],
    ['c_initQueue',  '        Queue<Node> q = new LinkedList<>();'],
    ['c_initQueue',  '        q.add(root);'],
    ['c_whileLoop',  '        while (!q.isEmpty()) {'],
    ['c_dequeue',    '            Node curr = q.poll();'],
    ['c_leftCheck',  '            if (curr.left == null) {'],
    ['c_attachLeft', '                curr.left = newNode;'],
    ['c_retLeft',    '                return;'],
    ['c_enqueueLeft','            } else {'],
    ['c_enqueueLeft','                q.add(curr.left);'],
    ['c_enqueueLeft','            }'],
    ['c_rightCheck', '            if (curr.right == null) {'],
    ['c_attachRight','                curr.right = newNode;'],
    ['c_retRight',   '                return;'],
    ['c_enqueueRight','           } else {'],
    ['c_enqueueRight','               q.add(curr.right);'],
    ['c_enqueueRight','           }'],
    ['',             '        }'],
    ['',             '    }'],
    ['', ''],
    ['c_main', '    public static void main(String[] args) {'],
    ['c_main', '        BinaryTree bt = new BinaryTree();'],
    ['c_main', '        int[] arr = {1, 2, 3, 4, 5};'],
    ['c_main', '        for (int v : arr) {'],
    ['c_main', '            bt.insert(v);'],
    ['c_main', '        }'],
    ['c_main', '    }'],
    ['', '}'],
  ],
  c: [
    ['', '#include <stdio.h>'],
    ['', '#include <stdlib.h>'],
    ['', ''],
    ['', 'typedef struct Node {'],
    ['c_createNode', '    int data;'],
    ['c_createNode', '    struct Node *left, *right;'],
    ['', '} Node;'],
    ['', ''],
    ['c_createNode', 'Node* createNode(int val) {'],
    ['c_createNode', '    Node* n = malloc(sizeof(Node));'],
    ['c_setData',    '    n->data = val;'],
    ['c_setLeft',    '    n->left = NULL;'],
    ['c_setRight',   '    n->right = NULL;'],
    ['c_createNode', '    return n;'],
    ['', '}'],
    ['', ''],
    ['', 'void insert(Node** root, int val) {'],
    ['c_createNode', '    Node* newNode = createNode(val);'],
    ['c_rootCheck',  '    if (*root == NULL) {'],
    ['c_rootAssign', '        *root = newNode;'],
    ['c_rootReturn', '        return;'],
    ['',             '    }'],
    ['c_initQueue',  '    Node* q[512]; int f = 0, r = 0;'],
    ['c_initQueue',  '    q[r++] = *root;'],
    ['c_whileLoop',  '    while (f < r) {'],
    ['c_dequeue',    '        Node* curr = q[f++];'],
    ['c_leftCheck',  '        if (curr->left == NULL) {'],
    ['c_attachLeft', '            curr->left = newNode;'],
    ['c_retLeft',    '            return;'],
    ['c_enqueueLeft','        } else {'],
    ['c_enqueueLeft','            q[r++] = curr->left;'],
    ['c_enqueueLeft','        }'],
    ['c_rightCheck', '        if (curr->right == NULL) {'],
    ['c_attachRight','            curr->right = newNode;'],
    ['c_retRight',   '            return;'],
    ['c_enqueueRight','        } else {'],
    ['c_enqueueRight','            q[r++] = curr->right;'],
    ['c_enqueueRight','        }'],
    ['',             '    }'],
    ['', '}'],
    ['', ''],
    ['c_main', 'int main() {'],
    ['c_main', '    Node* root = NULL;'],
    ['c_main', '    int arr[] = {1, 2, 3, 4, 5};'],
    ['c_main', '    int n = sizeof(arr) / sizeof(arr[0]);'],
    ['c_main', '    for (int i = 0; i < n; i++) {'],
    ['c_main', '        insert(&root, arr[i]);'],
    ['c_main', '    }'],
    ['c_main', '    return 0;'],
    ['', '}'],
  ],
  cpp: [
    ['', '#include <iostream>'],
    ['', '#include <queue>'],
    ['', 'using namespace std;'],
    ['', ''],
    ['', 'struct Node {'],
    ['c_createNode', '    int data;'],
    ['c_createNode', '    Node *left, *right;'],
    ['c_createNode', '    Node(int d) {'],
    ['c_setData',    '        data = d;'],
    ['c_setLeft',    '        left = nullptr;'],
    ['c_setRight',   '        right = nullptr;'],
    ['c_createNode', '    }'],
    ['', '};'],
    ['', ''],
    ['', 'class BinaryTree {'],
    ['', '    Node* root = nullptr;'],
    ['', ''],
    ['', '    void insert(int val) {'],
    ['c_createNode', '        Node* newNode = new Node(val);'],
    ['c_rootCheck',  '        if (root == nullptr) {'],
    ['c_rootAssign', '            root = newNode;'],
    ['c_rootReturn', '            return;'],
    ['',             '        }'],
    ['c_initQueue',  '        queue<Node*> q;'],
    ['c_initQueue',  '        q.push(root);'],
    ['c_whileLoop',  '        while (!q.empty()) {'],
    ['c_dequeue',    '            Node* curr = q.front();'],
    ['c_dequeue',    '            q.pop();'],
    ['c_leftCheck',  '            if (curr->left == nullptr) {'],
    ['c_attachLeft', '                curr->left = newNode;'],
    ['c_retLeft',    '                return;'],
    ['c_enqueueLeft','            } else {'],
    ['c_enqueueLeft','                q.push(curr->left);'],
    ['c_enqueueLeft','            }'],
    ['c_rightCheck', '            if (curr->right == nullptr) {'],
    ['c_attachRight','                curr->right = newNode;'],
    ['c_retRight',   '                return;'],
    ['c_enqueueRight','            } else {'],
    ['c_enqueueRight','                q.push(curr->right);'],
    ['c_enqueueRight','            }'],
    ['',             '        }'],
    ['',             '    }'],
    ['', '};'],
    ['', ''],
    ['c_main', 'int main() {'],
    ['c_main', '    BinaryTree bt;'],
    ['c_main', '    for (int v : {1, 2, 3, 4, 5}) {'],
    ['c_main', '        bt.insert(v);'],
    ['c_main', '    }'],
    ['c_main', '    return 0;'],
    ['', '}'],
  ],
  python: [
    ['', 'from collections import deque'],
    ['', ''],
    ['', 'class Node:'],
    ['c_createNode', '    def __init__(self, val):'],
    ['c_setData',    '        self.data = val'],
    ['c_setLeft',    '        self.left = None'],
    ['c_setRight',   '        self.right = None'],
    ['', ''],
    ['', 'class BinaryTree:'],
    ['', '    def __init__(self):'],
    ['', '        self.root = None'],
    ['', ''],
    ['', '    def insert(self, val):'],
    ['c_createNode', '        new_node = Node(val)'],
    ['c_rootCheck',  '        if self.root is None:'],
    ['c_rootAssign', '            self.root = new_node'],
    ['c_rootReturn', '            return'],
    ['c_initQueue',  '        q = deque([self.root])'],
    ['c_whileLoop',  '        while q:'],
    ['c_dequeue',    '            curr = q.popleft()'],
    ['c_leftCheck',  '            if curr.left is None:'],
    ['c_attachLeft', '                curr.left = new_node'],
    ['c_retLeft',    '                return'],
    ['c_enqueueLeft','            else: q.append(curr.left)'],
    ['c_rightCheck', '            if curr.right is None:'],
    ['c_attachRight','                curr.right = new_node'],
    ['c_retRight',   '                return'],
    ['c_enqueueRight','            else: q.append(curr.right)'],
    ['', ''],
    ['c_main', 'bt = BinaryTree()'],
    ['c_main', 'for v in [1, 2, 3, 4, 5]:'],
    ['c_main', '    bt.insert(v)'],
  ],
};

/* ------------------------------------------------------------------ */
/* Pseudocode                                                          */
/* ------------------------------------------------------------------ */
const PSEUDOCODE = [
  'procedure insert(root, val):',
  '    newNode = createNode(val)',
  '    newNode.data  = val',
  '    newNode.left  = null',
  '    newNode.right = null',
  '',
  '    if root == null:',
  '        root = newNode',
  '        return',
  '',
  '    queue = [root]',
  '',
  '    while queue is not empty:',
  '        curr = dequeue(queue)',
  '',
  '        if curr.left == null:',
  '            curr.left = newNode',
  '            return',
  '        else:',
  '            enqueue(queue, curr.left)',
  '',
  '        if curr.right == null:',
  '            curr.right = newNode',
  '            return',
  '        else:',
  '            enqueue(queue, curr.right)',
];

function frame(title, rows) { return { title, rows }; }

/* ------------------------------------------------------------------ */
/* Build animation steps                                               */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/* Build animation steps                                               */
/* ------------------------------------------------------------------ */
function buildSteps(tokens) {
  const allSteps  = [];
  const nodes     = [];    // { id, val, left, right, addr }
  const edges     = [];    // { from, to }
  let   rootId    = null;

  function snap(newNodeId, currId, queueIds, badge, code, vars) {
    allSteps.push({
      nodes:      nodes.map(n => ({ ...n })),
      edges:      edges.map(e => ({ ...e })),
      rootId,
      newNodeId:  newNodeId ?? null,
      currId:     currId    ?? null,
      queueIds:   [...(queueIds || [])],
      badge, code, vars,
    });
  }

  if (!tokens.length || tokens[0] === null) return allSteps;

  const rootVal = tokens[0];
  const rootAddr = ADDR(0);
  const varMain0 = [frame('main()', [['arr[0]', '' + rootVal]])];

  snap(null, null, [], `insert(${rootVal}) called (element 1 of ${tokens.length}).`, 'c_main', varMain0);
  nodes.push({ id: 0, val: rootVal, left: null, right: null, addr: rootAddr });

  const varNew0 = [
    frame('main()', [['arr[0]', '' + rootVal]]),
    frame('insert(val)', [['val', '' + rootVal], ['newNode', fmt(rootAddr), true]]),
  ];
  snap(0, null, [], `Allocate newNode(@${rootAddr}): Node(${rootVal}).`, 'c_createNode', varNew0);
  snap(0, null, [], `newNode.data = ${rootVal}.`, 'c_setData', varNew0);
  snap(0, null, [], 'newNode.left = null.', 'c_setLeft', varNew0);
  snap(0, null, [], 'newNode.right = null.', 'c_setRight', varNew0);
  snap(0, null, [], `Check: root == null? → YES — tree is empty`, 'c_rootCheck', varNew0);

  rootId = 0;
  const varRoot0 = [
    frame('main()', [['arr[0]', '' + rootVal]]),
    frame('insert(val)', [['val', '' + rootVal], ['newNode', fmt(rootAddr), true], ['root', fmt(rootAddr), true]]),
  ];
  snap(0, null, [], `root = newNode (@${rootAddr}). First node inserted as root!`, 'c_rootAssign', varRoot0);
  snap(null, null, [], 'return — root node inserted.', 'c_rootReturn', varRoot0);

  const levelQ = [nodes[0]];
  let vIdx = 1;

  while (levelQ.length > 0 && vIdx < tokens.length) {
    const parent = levelQ.shift();

    // Process Left Child Slot
    if (vIdx < tokens.length) {
      const leftVal = tokens[vIdx];
      const ti = vIdx;
      vIdx++;

      if (leftVal === null) {
        snap(null, parent.id, [parent.id], `Check left child slot of @${parent.addr}: null token → skip left child.`, 'c_leftCheck', [frame('main()', [['arr[' + ti + ']', 'null']])]);
      } else {
        const id   = nodes.length;
        const addr = ADDR(id);
        const varMain = [frame('main()', [['arr[' + ti + ']', '' + leftVal]])];

        snap(null, null, [], `insert(${leftVal}) called (element ${ti + 1} of ${tokens.length}).`, 'c_main', varMain);
        nodes.push({ id, val: leftVal, left: null, right: null, addr });

        const varNew = [
          frame('main()', [['arr[' + ti + ']', '' + leftVal]]),
          frame('insert(val)', [['val', '' + leftVal], ['newNode', fmt(addr), true], ['curr', fmt(parent.addr), true]]),
        ];
        snap(id, parent.id, [], `Allocate newNode(@${addr}): Node(${leftVal}).`, 'c_createNode', varNew);
        snap(id, parent.id, [], `newNode.data = ${leftVal}.`, 'c_setData', varNew);
        snap(id, parent.id, [], 'newNode.left = null.', 'c_setLeft', varNew);
        snap(id, parent.id, [], 'newNode.right = null.', 'c_setRight', varNew);
        snap(id, parent.id, [], `Check: curr.left == null? → YES — attach newNode as left child`, 'c_leftCheck', varNew);

        parent.left = id;
        edges.push({ from: parent.id, to: id });
        snap(id, parent.id, [], `curr.left = newNode → ${leftVal} attached as left child of @${parent.addr} (val=${parent.val}).`, 'c_attachLeft', varNew);
        snap(null, null, [], `return — ${leftVal} inserted as left child of ${parent.val}.`, 'c_retLeft', varNew);

        levelQ.push(nodes[id]);
      }
    }

    // Process Right Child Slot
    if (vIdx < tokens.length) {
      const rightVal = tokens[vIdx];
      const ti = vIdx;
      vIdx++;

      if (rightVal === null) {
        snap(null, parent.id, [parent.id], `Check right child slot of @${parent.addr}: null token → skip right child.`, 'c_rightCheck', [frame('main()', [['arr[' + ti + ']', 'null']])]);
      } else {
        const id   = nodes.length;
        const addr = ADDR(id);
        const varMain = [frame('main()', [['arr[' + ti + ']', '' + rightVal]])];

        snap(null, null, [], `insert(${rightVal}) called (element ${ti + 1} of ${tokens.length}).`, 'c_main', varMain);
        nodes.push({ id, val: rightVal, left: null, right: null, addr });

        const varNew = [
          frame('main()', [['arr[' + ti + ']', '' + rightVal]]),
          frame('insert(val)', [['val', '' + rightVal], ['newNode', fmt(addr), true], ['curr', fmt(parent.addr), true]]),
        ];
        snap(id, parent.id, [], `Allocate newNode(@${addr}): Node(${rightVal}).`, 'c_createNode', varNew);
        snap(id, parent.id, [], `newNode.data = ${rightVal}.`, 'c_setData', varNew);
        snap(id, parent.id, [], 'newNode.left = null.', 'c_setLeft', varNew);
        snap(id, parent.id, [], 'newNode.right = null.', 'c_setRight', varNew);
        snap(id, parent.id, [], `Check: curr.right == null? → YES — attach newNode as right child`, 'c_rightCheck', varNew);

        parent.right = id;
        edges.push({ from: parent.id, to: id });
        snap(id, parent.id, [], `curr.right = newNode → ${rightVal} attached as right child of @${parent.addr} (val=${parent.val}).`, 'c_attachRight', varNew);
        snap(null, null, [], `return — ${rightVal} inserted as right child of ${parent.val}.`, 'c_retRight', varNew);

        levelQ.push(nodes[id]);
      }
    }
  }

  snap(null, null, [], 'Binary Tree creation complete.', 'c_main', []);
  return allSteps;
}
/* ------------------------------------------------------------------ */
/* Reactive state                                                      */
/* ------------------------------------------------------------------ */
const inpElems  = ref('1 2 3 4 5 6 7');
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
  nodes: [], edges: [], vars: [], badge: '', rootId: null,
  newNodeId: null, currId: null, queueIds: [],
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
/* Viz container size (observed via ResizeObserver)                    */
/* ------------------------------------------------------------------ */
const vizContainerW = ref(640);
const vizContainerH = ref(320);
const vizSvgRef     = ref(null);
let   vizRO         = null;

/* ------------------------------------------------------------------ */
/* Tree layout — fixed node size & fixed canvas viewBox (max 7 nodes)   */
/* ------------------------------------------------------------------ */

// Fixed node dimensions — constant at all times
const NODE_W     = 132;
const NODE_BOX_H = 44;
const NODE_H     = 68;   // box height + address label space

// Fixed grid parameters designed specifically for max 7 nodes
const MAX_COLS   = 7;
const MAX_DEPTH  = 2;
const SPACING_X  = 70;
const LEVEL_H    = 80;
const PAD_TOP    = 35;
const PAD_BOTTOM = 0;
const PAD_SIDE   = 50;

const START_Y    = PAD_TOP + NODE_BOX_H / 2;

// Fixed ViewBox dimensions — invariant across all animation steps
const TREE_W        = PAD_SIDE + MAX_COLS * SPACING_X;   // 540
const STAGING_X     = TREE_W + 90;                        // 630
const FIXED_TOTAL_W = STAGING_X + NODE_W / 2 + PAD_SIDE;  // 746
const FIXED_TOTAL_H = START_Y + MAX_DEPTH * LEVEL_H + NODE_H / 2 + PAD_BOTTOM; // 216
const FIXED_VIEWBOX = `0 0 ${FIXED_TOTAL_W} ${FIXED_TOTAL_H}`;

const treeLayout = computed(() => {
  const step = currentStep.value;
  if (!step || !step.nodes || !step.nodes.length) {
    return { positions: {}, edges: [], viewBox: FIXED_VIEWBOX,
             nodeW: NODE_W, nodeBoxH: NODE_BOX_H, nodeH: NODE_H, staging: null };
  }

  const nodesMap = {};
  step.nodes.forEach(n => {
    nodesMap[n.id] = { ...n };
  });

  const rootId = step.rootId;
  const isUnplaced = (n) => (step.newNodeId === n.id && step.rootId !== n.id &&
    !step.edges.some(e => e.to === n.id));

  const unplacedNodes = step.nodes.filter(n => isUnplaced(n));

  const positions = {};

  if (rootId !== null && rootId !== undefined && nodesMap[rootId]) {
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

    const PAD_SIDE = 50;
    const contentW = (maxX - minX) + 2 * PAD_SIDE;
    const shiftX = Math.max(0, (540 - contentW) / 2);

    inOrderNodes.forEach(id => {
      const node = nodesMap[id];
      positions[id] = {
        x: rawX[id] - minX + PAD_SIDE + shiftX,
        y: START_Y + (node.depth || 0) * LEVEL_H,
      };
    });
  }

  unplacedNodes.forEach(n => {
    positions[n.id] = { x: STAGING_X, y: START_Y };
  });

  const staging = unplacedNodes.length ? { id: unplacedNodes[0].id, x: STAGING_X, y: START_Y } : null;

  return {
    positions,
    edges: step.edges || [],
    viewBox: FIXED_VIEWBOX,
    nodeW: NODE_W,
    nodeBoxH: NODE_BOX_H,
    nodeH: NODE_H,
    spacingX: SPACING_X,
    levelH: LEVEL_H,
    treeWidth: TREE_W,
    staging,
  };
});

function pos(id) {
  return treeLayout.value.positions[id] || { x: 0, y: 0 };
}

function edgeCoords(e) {
  const pFrom    = pos(e.from);
  const pTo      = pos(e.to);
  const fromNode = nodesById.value[e.from];
  const isLeft   = fromNode && fromNode.left === e.to;
  const hw       = (treeLayout.value.nodeW || 132) / 2 * 0.6;
  const nbh      = (treeLayout.value.nodeBoxH || 44);
  return {
    x1: isLeft ? pFrom.x - hw : pFrom.x + hw,
    y1: pFrom.y,
    x2: pTo.x,
    y2: pTo.y - nbh / 2,
  };
}

// Approximate px-per-character for 12px bold Consolas
const CHAR_W = 8.5;
const LABEL_PAD = 6;

function getPointerBadgesForNode(id) {
  const step = currentStep.value;
  if (!step) return [];
  const ptrs = [];
  if (step.rootId    === id) ptrs.push({ name: 'root',    label: 'root',    color: '#3b82f6' });
  if (step.newNodeId === id) ptrs.push({ name: 'newNode', label: 'newNode', color: '#22c55e' });
  if (step.currId    === id) ptrs.push({ name: 'curr',    label: 'curr',    color: '#f97316' });

  const count = ptrs.length;
  if (!count) return [];
  const nodeX = pos(id).x;
  const nodeY = pos(id).y;
  const nbh   = treeLayout.value.nodeBoxH || 44;

  if (count === 1) {
    return [{ ...ptrs[0], x: nodeX, yText: nodeY - nbh / 2 - 22, yArrow: nodeY - nbh / 2 - 8 }];
  }

  const GAP = 4;
  const halfWidths = ptrs.map(p => p.label.length * CHAR_W / 2 + LABEL_PAD);
  const totalW = halfWidths.reduce((s, hw) => s + hw * 2, 0) + GAP * (count - 1);
  let cursor = nodeX - totalW / 2;
  const positions = ptrs.map((p, i) => {
    const hw = halfWidths[i];
    const x  = cursor + hw;
    cursor += hw * 2 + GAP;
    return x;
  });

  return ptrs.map((p, i) => ({
    ...p,
    x:      positions[i],
    yText:  nodeY - nbh / 2 - 22,
    yArrow: nodeY - nbh / 2 - 8,
  }));
}

function nodeBoxClass(n) {
  const step = currentStep.value;
  if (!step) return '';
  if (step.newNodeId === n.id) return 'bt-box-new';
  if (step.currId    === n.id) return 'bt-box-cur';
  return '';
}

/* ------------------------------------------------------------------ */
/* Playback controls                                                   */
/* ------------------------------------------------------------------ */
function applyInput() {
  const tokens = parseInputTokens(inpElems.value);
  clearTimeout(playTimer);
  playing.value = false;
  steps.value   = tokens.length ? buildSteps(tokens) : [];
  si.value      = 0;
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

  // Observe the SVG/viz wrapper so layout auto-adapts when the panel resizes
  if (vizSvgRef.value) {
    vizRO = new ResizeObserver(entries => {
      for (const entry of entries) {
        vizContainerW.value = entry.contentRect.width  || 640;
        vizContainerH.value = entry.contentRect.height || 320;
      }
    });
    vizRO.observe(vizSvgRef.value);
    const rect = vizSvgRef.value.getBoundingClientRect();
    vizContainerW.value = rect.width  || 640;
    vizContainerH.value = rect.height || 320;
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

          <!-- TOOLBAR -->
          <div class="ll-toolbar">
            <label>Elements</label>
            <input type="text" v-model="inpElems" placeholder="e.g. 1 2 3 4 5 6 7" class="ll-text-input" @keyup.enter="applyInput" />
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
                <div class="ll-perm-area" ref="vizSvgRef">
                  <div class="ll-ptrs">
                    <div class="ll-ptr-chip">root = <b class="ll-c-blue">{{ fmt(s.rootId !== null && s.rootId !== undefined ? ADDR(s.rootId) : null) }}</b></div>
                    <div v-if="s.newNodeId !== null && s.newNodeId !== undefined" class="ll-ptr-chip">
                      newNode = <b class="ll-c-green">{{ fmt(ADDR(s.newNodeId)) }}</b>
                    </div>
                    <div v-if="s.currId !== null && s.currId !== undefined" class="ll-ptr-chip">
                      curr = <b class="ll-c-orange">{{ fmt(ADDR(s.currId)) }}</b>
                    </div>
                  </div>

                  <svg class="ll-svg"
                    :viewBox="treeLayout.viewBox"
                    preserveAspectRatio="xMidYMid meet"
                    width="100%" height="100%">

                    <!-- Staging divider -->
                    <g v-if="treeLayout.staging">
                      <line
                        :x1="treeLayout.staging.x - 55" :y1="4"
                        :x2="treeLayout.staging.x - 55" :y2="FIXED_TOTAL_H - 4"
                        class="bt-staging-divider" />
                      <text :x="treeLayout.staging.x - 30" y="18" class="bt-staging-label"></text>
                    </g>

                    <!-- Edges -->
                    <line v-for="(e, i) in treeLayout.edges" :key="'e-' + i"
                      :x1="edgeCoords(e).x1" :y1="edgeCoords(e).y1"
                      :x2="edgeCoords(e).x2" :y2="edgeCoords(e).y2"
                      class="bt-edge-line" />

                    <!-- Pointer badges -->
                    <g v-for="n in s.nodes" :key="'ptrs' + n.id">
                      <template v-for="p in getPointerBadgesForNode(n.id)" :key="p.name">
                        <text :x="p.x" :y="p.yText" text-anchor="middle" :fill="p.color" class="heap-ptr-txt">{{ p.label }}</text>
                        <text :x="p.x" :y="p.yArrow" text-anchor="middle" :fill="p.color" class="heap-ptr-arrow">&#8595;</text>
                      </template>
                    </g>

                    <!-- Nodes -->
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

              <!-- QUEUE DISPLAY -->
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
                <span class="ll-leg"><span class="ll-legdot ll-legdot-existing"></span>tree node</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-new"></span>new node (staging)</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-cur"></span>curr (from queue)</span>
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
                <div class="ll-badge">{{ s.badge }}</div>
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
                  <h3>Time &amp; Space Complexity &mdash; Level Order Insertion</h3>
                  <table class="ll-complexity-table">
                    <thead><tr><th>Metric</th><th>Value</th><th>Why</th></tr></thead>
                    <tbody>
                      <tr><td>Insert one node</td><td>O(n)</td><td>BFS traversal visits up to all n existing nodes to find the first free slot.</td></tr>
                      <tr><td>Build full tree (k nodes)</td><td>O(k&sup2;)</td><td>Each of k insertions costs O(n) where n grows from 0 to k-1.</td></tr>
                      <tr><td>Space (queue)</td><td>O(w)</td><td>Queue holds at most the nodes at the widest level (width w &asymp; n/2 at bottom).</td></tr>
                      <tr><td>Tree height</td><td>O(log n)</td><td>Level order produces a perfect/complete binary tree &mdash; minimal height.</td></tr>
                    </tbody>
                  </table>
                  <p class="ll-note">
                    Level order insertion guarantees a <b>complete binary tree</b> &mdash; all levels are fully filled except possibly the last, which is filled left to right. This produces the most compact tree possible for n nodes.
                  </p>
                  <h3>Why Level Order?</h3>
                  <p>Unlike BST insertion (which depends on values), level order insertion fills the tree structurally &mdash; position is determined purely by the order of insertion, not the values. The result is always a <b>complete binary tree</b>.</p>
                  <h3>Queue Role</h3>
                  <p>The queue ensures BFS traversal, visiting nodes level by level, left to right. The front node of the queue is always the first node with an available child slot.</p>
                  <h3>Applications</h3>
                  <p>Used to build heaps (stored as arrays), serialize/deserialize binary trees, and construct balanced trees from flat data.</p>
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
  --node: #1d4ed8; --nodeNew: #15803d; --nodeCur: #c2410c;
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
.ll-c-blue   { color: var(--blue); }
.ll-c-orange { color: var(--orange); }
.ll-c-green  { color: var(--green); }
.ll-svg { display: block; flex: 1; min-height: 0; }
.bt-edge-line { stroke: #cbd5e1; stroke-width: 2px; }
.bt-staging-divider { stroke: #cbd5e100; stroke-dasharray: 5 4; stroke-width: 1.5px; opacity: .6; }
.bt-staging-label { font-size: 11px; fill: var(--muted); font-family: system-ui, sans-serif; }
.heap-ptr-txt   { font-size: 13px; font-weight: 800; font-family: 'Consolas', 'Fira Code', monospace; }
.heap-ptr-arrow { font-size: 14px; font-weight: 900; font-family: system-ui, sans-serif; }
.ll-node-wrap { display: flex; flex-direction: column; align-items: center; width: 100%; height: 100%; }
.ll-box { display: flex; flex-direction: column; border: 2px solid var(--blue); border-radius: var(--radius-sm); overflow: hidden; background: var(--node); width: 100%; height: 44px; color: #fff; animation: ll-pop .3s ease; box-shadow: var(--shadow-sm); transition: background .3s, border-color .3s; }
.bt-box-new { border-color: #22c55e !important; background: var(--nodeNew) !important; box-shadow: 0 0 0 3px rgba(34,197,94,.3) !important; }
.bt-box-cur { border-color: var(--orange) !important; background: var(--nodeCur) !important; box-shadow: 0 0 0 3px rgba(249,115,22,.25) !important; }
.ll-node-top { display: flex; flex: 1; width: 100%; height: 100%; }
.ll-data { padding: 4px 4px; font-weight: 700; font-size: 15px; display: flex; align-items: center; justify-content: center; flex: 1.2; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
.ll-ptr { padding: 2px 4px; background: rgba(0,0,0,.2); font-size: 10px; color: rgba(255,255,255,.85); border-left: 1px solid rgba(255,255,255,.15); font-family: 'Consolas', monospace; display: flex; flex-direction: column; align-items: center; justify-content: center; line-height: 1.1; flex: 1; }
.ll-ptr-prev { border-left: none; border-right: 1px solid rgba(255,255,255,.15); }
.ll-ptr small { color: rgba(255,255,255,.5); font-size: 9px; }
.ll-addr-outside { font-size: 11px; font-weight: 600; font-family: 'Consolas', 'Fira Code', monospace; color: #475569; margin-top: 3px; text-align: center; line-height: 1; white-space: nowrap; }
.ll-vresizer { height: 5px; cursor: row-resize; background: var(--border); flex-shrink: 0; transition: background .15s; position: relative; z-index: 20; }
.ll-vresizer:hover, .ll-vresizer.drag { background: var(--coral); }

/* QUEUE DISPLAY */
.ll-queue-area { display: flex; align-items: center; gap: 5px; padding: 5px 14px; border-bottom: 1px solid var(--border); flex-shrink: 0; background: var(--surface2); flex-wrap: wrap; min-height: 34px; }
.ll-queue-label { font-size: 11px; font-weight: 700; color: var(--text2); white-space: nowrap; font-family: 'Consolas', monospace; margin-right: 4px; }
.ll-queue-chip { background: var(--blue-light); border: 1.5px solid var(--blue); border-radius: var(--radius-sm); padding: 2px 8px; font-size: 11px; font-family: 'Consolas', monospace; color: var(--blue); font-weight: 700; white-space: nowrap; }
.ll-queue-addr { color: var(--muted); font-size: 10px; margin-left: 4px; }
.ll-queue-arrow { color: var(--muted); font-size: 14px; line-height: 1; }
.ll-queue-empty { color: var(--muted); font-size: 11px; font-style: italic; }

/* LEGEND */
.ll-legend { display: flex; flex-wrap: wrap; gap: 6px 14px; padding: 6px 12px; border-bottom: 1px solid var(--border); flex-shrink: 0; background: var(--surface2); }
.ll-leg { display: flex; align-items: center; gap: 5px; font-size: 11px; color: var(--text2); }
.ll-legdot { width: 11px; height: 11px; border-radius: 3px; flex-shrink: 0; display: inline-block; }
.ll-legdot-existing { background: var(--node);    border: 1.5px solid var(--blue); }
.ll-legdot-new      { background: var(--nodeNew); border: 1.5px solid var(--green); }
.ll-legdot-cur      { background: var(--nodeCur); border: 1.5px solid var(--orange); }

/* VAR FRAMES */
.ll-table-area { flex-shrink: 0; padding: 8px 14px; border-bottom: 1px solid var(--border); overflow: auto; background: var(--surface); }
.ll-table-title { font-size: 10px; color: var(--muted); margin-bottom: 4px; font-style: italic; }
.ll-stack-line { font-family: 'Consolas', monospace; font-size: 12px; line-height: 1.8; }
.ll-frame { font-family: 'Consolas', monospace; font-size: 11.5px; color: var(--text2); padding: 1px 0; white-space: nowrap; }
.ll-frame-cur { color: var(--orange); background: var(--orange-light); border-radius: 4px; padding: 1px 5px; }
.ll-fname { color: var(--text2); }
.ll-now { color: var(--orange); font-size: 10px; margin-left: 6px; }
.ll-badge-wrap { padding: 6px 10px; border-bottom: 1px solid var(--border); flex-shrink: 0; min-height: 36px; display: flex; align-items: center; background: var(--surface); }
.ll-badge { display: inline-block; padding: 4px 12px; border-radius: var(--radius-sm); border-left: 3px solid var(--coral); background: var(--coral-light); font-size: 11px; color: var(--coral-dark); line-height: 1.4; word-break: break-word; font-weight: 500; }

/* CODE PANEL */
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