<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, watch } from 'vue';

defineProps({
  topic: { type: String, default: 'Depth-First Search (DFS)' },
  subTopic: { type: String, default: 'Graph Traversal Algorithm' }
});

const CODES = {
  java: [
    ['', 'class DFSGraph {'],
    ['c_entry', '    void dfs(int[][] adj, int V, int startNode) {'],
    ['c_init_visited', '        boolean[] visited = new boolean[V];'],
    ['c_init_stack', '        int[] stack = new int[V];'],
    ['', '        int top = -1;'],
    ['', ''],
    ['c_push_start', '        stack[++top] = startNode;'],
    ['', ''],
    ['c_while', '        while (top >= 0) {'],
    ['c_pop', '            int u = stack[top--];'],
    ['', ''],
    ['c_check_vis', '            if (!visited[u]) {'],
    ['c_mark_vis', '                visited[u] = true;'],
    ['c_process', '                process(u); // Visit u'],
    ['', ''],
    ['c_for_adj', '                for (int v = V - 1; v >= 0; v--) {'],
    ['c_check_nbr', '                    if (adj[u][v] == 1 && !visited[v]) {'],
    ['c_push_v', '                        stack[++top] = v;'],
    ['', '                    }'],
    ['', '                }'],
    ['', '            }'],
    ['', '        }'],
    ['c_done', '    }'],
    ['', '}']
  ],
  c: [
    ['c_entry', 'void dfs(int adj[MAX][MAX], int V, int startNode) {'],
    ['c_init_visited', '    bool visited[MAX] = {false};'],
    ['c_init_stack', '    int stack[MAX], top = -1;'],
    ['', ''],
    ['c_push_start', '    stack[++top] = startNode;'],
    ['', ''],
    ['c_while', '    while (top >= 0) {'],
    ['c_pop', '        int u = stack[top--];'],
    ['', ''],
    ['c_check_vis', '        if (!visited[u]) {'],
    ['c_mark_vis', '            visited[u] = true;'],
    ['c_process', '            printf("%d ", u);'],
    ['', ''],
    ['c_for_adj', '            for (int v = V - 1; v >= 0; v--) {'],
    ['c_check_nbr', '                if (adj[u][v] == 1 && !visited[v]) {'],
    ['c_push_v', '                    stack[++top] = v;'],
    ['', '                }'],
    ['', '            }'],
    ['', '        }'],
    ['', '    }'],
    ['c_done', '}']
  ],
  cpp: [
    ['', 'class DFSGraph {'],
    ['', 'public:'],
    ['c_entry', '    void dfs(int adj[10][10], int V, int startNode) {'],
    ['c_init_visited', '        bool visited[10] = {false};'],
    ['c_init_stack', '        int stack[10], top = -1;'],
    ['', ''],
    ['c_push_start', '        stack[++top] = startNode;'],
    ['', ''],
    ['c_while', '        while (top >= 0) {'],
    ['c_pop', '            int u = stack[top--];'],
    ['', ''],
    ['c_check_vis', '            if (!visited[u]) {'],
    ['c_mark_vis', '                visited[u] = true;'],
    ['c_process', '                cout << u << " ";'],
    ['', ''],
    ['c_for_adj', '                for (int v = V - 1; v >= 0; v--) {'],
    ['c_check_nbr', '                    if (adj[u][v] == 1 && !visited[v]) {'],
    ['c_push_v', '                        stack[++top] = v;'],
    ['', '                    }'],
    ['', '                }'],
    ['', '            }'],
    ['', '        }'],
    ['c_done', '    }'],
    ['', '};']
  ],
  python: [
    ['', 'class DFSGraph:'],
    ['c_entry', '    def dfs(self, adj, start_node):'],
    ['c_init_visited', '        visited = [False] * len(adj)'],
    ['c_init_stack', '        stack = [start_node]'],
    ['', ''],
    ['c_while', '        while stack:'],
    ['c_pop', '            u = stack.pop()'],
    ['', ''],
    ['c_check_vis', '            if not visited[u]:'],
    ['c_mark_vis', '                visited[u] = True'],
    ['c_process', '                print(u, end=" ")'],
    ['', ''],
    ['c_for_adj', '                for v in reversed(adj[u]):'],
    ['c_check_nbr', '                    if not visited[v]:'],
    ['c_push_v', '                        stack.append(v)'],
    ['c_done', '']
  ],
  javascript: [
    ['', 'class DFSGraph {'],
    ['c_entry', '  dfs(adjMatrix, V, startNode) {'],
    ['c_init_visited', '    const visited = new Array(V).fill(false);'],
    ['c_init_stack', '    const stack = new Array(V);'],
    ['', '    let top = -1;'],
    ['', ''],
    ['c_push_start', '    stack[++top] = startNode;'],
    ['', ''],
    ['c_while', '    while (top >= 0) {'],
    ['c_pop', '      const u = stack[top--];'],
    ['', ''],
    ['c_check_vis', '      if (!visited[u]) {'],
    ['c_mark_vis', '        visited[u] = true;'],
    ['c_process', '        console.log(u);'],
    ['', ''],
    ['c_for_adj', '        for (let v = V - 1; v >= 0; v--) {'],
    ['c_check_nbr', '          if (adjMatrix[u][v] === 1 && !visited[v]) {'],
    ['c_push_v', '            stack[++top] = v;'],
    ['', '          }'],
    ['', '        }'],
    ['', '      }'],
    ['', '    }'],
    ['c_done', '  }'],
    ['', '}']
  ]
};

const PSEUDOCODE = [
  'function DFS(adjMatrix, V, startNode):',
  '    visited = array of size V initialized to false',
  '    stack = array of size V',
  '    top = -1',
  '    stack[++top] = startNode',
  '    while top >= 0:',
  '        u = stack[top--]',
  '        if not visited[u]:',
  '            visited[u] = true',
  '            output u',
  '            for v from V - 1 down to 0:',
  '                if adjMatrix[u][v] == 1 and not visited[v]:',
  '                    stack[++top] = v'
];

