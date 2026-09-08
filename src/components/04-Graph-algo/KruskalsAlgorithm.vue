<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, watch } from 'vue';

defineProps({
  topic:    { type: String, default: "Kruskal's Algorithm (Minimum Spanning Tree)" },
  subTopic: { type: String, default: 'Greedy Graph Algorithm (Edge-Based, Union-Find, O(E log E))' }
});

const CODES = {
  java: [
    ['', 'class KruskalsGraph {'],
    ['', ''],
    ['', '    // Selection sort: order edges by weight ascending'],
    ['c_sort_decl',     '    void sortEdges(int[][] edges) {'],
    ['c_sort_n',        '        int n = edges.length;'],
    ['c_sort_outer',    '        for (int i = 0; i < n - 1; i++) {'],
    ['c_sort_min_init', '            int minIdx = i;'],
    ['c_sort_inner',    '            for (int j = i + 1; j < n; j++) {'],
    ['c_sort_if_cmp',   '                if (edges[j][2] < edges[minIdx][2]) {'],
    ['c_sort_min_upd',  '                    minIdx = j;'],
    ['',                '                }'],
    ['',                '            }'],
    ['c_sort_if_swap',  '            if (minIdx != i) {'],
    ['c_sort_swap1',    '                int[] temp    = edges[i];'],
    ['c_sort_swap2',    '                edges[i]      = edges[minIdx];'],
    ['c_sort_swap3',    '                edges[minIdx]  = temp;'],
    ['',                '            }'],
    ['',                '        }'],
    ['',                '    }'],
    ['', ''],
    ['', '    // Union-Find: find root with path compression'],
    ['c_find_decl',     '    int find(int[] parent, int x) {'],
    ['c_find_if',       '        if (parent[x] != x) {'],
    ['c_find_compress', '            parent[x] = find(parent, parent[x]);'],
    ['',                '        }'],
    ['c_find_ret',      '        return parent[x];'],
    ['',                '    }'],
    ['', ''],
    ['', '    // Merge two disjoint sets'],
    ['c_unite_decl',    '    void unite(int[] parent, int x, int y) {'],
    ['c_unite_rx',      '        int rx = find(parent, x);'],
    ['c_unite_ry',      '        int ry = find(parent, y);'],
    ['c_unite_if',      '        if (rx != ry) {'],
    ['c_unite_set',     '            parent[ry] = rx;'],
    ['',                '        }'],
    ['',                '    }'],
    ['', ''],
    ['c_entry',         '    void kruskalMST(int[][] edges, int V) {'],
    ['c_call_sort',     '        sortEdges(edges);'],
    ['c_par_decl',      '        int[] parent = new int[V];'],
    ['c_par_loop',      '        for (int i = 0; i < V; i++) {'],
    ['c_par_body',      '            parent[i] = i;'],
    ['',                '        }'],
    ['', ''],
    ['c_mst_count',     '        int mstEdgeCount = 0;'],
    ['c_outer_loop',    '        for (int i = 0; i < edges.length; i++) {'],
    ['c_get_uv',        '            int u = edges[i][0], v = edges[i][1], w = edges[i][2];'],
    ['c_call_find_u',   '            int rootU = find(parent, u);'],
    ['c_call_find_v',   '            int rootV = find(parent, v);'],
    ['c_check_cycle',   '            if (rootU != rootV) {         // no cycle'],
    ['c_call_unite',    '                unite(parent, u, v);'],
    ['c_add_edge',      '                mstEdgeCount++;'],
    ['c_check_done',    '                if (mstEdgeCount == V - 1) {'],
    ['c_break',         '                    break;'],
    ['',                '                }'],
    ['',                '            }'],
    ['',                '        }'],
    ['c_done',          '    }'],
    ['',                '}']
  ],

  c: [
    ['', '#include <stdio.h>'],
    ['', ''],
    ['', 'typedef struct { int u, v, w; } Edge;'],
    ['', ''],
    ['', '// Selection sort: order edges by weight ascending'],
    ['c_sort_decl',     'void sortEdges(Edge edges[], int E) {'],
    ['c_sort_outer',    '    for (int i = 0; i < E - 1; i++) {'],
    ['c_sort_min_init', '        int minIdx = i;'],
    ['c_sort_inner',    '        for (int j = i + 1; j < E; j++) {'],
    ['c_sort_if_cmp',   '            if (edges[j].w < edges[minIdx].w) {'],
    ['c_sort_min_upd',  '                minIdx = j;'],
    ['',                '            }'],
    ['',                '        }'],
    ['c_sort_if_swap',  '        if (minIdx != i) {'],
    ['c_sort_swap1',    '            Edge temp     = edges[i];'],
    ['c_sort_swap2',    '            edges[i]      = edges[minIdx];'],
    ['c_sort_swap3',    '            edges[minIdx]  = temp;'],
    ['',                '        }'],
    ['',                '    }'],
    ['',                '}'],
    ['', ''],
    ['', '// Union-Find with path compression'],
    ['c_find_decl',     'int find(int parent[], int x) {'],
    ['c_find_if',       '    if (parent[x] != x) {'],
    ['c_find_compress', '        parent[x] = find(parent, parent[x]);'],
    ['',                '    }'],
    ['c_find_ret',      '    return parent[x];'],
    ['',                '}'],
    ['', ''],
    ['c_unite_decl',    'void unite(int parent[], int x, int y) {'],
    ['c_unite_rx',      '    int rx = find(parent, x);'],
    ['c_unite_ry',      '    int ry = find(parent, y);'],
    ['c_unite_if',      '    if (rx != ry) {'],
    ['c_unite_set',     '        parent[ry] = rx;'],
    ['',                '    }'],
    ['',                '}'],
    ['', ''],
    ['c_entry',         'void kruskalMST(Edge edges[], int E, int V) {'],
    ['c_call_sort',     '    sortEdges(edges, E);'],
    ['c_par_decl',      '    int parent[10];'],
    ['c_par_loop',      '    for (int i = 0; i < V; i++) {'],
    ['c_par_body',      '        parent[i] = i;'],
    ['',                '    }'],
    ['', ''],
    ['c_mst_count',     '    int mstEdgeCount = 0;'],
    ['c_outer_loop',    '    for (int i = 0; i < E; i++) {'],
    ['c_get_uv',        '        int u = edges[i].u, v = edges[i].v, w = edges[i].w;'],
    ['c_call_find_u',   '        int rootU = find(parent, u);'],
    ['c_call_find_v',   '        int rootV = find(parent, v);'],
    ['c_check_cycle',   '        if (rootU != rootV) {'],
    ['c_call_unite',    '            unite(parent, u, v);'],
    ['c_add_edge',      '            mstEdgeCount++;'],
    ['c_check_done',    '            if (mstEdgeCount == V - 1) {'],
    ['c_break',         '                break;'],
    ['',                '            }'],
    ['',                '        }'],
    ['',                '    }'],
    ['c_done',          '}']
  ],
  cpp: [
    ['', '#include <iostream>'],
    ['', '#include <vector>'],
    ['', 'using namespace std;'],
    ['', ''],
    ['', 'class KruskalsGraph {'],
    ['', '    vector<int> parent;'],
    ['', 'public:'],
    ['', '    // Selection sort: order edges by weight ascending'],
    ['c_sort_decl',     '    void sortEdges(vector<array<int,3>>& edges) {'],
    ['c_sort_n',        '        int n = edges.size();'],
    ['c_sort_outer',    '        for (int i = 0; i < n - 1; i++) {'],
    ['c_sort_min_init', '            int minIdx = i;'],
    ['c_sort_inner',    '            for (int j = i + 1; j < n; j++) {'],
    ['c_sort_if_cmp',   '                if (edges[j][2] < edges[minIdx][2]) {'],
    ['c_sort_min_upd',  '                    minIdx = j;'],
    ['',                '                }'],
    ['',                '            }'],
    ['c_sort_if_swap',  '            if (minIdx != i) {'],
    ['c_sort_swap1',    '                auto temp     = edges[i];'],
    ['c_sort_swap2',    '                edges[i]      = edges[minIdx];'],
    ['c_sort_swap3',    '                edges[minIdx]  = temp;'],
    ['',                '            }'],
    ['',                '        }'],
    ['',                '    }'],
    ['', ''],
    ['', '    // Union-Find with path compression'],
    ['c_find_decl',     '    int find(int x) {'],
    ['c_find_if',       '        if (parent[x] != x) {'],
    ['c_find_compress', '            parent[x] = find(parent[x]);'],
    ['',                '        }'],
    ['c_find_ret',      '        return parent[x];'],
    ['',                '    }'],
    ['', ''],
    ['c_unite_decl',    '    void unite(int x, int y) {'],
    ['c_unite_rx',      '        int rx = find(x);'],
    ['c_unite_ry',      '        int ry = find(y);'],
    ['c_unite_if',      '        if (rx != ry) {'],
    ['c_unite_set',     '            parent[ry] = rx;'],
    ['',                '        }'],
    ['',                '    }'],
    ['', ''],
    ['c_entry',         '    void kruskalMST(vector<array<int,3>>& edges, int V) {'],
    ['c_call_sort',     '        sortEdges(edges);'],
    ['c_par_decl',      '        parent.resize(V);'],
    ['c_par_loop',      '        for (int i = 0; i < V; i++) {'],
    ['c_par_body',      '            parent[i] = i;'],
    ['',                '        }'],
    ['', ''],
    ['c_mst_count',     '        int mstEdgeCount = 0;'],
    ['c_outer_loop',    '        for (auto& e : edges) {'],
    ['c_get_uv',        '            auto [u, v, w] = e;'],
    ['c_call_find_u',   '            int rootU = find(u);'],
    ['c_call_find_v',   '            int rootV = find(v);'],
    ['c_check_cycle',   '            if (rootU != rootV) {'],
    ['c_call_unite',    '                unite(u, v);'],
    ['c_add_edge',      '                mstEdgeCount++;'],
    ['c_check_done',    '                if (mstEdgeCount == V - 1) {'],
    ['c_break',         '                    break;'],
    ['',                '                }'],
    ['',                '            }'],
    ['',                '        }'],
    ['c_done',          '    }'],
    ['',                '};']
  ],
  python: [
    ['', 'class KruskalsGraph:'],
    ['', ''],
    ['', '    # Selection sort: order edges by weight ascending'],
    ['c_sort_decl',     '    def sort_edges(self, edges):'],
    ['c_sort_n',        '        n = len(edges)'],
    ['c_sort_outer',    '        for i in range(n - 1):'],
    ['c_sort_min_init', '            min_idx = i'],
    ['c_sort_inner',    '            for j in range(i + 1, n):'],
    ['c_sort_if_cmp',   '                if edges[j][2] < edges[min_idx][2]:'],
    ['c_sort_min_upd',  '                    min_idx = j'],
    ['c_sort_if_swap',  '            if min_idx != i:'],
    ['c_sort_swap1',    '                edges[i], edges[min_idx] = edges[min_idx], edges[i]'],
    ['', ''],
    ['', '    # Union-Find with path compression'],
    ['c_find_decl',     '    def find(self, parent, x):'],
    ['c_find_if',       '        if parent[x] != x:'],
    ['c_find_compress', '            parent[x] = self.find(parent, parent[x])'],
    ['c_find_ret',      '        return parent[x]'],
    ['', ''],
    ['c_unite_decl',    '    def unite(self, parent, x, y):'],
    ['c_unite_rx',      '        rx = self.find(parent, x)'],
    ['c_unite_ry',      '        ry = self.find(parent, y)'],
    ['c_unite_if',      '        if rx != ry:'],
    ['c_unite_set',     '            parent[ry] = rx'],
    ['', ''],
    ['c_entry',         '    def kruskal_mst(self, edges, V):'],
    ['c_call_sort',     '        self.sort_edges(edges)'],
    ['c_par_decl',      '        parent = list(range(V))'],
    ['', ''],
    ['c_mst_count',     '        mst_edge_count = 0'],
    ['c_outer_loop',    '        for e in edges:'],
    ['c_get_uv',        '            u, v, w = e'],
    ['c_call_find_u',   '            root_u = self.find(parent, u)'],
    ['c_call_find_v',   '            root_v = self.find(parent, v)'],
    ['c_check_cycle',   '            if root_u != root_v:       # no cycle'],
    ['c_call_unite',    '                self.unite(parent, u, v)'],
    ['c_add_edge',      '                mst_edge_count += 1'],
    ['c_check_done',    '                if mst_edge_count == V - 1:'],
    ['c_break',         '                    break'],
    ['c_done',          '        return mst_edge_count']
  ]
};

