<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, watch } from 'vue';

defineProps({
  topic: { type: String, default: "Prim's Algorithm (Minimum Spanning Tree)" },
  subTopic: { type: String, default: 'Greedy Graph Algorithm (Linear Scan O(V²))' }
});

// ─────────────────────────────────────────────────────────────────────────────
// CODE DEFINITIONS (Java, C, C++, Python, JavaScript)
// ─────────────────────────────────────────────────────────────────────────────
const CODES = {
  java: [
    ['', 'import java.util.Arrays;'],
    ['', ''],
    ['', 'class PrimsGraph {'],
    ['', '    static final int INF = Integer.MAX_VALUE;'],
    ['', ''],
    ['c_entry',         '    void primMST(int[][] graph, int V, int src) {'],
    ['c_init_key',      '        int[] key = new int[V];'],
    ['c_init_parent',   '        int[] parent = new int[V];'],
    ['c_init_inmst',    '        boolean[] inMST = new boolean[V];'],
    ['c_init_key2',     '        Arrays.fill(key, INF);'],
    ['c_init_parent2',  '        Arrays.fill(parent, -1);'],
    ['c_init_inmst2',   '        Arrays.fill(inMST, false);'],
    ['', ''],
    ['c_set_src',       '        key[src] = 0;'],
    ['', ''],
    ['c_outer_loop',    '        for (int count = 0; count < V; count++) {'],
    ['c_init_min',      '            int u = -1, minKey = INF;'],
    ['c_scan_loop',     '            for (int v = 0; v < V; v++) {'],
    ['c_scan_check',    '                if (!inMST[v] && key[v] < minKey) {'],
    ['c_scan_update',   '                    minKey = key[v];'],
    ['',                '                    u = v;'],
    ['',                '                }'],
    ['',                '            }'],
    ['', ''],
    ['c_check_break',   '            if (u == -1) break;'],
    ['c_mark_inmst',    '            inMST[u] = true;'],
    ['', ''],
    ['c_for_nbr',       '            for (int v = 0; v < V; v++) {'],
    ['c_check_edge',    '                if (graph[u][v] != 0 && !inMST[v]) {'],
    ['c_compare',       '                    if (graph[u][v] < key[v]) {'],
    ['c_update_key',    '                        key[v] = graph[u][v];'],
    ['c_update_parent', '                        parent[v] = u;'],
    ['',                '                    }'],
    ['',                '                }'],
    ['',                '            }'],
    ['',                '        }'],
    ['c_done',          '    }'],
    ['',                '}']
  ],
  c: [
    ['', '#include <stdio.h>'],
    ['', '#include <stdbool.h>'],
    ['', '#include <limits.h>'],
    ['', ''],
    ['', '#define INF INT_MAX'],
    ['', '#define MAX 10'],
    ['', ''],
    ['c_entry',         'void primMST(int graph[MAX][MAX], int V, int src) {'],
    ['c_init_key',      '    int key[MAX], parent[MAX];'],
    ['c_init_inmst',    '    bool inMST[MAX];'],
    ['c_init_key2',     '    for (int i = 0; i < V; i++) {'],
    ['',                '        key[i] = INF; parent[i] = -1; inMST[i] = false;'],
    ['',                '    }'],
    ['', ''],
    ['c_set_src',       '    key[src] = 0;'],
    ['', ''],
    ['c_outer_loop',    '    for (int count = 0; count < V; count++) {'],
    ['c_init_min',      '        int u = -1, minKey = INF;'],
    ['c_scan_loop',     '        for (int v = 0; v < V; v++) {'],
    ['c_scan_check',    '            if (!inMST[v] && key[v] < minKey) {'],
    ['c_scan_update',   '                minKey = key[v];'],
    ['',                '                u = v;'],
    ['',                '            }'],
    ['',                '        }'],
    ['', ''],
    ['c_check_break',   '        if (u == -1) break;'],
    ['c_mark_inmst',    '        inMST[u] = true;'],
    ['', ''],
    ['c_for_nbr',       '        for (int v = 0; v < V; v++) {'],
    ['c_check_edge',    '            if (graph[u][v] != 0 && !inMST[v]) {'],
    ['c_compare',       '                if (graph[u][v] < key[v]) {'],
    ['c_update_key',    '                    key[v] = graph[u][v];'],
    ['c_update_parent', '                    parent[v] = u;'],
    ['',                '                }'],
    ['',                '            }'],
    ['',                '        }'],
    ['',                '    }'],
    ['c_done',          '}']
  ],
  cpp: [
    ['', '#include <iostream>'],
    ['', '#include <vector>'],
    ['', '#include <climits>'],
    ['', 'using namespace std;'],
    ['', ''],
    ['', 'class PrimsGraph {'],
    ['', '    static const int INF = INT_MAX;'],
    ['', 'public:'],
    ['c_entry',         '    void primMST(vector<vector<int>>& graph, int V, int src) {'],
    ['c_init_key',      '        vector<int> key(V, INF);'],
    ['c_init_parent',   '        vector<int> parent(V, -1);'],
    ['c_init_inmst',    '        vector<bool> inMST(V, false);'],
    ['', ''],
    ['c_set_src',       '        key[src] = 0;'],
    ['', ''],
    ['c_outer_loop',    '        for (int count = 0; count < V; count++) {'],
    ['c_init_min',      '            int u = -1, minKey = INF;'],
    ['c_scan_loop',     '            for (int v = 0; v < V; v++) {'],
    ['c_scan_check',    '                if (!inMST[v] && key[v] < minKey) {'],
    ['c_scan_update',   '                    minKey = key[v];'],
    ['',                '                    u = v;'],
    ['',                '                }'],
    ['',                '            }'],
    ['', ''],
    ['c_check_break',   '            if (u == -1) break;'],
    ['c_mark_inmst',    '            inMST[u] = true;'],
    ['', ''],
    ['c_for_nbr',       '            for (int v = 0; v < V; v++) {'],
    ['c_check_edge',    '                if (graph[u][v] != 0 && !inMST[v]) {'],
    ['c_compare',       '                    if (graph[u][v] < key[v]) {'],
    ['c_update_key',    '                        key[v] = graph[u][v];'],
    ['c_update_parent', '                        parent[v] = u;'],
    ['',                '                    }'],
    ['',                '                }'],
    ['',                '            }'],
    ['',                '        }'],
    ['c_done',          '    }'],
    ['',                '};']
  ],
  python: [
    ['', 'class PrimsGraph:'],
    ['c_entry',         '    def prim_mst(self, graph, V, src=0):'],
    ['c_init_key',      '        key = [float("inf")] * V'],
    ['c_init_parent',   '        parent = [-1] * V'],
    ['c_init_inmst',    '        in_mst = [False] * V'],
    ['', ''],
    ['c_set_src',       '        key[src] = 0'],
    ['', ''],
    ['c_outer_loop',    '        for count in range(V):'],
    ['c_init_min',      '            u = -1; min_key = float("inf")'],
    ['c_scan_loop',     '            for v in range(V):'],
    ['c_scan_check',    '                if not in_mst[v] and key[v] < min_key:'],
    ['c_scan_update',   '                    min_key = key[v]'],
    ['',                '                    u = v'],
    ['', ''],
    ['c_check_break',   '            if u == -1:'],
    ['',                '                break'],
    ['c_mark_inmst',    '            in_mst[u] = True'],
    ['', ''],
    ['c_for_nbr',       '            for v in range(V):'],
    ['c_check_edge',    '                if graph[u][v] != 0 and not in_mst[v]:'],
    ['c_compare',       '                    if graph[u][v] < key[v]:'],
    ['c_update_key',    '                        key[v] = graph[u][v]'],
    ['c_update_parent', '                        parent[v] = u'],
    ['c_done',          '        return parent, key']
  ],
  javascript: [
    ['', 'class PrimsGraph {'],
    ['c_entry',         '  primMST(graph, V, src = 0) {'],
    ['c_init_key',      '    const key = new Array(V).fill(Infinity);'],
    ['c_init_parent',   '    const parent = new Array(V).fill(-1);'],
    ['c_init_inmst',    '    const inMST = new Array(V).fill(false);'],
    ['', ''],
    ['c_set_src',       '    key[src] = 0;'],
    ['', ''],
    ['c_outer_loop',    '    for (let count = 0; count < V; count++) {'],
    ['c_init_min',      '      let u = -1, minKey = Infinity;'],
    ['c_scan_loop',     '      for (let v = 0; v < V; v++) {'],
    ['c_scan_check',    '        if (!inMST[v] && key[v] < minKey) {'],
    ['c_scan_update',   '          minKey = key[v];'],
    ['',                '          u = v;'],
    ['',                '        }'],
    ['',                '      }'],
    ['', ''],
    ['c_check_break',   '      if (u === -1) break;'],
    ['c_mark_inmst',    '      inMST[u] = true;'],
    ['', ''],
    ['c_for_nbr',       '      for (let v = 0; v < V; v++) {'],
    ['c_check_edge',    '        if (graph[u][v] !== 0 && !inMST[v]) {'],
    ['c_compare',       '          if (graph[u][v] < key[v]) {'],
    ['c_update_key',    '            key[v] = graph[u][v];'],
    ['c_update_parent', '            parent[v] = u;'],
    ['',                '          }'],
    ['',                '        }'],
    ['',                '      }'],
    ['',                '    }'],
    ['c_done',          '    return { parent, key };'],
    ['',                '  }'],
    ['',                '}']
  ]
};

