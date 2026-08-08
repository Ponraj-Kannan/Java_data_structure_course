<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';

const props = defineProps({
  topic:    { type: String, default: 'Binary Tree — Node Deletion' },
  subTopic: { type: String, default: 'Replace with Deepest Rightmost Node & Disconnect' },
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
    ['c_dd_call',       '    void deleteDeepest(Node deepestNode) {'],
    ['c_dd_initQ',      '        Queue<Node> q = new LinkedList<>();'],
    ['c_dd_enqRoot',    '        q.add(root);'],
    ['c_dd_while',      '        while (!q.isEmpty()) {'],
    ['c_dd_deq',        '            Node temp = q.poll();'],
    ['c_dd_leftCheck',  '            if (temp.left != null) {'],
    ['c_dd_leftMatch',  '                if (temp.left == deepestNode) {'],
    ['c_dd_leftNull',   '                    temp.left = null;'],
    ['c_dd_return',     '                    return;'],
    ['',                '                } else {'],
    ['c_dd_leftEnq',    '                    q.add(temp.left);'],
    ['',                '                }'],
    ['',                '            }'],
    ['c_dd_rightCheck', '            if (temp.right != null) {'],
    ['c_dd_rightMatch', '                if (temp.right == deepestNode) {'],
    ['c_dd_rightNull',  '                    temp.right = null;'],
    ['c_dd_return',     '                    return;'],
    ['',                '                } else {'],
    ['c_dd_rightEnq',   '                    q.add(temp.right);'],
    ['',                '                }'],
    ['',                '            }'],
    ['',                '        }'],
    ['',                '    }'],
    ['', ''],
    ['c_call',          '    void deleteNode(int key) {'],
    ['c_rootCheck',     '        if (root == null) {'],
    ['c_rootReturn',    '            return;'],
    ['',                '        }'],
    ['c_initQueue',     '        Queue<Node> q = new LinkedList<>();'],
    ['c_enqueueRoot',   '        q.add(root);'],
    ['c_initPtrs',      '        Node targetNode = null;'],
    ['c_initPtrs',      '        Node curr = null;'],
    ['c_whileLoop',     '        while (!q.isEmpty()) {'],
    ['c_dequeue',       '            curr = q.poll();'],
    ['c_checkKey',      '            if (curr.data == key) {'],
    ['c_findTarget',    '                targetNode = curr;'],
    ['',                '            }'],
    ['c_leftCheck',     '            if (curr.left != null) {'],
    ['c_enqueueLeft',   '                q.add(curr.left);'],
    ['',                '            }'],
    ['c_rightCheck',    '            if (curr.right != null) {'],
    ['c_enqueueRight',  '                q.add(curr.right);'],
    ['',                '            }'],
    ['',                '        }'],
    ['c_targetCheck',   '        if (targetNode != null) {'],
    ['c_getDeepest',    '            int deepestVal = curr.data;'],
    ['c_deleteDeepest', '            deleteDeepest(curr);'],
    ['c_replaceVal',    '            targetNode.data = deepestVal;'],
    ['',                '        }'],
    ['c_done',          '    }'],
    ['', '}'],
  ],
  c: [
    ['c_dd_call',       'void deleteDeepest(struct Node* root, struct Node* deepestNode) {'],
    ['c_dd_initQ',      '    struct Node* q[512]; int f = 0, r = 0;'],
    ['c_dd_enqRoot',    '    q[r++] = root;'],
    ['c_dd_while',      '    while (f < r) {'],
    ['c_dd_deq',        '        struct Node* temp = q[f++];'],
    ['c_dd_leftCheck',  '        if (temp->left != NULL) {'],
    ['c_dd_leftMatch',  '            if (temp->left == deepestNode) {'],
    ['c_dd_leftNull',   '                temp->left = NULL;'],
    ['c_dd_return',     '                return;'],
    ['',                '            } else {'],
    ['c_dd_leftEnq',    '                q[r++] = temp->left;'],
    ['',                '            }'],
    ['',                '        }'],
    ['c_dd_rightCheck', '        if (temp->right != NULL) {'],
    ['c_dd_rightMatch', '            if (temp->right == deepestNode) {'],
    ['c_dd_rightNull',  '                temp->right = NULL;'],
    ['c_dd_return',     '                return;'],
    ['',                '            } else {'],
    ['c_dd_rightEnq',   '                q[r++] = temp->right;'],
    ['',                '            }'],
    ['',                '        }'],
    ['',                '    }'],
    ['',                '}'],
    ['', ''],
    ['c_call',          'void deleteNode(Node** root, int key) {'],
    ['c_rootCheck',     '    if (*root == NULL) {'],
    ['c_rootReturn',    '        return;'],
    ['',                '    }'],
    ['c_initQueue',     '    Node* q[512]; int f = 0, r = 0;'],
    ['c_enqueueRoot',   '    q[r++] = *root;'],
    ['c_initPtrs',      '    Node* targetNode = NULL;'],
    ['c_initPtrs',      '    Node* curr = NULL;'],
    ['c_whileLoop',     '    while (f < r) {'],
    ['c_dequeue',       '        curr = q[f++];'],
    ['c_checkKey',      '        if (curr->data == key) {'],
    ['c_findTarget',    '            targetNode = curr;'],
    ['',                '        }'],
    ['c_leftCheck',     '        if (curr->left != NULL) {'],
    ['c_enqueueLeft',   '            q[r++] = curr->left;'],
    ['',                '        }'],
    ['c_rightCheck',    '        if (curr->right != NULL) {'],
    ['c_enqueueRight',  '            q[r++] = curr->right;'],
    ['',                '        }'],
    ['',                '    }'],
    ['c_targetCheck',   '    if (targetNode != NULL) {'],
    ['c_getDeepest',    '        int deepestVal = curr->data;'],
    ['c_deleteDeepest', '        deleteDeepest(*root, curr);'],
    ['c_replaceVal',    '        targetNode->data = deepestVal;'],
    ['',                '    }'],
    ['c_done',          '}'],
  ],
  cpp: [
    ['c_dd_call',       'void deleteDeepest(Node* root, Node* deepestNode) {'],
    ['c_dd_initQ',      '    queue<Node*> q;'],
    ['c_dd_enqRoot',    '    q.push(root);'],
    ['c_dd_while',      '    while (!q.empty()) {'],
    ['c_dd_deq',        '        Node* temp = q.front(); q.pop();'],
    ['c_dd_leftCheck',  '        if (temp->left != nullptr) {'],
    ['c_dd_leftMatch',  '            if (temp->left == deepestNode) {'],
    ['c_dd_leftNull',   '                temp->left = nullptr;'],
    ['c_dd_return',     '                return;'],
    ['',                '            } else {'],
    ['c_dd_leftEnq',    '                q.push(temp->left);'],
    ['',                '            }'],
    ['',                '        }'],
    ['c_dd_rightCheck', '        if (temp->right != nullptr) {'],
    ['c_dd_rightMatch', '            if (temp->right == deepestNode) {'],
    ['c_dd_rightNull',  '                temp->right = nullptr;'],
    ['c_dd_return',     '                return;'],
    ['',                '            } else {'],
    ['c_dd_rightEnq',   '                q.push(temp->right);'],
    ['',                '            }'],
    ['',                '        }'],
    ['',                '    }'],
    ['',                '}'],
    ['', ''],
    ['c_call',          'void deleteNode(Node*& root, int key) {'],
    ['c_rootCheck',     '    if (root == nullptr) {'],
    ['c_rootReturn',    '        return;'],
    ['',                '    }'],
    ['c_initQueue',     '    queue<Node*> q;'],
    ['c_enqueueRoot',   '    q.push(root);'],
    ['c_initPtrs',      '    Node* targetNode = nullptr;'],
    ['c_initPtrs',      '    Node* curr = nullptr;'],
    ['c_whileLoop',     '    while (!q.empty()) {'],
    ['c_dequeue',       '        curr = q.front(); q.pop();'],
    ['c_checkKey',      '        if (curr->data == key) {'],
    ['c_findTarget',    '            targetNode = curr;'],
    ['',                '        }'],
    ['c_leftCheck',     '        if (curr->left != nullptr) {'],
    ['c_enqueueLeft',   '            q.push(curr->left);'],
    ['',                '        }'],
    ['c_rightCheck',    '        if (curr->right != nullptr) {'],
    ['c_enqueueRight',  '            q.push(curr->right);'],
    ['',                '        }'],
    ['',                '    }'],
    ['c_targetCheck',   '    if (targetNode != nullptr) {'],
    ['c_getDeepest',    '        int deepestVal = curr->data;'],
    ['c_deleteDeepest', '        deleteDeepest(root, curr);'],
    ['c_replaceVal',    '        targetNode->data = deepestVal;'],
    ['',                '    }'],
    ['c_done',          '}'],
  ],
  python: [
    ['c_dd_call',       'def delete_deepest(root, deepest_node):'],
    ['c_dd_initQ',      '    q = deque([root])'],
    ['c_dd_while',      '    while q:'],
    ['c_dd_deq',        '        temp = q.popleft()'],
    ['c_dd_leftCheck',  '        if temp.left is not None:'],
    ['c_dd_leftMatch',  '            if temp.left == deepest_node:'],
    ['c_dd_leftNull',   '                temp.left = None'],
    ['c_dd_return',     '                return'],
    ['c_dd_leftEnq',    '            else: q.append(temp.left)'],
    ['c_dd_rightCheck', '        if temp.right is not None:'],
    ['c_dd_rightMatch', '            if temp.right == deepest_node:'],
    ['c_dd_rightNull',  '                temp.right = None'],
    ['c_dd_return',     '                return'],
    ['c_dd_rightEnq',   '            else: q.append(temp.right)'],
    ['', ''],
    ['c_call',          'def delete_node(root, key):'],
    ['c_rootCheck',     '    if root is None:'],
    ['c_rootReturn',    '        return'],
    ['c_initQueue',     '    q = deque([root])'],
    ['c_initPtrs',      '    target_node = None'],
    ['c_initPtrs',      '    curr = None'],
    ['c_whileLoop',     '    while q:'],
    ['c_dequeue',       '        curr = q.popleft()'],
    ['c_checkKey',      '        if curr.data == key:'],
    ['c_findTarget',    '            target_node = curr'],
    ['c_leftCheck',     '        if curr.left is not None:'],
    ['c_enqueueLeft',   '            q.append(curr.left)'],
    ['c_rightCheck',    '        if curr.right is not None:'],
    ['c_enqueueRight',  '            q.append(curr.right)'],
    ['c_targetCheck',   '    if target_node is not None:'],
    ['c_getDeepest',    '        deepest_val = curr.data'],
    ['c_deleteDeepest', '        delete_deepest(root, curr)'],
    ['c_replaceVal',    '        target_node.data = deepest_val'],
  ],
};