const PSEUDOCODE = [
  'function KRUSKAL-MST(edges, V):',
  '    // Union-Find: path-compressed root search',
  '    find(parent, x):',
  '        if parent[x] != x: parent[x] = find(parent, parent[x])',
  '        return parent[x]',
  '    unite(parent, x, y):',
  '        if find(x) != find(y): parent[find(y)] = find(x)',
  '    Sort all edges by weight ascending          // O(E log E)',
  '    for i in 0..V-1: parent[i] = i             // init Union-Find',
  '    mstEdgeCount = 0',
  '    for each edge (u, v, w) in sorted order:',
  '        rootU = find(parent, u)',
  '        rootV = find(parent, v)',
  '        if rootU != rootV:                      // no cycle formed',
  '            unite(parent, u, v)',
  '            mstEdgeCount++',
  '            if mstEdgeCount == V - 1: break     // MST complete',
  '    return mstEdgeCount                         // V-1 MST edges added'
];

const PSEUDOCODE_MAP = {
  c_entry: 0,
  c_sort_decl: 7, c_sort_n: 7, c_sort_outer: 7, c_sort_min_init: 7,
  c_sort_inner: 7, c_sort_if_cmp: 7, c_sort_min_upd: 7,
  c_sort_if_swap: 7, c_sort_swap1: 7, c_sort_swap2: 7, c_sort_swap3: 7,
  c_call_sort: 7,
  c_find_decl: 3, c_find_if: 3, c_find_compress: 4, c_find_ret: 5,
  c_unite_decl: 6, c_unite_rx: 6, c_unite_ry: 6, c_unite_if: 6, c_unite_set: 7,
  c_par_decl: 8, c_par_loop: 8, c_par_body: 8,
  c_mst_count: 9, c_outer_loop: 10,
  c_get_uv: 10, c_call_find_u: 11, c_call_find_v: 12,
  c_check_cycle: 13, c_call_unite: 14,
  c_add_edge: 15, c_check_done: 16, c_break: 16, c_done: 17
};

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
  } catch (_) {}
  return [];
}

const EXAMPLES = {
  example1: { V: 5, edges: '[[0,1,2],[0,3,6],[1,2,3],[1,3,8],[1,4,5],[2,4,7],[3,4,9]]' },
  example2: { V: 6, edges: '[[0,1,4],[0,2,4],[1,2,2],[1,3,5],[2,3,5],[2,4,9],[3,4,4],[3,5,6],[4,5,7]]' }
};

