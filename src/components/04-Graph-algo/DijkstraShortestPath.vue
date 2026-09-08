<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, watch } from 'vue';

defineProps({
  topic: { type: String, default: "Dijkstra's Shortest Path" },
  subTopic: { type: String, default: 'Weighted Graph Algorithm' }
});

// ─────────────────────────────────────────────────────────────────────────────
// CODE DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────
const CODES = {
  java: [
    ['', 'import java.util.Arrays;'],
    ['', ''],
    ['', 'class DijkstraGraph {'],
    ['', '    static final int INF = Integer.MAX_VALUE;'],
    ['', ''],
    ['c_entry',         '    void dijkstra(int[][] graph, int V, int src) {'],
    ['c_init_dist',     '        int[] dist = new int[V];'],
    ['c_init_dist2',    '        Arrays.fill(dist, INF);'],
    ['c_init_parent',   '        int[] parent = new int[V];'],
    ['c_init_parent2',  '        Arrays.fill(parent, -1);'],
    ['c_init_visited',  '        boolean[] visited = new boolean[V];'],
    ['', ''],
    ['c_set_src',       '        dist[src] = 0;'],
    ['', ''],
    ['c_outer_loop',    '        for (int count = 0; count < V; count++) {'],
    ['c_init_min',      '            int u = -1, minDist = INF;'],
    ['c_scan_loop',     '            for (int v = 0; v < V; v++) {'],
    ['c_scan_check',    '                if (!visited[v] && dist[v] < minDist) {'],
    ['c_scan_update',   '                    minDist = dist[v];'],
    ['',                '                    u = v;'],
    ['',                '                }'],
    ['',                '            }'],
    ['', ''],
    ['c_check_break',   '            if (u == -1) break;'],
    ['c_mark_vis',      '            visited[u] = true;'],
    ['', ''],
    ['c_for_nbr',       '            for (int v = 0; v < V; v++) {'],
    ['c_check_edge',    '                if (graph[u][v] != 0 && !visited[v]) {'],
    ['c_calc_new',      '                    int newDist = dist[u] + graph[u][v];'],
    ['c_compare',       '                    if (newDist < dist[v]) {'],
    ['c_update_dist',   '                        dist[v] = newDist;'],
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
    ['c_entry',         'void dijkstra(int graph[MAX][MAX], int V, int src) {'],
    ['c_init_dist',     '    int dist[MAX], parent[MAX];'],
    ['c_init_visited',  '    bool visited[MAX];'],
    ['c_init_dist2',    '    for (int i = 0; i < V; i++) {'],
    ['',                '        dist[i] = INF; parent[i] = -1; visited[i] = false;'],
    ['',                '    }'],
    ['', ''],
    ['c_set_src',       '    dist[src] = 0;'],
    ['', ''],
    ['c_outer_loop',    '    for (int count = 0; count < V; count++) {'],
    ['c_init_min',      '        int u = -1, minDist = INF;'],
    ['c_scan_loop',     '        for (int v = 0; v < V; v++) {'],
    ['c_scan_check',    '            if (!visited[v] && dist[v] < minDist) {'],
    ['c_scan_update',   '                minDist = dist[v];'],
    ['',                '                u = v;'],
    ['',                '            }'],
    ['',                '        }'],
    ['', ''],
    ['c_check_break',   '        if (u == -1) break;'],
    ['c_mark_vis',      '        visited[u] = true;'],
    ['', ''],
    ['c_for_nbr',       '        for (int v = 0; v < V; v++) {'],
    ['c_check_edge',    '            if (graph[u][v] != 0 && !visited[v]) {'],
    ['c_calc_new',      '                int newDist = dist[u] + graph[u][v];'],
    ['c_compare',       '                if (newDist < dist[v]) {'],
    ['c_update_dist',   '                    dist[v] = newDist;'],
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
    ['', 'class DijkstraGraph {'],
    ['', '    static const int INF = INT_MAX;'],
    ['', 'public:'],
    ['c_entry',         '    void dijkstra(vector<vector<int>>& graph, int V, int src) {'],
    ['c_init_dist',     '        vector<int> dist(V, INF);'],
    ['c_init_parent',   '        vector<int> parent(V, -1);'],
    ['c_init_visited',  '        vector<bool> visited(V, false);'],
    ['', ''],
    ['c_set_src',       '        dist[src] = 0;'],
    ['', ''],
    ['c_outer_loop',    '        for (int count = 0; count < V; count++) {'],
    ['c_init_min',      '            int u = -1, minDist = INF;'],
    ['c_scan_loop',     '            for (int v = 0; v < V; v++) {'],
    ['c_scan_check',    '                if (!visited[v] && dist[v] < minDist) {'],
    ['c_scan_update',   '                    minDist = dist[v];'],
    ['',                '                    u = v;'],
    ['',                '                }'],
    ['',                '            }'],
    ['', ''],
    ['c_check_break',   '            if (u == -1) break;'],
    ['c_mark_vis',      '            visited[u] = true;'],
    ['', ''],
    ['c_for_nbr',       '            for (int v = 0; v < V; v++) {'],
    ['c_check_edge',    '                if (graph[u][v] != 0 && !visited[v]) {'],
    ['c_calc_new',      '                    int newDist = dist[u] + graph[u][v];'],
    ['c_compare',       '                    if (newDist < dist[v]) {'],
    ['c_update_dist',   '                        dist[v] = newDist;'],
    ['c_update_parent', '                        parent[v] = u;'],
    ['',                '                    }'],
    ['',                '                }'],
    ['',                '            }'],
    ['',                '        }'],
    ['c_done',          '    }'],
    ['',                '};']
  ],
  python: [
    ['', 'class DijkstraGraph:'],
    ['c_entry',         '    def dijkstra(self, graph, V, src):'],
    ['c_init_dist',     '        dist = [float("inf")] * V'],
    ['c_init_parent',   '        parent = [-1] * V'],
    ['c_init_visited',  '        visited = [False] * V'],
    ['', ''],
    ['c_set_src',       '        dist[src] = 0'],
    ['', ''],
    ['c_outer_loop',    '        for count in range(V):'],
    ['c_init_min',      '            u = -1; min_dist = float("inf")'],
    ['c_scan_loop',     '            for v in range(V):'],
    ['c_scan_check',    '                if not visited[v] and dist[v] < min_dist:'],
    ['c_scan_update',   '                    min_dist = dist[v]'],
    ['',                '                    u = v'],
    ['', ''],
    ['c_check_break',   '            if u == -1:'],
    ['',                '                break'],
    ['c_mark_vis',      '            visited[u] = True'],
    ['', ''],
    ['c_for_nbr',       '            for v in range(V):'],
    ['c_check_edge',    '                if graph[u][v] != 0 and not visited[v]:'],
    ['c_calc_new',      '                    new_dist = dist[u] + graph[u][v]'],
    ['c_compare',       '                    if new_dist < dist[v]:'],
    ['c_update_dist',   '                        dist[v] = new_dist'],
    ['c_update_parent', '                        parent[v] = u'],
    ['c_done',          '        return dist, parent']
  ],
  javascript: [
    ['', 'class DijkstraGraph {'],
    ['c_entry',         '  dijkstra(graph, V, src) {'],
    ['c_init_dist',     '    const dist = new Array(V).fill(Infinity);'],
    ['c_init_parent',   '    const parent = new Array(V).fill(-1);'],
    ['c_init_visited',  '    const visited = new Array(V).fill(false);'],
    ['', ''],
    ['c_set_src',       '    dist[src] = 0;'],
    ['', ''],
    ['c_outer_loop',    '    for (let count = 0; count < V; count++) {'],
    ['c_init_min',      '      let u = -1, minDist = Infinity;'],
    ['c_scan_loop',     '      for (let v = 0; v < V; v++) {'],
    ['c_scan_check',    '        if (!visited[v] && dist[v] < minDist) {'],
    ['c_scan_update',   '          minDist = dist[v];'],
    ['',                '          u = v;'],
    ['',                '        }'],
    ['',                '      }'],
    ['', ''],
    ['c_check_break',   '      if (u === -1) break;'],
    ['c_mark_vis',      '      visited[u] = true;'],
    ['', ''],
    ['c_for_nbr',       '      for (let v = 0; v < V; v++) {'],
    ['c_check_edge',    '        if (graph[u][v] !== 0 && !visited[v]) {'],
    ['c_calc_new',      '          const newDist = dist[u] + graph[u][v];'],
    ['c_compare',       '          if (newDist < dist[v]) {'],
    ['c_update_dist',   '            dist[v] = newDist;'],
    ['c_update_parent', '            parent[v] = u;'],
    ['',                '          }'],
    ['',                '        }'],
    ['',                '      }'],
    ['',                '    }'],
    ['c_done',          '  }'],
    ['',                '}']
  ]
};