/* ------------------------------------------------------------------ */
/* Pseudocode                                                          */
/* ------------------------------------------------------------------ */
const PSEUDOCODE = [
  'procedure deleteNode(root, key):',
  '    if root is null:',
  '        return',
  '',
  '    queue = [root]',
  '    targetNode = null, deepestNode = null',
  '',
  '    while queue is not empty:',
  '        deepestNode = dequeue(queue)',
  '',
  '        if deepestNode.data == key:',
  '            targetNode = deepestNode',
  '',
  '        if deepestNode.left != null:',
  '            enqueue(queue, deepestNode.left)',
  '        if deepestNode.right != null:',
  '            enqueue(queue, deepestNode.right)',
  '',
  '    if targetNode != null:',
  '        deepestVal = deepestNode.data',
  '        deleteDeepestNode(root, deepestNode)',
  '        targetNode.data = deepestVal    // Replace value',
];

function frame(title, rows) { return { title, rows }; }

/* ------------------------------------------------------------------ */
/* Level order tree builder (instant — silent)                         */
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

function buildLevelOrderTree(values) {
  const nodes = [];
  const edges = [];
  if (!values.length || values[0] === null) return { nodes, edges, rootId: null };

  nodes.push({ id: 0, val: values[0], left: null, right: null, addr: ADDR(0), gridPos: 0 });
  const rootId = 0;
  const q = [nodes[0]];
  let vIdx = 1;

  while (q.length && vIdx < values.length) {
    const parent = q.shift();

    if (vIdx < values.length) {
      const leftVal = values[vIdx];
      if (leftVal !== null) {
        const childId = nodes.length;
        const childNode = { id: childId, val: leftVal, left: null, right: null, addr: ADDR(vIdx), gridPos: vIdx };
        nodes.push(childNode);
        parent.left = childId;
        edges.push({ from: parent.id, to: childId });
        q.push(childNode);
      }
      vIdx++;
    }

    if (vIdx < values.length) {
      const rightVal = values[vIdx];
      if (rightVal !== null) {
        const childId = nodes.length;
        const childNode = { id: childId, val: rightVal, left: null, right: null, addr: ADDR(vIdx), gridPos: vIdx };
        nodes.push(childNode);
        parent.right = childId;
        edges.push({ from: parent.id, to: childId });
        q.push(childNode);
      }
      vIdx++;
    }
  }

  return { nodes, edges, rootId };
}