function buildSteps(VInput, edgesStr) {
  const steps = [];
  const V = Math.max(0, Math.min(10, parseInt(VInput) || 0));
  const parsedEdges = parseWeightedEdges(edgesStr);

  // Work array for sort simulation (starts unsorted, gets sorted in-place)
  const sortWork = parsedEdges
    .filter(e => e.u >= 0 && e.u < V && e.v >= 0 && e.v < V)
    .map((e, origIdx) => ({ ...e, origIdx }));
  // Pre-computed final order (used after sort phase)
  const sortedEdges = [...sortWork].sort((a, b) => a.w - b.w)
    .map((e, idx) => ({ ...e, idx }));

  const parent = Array.from({ length: V }, (_, i) => i);
  const mstEdges = [];
  let parentAllocated = false, parentFilled = false, edgesSorted = false;
  // Sort-phase visual indices
  let sortSortI = -1, sortSortJ = -1, sortSortMinIdx = -1;
  // How many parent[] slots have been initialised so far (0 = none yet)
  let parentFilledCount = 0;

  function findIterative(start) {
    // Path-compressed find — mutates parent[], returns root
    let x = start;
    while (parent[x] !== x) x = parent[x];
    const root = x;
    let cur = start;
    while (parent[cur] !== root) { const nxt = parent[cur]; parent[cur] = root; cur = nxt; }
    return root;
  }
  function snap() {
    return {
      parentArr: [...parent], parentAllocated, parentFilled, parentFilledCount, edgesSorted,
      sortedEdges: (edgesSorted ? sortedEdges : sortWork).map(e => ({ ...e })),
      mstEdges: mstEdges.map(e => ({ ...e })),
      sortSortI, sortSortJ, sortSortMinIdx
    };
  }
  function addStep(code, badge, vars, aei, rei, apui, calcInfo, ev) {
    const e = ev || {};
    steps.push({
      badge, code, vars, V, edges: parsedEdges,
      activeEdgeIdx: aei !== undefined ? aei : -1,
      rejectedEdgeIdx: rei !== undefined ? rei : -1,
      activePUIdx: apui !== undefined ? apui : -1,
      activeU: e.u !== undefined && e.u >= 0 ? e.u : -1,
      activeV: e.v !== undefined && e.v >= 0 ? e.v : -1,
      calcInfo: calcInfo || null,
      curEdgeIndex: e.edgeIndex !== undefined ? e.edgeIndex : -1,
      curU: e.u !== undefined ? e.u : -1,
      curV: e.v !== undefined ? e.v : -1,
      curWeight: e.weight !== undefined ? e.weight : -1,
      curFindU: e.findU !== undefined ? e.findU : -1,
      curFindV: e.findV !== undefined ? e.findV : -1,
      curMstEdgeCount: e.mstEdgeCount !== undefined ? e.mstEdgeCount : 0,
      ...snap()
    });
  }
  const fv = (n, v) => [n, String(v)];
  const fn = 'kruskalMST(edges, ' + V + ')';
  const ev0 = { edgeIndex: -1, u: -1, v: -1, weight: -1, findU: -1, findV: -1, mstEdgeCount: 0 };

  if (V === 0) {
    addStep('', 'Vertices = 0. Nothing to compute.', [frame('main()', []), frame('kruskalMST()', [fv('V', 0)])]);
    return steps;
  }

  // ── Phase 1: kruskalMST entry ──────────────────────────────────────────
  addStep('c_entry',
    'kruskalMST(edges, ' + V + ') called \u2192 Starting Kruskal\u2019s MST Algorithm',
    [frame('main()', []), frame(fn, [fv('V', V), fv('E', sortWork.length)])],
    -1, -1, -1, null, ev0);

  // ── Phase 2: Call sortEdges ────────────────────────────────────────────
  addStep('c_call_sort',
    'Calling sortEdges(edges) \u2192 will selection-sort ' + sortWork.length + ' edges by weight',
    [frame('main()', []), frame(fn, [fv('E', sortWork.length)])],
    -1, -1, -1, null, ev0);

  // ── Phase 3: Inside sortEdges() — true line-by-line ───────────────────
  const n = sortWork.length;
  addStep('c_sort_decl',
    'Entered sortEdges() \u2192 selection sort on ' + n + ' edges',
    [frame('sortEdges(edges)', [fv('n', n)])],
    -1, -1, -1, null, ev0);
  if (n > 1) {
    addStep('c_sort_n', 'n = edges.length = ' + n,
      [frame('sortEdges(edges)', [fv('n', n)])], -1, -1, -1, null, ev0);
  }
  for (let si = 0; si < n - 1; si++) {
    sortSortI = si; sortSortJ = -1; sortSortMinIdx = si;
    addStep('c_sort_outer',
      'Outer loop i = ' + si + ' — pass ' + (si + 1) + ' of ' + (n - 1),
      [frame('sortEdges(edges)', [fv('i', si), fv('n', n)])],
      -1, -1, -1, null, ev0);
    let minIdx = si;
    addStep('c_sort_min_init',
      'minIdx = ' + si + ' (current minimum candidate index)',
      [frame('sortEdges(edges)', [fv('i', si), fv('minIdx', minIdx)])],
      -1, -1, -1, null, ev0);
    for (let sj = si + 1; sj < n; sj++) {
      sortSortJ = sj;
      addStep('c_sort_inner',
        'Inner loop j = ' + sj + ' — comparing with minIdx=' + minIdx,
        [frame('sortEdges(edges)', [fv('i', si), fv('j', sj), fv('minIdx', minIdx)])],
        -1, -1, -1, null, ev0);
      const smaller = sortWork[sj].w < sortWork[minIdx].w;
      sortSortMinIdx = minIdx;
      addStep('c_sort_if_cmp',
        'edges[' + sj + '].w (' + sortWork[sj].w + ') < edges[' + minIdx + '].w (' + sortWork[minIdx].w + ')? \u2192 ' + (smaller ? 'Yes' : 'No'),
        [frame('sortEdges(edges)', [fv('j', sj), fv('edges[j].w', sortWork[sj].w), fv('edges[minIdx].w', sortWork[minIdx].w), fv('smaller?', smaller)])],
        -1, -1, -1, null, ev0);
      if (smaller) {
        minIdx = sj;
        sortSortMinIdx = minIdx;
        addStep('c_sort_min_upd',
          'minIdx = ' + minIdx + ' (new minimum weight: ' + sortWork[minIdx].w + ')',
          [frame('sortEdges(edges)', [fv('minIdx', minIdx), fv('weight', sortWork[minIdx].w)])],
          -1, -1, -1, null, ev0);
      }
    }
    sortSortJ = -1;
    addStep('c_sort_if_swap',
      'minIdx (' + minIdx + ') ' + (minIdx !== si ? '!= i (' + si + ') \u2192 swap needed' : '== i (' + si + ') \u2192 already in place'),
      [frame('sortEdges(edges)', [fv('i', si), fv('minIdx', minIdx), fv('swap?', minIdx !== si)])],
      -1, -1, -1, null, ev0);
    if (minIdx !== si) {
      const t = { ...sortWork[si] };
      addStep('c_sort_swap1',
        'temp = edges[' + si + '] (' + t.u + '\u2014' + t.v + ', w:' + t.w + ')',
        [frame('sortEdges(edges)', [fv('temp.w', t.w)])],
        -1, -1, -1, null, ev0);
      sortWork[si] = { ...sortWork[minIdx] };
      addStep('c_sort_swap2',
        'edges[' + si + '] = edges[' + minIdx + '] (' + sortWork[si].u + '\u2014' + sortWork[si].v + ', w:' + sortWork[si].w + ')',
        [frame('sortEdges(edges)', [fv('edges[' + si + '].w', sortWork[si].w)])],
        -1, -1, -1, null, ev0);
      sortWork[minIdx] = t;
      addStep('c_sort_swap3',
        'edges[' + minIdx + '] = temp (' + t.u + '\u2014' + t.v + ', w:' + t.w + ') \u2014 swap done',
        [frame('sortEdges(edges)', [fv('edges[' + minIdx + '].w', t.w)])],
        -1, -1, -1, null, ev0);
    }
  }
  sortSortI = -1; sortSortJ = -1; sortSortMinIdx = -1;
  edgesSorted = true;

  // ── Phase 4: parent[] initialisation ──────────────────────────────────
  addStep('c_par_decl',
    'Declare parent[' + V + '] \u2192 Union-Find array, one slot per vertex',
    [frame(fn, [fv('V', V)])], -1, -1, -1, null, ev0);
  parentAllocated = true;
  for (let pi = 0; pi < V; pi++) {
    addStep('c_par_loop',
      'Parent init loop i = ' + pi,
      [frame(fn, [fv('i', pi)])], -1, -1, -1, null, ev0);
    parentFilledCount = pi + 1;   // mark slot pi as filled BEFORE the snap
    addStep('c_par_body',
      'parent[' + pi + '] = ' + pi + ' \u2192 vertex ' + pi + ' is its own root',
      [frame(fn, [fv('parent[' + pi + ']', pi)])], -1, -1, pi, null, ev0);
  }
  parentFilled = true;

  // ── Phase 5: Main MST loop ─────────────────────────────────────────────
  let mstEdgeCount = 0;
  addStep('c_mst_count',
    'mstEdgeCount = 0 \u2192 need ' + (V - 1) + ' edges for MST',
    [frame(fn, [fv('mstEdgeCount', 0), fv('target', V - 1)])],
    -1, -1, -1, null, { ...ev0, mstEdgeCount: 0 });

  for (let i = 0; i < sortedEdges.length; i++) {
    const edge = sortedEdges[i];
    addStep('c_outer_loop',
      'Loop iteration i = ' + i + ' \u2192 examining edge [' + i + '] (' + edge.u + '\u2014' + edge.v + ', w:' + edge.w + ')',
      [frame(fn, [fv('i', i), fv('mstEdgeCount', mstEdgeCount)])],
      i, -1, -1, null, { edgeIndex: i, u: edge.u, v: edge.v, weight: edge.w, findU: -1, findV: -1, mstEdgeCount });

    addStep('c_get_uv',
      'u = ' + edge.u + ', v = ' + edge.v + ', w = ' + edge.w,
      [frame(fn, [fv('u', edge.u), fv('v', edge.v), fv('w', edge.w)])],
      i, -1, -1, null, { edgeIndex: i, u: edge.u, v: edge.v, weight: edge.w, findU: -1, findV: -1, mstEdgeCount });

    // ── find(u) — show function body ──
    addStep('c_call_find_u',
      'Calling find(parent, ' + edge.u + ') \u2192 resolving root of vertex ' + edge.u,
      [frame(fn, [fv('u', edge.u)]), frame('find(parent,' + edge.u + ')', [])],
      i, -1, edge.u, null, { edgeIndex: i, u: edge.u, v: edge.v, weight: edge.w, findU: -1, findV: -1, mstEdgeCount });
    addStep('c_find_decl',
      'Entered find(parent, x=' + edge.u + ') \u2192 traversing to root',
      [frame(fn, [fv('u', edge.u)]), frame('find(parent,' + edge.u + ')', [fv('x', edge.u)])],
      i, -1, edge.u, null, { edgeIndex: i, u: edge.u, v: edge.v, weight: edge.w, findU: -1, findV: -1, mstEdgeCount });
    const preRootU = (function() { let x = edge.u; while (parent[x] !== x) x = parent[x]; return x; })();
    addStep('c_find_if',
      'parent[' + edge.u + '] = ' + parent[edge.u] + (parent[edge.u] !== edge.u ? ' \u2260 ' + edge.u + ' \u2192 compress path' : ' = ' + edge.u + ' \u2192 already root'),
      [frame('find(parent,' + edge.u + ')', [fv('x', edge.u), fv('parent[x]', parent[edge.u])])],
      i, -1, edge.u, null, { edgeIndex: i, u: edge.u, v: edge.v, weight: edge.w, findU: preRootU, findV: -1, mstEdgeCount });
    if (parent[edge.u] !== edge.u) {
      addStep('c_find_compress',
        'parent[' + edge.u + '] compressed \u2192 root = ' + preRootU,
        [frame('find(parent,' + edge.u + ')', [fv('parent[' + edge.u + ']', preRootU)])],
        i, -1, edge.u, null, { edgeIndex: i, u: edge.u, v: edge.v, weight: edge.w, findU: preRootU, findV: -1, mstEdgeCount });
    }
    const rootU = findIterative(edge.u);
    addStep('c_find_ret',
      'find(' + edge.u + ') returns ' + rootU + ' \u2192 returning to kruskalMST',
      [frame(fn, [fv('rootU', rootU)])],
      i, -1, edge.u, null, { edgeIndex: i, u: edge.u, v: edge.v, weight: edge.w, findU: rootU, findV: -1, mstEdgeCount });

    // ── find(v) — show function body ──
    addStep('c_call_find_v',
      'Calling find(parent, ' + edge.v + ') \u2192 resolving root of vertex ' + edge.v,
      [frame(fn, [fv('v', edge.v)]), frame('find(parent,' + edge.v + ')', [])],
      i, -1, edge.v, null, { edgeIndex: i, u: edge.u, v: edge.v, weight: edge.w, findU: rootU, findV: -1, mstEdgeCount });
    addStep('c_find_decl',
      'Entered find(parent, x=' + edge.v + ') \u2192 traversing to root',
      [frame(fn, [fv('v', edge.v)]), frame('find(parent,' + edge.v + ')', [fv('x', edge.v)])],
      i, -1, edge.v, null, { edgeIndex: i, u: edge.u, v: edge.v, weight: edge.w, findU: rootU, findV: -1, mstEdgeCount });
    const preRootV = (function() { let x = edge.v; while (parent[x] !== x) x = parent[x]; return x; })();
    addStep('c_find_if',
      'parent[' + edge.v + '] = ' + parent[edge.v] + (parent[edge.v] !== edge.v ? ' \u2260 ' + edge.v + ' \u2192 compress path' : ' = ' + edge.v + ' \u2192 already root'),
      [frame('find(parent,' + edge.v + ')', [fv('x', edge.v), fv('parent[x]', parent[edge.v])])],
      i, -1, edge.v, null, { edgeIndex: i, u: edge.u, v: edge.v, weight: edge.w, findU: rootU, findV: preRootV, mstEdgeCount });
    if (parent[edge.v] !== edge.v) {
      addStep('c_find_compress',
        'parent[' + edge.v + '] compressed \u2192 root = ' + preRootV,
        [frame('find(parent,' + edge.v + ')', [fv('parent[' + edge.v + ']', preRootV)])],
        i, -1, edge.v, null, { edgeIndex: i, u: edge.u, v: edge.v, weight: edge.w, findU: rootU, findV: preRootV, mstEdgeCount });
    }
    const rootV = findIterative(edge.v);
    addStep('c_find_ret',
      'find(' + edge.v + ') returns ' + rootV + ' \u2192 returning to kruskalMST',
      [frame(fn, [fv('rootV', rootV)])],
      i, -1, edge.v, null, { edgeIndex: i, u: edge.u, v: edge.v, weight: edge.w, findU: rootU, findV: rootV, mstEdgeCount });

    // ── cycle check ──
    const isCycle = rootU === rootV;
    addStep('c_check_cycle',
      'rootU (' + rootU + ') ' + (isCycle ? '==' : '!=') + ' rootV (' + rootV + ') \u2192 ' +
        (isCycle
          ? '\u26A0 CYCLE \u2014 skip edge (' + edge.u + '\u2014' + edge.v + ')'
          : '\u2713 No cycle \u2014 add edge (' + edge.u + '\u2014' + edge.v + ', w:' + edge.w + ')'),
      [frame(fn, [fv('rootU', rootU), fv('rootV', rootV), fv('cycle?', isCycle)])],
      i, isCycle ? i : -1, -1,
      { type: isCycle ? 'cycle' : 'accept', u: edge.u, v: edge.v, w: edge.w, rootU, rootV },
      { edgeIndex: i, u: edge.u, v: edge.v, weight: edge.w, findU: rootU, findV: rootV, mstEdgeCount });

    if (!isCycle) {
      // ── unite — show function body ──
      addStep('c_call_unite',
        'Calling unite(parent, ' + edge.u + ', ' + edge.v + ') \u2192 merging components',
        [frame(fn, [fv('u', edge.u), fv('v', edge.v)]), frame('unite(parent,' + edge.u + ',' + edge.v + ')', [])],
        i, -1, -1, null, { edgeIndex: i, u: edge.u, v: edge.v, weight: edge.w, findU: rootU, findV: rootV, mstEdgeCount });
      addStep('c_unite_decl',
        'Entered unite(parent, x=' + edge.u + ', y=' + edge.v + ')',
        [frame('unite(parent,' + edge.u + ',' + edge.v + ')', [fv('x', edge.u), fv('y', edge.v)])],
        i, -1, -1, null, { edgeIndex: i, u: edge.u, v: edge.v, weight: edge.w, findU: rootU, findV: rootV, mstEdgeCount });
      addStep('c_unite_rx',
        'rx = find(' + edge.u + ') = ' + rootU,
        [frame('unite(parent,' + edge.u + ',' + edge.v + ')', [fv('rx', rootU)])],
        i, -1, edge.u, null, { edgeIndex: i, u: edge.u, v: edge.v, weight: edge.w, findU: rootU, findV: rootV, mstEdgeCount });
      addStep('c_unite_ry',
        'ry = find(' + edge.v + ') = ' + rootV,
        [frame('unite(parent,' + edge.u + ',' + edge.v + ')', [fv('ry', rootV)])],
        i, -1, edge.v, null, { edgeIndex: i, u: edge.u, v: edge.v, weight: edge.w, findU: rootU, findV: rootV, mstEdgeCount });
      addStep('c_unite_if',
        'rx (' + rootU + ') != ry (' + rootV + ') \u2192 merging: parent[' + rootV + '] = ' + rootU,
        [frame('unite(parent,' + edge.u + ',' + edge.v + ')', [fv('rx', rootU), fv('ry', rootV)])],
        i, -1, rootV, null, { edgeIndex: i, u: edge.u, v: edge.v, weight: edge.w, findU: rootU, findV: rootV, mstEdgeCount });
      parent[rootV] = rootU;
      addStep('c_unite_set',
        'parent[' + rootV + '] = ' + rootU + ' \u2014 components of ' + edge.u + ' & ' + edge.v + ' are now merged',
        [frame('unite(parent,' + edge.u + ',' + edge.v + ')', [fv('parent[' + rootV + ']', rootU), fv('parent', '[' + parent.join(',') + ']')])],
        i, -1, rootV, { type: 'union', u: edge.u, v: edge.v, rootU, rootV },
        { edgeIndex: i, u: edge.u, v: edge.v, weight: edge.w, findU: rootU, findV: rootV, mstEdgeCount });

      mstEdgeCount++;
      mstEdges.push({ u: edge.u, v: edge.v, w: edge.w, idx: i });
      addStep('c_add_edge',
        'mstEdgeCount++ \u2192 edge (' + edge.u + '\u2014' + edge.v + ', w:' + edge.w + ') added! mstEdgeCount = ' + mstEdgeCount,
        [frame(fn, [fv('mstEdgeCount', mstEdgeCount)])],
        i, -1, -1, { type: 'added', u: edge.u, v: edge.v, w: edge.w, mstEdgeCount },
        { edgeIndex: i, u: edge.u, v: edge.v, weight: edge.w, findU: rootU, findV: rootU, mstEdgeCount });

      const isDone = mstEdgeCount === V - 1;
      addStep('c_check_done',
        'mstEdgeCount (' + mstEdgeCount + ') ' +
          (isDone ? '== V\u22121 (' + (V-1) + ') \u2192 \u2705 MST complete!' : '< V\u22121 (' + (V-1) + ') \u2192 continue'),
        [frame(fn, [fv('mstEdgeCount', mstEdgeCount), fv('V-1', V-1)])],
        i, -1, -1, { type: 'check_done', isDone },
        { edgeIndex: i, u: edge.u, v: edge.v, weight: edge.w, findU: rootU, findV: rootU, mstEdgeCount });
      if (isDone) {
        addStep('c_break',
          'break \u2192 MST complete with ' + mstEdgeCount + ' edges, exiting loop',
          [frame(fn, [fv('mstEdgeCount', mstEdgeCount)])],
          i, -1, -1, { type: 'done' },
          { edgeIndex: i, u: edge.u, v: edge.v, weight: edge.w, findU: rootU, findV: rootU, mstEdgeCount });
        break;
      }
    }
  }

  const totalWeight = mstEdges.reduce((acc, e) => acc + e.w, 0);
  const edgesStr2 = mstEdges.map(e => '(' + e.u + '\u2014' + e.v + ', w:' + e.w + ')').join(', ');
  addStep('c_done',
    'return \u2192 MST complete: [' + edgesStr2 + '] \u2192 Total weight: ' + totalWeight,
    [frame(fn, [fv('MST_Edges', mstEdges.length), fv('Total_Weight', totalWeight)])],
    -1, -1, -1, { type: 'done', totalWeight, edgeCount: mstEdges.length },
    { edgeIndex: -1, u: -1, v: -1, weight: -1, findU: -1, findV: -1, mstEdgeCount });

  return steps;
}