const PSEUDOCODE_MAP = {
  'c_entry': 0,
  'c_init_visited': 1,
  'c_init_stack': 2,
  'c_push_start': 4,
  'c_while': 5,
  'c_pop': 6,
  'c_check_vis': 7,
  'c_mark_vis': 8,
  'c_process': 9,
  'c_for_adj': 10,
  'c_check_nbr': 11,
  'c_push_v': 12,
  'c_done': -1
};

function frame(title, rows) { return { title, rows }; }

function parseEdges(str) {
  if (!str || !str.trim()) return [];
  try {
    const parsed = JSON.parse(str);
    if (Array.isArray(parsed)) {
      return parsed
        .filter(e => Array.isArray(e) && e.length >= 2)
        .map(e => ({ u: parseInt(e[0]), v: parseInt(e[1]) }));
    }
  } catch (err) {
    const matches = (str || '').match(/\[\s*\d+\s*,\s*\d+\s*\]/g);
    if (matches) {
      return matches.map(m => {
        try {
          const arr = JSON.parse(m);
          return { u: parseInt(arr[0]), v: parseInt(arr[1]) };
        } catch (e) { return null; }
      }).filter(Boolean);
    }
  }
  return [];
}

function buildSteps(numV, rawEdgesStr, startNodeInput) {
  const steps = [];
  const rawV = parseInt(numV);
  const V = isNaN(rawV) || rawV < 0 ? 0 : Math.min(10, rawV);
  const parsedEdges = parseEdges(rawEdgesStr);
  const startNode = Math.max(0, Math.min(V > 0 ? V - 1 : 0, parseInt(startNodeInput) || 0));
  const fnDfs = `dfs(adjMatrix, ${startNode})`;

  if (V === 0) {
    steps.push({
      badge: 'Number of vertices is 0. No graph, stack, or DFS traversal created.',
      code: '',
      vars: [frame('main()', []), frame('dfs()', [['vertices', '0']])],
      V: 0, edges: [], activeU: -1, activeV: -1, queue: [], visited: [], traversal: [], treeEdges: []
    });
    return steps;
  }

  // Build Adjacency Matrix
  const adjMatrix = Array.from({ length: V }, () => new Array(V).fill(0));
  parsedEdges.forEach(e => {
    if (e.u >= 0 && e.u < V && e.v >= 0 && e.v < V) {
      adjMatrix[e.u][e.v] = 1;
    }
  });

  const visited = new Array(V).fill(false);
  const stack = [];
  const stackParent = [];
  let top = -1;
  const traversal = [];
  const treeEdges = [];

  // Step 1: Function Entry
  steps.push({
    badge: `dfs(adjMatrix, ${V}, ${startNode}) called → Starting DFS Traversal from source vertex ${startNode}`,
    code: 'c_entry',
    vars: [frame('main()', []), frame(fnDfs, [['V', String(V)], ['startNode', String(startNode)]])],
    V, edges: parsedEdges, activeU: -1, activeV: -1, queue: [...stack], visited: [...visited], traversal: [...traversal], treeEdges: [...treeEdges]
  });

  // Step 2: Init Visited Array
  steps.push({
    badge: `boolean[] visited = new boolean[${V}] → Allocated visited array initialized to false`,
    code: 'c_init_visited',
    vars: [frame('main()', []), frame(fnDfs, [['visited', `boolean[${V}]`]])],
    V, edges: parsedEdges, activeU: -1, activeV: -1, queue: [...stack], visited: [...visited], traversal: [...traversal], treeEdges: [...treeEdges]
  });

  // Step 3: Init Stack & Pointer
  steps.push({
    badge: `int[] stack = new int[${V}], top = -1 → Initialized empty Stack array and pointer`,
    code: 'c_init_stack',
    vars: [frame('main()', []), frame(fnDfs, [['top', '-1'], ['stack', '[]']])],
    V, edges: parsedEdges, activeU: -1, activeV: -1, queue: [...stack], visited: [...visited], traversal: [...traversal], treeEdges: [...treeEdges]
  });

  // Step 4: Push Start Node to Stack
  stack.push(startNode);
  stackParent.push(null);
  top++;
  steps.push({
    badge: `stack[++top] = ${startNode} → Pushed source vertex ${startNode} onto Stack (top = 0)`,
    code: 'c_push_start',
    vars: [frame('main()', []), frame(fnDfs, [['top', '0'], ['stack', `[${stack.join(', ')}]`]])],
    V, edges: parsedEdges, activeU: startNode, activeV: -1, queue: [...stack], visited: [...visited], traversal: [...traversal], treeEdges: [...treeEdges]
  });

  // Step 5: Loop while top >= 0
  while (top >= 0) {
    steps.push({
      badge: `while (top >= 0) → Condition met (top = ${top}). Stack: [${stack.join(', ')}]`,
      code: 'c_while',
      vars: [frame('main()', []), frame(fnDfs, [['top', String(top)], ['stack', `[${stack.join(', ')}]`]])],
      V, edges: parsedEdges, activeU: -1, activeV: -1, queue: [...stack], visited: [...visited], traversal: [...traversal], treeEdges: [...treeEdges]
    });

    const u = stack.pop();
    const p = stackParent.pop();
    top--;
    steps.push({
      badge: `u = stack[top--] → Popped top vertex u = ${u} from Stack (top = ${top})`,
      code: 'c_pop',
      vars: [frame('main()', []), frame(fnDfs, [['u', String(u)], ['top', String(top)], ['stack', `[${stack.join(', ')}]`]])],
      V, edges: parsedEdges, activeU: u, activeV: -1, queue: [...stack], visited: [...visited], traversal: [...traversal], treeEdges: [...treeEdges]
    });

    const isVisitedU = visited[u];
    steps.push({
      badge: `if (!visited[${u}]) → Check if vertex ${u} is visited (visited[${u}] = ${isVisitedU})`,
      code: 'c_check_vis',
      vars: [frame('main()', []), frame(fnDfs, [['u', String(u)], ['visited[' + u + ']', String(isVisitedU)]])],
      V, edges: parsedEdges, activeU: u, activeV: -1, queue: [...stack], visited: [...visited], traversal: [...traversal], treeEdges: [...treeEdges]
    });

    if (!isVisitedU) {
      visited[u] = true;
      if (p !== null && p !== undefined) {
        treeEdges.push({ u: p, v: u });
      }
      steps.push({
        badge: `visited[${u}] = true → Marked vertex ${u} as visited`,
        code: 'c_mark_vis',
        vars: [frame('main()', []), frame(fnDfs, [['u', String(u)], ['visited[' + u + ']', 'true']])],
        V, edges: parsedEdges, activeU: u, activeV: -1, queue: [...stack], visited: [...visited], traversal: [...traversal], treeEdges: [...treeEdges]
      });

      traversal.push(u);
      steps.push({
        badge: `process(${u}) → Output vertex ${u}. Current DFS Traversal: [${traversal.join(', ')}]`,
        code: 'c_process',
        vars: [frame('main()', []), frame(fnDfs, [['u', String(u)], ['traversal', `[${traversal.join(', ')}]`]])],
        V, edges: parsedEdges, activeU: u, activeV: -1, queue: [...stack], visited: [...visited], traversal: [...traversal], treeEdges: [...treeEdges]
      });

      // Push unvisited neighbors in reverse order (v = V - 1 down to 0) so smaller indices are popped first
      for (let v = V - 1; v >= 0; v--) {
        steps.push({
          badge: `for (int v = ${V - 1}; v >= 0; v--) → Loop candidate neighbor v = ${v} for active vertex u = ${u}`,
          code: 'c_for_adj',
          vars: [frame('main()', []), frame(fnDfs, [['u', String(u)], ['v', String(v)]])],
          V, edges: parsedEdges, activeU: u, activeV: v, queue: [...stack], visited: [...visited], traversal: [...traversal], treeEdges: [...treeEdges]
        });

        const hasEdge = adjMatrix[u][v] === 1;
        const isVisitedV = visited[v];

        steps.push({
          badge: `if (adjMatrix[${u}][${v}] == 1 && !visited[${v}]) → adjMatrix[${u}][${v}] = ${hasEdge ? 1 : 0}, visited[${v}] = ${isVisitedV}`,
          code: 'c_check_nbr',
          vars: [frame('main()', []), frame(fnDfs, [['u', String(u)], ['v', String(v)], ['edge', String(hasEdge)], ['visited[' + v + ']', String(isVisitedV)]])],
          V, edges: parsedEdges, activeU: u, activeV: v, queue: [...stack], visited: [...visited], traversal: [...traversal], treeEdges: [...treeEdges]
        });

        if (hasEdge && !isVisitedV) {
          stack.push(v);
          stackParent.push(u);
          top++;
          steps.push({
            badge: `stack[++top] = ${v} → Pushed unvisited neighbor vertex ${v} onto Stack (top = ${top})`,
            code: 'c_push_v',
            vars: [frame('main()', []), frame(fnDfs, [['v', String(v)], ['top', String(top)], ['stack', `[${stack.join(', ')}]`]])],
            V, edges: parsedEdges, activeU: u, activeV: v, queue: [...stack], visited: [...visited], traversal: [...traversal], treeEdges: [...treeEdges]
          });
        }
      }
    }
  }

  // Loop condition fails (top == -1)
  steps.push({
    badge: `while (top >= 0) → Loop condition failed (top = -1). Stack is empty.`,
    code: 'c_while',
    vars: [frame('main()', []), frame(fnDfs, [['top', '-1']])],
    V, edges: parsedEdges, activeU: -1, activeV: -1, queue: [], visited: [...visited], traversal: [...traversal], treeEdges: [...treeEdges]
  });

  steps.push({
    badge: `DFS Traversal Complete! Final Output Sequence: [${traversal.join(', ')}]`,
    code: 'c_done',
    vars: [frame('main()', []), frame(fnDfs, [['DFS Result', `[${traversal.join(', ')}]`]])],
    V, edges: parsedEdges, activeU: -1, activeV: -1, queue: [], visited: [...visited], traversal: [...traversal], treeEdges: [...treeEdges]
  });

  return steps;
}