/* ------------------------------------------------------------------ */
/* Step generation                                                     */
/* ------------------------------------------------------------------ */
function buildSteps(initialNodes, initialEdges, rootId, key) {
  const steps = [];

  let nodes = initialNodes.map(n => ({ ...n }));
  let edges = initialEdges.map(e => ({ ...e }));
  let nodesMap = {};
  nodes.forEach(n => (nodesMap[n.id] = n));

  const queue = [];

  function snap(currId, targetId, deepestId, tempId, badge, code, activeQ) {
    const qList = activeQ ? [...activeQ] : [...queue];
    const vars = [
      frame('deleteNode(key)', [
        ['key', '' + key],
        ['root', rootId !== null ? fmt(ADDR(rootId)) : 'null', true],
        ...(targetId !== null && targetId !== undefined ? [['targetNode', fmt(ADDR(targetId)), true]] : []),
        ...(deepestId !== null && deepestId !== undefined ? [['deepestNode', fmt(ADDR(deepestId)), true]] : []),
        ...(currId !== null && currId !== undefined ? [['curr', fmt(ADDR(currId)), true]] : []),
        ...(tempId !== null && tempId !== undefined ? [['temp (parent)', fmt(ADDR(tempId)), true]] : []),
      ]),
    ];

    steps.push({
      nodes:     nodes.map(n => ({ ...n })),
      edges:     edges.map(e => ({ ...e })),
      rootId,
      currId:    currId    ?? null,
      targetId:  targetId  ?? null,
      deepestId: deepestId ?? null,
      tempId:    tempId    ?? null,
      queueIds:  qList,
      badge,
      code,
      vars,
    });
  }

  if (rootId === null) {
    snap(null, null, null, null, 'Tree is empty — deletion cannot proceed.', 'c_rootCheck');
    return steps;
  }

  snap(null, null, null, null, `deleteNode(key = ${key}) called. Starting deletion process.`, 'c_main');
  snap(null, null, null, null, `Call deleteNode(root, key = ${key})`, 'c_call');

  snap(null, null, null, null, `Check: root == null? → FALSE`, 'c_rootCheck');
  snap(null, null, null, null, `Initialize queue q for Level Order Traversal to find target & deepest nodes.`, 'c_initQueue');

  queue.push(rootId);
  snap(null, null, null, null, `q.add(root) → Enqueue root (@${ADDR(rootId)}, val=${nodesMap[rootId].val}).`, 'c_enqueueRoot');
  snap(null, null, null, null, `Initialize targetNode = null, curr = null.`, 'c_initPtrs');

  let targetId = null;
  let deepestId = null;

  while (queue.length > 0) {
    snap(null, targetId, deepestId, null, `while (!q.isEmpty()) → ${queue.length} node(s) in queue.`, 'c_whileLoop');

    const currId = queue.shift();
    const curr = nodesMap[currId];
    deepestId = currId;

    snap(currId, targetId, deepestId, null, `Dequeue: curr = q.poll() → curr = @${curr.addr} (val=${curr.val}).`, 'c_dequeue');

    const isMatch = curr.val === key;
    snap(currId, targetId, deepestId, null, `Check: if (curr.data == key) → (${curr.val} == ${key}) → ${isMatch ? 'TRUE' : 'FALSE'}`, 'c_checkKey');

    if (isMatch) {
      targetId = currId;
      snap(currId, targetId, deepestId, null, `targetNode = curr (@${curr.addr}, val=${curr.val}). Target node located!`, 'c_findTarget');
    }

    const leftExist = curr.left !== null;
    snap(currId, targetId, deepestId, null, `Check: curr.left != null? → ${leftExist ? `TRUE (@${ADDR(curr.left)})` : 'FALSE'}`, 'c_leftCheck');
    if (leftExist) {
      queue.push(curr.left);
      snap(currId, targetId, deepestId, null, `q.add(curr.left) → Enqueue left child @${ADDR(curr.left)}.`, 'c_enqueueLeft');
    }

    const rightExist = curr.right !== null;
    snap(currId, targetId, deepestId, null, `Check: curr.right != null? → ${rightExist ? `TRUE (@${ADDR(curr.right)})` : 'FALSE'}`, 'c_rightCheck');
    if (rightExist) {
      queue.push(curr.right);
      snap(currId, targetId, deepestId, null, `q.add(curr.right) → Enqueue right child @${ADDR(curr.right)}.`, 'c_enqueueRight');
    }
  }

  snap(null, targetId, deepestId, null, `Traversal complete! Deepest rightmost node identified: @${ADDR(deepestId)} (val=${nodesMap[deepestId].val}).`, 'c_whileLoop');

  snap(null, targetId, deepestId, null, `Check: if (targetNode != null) → ${targetId !== null ? 'TRUE — Proceed to deletion' : 'FALSE — Target Not Found'}`, 'c_targetCheck');

  if (targetId === null) {
    snap(null, null, null, null, `Target key ${key} NOT FOUND in Binary Tree. Deletion cancelled.`, 'c_done');
    return steps;
  }

  // Single-node tree special case
  if (nodes.length === 1 && targetId === 0) {
    snap(null, targetId, deepestId, null, `Single node tree: root is target. Delete root node @${ADDR(0)}.`, 'c_replaceVal');
    nodes = [];
    edges = [];
    rootId = null;
    snap(null, null, null, null, `Node ${key} deleted! Tree is now empty.`, 'c_done');
    return steps;
  }

  // Get deepest value
  const deepestVal = nodesMap[deepestId].val;
  snap(null, targetId, deepestId, null, `deepestVal = curr.data → Read deepest value ${deepestVal} from @${ADDR(deepestId)}.`, 'c_getDeepest');

  // --- Step-by-step line-by-line execution of deleteDeepest(curr) ---
  snap(null, targetId, deepestId, null, `Call deleteDeepest(deepestNode = @${ADDR(deepestId)})`, 'c_deleteDeepest');
  snap(null, targetId, deepestId, null, `deleteDeepest: Call function body`, 'c_dd_call');

  const ddQueue = [rootId];
  snap(null, targetId, deepestId, null, `deleteDeepest: Initialize Queue q.`, 'c_dd_initQ', ddQueue);
  snap(null, targetId, deepestId, null, `deleteDeepest: q.add(root) → Enqueue root @${ADDR(rootId)}.`, 'c_dd_enqRoot', ddQueue);

  let disconnected = false;

  while (ddQueue.length > 0 && !disconnected) {
    snap(null, targetId, deepestId, null, `deleteDeepest: while (!q.isEmpty()) → ${ddQueue.length} node(s) in queue.`, 'c_dd_while', ddQueue);

    const tempId = ddQueue.shift();
    const tempNode = nodesMap[tempId];
    snap(null, targetId, deepestId, tempId, `deleteDeepest: Node temp = q.poll() → temp (parent) = @${tempNode.addr} (val=${tempNode.val}).`, 'c_dd_deq', ddQueue);

    // Left child check
    const hasLeft = tempNode.left !== null;
    snap(null, targetId, deepestId, tempId, `deleteDeepest: Check if (temp.left != null) → ${hasLeft ? `TRUE (@${ADDR(tempNode.left)})` : 'FALSE'}`, 'c_dd_leftCheck', ddQueue);

    if (hasLeft) {
      const isLeftDeepest = tempNode.left === deepestId;
      snap(null, targetId, deepestId, tempId, `deleteDeepest: Check if (temp.left == deepestNode) → ${isLeftDeepest ? 'TRUE — Found parent!' : 'FALSE'}`, 'c_dd_leftMatch', ddQueue);

      if (isLeftDeepest) {
        // Disconnect left child!
        tempNode.left = null;
        edges = edges.filter(e => !(e.from === tempId && e.to === deepestId));
        snap(null, targetId, deepestId, tempId, `deleteDeepest: temp.left = null → Disconnected left link from parent @${tempNode.addr} to deepest node @${ADDR(deepestId)}!`, 'c_dd_leftNull', ddQueue);

        // Remove deepest node from nodes array
        nodes = nodes.filter(n => n.id !== deepestId);
        delete nodesMap[deepestId];

        snap(null, targetId, null, tempId, `deleteDeepest: return → Disconnect complete! Return to caller.`, 'c_dd_return', ddQueue);
        disconnected = true;
        break;
      } else {
        ddQueue.push(tempNode.left);
        snap(null, targetId, deepestId, tempId, `deleteDeepest: q.add(temp.left) → Enqueue left child @${ADDR(tempNode.left)}.`, 'c_dd_leftEnq', ddQueue);
      }
    }

    // Right child check (if not disconnected)
    if (!disconnected) {
      const hasRight = tempNode.right !== null;
      snap(null, targetId, deepestId, tempId, `deleteDeepest: Check if (temp.right != null) → ${hasRight ? `TRUE (@${ADDR(tempNode.right)})` : 'FALSE'}`, 'c_dd_rightCheck', ddQueue);

      if (hasRight) {
        const isRightDeepest = tempNode.right === deepestId;
        snap(null, targetId, deepestId, tempId, `deleteDeepest: Check if (temp.right == deepestNode) → ${isRightDeepest ? 'TRUE — Found parent!' : 'FALSE'}`, 'c_dd_rightMatch', ddQueue);

        if (isRightDeepest) {
          // Disconnect right child!
          tempNode.right = null;
          edges = edges.filter(e => !(e.from === tempId && e.to === deepestId));
          snap(null, targetId, deepestId, tempId, `deleteDeepest: temp.right = null → Disconnected right link from parent @${tempNode.addr} to deepest node @${ADDR(deepestId)}!`, 'c_dd_rightNull', ddQueue);

          // Remove deepest node from nodes array
          nodes = nodes.filter(n => n.id !== deepestId);
          delete nodesMap[deepestId];

          snap(null, targetId, null, tempId, `deleteDeepest: return → Disconnect complete! Return to caller.`, 'c_dd_return', ddQueue);
          disconnected = true;
          break;
        } else {
          ddQueue.push(tempNode.right);
          snap(null, targetId, deepestId, tempId, `deleteDeepest: q.add(temp.right) → Enqueue right child @${ADDR(tempNode.right)}.`, 'c_dd_rightEnq', ddQueue);
        }
      }
    }
  }

  // Now replace targetNode value
  nodesMap[targetId].val = deepestVal;
  snap(null, targetId, null, null, `targetNode.data = deepestVal → Replaced target node @${ADDR(targetId)} value with ${deepestVal}!`, 'c_replaceVal');

  snap(null, null, null, null, `Node deletion complete! Key ${key} successfully removed.`, 'c_done');

  return steps;
}