const PSEUDOCODE = [
  'function PRIM-MST(graph, V, src):',
  '    int[] key = new int[V], parent = new int[V], inMST = new boolean[V]',
  '    fill key with INF, parent with -1, inMST with false',
  '    key[src] = 0',
  '    for count from 0 to V - 1:',
  '        u = -1, minKey = INF',
  '        for v from 0 to V - 1:            // Linear scan for min-key vertex',
  '            if not inMST[v] and key[v] < minKey:',
  '                minKey = key[v], u = v',
  '        if u == -1: break',
  '        inMST[u] = true                   // Include vertex u into MST',
  '        for each neighbor v from 0 to V - 1:',
  '            if graph[u][v] != 0 and not inMST[v]:',
  '                if graph[u][v] < key[v]:      // Relaxation / key update',
  '                    key[v] = graph[u][v]',
  '                    parent[v] = u',
  '    return parent, key                    // Formed MST edges'
];

const PSEUDOCODE_MAP = {
  'c_entry':         0,
  'c_init_key':      1,
  'c_init_parent':   1,
  'c_init_inmst':    1,
  'c_init_key2':     2,
  'c_init_parent2':  2,
  'c_init_inmst2':   2,
  'c_set_src':       3,
  'c_outer_loop':    4,
  'c_init_min':      5,
  'c_scan_loop':     6,
  'c_scan_check':    7,
  'c_scan_update':   8,
  'c_check_break':   9,
  'c_mark_inmst':    10,
  'c_for_nbr':       11,
  'c_check_edge':    12,
  'c_compare':       13,
  'c_update_key':    14,
  'c_update_parent': 15,
  'c_done':          16
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function frame(title, rows) { return { title, rows }; }

function parseWeightedEdges(str) {
  if (!str || !str.trim()) return [];
  try {
    const parsed = JSON.parse(str);
    if (Array.isArray(parsed)) {
      return parsed
        .filter(e => Array.isArray(e) && e.length >= 3)
        .map(e => ({ u: parseInt(e[0]), v: parseInt(e[1]), w: parseInt(e[2]) }))
        .filter(e => !isNaN(e.u) && !isNaN(e.v) && !isNaN(e.w) && e.w > 0);
    }
  } catch (err) {}
  return [];
}

function kLabel(k) {
  return k === Infinity ? '\u221e' : String(k);
}

const EXAMPLES = {
  example1: {
    V: 5,
    edges: '[[0,1,2],[0,3,6],[1,2,3],[1,3,8],[1,4,5],[2,4,7],[3,4,9]]',
    src: 0
  },
  example2: {
    V: 6,
    edges: '[[0,1,4],[0,2,4],[1,2,2],[1,3,5],[2,3,5],[2,4,9],[3,4,4],[3,5,6],[4,5,7]]',
    src: 0
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// STEP BUILDER (Prim's Algorithm Linear-Scan Simulation)
// Accurately captures the state after executing each statement so students
// see the MST grow one vertex and one connecting edge at a time.
// ─────────────────────────────────────────────────────────────────────────────
function buildSteps(VInput, edgesStr, startNodeInput) {
  const steps = [];
  const V = Math.max(0, Math.min(10, parseInt(VInput) || 0));
  const parsedEdges = parseWeightedEdges(edgesStr);
  const src = Math.max(0, Math.min(V > 0 ? V - 1 : 0, parseInt(startNodeInput) || 0));
  const fnSig = 'primMST(graph, ' + V + ', ' + src + ')';

  // State arrays
  const key   = new Array(V).fill(Infinity);
  const parent = new Array(V).fill(-1);
  const inMST  = new Array(V).fill(false);
  const confirmedMstEdges = [];

  // Reveal flags
  let keyAllocated    = false;
  let keyFilled       = false;
  let parentAllocated = false;
  let parentFilled    = false;
  let inMSTAllocated  = false;
  let inMSTFilled     = false;

  function snap(metaInfo) {
    return {
      keyArr:             [...key],
      parentArr:          [...parent],
      inMSTArr:           [...inMST],
      keyAllocated,
      keyFilled,
      parentAllocated,
      parentFilled,
      inMSTAllocated,
      inMSTFilled,
      metaInfo:           metaInfo ? { ...metaInfo } : null,
      confirmedMstEdges:  confirmedMstEdges.map(e => ({ ...e }))
    };
  }

  function addStep(code, badge, vars, activeU, activeV, calcInfo, metaInfo, activeArrayInfo, varValues) {
    let activeInMSTIdx = -1;
    let activeKeyIdx = -1;
    let activeParentIdx = -1;

    if (activeArrayInfo) {
      if (activeArrayInfo.inMST !== undefined) activeInMSTIdx = activeArrayInfo.inMST;
      if (activeArrayInfo.key !== undefined) activeKeyIdx = activeArrayInfo.key;
      if (activeArrayInfo.parent !== undefined) activeParentIdx = activeArrayInfo.parent;
    }

    const curCount  = varValues && varValues.count  !== undefined ? varValues.count  : -1;
    const curU      = varValues && varValues.u      !== undefined ? varValues.u      : -1;
    const curMinKey = varValues && varValues.minKey !== undefined ? varValues.minKey : -1;
    const curV      = varValues && varValues.v      !== undefined ? varValues.v      : -1;

    steps.push({
      badge,
      code,
      vars,
      V,
      src,
      edges: parsedEdges,
      calcInfo: calcInfo || null,
      activeU: activeU === undefined ? -1 : activeU,
      activeV: activeV === undefined ? -1 : activeV,
      activeInMSTIdx,
      activeKeyIdx,
      activeParentIdx,
      curCount,
      curU,
      curMinKey,
      curV,
      ...snap(metaInfo)
    });
  }

  if (V === 0) {
    addStep('', 'Vertices = 0. Nothing to compute.',
      [frame('main()', []), frame('primMST()', [['V', '0']])]);
    return steps;
  }

  // Build symmetric adjacency matrix for undirected graph
  const graph = Array.from({ length: V }, () => new Array(V).fill(0));
  parsedEdges.forEach(e => {
    if (e.u >= 0 && e.u < V && e.v >= 0 && e.v < V) {
      graph[e.u][e.v] = e.w;
      graph[e.v][e.u] = e.w; // undirected symmetric
    }
  });

  // Step 1: Function entry
  addStep('c_entry',
    'primMST(graph, ' + V + ', ' + src + ') called \u2192 Starting Prim\'s MST Algorithm (Linear Scan O(V²)) from root vertex ' + src,
    [frame('main()', []), frame(fnSig, [['V', String(V)], ['src', String(src)]])],
    -1, -1, null, null, null,
    { count: -1, u: -1, minKey: -1, v: -1 });

  // Step 2: Allocate key[]
  keyAllocated = true;
  addStep('c_init_key',
    'int[] key = new int[' + V + '] \u2192 Allocated key array (minimum edge weight connecting each vertex to MST)',
    [frame('main()', []), frame(fnSig, [['key', 'int[' + V + '] allocated']])],
    -1, -1, null, null, null,
    { count: -1, u: -1, minKey: -1, v: -1 });

  // Step 3: Allocate parent[]
  parentAllocated = true;
  addStep('c_init_parent',
    'int[] parent = new int[' + V + '] \u2192 Allocated parent array (predecessor in MST)',
    [frame('main()', []), frame(fnSig, [['parent', 'int[' + V + '] allocated']])],
    -1, -1, null, null, null,
    { count: -1, u: -1, minKey: -1, v: -1 });

  // Step 4: Allocate inMST[]
  inMSTAllocated = true;
  addStep('c_init_inmst',
    'boolean[] inMST = new boolean[' + V + '] \u2192 Allocated inMST array (tracks vertices included in MST)',
    [frame('main()', []), frame(fnSig, [['inMST', 'boolean[' + V + '] allocated']])],
    -1, -1, null, null, null,
    { count: -1, u: -1, minKey: -1, v: -1 });

  // Step 5: Fill key[] with INF
  keyFilled = true;
  addStep('c_init_key2',
    'Arrays.fill(key, INF) \u2192 All ' + V + ' key values initialized to \u221e (INF)',
    [frame('main()', []), frame(fnSig, [['key', '[' + key.map(kLabel).join(', ') + ']']])],
    -1, -1, null, null, null,
    { count: -1, u: -1, minKey: -1, v: -1 });

  // Step 6: Fill parent[] with -1
  parentFilled = true;
  addStep('c_init_parent2',
    'Arrays.fill(parent, -1) \u2192 All MST parents initialized to -1 (none)',
    [frame('main()', []), frame(fnSig, [['parent', '[' + parent.join(', ') + ']']])],
    -1, -1, null, null, null,
    { count: -1, u: -1, minKey: -1, v: -1 });

  // Step 7: Fill inMST[] with false
  inMSTFilled = true;
  addStep('c_init_inmst2',
    'Arrays.fill(inMST, false) \u2192 All vertices initially outside the MST (inMST = false)',
    [frame('main()', []), frame(fnSig, [['inMST', '[' + inMST.map(v => v ? 'T' : 'F').join(', ') + ']']])],
    -1, -1, null, null, null,
    { count: -1, u: -1, minKey: -1, v: -1 });

  // Step 8: Set source key to 0
  key[src] = 0;
  addStep('c_set_src',
    'key[' + src + '] = 0 \u2192 Root vertex ' + src + ' key set to 0 so it is picked first to grow the MST',
    [frame('main()', []), frame(fnSig, [['key[' + src + ']', '0'], ['key', '[' + key.map(kLabel).join(', ') + ']']])],
    src, -1, null, null, { key: src },
    { count: -1, u: src, minKey: -1, v: -1 });

  // ══════════════════════════════════════════════════════════════════════════
  // MAIN LOOP: V iterations to include all V vertices into the MST
  // ══════════════════════════════════════════════════════════════════════════
  for (let count = 0; count < V; count++) {
    const metaCount = { phase: 'loop', count, total: V };

    addStep('c_outer_loop',
      'for (count = ' + count + '; count < ' + V + '; ...) \u2192 MST Building Iteration ' + (count + 1) + ' of ' + V + ': selecting next cheapest vertex',
      [frame('main()', []), frame(fnSig, [['count', String(count)], ['inMST_count', String(confirmedMstEdges.length)]])],
      -1, -1, null, metaCount, null,
      { count, u: -1, minKey: -1, v: -1 });

    // Initialize minKey & candidate u
    let u = -1;
    let minKey = Infinity;

    addStep('c_init_min',
      'u = -1, minKey = INF \u2192 Starting linear scan across all ' + V + ' vertices for minimum key outside MST',
      [frame('main()', []), frame(fnSig, [['count', String(count)], ['u', '-1'], ['minKey', '\u221e']])],
      -1, -1, null, metaCount, null,
      { count, u: -1, minKey: Infinity, v: -1 });

    // ── LINEAR SCAN to pick vertex u with minimum key ───────────────────────
    for (let v = 0; v < V; v++) {
      const scanMeta = { phase: 'scan', count, v, minKey, candidateU: u };

      addStep('c_scan_loop',
        'Scan vertex v = ' + v + ' \u2192 Checking if vertex ' + v + ' is outside MST and has key < minKey (' + kLabel(minKey) + ')',
        [frame('main()', []), frame(fnSig, [['count', String(count)], ['v', String(v)], ['inMST[' + v + ']', String(inMST[v])], ['key[' + v + ']', kLabel(key[v])], ['minKey', kLabel(minKey)]])],
        u >= 0 ? u : -1, v, null, scanMeta, { inMST: v, key: v },
        { count, u: u >= 0 ? u : -1, minKey, v });

      const isCandidate = !inMST[v] && key[v] < minKey;
      addStep('c_scan_check',
        'if (!inMST[' + v + '] && key[' + v + '] < minKey) \u2192 !' + (inMST[v] ? 'true' : 'false') + ' && ' + kLabel(key[v]) + ' < ' + kLabel(minKey) + ' \u2192 ' +
          (isCandidate ? 'True (new minimum candidate vertex found!)' : (inMST[v] ? 'False (already in MST)' : 'False (key not smaller)')),
        [frame('main()', []), frame(fnSig, [['v', String(v)], ['key[' + v + ']', kLabel(key[v])], ['minKey', kLabel(minKey)], ['isMin', String(isCandidate)]])],
        u >= 0 ? u : -1, v,
        { type: 'scan', v, keyVal: key[v], minKey, isMin: isCandidate },
        scanMeta, { inMST: v, key: v },
        { count, u: u >= 0 ? u : -1, minKey, v });

      if (isCandidate) {
        minKey = key[v];
        u = v;

        addStep('c_scan_update',
          'minKey = key[' + v + '] = ' + minKey + ', u = ' + v + ' \u2192 Current best candidate vertex to join MST is vertex ' + u,
          [frame('main()', []), frame(fnSig, [['u', String(u)], ['minKey', String(minKey)]])],
          u, v,
          { type: 'scan', v, keyVal: minKey, minKey, isMin: true, updated: true },
          { phase: 'scan', count, v, minKey, candidateU: u }, { key: v },
          { count, u, minKey, v });
      }
    }

    // Step: Check break
    addStep('c_check_break',
      'if (u == -1) \u2192 u = ' + u + (u === -1 ? ' \u2192 No reachable vertex remaining (graph disconnected)' : ' \u2192 Vertex ' + u + ' selected with minimum key ' + minKey),
      [frame('main()', []), frame(fnSig, [['u', String(u)], ['minKey', kLabel(minKey)]])],
      u, -1, null, metaCount, { inMST: u >= 0 ? u : -1 },
      { count, u: u >= 0 ? u : -1, minKey, v: -1 });

    if (u === -1) break;

    // Step: Mark inMST[u] = true
    inMST[u] = true;
    if (parent[u] !== -1) {
      const p = parent[u];
      const w = graph[p][u];
      confirmedMstEdges.push({ u: p, v: u, w });
    }

    const mstEdgeDesc = parent[u] !== -1
      ? ' via MST edge (' + parent[u] + ' \u2014 ' + u + ', weight ' + graph[parent[u]][u] + ')'
      : ' as the starting root';

    addStep('c_mark_inmst',
      'inMST[' + u + '] = true \u2192 Vertex ' + u + ' officially added to the Minimum Spanning Tree' + mstEdgeDesc,
      [frame('main()', []), frame(fnSig, [['u', String(u)], ['inMST[' + u + ']', 'true'], ['totalMSTWeight', String(confirmedMstEdges.reduce((a, e) => a + e.w, 0))]])],
      u, -1,
      { type: 'joined', u, parent: parent[u], weight: parent[u] !== -1 ? graph[parent[u]][u] : 0 },
      { phase: 'joined', u, count }, { inMST: u },
      { count, u, minKey, v: -1 });

    // ── RELAXATION: Update key & parent values of adjacent vertices ────────
    for (let v = 0; v < V; v++) {
      const relaxMeta = { phase: 'relax', u, v, count };

      addStep('c_for_nbr',
        'for (v = ' + v + '; v < ' + V + '; ...) \u2192 Checking adjacent edge from newly added vertex ' + u + ' to vertex ' + v,
        [frame('main()', []), frame(fnSig, [['u', String(u)], ['v', String(v)]])],
        u, v, null, relaxMeta, null,
        { count, u, minKey: -1, v });

      const hasEdgeAndNotInMST = graph[u][v] !== 0 && !inMST[v];
      addStep('c_check_edge',
        'if (graph[' + u + '][' + v + '] != 0 && !inMST[' + v + ']) \u2192 wt = ' + (graph[u][v] === 0 ? '0 (no edge)' : graph[u][v]) + ', inMST[' + v + '] = ' + (inMST[v] ? 'true' : 'false') + ' \u2192 ' +
          (hasEdgeAndNotInMST ? 'True \u2192 valid candidate neighbor to connect' : 'False \u2192 skip'),
        [frame('main()', []), frame(fnSig, [['u', String(u)], ['v', String(v)], ['graph[u][v]', String(graph[u][v])], ['inMST[' + v + ']', String(inMST[v])]])],
        u, v,
        { type: 'edge_check', u, v, weight: graph[u][v], inMST: inMST[v], valid: hasEdgeAndNotInMST },
        relaxMeta, { inMST: v },
        { count, u, minKey: -1, v });

      if (hasEdgeAndNotInMST) {
        const edgeWeight = graph[u][v];
        const oldKey = key[v];
        const isShorter = edgeWeight < oldKey;

        addStep('c_compare',
          'if (graph[' + u + '][' + v + '] < key[' + v + ']) \u2192 ' + edgeWeight + ' < ' + kLabel(oldKey) + ' \u2192 ' +
            (isShorter ? 'True \u2192 cheaper connection to MST found!' : 'False \u2192 existing key is cheaper or equal'),
          [frame('main()', []), frame(fnSig, [['graph[u][v]', String(edgeWeight)], ['key[' + v + ']', kLabel(oldKey)], ['isCheaper', String(isShorter)]])],
          u, v,
          { type: 'relax', u, v, weight: edgeWeight, oldKey, isShorter, comparing: true },
          relaxMeta, { key: v },
          { count, u, minKey: -1, v });

        if (isShorter) {
          key[v] = edgeWeight;
          addStep('c_update_key',
            'key[' + v + '] = ' + edgeWeight + ' \u2192 Updated minimum connection weight for vertex ' + v + ': ' + kLabel(oldKey) + ' \u2192 ' + edgeWeight,
            [frame('main()', []), frame(fnSig, [['key[' + v + ']', String(edgeWeight)]])],
            u, v,
            { type: 'relax', u, v, weight: edgeWeight, oldKey, isShorter: true, updated: true },
            relaxMeta, { key: v },
            { count, u, minKey: -1, v });

          parent[v] = u;
          addStep('c_update_parent',
            'parent[' + v + '] = ' + u + ' \u2192 Set MST predecessor of vertex ' + v + ' to vertex ' + u,
            [frame('main()', []), frame(fnSig, [['parent[' + v + ']', String(u)]])],
            u, v,
            { type: 'relax', u, v, weight: edgeWeight, oldKey, isShorter: true, updated: true },
            relaxMeta, { parent: v });
        }
      }
    }
  }

  // Completion step
  const totalWeight = confirmedMstEdges.reduce((acc, e) => acc + e.w, 0);
  const edgesListStr = confirmedMstEdges.map(e => '(' + e.u + ' \u2014 ' + e.v + ', wt:' + e.w + ')').join(', ');

  addStep('c_done',
    'return parent, key \u2192 Complete! Minimum Spanning Tree formed with ' + confirmedMstEdges.length + ' edges: [' + edgesListStr + '] \u2192 Total MST Weight: ' + totalWeight,
    [frame('main()', []), frame(fnSig, [['MST_Edges', String(confirmedMstEdges.length)], ['Total_Weight', String(totalWeight)]])],
    -1, -1,
    { type: 'done', totalWeight, edgeCount: confirmedMstEdges.length },
    { phase: 'done' });

  return steps;
}

// ─────────────────────────────────────────────────────────────────────────────
// REACTIVE STATE
// ─────────────────────────────────────────────────────────────────────────────
const DEFAULT_V     = EXAMPLES.example1.V;
const DEFAULT_EDGES = EXAMPLES.example1.edges;

const numVInput      = ref(DEFAULT_V);
const edgesInputStr  = ref(DEFAULT_EDGES);
const startNodeInput = ref(EXAMPLES.example1.src);
const exampleId      = ref('example1');
const lang           = ref('java');
const speed          = ref(650);
const si             = ref(0);
const playing        = ref(false);
const vizHeight      = ref(340);
const tableHeight    = ref(60);
const leftWidth      = ref(58);
const rightTab       = ref('code');
const showGraphModal = ref(false);
const hoveredEdge    = ref(null);
const hoveredNode    = ref(null);

const stepsData = reactive({ steps: buildSteps(DEFAULT_V, DEFAULT_EDGES, 0) });
const steps     = computed(() => stepsData.steps);
const s         = computed(() => steps.value[Math.max(0, Math.min(si.value, steps.value.length - 1))] || {});
const codeLines = computed(() => CODES[lang.value] || []);

// ── Graph Modal Node Positions ──────────────────────────────────────────────
const modalNodePositions = computed(() => {
  const V = s.value.V ?? 0;
  if (V <= 0) return [];
  const cx = 360, cy = 230;
  const r  = V <= 4 ? 145 : (V <= 6 ? 168 : 185);
  return Array.from({ length: V }, (_, i) => {
    const angle = (2 * Math.PI * i) / V - Math.PI / 2;
    return { id: i, x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });
});

// Undirected edge geometry
function getEdgeGeometry(edge, positions) {
  const uNode = positions[edge.u], vNode = positions[edge.v];
  if (!uNode || !vNode) return { pathD: '', labelX: 0, labelY: 0 };
  const x1 = uNode.x, y1 = uNode.y, x2 = vNode.x, y2 = vNode.y;
  const dx = x2 - x1, dy = y2 - y1;
  const dist = Math.hypot(dx, dy) || 1;
  const ux = dx / dist, uy = dy / dist;
  const nodeR = 20;
  const sx = x1 + ux * nodeR;
  const sy = y1 + uy * nodeR;
  const ex = x2 - ux * nodeR;
  const ey = y2 - uy * nodeR;
  const pathD  = `M ${sx} ${sy} L ${ex} ${ey}`;
  const labelX = (sx + ex) / 2;
  const labelY = (sy + ey) / 2;
  return { pathD, labelX, labelY };
}

function getEdgeGeo(edge) {
  return getEdgeGeometry(edge, modalNodePositions.value);
}

// Edge & Node state checkers
function isEdgeHovered(u, v) {
  return hoveredEdge.value && ((hoveredEdge.value.u === u && hoveredEdge.value.v === v) || (hoveredEdge.value.u === v && hoveredEdge.value.v === u));
}

function isNodeHoveredSource(id) {
  return hoveredEdge.value && (hoveredEdge.value.u === id || hoveredEdge.value.v === id);
}

function isMstEdge(u, v) {
  const mst = s.value.confirmedMstEdges || [];
  return mst.some(e => (e.u === u && e.v === v) || (e.u === v && e.v === u));
}

function isActiveEdge(u, v) {
  const activeU = s.value.activeU;
  const activeV = s.value.activeV;
  return (u === activeU && v === activeV) || (u === activeV && v === activeU);
}

// ── Hover Path Tracking in MST ──────────────────────────────────────────────
const hoveredMstPathEdges = computed(() => {
  if (hoveredNode.value === null || hoveredNode.value === undefined) return [];
  const parentArr = s.value.parentArr;
  if (!parentArr || !parentArr.length) return [];

  const target = hoveredNode.value;
  const pathEdges = [];
  let curr = target;
  const visitedInPath = new Set();

  while (curr >= 0 && curr < parentArr.length && parentArr[curr] !== -1 && !visitedInPath.has(curr)) {
    visitedInPath.add(curr);
    const p = parentArr[curr];
    if (p < 0 || p >= parentArr.length) break;
    pathEdges.push({ u: p, v: curr });
    curr = p;
  }
  return pathEdges;
});

const hoveredMstPathNodes = computed(() => {
  if (hoveredNode.value === null || hoveredNode.value === undefined) return new Set();
  const parentArr = s.value.parentArr;
  if (!parentArr || !parentArr.length) return new Set();

  const target = hoveredNode.value;
  const pathNodes = new Set();
  let curr = target;
  const visitedInPath = new Set();

  while (curr >= 0 && curr < parentArr.length && !visitedInPath.has(curr)) {
    pathNodes.add(curr);
    visitedInPath.add(curr);
    if (parentArr[curr] === -1 || parentArr[curr] === undefined) break;
    curr = parentArr[curr];
  }
  return pathNodes;
});

function isHoveredMstPathEdge(u, v) {
  return hoveredMstPathEdges.value.some(e => (e.u === u && e.v === v) || (e.u === v && e.v === u));
}

function isHoveredMstPathNode(id) {
  return hoveredMstPathNodes.value.has(id);
}

let playTimer = null;

function applySetup() {
  const rawV = parseInt(numVInput.value);
  const vCount = isNaN(rawV) || rawV < 0 ? 0 : Math.min(10, rawV);
  playing.value = false;
  clearTimeout(playTimer);
  stepsData.steps = buildSteps(vCount, edgesInputStr.value, startNodeInput.value);
  si.value = 0;
}

function loadExample() {
  const ex = EXAMPLES[exampleId.value];
  if (!ex) return;
  numVInput.value = ex.V;
  edgesInputStr.value = ex.edges;
  startNodeInput.value = ex.src;
  applySetup();
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
  if (si.value >= steps.value.length - 1) { playing.value = false; return; }
  playTimer = setTimeout(() => {
    si.value = Math.min(steps.value.length - 1, si.value + 1);
    tick();
  }, 2100 - speed.value);
}

watch(playing, v => { if (v) tick(); else clearTimeout(playTimer); });

function onKeydown(e) {
  const tag = e.target.tagName;
  if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
  if (e.key === 'ArrowRight') stepBy(1);
  if (e.key === 'ArrowLeft')  stepBy(-1);
  if (e.key === ' ')          { e.preventDefault(); togglePlay(); }
}

const mainRef         = ref(null);
const leftColRef      = ref(null);
const hResizerRef     = ref(null);
const vizResizerRef   = ref(null);
const tableResizerRef = ref(null);

function initHResizer() {
  const rsz = hResizerRef.value, main = mainRef.value;
  if (!rsz || !main) return;
  let dragging = false, startX = 0, startW = 0;
  const onDown = e => { dragging = true; startX = e.clientX; startW = leftColRef.value.offsetWidth; rsz.classList.add('drag'); document.body.style.userSelect = 'none'; };
  const onMove = e => { if (!dragging) return; const mW = main.offsetWidth; leftWidth.value = (Math.max(200, Math.min(mW - 200, startW + e.clientX - startX)) / mW) * 100; };
  const onUp   = () => { if (!dragging) return; dragging = false; rsz.classList.remove('drag'); document.body.style.userSelect = ''; };
  rsz.addEventListener('mousedown', onDown); document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', onUp);
  return () => { rsz.removeEventListener('mousedown', onDown); document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
}

function initVResizer(elRef, valueRef, minH, maxH) {
  const rsz = elRef.value;
  if (!rsz) return;
  let dragging = false, startY = 0, startH = 0;
  const onDown = e => { dragging = true; startY = e.clientY; startH = valueRef.value; rsz.classList.add('drag'); document.body.style.userSelect = 'none'; e.preventDefault(); };
  const onMove = e => { if (!dragging) return; valueRef.value = Math.max(minH, Math.min(maxH, startH + (e.clientY - startY))); };
  const onUp   = () => { if (!dragging) return; dragging = false; rsz.classList.remove('drag'); document.body.style.userSelect = ''; };
  rsz.addEventListener('mousedown', onDown); document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', onUp);
  return () => { rsz.removeEventListener('mousedown', onDown); document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
}

let cleanupFns = [];
onMounted(() => {
  document.addEventListener('keydown', onKeydown);
  cleanupFns.push(initHResizer());
  cleanupFns.push(initVResizer(vizResizerRef,   vizHeight,   240, 600));
  cleanupFns.push(initVResizer(tableResizerRef, tableHeight, 50,  200));
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

          <!-- ── Control Toolbar ─────────────────────────────────────────── -->
          <div class="ll-toolbar">
            <label>Vertices</label>
            <input type="number" v-model.number="numVInput" min="0" max="10" style="width:45px;" class="ll-text-input"
              @change="applySetup" @keyup.enter="applySetup" />
            <span class="ll-divider">|</span>
            <label>Edges</label>
            <input type="text" v-model="edgesInputStr" style="width:180px;" class="ll-text-input"
              placeholder="e.g. [[0,1,2],[1,2,3]]" @keyup.enter="applySetup" />
            <span class="ll-divider">|</span>
            <label>Root</label>
            <input type="number" v-model.number="startNodeInput" min="0" :max="numVInput > 0 ? numVInput - 1 : 0"
              style="width:45px;" class="ll-text-input" @change="applySetup" @keyup.enter="applySetup" />
            <button class="ll-viz-btn" @click="applySetup" title="Run Prim's Algorithm">&#9654;</button>
            <button class="ll-graph-modal-btn" @click="showGraphModal = !showGraphModal">
              {{ showGraphModal ? 'Hide' : 'Show' }} Graph
            </button>
            <div class="ll-nav-controls">
              <button class="ll-nav-btn" title="First" @click="stepBy(-steps.length)">&#171;</button>
              <button class="ll-nav-btn" @click="stepBy(-1)">&#8249; Prev</button>
              <button class="ll-play-btn" @click="togglePlay">{{ playing ? '\u23F8 Pause' : '\u25B6 Play' }}</button>
              <button class="ll-nav-btn" @click="stepBy(1)">Next &#8250;</button>
              <button class="ll-nav-btn" title="Last" @click="stepBy(steps.length)">&#187;</button>
            </div>
          </div>

          <!-- ── Main Content Split View ─────────────────────────────────── -->
          <div class="ll-main" ref="mainRef">

            <!-- ── Left Column: Step-by-Step Visualization ────────────────── -->
            <div class="ll-left-col" ref="leftColRef" :style="{ width: leftWidth + '%' }">
              <div class="ll-viz-wrap" :style="{ height: vizHeight + 'px' }">
                <div class="ll-perm-area">

                  <div v-if="(s.V ?? 0) === 0" class="ll-empty-matrix-msg">
                    No graph to display (Vertices = 0). Set Vertices &gt; 0 with weighted edges like [[0,1,2],[0,3,6],[1,2,3]].
                  </div>

                  <template v-else>
                     <!-- 4. Variables Live Tracking Panel -->
                    <div class="ll-section-wrap">
                      <!-- <div class="ll-section-title">Variables &mdash; Live execution state:</div> -->
                      <div class="ll-ptrs">
                        <div class="ll-ptr-chip">count = <b class="ll-c-orange">{{ s.curCount !== undefined && s.curCount !== -1 ? s.curCount : '-' }}</b></div>
                        <div class="ll-ptr-chip">u = <b class="ll-c-orange">{{ s.curU !== undefined && s.curU !== -1 ? s.curU : '-' }}</b></div>
                        <div class="ll-ptr-chip">minKey = <b class="ll-c-blue">{{ s.curMinKey === Infinity ? '\u221e' : (s.curMinKey !== undefined && s.curMinKey !== -1 ? s.curMinKey : '-') }}</b></div>
                        <div class="ll-ptr-chip">v = <b class="ll-c-purple">{{ s.curV !== undefined && s.curV !== -1 ? s.curV : '-' }}</b></div>
                        <div class="ll-ptr-chip">V = <b class="ll-c-green">{{ s.V ?? 0 }}</b></div>
                        <div class="ll-ptr-chip">src = <b class="ll-c-blue">{{ s.src ?? 0 }}</b></div>
                      </div>
                    </div>

                    <!-- 1. inMST[] Track -->
                    <div class="ll-section-wrap">
                      <div class="ll-section-title">inMST[] &mdash; Vertices currently included in the Minimum Spanning Tree:</div>
                      <div class="ll-vis-track">
                        <template v-if="!s.inMSTAllocated">
                          <span class="ll-arr-unalloc">not yet allocated</span>
                        </template>
                        <template v-else>
                          <div
                            v-for="vIdx in s.V"
                            :key="'inmst-' + (vIdx-1)"
                            class="ll-vis-item"
                            :class="{
                              'll-inmst-true':   s.inMSTFilled && s.inMSTArr && s.inMSTArr[vIdx-1],
                              'll-inmst-false':  s.inMSTFilled && s.inMSTArr && !s.inMSTArr[vIdx-1],
                              'll-vis-active':   (vIdx-1) === s.activeInMSTIdx
                            }"
                          >
                            <span class="ll-vis-idx">inMST[{{ vIdx-1 }}]</span>
                            <span class="ll-vis-val">
                              {{ !s.inMSTFilled ? '?' : (s.inMSTArr && s.inMSTArr[vIdx-1] ? 'true' : 'false') }}
                            </span>
                          </div>
                        </template>
                      </div>
                    </div>

                    <!-- 2. key[] Track -->
                    <div class="ll-section-wrap">
                      <div class="ll-section-title">key[] &mdash; Minimum weight edge connecting vertex to the growing MST:</div>
                      <div class="ll-vis-track">
                        <template v-if="!s.keyAllocated">
                          <span class="ll-arr-unalloc">not yet allocated</span>
                        </template>
                        <template v-else>
                          <div
                            v-for="vIdx in s.V"
                            :key="'key-' + (vIdx-1)"
                            class="ll-vis-item"
                            :class="{
                              'll-dist-zero':    s.keyFilled && s.keyArr && s.keyArr[vIdx-1] === 0,
                              'll-dist-finite':  s.keyFilled && s.keyArr && s.keyArr[vIdx-1] !== Infinity && s.keyArr[vIdx-1] !== 0,
                              'll-vis-active':   (vIdx-1) === s.activeKeyIdx
                            }"
                          >
                            <span class="ll-vis-idx">key[{{ vIdx-1 }}]</span>
                            <span class="ll-vis-val">
                              {{ !s.keyFilled ? '?' : (s.keyArr && s.keyArr[vIdx-1] === Infinity ? '\u221e' : (s.keyArr ? s.keyArr[vIdx-1] : '\u221e')) }}
                            </span>
                          </div>
                        </template>
                      </div>
                    </div>

                    <!-- 3. parent[] Track -->
                    <div class="ll-section-wrap">
                      <div class="ll-section-title">parent[] &mdash; Predecessor vertex in Minimum Spanning Tree:</div>
                      <div class="ll-vis-track">
                        <template v-if="!s.parentAllocated">
                          <span class="ll-arr-unalloc">not yet allocated</span>
                        </template>
                        <template v-else>
                          <div
                            v-for="vIdx in s.V"
                            :key="'par-' + (vIdx-1)"
                            class="ll-vis-item"
                            :class="{
                              'll-par-set':    s.parentFilled && s.parentArr && s.parentArr[vIdx-1] !== -1,
                              'll-vis-active': (vIdx-1) === s.activeParentIdx
                            }"
                          >
                            <span class="ll-vis-idx">parent[{{ vIdx-1 }}]</span>
                            <span class="ll-vis-val">
                              {{ !s.parentFilled ? '?' : (s.parentArr ? s.parentArr[vIdx-1] : '?') }}
                            </span>
                          </div>
                        </template>
                      </div>
                    </div>

                    <!-- 5. Linear Scan / Relaxation Calculation Box -->
                    <!-- <div v-if="s.calcInfo" class="ll-section-wrap">
                      <div class="ll-section-title">
                        {{ s.calcInfo.type === 'scan' ? 'Linear Scan Candidate Comparison:' : (s.calcInfo.type === 'joined' ? 'Vertex Joined MST:' : 'Neighbor Key Relaxation:') }}
                      </div>
                      <div class="ll-calc-box">
                        <template v-if="s.calcInfo.type === 'scan'">
                          <span class="ll-calc-expr">
                            Scanning vertex {{ s.calcInfo.v }}: key[{{ s.calcInfo.v }}] = {{ s.calcInfo.keyVal === Infinity ? '\u221e' : s.calcInfo.keyVal }}
                            &nbsp;vs&nbsp; minKey = {{ s.calcInfo.minKey === Infinity ? '\u221e' : s.calcInfo.minKey }}
                            &nbsp;
                            <span :class="s.calcInfo.isMin ? 'll-calc-ok' : 'll-calc-no'">
                              {{ s.calcInfo.isMin ? '\u2713 New minimum candidate vertex: ' + s.calcInfo.v : '\u2717 Not smaller' }}
                            </span>
                          </span>
                        </template>
                        <template v-else-if="s.calcInfo.type === 'joined'">
                          <span class="ll-calc-expr">
                            Vertex {{ s.calcInfo.u }} locked into MST!
                            <template v-if="s.calcInfo.parent !== -1">
                              &nbsp; MST Edge: <b>{{ s.calcInfo.parent }} &mdash; {{ s.calcInfo.u }}</b> (weight: <b>{{ s.calcInfo.weight }}</b>)
                            </template>
                            <template v-else>
                              &nbsp; (Root vertex of the MST)
                            </template>
                          </span>
                        </template>
                        <template v-else-if="s.calcInfo.type === 'relax'">
                          <span class="ll-calc-expr">
                            Edge {{ s.calcInfo.u }} &mdash; {{ s.calcInfo.v }} (wt: {{ s.calcInfo.weight }})
                            &nbsp;vs&nbsp; key[{{ s.calcInfo.v }}] = {{ s.calcInfo.oldKey === Infinity ? '\u221e' : s.calcInfo.oldKey }}
                            &nbsp;
                            <span :class="s.calcInfo.isShorter ? 'll-calc-ok' : 'll-calc-no'">
                              {{ s.calcInfo.isShorter ? '\u2713 Cheaper connection found! key[' + s.calcInfo.v + '] \u2192 ' + s.calcInfo.weight : '\u2717 Existing key is cheaper or equal' }}
                            </span>
                          </span>
                        </template>
                        <template v-else-if="s.calcInfo.type === 'done'">
                          <span class="ll-calc-expr ll-calc-ok">
                            &#10004; Complete! All {{ s.V }} vertices connected into Minimum Spanning Tree with {{ s.calcInfo.edgeCount }} edges. Total MST Weight = {{ s.calcInfo.totalWeight }}.
                          </span>
                        </template>
                      </div>
                    </div> -->

                  </template>
                </div>
              </div>

              <div class="ll-vresizer" ref="vizResizerRef"></div>

              <!-- ── Legend ────────────────────────────────────────────────── -->
              <div class="ll-legend">
                <span class="ll-leg"><span class="ll-legdot ll-legdot-unvis"></span>unvisited</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-active"></span>selected (u)</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-nbr"></span>scan / neighbor (v)</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-visited"></span>in MST</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-path"></span>MST Tree Edge</span>
              </div>

              <!-- ── Variable Frames (Call Stack) ─────────────────────────── -->
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

              <!-- ── Badge Step Explanation ────────────────────────────────── -->
              <div class="ll-badge-wrap">
                <div class="ll-badge">{{ s.badge }}</div>
              </div>
            </div>

            <div class="ll-resizer" ref="hResizerRef"></div>

            <!-- ── Right Column: Code / Pseudocode / Complexity ───────────── -->
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
                    <option value="javascript">JavaScript</option>
                  </select>
                </div>

                <!-- Code View -->
                <div v-if="rightTab === 'code'" class="ll-code-scroll">
                  <pre class="ll-pre"><span
                    v-for="(line, i) in codeLines"
                    :key="i"
                    class="ll-codeline"
                    :class="{ 'll-hl': line[0] && line[0] === s.code }"
                  >{{ line[1] === '' ? ' ' : line[1] }}</span></pre>
                </div>

                <!-- Pseudocode View -->
                <div v-else-if="rightTab === 'pseudo'" class="ll-code-scroll">
                  <pre class="ll-pre"><span
                    v-for="(line, i) in PSEUDOCODE"
                    :key="i"
                    class="ll-codeline"
                    :class="{ 'll-hl': PSEUDOCODE_MAP[s.code] === i }"
                  >{{ line }}</span></pre>
                </div>

                <!-- Complexity & Conceptual Explanation -->
                <div v-else class="ll-info-scroll">
                  <h3>What is Prim's Algorithm?</h3>
                  <p>
                    <b>Prim's Algorithm</b> is a greedy algorithm that finds a <b>Minimum Spanning Tree (MST)</b> for a connected, weighted, undirected graph.
                    It starts from an arbitrary root vertex and grows the spanning tree one vertex at a time by repeatedly selecting the <b>cheapest edge</b> connecting an unvisited vertex to the growing tree.
                  </p>

                  <h3>Time &amp; Space Complexity</h3>
                  <table class="ll-complexity-table">
                    <thead><tr><th>Implementation</th><th>Time Complexity</th><th>Space Complexity</th><th>Best Suited For</th></tr></thead>
                    <tbody>
                      <tr>
                        <td><b>Linear Scan (Matrix)</b></td>
                        <td><b>O(V&sup2;)</b></td>
                        <td><b>O(V)</b></td>
                        <td>Dense Graphs where E &approx; V&sup2; (this component's implementation)</td>
                      </tr>
                      <tr>
                        <td><b>Binary Heap (Adj List)</b></td>
                        <td><b>O(E log V)</b></td>
                        <td><b>O(V + E)</b></td>
                        <td>Sparse Graphs with fewer edges</td>
                      </tr>
                      <tr>
                        <td><b>Fibonacci Heap</b></td>
                        <td><b>O(E + V log V)</b></td>
                        <td><b>O(V + E)</b></td>
                        <td>Theoretically optimal for large graphs</td>
                      </tr>
                    </tbody>
                  </table>

                  <h3>Prim's vs. Bellman-Ford &amp; Kruskal's</h3>
                  <p class="ll-note">
                    <b>Prim's vs. Bellman-Ford:</b> Prim's constructs a <b>Minimum Spanning Tree</b> (connects all V vertices using V &minus; 1 edges with minimum total weight on undirected graphs). In contrast, <b>Bellman-Ford</b> finds <b>Single-Source Shortest Paths</b> on directed graphs and handles negative edge weights.
                  </p>
                  <p class="ll-note" style="margin-top:8px;">
                    <b>Prim's vs. Kruskal's:</b> Both find an MST. <b>Prim's</b> grows a single continuous tree outward from a source vertex (vertex-centric), whereas <b>Kruskal's</b> sorts all edges globally and repeatedly joins disconnected forests (edge-centric using Disjoint-Set Union / Union-Find).
                  </p>

                  <h3>Applications</h3>
                  <p>Telecommunications &amp; fiber optic cable network design, electrical grid wiring, road network planning, cluster analysis in machine learning, and approximation algorithms for NP-hard problems like the Traveling Salesperson Problem (TSP).</p>
                </div>
              </div>
            </div>

          </div>

          <!-- ── Footer ─────────────────────────────────────────────────── -->
          <div class="ll-footer">
            Step {{ si + 1 }} / {{ steps.length }}
            <span class="ll-speed-wrap">Speed <input type="range" min="100" max="2000" step="100" v-model.number="speed" /></span>
          </div>

        </div>
      </div>
    </div>

    <!-- ── Graph Modal (Interactive SVG View) ───────────────────────────── -->
    <div v-if="showGraphModal" class="graph-modal-backdrop" @click.self="showGraphModal = false">
      <div class="graph-modal-card">
        <div class="graph-modal-header">
          <div class="graph-modal-title">
            <span>Prim's MST Graph View</span>
            <span class="graph-subtitle">(Undirected Weighted Graph &amp; Growing Minimum Spanning Tree)</span>
          </div>
          <button class="graph-close-btn" @click="showGraphModal = false">&times;</button>
        </div>

        <div class="graph-modal-body">
          <div v-if="(s.V ?? 0) === 0" class="ll-empty-graph-msg">No vertices to display.</div>
          <svg v-else class="graph-modal-svg" viewBox="0 -25 720 510">
            <!-- Edges (Undirected) -->
            <g
              v-for="edge in s.edges"
              :key="'me-' + edge.u + '-' + edge.v"
              @mouseenter="hoveredEdge = { u: edge.u, v: edge.v }"
              @mouseleave="hoveredEdge = null"
              style="cursor:pointer;"
            >
              <path :d="getEdgeGeo(edge).pathD" fill="none" stroke="transparent" stroke-width="18" stroke-linecap="round"/>
              <path
                :d="getEdgeGeo(edge).pathD"
                fill="none"
                class="ll-edge-line"
                :class="{
                  'll-edge-path-hovered': isHoveredMstPathEdge(edge.u, edge.v),
                  'll-edge-active':       isActiveEdge(edge.u, edge.v),
                  'll-edge-tree':         isMstEdge(edge.u, edge.v) && !isHoveredMstPathEdge(edge.u, edge.v),
                  'll-edge-hovered':      isEdgeHovered(edge.u, edge.v)
                }"
              />
              <!-- Edge Weight Pill -->
              <rect :x="getEdgeGeo(edge).labelX - 11" :y="getEdgeGeo(edge).labelY - 9" width="22" height="16" rx="4"
                class="ll-wlabel-bg" :class="{
                  'll-wlabel-bg-path-hover': isHoveredMstPathEdge(edge.u, edge.v),
                  'll-wlabel-bg-active':     isActiveEdge(edge.u, edge.v),
                  'll-wlabel-bg-tree':       isMstEdge(edge.u, edge.v) && !isHoveredMstPathEdge(edge.u, edge.v)
                }"/>
              <text :x="getEdgeGeo(edge).labelX" :y="getEdgeGeo(edge).labelY + 4"
                class="ll-weight-label" :class="{
                  'll-wlabel-path-hover': isHoveredMstPathEdge(edge.u, edge.v),
                  'll-wlabel-active':     isActiveEdge(edge.u, edge.v),
                  'll-wlabel-tree':       isMstEdge(edge.u, edge.v) && !isHoveredMstPathEdge(edge.u, edge.v)
                }">{{ edge.w }}</text>
            </g>

            <!-- Nodes -->
            <g
              v-for="node in modalNodePositions"
              :key="'mn-' + node.id"
              @mouseenter="hoveredNode = node.id"
              @mouseleave="hoveredNode = null"
              style="cursor: pointer;"
            >
              <!-- Node Circle -->
              <circle :cx="node.x" :cy="node.y" r="20" class="ll-node-circle"
                :class="{
                  'll-node-path-hover': isHoveredMstPathNode(node.id),
                  'll-node-u':          node.id === s.activeU,
                  'll-node-v':          node.id === s.activeV && node.id !== s.activeU,
                  'll-node-visited':    s.inMSTArr && s.inMSTArr[node.id] && node.id !== s.activeU && node.id !== s.activeV,
                  'll-node-hover-src':  isNodeHoveredSource(node.id)
                }"
              />

              <!-- Node Text -->
              <text :x="node.x" :y="node.y + 5" class="ll-node-text"
                :class="{
                  'll-node-text-path-hover': isHoveredMstPathNode(node.id),
                  'll-node-text-hover-src':  isNodeHoveredSource(node.id)
                }"
                style="font-size:15px;"
              >{{ node.id }}</text>

              <!-- Live Key Value Badge above node -->
              <g v-if="s.keyFilled && s.keyArr">
                <rect
                  :x="node.x - 11"
                  :y="node.y - 36"
                  width="22"
                  height="16"
                  rx="4"
                  class="ll-ndist-bg1"
                  :class="{ 'll-ndist-bg-path-hover': isHoveredMstPathNode(node.id) }"
                />
                <text
                  :x="node.x"
                  :y="node.y - 23"
                  class="ll-node-dist-label"
                  :class="{ 'll-ndist-path-hover': isHoveredMstPathNode(node.id) }"
                >{{ s.keyArr[node.id] === Infinity ? '\u221e' : s.keyArr[node.id] }}</text>
              </g>
            </g>
          </svg>

          <!-- MST summary bar -->
          <div v-if="s.confirmedMstEdges && s.confirmedMstEdges.length > 0" class="graph-mst-summary">
            <span class="graph-mst-label">MST Edges:</span>
            <span v-for="(e, i) in s.confirmedMstEdges" :key="i" class="graph-mst-edge">({{ e.u }}&mdash;{{ e.v }}, w:{{ e.w }})</span>
            <span class="graph-mst-total">Total Weight: <b>{{ s.confirmedMstEdges.reduce((a, e) => a + e.w, 0) }}</b></span>
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
.ll-section-wrap { display: flex; flex-direction: column; gap: 4px; }
.ll-section-title { font-size: 11px; font-weight: 700; color: var(--text2); font-family: monospace; }
.ll-ptrs { display: flex; gap: 8px; flex-wrap: wrap; padding: 2px 0; min-height: 32px; width: 100%; box-sizing: border-box; min-width: 0; }
.ll-ptr-chip { background: var(--surface2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 4px 10px; font-size: 12px; font-family: monospace; box-shadow: var(--shadow-sm); white-space: nowrap; flex-shrink: 0; transition: all 0.2s ease; }
.ll-vis-track { display: flex; gap: 6px; flex-wrap: wrap; }
.ll-vis-item { display: flex; flex-direction: column; align-items: center; padding: 4px 6px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-sm); font-family: monospace; min-width: 56px; transition: all 0.2s ease; }
.ll-vis-idx { font-size: 10px; color: var(--muted); }
.ll-vis-val { font-size: 12px; font-weight: 700; color: var(--muted); }
.ll-inmst-true  { background: #f0fdf4; border-color: var(--green); }
.ll-inmst-true  .ll-vis-val { color: #15803d; font-weight: 800; }
.ll-inmst-false { background: var(--surface2); border-color: var(--border2); }
.ll-inmst-false .ll-vis-val { color: var(--muted); }
.ll-dist-zero   { background: #f0fdf4; border-color: var(--green); }
.ll-dist-zero   .ll-vis-val { color: #15803d; }
.ll-dist-finite { background: var(--blue-light); border-color: var(--blue); }
.ll-dist-finite .ll-vis-val { color: #1d4ed8; }
.ll-par-set     { background: #f3e8ff; border-color: var(--purple); }
.ll-par-set     .ll-vis-val { color: var(--purple); }
.ll-vis-active  {
  border-color: #64748b !important;
  box-shadow: 0 0 0 3px rgba(100, 116, 139, 0.30);
  /* NO transform:scale — would shift siblings */
}
.ll-dist-zero.ll-vis-active,
.ll-inmst-true.ll-vis-active { border-color: #15803d !important; box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.35); }
.ll-dist-finite.ll-vis-active { border-color: #1d4ed8 !important; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.35); }
.ll-par-set.ll-vis-active     { border-color: #7e22ce !important; box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.35); }
.ll-inmst-false.ll-vis-active { border-color: #64748b !important; box-shadow: 0 0 0 3px rgba(100, 116, 139, 0.30); }
.ll-arr-unalloc { font-size: 11px; font-style: italic; color: var(--muted); padding: 8px 12px; background: var(--surface2); border: 1px dashed var(--border2); border-radius: var(--radius-sm); }
.ll-calc-box  { padding: 6px 12px; background: var(--surface2); border: 1px solid var(--border); border-radius: var(--radius-sm); font-family: monospace; font-size: 12px; }
.ll-calc-expr { color: var(--text); }
.ll-calc-ok   { color: #15803d; font-weight: 700; }
.ll-calc-no   { color: var(--red); font-weight: 700; }
.ll-empty-matrix-msg { padding: 24px 16px; text-align: center; color: var(--muted); font-size: 12px; font-weight: 600; border: 1px dashed var(--border2); border-radius: var(--radius-sm); background: var(--surface2); }
.ll-empty-graph-msg  { display: flex; align-items: center; justify-content: center; height: 100%; width: 100%; color: #64748b; font-size: 14px; font-weight: 600; text-align: center; }
.ll-legend { display: flex; gap: 12px; padding: 6px 16px; background: var(--surface); border-bottom: 1px solid var(--border); flex-wrap: wrap; flex-shrink: 0; }
.ll-leg { display: flex; align-items: center; gap: 5px; font-size: 11px; color: var(--text2); }
.ll-legdot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
.ll-legdot-unvis   { background: #eff6ff; border: 1.5px solid #3b82f6; }
.ll-legdot-active  { background: #fff7ed; border: 1.5px solid #f97316; }
.ll-legdot-nbr     { background: #f3e8ff; border: 1.5px solid #9333ea; }
.ll-legdot-visited { background: #f0fdf4; border: 1.5px solid #22c55e; }
.ll-legdot-path    { background: #f0fdf4; border: 2px solid #22c55e; }
.ll-table-area  { padding: 6px 16px; overflow-y: auto; background: var(--surface); font-family: monospace; font-size: 12px; border-bottom: 1px solid var(--border); }
.ll-table-title { font-size: 10px; color: var(--muted); margin-bottom: 4px; text-transform: uppercase; letter-spacing: .5px; }
.ll-stack-line  { display: flex; flex-direction: column; gap: 2px; }
.ll-frame       { color: var(--text2); font-size: 11.5px; }
.ll-frame-cur   { color: var(--text); font-weight: 600; }
.ll-fname       { color: var(--muted); }
.ll-now         { color: var(--coral); font-size: 10px; }
.ll-c-blue   { color: var(--blue); }
.ll-c-orange { color: var(--orange); }
.ll-c-green  { color: var(--green); }
.ll-c-purple { color: var(--purple); }
.ll-badge-wrap { padding: 6px 16px; background: var(--surface); border-bottom: 1px solid var(--border); flex-shrink: 0; }
.ll-badge { background: var(--surface2); border-left: 3px solid var(--coral); padding: 5px 10px; font-size: 11.5px; color: var(--text); font-family: monospace; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }
.ll-resizer  { width: 5px; background: var(--border); cursor: col-resize; transition: background .15s; flex-shrink: 0; }
.ll-resizer:hover, .ll-resizer.drag  { background: var(--coral); }
.ll-vresizer { height: 5px; background: var(--border); cursor: row-resize; transition: background .15s; flex-shrink: 0; }
.ll-vresizer:hover, .ll-vresizer.drag { background: var(--coral); }
.ll-right-col  { display: flex; flex-direction: column; flex: 1; overflow: hidden; min-width: 0; height: 78%; }
.ll-code-panel { display: flex; flex-direction: column; height: 100%; overflow: hidden; }
.ll-code-header { display: flex; align-items: center; gap: 8px; padding: 8px 14px; background: var(--surface); border-bottom: 1px solid var(--border); flex-shrink: 0; box-shadow: var(--shadow-sm); flex-wrap: wrap; }
.ll-tabbar  { display: flex; gap: 4px; flex-wrap: wrap; }
.ll-tab-btn { background: var(--surface2); border: 1px solid var(--border2); color: var(--text2); padding: 5px 11px; border-radius: var(--radius-sm); cursor: pointer; font-size: 11px; font-weight: 600; transition: all .15s; white-space: nowrap; }
.ll-tab-btn:hover  { border-color: var(--coral); color: var(--coral); }
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
.ll-nav-btn  { background: var(--surface2); border: 1px solid var(--border2); color: var(--text2); padding: 5px 11px; border-radius: var(--radius-sm); cursor: pointer; font-size: 12px; font-weight: 500; transition: all .15s; white-space: nowrap; }
.ll-nav-btn:hover { background: var(--surface); border-color: var(--coral); color: var(--coral); }
.ll-play-btn { background: var(--blue-light); border: 1px solid var(--blue); color: var(--blue); min-width: 72px; font-weight: 600; padding: 5px 11px; border-radius: var(--radius-sm); cursor: pointer; font-size: 12px; transition: all .15s; }
.ll-play-btn:hover { background: var(--blue); color: #fff; }
.graph-modal-backdrop { position: fixed; top: 0; left: 0; right: 0; bottom: 55px; background: rgba(15,23,42,0.55); backdrop-filter: blur(3px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 16px 24px 20px; }
.graph-modal-card { background: #fff; border-radius: 12px; box-shadow: 0 20px 25px -5px rgba(0,0,0,.15),0 10px 10px -5px rgba(0,0,0,.04); width: 740px; max-width: 95vw; max-height: calc(100vh - 120px); display: flex; flex-direction: column; overflow: hidden; border: 1px solid var(--border); animation: ll-pop .25s ease-out; }
.graph-modal-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 18px; background: #f8fafc; border-bottom: 1px solid var(--border); }
.graph-modal-title  { font-size: 14px; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 8px; }
.graph-subtitle     { font-size: 11px; font-weight: 500; color: #64748b; }
.graph-close-btn    { background: none; border: none; font-size: 22px; color: #64748b; cursor: pointer; line-height: 1; padding: 0 4px; border-radius: 4px; transition: color .15s; }
.graph-close-btn:hover { color: #ef4444; }
.graph-modal-body   { padding: 12px 16px; display: flex; flex-direction: column; background: #fff; overflow: auto; gap: 8px; }
.graph-modal-svg    { width: 100%; max-height: 300px; }
.graph-mst-summary { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; padding: 8px 12px; background: var(--green-light); border: 1px solid var(--green); border-radius: var(--radius-sm); font-size: 11.5px; font-family: monospace; }
.graph-mst-label { font-weight: 700; color: #15803d; }
.graph-mst-edge { background: #fff; border: 1px solid var(--green); border-radius: 4px; padding: 2px 6px; color: #166534; }
.graph-mst-total { margin-left: auto; color: #15803d; font-weight: 700; }
.ll-edge-line          { stroke: #cbd5e1; stroke-width: 2.5px; transition: all .15s ease; }
.ll-edge-active        { stroke: #f97316 !important; stroke-width: 4px !important; stroke-dasharray: 6 3; animation: ll-dash 1s linear infinite; }
.ll-edge-tree          { stroke: #22c55e !important; stroke-width: 3.8px !important; }
.ll-edge-hovered       { stroke: #3b82f6 !important; stroke-width: 4px !important; filter: drop-shadow(0 0 6px rgba(59,130,246,.6)); }
.ll-edge-path-hovered  { stroke: #22c55e !important; stroke-width: 4.5px !important; stroke-dasharray: 8 4; animation: ll-flow-dash 0.65s linear infinite; filter: drop-shadow(0 0 8px rgba(34,197,94,.85)); }
@keyframes ll-dash      { to { stroke-dashoffset: -18; } }
@keyframes ll-flow-dash { to { stroke-dashoffset: -24; } }
@keyframes ll-node-pulse {
  from { filter: drop-shadow(0 0 4px rgba(34, 197, 94, 0.4)); }
  to   { filter: drop-shadow(0 0 10px rgba(34, 197, 94, 0.9)); }
}
.ll-weight-label          { font-size: 11px; font-weight: 700; font-family: monospace; text-anchor: middle; fill: #475569; }
.ll-wlabel-active         { fill: #ea580c !important; }
.ll-wlabel-tree           { fill: #15803d !important; font-weight: 800 !important; }
.ll-wlabel-path-hover     { fill: #15803d !important; font-weight: 900 !important; }
.ll-wlabel-bg             { fill: #fff; stroke: #e2e8f0; stroke-width: 1; opacity: .9; }
.ll-wlabel-bg-active      { fill: #fff7ed !important; stroke: #f97316 !important; }
.ll-wlabel-bg-tree        { fill: #f0fdf4 !important; stroke: #22c55e !important; stroke-width: 1.5; }
.ll-wlabel-bg-path-hover  { fill: #f0fdf4 !important; stroke: #22c55e !important; stroke-width: 2; opacity: 1; }
.ll-node-dist-label       { font-size: 15px; font-weight: 700; font-family: monospace; text-anchor: middle; fill: #9333ea; }
.ll-ndist-path-hover      { fill: #15803d !important; font-weight: 800 !important; }
.ll-ndist-bg1             { fill: #ffffffd5; stroke: #9333ea; stroke-width: 1; }
.ll-ndist-bg-path-hover   { fill: #f0fdf4 !important; stroke: #22c55e !important; stroke-width: 1.5; }
.ll-node-circle        { fill: #eff6ff; stroke: #3b82f6; stroke-width: 2.5; transition: all .25s ease; }
.ll-node-u             { fill: #fff7ed !important; stroke: #f97316 !important; stroke-width: 3.5 !important; }
.ll-node-v             { fill: #f3e8ff !important; stroke: #9333ea !important; stroke-width: 3.5 !important; }
.ll-node-visited       { fill: #f0fdf4 !important; stroke: #22c55e !important; stroke-width: 3 !important; }
.ll-node-path-hover    { fill: #dcfce7 !important; stroke: #22c55e !important; stroke-width: 3.5px !important; animation: ll-node-pulse 1.2s ease-in-out infinite alternate; }
.ll-node-hover-src     { fill: #fff7ed !important; stroke: #f97316 !important; stroke-width: 3.5px !important; filter: drop-shadow(0 0 8px rgba(249,115,22,.55)); }
.ll-node-text           { font-size: 13px; font-weight: 800; font-family: monospace; text-anchor: middle; fill: #1e293b; }
.ll-node-text-path-hover{ fill: #15803d !important; font-weight: 900 !important; }
.ll-node-text-hover-src { fill: #c2410c !important; font-weight: 900 !important; }
.ll-svg-ptr           { font-size: 13px; font-weight: 800; font-family: monospace; text-anchor: middle; }
.ll-svg-ptr-blue      { fill: #3b82f6; }
.ll-svg-ptr-orange    { fill: #ea580c; }
.ll-svg-ptr-purple    { fill: #9333ea; }
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
