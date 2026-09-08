<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, watch } from 'vue';

defineProps({
  topic: { type: String, default: 'Cycle Detection in Directed Graph' },
  subTopic: { type: String, default: 'Depth-First Search (DFS) & Recursion Stack' }
});

// ─────────────────────────────────────────────────────────────────────────────
// CODE DEFINITIONS (Java, C, C++, Python, JavaScript)
// ─────────────────────────────────────────────────────────────────────────────
const CODES = {
  java: [
    ['', 'class CycleDetectionGraph {'],
    ['c_dfs_entry',         '    private boolean dfs(int u, boolean[] visited, boolean[] inStack, int[][] adj, int V) {'],
    ['c_mark_vis',          '        visited[u] = true;'],
    ['c_mark_instack',      '        inStack[u] = true;'],
    ['c_for_nbr',           '        for (int v = 0; v < V; v++) {'],
    ['c_check_edge',        '            if (adj[u][v] == 1) {'],
    ['c_check_nbr_vis',     '                if (!visited[v]) {'],
    ['c_call_dfs_rec',      '                    if (dfs(v, visited, inStack, adj, V)) {'],
    ['c_return_true_rec',   '                        return true;'],
    ['',                    '                    }'],
    ['c_check_instack',     '                } else if (inStack[v]) {'],
    ['c_found_cycle',       '                    return true; // Cycle detected! Back edge u -> v'],
    ['',                    '                }'],
    ['',                    '            }'],
    ['',                    '        }'],
    ['c_unmark_instack',    '        inStack[u] = false;'],
    ['c_return_false_dfs',  '        return false;'],
    ['',                    '    }'],
    ['', ''],
    ['c_entry_main',        '    public boolean isCyclic(int[][] adj, int V) {'],
    ['c_init_visited',      '        boolean[] visited = new boolean[V];'],
    ['c_init_instack',      '        boolean[] inStack = new boolean[V];'],
    ['c_outer_loop',        '        for (int i = 0; i < V; i++) {'],
    ['c_check_unvisited',   '            if (!visited[i]) {'],
    ['c_call_dfs_main',     '                if (dfs(i, visited, inStack, adj, V)) {'],
    ['c_return_true_main',  '                    return true;'],
    ['',                    '                }'],
    ['',                    '            }'],
    ['',                    '        }'],
    ['c_return_false_main', '        return false;'],
    ['c_done',              '    }'],
    ['', '}']
  ],
  c: [
    ['', '#include <stdio.h>'],
    ['', '#include <stdbool.h>'],
    ['', '#define MAX 10'],
    ['', ''],
    ['c_dfs_entry',         'bool dfs(int u, bool visited[], bool inStack[], int adj[MAX][MAX], int V) {'],
    ['c_mark_vis',          '    visited[u] = true;'],
    ['c_mark_instack',      '    inStack[u] = true;'],
    ['c_for_nbr',           '    for (int v = 0; v < V; v++) {'],
    ['c_check_edge',        '        if (adj[u][v] == 1) {'],
    ['c_check_nbr_vis',     '            if (!visited[v]) {'],
    ['c_call_dfs_rec',      '                if (dfs(v, visited, inStack, adj, V))'],
    ['c_return_true_rec',   '                    return true;'],
    ['c_check_instack',     '            } else if (inStack[v]) {'],
    ['c_found_cycle',       '                return true; // Cycle detected! Back edge u -> v'],
    ['',                    '            }'],
    ['',                    '        }'],
    ['',                    '    }'],
    ['c_unmark_instack',    '    inStack[u] = false;'],
    ['c_return_false_dfs',  '    return false;'],
    ['',                    '}'],
    ['', ''],
    ['c_entry_main',        'bool isCyclic(int adj[MAX][MAX], int V) {'],
    ['c_init_visited',      '    bool visited[MAX] = {false};'],
    ['c_init_instack',      '    bool inStack[MAX] = {false};'],
    ['c_outer_loop',        '    for (int i = 0; i < V; i++) {'],
    ['c_check_unvisited',   '        if (!visited[i]) {'],
    ['c_call_dfs_main',     '            if (dfs(i, visited, inStack, adj, V))'],
    ['c_return_true_main',  '                return true;'],
    ['',                    '        }'],
    ['',                    '    }'],
    ['c_return_false_main', '    return false;'],
    ['c_done',              '}']
  ],
  cpp: [
    ['', '#include <iostream>'],
    ['', '#include <vector>'],
    ['', 'using namespace std;'],
    ['', ''],
    ['', 'class CycleDetectionGraph {'],
    ['', 'public:'],
    ['c_dfs_entry',         '    bool dfs(int u, vector<bool>& visited, vector<bool>& inStack, vector<vector<int>>& adj, int V) {'],
    ['c_mark_vis',          '        visited[u] = true;'],
    ['c_mark_instack',      '        inStack[u] = true;'],
    ['c_for_nbr',           '        for (int v = 0; v < V; v++) {'],
    ['c_check_edge',        '            if (adj[u][v] == 1) {'],
    ['c_check_nbr_vis',     '                if (!visited[v]) {'],
    ['c_call_dfs_rec',      '                    if (dfs(v, visited, inStack, adj, V))'],
    ['c_return_true_rec',   '                        return true;'],
    ['c_check_instack',     '                } else if (inStack[v]) {'],
    ['c_found_cycle',       '                    return true; // Cycle detected! Back edge u -> v'],
    ['',                    '                }'],
    ['',                    '            }'],
    ['',                    '        }'],
    ['c_unmark_instack',    '        inStack[u] = false;'],
    ['c_return_false_dfs',  '        return false;'],
    ['',                    '    }'],
    ['', ''],
    ['c_entry_main',        '    bool isCyclic(vector<vector<int>>& adj, int V) {'],
    ['c_init_visited',      '        vector<bool> visited(V, false);'],
    ['c_init_instack',      '        vector<bool> inStack(V, false);'],
    ['c_outer_loop',        '        for (int i = 0; i < V; i++) {'],
    ['c_check_unvisited',   '            if (!visited[i]) {'],
    ['c_call_dfs_main',     '                if (dfs(i, visited, inStack, adj, V))'],
    ['c_return_true_main',  '                    return true;'],
    ['',                    '            }'],
    ['',                    '        }'],
    ['c_return_false_main', '        return false;'],
    ['c_done',              '    }'],
    ['',                    '};']
  ],
  python: [
    ['', 'class CycleDetectionGraph:'],
    ['c_dfs_entry',         '    def dfs(self, u, visited, in_stack, adj, V):'],
    ['c_mark_vis',          '        visited[u] = True'],
    ['c_mark_instack',      '        in_stack[u] = True'],
    ['c_for_nbr',           '        for v in range(V):'],
    ['c_check_edge',        '            if adj[u][v] == 1:'],
    ['c_check_nbr_vis',     '                if not visited[v]:'],
    ['c_call_dfs_rec',      '                    if self.dfs(v, visited, in_stack, adj, V):'],
    ['c_return_true_rec',   '                        return True'],
    ['c_check_instack',     '                elif in_stack[v]:'],
    ['c_found_cycle',       '                    return True  # Cycle detected! Back edge u -> v'],
    ['c_unmark_instack',    '        in_stack[u] = False'],
    ['c_return_false_dfs',  '        return False'],
    ['', ''],
    ['c_entry_main',        '    def is_cyclic(self, adj, V):'],
    ['c_init_visited',      '        visited = [False] * V'],
    ['c_init_instack',      '        in_stack = [False] * V'],
    ['c_outer_loop',        '        for i in range(V):'],
    ['c_check_unvisited',   '            if not visited[i]:'],
    ['c_call_dfs_main',     '                if self.dfs(i, visited, in_stack, adj, V):'],
    ['c_return_true_main',  '                    return True'],
    ['c_return_false_main', '        return False'],
    ['c_done',              '']
  ],
  javascript: [
    ['', 'class CycleDetectionGraph {'],
    ['c_dfs_entry',         '  dfs(u, visited, inStack, adj, V) {'],
    ['c_mark_vis',          '    visited[u] = true;'],
    ['c_mark_instack',      '    inStack[u] = true;'],
    ['c_for_nbr',           '    for (let v = 0; v < V; v++) {'],
    ['c_check_edge',        '      if (adj[u][v] === 1) {'],
    ['c_check_nbr_vis',     '        if (!visited[v]) {'],
    ['c_call_dfs_rec',      '          if (this.dfs(v, visited, inStack, adj, V)) {'],
    ['c_return_true_rec',   '            return true;'],
    ['',                    '          }'],
    ['c_check_instack',     '        } else if (inStack[v]) {'],
    ['c_found_cycle',       '          return true; // Cycle detected! Back edge u -> v'],
    ['',                    '        }'],
    ['',                    '      }'],
    ['',                    '    }'],
    ['c_unmark_instack',    '    inStack[u] = false;'],
    ['c_return_false_dfs',  '    return false;'],
    ['',                    '  }'],
    ['', ''],
    ['c_entry_main',        '  isCyclic(adj, V) {'],
    ['c_init_visited',      '    const visited = new Array(V).fill(false);'],
    ['c_init_instack',      '    const inStack = new Array(V).fill(false);'],
    ['c_outer_loop',        '    for (let i = 0; i < V; i++) {'],
    ['c_check_unvisited',   '      if (!visited[i]) {'],
    ['c_call_dfs_main',     '        if (this.dfs(i, visited, inStack, adj, V)) {'],
    ['c_return_true_main',  '          return true;'],
    ['',                    '        }'],
    ['',                    '      }'],
    ['',                    '    }'],
    ['c_return_false_main', '    return false;'],
    ['c_done',              '  }'],
    ['', '}']
  ]
};