/* ------------------------------------------------------------------ */
/* Reactive state                                                      */
/* ------------------------------------------------------------------ */
const inpElems  = ref('1 2 3 4 5 6 7');
const inpTarget = ref(3);
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
  nodes: [], edges: [], vars: [], badge: '', rootId: null, currId: null, targetId: null, deepestId: null, tempId: null, queueIds: [],
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

// Fixed node dimensions — constant at all times (matches BinaryTreeCreation.vue)
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

const START_Y    = PAD_TOP + NODE_BOX_H / 2; // 22

// Fixed ViewBox dimensions — invariant across all animation steps
const TREE_W        = PAD_SIDE + MAX_COLS * SPACING_X; // 540
const FIXED_TOTAL_W = TREE_W + PAD_SIDE;                // 590
const FIXED_TOTAL_H = START_Y + MAX_DEPTH * LEVEL_H + NODE_H / 2 + PAD_BOTTOM; // 216
const FIXED_VIEWBOX = `0 0 ${FIXED_TOTAL_W} ${FIXED_TOTAL_H}`;

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

// Approximate character width for monospace 12px bold font (px per char)
const CHAR_W = 8.5;
const LABEL_PAD = 6; // extra padding on each side of a label

function getPointerBadgesForNode(id) {
  const step = currentStep.value;
  if (!step) return [];
  const ptrs = [];
  if (step.rootId    === id) ptrs.push({ name: 'root',    label: 'root',    color: '#3b82f6' });
  if (step.targetId  === id) ptrs.push({ name: 'target',  label: 'target',  color: '#f04d4d' });
  if (step.deepestId === id) ptrs.push({ name: 'deepest', label: 'deepest', color: '#8b5cf6' });
  if (step.currId    === id) ptrs.push({ name: 'curr',    label: 'curr',    color: '#f97316' });
  if (step.tempId    === id) ptrs.push({ name: 'temp',    label: 'temp',    color: '#10b981' });

  const count = ptrs.length;
  if (!count) return [];

  const nodeX = pos(id).x;
  const nodeY = pos(id).y;
  const nbh   = treeLayout.value.nodeBoxH || 44;

  if (count === 1) {
    return [{ ...ptrs[0], x: nodeX, yText: nodeY - nbh / 2 - 22, yArrow: nodeY - nbh / 2 - 8 }];
  }

  // Calculate each label's half-width, then compute cumulative x positions
  // so that labels sit side by side with a small gap, all centered on nodeX.
  const GAP = 4; // px gap between label slots
  const halfWidths = ptrs.map(p => p.label.length * CHAR_W / 2 + LABEL_PAD);
  // Total width = sum of all widths + gaps between them
  const totalW = halfWidths.reduce((s, hw) => s + hw * 2, 0) + GAP * (count - 1);

  // Build absolute x positions starting from the left edge
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
  if (step.targetId  === n.id && step.code === 'c_replaceVal') return 'del-box-replaced';
  if (step.targetId  === n.id) return 'del-box-target';
  if (step.deepestId === n.id) return 'del-box-deepest';
  if (step.tempId    === n.id) return 'del-box-parent';
  if (step.currId    === n.id) return 'del-box-current';
  return '';
}