const numVInput = ref(5);
const edgesInputStr = ref('[[0,1],[0,2],[1,3],[1,4],[2,4]]');
const startNodeInput = ref(0);
const lang = ref('java');
const speed = ref(650);
const si = ref(0);
const playing = ref(false);
const vizHeight = ref(280);
const tableHeight = ref(60);
const leftWidth = ref(55);
const rightTab = ref('code');
const showGraphModal = ref(false);
const hoveredEdge = ref(null);

const defaultEdgeStr = '[[0,1],[0,2],[1,3],[1,4],[2,4]]';
const stepsData = reactive({ steps: buildSteps(5, defaultEdgeStr, 0) });
const steps = computed(() => stepsData.steps);
const s = computed(() => steps.value[Math.max(0, Math.min(si.value, steps.value.length - 1))] || {});
const codeLines = computed(() => CODES[lang.value] || []);

const modalNodePositions = computed(() => {
  const V = s.value.V ?? 0;
  if (V <= 0) return [];
  const positions = [];
  const cx = 360, cy = 230;
  const r = V <= 4 ? 145 : (V <= 6 ? 168 : 185);
  for (let i = 0; i < V; i++) {
    const angle = (2 * Math.PI * i) / V - Math.PI / 2;
    positions.push({
      id: i,
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle)
    });
  }
  return positions;
});

function getEdgeGeometry(edge, positions, allEdges, curvature = 32) {
  const uNode = positions[edge.u];
  const vNode = positions[edge.v];
  if (!uNode || !vNode) return { pathD: '', labelX: 0, labelY: 0, isBi: false };

  const x1 = uNode.x, y1 = uNode.y;
  const x2 = vNode.x, y2 = vNode.y;
  const dx = x2 - x1, dy = y2 - y1;
  const dist = Math.hypot(dx, dy) || 1;

  const ux = dx / dist, uy = dy / dist;
  const nx = -uy, ny = ux;

  const isBi = allEdges.some(e => e.u === edge.v && e.v === edge.u);

  const h = isBi ? curvature : 0;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const cx = mx + h * nx;
  const cy = my + h * ny;

  const nodeR = 20;
  const startX = x1 + ux * nodeR + (isBi ? nx * 6 : 0);
  const startY = y1 + uy * nodeR + (isBi ? ny * 6 : 0);
  const endX = x2 - ux * nodeR + (isBi ? nx * 6 : 0);
  const endY = y2 - uy * nodeR + (isBi ? ny * 6 : 0);

  const pathD = isBi
    ? `M ${startX} ${startY} Q ${cx} ${cy} ${endX} ${endY}`
    : `M ${startX} ${startY} L ${endX} ${endY}`;

  const labelX = isBi ? 0.25 * startX + 0.5 * cx + 0.25 * endX : mx;
  const labelY = isBi ? 0.25 * startY + 0.5 * cy + 0.25 * endY : my;

  return { pathD, labelX, labelY, isBi };
}