const PSEUDOCODE = [
  'function DFS(u, visited, inStack, adj, V):',
  '    visited[u] = true',
  '    inStack[u] = true',
  '    for each neighbor v from 0 to V - 1:',
  '        if adj[u][v] == 1:',
  '            if not visited[v]:',
  '                if DFS(v, visited, inStack, adj, V) == true:',
  '                    return true',
  '            else if inStack[v] == true:',
  '                return true    // Cycle detected! Back edge u -> v found',
  '    inStack[u] = false',
  '    return false',
  '',
  'function IS_CYCLIC(adj, V):',
  '    visited = boolean array of size V (all false)',
  '    inStack = boolean array of size V (all false)',
  '    for i from 0 to V - 1:',
  '        if not visited[i]:',
  '            if DFS(i, visited, inStack, adj, V) == true:',
  '                return true',
  '    return false'
];

const PSEUDOCODE_MAP = {
  'c_dfs_entry':         0,
  'c_mark_vis':          1,
  'c_mark_instack':      2,
  'c_for_nbr':           3,
  'c_check_edge':        4,
  'c_check_nbr_vis':     5,
  'c_call_dfs_rec':      6,
  'c_return_true_rec':   7,
  'c_check_instack':     8,
  'c_found_cycle':       9,
  'c_unmark_instack':    10,
  'c_return_false_dfs':  11,
  'c_entry_main':        13,
  'c_init_visited':      14,
  'c_init_instack':      15,
  'c_outer_loop':        16,
  'c_check_unvisited':   17,
  'c_call_dfs_main':     18,
  'c_return_true_main':  19,
  'c_return_false_main': 20,
  'c_done':              -1
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function frame(title, rows) { return { title, rows }; }

function parseDirectedEdges(str) {
  if (!str || !str.trim()) return [];
  try {
    const parsed = JSON.parse(str);
    if (Array.isArray(parsed)) {
      return parsed
        .filter(e => Array.isArray(e) && e.length >= 2)
        .map(e => ({ u: parseInt(e[0]), v: parseInt(e[1]) }))
        .filter(e => !isNaN(e.u) && !isNaN(e.v));
    }
  } catch (err) {
    const matches = (str || '').match(/\[\s*\d+\s*,\s*\d+\s*(?:,\s*\d+\s*)?\]/g);
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

// ─────────────────────────────────────────────────────────────────────────────
// STEP BUILDER
// Simulates DFS with Recursion Stack cycle detection line-by-line.
// Captures exact state snapshots, variable stack frames, and animation indicators.
// ─────────────────────────────────────────────────────────────────────────────
function buildSteps(VInput, edgesStr) {
  const steps = [];
  const V = Math.max(0, Math.min(10, parseInt(VInput) || 0));
  const parsedEdges = parseDirectedEdges(edgesStr);

  // ── Mutable algorithm state ─────────────────────────────────────────────
  const visited = new Array(V).fill(false);
  const inStack = new Array(V).fill(false);
  const treeEdges = [];
  const recStack = [];
  const callStack = [];
  const traversal = [];

  let visitedAllocated = false;
  let inStackAllocated = false;

  // Cycle tracking
  let cycleDetected = false;
  let backEdge = null;
  let cyclePath = [];
  let cycleEdges = [];
  let cycleNodesSet = new Set();

  function snap(edgeCheckInfo, customCycleInfo) {
    const cInfo = customCycleInfo || {
      detected: cycleDetected,
      backEdge: backEdge ? { ...backEdge } : null,
      cyclePath: [...cyclePath],
      cycleEdges: cycleEdges.map(e => ({ ...e })),
      cycleNodes: Array.from(cycleNodesSet)
    };

    return {
      visitedArr: [...visited],
      inStackArr: [...inStack],
      visitedAllocated,
      inStackAllocated,
      recStack: [...recStack],
      traversal: [...traversal],
      treeEdges: treeEdges.map(e => ({ ...e })),
      edgeCheckInfo: edgeCheckInfo ? { ...edgeCheckInfo } : null,
      cycleInfo: cInfo
    };
  }

  function addStep(code, badge, activeU, activeV, edgeCheckInfo, customCycleInfo, activeI = -1) {
    const varsSnapshot = callStack.map(f => ({
      title: f.title,
      rows: f.rows.map(r => [r[0], r[1]])
    }));

    steps.push({
      badge,
      code,
      vars: varsSnapshot,
      V,
      edges: parsedEdges,
      activeI: activeI === undefined ? -1 : activeI,
      activeU: activeU === undefined ? -1 : activeU,
      activeV: activeV === undefined ? -1 : activeV,
      ...snap(edgeCheckInfo, customCycleInfo)
    });
  }

  // ── Empty-graph guard ───────────────────────────────────────────────────
  if (V === 0) {
    callStack.push(frame('main()', []));
    callStack.push(frame('isCyclic(adj, 0)', [['V', '0']]));
    addStep('', 'Vertices = 0. No graph to analyze for cycle detection.', -1, -1);
    return steps;
  }

  // ── Build adjacency matrix ──────────────────────────────────────────────
  const adj = Array.from({ length: V }, () => new Array(V).fill(0));
  parsedEdges.forEach(e => {
    if (e.u >= 0 && e.u < V && e.v >= 0 && e.v < V) {
      adj[e.u][e.v] = 1;
    }
  });

  // ══════════════════════════════════════════════════════════════════════════
  // INITIALIZATION & MAIN FUNCTION ENTRY
  // ══════════════════════════════════════════════════════════════════════════
  callStack.push(frame('main()', []));
  callStack.push(frame('isCyclic(adj, ' + V + ')', [['V', String(V)]]));

  // Step 1: Function entry
  addStep('c_entry_main',
    'isCyclic(adj, ' + V + ') called \u2192 Starting DFS-based Directed Graph Cycle Detection over ' + V + ' vertices',
    -1, -1);

  // Step 2: visited array allocation
  visitedAllocated = true;
  callStack[1].rows = [['V', String(V)], ['visited', 'boolean[' + V + ']']];
  addStep('c_init_visited',
    'boolean[] visited = new boolean[' + V + '] \u2192 Allocated visited array (all initialized to false)',
    -1, -1);

  // Step 3: inStack array allocation
  inStackAllocated = true;
  callStack[1].rows = [['V', String(V)], ['visited', '[' + visited.join(', ') + ']'], ['inStack', 'boolean[' + V + ']']];
  addStep('c_init_instack',
    'boolean[] inStack = new boolean[' + V + '] \u2192 Allocated inStack (recursion stack) array (all initialized to false)',
    -1, -1);

  // ══════════════════════════════════════════════════════════════════════════
  // RECURSIVE DFS SIMULATION HELPER
  // ══════════════════════════════════════════════════════════════════════════
  function dfsSim(u) {
    recStack.push(u);

    const dfsFrameIdx = callStack.length;
    callStack.push(frame('dfs(u=' + u + ')', [
      ['u', String(u)],
      ['visited[' + u + ']', 'true'],
      ['inStack[' + u + ']', 'true']
    ]));

    // Step: dfs entry
    addStep('c_dfs_entry',
      'dfs(u=' + u + ') called \u2192 Entering DFS for vertex ' + u + '. Call stack depth: ' + recStack.length,
      u, -1);

    // Step: mark visited
    visited[u] = true;
    traversal.push(u);
    addStep('c_mark_vis',
      'visited[' + u + '] = true \u2192 Vertex ' + u + ' is marked as visited in the global traversal',
      u, -1);

    // Step: mark inStack
    inStack[u] = true;
    addStep('c_mark_instack',
      'inStack[' + u + '] = true \u2192 Vertex ' + u + ' added to active recursion stack (state: visiting / inStack)',
      u, -1);

    // Check all possible neighbors 0..V-1
    for (let v = 0; v < V; v++) {
      callStack[dfsFrameIdx].rows = [
        ['u', String(u)],
        ['v', String(v)],
        ['visited[' + u + ']', 'true'],
        ['inStack[' + u + ']', 'true']
      ];

      addStep('c_for_nbr',
        'for (v = ' + v + '; v < ' + V + '; ...) \u2192 Vertex ' + u + ' examining potential directed edge (' + u + ' \u2192 ' + v + ')',
        u, v);

      const hasEdge = adj[u][v] === 1;

      addStep('c_check_edge',
        'if (adj[' + u + '][' + v + '] == 1) \u2192 ' +
          (hasEdge ? 'True \u2192 Directed edge (' + u + ' \u2192 ' + v + ') exists in graph' : 'False (adj[' + u + '][' + v + '] = 0) \u2192 No edge, skip neighbor ' + v),
        u, v,
        { from: u, to: v, hasEdge, nbrVis: visited[v], nbrInStack: inStack[v], classification: hasEdge ? (inStack[v] ? 'Back Edge' : (!visited[v] ? 'Tree Edge' : 'Cross / Forward Edge')) : 'No Edge' });

      if (hasEdge) {
        const isNbrUnvisited = !visited[v];

        addStep('c_check_nbr_vis',
          'if (!visited[' + v + ']) \u2192 visited[' + v + '] = ' + visited[v] +
            ' \u2192 ' + (isNbrUnvisited ? 'True \u2192 Neighbor ' + v + ' is unvisited, explore deeper' : 'False \u2192 Neighbor ' + v + ' has already been visited'),
          u, v,
          { from: u, to: v, hasEdge: true, nbrVis: visited[v], nbrInStack: inStack[v], classification: isNbrUnvisited ? 'Tree Edge' : (inStack[v] ? 'Back Edge' : 'Cross / Forward Edge') });

        if (isNbrUnvisited) {
          treeEdges.push({ u, v });

          addStep('c_call_dfs_rec',
            'if (dfs(' + v + ', visited, inStack, adj, ' + V + ')) \u2192 Invoking recursive DFS call on neighbor ' + v,
            u, v,
            { from: u, to: v, hasEdge: true, nbrVis: visited[v], nbrInStack: inStack[v], classification: 'Tree Edge' });

          const found = dfsSim(v);

          if (found) {
            // Restore call frame rows for current level
            callStack[dfsFrameIdx].rows = [
              ['u', String(u)],
              ['v', String(v)],
              ['dfs(' + v + ')', 'true']
            ];

            addStep('c_return_true_rec',
              'return true \u2192 Propagating cycle detection from recursive call dfs(' + v + ') back to vertex ' + u,
              u, v,
              { from: u, to: v, hasEdge: true, nbrVis: true, nbrInStack: inStack[v], classification: 'Tree Edge (Cycle Return)' });

            return true;
          }
        } else {
          // Neighbor already visited: check if it is in recursion stack
          const isNbrInStack = inStack[v];

          addStep('c_check_instack',
            '} else if (inStack[' + v + ']) \u2192 inStack[' + v + '] = ' + isNbrInStack +
              ' \u2192 ' + (isNbrInStack ? 'TRUE \u2192 Back Edge (' + u + ' \u2192 ' + v + ') DETECTED! (Cycle found)' : 'False \u2192 Cross/Forward edge to fully explored node ' + v + ', no cycle on this edge'),
            u, v,
            { from: u, to: v, hasEdge: true, nbrVis: true, nbrInStack: isNbrInStack, classification: isNbrInStack ? 'Back Edge' : 'Cross / Forward Edge' });

          if (isNbrInStack) {
            cycleDetected = true;
            backEdge = { u, v };

            // Reconstruct the cycle path from recursion stack
            const startIdx = recStack.indexOf(v);
            const cycleNodes = startIdx !== -1 ? recStack.slice(startIdx) : [v, u];
            cyclePath = [...cycleNodes, v];
            cycleNodesSet = new Set(cycleNodes);

            cycleEdges = [];
            for (let k = 0; k < cycleNodes.length; k++) {
              const fromN = cycleNodes[k];
              const toN = (k + 1 < cycleNodes.length) ? cycleNodes[k + 1] : v;
              cycleEdges.push({ u: fromN, v: toN });
            }

            addStep('c_found_cycle',
              'return true \u2192 Cycle detected! Back edge (' + u + ' \u2192 ' + v + ') closes cycle: [' + cyclePath.join(' \u2192 ') + ']',
              u, v,
              { from: u, to: v, hasEdge: true, nbrVis: true, nbrInStack: true, classification: 'Back Edge (Cycle Found)' });

            return true;
          }
        }
      }
    }

    // Finished exploring all branches from vertex u: backtrack
    inStack[u] = false;
    recStack.pop();

    callStack[dfsFrameIdx].rows = [
      ['u', String(u)],
      ['inStack[' + u + ']', 'false'],
      ['result', 'false']
    ];

    addStep('c_unmark_instack',
      'inStack[' + u + '] = false \u2192 Backtracking: vertex ' + u + ' and its descendants fully explored, removed from recursion stack',
      u, -1);

    addStep('c_return_false_dfs',
      'return false \u2192 No cycle detected in the subtree rooted at vertex ' + u,
      u, -1);

    callStack.pop();
    return false;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // OUTER LOOP ACROSS ALL VERTICES (DISCONNECTED COMPONENTS SUPPORT)
  // ══════════════════════════════════════════════════════════════════════════
  for (let i = 0; i < V; i++) {
    callStack[1].rows = [
      ['V', String(V)],
      ['i', String(i)],
      ['visited[' + i + ']', String(visited[i])]
    ];

    addStep('c_outer_loop',
      'for (i = ' + i + '; i < ' + V + '; ...) \u2192 Outer component loop: checking vertex ' + i + ' of ' + V,
      -1, -1, null, null, i);

    const isUnvisited = !visited[i];

    addStep('c_check_unvisited',
      'if (!visited[' + i + ']) \u2192 visited[' + i + '] = ' + visited[i] +
        ' \u2192 ' + (isUnvisited ? 'True \u2192 Starting new DFS component exploration from vertex ' + i : 'False \u2192 Vertex ' + i + ' already visited in earlier DFS, skip'),
      -1, -1, null, null, i);

    if (isUnvisited) {
      addStep('c_call_dfs_main',
        'if (dfs(' + i + ', visited, inStack, adj, ' + V + ')) \u2192 Launching DFS traversal from root vertex ' + i,
        -1, -1, null, null, i);

      const hasCycle = dfsSim(i);

      if (hasCycle) {
        callStack[1].rows = [
          ['V', String(V)],
          ['i', String(i)],
          ['result', 'true (Cycle Found)']
        ];

        addStep('c_return_true_main',
          'return true \u2192 Directed Cycle detected in graph! isCyclic() returns true.',
          -1, -1, null, null, i);

        addStep('c_done',
          'Cycle Detection Complete! The graph contains a directed cycle: [' + cyclePath.join(' \u2192 ') + ']. Back edge: (' + backEdge.u + ' \u2192 ' + backEdge.v + ')',
          -1, -1, null, null, -1);

        return steps;
      }
    }
  }

  // No cycle found across all vertices
  callStack[1].rows = [
    ['V', String(V)],
    ['result', 'false (DAG)']
  ];

  addStep('c_return_false_main',
    'return false \u2192 All ' + V + ' vertices and edges explored without finding any back edges. The graph is a Directed Acyclic Graph (DAG).',
    -1, -1, null, null, -1);

  addStep('c_done',
    'Cycle Detection Complete! No cycle exists in this graph. The directed graph is acyclic (DAG).',
    -1, -1, null, null, -1);

  return steps;
}

// ─────────────────────────────────────────────────────────────────────────────
// REACTIVE STATE
// ─────────────────────────────────────────────────────────────────────────────
const DEFAULT_V     = 4;
const DEFAULT_EDGES = '[[0,1],[1,2],[2,0],[2,3]]';

const numVInput      = ref(DEFAULT_V);
const edgesInputStr  = ref(DEFAULT_EDGES);
const lang           = ref('java');
const speed          = ref(650);
const si             = ref(0);
const playing        = ref(false);
const vizHeight      = ref(350);
const tableHeight    = ref(70);
const leftWidth      = ref(58);
const rightTab       = ref('code');
const showGraphModal = ref(false);
const hoveredEdge    = ref(null);
const hoveredNode    = ref(null);

const stepsData = reactive({ steps: buildSteps(DEFAULT_V, DEFAULT_EDGES) });
const steps     = computed(() => stepsData.steps);
const s         = computed(() => steps.value[Math.max(0, Math.min(si.value, steps.value.length - 1))] || {});
const codeLines = computed(() => CODES[lang.value] || []);

// ── Computed Graph Highlights ─────────────────────────────────────────────
function isCycleNode(id) {
  return s.value.cycleInfo && s.value.cycleInfo.detected && s.value.cycleInfo.cycleNodes && s.value.cycleInfo.cycleNodes.includes(id);
}

function isCycleEdge(u, v) {
  if (!s.value.cycleInfo || !s.value.cycleInfo.detected || !s.value.cycleInfo.cycleEdges) return false;
  return s.value.cycleInfo.cycleEdges.some(e => e.u === u && e.v === v);
}

function isBackEdge(u, v) {
  if (!s.value.cycleInfo || !s.value.cycleInfo.backEdge) return false;
  return s.value.cycleInfo.backEdge.u === u && s.value.cycleInfo.backEdge.v === v;
}

function isTreeEdge(u, v) {
  return (s.value.treeEdges || []).some(e => e.u === u && e.v === v);
}

function isActiveEdge(u, v) {
  return u === s.value.activeU && v === s.value.activeV;
}

function isEdgeHovered(u, v) {
  return hoveredEdge.value && hoveredEdge.value.u === u && hoveredEdge.value.v === v;
}

function isNodeHoveredSource(id) {
  return hoveredEdge.value && hoveredEdge.value.u === id;
}

function isNodeHoveredTarget(id) {
  return (hoveredEdge.value && hoveredEdge.value.v === id) || (hoveredNode.value === id);
}

// ─────────────────────────────────────────────────────────────────────────────
// NODE POSITIONS & GEOMETRY (Matching DirectedUnWeightedGraphMatrix.vue)
// ─────────────────────────────────────────────────────────────────────────────
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
  if (!uNode || !vNode) return { pathD: '', isBi: false, isLoop: false };

  // Self loop (u === v)
  if (edge.u === edge.v) {
    const x0 = uNode.x, y0 = uNode.y;
    const gCx = 360, gCy = 230;
    let dx = x0 - gCx, dy = y0 - gCy;
    let dist = Math.hypot(dx, dy);
    if (dist < 1e-3) { dx = 0; dy = -1; dist = 1; }
    const dirX = dx / dist, dirY = dy / dist;
    const px = -dirY, py = dirX;

    const nodeR = 20;
    const loopOffset = 38;

    const startX = x0 + dirX * nodeR - px * 10;
    const startY = y0 + dirY * nodeR - py * 10;
    const endX = x0 + dirX * nodeR + px * 10;
    const endY = y0 + dirY * nodeR + py * 10;

    const c1X = startX + dirX * loopOffset - px * 14;
    const c1Y = startY + dirY * loopOffset - py * 14;
    const c2X = endX + dirX * loopOffset + px * 14;
    const c2Y = endY + dirY * loopOffset + py * 14;

    const pathD = `M ${startX} ${startY} C ${c1X} ${c1Y}, ${c2X} ${c2Y}, ${endX} ${endY}`;
    return { pathD, isBi: false, isLoop: true };
  }

  // Normal edge (u !== v)
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

  return { pathD, isBi, isLoop: false };
}

function getEdgeGeo(edge) {
  return getEdgeGeometry(edge, modalNodePositions.value, s.value.edges || [], 32);
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTROLS & TIMERS
// ─────────────────────────────────────────────────────────────────────────────
let playTimer = null;

function applySetup() {
  const rawV  = parseInt(numVInput.value);
  const vCount = isNaN(rawV) || rawV < 0 ? 0 : Math.min(10, rawV);
  playing.value = false;
  clearTimeout(playTimer);
  stepsData.steps = buildSteps(vCount, edgesInputStr.value);
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

// ─────────────────────────────────────────────────────────────────────────────
// RESIZERS
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
  cleanupFns.push(initVResizer(vizResizerRef,   vizHeight,   220, 600));
  cleanupFns.push(initVResizer(tableResizerRef, tableHeight, 50,  250));
});
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown);
  clearTimeout(playTimer);
  cleanupFns.forEach(fn => fn && fn());
});
</script>