const PSEUDOCODE = [
  'function DIJKSTRA(graph, V, src):',
  '    int[] dist = new int[V], parent = new int[V], visited = new boolean[V]',
  '    fill dist with INF, parent with -1, visited with false',
  '    dist[src] = 0',
  '    for count from 0 to V - 1:',
  '        u = -1, minDist = INF',
  '        for v from 0 to V - 1:',
  '            if not visited[v] and dist[v] < minDist:',
  '                minDist = dist[v], u = v',
  '        if u == -1: break',
  '        visited[u] = true',
  '        for each neighbor v from 0 to V - 1:',
  '            if edge(u, v) and not visited[v]:',
  '                newDist = dist[u] + graph[u][v]',
  '                if newDist < dist[v]:',
  '                    dist[v] = newDist',
  '                    parent[v] = u'
];

const PSEUDOCODE_MAP = {
  'c_entry':         0,
  'c_init_dist':     1,
  'c_init_parent':   1,
  'c_init_visited':  1,
  'c_init_dist2':    2,
  'c_init_parent2':  2,
  'c_set_src':       3,
  'c_outer_loop':    4,
  'c_init_min':      5,
  'c_scan_loop':     6,
  'c_scan_check':    7,
  'c_scan_update':   8,
  'c_check_break':   9,
  'c_mark_vis':      10,
  'c_for_nbr':       11,
  'c_check_edge':    12,
  'c_calc_new':      13,
  'c_compare':       14,
  'c_update_dist':   15,
  'c_update_parent': 16,
  'c_done':          -1
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

function dLabel(d) {
  return d === Infinity ? '\u221e' : String(d);
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP BUILDER
// Each step captures the EXACT state after executing the corresponding line.
// Initialization flags control what the UI reveals so students see the effect
// of each statement as it happens.
// ─────────────────────────────────────────────────────────────────────────────
function buildSteps(VInput, edgesStr, startNodeInput) {
  const steps = [];
  const V = Math.max(0, Math.min(10, parseInt(VInput) || 0));
  const parsedEdges = parseWeightedEdges(edgesStr);
  const src = Math.max(0, Math.min(V > 0 ? V - 1 : 0, parseInt(startNodeInput) || 0));
  const fnSig = 'dijkstra(graph, ' + V + ', ' + src + ')';

  // ── Mutable algorithm state (JS simulation) ────────────────────────────
  const dist    = new Array(V).fill(Infinity);
  const parent  = new Array(V).fill(-1);
  const visited = new Array(V).fill(false);
  const treeEdges = [];

  // Initialization reveal flags
  let distAllocated    = false;
  let distFilled       = false;
  let parentAllocated  = false;
  let parentFilled     = false;
  let visitedAllocated = false;

  // ── Snapshot helper ─────────────────────────────────────────────────────
  function snap(scanInfo) {
    return {
      distArr:         [...dist],
      parentArr:       [...parent],
      visitedArr:      [...visited],
      distAllocated,
      distFilled,
      parentAllocated,
      parentFilled,
      visitedAllocated,
      scanInfo:        scanInfo ? { ...scanInfo } : null,
      treeEdges:       treeEdges.map(e => ({ ...e }))
    };
  }

  function addStep(code, badge, vars, activeU, activeV, calcInfo, scanInfo) {
    // Recompute current tree edges
    treeEdges.length = 0;
    for (let i = 0; i < V; i++) {
      if (parent[i] !== -1) treeEdges.push({ u: parent[i], v: i });
    }

    steps.push({
      badge,
      code,
      vars,
      V,
      edges: parsedEdges,
      calcInfo: calcInfo || null,
      activeU: activeU === undefined ? -1 : activeU,
      activeV: activeV === undefined ? -1 : activeV,
      ...snap(scanInfo)
    });
  }

  // ── Empty-graph guard ───────────────────────────────────────────────────
  if (V === 0) {
    addStep('', 'Vertices = 0. Nothing to compute.',
      [frame('main()', []), frame('dijkstra()', [['V', '0']])]);
    return steps;
  }

  // ── Build adjacency matrix ──────────────────────────────────────────────
  const graph = Array.from({ length: V }, () => new Array(V).fill(0));
  parsedEdges.forEach(e => {
    if (e.u >= 0 && e.u < V && e.v >= 0 && e.v < V) graph[e.u][e.v] = e.w;
  });

  // ══════════════════════════════════════════════════════════════════════════
  // INITIALIZATION STEPS
  // ══════════════════════════════════════════════════════════════════════════

  // Step 1 – function entry
  addStep('c_entry',
    'dijkstra(graph, ' + V + ', ' + src + ') called \u2192 Starting Dijkstra\'s algorithm (Linear Scan) from source vertex ' + src,
    [frame('main()', []), frame(fnSig, [['V', String(V)], ['src', String(src)]])]);

  // Step 2 – int[] dist = new int[V];  (allocated, NOT yet filled)
  distAllocated = true;
  addStep('c_init_dist',
    'int[] dist = new int[' + V + '] \u2192 Allocated dist array (values uninitialized)',
    [frame('main()', []), frame(fnSig, [['dist', 'int[' + V + '] allocated']])]);

  // Step 3 – Arrays.fill(dist, INF);
  distFilled = true;
  addStep('c_init_dist2',
    'Arrays.fill(dist, INF) \u2192 All ' + V + ' distances set to \u221e (INF)',
    [frame('main()', []), frame(fnSig, [['dist', '[' + dist.map(dLabel).join(', ') + ']']])]);

  // Step 4 – int[] parent = new int[V];
  parentAllocated = true;
  addStep('c_init_parent',
    'int[] parent = new int[' + V + '] \u2192 Allocated parent array (values uninitialized)',
    [frame('main()', []), frame(fnSig, [['parent', 'int[' + V + '] allocated']])]);

  // Step 5 – Arrays.fill(parent, -1);
  parentFilled = true;
  addStep('c_init_parent2',
    'Arrays.fill(parent, -1) \u2192 All predecessors set to -1 (none)',
    [frame('main()', []), frame(fnSig, [['parent', '[' + parent.join(', ') + ']']])]);

  // Step 6 – boolean[] visited = new boolean[V];
  visitedAllocated = true;
  addStep('c_init_visited',
    'boolean[] visited = new boolean[' + V + '] \u2192 All visited values initialized to false',
    [frame('main()', []), frame(fnSig, [['visited', '[' + visited.join(', ') + ']']])]);

  // Step 7 – dist[src] = 0;
  dist[src] = 0;
  addStep('c_set_src',
    'dist[' + src + '] = 0 \u2192 Source vertex ' + src + ' distance set to 0',
    [frame('main()', []), frame(fnSig, [['dist[' + src + ']', '0'], ['dist', '[' + dist.map(dLabel).join(', ') + ']']])],
    src);

  // ══════════════════════════════════════════════════════════════════════════
  // MAIN LOOP: LINEAR SCAN + RELAXATION
  // ══════════════════════════════════════════════════════════════════════════
  for (let count = 0; count < V; count++) {

    addStep('c_outer_loop',
      'for (count = ' + count + '; count < ' + V + '; ...) \u2192 Iteration ' + (count + 1) + ' of ' + V + ': Finding unvisited vertex with minimum distance',
      [frame('main()', []), frame(fnSig, [['count', String(count)]])],
      -1, -1, null,
      { minU: -1, minDist: Infinity });

    let u = -1;
    let minDist = Infinity;

    addStep('c_init_min',
      'int u = -1, minDist = INF \u2192 Starting linear scan over all vertices 0..' + (V - 1),
      [frame('main()', []), frame(fnSig, [['count', String(count)], ['u', '-1'], ['minDist', '\u221e']])],
      -1, -1, null,
      { minU: -1, minDist: Infinity });

    // Linear scan over all vertices to find min-distance unvisited vertex
    for (let v = 0; v < V; v++) {
      addStep('c_scan_loop',
        'for (v = ' + v + '; v < ' + V + '; ...) \u2192 Scanning candidate vertex ' + v + ' (dist[' + v + ']=' + dLabel(dist[v]) + ', visited=' + visited[v] + ')',
        [frame('main()', []), frame(fnSig, [['count', String(count)], ['u', String(u)], ['minDist', dLabel(minDist)], ['v', String(v)]])],
        -1, v, null,
        { minU: u, minDist, candidateV: v, candidateDist: dist[v], candidateVisited: visited[v] });

      const isCandidate = !visited[v] && dist[v] < minDist;

      addStep('c_scan_check',
        'if (!visited[' + v + '] && dist[' + v + '] < minDist) \u2192 visited[' + v + ']=' + visited[v] +
          ', dist[' + v + ']=' + dLabel(dist[v]) + ', minDist=' + dLabel(minDist) + ' \u2192 ' +
          (isCandidate ? 'True \u2192 smaller unvisited distance found!' : (visited[v] ? 'False (already visited)' : 'False (distance not smaller)')),
        [frame('main()', []), frame(fnSig, [['v', String(v)], ['visited[' + v + ']', String(visited[v])], ['dist[' + v + ']', dLabel(dist[v])], ['minDist', dLabel(minDist)]])],
        -1, v, null,
        { minU: u, minDist, candidateV: v, candidateDist: dist[v], candidateVisited: visited[v] });

      if (isCandidate) {
        minDist = dist[v];
        u = v;
        addStep('c_scan_update',
          'minDist = dist[' + v + '] = ' + dist[v] + '; u = ' + v + ' \u2192 Updated minimum candidate to vertex ' + v + ' with dist ' + dist[v],
          [frame('main()', []), frame(fnSig, [['u', String(u)], ['minDist', String(minDist)]])],
          u, -1, null,
          { minU: u, minDist, candidateV: v, candidateDist: dist[v], candidateVisited: visited[v] });
      }
    }

    // Check if remaining vertices are unreachable
    addStep('c_check_break',
      'if (u == -1) \u2192 ' + (u === -1 ? 'u = -1 (no reachable unvisited vertex remains \u2192 break)' : 'u = ' + u + ' (minDist = ' + minDist + ') \u2192 vertex ' + u + ' selected, proceed'),
      [frame('main()', []), frame(fnSig, [['u', String(u)], ['minDist', dLabel(minDist)]])],
      u !== -1 ? u : -1, -1, null,
      { minU: u, minDist });

    if (u === -1) break;

    // Mark visited
    visited[u] = true;
    addStep('c_mark_vis',
      'visited[' + u + '] = true \u2192 Vertex ' + u + ' is now finalized. Shortest dist[' + u + '] = ' + dLabel(dist[u]),
      [frame('main()', []), frame(fnSig, [['u', String(u)], ['visited[' + u + ']', 'true'], ['dist[' + u + ']', dLabel(dist[u])]])],
      u, -1, null,
      { minU: u, minDist });

    // Relax all neighbors of vertex u
    for (let v = 0; v < V; v++) {
      const w = graph[u][v];

      addStep('c_for_nbr',
        'for (v = ' + v + '; v < ' + V + '; ...) \u2192 Checking neighbor ' + v + ' of current vertex ' + u,
        [frame('main()', []), frame(fnSig, [['u', String(u)], ['v', String(v)]])],
        u, v);

      addStep('c_check_edge',
        'if (graph[' + u + '][' + v + '] != 0 && !visited[' + v + ']) \u2192 weight=' + w +
          ', visited[' + v + ']=' + visited[v] + ' \u2192 ' +
          (w !== 0 && !visited[v] ? 'Edge exists & unvisited \u2192 relax' : 'Skip'),
        [frame('main()', []), frame(fnSig, [['u', String(u)], ['v', String(v)], ['weight', String(w)], ['visited[' + v + ']', String(visited[v])]])],
        u, v);

      if (w !== 0 && !visited[v]) {
        const newDist = dist[u] + w;
        const oldDist = dist[v];

        addStep('c_calc_new',
          'newDist = dist[' + u + '] + graph[' + u + '][' + v + '] = ' +
            dLabel(dist[u]) + ' + ' + w + ' = ' + newDist,
          [frame('main()', []), frame(fnSig, [['u', String(u)], ['v', String(v)], ['dist[' + u + ']', dLabel(dist[u])], ['weight', String(w)], ['newDist', String(newDist)]])],
          u, v,
          { from: u, to: v, weight: w, newDist, oldDist });

        addStep('c_compare',
          'if (newDist < dist[' + v + ']) \u2192 ' + newDist + ' < ' + dLabel(oldDist) + ' \u2192 ' +
            (newDist < oldDist ? 'true \u2192 shorter path found!' : 'false \u2192 no update'),
          [frame('main()', []), frame(fnSig, [['newDist', String(newDist)], ['dist[' + v + ']', dLabel(oldDist)]])],
          u, v,
          { from: u, to: v, weight: w, newDist, oldDist, comparing: true });

        if (newDist < oldDist) {
          dist[v] = newDist;
          addStep('c_update_dist',
            'dist[' + v + '] = ' + newDist + ' \u2192 Updated! dist[' + v + ']: ' + dLabel(oldDist) + ' \u2192 ' + newDist,
            [frame('main()', []), frame(fnSig, [['dist[' + v + ']', String(newDist)]])],
            u, v,
            { from: u, to: v, weight: w, newDist, oldDist, updated: true });

          parent[v] = u;
          addStep('c_update_parent',
            'parent[' + v + '] = ' + u + ' \u2192 Predecessor of vertex ' + v + ' is now ' + u,
            [frame('main()', []), frame(fnSig, [['parent[' + v + ']', String(u)]])],
            u, v);
        }
      }
    }
  }

  // Build final shortest-path tree
  treeEdges.length = 0;
  for (let v = 0; v < V; v++) {
    if (parent[v] !== -1) treeEdges.push({ u: parent[v], v });
  }

  addStep('c_done',
    'Dijkstra complete! Shortest distances from vertex ' + src + ': [' + dist.map(dLabel).join(', ') + ']',
    [frame('main()', []), frame(fnSig, [['dist', '[' + dist.map(dLabel).join(', ') + ']']])]);

  return steps;
}

// ─────────────────────────────────────────────────────────────────────────────
// REACTIVE STATE
// ─────────────────────────────────────────────────────────────────────────────
const DEFAULT_V     = 5;
const DEFAULT_EDGES = '[[0,1,4],[0,2,2],[1,2,5],[1,3,10],[2,3,8],[2,4,6],[3,4,2]]';

const numVInput      = ref(DEFAULT_V);
const edgesInputStr  = ref(DEFAULT_EDGES);
const startNodeInput = ref(0);
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

// ── Path Hover Tracking ──────────────────────────────────────────────────
const hoveredPathEdges = computed(() => {
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

const hoveredPathNodes = computed(() => {
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

// ─────────────────────────────────────────────────────────────────────────────
// NODE POSITIONS  (identical to BFS / DFS)
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// EDGE GEOMETRY  (identical to BFS / DFS)
// ─────────────────────────────────────────────────────────────────────────────
function getEdgeGeometry(edge, positions, allEdges, curvature) {
  if (curvature === undefined) curvature = 32;
  const uNode = positions[edge.u], vNode = positions[edge.v];
  if (!uNode || !vNode) return { pathD: '', labelX: 0, labelY: 0 };
  const x1 = uNode.x, y1 = uNode.y, x2 = vNode.x, y2 = vNode.y;
  const dx = x2 - x1, dy = y2 - y1;
  const dist = Math.hypot(dx, dy) || 1;
  const ux = dx / dist, uy = dy / dist, nx = -uy, ny = ux;
  const isBi = allEdges.some(e => e.u === edge.v && e.v === edge.u);
  const h = isBi ? curvature : 0;
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const cx2 = mx + h * nx, cy2 = my + h * ny;
  const nodeR = 20;
  const sx = x1 + ux * nodeR + (isBi ? nx * 6 : 0);
  const sy = y1 + uy * nodeR + (isBi ? ny * 6 : 0);
  const ex = x2 - ux * nodeR + (isBi ? nx * 6 : 0);
  const ey = y2 - uy * nodeR + (isBi ? ny * 6 : 0);
  const pathD  = isBi ? `M ${sx} ${sy} Q ${cx2} ${cy2} ${ex} ${ey}` : `M ${sx} ${sy} L ${ex} ${ey}`;
  const labelX = isBi ? 0.25 * sx + 0.5 * cx2 + 0.25 * ex : mx;
  const labelY = isBi ? 0.25 * sy + 0.5 * cy2 + 0.25 * ey : my;
  return { pathD, labelX, labelY, isBi };
}

function getEdgeGeo(edge) {
  return getEdgeGeometry(edge, modalNodePositions.value, s.value.edges || [], 32);
}
function isEdgeHovered(u, v)      { return hoveredEdge.value && hoveredEdge.value.u === u && hoveredEdge.value.v === v; }
function isNodeHoveredSource(id)  { return hoveredEdge.value && hoveredEdge.value.u === id; }
function isNodeHoveredTarget(id)  { return (hoveredEdge.value && hoveredEdge.value.v === id) || (hoveredNode.value === id); }
function isTreeEdge(u, v)         { return (s.value.treeEdges || []).some(e => (e.u === u && e.v === v) || (e.u === v && e.v === u)); }
function isActiveEdge(u, v)       { return u === s.value.activeU && v === s.value.activeV; }
function isHoveredPathEdge(u, v)  { return hoveredPathEdges.value.some(e => e.u === u && e.v === v); }
function isHoveredPathNode(id)    { return hoveredPathNodes.value.has(id); }

// ─────────────────────────────────────────────────────────────────────────────
// CONTROLS  (identical pattern to BFS / DFS)
// ─────────────────────────────────────────────────────────────────────────────
let playTimer = null;

function applySetup() {
  const rawV  = parseInt(numVInput.value);
  const vCount = isNaN(rawV) || rawV < 0 ? 0 : Math.min(10, rawV);
  playing.value = false;
  clearTimeout(playTimer);
  stepsData.steps = buildSteps(vCount, edgesInputStr.value, startNodeInput.value);
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

function onKeydown(e) {
  const tag = e.target.tagName;
  if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
  if (e.key === 'ArrowRight') stepBy(1);
  if (e.key === 'ArrowLeft')  stepBy(-1);
  if (e.key === ' ')          { e.preventDefault(); togglePlay(); }
}

// ─────────────────────────────────────────────────────────────────────────────
// RESIZERS  (identical to BFS / DFS)
// ─────────────────────────────────────────────────────────────────────────────
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

          <!-- ── Toolbar ─────────────────────────────────────────────── -->
          <div class="ll-toolbar">
            <label>Vertices</label>
            <input type="number" v-model.number="numVInput" min="0" max="10" style="width:45px;" class="ll-text-input"
              @change="applySetup" @keyup.enter="applySetup" />
            <span class="ll-divider">|</span>
            <label>Edges</label>
            <input type="text" v-model="edgesInputStr" style="width:180px;" class="ll-text-input"
              placeholder="e.g. [[0,1,4],[0,2,2]]" @keyup.enter="applySetup" />
            <span class="ll-divider">|</span>
            <label>Source</label>
            <input type="number" v-model.number="startNodeInput" min="0" :max="numVInput > 0 ? numVInput - 1 : 0"
              style="width:45px;" class="ll-text-input" @change="applySetup" @keyup.enter="applySetup" />
            <button class="ll-viz-btn" @click="applySetup" title="Run Dijkstra">&#9654;</button>
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

          <!-- ── Main split ─────────────────────────────────────────── -->
          <div class="ll-main" ref="mainRef">

            <!-- LEFT COLUMN -->
            <div class="ll-left-col" ref="leftColRef" :style="{ width: leftWidth + '%' }">
              <div class="ll-viz-wrap" :style="{ height: vizHeight + 'px' }">
                <div class="ll-perm-area">

                  <div v-if="(s.V ?? 0) === 0" class="ll-empty-matrix-msg">
                    No graph to display (Vertices = 0). Set Vertices &gt; 0 with weighted edges like [[0,1,4],[0,2,2]].
                  </div>

                  <template v-else>

                    <!-- ── Linear Scan: Min-Distance Selection ──────────────── -->
                    <!-- <div class="ll-section-wrap">
                      <div class="ll-section-title">
                        Linear Scan &mdash; Min-Distance Vertex Selection (u = minVertex, minDist):
                      </div>
                      <div class="ll-queue-track">
                        <template v-if="s.scanInfo">
                          <span class="ll-q-lbl">Current Min:</span>
                          <div class="ll-queue-cell ll-q-head">
                            u = {{ s.scanInfo.minU === -1 ? 'none' : s.scanInfo.minU }} (dist: {{ s.scanInfo.minDist === Infinity ? '\u221e' : s.scanInfo.minDist }})
                          </div>
                          <template v-if="s.scanInfo.candidateV !== undefined && s.scanInfo.candidateV !== -1">
                            <span class="ll-q-lbl">Checking:</span>
                            <div class="ll-queue-cell">
                              v = {{ s.scanInfo.candidateV }} (dist: {{ s.scanInfo.candidateDist === Infinity ? '\u221e' : s.scanInfo.candidateDist }}, visited: {{ s.scanInfo.candidateVisited }})
                            </div>
                          </template>
                        </template>
                        <div v-else class="ll-q-empty">
                          {{ s.activeU >= 0 ? `Selected vertex u = ${s.activeU} (dist = ${s.distArr && s.distArr[s.activeU] !== Infinity ? s.distArr[s.activeU] : '\u221e'})` : '(Scan idle)' }}
                        </div>
                      </div>
                    </div> -->

                    <!-- ── dist[] array ───────────────────────────── -->
                    <div class="ll-section-wrap">
                      <div class="ll-section-title">dist[] &mdash; Shortest known distance from source:</div>
                      <div class="ll-vis-track">
                        <template v-if="!s.distAllocated">
                          <span class="ll-arr-unalloc">not yet allocated</span>
                        </template>
                        <template v-else>
                          <div
                            v-for="vIdx in s.V"
                            :key="'dist-' + (vIdx-1)"
                            class="ll-vis-item"
                            :class="{
                              'll-dist-zero':    s.distFilled && s.distArr && s.distArr[vIdx-1] === 0,
                              'll-dist-finite':  s.distFilled && s.distArr && s.distArr[vIdx-1] !== Infinity && s.distArr[vIdx-1] !== 0,
                              'll-vis-active':   (vIdx-1) === s.activeU || (vIdx-1) === s.activeV
                            }"
                          >
                            <span class="ll-vis-idx">dist[{{ vIdx-1 }}]</span>
                            <span class="ll-vis-val">
                              {{ !s.distFilled ? '?' : (s.distArr && s.distArr[vIdx-1] === Infinity ? '\u221e' : (s.distArr ? s.distArr[vIdx-1] : '\u221e')) }}
                            </span>
                          </div>
                        </template>
                      </div>
                    </div>

                    <!-- ── parent[] array ─────────────────────────── -->
                    <div class="ll-section-wrap">
                      <div class="ll-section-title">parent[] &mdash; Predecessor vertex on shortest path:</div>
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
                              'll-vis-active': (vIdx-1) === s.activeU || (vIdx-1) === s.activeV
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

                    <!-- ── visited[] array ────────────────────────── -->
                    <div class="ll-section-wrap">
                      <div class="ll-section-title">visited[] &mdash; Boolean: vertex fully processed?</div>
                      <div class="ll-vis-track">
                        <template v-if="!s.visitedAllocated">
                          <span class="ll-arr-unalloc">not yet allocated</span>
                        </template>
                        <template v-else>
                          <div
                            v-for="vIdx in s.V"
                            :key="'vis-' + (vIdx-1)"
                            class="ll-vis-item"
                            :class="{
                              'll-vis-true':   s.visitedArr && s.visitedArr[vIdx-1],
                              'll-vis-active': (vIdx-1) === s.activeU || (vIdx-1) === s.activeV
                            }"
                          >
                            <span class="ll-vis-idx">visited[{{ vIdx-1 }}]</span>
                            <span class="ll-vis-val">{{ s.visitedArr && s.visitedArr[vIdx-1] ? 'true' : 'false' }}</span>
                          </div>
                        </template>
                      </div>
                    </div>

                    <!-- ── Edge relaxation detail ─────────────────── -->
                    <div v-if="s.calcInfo" class="ll-section-wrap">
                      <div class="ll-section-title">Edge Relaxation:</div>
                      <div class="ll-calc-box">
                        <span class="ll-calc-expr">
                          vertex {{ s.calcInfo.from }} &#8594; vertex {{ s.calcInfo.to }}
                          &nbsp;&nbsp;
                          newDist = {{ s.calcInfo.newDist }}
                          <template v-if="s.calcInfo.comparing">
                            &nbsp; vs dist[{{ s.calcInfo.to }}] = {{ s.calcInfo.oldDist === Infinity ? '\u221e' : s.calcInfo.oldDist }}
                            &nbsp;
                            <span :class="s.calcInfo.newDist < s.calcInfo.oldDist ? 'll-calc-ok' : 'll-calc-no'">
                              {{ s.calcInfo.newDist < s.calcInfo.oldDist ? '\u2713 Update!' : '\u2717 No update' }}
                            </span>
                          </template>
                        </span>
                      </div>
                    </div>

                  </template>
                </div>
              </div>

              <div class="ll-vresizer" ref="vizResizerRef"></div>

              <!-- Legend -->
              <div class="ll-legend">
                <span class="ll-leg"><span class="ll-legdot ll-legdot-unvis"></span>Unvisited</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-active"></span>current (u)</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-nbr"></span>neighbor / scan (v)</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-visited"></span>visited=true</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-path"></span>Shortest Path Tree</span>
              </div>

              <!-- Variable frames -->
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

              <!-- Step badge -->
              <div class="ll-badge-wrap">
                <div class="ll-badge">{{ s.badge }}</div>
              </div>
            </div><!-- /ll-left-col -->

            <div class="ll-resizer" ref="hResizerRef"></div>

            <!-- RIGHT COLUMN -->
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

                <div v-if="rightTab === 'code'" class="ll-code-scroll">
                  <pre class="ll-pre"><span
                    v-for="(line, i) in codeLines"
                    :key="i"
                    class="ll-codeline"
                    :class="{ 'll-hl': line[0] && line[0] === s.code }"
                  >{{ line[1] === '' ? ' ' : line[1] }}</span></pre>
                </div>

                <div v-else-if="rightTab === 'pseudo'" class="ll-code-scroll">
                  <pre class="ll-pre"><span
                    v-for="(line, i) in PSEUDOCODE"
                    :key="i"
                    class="ll-codeline"
                    :class="{ 'll-hl': PSEUDOCODE_MAP[s.code] === i }"
                  >{{ line }}</span></pre>
                </div>

                <div v-else class="ll-info-scroll">
                  <h3>Time &amp; Space Complexity</h3>
                  <table class="ll-complexity-table">
                    <thead><tr><th>Metric</th><th>Complexity</th><th>Why</th></tr></thead>
                    <tbody>
                      <tr><td>Time Complexity</td><td>O(V&sup2;)</td><td>Outer loop runs V times. Each iteration performs an O(V) linear scan to find the minimum distance vertex and an O(V) scan to relax adjacent edges. Total time = O(V&sup2;).</td></tr>
                      <tr><td>Space Complexity</td><td>O(V)</td><td>dist[], parent[], and visited[] arrays each require O(V) auxiliary space.</td></tr>
                    </tbody>
                  </table>
                  <p class="ll-note">
                    Key property: <b>Dijkstra's Algorithm (Linear Scan)</b> iteratively selects the unvisited vertex with the minimum <b>dist</b> value via a linear scan over all vertices, and relaxes its neighbors. It guarantees optimal shortest paths for graphs with <b>non-negative edge weights</b>.
                  </p>
                  <h3>Applications</h3>
                  <p>GPS navigation, Network routing (OSPF, IS-IS), Flight path optimization, Game AI pathfinding, Social network degrees of separation.</p>
                </div>
              </div>
            </div><!-- /ll-right-col -->

          </div><!-- /ll-main -->

          <!-- Footer -->
          <div class="ll-footer">
            Step {{ si + 1 }} / {{ steps.length }}
            <span class="ll-speed-wrap">Speed <input type="range" min="100" max="2000" step="100" v-model.number="speed" /></span>
          </div>

        </div><!-- /ll-root -->
      </div>
    </div>

    <!-- ── Graph Modal ────────────────────────────────────────────────── -->
    <div v-if="showGraphModal" class="graph-modal-backdrop" @click.self="showGraphModal = false">
      <div class="graph-modal-card">
        <div class="graph-modal-header">
          <div class="graph-modal-title">
            <span>Dijkstra's Shortest Path Graph View</span>
            <span class="graph-subtitle">(Weighted Directed Graph + Shortest-Path Tree)</span>
          </div>
          <button class="graph-close-btn" @click="showGraphModal = false">&times;</button>
        </div>

        <div class="graph-modal-body">
          <div v-if="(s.V ?? 0) === 0" class="ll-empty-graph-msg">No vertices to display.</div>
          <svg v-else class="graph-modal-svg" viewBox="0 -25 720 510">
            <defs>
              <marker id="dijk-arr"            viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b"/></marker>
              <marker id="dijk-arr-active"     viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#f97316"/></marker>
              <marker id="dijk-arr-hover"      viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6"/></marker>
              <marker id="dijk-arr-tree"       viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e"/></marker>
              <marker id="dijk-arr-path-hover" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444"/></marker>
            </defs>

            <!-- Edges -->
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
                  'll-edge-path-hovered': isHoveredPathEdge(edge.u, edge.v),
                  'll-edge-active':       isActiveEdge(edge.u, edge.v),
                  'll-edge-tree':         isTreeEdge(edge.u, edge.v) && !isHoveredPathEdge(edge.u, edge.v),
                  'll-edge-hovered':      isEdgeHovered(edge.u, edge.v)
                }"
                :marker-end="isHoveredPathEdge(edge.u, edge.v)
                  ? 'url(#dijk-arr-path-hover)'
                  : (isEdgeHovered(edge.u, edge.v)
                    ? 'url(#dijk-arr-hover)'
                    : (isActiveEdge(edge.u, edge.v)
                      ? 'url(#dijk-arr-active)'
                      : (isTreeEdge(edge.u, edge.v)
                        ? 'url(#dijk-arr-tree)'
                        : 'url(#dijk-arr)')))"
              />
              <!-- Weight background -->
              <rect :x="getEdgeGeo(edge).labelX - 11" :y="getEdgeGeo(edge).labelY - 9" width="22" height="16" rx="4"
                class="ll-wlabel-bg" :class="{
                  'll-wlabel-bg-path-hover': isHoveredPathEdge(edge.u, edge.v),
                  'll-wlabel-bg-active':     isActiveEdge(edge.u, edge.v),
                  'll-wlabel-bg-tree':       isTreeEdge(edge.u, edge.v) && !isHoveredPathEdge(edge.u, edge.v)
                }"/>
              <!-- Weight text -->
              <text :x="getEdgeGeo(edge).labelX" :y="getEdgeGeo(edge).labelY + 4"
                class="ll-weight-label" :class="{
                  'll-wlabel-path-hover': isHoveredPathEdge(edge.u, edge.v),
                  'll-wlabel-active':     isActiveEdge(edge.u, edge.v),
                  'll-wlabel-tree':       isTreeEdge(edge.u, edge.v) && !isHoveredPathEdge(edge.u, edge.v)
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
              <!-- Pointer labels -->
              <g v-if="node.id === s.activeU || node.id === s.activeV || isNodeHoveredSource(node.id) || isNodeHoveredTarget(node.id) || node.id === startNodeInput || node.id === hoveredNode">
                <template v-if="node.y > 230">
                  <text :x="node.x" :y="node.y + 24" class="ll-svg-ptr"
                    :class="node.id === hoveredNode ? 'll-svg-ptr-hover-tgt' : (isNodeHoveredSource(node.id)?'ll-svg-ptr-hover-src':(isNodeHoveredTarget(node.id)?'ll-svg-ptr-hover-tgt':(node.id===s.activeU?'ll-svg-ptr-orange':(node.id===s.activeV?'ll-svg-ptr-purple':'ll-svg-ptr-blue'))))"
                  >&#9653;</text>
                  <text :x="node.x" :y="node.y + 37" class="ll-svg-ptr"
                    :class="node.id === hoveredNode ? 'll-svg-ptr-hover-tgt' : (isNodeHoveredSource(node.id)?'ll-svg-ptr-hover-src':(isNodeHoveredTarget(node.id)?'ll-svg-ptr-hover-tgt':(node.id===s.activeU?'ll-svg-ptr-orange':(node.id===s.activeV?'ll-svg-ptr-purple':'ll-svg-ptr-blue'))))"
                  >{{ node.id === hoveredNode ? 'target' : (isNodeHoveredSource(node.id)?'src':(isNodeHoveredTarget(node.id)?'tgt':(node.id===s.activeU?'current':(node.id===s.activeV?'scan/nbr':(node.id===startNodeInput?'start':''))))) }}</text>
                </template>
                <template v-else>
                  <text :x="node.x" :y="node.y - 53" class="ll-svg-ptr"
                    :class="node.id === hoveredNode ? 'll-svg-ptr-hover-tgt' : (isNodeHoveredSource(node.id)?'ll-svg-ptr-hover-src':(isNodeHoveredTarget(node.id)?'ll-svg-ptr-hover-tgt':(node.id===s.activeU?'ll-svg-ptr-orange':(node.id===s.activeV?'ll-svg-ptr-purple':'ll-svg-ptr-blue'))))"
                  >{{ node.id === hoveredNode ? 'target' : (isNodeHoveredSource(node.id)?'src':(isNodeHoveredTarget(node.id)?'tgt':(node.id===s.activeU?'current':(node.id===s.activeV?'scan/nbr':(node.id===startNodeInput?'start':''))))) }}</text>
                  <text :x="node.x" :y="node.y - 41" class="ll-svg-ptr"
                    :class="node.id === hoveredNode ? 'll-svg-ptr-hover-tgt' : (isNodeHoveredSource(node.id)?'ll-svg-ptr-hover-src':(isNodeHoveredTarget(node.id)?'ll-svg-ptr-hover-tgt':(node.id===s.activeU?'ll-svg-ptr-orange':(node.id===s.activeV?'ll-svg-ptr-purple':'ll-svg-ptr-blue'))))"
                  >&darr;</text>
                </template>
              </g>

              <!-- Node circle -->
              <circle :cx="node.x" :cy="node.y" r="20" class="ll-node-circle"
                :class="{
                  'll-node-path-hover': isHoveredPathNode(node.id),
                  'll-node-u':          node.id === s.activeU,
                  'll-node-v':          node.id === s.activeV,
                  'll-node-visited':    s.visitedArr && s.visitedArr[node.id] && node.id !== s.activeU && node.id !== s.activeV,
                  'll-node-hover-src':  isNodeHoveredSource(node.id),
                  'll-node-hover-tgt':  isNodeHoveredTarget(node.id)
                }"
              />
              <!-- Node label -->
              <text :x="node.x" :y="node.y + 5" class="ll-node-text"
                :class="{
                  'll-node-text-path-hover': isHoveredPathNode(node.id),
                  'll-node-text-hover-src':  isNodeHoveredSource(node.id),
                  'll-node-text-hover-tgt':  isNodeHoveredTarget(node.id)
                }"
                style="font-size:15px;"
              >{{ node.id }}</text>

              <!-- dist badge above node with background matching edge weight design -->
              <g v-if="s.distFilled && s.distArr">
                <rect
                  :x="node.x - 11"
                  :y="node.y - 36"
                  width="22"
                  height="16"
                  rx="4"
                  class="ll-ndist-bg1"
                  :class="{ 'll-ndist-bg-path-hover': isHoveredPathNode(node.id) }"
                />
                <text
                  :x="node.x"
                  :y="node.y - 23"
                  class="ll-node-dist-label"
                  :class="{ 'll-ndist-path-hover': isHoveredPathNode(node.id) }"
                >{{ s.distArr[node.id] === Infinity ? '\u221e' : s.distArr[node.id] }}</text>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>

  </div><!-- /slide-wrapper -->
</template>

<style scoped>
/* ── Root & design tokens (identical to BFSGraph / DFSGraph) ──────────────── */
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
/* Toolbar */
.ll-toolbar { display: flex; align-items: center; gap: 8px; padding: 7px 16px; background: var(--surface); border-bottom: 1px solid var(--border); flex-shrink: 0; flex-wrap: wrap; box-shadow: var(--shadow-sm); }
.ll-toolbar label { font-size: 11px; color: var(--muted); white-space: nowrap; font-weight: 600; }
.ll-text-input { background: var(--surface); border: 1px solid var(--border2); color: var(--text); border-radius: var(--radius-sm); padding: 4px 8px; font-size: 12px; font-family: monospace; transition: border-color .15s; text-align: center; }
.ll-text-input:focus { outline: none; border-color: var(--coral); box-shadow: 0 0 0 3px rgba(240,77,77,.1); }
.ll-divider { color: var(--border2); font-weight: 300; margin: 0 4px; }
.ll-viz-btn { background: var(--coral); color: #fff; border: none; padding: 5px 14px; border-radius: var(--radius-sm); cursor: pointer; font-size: 12px; font-weight: 600; box-shadow: var(--shadow-sm); transition: filter .15s; }
.ll-viz-btn:hover { filter: brightness(1.08); }
.ll-graph-modal-btn { background: var(--purple); color: #fff; border: none; padding: 5px 12px; border-radius: var(--radius-sm); cursor: pointer; font-size: 12px; font-weight: 600; box-shadow: var(--shadow-sm); transition: filter .15s; }
.ll-graph-modal-btn:hover { filter: brightness(1.08); }
/* Layout */
.ll-main { display: flex; flex: 1; overflow: hidden; position: relative; }
.ll-left-col { display: flex; flex-direction: column; overflow: hidden; min-width: 200px; max-width: 72%; }
.ll-viz-wrap { padding: 12px; overflow-x: auto; overflow-y: auto; background: var(--surface); border-bottom: 1px solid var(--border); }
.ll-perm-area { display: flex; flex-direction: column; gap: 12px; min-width: max-content; }
/* Section */
.ll-section-wrap { display: flex; flex-direction: column; gap: 4px; }
.ll-section-title { font-size: 11px; font-weight: 700; color: var(--text2); font-family: monospace; }
/* Min Selection / Queue track */
.ll-queue-track { display: flex; align-items: center; gap: 6px; padding: 8px 12px; background: var(--surface2); border: 1px solid var(--border); border-radius: var(--radius-sm); min-height: 48px; flex-wrap: wrap; }
.ll-q-lbl { font-size: 11px; font-weight: 700; color: var(--muted); font-family: monospace; }
.ll-queue-cell { padding: 5px 10px; background: var(--blue-light); border: 2px solid var(--blue); border-radius: var(--radius-sm); font-family: monospace; font-size: 13px; font-weight: 800; color: var(--blue); transition: all 0.2s ease; white-space: nowrap; }
.ll-q-head { background: var(--orange-light); border-color: var(--orange); color: var(--orange); transform: scale(1.05); }
.ll-q-empty { font-size: 12px; font-style: italic; color: var(--muted); padding: 0 8px; }
/* Array tracks (dist, parent, visited) — extends ll-vis-item from BFS/DFS */
.ll-vis-track { display: flex; gap: 6px; flex-wrap: wrap; }
.ll-vis-item { display: flex; flex-direction: column; align-items: center; padding: 4px 6px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-sm); font-family: monospace; min-width: 56px; transition: all 0.2s ease; }
.ll-vis-idx { font-size: 10px; color: var(--muted); }
.ll-vis-val { font-size: 12px; font-weight: 700; color: var(--muted); }
/* dist[] coloring */
.ll-dist-zero   { background: #f0fdf4; border-color: var(--green); }
.ll-dist-zero   .ll-vis-val { color: #15803d; }
.ll-dist-finite { background: var(--blue-light); border-color: var(--blue); }
.ll-dist-finite .ll-vis-val { color: #1d4ed8; }
/* parent[] coloring */
.ll-par-set     { background: #f3e8ff; border-color: var(--purple); }
.ll-par-set     .ll-vis-val { color: var(--purple); }
/* visited[] coloring */
.ll-vis-true    { background: var(--green-light); border-color: var(--green); }
.ll-vis-true    .ll-vis-val { color: #15803d; }
/* active highlight */
.ll-vis-active  { border-color: var(--orange) !important; transform: scale(1.05); }
/* Unallocated placeholder */
.ll-arr-unalloc { font-size: 11px; font-style: italic; color: var(--muted); padding: 8px 12px; background: var(--surface2); border: 1px dashed var(--border2); border-radius: var(--radius-sm); }
/* Relaxation box */
.ll-calc-box  { padding: 6px 12px; background: var(--surface2); border: 1px solid var(--border); border-radius: var(--radius-sm); font-family: monospace; font-size: 12px; }
.ll-calc-expr { color: var(--text); }
.ll-calc-ok   { color: #15803d; font-weight: 700; }
.ll-calc-no   { color: var(--red); font-weight: 700; }
/* Empty */
.ll-empty-matrix-msg { padding: 24px 16px; text-align: center; color: var(--muted); font-size: 12px; font-weight: 600; border: 1px dashed var(--border2); border-radius: var(--radius-sm); background: var(--surface2); }
.ll-empty-graph-msg  { display: flex; align-items: center; justify-content: center; height: 100%; width: 100%; color: #64748b; font-size: 14px; font-weight: 600; text-align: center; }
/* Legend */
.ll-legend { display: flex; gap: 12px; padding: 6px 16px; background: var(--surface); border-bottom: 1px solid var(--border); flex-wrap: wrap; flex-shrink: 0; }
.ll-leg { display: flex; align-items: center; gap: 5px; font-size: 11px; color: var(--text2); }
.ll-legdot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
.ll-legdot-unvis   { background: #eff6ff; border: 1.5px solid #3b82f6; }
.ll-legdot-active  { background: #fff7ed; border: 1.5px solid #f97316; }
.ll-legdot-nbr     { background: #f3e8ff; border: 1.5px solid #9333ea; }
.ll-legdot-visited { background: #f0fdf4; border: 1.5px solid #22c55e; }
.ll-legdot-path    { background: #f0fdf4; border: 2px solid #22c55e; }
/* Variable frames */
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
/* Badge */
.ll-badge-wrap { padding: 6px 16px; background: var(--surface); border-bottom: 1px solid var(--border); flex-shrink: 0; }
.ll-badge { background: var(--surface2); border-left: 3px solid var(--coral); padding: 5px 10px; font-size: 11.5px; color: var(--text); font-family: monospace; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }
/* Resizers */
.ll-resizer  { width: 5px; background: var(--border); cursor: col-resize; transition: background .15s; flex-shrink: 0; }
.ll-resizer:hover, .ll-resizer.drag  { background: var(--coral); }
.ll-vresizer { height: 5px; background: var(--border); cursor: row-resize; transition: background .15s; flex-shrink: 0; }
.ll-vresizer:hover, .ll-vresizer.drag { background: var(--coral); }
/* Right panel */
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
/* Footer */
.ll-footer { padding: 4px 16px; font-size: 11px; color: var(--muted); border-top: 1px solid var(--border); background: var(--surface); flex-shrink: 0; display: flex; align-items: center; }
.ll-speed-wrap { display: flex; align-items: center; gap: 5px; margin-left: 16px; }
.ll-speed-wrap input[type=range] { width: 90px; accent-color: var(--coral); }
.ll-nav-controls { display: flex; margin-left: auto; align-items: center; gap: 4px; flex-shrink: 0; flex-wrap: wrap; }
.ll-nav-btn  { background: var(--surface2); border: 1px solid var(--border2); color: var(--text2); padding: 5px 11px; border-radius: var(--radius-sm); cursor: pointer; font-size: 12px; font-weight: 500; transition: all .15s; white-space: nowrap; }
.ll-nav-btn:hover { background: var(--surface); border-color: var(--coral); color: var(--coral); }
.ll-play-btn { background: var(--blue-light); border: 1px solid var(--blue); color: var(--blue); min-width: 72px; font-weight: 600; padding: 5px 11px; border-radius: var(--radius-sm); cursor: pointer; font-size: 12px; transition: all .15s; }
.ll-play-btn:hover { background: var(--blue); color: #fff; }
/* Graph Modal */
.graph-modal-backdrop { position: fixed; top: 0; left: 0; right: 0; bottom: 55px; background: rgba(15,23,42,0.55); backdrop-filter: blur(3px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 16px 24px 20px; }
.graph-modal-card { background: #fff; border-radius: 12px; box-shadow: 0 20px 25px -5px rgba(0,0,0,.15),0 10px 10px -5px rgba(0,0,0,.04); width: 740px; max-width: 95vw; max-height: calc(100vh - 120px); display: flex; flex-direction: column; overflow: hidden; border: 1px solid var(--border); animation: ll-pop .25s ease-out; }
.graph-modal-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 18px; background: #f8fafc; border-bottom: 1px solid var(--border); }
.graph-modal-title  { font-size: 14px; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 8px; }
.graph-subtitle     { font-size: 11px; font-weight: 500; color: #64748b; }
.graph-close-btn    { background: none; border: none; font-size: 22px; color: #64748b; cursor: pointer; line-height: 1; padding: 0 4px; border-radius: 4px; transition: color .15s; }
.graph-close-btn:hover { color: #ef4444; }
.graph-modal-body   { padding: 12px 16px; display: flex; justify-content: center; background: #fff; overflow: auto; }
.graph-modal-svg    { width: 100%; max-height: 390px; }
/* SVG Edges */
.ll-edge-line          { stroke: #cbd5e1; stroke-width: 2.5px; transition: all .15s ease; }
.ll-edge-active        { stroke: #f97316; stroke-width: 4px; stroke-dasharray: 6 3; animation: ll-dash 1s linear infinite; }
.ll-edge-tree          { stroke: #22c55e !important; stroke-width: 3.5px !important; }
.ll-edge-hovered       { stroke: #3b82f6 !important; stroke-width: 4px !important; filter: drop-shadow(0 0 6px rgba(59,130,246,.6)); }
.ll-edge-path-hovered  { stroke: #ef4444 !important; stroke-width: 4px !important; stroke-dasharray: 8 4; animation: ll-flow-dash 0.65s linear infinite; filter: drop-shadow(0 0 8px rgba(239,68,68,.85)); }
@keyframes ll-dash      { to { stroke-dashoffset: -18; } }
@keyframes ll-flow-dash { to { stroke-dashoffset: -24; } }
@keyframes ll-node-pulse {
  from { filter: drop-shadow(0 0 4px rgba(239, 68, 68, 0.4)); }
  to   { filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.9)); }
}
/* Edge weight labels */
.ll-weight-label          { font-size: 11px; font-weight: 700; font-family: monospace; text-anchor: middle; fill: #475569; }
.ll-wlabel-active         { fill: #ea580c !important; }
.ll-wlabel-tree           { fill: #15803d !important; }
.ll-wlabel-path-hover     { fill: #dc2626 !important; font-weight: 800 !important; }
.ll-wlabel-bg             { fill: #fff; stroke: #e2e8f0; stroke-width: 1; opacity: .9; }
.ll-wlabel-bg-active      { fill: #fff7ed !important; stroke: #f97316 !important; }
.ll-wlabel-bg-tree        { fill: #f0fdf4 !important; stroke: #22c55e !important; }
.ll-wlabel-bg-path-hover  { fill: #fef2f2 !important; stroke: #ef4444 !important; stroke-width: 1.5; opacity: 1; }
/* Dist label above node (matches edge weight style) */
.ll-node-dist-label       { font-size: 15px; font-weight: 700; font-family: monospace; text-anchor: middle; fill: #9333ea; }
.ll-ndist-done            { fill: #15803d !important; font-weight: 800 !important; }
.ll-ndist-active          { fill: #ea580c !important; font-weight: 800 !important; }
.ll-ndist-nbr             { fill: #9333ea !important; font-weight: 800 !important; }
.ll-ndist-path-hover      { fill: #dc2626 !important; font-weight: 800 !important; }
.ll-ndist-bg              { fill: #fff; stroke: #e2e8f0; stroke-width: 1; opacity: .9; }
.ll-ndist-bg-done         { fill: #f0fdf4 !important; stroke: #22c55e !important; }
.ll-ndist-bg-active       { fill: #fff7ed !important; stroke: #f97316 !important; }
.ll-ndist-bg-nbr          { fill: #f3e8ff !important; stroke: #9333ea !important; }
.ll-ndist-bg1             { fill: #ffffffd5; stroke: #9333ea; stroke-width: 1; }
.ll-ndist-bg-path-hover   { fill: #fef2f2 !important; stroke: #ef4444 !important; stroke-width: 1.5; }
/* Nodes */
.ll-node-circle        { fill: #eff6ff; stroke: #3b82f6; stroke-width: 2.5; transition: all .25s ease; }
.ll-node-u             { fill: #fff7ed !important; stroke: #f97316 !important; stroke-width: 3.5 !important; }
.ll-node-v             { fill: #f3e8ff !important; stroke: #9333ea !important; stroke-width: 3.5 !important; }
.ll-node-visited       { fill: #f0fdf4 !important; stroke: #22c55e !important; stroke-width: 3 !important; }
.ll-node-path-hover    { fill: #fee2e2 !important; stroke: #ef4444 !important; stroke-width: 3.5px !important; animation: ll-node-pulse 1.2s ease-in-out infinite alternate; }
.ll-node-hover-src     { fill: #fff7ed !important; stroke: #f97316 !important; stroke-width: 3.5px !important; filter: drop-shadow(0 0 8px rgba(249,115,22,.55)); }
.ll-node-hover-tgt     { fill: #f0fdf4 !important; stroke: #22c55e !important; stroke-width: 3.5px !important; filter: drop-shadow(0 0 8px rgba(34,197,94,.55)); }
.ll-node-text           { font-size: 13px; font-weight: 800; font-family: monospace; text-anchor: middle; fill: #1e293b; }
.ll-node-text-path-hover{ fill: #dc2626 !important; font-weight: 900 !important; }
.ll-node-text-hover-src { fill: #c2410c !important; font-weight: 900 !important; }
.ll-node-text-hover-tgt { fill: #15803d !important; font-weight: 900 !important; }
/* SVG pointer labels */
.ll-svg-ptr           { font-size: 13px; font-weight: 800; font-family: monospace; text-anchor: middle; }
.ll-svg-ptr-blue      { fill: #3b82f6; }
.ll-svg-ptr-orange    { fill: #ea580c; }
.ll-svg-ptr-purple    { fill: #9333ea; }
.ll-svg-ptr-hover-src { fill: #ea580c !important; font-weight: 900 !important; }
.ll-svg-ptr-hover-tgt { fill: #16a34a !important; font-weight: 900 !important; }
/* Responsive */
@media (max-width: 900px) {
  .ll-main { flex-direction: column; }
  .ll-left-col, .ll-right-col { max-width: 100% !important; width: 100% !important; }
  .ll-resizer { display: none; }
  .ll-toolbar { flex-direction: column; align-items: stretch; }
  .ll-nav-controls { margin-left: 0; justify-content: center; }
}
</style>