/* ------------------------------------------------------------------ */
/* Playback controls                                                   */
/* ------------------------------------------------------------------ */
function applyInput() {
  const tokens = parseInputTokens(inpElems.value);
  const tgt = parseInt(inpTarget.value) || 0;
  clearTimeout(playTimer);
  playing.value = false;
  if (!tokens.length) { steps.value = []; si.value = 0; return; }
  const { nodes, edges, rootId } = buildLevelOrderTree(tokens);
  steps.value = buildSteps(nodes, edges, rootId, tgt);
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
            <label>Delete Target</label>
            <input type="number" v-model.number="inpTarget" class="ll-num-input" @keyup.enter="applyInput" />
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
                    <div class="ll-ptr-chip">delete key = <b class="ll-c-coral">{{ inpTarget }}</b></div>
                    <div class="ll-ptr-chip">root = <b class="ll-c-blue">{{ fmt(s.rootId !== null && s.rootId !== undefined ? ADDR(s.rootId) : null) }}</b></div>
                    <div v-if="s.targetId !== null && s.targetId !== undefined" class="ll-ptr-chip">targetNode = <b style="color:#f04d4d">{{ fmt(ADDR(s.targetId)) }}</b></div>
                    <div v-if="s.deepestId !== null && s.deepestId !== undefined" class="ll-ptr-chip">deepestNode = <b style="color:#8b5cf6">{{ fmt(ADDR(s.deepestId)) }}</b></div>
                    <div v-if="s.tempId !== null && s.tempId !== undefined" class="ll-ptr-chip">temp (parent) = <b style="color:#10b981">{{ fmt(ADDR(s.tempId)) }}</b></div>
                    <div v-if="s.currId !== null && s.currId !== undefined" class="ll-ptr-chip">curr = <b class="ll-c-orange">{{ fmt(ADDR(s.currId)) }}</b></div>
                  </div>

                  <svg class="ll-svg"
                    :viewBox="treeLayout.viewBox"
                    preserveAspectRatio="xMidYMid meet"
                    width="100%" height="100%">

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
                <span class="ll-leg"><span class="ll-legdot ll-legdot-normal"></span>tree node</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-current"></span>curr (traversing)</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-target"></span>targetNode (to delete)</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-deepest"></span>deepestNode (rightmost)</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-parent"></span>temp (parent)</span>
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
                  'bs-badge-found':    s.code === 'c_replaceVal' || s.code === 'c_done',
                  'bs-badge-notfound': s.code === 'c_targetCheck' && !s.targetId,
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
                  <h3>Time &amp; Space Complexity &mdash; Binary Tree Node Deletion</h3>
                  <table class="ll-complexity-table">
                    <thead><tr><th>Metric</th><th>Complexity</th><th>Why</th></tr></thead>
                    <tbody>
                      <tr><td>Time Complexity</td><td>O(N)</td><td>Level Order Traversal visits all N nodes to locate targetNode and deepestNode, then O(N) step-by-step traversal to disconnect deepest.</td></tr>
                      <tr><td>Space Complexity (Queue)</td><td>O(W) &approx; O(N)</td><td>Queue holds up to W nodes at the widest level (up to N/2 nodes).</td></tr>
                    </tbody>
                  </table>
                  <p class="ll-note">
                    <b>Standard Binary Tree Deletion Strategy:</b><br/>
                    Unlike BST deletion (which maintains sorted order), general Binary Tree deletion replaces the <code>targetNode.data</code> with the <code>deepestNode.data</code>, then disconnects the <code>deepestNode</code> from its parent. This preserves the binary tree structure!
                  </p>
                  <h3>Algorithm Steps</h3>
                  <p>1. Perform Level Order Traversal (BFS) using a queue to locate <code>targetNode</code> and find the <code>deepestNode</code>.<br/>
                     2. If <code>targetNode</code> is not found, stop.<br/>
                     3. Read <code>deepestVal = deepestNode.data</code>.<br/>
                     4. Call <code>deleteDeepest(deepestNode)</code>: Traverse level order step-by-step using queue to find parent <code>temp</code>, then set <code>temp.left = null</code> or <code>temp.right = null</code>.<br/>
                     5. Overwrite <code>targetNode.data = deepestVal</code>.</p>
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
  --node: #1d4ed8; --nodeCur: #c2410c; --nodeTarget: #b91c1c; --nodeDeepest: #6d28d9; --nodeParent: #047857;
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
.ll-num-input { width: 70px; }
.ll-text-input { width: 200px; padding: 5px 10px; }
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
.ll-viz-wrap { flex-shrink: 0; background: var(--surface); border-bottom: 1px solid var(--border); position: relative; overflow: hidden; }
.ll-perm-area { display: flex; flex-direction: column; align-items: stretch; height: 100%; }
.ll-ptrs { display: flex; gap: 8px; flex-wrap: wrap; padding: 10px 16px 4px; min-height: 36px; }
.ll-ptr-chip { background: var(--surface2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 3px 10px; font-size: 12px; font-family: monospace; box-shadow: var(--shadow-sm); }
.bs-found-chip    { background: var(--green-light); border-color: var(--green); color: #15803d; font-weight: 700; }
.bs-notfound-chip { background: #fff7ed; border-color: var(--orange); color: #9a3412; font-weight: 700; }
.ll-c-blue   { color: var(--blue); }
.ll-c-orange { color: var(--orange); }
.ll-c-green  { color: var(--green); }
.ll-c-coral  { color: var(--coral); font-weight: 700; }
.ll-svg { display: block; flex: 1; min-height: 0; }
.bt-edge-line { stroke: #cbd5e1; stroke-width: 2px; }
.heap-ptr-txt   { font-size: 12px; font-weight: 800; font-family: 'Consolas', 'Fira Code', monospace;}
.heap-ptr-arrow { font-size: 14px; font-weight: 900; font-family: system-ui, sans-serif; }
.ll-node-wrap { display: flex; flex-direction: column; align-items: center; width: 100%; height: 100%; }
.ll-box { display: flex; flex-direction: column; border: 2px solid var(--blue); border-radius: var(--radius-sm); overflow: hidden; background: var(--node); width: 100%; height: 44px; color: #fff; animation: ll-pop .3s ease; box-shadow: var(--shadow-sm); transition: background .3s, border-color .3s; }
.del-box-replaced { border-color: #22c55e !important; background: #15803d !important; box-shadow: 0 0 0 4px rgba(34,197,94,.4) !important; }
.del-box-target   { border-color: #ef4444 !important; background: var(--nodeTarget) !important; box-shadow: 0 0 0 3px rgba(239,68,68,.3) !important; }
.del-box-deepest  { border-color: #a855f7 !important; background: var(--nodeDeepest) !important; box-shadow: 0 0 0 3px rgba(168,85,247,.3) !important; }
.del-box-parent   { border-color: #10b981 !important; background: var(--nodeParent) !important; box-shadow: 0 0 0 3px rgba(16,185,129,.3) !important; }
.del-box-current  { border-color: var(--orange) !important; background: var(--nodeCur) !important; box-shadow: 0 0 0 3px rgba(249,115,22,.25) !important; }
.ll-node-top { display: flex; flex: 1; width: 100%; height: 100%; }
.ll-data { padding: 4px 4px; font-weight: 700; font-size: 15px; display: flex; align-items: center; justify-content: center; flex: 1.2; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
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
.ll-legdot-target  { background: var(--nodeTarget);  border: 1.5px solid #ef4444; }
.ll-legdot-deepest { background: var(--nodeDeepest); border: 1.5px solid #a855f7; }
.ll-legdot-parent  { background: var(--nodeParent);  border: 1.5px solid #10b981; }
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