<template>
  <div class="slide-wrapper">
    <!-- Navbar -->
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
            <input
              type="number"
              v-model.number="numVInput"
              min="0"
              max="10"
              style="width:45px;"
              class="ll-text-input"
              @change="applySetup"
              @keyup.enter="applySetup"
            />
            <span class="ll-divider">|</span>
            <label>Directed Edges</label>
            <input
              type="text"
              v-model="edgesInputStr"
              style="width:200px;"
              class="ll-text-input"
              placeholder="e.g. [[0,1],[1,2],[2,0],[2,3]]"
              @keyup.enter="applySetup"
            />
            <button class="ll-viz-btn" @click="applySetup" title="Run Cycle Detection">&#9654;</button>
            <button class="ll-graph-modal-btn" style="background-color: slategray" @click="showGraphModal = !showGraphModal">
              {{ showGraphModal ? 'Hide' : 'Show' }}
            </button>
            <div class="ll-nav-controls">
              <button class="ll-nav-btn" title="First" @click="stepBy(-steps.length)">&#171;</button>
              <button class="ll-nav-btn" @click="stepBy(-1)">&#8249; Prev</button>
              <button class="ll-play-btn" @click="togglePlay">{{ playing ? '\u23F8 Pause' : '\u25B6 Play' }}</button>
              <button class="ll-nav-btn" @click="stepBy(1)">Next &#8250;</button>
              <button class="ll-nav-btn" title="Last" @click="stepBy(steps.length)">&#187;</button>
            </div>
          </div>

          <!-- ── Main Split ─────────────────────────────────────────── -->
          <div class="ll-main" ref="mainRef">

            <!-- LEFT COLUMN -->
            <div class="ll-left-col" ref="leftColRef" :style="{ width: leftWidth + '%' }">
              <div class="ll-viz-wrap" :style="{ height: vizHeight + 'px' }">
                <div class="ll-perm-area">

                  <div v-if="(s.V ?? 0) === 0" class="ll-empty-matrix-msg">
                    No graph to display (Vertices = 0). Set Vertices &gt; 0 with directed edges like [[0,1],[1,2],[2,0],[2,3]].
                  </div>

                  <template v-else>
                    <!-- Top Pointers Bar -->
                    <div class="ll-ptrs">
                      <div class="ll-ptr-chip">i = <b class="ll-c-orange">{{ s.activeI !== undefined && s.activeI >= 0 ? s.activeI : 'N/A' }}</b></div>
                      <div class="ll-ptr-chip">u = <b class="ll-c-orange">{{ s.activeU !== undefined && s.activeU >= 0 ? s.activeU : 'N/A' }}</b></div>
                      <div class="ll-ptr-chip">v = <b class="ll-c-purple">{{ s.activeV !== undefined && s.activeV >= 0 ? s.activeV : 'N/A' }}</b></div>
                      <div class="ll-ptr-chip">cycle = <b :class="s.cycleInfo && s.cycleInfo.detected ? 'll-c-red' : 'll-c-green'">{{ s.cycleInfo && s.cycleInfo.detected ? `Yes (${s.cycleInfo.backEdge.u} → ${s.cycleInfo.backEdge.v})` : 'No' }}</b></div>
                    </div>

                    <!-- ── inStack[] Array Tracker ─────────────────────── -->
                    <div class="ll-section-wrap">
                      <div class="ll-section-title">inStack Array <code>inStack[i] (Recursion Stack)</code>:</div>
                      <div v-if="!s.inStackAllocated" class="ll-arr-unalloc">
                        inStack[] array not yet initialized (waiting for memory allocation)
                      </div>
                      <div v-else class="ll-arr-track">
                        <div
                          v-for="vIdx in s.V"
                          :key="'instack-box-' + (vIdx - 1)"
                          class="ll-arr-cell-wrap"
                        >
                          <div class="ll-ptr-tag-wrap">
                            <span v-if="isCycleNode(vIdx - 1)" class="ll-ptr-lbl ll-lbl-red">cycle</span>
                            <span v-if="s.activeI !== undefined && s.activeI >= 0 && s.activeI === (vIdx - 1) && !isCycleNode(vIdx - 1)" class="ll-ptr-lbl ll-lbl-orange">i</span>
                            <span v-if="s.activeU !== undefined && s.activeU >= 0 && s.activeU === (vIdx - 1) && !isCycleNode(vIdx - 1)" class="ll-ptr-lbl ll-lbl-orange">u</span>
                            <span v-if="s.activeV !== undefined && s.activeV >= 0 && s.activeV === (vIdx - 1) && !isCycleNode(vIdx - 1)" class="ll-ptr-lbl ll-lbl-purple">v</span>
                          </div>
                          <div
                            class="ll-arr-box"
                            :class="{
                              'll-box-cycle': isCycleNode(vIdx - 1),
                              'll-box-inq': s.inStackArr && s.inStackArr[vIdx - 1] && !isCycleNode(vIdx - 1),
                              'll-box-cur': (s.activeU === (vIdx - 1) || s.activeI === (vIdx - 1)) && !isCycleNode(vIdx - 1) && !(s.inStackArr && s.inStackArr[vIdx - 1]),
                              'll-box-nbr': s.activeV === (vIdx - 1) && s.activeU !== (vIdx - 1) && s.activeI !== (vIdx - 1) && !isCycleNode(vIdx - 1) && !(s.inStackArr && s.inStackArr[vIdx - 1]),
                              'll-box-empty': !s.inStackArr || !s.inStackArr[vIdx - 1]
                            }"
                          >
                            <span :class="s.inStackArr && s.inStackArr[vIdx - 1] ? 'll-val-true' : 'll-val-false'">
                              {{ s.inStackArr && s.inStackArr[vIdx - 1] ? 'true' : 'false' }}
                            </span>
                          </div>
                          <div class="ll-arr-idx">[{{ vIdx - 1 }}]</div>
                        </div>
                      </div>
                    </div>

                    <!-- ── visited[] Array Tracker ─────────────────────── -->
                    <div class="ll-section-wrap">
                      <div class="ll-section-title">Visited Array <code>visited[i]</code>:</div>
                      <div v-if="!s.visitedAllocated" class="ll-arr-unalloc">
                        visited[] array not yet initialized (waiting for memory allocation)
                      </div>
                      <div v-else class="ll-arr-track">
                        <div
                          v-for="vIdx in s.V"
                          :key="'vis-box-' + (vIdx - 1)"
                          class="ll-arr-cell-wrap"
                        >
                          <div class="ll-ptr-tag-wrap">
                            <span v-if="isCycleNode(vIdx - 1)" class="ll-ptr-lbl ll-lbl-red">cycle</span>
                            <span v-if="s.activeI !== undefined && s.activeI >= 0 && s.activeI === (vIdx - 1) && !isCycleNode(vIdx - 1)" class="ll-ptr-lbl ll-lbl-orange">i</span>
                            <span v-if="s.activeU !== undefined && s.activeU >= 0 && s.activeU === (vIdx - 1) && !isCycleNode(vIdx - 1)" class="ll-ptr-lbl ll-lbl-orange">u</span>
                            <span v-if="s.activeV !== undefined && s.activeV >= 0 && s.activeV === (vIdx - 1) && !isCycleNode(vIdx - 1)" class="ll-ptr-lbl ll-lbl-purple">v</span>
                          </div>
                          <div
                            class="ll-arr-box"
                            :class="{
                              'll-box-cycle': isCycleNode(vIdx - 1),
                              'll-box-cur': (s.activeU === (vIdx - 1) || s.activeI === (vIdx - 1)) && !isCycleNode(vIdx - 1),
                              'll-box-nbr': s.activeV === (vIdx - 1) && s.activeU !== (vIdx - 1) && s.activeI !== (vIdx - 1) && !isCycleNode(vIdx - 1),
                              'll-box-found': s.visitedArr && s.visitedArr[vIdx - 1] && s.activeU !== (vIdx - 1) && s.activeI !== (vIdx - 1) && s.activeV !== (vIdx - 1) && !isCycleNode(vIdx - 1)
                            }"
                          >
                            <span :class="s.visitedArr && s.visitedArr[vIdx - 1] ? 'll-val-true' : 'll-val-false'">
                              {{ s.visitedArr && s.visitedArr[vIdx - 1] ? 'true' : 'false' }}
                            </span>
                          </div>
                          <div class="ll-arr-idx">[{{ vIdx - 1 }}]</div>
                        </div>
                      </div>
                    </div>

                    <!-- DFS Traversal Order -->
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
                            <span class="ll-res-node" :class="{ 'll-res-node-cycle': isCycleNode(nodeId) }">{{ nodeId }}</span>
                          </span>
                        </template>
                        <span v-else class="ll-res-empty">None yet</span>
                      </div>
                    </div>

                  </template>
                </div>
              </div>

              <div class="ll-vresizer" ref="vizResizerRef"></div>

              <!-- Legend -->
              <div class="ll-legend">
                <span class="ll-leg"><span class="ll-legdot ll-legdot-unvis"></span>Unvisited / False</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-active"></span>Active (i / u)</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-nbr"></span>Neighbor (v)</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-inq"></span>In Stack (Visiting)</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-visited"></span>Visited / True</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-cycle"></span>Cycle / Back Edge</span>
              </div>

              <!-- Variable Frames / Call Stack -->
              <div class="ll-table-area" :style="{ height: tableHeight + 'px' }">
                <div class="ll-table-title">Variable Frames &mdash; Call Stack (innermost = current)</div>
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
                      <tr>
                        <td>Time Complexity (Matrix)</td>
                        <td>O(V&sup2;)</td>
                        <td>With an adjacency matrix, checking all potential neighbors of each vertex requires scanning all V columns per vertex. Total time = O(V&sup2;).</td>
                      </tr>
                      <tr>
                        <td>Time Complexity (List)</td>
                        <td>O(V + E)</td>
                        <td>With an adjacency list, every vertex is visited once and each directed edge is explored at most once during the DFS traversal.</td>
                      </tr>
                      <tr>
                        <td>Space Complexity</td>
                        <td>O(V)</td>
                        <td>O(V) auxiliary memory for the <code>visited[]</code> boolean array, <code>inStack[]</code> recursion stack array, and the recursive call stack depth (at most V).</td>
                      </tr>
                    </tbody>
                  </table>
                  <p class="ll-note">
                    Key property: <b>A directed graph contains a cycle if and only if a back edge is encountered during DFS</b>. A back edge is a directed edge <code>(u &rarr; v)</code> where vertex <code>v</code> is currently in the active DFS recursion stack (<code>inStack[v] == true</code>).
                  </p>
                  <h3>Real-World Applications</h3>
                  <p>
                    <b>1. Deadlock Detection:</b> Operating systems construct Resource Allocation Graphs (RAG) and check for directed cycles to detect resource deadlocks.<br/>
                    <b>2. Circular Dependencies:</b> Build systems (Make, Vite, Webpack) and package managers (npm, pip, Maven) detect circular module imports.<br/>
                    <b>3. Course Prerequisites:</b> Validating prerequisite graphs in curriculum scheduling to guarantee courses can be completed.<br/>
                    <b>4. Spreadsheet Formulas:</b> Detecting circular cell references (e.g. <code>A1 = B1 + 1</code>, <code>B1 = A1 * 2</code>).
                  </p>
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

    <!-- Floating Directed Graph Modal Dialog Container -->
    <div v-if="showGraphModal" class="graph-modal-backdrop" @click.self="showGraphModal = false">
      <div class="graph-modal-card">
        <div class="graph-modal-header">
          <div class="graph-modal-title">
            <span>Cycle Detection Directed Graph View</span>
            <span class="graph-subtitle">(Synchronized with DFS &amp; Recursion Stack)</span>
          </div>
          <button class="graph-close-btn" @click="showGraphModal = false" title="Close modal">&times;</button>
        </div>

        <div class="graph-modal-body">
          <div v-if="(s.V ?? 0) === 0" class="ll-empty-graph-msg">
            No vertices or edges to display (Vertices = 0).
          </div>
          <svg v-else class="graph-modal-svg" viewBox="0 0 720 470">
            <defs>
              <marker id="modal-arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
              </marker>
              <marker id="modal-arrowhead-active" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f97316" />
              </marker>
              <marker id="modal-arrowhead-tree" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" />
              </marker>
              <marker id="modal-arrowhead-back" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
              </marker>
              <marker id="modal-arrowhead-hover" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
              </marker>
            </defs>

            <!-- Directed Edges -->
            <g
              v-for="edge in s.edges"
              :key="'me-' + edge.u + '-' + edge.v"
              @mouseenter="hoveredEdge = { u: edge.u, v: edge.v }"
              @mouseleave="hoveredEdge = null"
              style="cursor: pointer;"
            >
              <!-- Thick Hit Target Path -->
              <path
                :d="getEdgeGeo(edge).pathD"
                fill="none"
                stroke="transparent"
                stroke-width="18"
                stroke-linecap="round"
              />

              <!-- Visible Directed Edge Line -->
              <path
                :d="getEdgeGeo(edge).pathD"
                fill="none"
                class="ll-edge-line"
                :class="{
                  'll-edge-back-cycle': isBackEdge(edge.u, edge.v) || isCycleEdge(edge.u, edge.v),
                  'll-edge-active':     isActiveEdge(edge.u, edge.v),
                  'll-edge-tree':       isTreeEdge(edge.u, edge.v) && !isCycleEdge(edge.u, edge.v),
                  'll-edge-hovered':    isEdgeHovered(edge.u, edge.v)
                }"
                :marker-end="isBackEdge(edge.u, edge.v) || isCycleEdge(edge.u, edge.v)
                  ? 'url(#modal-arrowhead-back)'
                  : (isEdgeHovered(edge.u, edge.v)
                    ? 'url(#modal-arrowhead-hover)'
                    : (isActiveEdge(edge.u, edge.v)
                      ? 'url(#modal-arrowhead-active)'
                      : (isTreeEdge(edge.u, edge.v)
                        ? 'url(#modal-arrowhead-tree)'
                        : 'url(#modal-arrowhead)')))"
              />
            </g>

            <!-- Graph Vertex Nodes -->
            <g v-for="node in modalNodePositions" :key="'mn-' + node.id">
              <!-- Pointer Labels above/below Nodes based on position -->
              <g v-if="node.id === s.activeI || node.id === s.activeU || node.id === s.activeV || isNodeHoveredSource(node.id) || isNodeHoveredTarget(node.id) || isCycleNode(node.id)">
                <template v-if="node.y > 230">
                  <text
                    :x="node.x"
                    :y="node.y + 22"
                    class="ll-svg-ptr"
                    :class="isNodeHoveredSource(node.id) ? 'll-svg-ptr-hover-src' : (isNodeHoveredTarget(node.id) ? 'll-svg-ptr-hover-tgt' : (isCycleNode(node.id) ? 'll-svg-ptr-red' : ((node.id === s.activeU || node.id === s.activeI) ? 'll-svg-ptr-orange' : 'll-svg-ptr-purple')))"
                  >
                    &utrif;
                  </text>
                  <text
                    :x="node.x"
                    :y="node.y + 35"
                    class="ll-svg-ptr"
                    :class="isNodeHoveredSource(node.id) ? 'll-svg-ptr-hover-src' : (isNodeHoveredTarget(node.id) ? 'll-svg-ptr-hover-tgt' : (isCycleNode(node.id) ? 'll-svg-ptr-red' : ((node.id === s.activeU || node.id === s.activeI) ? 'll-svg-ptr-orange' : 'll-svg-ptr-purple')))"
                  >
                    {{ isNodeHoveredSource(node.id) ? 'src' : (isNodeHoveredTarget(node.id) ? 'tgt' : (isCycleNode(node.id) ? 'cycle' : (node.id === s.activeI ? 'i' : (node.id === s.activeU ? 'u' : 'v')))) }}
                  </text>
                </template>
                <template v-else>
                  <text
                    :x="node.x"
                    :y="node.y - 28"
                    class="ll-svg-ptr"
                    :class="isNodeHoveredSource(node.id) ? 'll-svg-ptr-hover-src' : (isNodeHoveredTarget(node.id) ? 'll-svg-ptr-hover-tgt' : (isCycleNode(node.id) ? 'll-svg-ptr-red' : ((node.id === s.activeU || node.id === s.activeI) ? 'll-svg-ptr-orange' : 'll-svg-ptr-purple')))"
                  >
                    {{ isNodeHoveredSource(node.id) ? 'src' : (isNodeHoveredTarget(node.id) ? 'tgt' : (isCycleNode(node.id) ? 'cycle' : (node.id === s.activeI ? 'i' : (node.id === s.activeU ? 'u' : 'v')))) }}
                  </text>
                  <text
                    :x="node.x"
                    :y="node.y - 17"
                    class="ll-svg-ptr"
                    :class="isNodeHoveredSource(node.id) ? 'll-svg-ptr-hover-src' : (isNodeHoveredTarget(node.id) ? 'll-svg-ptr-hover-tgt' : (isCycleNode(node.id) ? 'll-svg-ptr-red' : ((node.id === s.activeU || node.id === s.activeI) ? 'll-svg-ptr-orange' : 'll-svg-ptr-purple')))"
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
                  'll-node-cycle':     isCycleNode(node.id),
                  'll-node-instack':   s.inStackArr && s.inStackArr[node.id] && !isCycleNode(node.id),
                  'll-node-visited':   s.visitedArr && s.visitedArr[node.id] && !(s.inStackArr && s.inStackArr[node.id]) && !isCycleNode(node.id),
                  'll-node-u':         (node.id === s.activeU || node.id === s.activeI) && !isCycleNode(node.id),
                  'll-node-v':         node.id === s.activeV && node.id !== s.activeU && node.id !== s.activeI && !isCycleNode(node.id),
                  'll-node-hover-src': isNodeHoveredSource(node.id),
                  'll-node-hover-tgt': isNodeHoveredTarget(node.id)
                }"
              />
              <text
                :x="node.x"
                :y="node.y + 5"
                class="ll-node-text"
                :class="{
                  'll-node-text-cycle':     isCycleNode(node.id),
                  'll-node-text-instack':   s.inStackArr && s.inStackArr[node.id] && !isCycleNode(node.id),
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

  </div><!-- /slide-wrapper -->