const DEFAULT_V = EXAMPLES.example1.V;
const DEFAULT_EDGES = EXAMPLES.example1.edges;
const numVInput = ref(DEFAULT_V);
const edgesInputStr = ref(DEFAULT_EDGES);
const exampleId = ref('example1');
const lang = ref('java');
const speed = ref(650);
const si = ref(0);
const playing = ref(false);
const vizHeight = ref(340);
const tableHeight = ref(60);
const leftWidth = ref(58);
const rightTab = ref('code');
const showGraphModal = ref(false);
const hoveredEdge = ref(null);
const hoveredNode = ref(null);

const stepsData = reactive({ steps: buildSteps(DEFAULT_V, DEFAULT_EDGES) });
const steps = computed(() => stepsData.steps);
const s = computed(() => steps.value[Math.max(0, Math.min(si.value, steps.value.length - 1))] || {});
const codeLines = computed(() => CODES[lang.value] || []);

const modalNodePositions = computed(() => {
  const V = s.value.V ?? 0;
  if (V <= 0) return [];
  const cx = 360, cy = 230;
  const r = V <= 4 ? 145 : (V <= 6 ? 168 : 185);
  return Array.from({ length: V }, (_, i) => {
    const angle = (2 * Math.PI * i) / V - Math.PI / 2;
    return { id: i, x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });
});

function getEdgeGeo(edge) {
  const pos = modalNodePositions.value;
  const u = pos[edge.u], v = pos[edge.v];
  if (!u || !v) return { pathD: '', labelX: 0, labelY: 0 };
  const dx = v.x - u.x, dy = v.y - u.y;
  const dist = Math.hypot(dx, dy) || 1;
  const ux = dx / dist, uy = dy / dist;
  const sx = u.x + ux * 20, sy = u.y + uy * 20;
  const ex = v.x - ux * 20, ey = v.y - uy * 20;
  return { pathD: `M ${sx} ${sy} L ${ex} ${ey}`, labelX: (sx + ex) / 2, labelY: (sy + ey) / 2 };
}
function isEdgeHovered(u, v) {
  return hoveredEdge.value && ((hoveredEdge.value.u === u && hoveredEdge.value.v === v) || (hoveredEdge.value.u === v && hoveredEdge.value.v === u));
}
function isMstEdge(u, v) {
  return (s.value.mstEdges || []).some(e => (e.u === u && e.v === v) || (e.u === v && e.v === u));
}
function isActiveEdge(u, v) {
  const au = s.value.activeU, av = s.value.activeV;
  return (u === au && v === av) || (u === av && v === au);
}
function isRejectedGraphEdge(u, v) {
  const ci = s.value.calcInfo;
  if (!ci || ci.type !== 'cycle') return false;
  return (u === ci.u && v === ci.v) || (u === ci.v && v === ci.u);
}
function isNodeInMST(id) {
  return (s.value.mstEdges || []).some(e => e.u === id || e.v === id);
}
function isNodeHoveredEdge(id) {
  return hoveredEdge.value && (hoveredEdge.value.u === id || hoveredEdge.value.v === id);
}

let playTimer = null;
function applySetup() {
  const rawV = parseInt(numVInput.value);
  const vCount = isNaN(rawV) || rawV < 0 ? 0 : Math.min(10, rawV);
  playing.value = false; clearTimeout(playTimer);
  stepsData.steps = buildSteps(vCount, edgesInputStr.value); si.value = 0;
}
function loadExample() {
  const ex = EXAMPLES[exampleId.value]; if (!ex) return;
  numVInput.value = ex.V; edgesInputStr.value = ex.edges; applySetup();
}
function stepBy(d) { si.value = Math.max(0, Math.min(steps.value.length - 1, si.value + d)); }
function togglePlay() {
  const next = !playing.value;
  if (next && si.value >= steps.value.length - 1) si.value = 0;
  playing.value = next;
}
function tick() {
  clearTimeout(playTimer); if (!playing.value) return;
  if (si.value >= steps.value.length - 1) { playing.value = false; return; }
  playTimer = setTimeout(() => { si.value = Math.min(steps.value.length - 1, si.value + 1); tick(); }, 2100 - speed.value);
}
watch(playing, v => { if (v) tick(); else clearTimeout(playTimer); });
function onKeydown(e) {
  const tag = e.target.tagName;
  if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
  if (e.key === 'ArrowRight') stepBy(1);
  if (e.key === 'ArrowLeft') stepBy(-1);
  if (e.key === ' ') { e.preventDefault(); togglePlay(); }
}

const mainRef = ref(null), leftColRef = ref(null), hResizerRef = ref(null);
const vizResizerRef = ref(null), tableResizerRef = ref(null);
function initHResizer() {
  const rsz = hResizerRef.value, main = mainRef.value; if (!rsz || !main) return;
  let dragging = false, startX = 0, startW = 0;
  const onDown = e => { dragging = true; startX = e.clientX; startW = leftColRef.value.offsetWidth; rsz.classList.add('drag'); document.body.style.userSelect = 'none'; };
  const onMove = e => { if (!dragging) return; leftWidth.value = (Math.max(200, Math.min(main.offsetWidth - 200, startW + e.clientX - startX)) / main.offsetWidth) * 100; };
  const onUp = () => { if (!dragging) return; dragging = false; rsz.classList.remove('drag'); document.body.style.userSelect = ''; };
  rsz.addEventListener('mousedown', onDown); document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', onUp);
  return () => { rsz.removeEventListener('mousedown', onDown); document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
}
function initVResizer(elRef, valueRef, minH, maxH) {
  const rsz = elRef.value; if (!rsz) return;
  let dragging = false, startY = 0, startH = 0;
  const onDown = e => { dragging = true; startY = e.clientY; startH = valueRef.value; rsz.classList.add('drag'); document.body.style.userSelect = 'none'; e.preventDefault(); };
  const onMove = e => { if (!dragging) return; valueRef.value = Math.max(minH, Math.min(maxH, startH + (e.clientY - startY))); };
  const onUp = () => { if (!dragging) return; dragging = false; rsz.classList.remove('drag'); document.body.style.userSelect = ''; };
  rsz.addEventListener('mousedown', onDown); document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', onUp);
  return () => { rsz.removeEventListener('mousedown', onDown); document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
}
let cleanupFns = [];
onMounted(() => {
  document.addEventListener('keydown', onKeydown);
  cleanupFns.push(initHResizer());
  cleanupFns.push(initVResizer(vizResizerRef, vizHeight, 240, 600));
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
          <div class="ll-toolbar">
            <label>Vertices</label>
            <input type="number" v-model.number="numVInput" min="0" max="10" style="width:45px;" class="ll-text-input" @change="applySetup" @keyup.enter="applySetup" />
            <span class="ll-divider">|</span>
            <label>Edges</label>
            <input type="text" v-model="edgesInputStr" style="width:200px;" class="ll-text-input" placeholder="e.g. [[0,1,2],[1,2,3]]" @keyup.enter="applySetup" />
            <!-- <span class="ll-divider">|</span> -->
            <!-- <label>Example</label>
            <select v-model="exampleId" class="ll-lang-select" style="min-width:100px;margin-left:0;" @change="loadExample">
              <option value="example1">Example 1 (5V)</option>
              <option value="example2">Example 2 (6V)</option>
            </select> -->
            <button class="ll-viz-btn" @click="applySetup" title="Run Kruskal's Algorithm">&#9654;</button>
            <button class="ll-graph-modal-btn" @click="showGraphModal = !showGraphModal">{{ showGraphModal ? 'Hide' : 'Show' }} Graph</button>
            <div class="ll-nav-controls">
              <button class="ll-nav-btn" title="First" @click="stepBy(-steps.length)">&#171;</button>
              <button class="ll-nav-btn" @click="stepBy(-1)">&#8249; Prev</button>
              <button class="ll-play-btn" @click="togglePlay">{{ playing ? '\u23F8 Pause' : '\u25B6 Play' }}</button>
              <button class="ll-nav-btn" @click="stepBy(1)">Next &#8250;</button>
              <button class="ll-nav-btn" title="Last" @click="stepBy(steps.length)">&#187;</button>
            </div>
          </div>

          <div class="ll-main" ref="mainRef">
            <div class="ll-left-col" ref="leftColRef" :style="{ width: leftWidth + '%' }">
              <div class="ll-viz-wrap" :style="{ height: vizHeight + 'px' }">
                <div class="ll-perm-area">
                  <div v-if="(s.V ?? 0) === 0" class="ll-empty-matrix-msg">
                    No graph (Vertices = 0). Set Vertices &gt; 0 with edges like [[0,1,2],[1,2,3],[0,3,6]].
                  </div>
                  <template v-else>
                    <div class="ll-section-wrap">
                      <div class="ll-ptrs">
                        <!-- Sort-phase variables -->
                        <template v-if="!s.edgesSorted">
                          <div class="ll-ptr-chip ll-chip-sort">i = <b class="ll-c-orange">{{ s.sortSortI >= 0 ? s.sortSortI : '-' }}</b></div>
                          <div class="ll-ptr-chip ll-chip-sort">j = <b class="ll-c-blue">{{ s.sortSortJ >= 0 ? s.sortSortJ : '-' }}</b></div>
                          <div class="ll-ptr-chip ll-chip-sort">minIdx = <b class="ll-c-green">{{ s.sortSortMinIdx >= 0 ? s.sortSortMinIdx : '-' }}</b></div>
                        </template>
                        <!-- Main-loop variables -->
                        <template v-else>
                          <div class="ll-ptr-chip">edgeIndex = <b class="ll-c-orange">{{ s.curEdgeIndex >= 0 ? s.curEdgeIndex : '-' }}</b></div>
                          <div class="ll-ptr-chip">u = <b class="ll-c-orange">{{ s.curU >= 0 ? s.curU : '-' }}</b></div>
                          <div class="ll-ptr-chip">v = <b class="ll-c-purple">{{ s.curV >= 0 ? s.curV : '-' }}</b></div>
                          <div class="ll-ptr-chip">weight = <b class="ll-c-blue">{{ s.curWeight >= 0 ? s.curWeight : '-' }}</b></div>
                          <div class="ll-ptr-chip">find(u) = <b class="ll-c-orange">{{ s.curFindU >= 0 ? s.curFindU : '-' }}</b></div>
                          <div class="ll-ptr-chip">find(v) = <b class="ll-c-purple">{{ s.curFindV >= 0 ? s.curFindV : '-' }}</b></div>
                        </template>
                        <!-- Always visible -->
                        <div class="ll-ptr-chip">mstEdgeCount = <b class="ll-c-green">{{ s.curMstEdgeCount !== undefined ? s.curMstEdgeCount : 0 }}</b></div>
                        <div class="ll-ptr-chip">V = <b class="ll-c-green">{{ s.V ?? 0 }}</b></div>
                      </div>
                    </div>

                    <div class="ll-section-wrap">
                      <div class="ll-section-title">
                        <template v-if="!s.edgesSorted">sortEdges() — selection sort in progress ({{ s.sortedEdges ? s.sortedEdges.length : 0 }} edges):</template>
                        <template v-else>Sorted Edges (by weight) &mdash; Examining in ascending weight order:</template>
                      </div>
                      <div class="ll-vis-track ll-edge-vis-track">
                        <div v-for="(edge, idx) in s.sortedEdges" :key="'se-' + idx" class="ll-edge-unit"
                          :class="{
                            /* ── Sort: whole-unit states ──
                               Suppress when doing weight comparison (c_sort_if_cmp / c_sort_inner)
                               so that only the weight sub-cells glow, not the whole border. */
                            'll-edge-unit-sort-i':   !s.edgesSorted && idx === s.sortSortI
                                                     && s.code !== 'c_sort_if_cmp' && s.code !== 'c_sort_inner',
                            'll-edge-unit-sort-j':   !s.edgesSorted && idx === s.sortSortJ && idx !== s.sortSortI
                                                     && s.code !== 'c_sort_if_cmp',
                            'll-edge-unit-sort-min': !s.edgesSorted && idx === s.sortSortMinIdx
                                                     && idx !== s.sortSortI && idx !== s.sortSortJ
                                                     && s.code !== 'c_sort_if_cmp' && s.code !== 'c_sort_inner',
                            /* ── MST: whole-unit states ──
                               Suppress on get-uv / find steps — those use sub-cell precision. */
                            'll-edge-unit-rejected': s.edgesSorted && idx === s.rejectedEdgeIdx,
                            'll-edge-unit-active':   s.edgesSorted && idx === s.activeEdgeIdx
                                                     && idx !== s.rejectedEdgeIdx
                                                     && !(s.mstEdges && s.mstEdges.some(e => e.idx === idx))
                                                     && s.code !== 'c_get_uv'
                                                     && s.code !== 'c_call_find_u' && s.code !== 'c_call_find_v'
                                                     && s.code !== 'c_find_decl'   && s.code !== 'c_find_if'
                                                     && s.code !== 'c_find_compress' && s.code !== 'c_find_ret',
                            'll-edge-unit-accepted': s.edgesSorted && s.mstEdges && s.mstEdges.some(e => e.idx === idx)
                          }">
                          <!-- Edge index label above the group -->
                          <span class="ll-edge-unit-top-idx">edges[{{ idx }}]</span>
                          <!-- 3 sub-cells: source / dest / weight -->
                          <div class="ll-edge-subcells">
                            <!-- Sub-cell 0: Source vertex — edges[i][0] -->
                            <div class="ll-edge-sub"
                              :class="{
                                /* MST only: u = edges[i][0]
                                   Glow on get-uv (all 3 read) and on find-u steps */
                                'll-edge-sub-hl-src':
                                  s.edgesSorted && idx === s.activeEdgeIdx
                                  && (s.code === 'c_get_uv'
                                      || s.code === 'c_call_find_u'
                                      || (s.code === 'c_find_decl'    && s.activePUIdx === s.curU)
                                      || (s.code === 'c_find_if'      && s.activePUIdx === s.curU)
                                      || (s.code === 'c_find_compress' && s.activePUIdx === s.curU)
                                      || (s.code === 'c_find_ret'      && s.activePUIdx === s.curU)),
                              }">
                              <span class="ll-edge-sub-val">{{ edge.u }}</span>
                              <span class="ll-edge-sub-idx">0</span>
                            </div>
                            <!-- Sub-cell 1: Destination vertex — edges[i][1] -->
                            <div class="ll-edge-sub"
                              :class="{
                                /* MST only: v = edges[i][1]
                                   Glow on get-uv and on find-v steps */
                                'll-edge-sub-hl-dst':
                                  s.edgesSorted && idx === s.activeEdgeIdx
                                  && (s.code === 'c_get_uv'
                                      || s.code === 'c_call_find_v'
                                      || (s.code === 'c_find_decl'     && s.activePUIdx === s.curV)
                                      || (s.code === 'c_find_if'       && s.activePUIdx === s.curV)
                                      || (s.code === 'c_find_compress'  && s.activePUIdx === s.curV)
                                      || (s.code === 'c_find_ret'       && s.activePUIdx === s.curV)),
                              }">
                              <span class="ll-edge-sub-val">{{ edge.v }}</span>
                              <span class="ll-edge-sub-idx">1</span>
                            </div>
                            <!-- Sub-cell 2: Weight — edges[i][2] / edges[j][2] / edges[minIdx][2] -->
                            <div class="ll-edge-sub ll-edge-sub-weight"
                              :class="{
                                /* Sort: edges[j][2] < edges[minIdx][2]
                                   Glow ONLY weight of j and minIdx on if-cmp and inner-loop steps */
                                'll-edge-sub-hl-w':
                                  (!s.edgesSorted
                                    && (idx === s.sortSortJ || idx === s.sortSortMinIdx)
                                    && (s.code === 'c_sort_if_cmp' || s.code === 'c_sort_inner'))
                                  /* MST: w = edges[i][2]  →  only on c_get_uv */
                                  || (s.edgesSorted && idx === s.activeEdgeIdx && s.code === 'c_get_uv'),
                              }">
                              <span class="ll-edge-sub-val ll-edge-sub-val-w">{{ edge.w }}</span>
                              <span class="ll-edge-sub-idx">2</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="ll-section-wrap">
                      <div class="ll-section-title">parent[] &mdash; Union-Find: component representative for each vertex:</div>
                      <div class="ll-vis-track">
                        <template v-if="!s.parentAllocated">
                          <span class="ll-arr-unalloc">not yet allocated</span>
                        </template>
                        <template v-else>
                          <div v-for="vIdx in s.V" :key="'par-' + (vIdx-1)" class="ll-vis-item"
                            :class="{
                              /* slot is filled if parentFilled (whole loop done) OR
                                 parentFilledCount already covers this index           */
                              'll-uf-root':  s.parentArr && (s.parentFilled || (vIdx-1) < s.parentFilledCount) && s.parentArr[vIdx-1] === (vIdx-1),
                              'll-uf-child': s.parentArr && (s.parentFilled || (vIdx-1) < s.parentFilledCount) && s.parentArr[vIdx-1] !== (vIdx-1),
                              'll-vis-active': (vIdx-1) === s.activePUIdx
                            }">
                            <span class="ll-vis-idx">parent[{{ vIdx-1 }}]</span>
                            <!-- show value if this slot has been filled, else '?' -->
                            <span class="ll-vis-val">
                              {{ (s.parentFilled || (vIdx-1) < s.parentFilledCount)
                                  ? (s.parentArr ? s.parentArr[vIdx-1] : '?')
                                  : '?' }}
                            </span>
                          </div>
                        </template>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
              <div class="ll-vresizer" ref="vizResizerRef"></div>

              <div class="ll-legend">
                <span class="ll-leg"><span class="ll-legdot ll-legdot-unvis"></span>unexamined</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-active"></span>examining (u)</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-nbr"></span>endpoint (v)</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-visited"></span>in MST</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-path"></span>MST edge</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-rejected"></span>rejected (cycle)</span>
              </div>

              <div class="ll-table-area" :style="{ height: tableHeight + 'px' }">
                <div class="ll-table-title">Variable frames &mdash; innermost = current</div>
                <div class="ll-stack-line">
                  <template v-if="s.vars && s.vars.length">
                    <div v-for="(f, depth) in s.vars" :key="depth" class="ll-frame"
                      :class="{ 'll-frame-cur': depth === s.vars.length - 1 }"
                      :style="{ marginLeft: depth * 14 + 'px' }">
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
                  </select>
                </div>
                <div v-if="rightTab === 'code'" class="ll-code-scroll">
                  <pre class="ll-pre"><span v-for="(line, i) in codeLines" :key="i" class="ll-codeline" :class="{ 'll-hl': line[0] && line[0] === s.code }">{{ line[1] === '' ? ' ' : line[1] }}</span></pre>
                </div>
                <div v-else-if="rightTab === 'pseudo'" class="ll-code-scroll">
                  <pre class="ll-pre"><span v-for="(line, i) in PSEUDOCODE" :key="i" class="ll-codeline" :class="{ 'll-hl': PSEUDOCODE_MAP[s.code] === i }">{{ line }}</span></pre>
                </div>
                <div v-else class="ll-info-scroll">
                  <h3>What is Kruskal's Algorithm?</h3>
                  <p><b>Kruskal's Algorithm</b> is a greedy algorithm that builds a <b>Minimum Spanning Tree (MST)</b> for a connected, weighted, undirected graph by repeatedly adding the <b>smallest available edge</b> that does not form a cycle. It uses a <b>Disjoint Set Union (Union-Find)</b> data structure with path compression to efficiently detect cycles.</p>
                  <h3>Time &amp; Space Complexity</h3>
                  <table class="ll-complexity-table">
                    <thead><tr><th>Operation</th><th>Time</th><th>Space</th><th>Notes</th></tr></thead>
                    <tbody>
                      <tr><td><b>Sort Edges</b></td><td><b>O(E log E)</b></td><td><b>O(E)</b></td><td>Dominates overall runtime</td></tr>
                      <tr><td><b>Union-Find (path compression)</b></td><td><b>O(E &middot; &alpha;(V))</b></td><td><b>O(V)</b></td><td>&alpha; is inverse Ackermann (nearly constant)</td></tr>
                      <tr><td><b>Total</b></td><td><b>O(E log E)</b></td><td><b>O(V + E)</b></td><td>Efficient for sparse graphs</td></tr>
                    </tbody>
                  </table>
                  <h3>Kruskal's vs. Prim's Algorithm</h3>
                  <p class="ll-note"><b>Kruskal's (this component):</b> Edge-centric. Sorts all edges globally; repeatedly adds the cheapest edge that doesn't form a cycle. Works well on <b>sparse graphs</b>. Uses Union-Find to track components.</p>
                  <p class="ll-note" style="margin-top:8px;"><b>Prim's Algorithm:</b> Vertex-centric. Grows a single tree from a chosen root, always connecting the cheapest reachable unvisited vertex. Works well on <b>dense graphs</b>. Uses linear scan O(V&sup2;) or priority queue O(E log V).</p>
                  <p class="ll-note" style="margin-top:8px;">Both algorithms always produce an MST with the same total weight but use fundamentally different strategies.</p>
                  <h3>Applications</h3>
                  <p>Network design (fiber, roads, pipelines), cluster analysis, image segmentation, VLSI circuit design, approximation algorithms for Traveling Salesperson Problem.</p>
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

    <div v-if="showGraphModal" class="graph-modal-backdrop" @click.self="showGraphModal = false">
      <div class="graph-modal-card">
        <div class="graph-modal-header">
          <div class="graph-modal-title">
            <span>Kruskal's MST Graph View</span>
            <span class="graph-subtitle">(Undirected Weighted Graph &amp; Growing Minimum Spanning Tree)</span>
          </div>
          <button class="graph-close-btn" @click="showGraphModal = false">&times;</button>
        </div>
        <div class="graph-modal-body">
          <div v-if="(s.V ?? 0) === 0" class="ll-empty-graph-msg">No vertices to display.</div>
          <svg v-else class="graph-modal-svg" viewBox="0 -25 720 510">
            <g v-for="edge in s.edges" :key="'me-' + edge.u + '-' + edge.v"
              @mouseenter="hoveredEdge = { u: edge.u, v: edge.v }" @mouseleave="hoveredEdge = null" style="cursor:pointer;">
              <path :d="getEdgeGeo(edge).pathD" fill="none" stroke="transparent" stroke-width="18" stroke-linecap="round"/>
              <path :d="getEdgeGeo(edge).pathD" fill="none" class="ll-edge-line"
                :class="{
                  'll-edge-rejected-graph': isRejectedGraphEdge(edge.u, edge.v),
                  'll-edge-active': isActiveEdge(edge.u, edge.v) && !isRejectedGraphEdge(edge.u, edge.v),
                  'll-edge-tree': isMstEdge(edge.u, edge.v) && !isActiveEdge(edge.u, edge.v) && !isRejectedGraphEdge(edge.u, edge.v),
                  'll-edge-hovered': isEdgeHovered(edge.u, edge.v) && !isRejectedGraphEdge(edge.u, edge.v)
                }"/>
              <rect :x="getEdgeGeo(edge).labelX - 11" :y="getEdgeGeo(edge).labelY - 9" width="22" height="16" rx="4"
                class="ll-wlabel-bg" :class="{
                  'll-wlabel-bg-rejected': isRejectedGraphEdge(edge.u, edge.v),
                  'll-wlabel-bg-active': isActiveEdge(edge.u, edge.v) && !isRejectedGraphEdge(edge.u, edge.v),
                  'll-wlabel-bg-tree': isMstEdge(edge.u, edge.v) && !isActiveEdge(edge.u, edge.v) && !isRejectedGraphEdge(edge.u, edge.v)
                }"/>
              <text :x="getEdgeGeo(edge).labelX" :y="getEdgeGeo(edge).labelY + 4" class="ll-weight-label"
                :class="{
                  'll-wlabel-rejected': isRejectedGraphEdge(edge.u, edge.v),
                  'll-wlabel-active': isActiveEdge(edge.u, edge.v) && !isRejectedGraphEdge(edge.u, edge.v),
                  'll-wlabel-tree': isMstEdge(edge.u, edge.v) && !isActiveEdge(edge.u, edge.v) && !isRejectedGraphEdge(edge.u, edge.v)
                }">{{ edge.w }}</text>
            </g>
            <g v-for="node in modalNodePositions" :key="'mn-' + node.id"
              @mouseenter="hoveredNode = node.id" @mouseleave="hoveredNode = null" style="cursor:pointer;">
              
              <circle :cx="node.x" :cy="node.y" r="20" class="ll-node-circle"
                :class="{
                  'll-node-u': node.id === s.activeU && !isRejectedGraphEdge(s.activeU, s.activeV),
                  'll-node-v': node.id === s.activeV && node.id !== s.activeU && !isRejectedGraphEdge(s.activeU, s.activeV),
                  'll-node-reject': (node.id === s.activeU || node.id === s.activeV) && isRejectedGraphEdge(s.activeU, s.activeV),
                  'll-node-visited': isNodeInMST(node.id) && node.id !== s.activeU && node.id !== s.activeV,
                  'll-node-hover-src': isNodeHoveredEdge(node.id)
                }"/>
              <text :x="node.x" :y="node.y + 5" class="ll-node-text" :class="{ 'll-node-text-hover-src': isNodeHoveredEdge(node.id) }" style="font-size:15px;">{{ node.id }}</text>
            </g>
          </svg>
          <div v-if="s.mstEdges && s.mstEdges.length > 0" class="graph-mst-summary">
            <span class="graph-mst-label">MST Edges:</span>
            <span v-for="(e, i) in s.mstEdges" :key="i" class="graph-mst-edge">({{ e.u }}&mdash;{{ e.v }}, w:{{ e.w }})</span>
            <span class="graph-mst-total">Total Weight: <b>{{ s.mstEdges.reduce((a, e) => a + e.w, 0) }}</b></span>
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
.row-main { width: 100%; height: 90%; margin-top: 37px; overflow-x: auto; overflow-y: auto; scrollbar-width: none; -ms-overflow-style: none; }
.row-main::-webkit-scrollbar { display: none; width: 0; height: 0; }
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
.ll-viz-wrap { padding: 12px 12px 18px; overflow-x: auto; overflow-y: auto; background: var(--surface); border-bottom: 1px solid var(--border); scrollbar-width: none; -ms-overflow-style: none; }
.ll-viz-wrap::-webkit-scrollbar { display: none; width: 0; height: 0; }
.ll-perm-area { display: flex; flex-direction: column; gap: 12px; min-width: 0; overflow-x: visible; overflow-y: visible; }
.ll-section-wrap { display: flex; flex-direction: column; gap: 4px; overflow: visible; }
.ll-section-title { font-size: 11px; font-weight: 700; color: var(--text2); font-family: monospace; }
.ll-ptrs { display: flex; gap: 8px; flex-wrap: wrap; padding: 2px 0; min-height: 32px; overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none; }
.ll-ptrs::-webkit-scrollbar { display: none; width: 0; height: 0; }
.ll-ptr-chip { background: var(--surface2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 4px 10px; font-size: 12px; font-family: monospace; box-shadow: var(--shadow-sm); white-space: nowrap; flex-shrink: 0; transition: all 0.2s ease; }
.ll-vis-track { display: flex; gap: 8px; flex-wrap: wrap; overflow-x: auto; padding: 6px 4px 8px; scrollbar-width: none; -ms-overflow-style: none; }
.ll-vis-track::-webkit-scrollbar { display: none; width: 0; height: 0; }
.ll-vis-item {
  display: flex; flex-direction: column; align-items: center;
  padding: 4px 6px; background: var(--surface);
  /* Always 2px border — only color changes, no width change = no layout shift */
  border: 2px solid var(--border); border-radius: var(--radius-sm);
  font-family: monospace; min-width: 64px;
  transition: background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, color 0.18s ease;
}
.ll-vis-idx { font-size: 10px; color: var(--muted); }
.ll-vis-val { font-size: 12px; font-weight: 700; color: var(--muted); }
/* ── Sorted-edges: outer track ─────────────────────────────────────────── */
.ll-edge-vis-track { padding: 6px 4px 10px; overflow-x: visible; overflow-y: visible; flex-wrap: wrap; align-items: flex-start; }

/* ── Grouped edge unit ──────────────────────────────────────────────────── */
.ll-edge-unit {
  display: flex; flex-direction: column; align-items: center;
  gap: 3px; padding: 5px;
  background: var(--surface);
  /* Always 2px — only color changes on highlight, no width change = no layout shift */
  border: 2px solid var(--border2);
  border-radius: var(--radius-sm); font-family: monospace;
  min-width: 80px; flex-shrink: 0;
  /* Transition only safe non-layout properties */
  transition: background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, color 0.18s ease;
  cursor: default; position: relative;
}
.ll-edge-unit-top-idx {
  font-size: 9px; color: var(--muted); letter-spacing: 0.2px;
  white-space: nowrap;
}

/* ── 3 sub-cells row ────────────────────────────────────────────────────── */
.ll-edge-subcells { display: flex; gap: 3px; align-items: flex-end; }
.ll-edge-sub {
  display: flex; flex-direction: column; align-items: center;
  gap: 2px; padding: 4px 6px 3px;
  background: var(--surface2); border: 1px solid var(--border);
  border-radius: 4px; min-width: 22px;
  /* Transition only safe non-layout properties */
  transition: background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, color 0.15s ease;
}
.ll-edge-sub-val   { font-size: 13px; font-weight: 700; color: var(--text); line-height: 1; }
.ll-edge-sub-val-w { font-size: 14px; font-weight: 800; color: var(--text); }
.ll-edge-sub-idx   { font-size: 9px; color: var(--muted); line-height: 1; }
.ll-edge-sub-weight { background: var(--surface2); }

/* ── Sub-cell highlights: weight comparison ─────────────────────────────── */
.ll-edge-sub-hl-w {
  background: #fffbeb !important;
  border-color: #f59e0b !important;
  box-shadow: 0 0 0 2px rgba(245,158,11,0.30);
}
.ll-edge-sub-hl-w .ll-edge-sub-val { color: #92400e !important; }
.ll-edge-sub-hl-w .ll-edge-sub-idx { color: #b45309 !important; }

/* ── Sub-cell highlights: source vertex ─────────────────────────────────── */
.ll-edge-sub-hl-src {
  background: var(--orange-light) !important;
  border-color: var(--orange) !important;
  box-shadow: 0 0 0 2px rgba(249,115,22,0.25);
}
.ll-edge-sub-hl-src .ll-edge-sub-val { color: #c2410c !important; }

/* ── Sub-cell highlights: destination vertex ─────────────────────────────── */
.ll-edge-sub-hl-dst {
  background: #f3e8ff !important;
  border-color: var(--purple) !important;
  box-shadow: 0 0 0 2px rgba(147,51,234,0.25);
}
.ll-edge-sub-hl-dst .ll-edge-sub-val { color: #7e22ce !important; }

/* ── Whole-unit sort-phase states ───────────────────────────────────────── */
.ll-edge-unit-sort-i {
  border-color: var(--orange);
  background: #fff7ed;
  box-shadow: 0 0 0 3px rgba(249,115,22,0.28);
  /* NO transform:scale — would shift siblings during transition */
}
.ll-edge-unit-sort-i .ll-edge-sub { background: var(--orange-light); border-color: #fdba74; }
.ll-edge-unit-sort-i .ll-edge-sub-val { color: #c2410c; }
.ll-edge-unit-sort-j {
  border-color: var(--blue);
  background: #eff6ff;
  box-shadow: 0 0 0 3px rgba(59,130,246,0.28);
}
.ll-edge-unit-sort-j .ll-edge-sub { background: var(--blue-light); border-color: #93c5fd; }
.ll-edge-unit-sort-j .ll-edge-sub-val { color: #1d4ed8; }
.ll-edge-unit-sort-min {
  border-color: var(--green);
  background: #f0fdf4;
  box-shadow: 0 0 0 3px rgba(34,197,94,0.22);
}
.ll-edge-unit-sort-min .ll-edge-sub-weight { background: var(--green-light) !important; border-color: #86efac !important; }
.ll-edge-unit-sort-min .ll-edge-sub-weight .ll-edge-sub-val { color: #15803d !important; }

/* ── Whole-unit MST-phase states ────────────────────────────────────────── */
.ll-edge-unit-active {
  background: var(--orange-light); border-color: var(--orange);
  box-shadow: 0 0 0 3px rgba(249,115,22,0.28);
  /* NO transform:scale */
}
.ll-edge-unit-active .ll-edge-sub-val   { color: #c2410c; }
.ll-edge-unit-active .ll-edge-sub-val-w { color: #c2410c; }
.ll-edge-unit-rejected {
  background: var(--red-light); border-color: var(--red);
  box-shadow: 0 0 0 3px rgba(239,68,68,0.28);
}
.ll-edge-unit-rejected .ll-edge-sub-val   { color: var(--red-dark); }
.ll-edge-unit-rejected .ll-edge-sub-val-w { color: var(--red-dark); text-decoration: line-through; }
.ll-edge-unit-rejected .ll-edge-sub       { background: var(--red-light); border-color: #fca5a5; }
.ll-edge-unit-accepted {
  background: var(--green-light); border-color: var(--green);
  box-shadow: 0 0 0 3px rgba(34,197,94,0.22);
}
.ll-edge-unit-accepted .ll-edge-sub-val   { color: #15803d; }
.ll-edge-unit-accepted .ll-edge-sub-val-w { color: #15803d; }
.ll-edge-unit-accepted .ll-edge-sub       { background: var(--green-light); border-color: #86efac; }
.ll-uf-root  { background: var(--blue-light); border-color: var(--blue); }
.ll-uf-root  .ll-vis-val { color: #1d4ed8; }
.ll-uf-child { background: #f3e8ff; border-color: var(--purple); }
.ll-uf-child .ll-vis-val { color: var(--purple); }
/* Active parent[] slot — outline sits outside the box, never shifts siblings */
.ll-vis-active {
  border-color: #64748b !important;
  box-shadow: 0 0 0 3px rgba(100,116,139,0.30);
  /* NO transform:scale */
}
.ll-uf-root.ll-vis-active  { border-color: #1d4ed8 !important; box-shadow: 0 0 0 3px rgba(59,130,246,0.35); }
.ll-uf-child.ll-vis-active { border-color: #7e22ce !important; box-shadow: 0 0 0 3px rgba(147,51,234,0.35); }

.ll-arr-unalloc { font-size: 11px; font-style: italic; color: var(--muted); padding: 8px 12px; background: var(--surface2); border: 1px dashed var(--border2); border-radius: var(--radius-sm); }
.ll-empty-matrix-msg { padding: 24px 16px; text-align: center; color: var(--muted); font-size: 12px; font-weight: 600; border: 1px dashed var(--border2); border-radius: var(--radius-sm); background: var(--surface2); }
.ll-empty-graph-msg { display: flex; align-items: center; justify-content: center; height: 100%; width: 100%; color: #64748b; font-size: 14px; font-weight: 600; text-align: center; }
.ll-legend { display: flex; gap: 12px; padding: 6px 16px; background: var(--surface); border-bottom: 1px solid var(--border); flex-wrap: wrap; flex-shrink: 0; }
.ll-leg { display: flex; align-items: center; gap: 5px; font-size: 11px; color: var(--text2); }
.ll-legdot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
.ll-legdot-unvis    { background: #eff6ff; border: 1.5px solid #3b82f6; }
.ll-legdot-active   { background: #fff7ed; border: 1.5px solid #f97316; }
.ll-legdot-nbr      { background: #f3e8ff; border: 1.5px solid #9333ea; }
.ll-legdot-visited  { background: #f0fdf4; border: 1.5px solid #22c55e; }
.ll-legdot-path     { background: #f0fdf4; border: 2px solid #22c55e; }
.ll-legdot-rejected { background: #fef2f2; border: 1.5px solid #ef4444; }
.ll-table-area { padding: 6px 16px; overflow-y: auto; overflow-x: auto; background: var(--surface); font-family: monospace; font-size: 12px; border-bottom: 1px solid var(--border); scrollbar-width: none; -ms-overflow-style: none; }
.ll-table-area::-webkit-scrollbar { display: none; width: 0; height: 0; }
.ll-table-title { font-size: 10px; color: var(--muted); margin-bottom: 4px; text-transform: uppercase; letter-spacing: .5px; }
.ll-stack-line { display: flex; flex-direction: column; gap: 2px; }
.ll-frame { color: var(--text2); font-size: 11.5px; }
.ll-frame-cur { color: var(--text); font-weight: 600; }
.ll-fname { color: var(--muted); }
.ll-now { color: var(--coral); font-size: 10px; }
.ll-c-blue   { color: var(--blue); }
.ll-c-orange { color: var(--orange); }
.ll-c-green  { color: var(--green); }
.ll-c-purple { color: var(--purple); }
.ll-badge-wrap { padding: 6px 16px; background: var(--surface); border-bottom: 1px solid var(--border); flex-shrink: 0; }
.ll-badge { background: var(--surface2); border-left: 3px solid var(--coral); padding: 5px 10px; font-size: 11.5px; color: var(--text); font-family: monospace; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }
.ll-resizer { width: 5px; background: var(--border); cursor: col-resize; transition: background .15s; flex-shrink: 0; }
.ll-resizer:hover, .ll-resizer.drag { background: var(--coral); }
.ll-vresizer { height: 5px; background: var(--border); cursor: row-resize; transition: background .15s; flex-shrink: 0; }
.ll-vresizer:hover, .ll-vresizer.drag { background: var(--coral); }
.ll-right-col { display: flex; flex-direction: column; flex: 1; overflow: hidden; min-width: 0; height: 78%; }
.ll-code-panel { display: flex; flex-direction: column; height: 100%; overflow: hidden; }
.ll-code-header { display: flex; align-items: center; gap: 8px; padding: 8px 14px; background: var(--surface); border-bottom: 1px solid var(--border); flex-shrink: 0; box-shadow: var(--shadow-sm); flex-wrap: wrap; }
.ll-tabbar { display: flex; gap: 4px; flex-wrap: wrap; }
.ll-tab-btn { background: var(--surface2); border: 1px solid var(--border2); color: var(--text2); padding: 5px 11px; border-radius: var(--radius-sm); cursor: pointer; font-size: 11px; font-weight: 600; transition: all .15s; white-space: nowrap; }
.ll-tab-btn:hover { border-color: var(--coral); color: var(--coral); }
.ll-tab-btn.active { background: var(--coral); border-color: var(--coral); color: #fff; }
.ll-lang-select { background: var(--surface2); border: 1px solid var(--border2); color: var(--text); padding: 5px 28px 5px 10px; border-radius: var(--radius-sm); font-size: 12px; font-weight: 500; cursor: pointer; min-width: 110px; margin-left: auto; transition: border-color .15s; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2394a3b8'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; }
.ll-lang-select:focus { outline: none; border-color: var(--coral); box-shadow: 0 0 0 3px rgba(240,77,77,.1); }
.ll-code-scroll { flex: 1; overflow: auto; padding: 14px 16px; background: #f8fafc; min-width: 0; scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent; }
.ll-code-scroll::-webkit-scrollbar:horizontal { display: none !important; height: 0 !important; }
.ll-code-scroll::-webkit-scrollbar:vertical { width: 6px; }
.ll-code-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
.ll-pre { font-family: 'Cascadia Code','Fira Code','Consolas',monospace; font-size: 12px; line-height: 1.65; white-space: pre-wrap; word-break: break-all; color: var(--text); margin: 0; }
.ll-codeline { display: block; padding: 0 16px; margin: 0 -16px; }
.ll-codeline.ll-hl { background: #dcfce7; color: #15803d; border-radius: 3px; border-left: 3px solid var(--green); font-weight: 600; }
.ll-info-scroll { flex: 1; overflow: auto; padding: 16px 20px; background: var(--surface); color: var(--text2); font-size: 13px; line-height: 1.6; scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent; }
.ll-info-scroll::-webkit-scrollbar:horizontal { display: none !important; height: 0 !important; }
.ll-info-scroll::-webkit-scrollbar:vertical { width: 6px; }
.ll-info-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
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
.graph-modal-backdrop { position: fixed; top: 0; left: 0; right: 0; bottom: 55px; background: rgba(15,23,42,0.55); backdrop-filter: blur(3px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 16px 24px 20px; }
.graph-modal-card { background: #fff; border-radius: 12px; box-shadow: 0 20px 25px -5px rgba(0,0,0,.15),0 10px 10px -5px rgba(0,0,0,.04); width: 740px; max-width: 95vw; max-height: calc(100vh - 120px); display: flex; flex-direction: column; overflow: hidden; border: 1px solid var(--border); animation: ll-pop .25s ease-out; }
.graph-modal-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 18px; background: #f8fafc; border-bottom: 1px solid var(--border); }
.graph-modal-title { font-size: 14px; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 8px; }
.graph-subtitle { font-size: 11px; font-weight: 500; color: #64748b; }
.graph-close-btn { background: none; border: none; font-size: 22px; color: #64748b; cursor: pointer; line-height: 1; padding: 0 4px; border-radius: 4px; transition: color .15s; }
.graph-close-btn:hover { color: #ef4444; }
.graph-modal-body { padding: 12px 16px; display: flex; flex-direction: column; background: #fff; overflow: auto; gap: 8px; }
.graph-modal-svg { width: 100%; max-height: 360px; }
.graph-mst-summary { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; padding: 8px 12px; background: var(--green-light); border: 1px solid var(--green); border-radius: var(--radius-sm); font-size: 11.5px; font-family: monospace; }
.graph-mst-label { font-weight: 700; color: #15803d; }
.graph-mst-edge { background: #fff; border: 1px solid var(--green); border-radius: 4px; padding: 2px 6px; color: #166534; }
.graph-mst-total { margin-left: auto; color: #15803d; font-weight: 700; }
.ll-edge-line { stroke: #cbd5e1; stroke-width: 2.5px; transition: all .15s ease; }
.ll-edge-active { stroke: #f97316 !important; stroke-width: 4px !important; stroke-dasharray: 6 3; animation: ll-dash 1s linear infinite; }
.ll-edge-tree { stroke: #22c55e !important; stroke-width: 3.8px !important; }
.ll-edge-hovered { stroke: #3b82f6 !important; stroke-width: 4px !important; filter: drop-shadow(0 0 6px rgba(59,130,246,.6)); }
.ll-edge-rejected-graph { stroke: #ef4444 !important; stroke-width: 3.5px !important; stroke-dasharray: 5 4; animation: ll-dash 0.8s linear infinite; }
@keyframes ll-dash { to { stroke-dashoffset: -18; } }
@keyframes ll-node-pulse {
  from { filter: drop-shadow(0 0 4px rgba(34,197,94,0.4)); }
  to   { filter: drop-shadow(0 0 10px rgba(34,197,94,0.9)); }
}
.ll-weight-label { font-size: 11px; font-weight: 700; font-family: monospace; text-anchor: middle; fill: #475569; }
.ll-wlabel-active   { fill: #ea580c !important; }
.ll-wlabel-tree     { fill: #15803d !important; font-weight: 800 !important; }
.ll-wlabel-rejected { fill: #991b1b !important; }
.ll-wlabel-bg         { fill: #fff; stroke: #e2e8f0; stroke-width: 1; opacity: .9; }
.ll-wlabel-bg-active  { fill: #fff7ed !important; stroke: #f97316 !important; }
.ll-wlabel-bg-tree    { fill: #f0fdf4 !important; stroke: #22c55e !important; stroke-width: 1.5; }
.ll-wlabel-bg-rejected { fill: #fef2f2 !important; stroke: #ef4444 !important; }
.ll-node-dist-label { font-size: 15px; font-weight: 700; font-family: monospace; text-anchor: middle; fill: #9333ea; }
.ll-ndist-bg1 { fill: #ffffffd5; stroke: #9333ea; stroke-width: 1; }
.ll-node-circle  { fill: #eff6ff; stroke: #3b82f6; stroke-width: 2.5; transition: all .25s ease; }
.ll-node-u       { fill: #fff7ed !important; stroke: #f97316 !important; stroke-width: 3.5 !important; }
.ll-node-v       { fill: #f3e8ff !important; stroke: #9333ea !important; stroke-width: 3.5 !important; }
.ll-node-reject  { fill: #fef2f2 !important; stroke: #ef4444 !important; stroke-width: 3.5 !important; filter: drop-shadow(0 0 6px rgba(239,68,68,.5)); }
.ll-node-visited { fill: #f0fdf4 !important; stroke: #22c55e !important; stroke-width: 3 !important; animation: ll-node-pulse 1.4s ease-in-out infinite alternate; }
.ll-node-hover-src { fill: #fff7ed !important; stroke: #f97316 !important; stroke-width: 3.5px !important; filter: drop-shadow(0 0 8px rgba(249,115,22,.55)); }
.ll-node-text { font-size: 13px; font-weight: 800; font-family: monospace; text-anchor: middle; fill: #1e293b; }
.ll-node-text-hover-src { fill: #c2410c !important; font-weight: 900 !important; }
.ll-svg-ptr { font-size: 13px; font-weight: 800; font-family: monospace; text-anchor: middle; }
.ll-svg-ptr-blue     { fill: #3b82f6; }
.ll-svg-ptr-orange   { fill: #ea580c; }
.ll-svg-ptr-purple   { fill: #9333ea; }
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