function getEdgeGeo(edge) {
  return getEdgeGeometry(edge, modalNodePositions.value, s.value.edges || [], 32);
}

function isEdgeHovered(u, v) {
  return hoveredEdge.value && hoveredEdge.value.u === u && hoveredEdge.value.v === v;
}
function isNodeHoveredSource(nodeId) {
  return hoveredEdge.value && hoveredEdge.value.u === nodeId;
}
function isNodeHoveredTarget(nodeId) {
  return hoveredEdge.value && hoveredEdge.value.v === nodeId;
}
function isTreeEdge(u, v) {
  return (s.value.treeEdges || []).some(e => (e.u === u && e.v === v) || (e.u === v && e.v === u));
}

let playTimer = null;

function applySetup() {
  const rawV = parseInt(numVInput.value);
  const vCount = isNaN(rawV) || rawV < 0 ? 0 : Math.min(10, rawV);
  playing.value = false;
  stepsData.steps = buildSteps(vCount, edgesInputStr.value, startNodeInput.value);
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

watch(playing, v => {
  if (v) tick();
  else clearTimeout(playTimer);
});

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
  cleanupFns.push(initVResizer(vizResizerRef, vizHeight, 180, 500));
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
      <img src="../../assets/logo.png" alt="Logo" />
    </div>

    <div class="slide-body">
      <div class="row-main">
        <div class="ll-root">
          <!-- Control Panel Toolbar -->
          <div class="ll-toolbar">
            <label>Vertices</label>
            <input type="number" v-model.number="numVInput" min="0" max="10" style="width: 45px;" class="ll-text-input" @change="applySetup" @keyup.enter="applySetup" />

            <span class="ll-divider">|</span>

            <label>Edges</label>
            <input type="text" v-model="edgesInputStr" style="width: 180px;" class="ll-text-input" placeholder="e.g. [[0,1],[0,2]]" @keyup.enter="applySetup" />

            <span class="ll-divider">|</span>

            <label>Start Node</label>
            <input type="number" v-model.number="startNodeInput" min="0" :max="(numVInput > 0 ? numVInput - 1 : 0)" style="width: 45px;" class="ll-text-input" @change="applySetup" @keyup.enter="applySetup" />

            <button class="ll-viz-btn" @click="applySetup" title="Run DFS Traversal">&#9654;</button>

            <button class="ll-graph-modal-btn" style="background-color: slategray" @click="showGraphModal = !showGraphModal">
              {{ showGraphModal ? 'Hide' : 'Show' }}
            </button>

            <div class="ll-nav-controls">
              <button class="ll-nav-btn" title="First step" @click="stepBy(-steps.length)">&#171;</button>
              <button class="ll-nav-btn" @click="stepBy(-1)">&#8249; Prev</button>
              <button class="ll-play-btn" @click="togglePlay">{{ playing ? '\u23F8 Pause' : '\u25B6 Play' }}</button>
              <button class="ll-nav-btn" @click="stepBy(1)">Next &#8250;</button>
              <button class="ll-nav-btn" title="Last step" @click="stepBy(steps.length)">&#187;</button>
            </div>
          </div>

          <div class="ll-main" ref="mainRef">
            <!-- Left Visualization Column -->
            <div class="ll-left-col" ref="leftColRef" :style="{ width: leftWidth + '%' }">
              <div class="ll-viz-wrap" :style="{ height: vizHeight + 'px' }">
                <div class="ll-perm-area">
                  <!-- Empty State when V = 0 -->
                  <div v-if="(s.V ?? 0) === 0" class="ll-empty-matrix-msg">
                    No graph or DFS traversal to display (Vertices = 0). Set Vertices &gt; 0 to run DFS.
                  </div>

                  <template v-else>
                    <!-- Stack Track -->
                    <div class="ll-section-wrap">
                      <div class="ll-section-title">
                        DFS Stack <code>stack.pop() &#10145; [ Bottom ... Top ] &#10145; stack.push()</code>:
                      </div>
                      <div class="ll-queue-track">
                        <span class="ll-q-lbl">Bottom &#10145;</span>
                        <template v-if="s.queue && s.queue.length">
                          <div
                            v-for="(val, idx) in s.queue"
                            :key="'st-' + idx + '-' + val"
                            class="ll-queue-cell"
                            :class="{ 'll-q-head': idx === s.queue.length - 1 }"
                          >
                            {{ val }}
                          </div>
                        </template>
                        <div v-else class="ll-q-empty">(Empty Stack)</div>
                        <span class="ll-q-lbl">&#10145; Top</span>
                      </div>
                    </div>

                    <!-- Visited Array -->
                    <div class="ll-section-wrap">
                      <div class="ll-section-title">Visited Array <code>visited[i]</code>:</div>
                      <div class="ll-vis-track">
                        <div
                          v-for="vIdx in s.V"
                          :key="'vis-' + (vIdx - 1)"
                          class="ll-vis-item"
                          :class="{
                            'll-vis-true': s.visited && s.visited[vIdx - 1],
                            'll-vis-active': (vIdx - 1) === s.activeU || (vIdx - 1) === s.activeV
                          }"
                        >
                          <span class="ll-vis-idx">[{{ vIdx - 1 }}]</span>
                          <span class="ll-vis-val">{{ s.visited && s.visited[vIdx - 1] ? 'true' : 'false' }}</span>
                        </div>
                      </div>
                    </div>

                    <!-- DFS Traversal Sequence (below Visited Array) -->
                    <div class="ll-section-wrap">
                      <div class="ll-section-title">DFS Traversal Order:</div>
                      <div class="ll-res-track">
                        <template v-if="s.traversal && s.traversal.length">
                          <span
                            v-for="(nodeId, idx) in s.traversal"
                            :key="'tr-' + idx"
                            class="ll-res-chip"
                          >
                            <span v-if="idx > 0" class="ll-res-arrow">&#10145;</span>
                            <span class="ll-res-node">{{ nodeId }}</span>
                          </span>
                        </template>
                        <span v-else class="ll-res-empty">None yet</span>
                      </div>
                    </div>
                  </template>
                </div>
              </div>

              <div class="ll-vresizer" ref="vizResizerRef"></div>

              <!-- Color Legend -->
              <div class="ll-legend">
                <span class="ll-leg"><span class="ll-legdot ll-legdot-unvis"></span>Unvisited</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-active"></span>Current (u)</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-nbr"></span>Neighbor (v)</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-inq"></span>In Stack</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-visited"></span>Visited</span>
              </div>

              <!-- Variable Frames & Stack -->
              <div class="ll-table-area" :style="{ height: tableHeight + 'px' }">
                <div class="ll-table-title">Variable frames &mdash; innermost = current</div>
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
                        <span class="ll-fname">{{ r[0] }}</span>=<span :class="depth === s.vars.length - 1 ? 'll-c-orange' : 'll-c-green'" style="font-weight:700">{{ r[1] }}</span>
                      </span>)<span v-if="depth === s.vars.length - 1" class="ll-now"> &#9668; current</span>
                    </div>
                  </template>
                  <template v-else>&mdash;</template>
                </div>
              </div>

              <div class="ll-vresizer" ref="tableResizerRef"></div>

              <!-- Step Badge -->
              <div class="ll-badge-wrap">
                <div class="ll-badge">{{ s.badge }}</div>
              </div>
            </div>

            <div class="ll-resizer" ref="hResizerRef"></div>

            <!-- Right Column: Code & Theory -->
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

                <!-- Code Scroll -->
                <div v-if="rightTab === 'code'" class="ll-code-scroll">
                  <pre class="ll-pre"><span
                    v-for="(line, i) in codeLines"
                    :key="i"
                    class="ll-codeline"
                    :class="{ 'll-hl': line[0] && line[0] === s.code }"
                  >{{ line[1] === '' ? ' ' : line[1] }}</span></pre>
                </div>

                <!-- Pseudocode Scroll -->
                <div v-else-if="rightTab === 'pseudo'" class="ll-code-scroll">
                  <pre class="ll-pre"><span
                    v-for="(line, i) in PSEUDOCODE"
                    :key="i"
                    class="ll-codeline"
                    :class="{ 'll-hl': PSEUDOCODE_MAP[s.code] === i }"
                  >{{ line }}</span></pre>
                </div>

                <!-- Complexity Scroll -->
                <div v-else class="ll-info-scroll">
                  <h3>Time &amp; Space Complexity</h3>
                  <table class="ll-complexity-table">
                    <thead><tr><th>Metric</th><th>Complexity</th><th>Why</th></tr></thead>
                    <tbody>
                      <tr><td>Time Complexity</td><td>O(V + E)</td><td>Every vertex is visited once and every edge is traversed once.</td></tr>
                      <tr><td>Space Complexity</td><td>O(V)</td><td>Requires O(V) space for the DFS Call Stack / Explicit Stack and Visited boolean array.</td></tr>
                    </tbody>
                  </table>
                  <p class="ll-note">
                    Key property: <b>DFS</b> explores as deep as possible along each branch before backtracking using a <b>LIFO Stack</b>.
                  </p>
                  <h3>Applications</h3>
                  <p>Topological Sorting, Cycle Detection, Connected Components, Maze Solving, Path Finding.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="ll-footer">
            Step {{ si + 1 }} / {{ steps.length }}
            <span class="ll-speed-wrap">Speed <input type="range" min="100" max="2000" step="100" v-model.number="speed" /></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Graph Modal Dialog Container -->
    <div v-if="showGraphModal" class="graph-modal-backdrop" @click.self="showGraphModal = false">
      <div class="graph-modal-card">
        <div class="graph-modal-header">
          <div class="graph-modal-title">
            <span>Depth-First Search (DFS) Graph View</span>
            <span class="graph-subtitle">(Depth-First Traversal &amp; Tree Edges)</span>
          </div>
          <button class="graph-close-btn" @click="showGraphModal = false" title="Close modal">&times;</button>
        </div>

        <div class="graph-modal-body">
          <div v-if="(s.V ?? 0) === 0" class="ll-empty-graph-msg">
            No vertices or edges to display (Vertices = 0).
          </div>
          <svg v-else class="graph-modal-svg" viewBox="0 0 720 470">
            <defs>
              <marker id="dfs-arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
              </marker>
              <marker id="dfs-arrowhead-active" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f97316" />
              </marker>
              <marker id="dfs-arrowhead-hover" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
              </marker>
              <marker id="dfs-arrowhead-tree" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" />
              </marker>
            </defs>

            <!-- Directed / Graph Edges -->
            <g
              v-for="edge in s.edges"
              :key="'me-' + edge.u + '-' + edge.v"
              @mouseenter="hoveredEdge = { u: edge.u, v: edge.v }"
              @mouseleave="hoveredEdge = null"
              style="cursor: pointer;"
            >
              <!-- Hit target -->
              <path
                :d="getEdgeGeo(edge).pathD"
                fill="none"
                stroke="transparent"
                stroke-width="18"
                stroke-linecap="round"
              />

              <!-- Edge Line -->
              <path
                :d="getEdgeGeo(edge).pathD"
                fill="none"
                class="ll-edge-line"
                :class="{
                  'll-edge-active': edge.u === s.activeU && edge.v === s.activeV,
                  'll-edge-tree': isTreeEdge(edge.u, edge.v),
                  'll-edge-hovered': isEdgeHovered(edge.u, edge.v)
                }"
                :marker-end="isEdgeHovered(edge.u, edge.v)
                  ? 'url(#dfs-arrowhead-hover)'
                  : ((edge.u === s.activeU && edge.v === s.activeV) ? 'url(#dfs-arrowhead-active)' : (isTreeEdge(edge.u, edge.v) ? 'url(#dfs-arrowhead-tree)' : 'url(#dfs-arrowhead)'))"
              />
            </g>

            <!-- Graph Vertex Nodes -->
            <g v-for="node in modalNodePositions" :key="'mn-' + node.id">
              <!-- Pointer Labels above/below Nodes based on position -->
              <g v-if="node.id === s.activeU || node.id === s.activeV || isNodeHoveredSource(node.id) || isNodeHoveredTarget(node.id) || node.id === startNodeInput">
                <template v-if="node.y > 230">
                  <text
                    :x="node.x"
                    :y="node.y + 22"
                    class="ll-svg-ptr"
                    :class="isNodeHoveredSource(node.id) ? 'll-svg-ptr-hover-src' : (isNodeHoveredTarget(node.id) ? 'll-svg-ptr-hover-tgt' : (node.id === s.activeU ? 'll-svg-ptr-orange' : (node.id === s.activeV ? 'll-svg-ptr-purple' : 'll-svg-ptr-blue')))"
                  >
                    &utrif;
                  </text>
                  <text
                    :x="node.x"
                    :y="node.y + 35"
                    class="ll-svg-ptr"
                    :class="isNodeHoveredSource(node.id) ? 'll-svg-ptr-hover-src' : (isNodeHoveredTarget(node.id) ? 'll-svg-ptr-hover-tgt' : (node.id === s.activeU ? 'll-svg-ptr-orange' : (node.id === s.activeV ? 'll-svg-ptr-purple' : 'll-svg-ptr-blue')))"
                  >
                    {{ isNodeHoveredSource(node.id) ? 'src' : (isNodeHoveredTarget(node.id) ? 'tgt' : (node.id === s.activeU ? 'u' : (node.id === s.activeV ? 'v' : (node.id === startNodeInput ? 'start' : '')))) }}
                  </text>
                </template>
                <template v-else>
                  <text
                    :x="node.x"
                    :y="node.y - 28"
                    class="ll-svg-ptr"
                    :class="isNodeHoveredSource(node.id) ? 'll-svg-ptr-hover-src' : (isNodeHoveredTarget(node.id) ? 'll-svg-ptr-hover-tgt' : (node.id === s.activeU ? 'll-svg-ptr-orange' : (node.id === s.activeV ? 'll-svg-ptr-purple' : 'll-svg-ptr-blue')))"
                  >
                    {{ isNodeHoveredSource(node.id) ? 'src' : (isNodeHoveredTarget(node.id) ? 'tgt' : (node.id === s.activeU ? 'u' : (node.id === s.activeV ? 'v' : (node.id === startNodeInput ? 'start' : '')))) }}
                  </text>
                  <text
                    :x="node.x"
                    :y="node.y - 17"
                    class="ll-svg-ptr"
                    :class="isNodeHoveredSource(node.id) ? 'll-svg-ptr-hover-src' : (isNodeHoveredTarget(node.id) ? 'll-svg-ptr-hover-tgt' : (node.id === s.activeU ? 'll-svg-ptr-orange' : (node.id === s.activeV ? 'll-svg-ptr-purple' : 'll-svg-ptr-blue')))"
                  >
                    &darr;
                  </text>
                </template>
              </g>

              <circle
                :cx="node.x"
                :cy="node.y"
                r="20"
                class="ll-node-circle"
                :class="{
                  'll-node-u': node.id === s.activeU,
                  'll-node-v': node.id === s.activeV,
                  'll-node-queued': s.queue && s.queue.includes(node.id) && node.id !== s.activeU,
                  'll-node-visited': s.visited && s.visited[node.id] && node.id !== s.activeU && node.id !== s.activeV,
                  'll-node-hover-src': isNodeHoveredSource(node.id),
                  'll-node-hover-tgt': isNodeHoveredTarget(node.id)
                }"
              />
              <text
                :x="node.x"
                :y="node.y + 5"
                class="ll-node-text"
                :class="{
                  'll-node-text-hover-src': isNodeHoveredSource(node.id),
                  'll-node-text-hover-tgt': isNodeHoveredTarget(node.id)
                }"
                style="font-size: 15px;"
              >
                {{ node.id }}
              </text>
            </g>
          </svg>
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
  --shadow-sm: 0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04);
  --radius: 8px; --radius-sm: 6px;
  background: var(--bg); color: var(--text);
  font-family: 'Segoe UI', system-ui, sans-serif; font-size: 13px;
  display: flex; flex-direction: column; height: 50vh; min-height: 600px; overflow: hidden; width: 100%;
}
@keyframes ll-pop { from { transform: scale(.85); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.slide-wrapper { margin-top: -10px; margin-left: -30px; width: 107%; max-height: 100%; font-size: 0.8rem; font-weight: 400; }
.slide-body { display: flex; flex-direction: column; border-radius: 4px; height: 100%; }
.navbar { display: flex; flex-direction: row; justify-content: space-between; align-items: center; gap: 0.75rem; padding: 0 10px; background-color: #ffffff; position: fixed; width: 94.7%; }
.navbar > img { height: 30px; }
.navbar-title { margin: 0; font-size: 1.5rem; font-weight: 700; background-color: #ef5050; color: #ffffff; width: 80%; padding-left: 10px; margin-left: -10px; border-radius: 5px; }
.row-main { width: 100%; height: 90%; margin-top: 37px; overflow-x: auto; overflow-y: auto; scrollbar-width: thin; }
.ll-toolbar { display: flex; align-items: center; gap: 8px; padding: 7px 16px; background: var(--surface); border-bottom: 1px solid var(--border); flex-shrink: 0; flex-wrap: wrap; box-shadow: var(--shadow-sm); }
.ll-toolbar label { font-size: 11px; color: var(--muted); white-space: nowrap; font-weight: 600; }
.ll-text-input { background: var(--surface); border: 1px solid var(--border2); color: var(--text); border-radius: var(--radius-sm); padding: 4px 8px; font-size: 12px; font-family: monospace; transition: border-color .15s; text-align: center; }
.ll-text-input:focus { outline: none; border-color: var(--coral); box-shadow: 0 0 0 3px rgba(240,77,77,.1); }
.ll-divider { color: var(--border2); font-weight: 300; margin: 0 4px; }
.ll-viz-btn { background: var(--coral); color: #fff; border: none; padding: 5px 14px; border-radius: var(--radius-sm); cursor: pointer; font-size: 12px; font-weight: 600; box-shadow: var(--shadow-sm); transition: filter .15s; }
.ll-viz-btn:hover { filter: brightness(1.08); }
.ll-graph-modal-btn { background: var(--purple); color: #fff; border: none; padding: 5px 12px; border-radius: var(--radius-sm); cursor: pointer; font-size: 12px; font-weight: 600; box-shadow: var(--shadow-sm); transition: filter .15s; }
.ll-graph-modal-btn:hover { filter: brightness(1.08); }

.ll-main { display: flex; flex: 1; overflow: hidden; position: relative; }
.ll-left-col { display: flex; flex-direction: column; overflow: hidden; min-width: 200px; max-width: 72%; }
.ll-viz-wrap { padding: 12px; overflow-x: auto; overflow-y: auto; background: var(--surface); border-bottom: 1px solid var(--border); }
.ll-perm-area { display: flex; flex-direction: column; gap: 12px; min-width: max-content; }

/* Section Wrappers & Tracks */
.ll-section-wrap { display: flex; flex-direction: column; gap: 4px; }
.ll-section-title { font-size: 11px; font-weight: 700; color: var(--text2); font-family: monospace; }
.ll-grid-2col { display: flex; gap: 16px; width: 100%; }

/* Queue Track */
.ll-queue-track { display: flex; align-items: center; gap: 6px; padding: 8px 12px; background: var(--surface2); border: 1px solid var(--border); border-radius: var(--radius-sm); min-height: 48px; }
.ll-q-lbl { font-size: 11px; font-weight: 700; color: var(--muted); font-family: monospace; }
.ll-queue-cell { padding: 6px 12px; background: var(--blue-light); border: 2px solid var(--blue); border-radius: var(--radius-sm); font-family: monospace; font-size: 14px; font-weight: 800; color: var(--blue); transition: all 0.2s ease; }
.ll-q-head { background: var(--orange-light); border-color: var(--orange); color: var(--orange); transform: scale(1.05); }
.ll-q-empty { font-size: 12px; font-style: italic; color: var(--muted); padding: 0 8px; }

/* Visited Track */
.ll-vis-track { display: flex; gap: 6px; flex-wrap: wrap; }
.ll-vis-item { display: flex; flex-direction: column; align-items: center; padding: 4px 8px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-sm); font-family: monospace; min-width: 44px; transition: all 0.2s ease; }
.ll-vis-idx { font-size: 10px; color: var(--muted); }
.ll-vis-val { font-size: 12px; font-weight: 700; color: var(--muted); }
.ll-vis-true { background: var(--green-light); border-color: var(--green); }
.ll-vis-true .ll-vis-val { color: #15803d; }
.ll-vis-active { border-color: var(--orange) !important; transform: scale(1.05); }

/* Traversal Track */
.ll-res-track { display: flex; align-items: center; gap: 4px; padding: 8px 12px; background: var(--surface2); border: 1px solid var(--border); border-radius: var(--radius-sm); min-height: 48px; flex-wrap: wrap; }
.ll-res-chip { display: flex; align-items: center; gap: 4px; }
.ll-res-arrow { color: var(--muted); font-size: 12px; }
.ll-res-node { padding: 4px 10px; background: var(--green-light); border: 1.5px solid var(--green); border-radius: 12px; font-family: monospace; font-size: 13px; font-weight: 800; color: #15803d; }
.ll-res-empty { font-size: 12px; font-style: italic; color: var(--muted); }

.ll-empty-matrix-msg { padding: 24px 16px; text-align: center; color: var(--muted); font-size: 12px; font-weight: 600; border: 1px dashed var(--border2); border-radius: var(--radius-sm); background: var(--surface2); }
.ll-empty-graph-msg { display: flex; align-items: center; justify-content: center; height: 100%; width: 100%; color: #64748b; font-size: 14px; font-weight: 600; text-align: center; }

/* Legend */
.ll-legend { display: flex; gap: 12px; padding: 6px 16px; background: var(--surface); border-bottom: 1px solid var(--border); flex-wrap: wrap; flex-shrink: 0; }
.ll-leg { display: flex; align-items: center; gap: 5px; font-size: 11px; color: var(--text2); }
.ll-legdot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
.ll-legdot-unvis { background: #eff6ff; border: 1.5px solid #3b82f6; }
.ll-legdot-active { background: #fff7ed; border: 1.5px solid #f97316; }
.ll-legdot-nbr { background: #f3e8ff; border: 1.5px solid #9333ea; }
.ll-legdot-inq { background: #dbeafe; border: 1.5px solid #3b82f6; }
.ll-legdot-visited { background: #f0fdf4; border: 1.5px solid #22c55e; }

/* Variable Frames */
.ll-table-area { padding: 6px 16px; overflow-y: auto; background: var(--surface); font-family: monospace; font-size: 12px; border-bottom: 1px solid var(--border); }
.ll-table-title { font-size: 10px; color: var(--muted); margin-bottom: 4px; text-transform: uppercase; letter-spacing: .5px; }
.ll-stack-line { display: flex; flex-direction: column; gap: 2px; }
.ll-frame { color: var(--text2); font-size: 11.5px; }
.ll-frame-cur { color: var(--text); font-weight: 600; }
.ll-fname { color: var(--muted); }
.ll-now { color: var(--coral); font-size: 10px; }
.ll-c-blue { color: var(--blue); } .ll-c-orange { color: var(--orange); } .ll-c-green { color: var(--green); }

/* Step Badge */
.ll-badge-wrap { padding: 6px 16px; background: var(--surface); border-bottom: 1px solid var(--border); flex-shrink: 0; }
.ll-badge { background: var(--surface2); border-left: 3px solid var(--coral); padding: 5px 10px; font-size: 11.5px; color: var(--text); font-family: monospace; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }

/* Resizer Controls */
.ll-resizer { width: 5px; background: var(--border); cursor: col-resize; transition: background .15s; flex-shrink: 0; }
.ll-resizer:hover, .ll-resizer.drag { background: var(--coral); }
.ll-vresizer { height: 5px; background: var(--border); cursor: row-resize; transition: background .15s; flex-shrink: 0; }
.ll-vresizer:hover, .ll-vresizer.drag { background: var(--coral); }

/* Right Panel: Code & Theory */
.ll-right-col { display: flex; flex-direction: column; flex: 1; overflow: hidden; min-width: 0; height: 78%; }
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
.ll-codeline.ll-hl { background: #dcfce7; color: #15803d; border-radius: 3px; border-left: 3px solid var(--green); font-weight: 600; }
.ll-info-scroll { flex: 1; overflow: auto; padding: 16px 20px; background: var(--surface); color: var(--text2); font-size: 13px; line-height: 1.6; }
.ll-info-scroll h3 { margin: 12px 0 6px 0; font-size: 13px; color: var(--text); }
.ll-complexity-table { width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 12.5px; }
.ll-complexity-table th, .ll-complexity-table td { border: 1px solid var(--border); padding: 8px 10px; text-align: left; }
.ll-complexity-table th { background: var(--surface2); color: var(--text); font-weight: 700; }
.ll-complexity-table td:nth-child(2) { font-family: monospace; font-weight: 700; color: var(--coral-dark); }
.ll-note { background: var(--orange-light); border-left: 3px solid var(--orange); border-radius: var(--radius-sm); padding: 8px 12px; font-size: 12.5px; color: var(--text2); }
.ll-footer { padding: 4px 16px; font-size: 11px; color: var(--muted); border-top: 1px solid var(--border); background: var(--surface); flex-shrink: 0; display: flex; align-items: center; }
.ll-speed-wrap { display: flex; align-items: center; gap: 5px; margin-left: 16px; }
.ll-speed-wrap input[type=range] { width: 90px; accent-color: var(--coral); }
.ll-nav-controls { display: flex; margin-left: auto; align-items: center; gap: 4px; flex-shrink: 0; flex-wrap: wrap; }
.ll-nav-btn { background: var(--surface2); border: 1px solid var(--border2); color: var(--text2); padding: 5px 11px; border-radius: var(--radius-sm); cursor: pointer; font-size: 12px; font-weight: 500; transition: all .15s; white-space: nowrap; }
.ll-nav-btn:hover { background: var(--surface); border-color: var(--coral); color: var(--coral); }
.ll-play-btn { background: var(--blue-light); border: 1px solid var(--blue); color: var(--blue); min-width: 72px; font-weight: 600; padding: 5px 11px; border-radius: var(--radius-sm); cursor: pointer; font-size: 12px; transition: all .15s; }
.ll-play-btn:hover { background: var(--blue); color: #fff; }

/* Floating Graph View Modal Container */
.graph-modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 55px;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(3px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 24px 20px 24px;
}
.graph-modal-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.15), 0 10px 10px -5px rgba(0,0,0,0.04);
  width: 740px;
  max-width: 95vw;
  max-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--border);
  animation: ll-pop 0.25s ease-out;
}
.graph-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  background: #f8fafc;
  border-bottom: 1px solid var(--border);
}
.graph-modal-title {
  font-size: 14px;
  font-weight: 700;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 8px;
}
.graph-subtitle {
  font-size: 11px;
  font-weight: 500;
  color: #64748b;
}
.graph-close-btn {
  background: none;
  border: none;
  font-size: 22px;
  color: #64748b;
  cursor: pointer;
  line-height: 1;
  padding: 0 4px;
  border-radius: 4px;
  transition: color 0.15s;
}
.graph-close-btn:hover { color: #ef4444; }
.graph-modal-body {
  padding: 12px 16px;
  display: flex;
  justify-content: center;
  background: #ffffff;
  overflow: auto;
}
.graph-modal-svg {
  width: 100%;
  max-height: 390px;
}

/* Edge & Node Highlights */
.ll-edge-line { stroke: #cbd5e1; stroke-width: 2.5px; transition: all 0.15s ease; }
.ll-edge-active { stroke: #f97316; stroke-width: 4px; stroke-dasharray: 6 3; animation: ll-dash 1s linear infinite; }
.ll-edge-tree { stroke: #22c55e !important; stroke-width: 3.5px !important; }
.ll-edge-hovered { stroke: #3b82f6 !important; stroke-width: 4px !important; filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.6)); }
@keyframes ll-dash { to { stroke-dashoffset: -18; } }

.ll-node-circle { fill: #eff6ff; stroke: #3b82f6; stroke-width: 2.5; transition: all 0.25s ease; }
.ll-node-u { fill: #fff7ed !important; stroke: #f97316 !important; stroke-width: 3.5 !important; }
.ll-node-v { fill: #f3e8ff !important; stroke: #9333ea !important; stroke-width: 3.5 !important; }
.ll-node-queued { fill: #dbeafe !important; stroke: #3b82f6 !important; stroke-width: 3 !important; }
.ll-node-visited { fill: #f0fdf4 !important; stroke: #22c55e !important; stroke-width: 3 !important; }

.ll-node-hover-src { fill: #fff7ed !important; stroke: #f97316 !important; stroke-width: 3.5px !important; filter: drop-shadow(0 0 8px rgba(249, 115, 22, 0.55)); }
.ll-node-hover-tgt { fill: #f0fdf4 !important; stroke: #22c55e !important; stroke-width: 3.5px !important; filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.55)); }
.ll-node-text { font-size: 13px; font-weight: 800; font-family: monospace; text-anchor: middle; fill: #1e293b; }
.ll-node-text-hover-src { fill: #c2410c !important; font-weight: 900 !important; }
.ll-node-text-hover-tgt { fill: #15803d !important; font-weight: 900 !important; }

.ll-svg-ptr { font-size: 13px; font-weight: 800; font-family: monospace; text-anchor: middle; }
.ll-svg-ptr-blue { fill: #3b82f6; }
.ll-svg-ptr-orange { fill: #ea580c; }
.ll-svg-ptr-purple { fill: #9333ea; }
.ll-svg-ptr-hover-src { fill: #ea580c !important; font-weight: 900 !important; }
.ll-svg-ptr-hover-tgt { fill: #16a34a !important; font-weight: 900 !important; }

@media (max-width: 900px) {
  .ll-main { flex-direction: column; }
  .ll-left-col, .ll-right-col { max-width: 100% !important; width: 100% !important; }
  .ll-resizer { display: none; }
  .ll-toolbar { flex-direction: column; align-items: stretch; }
  .ll-nav-controls { margin-left: 0; justify-content: center; }
}
</style>