</template>

<style scoped>
/* ── Root & Design Tokens (Standard across Graph modules) ─────────────────── */
.ll-root * { box-sizing: border-box; }
.ll-root {
  --coral: #F04D4D; --coral-dark: #d93e3e; --coral-light: #fff0f0;
  --bg: #f5f6fa; --surface: #ffffff; --surface2: #f1f4f9;
  --border: #e2e8f0; --border2: #cbd5e1; --text: #1e293b; --text2: #475569; --muted: #94a3b8;
  --blue: #3b82f6; --blue-light: #eff6ff; --green: #22c55e; --green-light: #f0fdf4;
  --orange: #f97316; --orange-light: #fff7ed; --purple: #9333ea; --purple-light: #f3e8ff;
  --red: #ef4444; --red-dark: #991b1b; --red-light: #fef2f2;
  --shadow-sm: 0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04);
  --radius: 8px; --radius-sm: 6px;
  background: var(--bg); color: var(--text);
  font-family: 'Segoe UI', system-ui, sans-serif; font-size: 13px;
  display: flex; flex-direction: column; height: 50vh; min-height: 600px; overflow: hidden; width: 100%;
}
@keyframes ll-pop { from { transform: scale(.85); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes ll-dash { to { stroke-dashoffset: -18; } }
@keyframes ll-flow-dash { to { stroke-dashoffset: -24; } }
@keyframes ll-cycle-pulse {
  from { filter: drop-shadow(0 0 4px rgba(239, 68, 68, 0.5)); }
  to   { filter: drop-shadow(0 0 12px rgba(239, 68, 68, 0.95)); }
}

.slide-wrapper { margin-top: -10px; margin-left: -30px; width: 107%; max-height: 100%; font-size: 0.8rem; font-weight: 400; }
.slide-body { display: flex; flex-direction: column; border-radius: 4px; height: 100%; }
.navbar { display: flex; flex-direction: row; justify-content: space-between; align-items: center; gap: 0.75rem; padding: 0 10px; background-color: #ffffff; position: fixed; width: 94.7%; z-index: 10; }
.navbar > img { height: 30px; }
.navbar-title { margin: 0; font-size: 1.5rem; font-weight: 700; background-color: #ef5050; color: #ffffff; width: 80%; padding-left: 10px; margin-left: -10px; border-radius: 5px; }
.row-main { width: 100%; height: 90%; margin-top: 37px; overflow-x: auto; overflow-y: auto; scrollbar-width: none; -ms-overflow-style: none; }
.row-main::-webkit-scrollbar { display: none; width: 0; height: 0; }

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

/* Main Split */
.ll-main { display: flex; flex: 1; overflow: hidden; position: relative; }
.ll-left-col { display: flex; flex-direction: column; overflow: hidden; min-width: 200px; max-width: 72%; }
.ll-viz-wrap { flex-shrink: 0; background: var(--surface); border-bottom: 1px solid var(--border); position: relative; overflow-x: auto; overflow-y: auto; scrollbar-width: none; -ms-overflow-style: none; }
.ll-viz-wrap::-webkit-scrollbar { display: none; width: 0; height: 0; }
.ll-perm-area { display: flex; flex-direction: column; align-items: stretch; min-height: 100%; width: 100%; min-width: 0; box-sizing: border-box; gap: 8px; padding-bottom: 6px; }
.ll-ptrs { display: flex; gap: 8px; flex-wrap: wrap; padding: 10px 16px 4px; min-height: 36px; width: 100%; box-sizing: border-box; min-width: 0; }
.ll-ptr-chip { background: var(--surface2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 3px 10px; font-size: 12px; font-family: monospace; box-shadow: var(--shadow-sm); white-space: nowrap; flex-shrink: 0; }
.ll-c-blue { color: var(--blue); } .ll-c-orange { color: var(--orange); } .ll-c-green { color: var(--green); } .ll-c-purple { color: var(--purple); } .ll-c-red { color: var(--red); }

/* Section Wrappers & Titles */
.ll-section-wrap { display: flex; flex-direction: column; gap: 2px; }
.ll-section-title { font-size: 11px; font-weight: 700; color: var(--text2); font-family: monospace; padding: 0 16px; }

/* Pastel Flat Visual Diagram Box System (from DFSGraph) */
.ll-arr-track { display: flex; align-items: flex-start; flex-wrap: wrap; padding: 2px 16px 4px; min-height: 72px; gap: 14px; width: 100%; box-sizing: border-box; min-width: 0; }
.ll-arr-cell-wrap { display: flex; flex-direction: column; align-items: center; flex: 0 0 42px; width: 42px; min-width: 42px; max-width: 42px; position: relative; }
.ll-ptr-tag-wrap { height: 22px; display: flex; align-items: flex-end; justify-content: center; gap: 2px; margin-bottom: 2px; white-space: nowrap; width: max-content; max-width: none; }
.ll-ptr-lbl { font-size: 10px; font-weight: 800; font-family: 'Consolas', 'Fira Code', monospace; display: inline-flex; flex-direction: column; align-items: center; line-height: 1; gap: 1px; white-space: nowrap; animation: ll-pop 0.2s ease; }
.ll-ptr-lbl::after { content: '↓'; font-size: 9px; font-weight: 900; line-height: 1; margin-top: 1px; }
.ll-lbl-blue { color: #3b82f6; }
.ll-lbl-orange { color: #f97316; }
.ll-lbl-purple { color: #9333ea; }
.ll-lbl-green { color: #10b981; }
.ll-lbl-red { color: #ef4444; }

.ll-arr-box { width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; border: 2px solid var(--blue); border-radius: var(--radius-sm); background: #eff6ff; color: #1e293b; font-weight: 700; font-size: 14px; font-family: monospace; box-shadow: var(--shadow-sm); transition: all 0.25s ease; animation: ll-pop .3s ease; }
.ll-box-cycle { border-color: #ef4444 !important; background: #fee2e2 !important; color: #b91c1c !important; box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.25) !important; }
.ll-box-inq { border-color: #f97316 !important; background: #fff7ed !important; color: #ea580c !important; box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.25) !important; }
.ll-box-cur { border-color: #f59e0b !important; background: #fef3c7 !important; color: #92400e !important; box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.25) !important; }
.ll-box-nbr { border-color: #9333ea !important; background: #f3e8ff !important; color: #6b21a8 !important; box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.25) !important; }
.ll-box-found { border-color: #10b981 !important; background: #dcfce7 !important; color: #065f46 !important; box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.25) !important; }
.ll-box-eliminated { background: var(--surface2) !important; border: 2px dashed var(--border2) !important; color: var(--muted) !important; opacity: 0.55; box-shadow: none !important; }
.ll-box-empty { background: var(--surface2) !important; border: 2px dashed var(--border2) !important; color: var(--muted) !important; box-shadow: none !important; }
.ll-arr-idx { font-size: 10.5px; color: var(--muted); margin-top: 3px; font-family: 'Consolas', monospace; font-weight: 600; }

.ll-val-true { color: #15803d; font-weight: 800; font-size: 11.5px; }
.ll-val-false { color: #64748b; font-weight: 600; font-size: 10.5px; letter-spacing: -0.2px; }

/* Traversal Track */
.ll-res-track { display: flex; align-items: center; gap: 4px; padding: 6px 12px; margin: 0 16px; background: var(--surface2); border: 1px solid var(--border); border-radius: var(--radius-sm); min-height: 42px; flex-wrap: wrap; }
.ll-res-chip { display: flex; align-items: center; gap: 4px; }
.ll-res-arrow { color: var(--muted); font-size: 12px; }
.ll-res-node { padding: 4px 10px; background: var(--green-light); border: 1.5px solid var(--green); border-radius: 12px; font-family: monospace; font-size: 13px; font-weight: 800; color: #15803d; }
.ll-res-node-cycle { background: #fee2e2 !important; border-color: #ef4444 !important; color: #b91c1c !important; }
.ll-res-empty { font-size: 12px; font-style: italic; color: var(--muted); }

/* Unallocated placeholder */
.ll-arr-unalloc { font-size: 11px; font-style: italic; color: var(--muted); padding: 6px 16px; background: var(--surface2); border: 1px dashed var(--border2); border-radius: var(--radius-sm); margin: 0 16px; }

/* Empty messages */
.ll-empty-matrix-msg { padding: 24px 16px; margin: 16px; text-align: center; color: var(--muted); font-size: 12px; font-weight: 600; border: 1px dashed var(--border2); border-radius: var(--radius-sm); background: var(--surface2); }
.ll-empty-graph-msg  { display: flex; align-items: center; justify-content: center; height: 100%; width: 100%; color: #64748b; font-size: 14px; font-weight: 600; text-align: center; }

/* Legend */
.ll-legend { display: flex; flex-wrap: wrap; gap: 6px 14px; padding: 6px 12px; border-bottom: 1px solid var(--border); flex-shrink: 0; background: var(--surface2); }
.ll-leg { display: flex; align-items: center; gap: 5px; font-size: 11px; color: var(--text2); font-weight: 500; }
.ll-legdot { width: 11px; height: 11px; border-radius: 3px; flex-shrink: 0; display: inline-block; }
.ll-legdot-unvis   { background: #eff6ff; border: 1.5px solid #3b82f6; }
.ll-legdot-active  { background: #fef3c7; border: 1.5px solid #f59e0b; }
.ll-legdot-nbr     { background: #f3e8ff; border: 1.5px solid #9333ea; }
.ll-legdot-inq     { background: #fff7ed; border: 1.5px solid #f97316; }
.ll-legdot-visited { background: #dcfce7; border: 1.5px solid #10b981; }
.ll-legdot-cycle   { background: #fee2e2; border: 1.5px solid #ef4444; }

/* Variable Frames / Call Stack */
.ll-table-area  { padding: 6px 16px; overflow-y: auto; overflow-x: auto; background: var(--surface); font-family: monospace; font-size: 12px; border-bottom: 1px solid var(--border); scrollbar-width: none; -ms-overflow-style: none; }
.ll-table-area::-webkit-scrollbar { display: none; width: 0; height: 0; }
.ll-table-title { font-size: 10px; color: var(--muted); margin-bottom: 4px; text-transform: uppercase; letter-spacing: .5px; }
.ll-stack-line  { display: flex; flex-direction: column; gap: 2px; }
.ll-frame       { color: var(--text2); font-size: 11.5px; }
.ll-frame-cur   { color: var(--text); font-weight: 600; }
.ll-fname       { color: var(--muted); }
.ll-now         { color: var(--coral); font-size: 10px; }
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

/* Right Panel */
.ll-right-col  { display: flex; flex-direction: column; flex: 1; overflow: hidden; min-width: 0; height: 78%; }
.ll-code-panel { display: flex; flex-direction: column; height: 100%; overflow: hidden; }
.ll-code-header { display: flex; align-items: center; gap: 8px; padding: 8px 14px; background: var(--surface); border-bottom: 1px solid var(--border); flex-shrink: 0; box-shadow: var(--shadow-sm); flex-wrap: wrap; }
.ll-tabbar  { display: flex; gap: 4px; flex-wrap: wrap; }
.ll-tab-btn { background: var(--surface2); border: 1px solid var(--border2); color: var(--text2); padding: 5px 11px; border-radius: var(--radius-sm); cursor: pointer; font-size: 11px; font-weight: 600; transition: all .15s; white-space: nowrap; }
.ll-tab-btn:hover  { border-color: var(--coral); color: var(--coral); }
.ll-tab-btn.active { background: var(--coral); border-color: var(--coral); color: #fff; }
.ll-lang-select { background: var(--surface2); border: 1px solid var(--border2); color: var(--text); padding: 5px 28px 5px 10px; border-radius: var(--radius-sm); font-size: 12px; font-weight: 500; cursor: pointer; min-width: 110px; margin-left: auto; transition: border-color .15s; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2394a3b8'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; }
.ll-lang-select:focus { outline: none; border-color: var(--coral); box-shadow: 0 0 0 3px rgba(240,77,77,.1); }
.ll-code-scroll { flex: 1; overflow: auto; padding: 14px 16px; background: #f8fafc; min-width: 0; scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent; }
.ll-code-scroll::-webkit-scrollbar:horizontal { display: none !important; height: 0 !important; }
.ll-code-scroll::-webkit-scrollbar:vertical { width: 6px; }
.ll-code-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
.ll-pre { font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace; font-size: 12px; line-height: 1.65; white-space: pre-wrap; word-break: break-all; color: var(--text); margin: 0; }
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
.graph-modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(3px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.graph-modal-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.15), 0 10px 10px -5px rgba(0,0,0,0.04);
  width: 760px;
  max-width: 95vw;
  overflow: hidden;
  border: 1px solid var(--border);
  animation: ll-pop 0.25s ease-out;
  height: 90%;
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
  padding: 16px;
  display: flex;
  justify-content: center;
  background: #ffffff;
  height: 90%;
}
.graph-modal-svg {
  width: 100%;
  max-height: 480px;
}

/* SVG Graph Elements */
.ll-edge-line { stroke: #94a3b8; stroke-width: 2.5; transition: all 0.25s ease; }
.ll-edge-active { stroke: #f97316; stroke-width: 4; stroke-dasharray: 6 3; animation: ll-dash 1s linear infinite; }
.ll-edge-tree { stroke: #22c55e !important; stroke-width: 3.5px !important; }
.ll-edge-back-cycle { stroke: #ef4444 !important; stroke-width: 4.5px !important; stroke-dasharray: 8 4; animation: ll-flow-dash 0.65s linear infinite; filter: drop-shadow(0 0 8px rgba(239,68,68,.85)); }

/* Hover Highlights for Graph Edges & Nodes */
.ll-edge-line.ll-edge-hovered {
  stroke: #3b82f6 !important;
  stroke-width: 4px !important;
  filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.6));
  transition: all 0.15s ease;
}

/* Vertex Node Circles */
.ll-node-circle { fill: #eff6ff; stroke: #3b82f6; stroke-width: 2.5; transition: all 0.25s ease; }
.ll-node-u { fill: #dbeafe !important; stroke: #3b82f6 !important; stroke-width: 3.5 !important; }
.ll-node-v { fill: #f3e8ff !important; stroke: #9333ea !important; stroke-width: 3.5 !important; }
.ll-node-instack { fill: #fff7ed !important; stroke: #f97316 !important; stroke-width: 3.5 !important; }
.ll-node-visited { fill: #f0fdf4 !important; stroke: #22c55e !important; stroke-width: 3 !important; }
.ll-node-cycle { fill: #fee2e2 !important; stroke: #ef4444 !important; stroke-width: 4px !important; animation: ll-cycle-pulse 1.2s ease-in-out infinite alternate; }
.ll-node-hover-src {
  fill: #fff7ed !important;
  stroke: #f97316 !important;
  stroke-width: 3.5px !important;
  filter: drop-shadow(0 0 8px rgba(249, 115, 22, 0.55));
  transition: all 0.15s ease;
}
.ll-node-hover-tgt {
  fill: #f0fdf4 !important;
  stroke: #22c55e !important;
  stroke-width: 3.5px !important;
  filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.55));
  transition: all 0.15s ease;
}

/* Vertex Node Text */
.ll-node-text { font-size: 13px; font-weight: 800; font-family: monospace; text-anchor: middle; fill: #1e293b; }
.ll-node-text-cycle { fill: #dc2626 !important; font-weight: 900 !important; }
.ll-node-text-instack { fill: #c2410c !important; font-weight: 900 !important; }
.ll-node-text-hover-src { fill: #c2410c !important; font-weight: 900 !important; }
.ll-node-text-hover-tgt { fill: #15803d !important; font-weight: 900 !important; }

/* Pointer Labels */
.ll-svg-ptr { font-size: 13px; font-weight: 800; font-family: monospace; text-anchor: middle; }
.ll-svg-ptr-blue { fill: #3b82f6; }
.ll-svg-ptr-purple { fill: #9333ea; }
.ll-svg-ptr-orange { fill: #ea580c; }
.ll-svg-ptr-red { fill: #dc2626; font-weight: 900; }
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
