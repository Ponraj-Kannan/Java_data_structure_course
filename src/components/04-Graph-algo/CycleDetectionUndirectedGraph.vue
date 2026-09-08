<script setup>
import { ref, computed, reactive, watch, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  topic: {
    type: String,
    default: 'Cycle Detection in Undirected Graph'
  },
  subTopic: {
    type: String,
    default: 'Depth-First Search (DFS) & Parent Tracking'
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// CODE DEFINITIONS ACROSS LANGUAGES (1-to-1 Step Mapping)
// ─────────────────────────────────────────────────────────────────────────────
const JAVA_CODE = [
  ['', 'public class GraphCycleUndirected {'],
  ['c_dfs_start', '    static boolean isCyclicUtil(int u, boolean[] visited, int parent, int[][] adj, int V) {'],
  ['c_set_vis', '        visited[u] = true;'],
  ['c_nbr_loop', '        for (int v = 0; v < V; v++) {'],
  ['c_check_adj', '            if (adj[u][v] == 1) {'],
  ['c_check_nbr_vis', '                if (!visited[v]) {'],
  ['c_rec_call', '                    if (isCyclicUtil(v, visited, u, adj, V))'],
  ['c_ret_rec_true', '                        return true;'],
  ['c_check_parent', '                } else if (v != parent) {'],
  ['c_ret_cycle_true', '                    return true; // Cycle detected'],
  ['', '                }'],
  ['', '            }'],
  ['', '        }'],
  ['c_dfs_ret_false', '        return false;'],
  ['', '    }'],
  ['', ''],
  ['', '    static boolean isCyclic(int[][] adj, int V) {'],
  ['c_init_vis', '        boolean[] visited = new boolean[V];'],
  ['c_outer_loop', '        for (int i = 0; i < V; i++) {'],
  ['c_check_vis', '            if (!visited[i]) {'],
  ['c_call_dfs', '                if (isCyclicUtil(i, visited, -1, adj, V))'],
  ['c_found_cycle', '                    return true;'],
  ['', '            }'],
  ['', '        }'],
  ['c_done', '        return false;'],
  ['', '    }'],
  ['', '}']
];

const C_CODE = [
  ['', '#include <stdio.h>'],
  ['', '#include <stdbool.h>'],
  ['', ''],
  ['c_dfs_start', 'bool isCyclicUtil(int u, bool visited[], int parent, int adj[][10], int V) {'],
  ['c_set_vis', '    visited[u] = true;'],
  ['c_nbr_loop', '    for (int v = 0; v < V; v++) {'],
  ['c_check_adj', '        if (adj[u][v] == 1) {'],
  ['c_check_nbr_vis', '            if (!visited[v]) {'],
  ['c_rec_call', '                if (isCyclicUtil(v, visited, u, adj, V))'],
  ['c_ret_rec_true', '                    return true;'],
  ['c_check_parent', '            } else if (v != parent) {'],
  ['c_ret_cycle_true', '                return true; // Cycle detected'],
  ['', '            }'],
  ['', '        }'],
  ['', '    }'],
  ['c_dfs_ret_false', '    return false;'],
  ['', '}'],
  ['', ''],
  ['', 'bool isCyclic(int adj[][10], int V) {'],
  ['c_init_vis', '    bool visited[10] = {false};'],
  ['c_outer_loop', '    for (int i = 0; i < V; i++) {'],
  ['c_check_vis', '        if (!visited[i]) {'],
  ['c_call_dfs', '            if (isCyclicUtil(i, visited, -1, adj, V))'],
  ['c_found_cycle', '                return true;'],
  ['', '        }'],
  ['', '    }'],
  ['c_done', '    return false;'],
  ['', '}']
];

const CPP_CODE = [
  ['', '#include <vector>'],
  ['', 'using namespace std;'],
  ['', ''],
  ['c_dfs_start', 'bool isCyclicUtil(int u, vector<bool>& visited, int parent, const vector<vector<int>>& adj, int V) {'],
  ['c_set_vis', '    visited[u] = true;'],
  ['c_nbr_loop', '    for (int v = 0; v < V; v++) {'],
  ['c_check_adj', '        if (adj[u][v] == 1) {'],
  ['c_check_nbr_vis', '            if (!visited[v]) {'],
  ['c_rec_call', '                if (isCyclicUtil(v, visited, u, adj, V))'],
  ['c_ret_rec_true', '                    return true;'],
  ['c_check_parent', '            } else if (v != parent) {'],
  ['c_ret_cycle_true', '                return true; // Cycle detected'],
  ['', '            }'],
  ['', '        }'],
  ['', '    }'],
  ['c_dfs_ret_false', '    return false;'],
  ['', '}'],
  ['', ''],
  ['', 'bool isCyclic(const vector<vector<int>>& adj, int V) {'],
  ['c_init_vis', '    vector<bool> visited(V, false);'],
  ['c_outer_loop', '    for (int i = 0; i < V; i++) {'],
  ['c_check_vis', '        if (!visited[i]) {'],
  ['c_call_dfs', '            if (isCyclicUtil(i, visited, -1, adj, V))'],
  ['c_found_cycle', '                return true;'],
  ['', '        }'],
  ['', '    }'],
  ['c_done', '    return false;'],
  ['', '}']
];

const PYTHON_CODE = [
  ['c_dfs_start', 'def is_cyclic_util(u, visited, parent, adj, V):'],
  ['c_set_vis', '    visited[u] = True'],
  ['c_nbr_loop', '    for v in range(V):'],
  ['c_check_adj', '        if adj[u][v] == 1:'],
  ['c_check_nbr_vis', '            if not visited[v]:'],
  ['c_rec_call', '                if is_cyclic_util(v, visited, u, adj, V):'],
  ['c_ret_rec_true', '                    return True'],
  ['c_check_parent', '            elif v != parent:'],
  ['c_ret_cycle_true', '                return True  # Cycle detected'],
  ['c_dfs_ret_false', '    return False'],
  ['', ''],
  ['', 'def is_cyclic(adj, V):'],
  ['c_init_vis', '    visited = [False] * V'],
  ['c_outer_loop', '    for i in range(V):'],
  ['c_check_vis', '        if not visited[i]:'],
  ['c_call_dfs', '            if is_cyclic_util(i, visited, -1, adj, V):'],
  ['c_found_cycle', '                return True'],
  ['c_done', '    return False']
];

const JS_CODE = [
  ['c_dfs_start', 'function isCyclicUtil(u, visited, parent, adj, V) {'],
  ['c_set_vis', '    visited[u] = true;'],
  ['c_nbr_loop', '    for (let v = 0; v < V; v++) {'],
  ['c_check_adj', '        if (adj[u][v] === 1) {'],
  ['c_check_nbr_vis', '            if (!visited[v]) {'],
  ['c_rec_call', '                if (isCyclicUtil(v, visited, u, adj, V))'],
  ['c_ret_rec_true', '                    return true;'],
  ['c_check_parent', '            } else if (v !== parent) {'],
  ['c_ret_cycle_true', '                return true; // Cycle detected'],
  ['', '            }'],
  ['', '        }'],
  ['', '    }'],
  ['c_dfs_ret_false', '    return false;'],
  ['', '}'],
  ['', ''],
  ['', 'function isCyclic(adj, V) {'],
  ['c_init_vis', '    const visited = new Array(V).fill(false);'],
  ['c_outer_loop', '    for (let i = 0; i < V; i++) {'],
  ['c_check_vis', '        if (!visited[i]) {'],
  ['c_call_dfs', '            if (isCyclicUtil(i, visited, -1, adj, V))'],
  ['c_found_cycle', '                return true;'],
  ['', '        }'],
  ['', '    }'],
  ['c_done', '    return false;'],
  ['', '}']
];

const CODES = {
  java: JAVA_CODE,
  c: C_CODE,
  cpp: CPP_CODE,
  python: PYTHON_CODE,
  javascript: JS_CODE
};

const PSEUDOCODE = [
  'function isCyclic(adj, V):',
  '    visited = array of size V initialized to false',
  '    for i = 0 to V - 1:',
  '        if visited[i] == false:',
  '            if isCyclicUtil(i, visited, -1, adj, V) == true:',
  '                return true',
  '    return false',
  '',
  'function isCyclicUtil(u, visited, parent, adj, V):',
  '    visited[u] = true',
  '    for each neighbor v of u (adj[u][v] == 1):',
  '        if visited[v] == false:',
  '            if isCyclicUtil(v, visited, u, adj, V) == true:',
  '                return true',
  '        else if v != parent:',
  '            return true   // Back-edge found! Cycle detected.',
  '    return false'
];

const PSEUDOCODE_MAP = {
  c_init_vis: 1,
  c_outer_loop: 2,
  c_check_vis: 3,
  c_call_dfs: 4,
  c_found_cycle: 5,
  c_done: 6,
  c_dfs_start: 8,
  c_set_vis: 9,
  c_nbr_loop: 10,
  c_check_adj: 10,
  c_check_nbr_vis: 11,
  c_rec_call: 12,
  c_ret_rec_true: 13,
  c_check_parent: 14,
  c_ret_cycle_true: 15,
  c_dfs_ret_false: 16
};

// Helper to create frame object
function frame(title, rows) {
  return { title, rows };
}

// ─────────────────────────────────────────────────────────────────────────────
// PARSING & STEP GENERATOR
// ─────────────────────────────────────────────────────────────────────────────
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

function buildSteps(V, edgesInput) {
  const steps = [];
  if (V <= 0) {
    steps.push({
      badge: 'Graph is empty (Vertices = 0).',
      code: 'c_done',
      vars: [frame('isCyclic()', [['V', '0']])],
      V: 0, edges: [], visitedArr: [], visitedAllocated: false,
      activeU: -1, activeV: -1, activeParent: -1, treeEdges: [], cycleInfo: null,
      traversal: []
    });
    return steps;
  }

  const rawEdges = typeof edgesInput === 'string' ? parseEdges(edgesInput) : edgesInput;
  const validEdges = rawEdges.filter(e => e.u >= 0 && e.u < V && e.v >= 0 && e.v < V);

  const adj = Array.from({ length: V }, () => Array(V).fill(0));
  for (const e of validEdges) {
    adj[e.u][e.v] = 1;
    adj[e.v][e.u] = 1;
  }

  const allUndirectedEdges = [];
  const seenEdge = new Set();
  for (const e of validEdges) {
    if (e.u === e.v) {
      const key = `loop-${e.u}`;
      if (!seenEdge.has(key)) { seenEdge.add(key); allUndirectedEdges.push({ u: e.u, v: e.v }); }
    } else {
      const key = e.u < e.v ? `${e.u}-${e.v}` : `${e.v}-${e.u}`;
      if (!seenEdge.has(key)) { seenEdge.add(key); allUndirectedEdges.push({ u: Math.min(e.u, e.v), v: Math.max(e.u, e.v) }); }
    }
  }

  const visited = Array(V).fill(false);
  const treeEdges = [];
  let cycleInfo = null;
  const traversal = [];

  steps.push({
    badge: `isCyclic() started: Undirected graph with ${V} vertices and ${allUndirectedEdges.length} edges.`,
    code: 'c_init_vis',
    vars: [frame('isCyclic()', [['V', String(V)]])],
    V, edges: [...allUndirectedEdges], visitedArr: [...visited], visitedAllocated: false,
    activeU: -1, activeV: -1, activeParent: -1, treeEdges: [], cycleInfo: null,
    traversal: []
  });

  steps.push({
    badge: `boolean[] visited = new boolean[${V}]; → Initialized visited[] array to false.`,
    code: 'c_init_vis',
    vars: [frame('isCyclic()', [['V', String(V)], ['visited', JSON.stringify(visited)]])],
    V, edges: [...allUndirectedEdges], visitedArr: [...visited], visitedAllocated: true,
    activeU: -1, activeV: -1, activeParent: -1, treeEdges: [], cycleInfo: null,
    traversal: []
  });

  function dfs(u, parent, callStackFrames, pathNodes) {
    const currentPath = [...pathNodes, u];
    const curFrames = [
      ...callStackFrames,
      frame(`isCyclicUtil(u=${u}, parent=${parent})`, [
        ['u', String(u)],
        ['parent', String(parent)],
        ['visited[u]', 'false']
      ])
    ];

    steps.push({
      badge: `isCyclicUtil(u=${u}, parent=${parent}): Starting DFS exploration of vertex ${u}.`,
      code: 'c_dfs_start',
      vars: curFrames,
      V, edges: [...allUndirectedEdges], visitedArr: [...visited], visitedAllocated: true,
      activeU: u, activeV: -1, activeParent: parent, treeEdges: [...treeEdges], cycleInfo: null,
      traversal: [...traversal]
    });

    visited[u] = true;
    traversal.push(u);
    curFrames[curFrames.length - 1] = frame(`isCyclicUtil(u=${u}, parent=${parent})`, [
      ['u', String(u)],
      ['parent', String(parent)],
      ['visited[u]', 'true']
    ]);

    steps.push({
      badge: `visited[${u}] = true; → Marked vertex ${u} as visited.`,
      code: 'c_set_vis',
      vars: curFrames,
      V, edges: [...allUndirectedEdges], visitedArr: [...visited], visitedAllocated: true,
      activeU: u, activeV: -1, activeParent: parent, treeEdges: [...treeEdges], cycleInfo: null,
      traversal: [...traversal]
    });

    for (let v = 0; v < V; v++) {
      curFrames[curFrames.length - 1] = frame(`isCyclicUtil(u=${u}, parent=${parent})`, [
        ['u', String(u)],
        ['parent', String(parent)],
        ['v', String(v)],
        ['visited[u]', 'true']
      ]);

      steps.push({
        badge: `for (int v = ${v}; v < ${V}; v++): Inspecting neighbor vertex ${v}...`,
        code: 'c_nbr_loop',
        vars: curFrames,
        V, edges: [...allUndirectedEdges], visitedArr: [...visited], visitedAllocated: true,
        activeU: u, activeV: v, activeParent: parent, treeEdges: [...treeEdges], cycleInfo: null,
        traversal: [...traversal]
      });

      steps.push({
        badge: `if (adj[${u}][${v}] == 1) → ${adj[u][v] === 1 ? 'Edge exists between ' + u + ' and ' + v : 'No edge between ' + u + ' and ' + v}.`,
        code: 'c_check_adj',
        vars: curFrames,
        V, edges: [...allUndirectedEdges], visitedArr: [...visited], visitedAllocated: true,
        activeU: u, activeV: v, activeParent: parent, treeEdges: [...treeEdges], cycleInfo: null,
        traversal: [...traversal]
      });

      if (adj[u][v] === 1) {
        steps.push({
          badge: `if (!visited[${v}]) → visited[${v}] is ${visited[v]}.`,
          code: 'c_check_nbr_vis',
          vars: curFrames,
          V, edges: [...allUndirectedEdges], visitedArr: [...visited], visitedAllocated: true,
          activeU: u, activeV: v, activeParent: parent, treeEdges: [...treeEdges], cycleInfo: null,
          traversal: [...traversal]
        });

        if (!visited[v]) {
          treeEdges.push({ u: Math.min(u, v), v: Math.max(u, v) });

          steps.push({
            badge: `Neighbor ${v} is unvisited. Recursively calling isCyclicUtil(${v}, parent=${u})...`,
            code: 'c_rec_call',
            vars: curFrames,
            V, edges: [...allUndirectedEdges], visitedArr: [...visited], visitedAllocated: true,
            activeU: u, activeV: v, activeParent: parent, treeEdges: [...treeEdges], cycleInfo: null,
            traversal: [...traversal]
          });

          const cycleFound = dfs(v, u, curFrames, currentPath);
          if (cycleFound) {
            steps.push({
              badge: `return true; → Cycle detected in subtree of neighbor ${v}. Propagating return true upwards to parent ${parent}...`,
              code: 'c_ret_rec_true',
              vars: curFrames,
              V, edges: [...allUndirectedEdges], visitedArr: [...visited], visitedAllocated: true,
              activeU: u, activeV: v, activeParent: parent, treeEdges: [...treeEdges], cycleInfo,
              traversal: [...traversal]
            });
            return true;
          } else {
            steps.push({
              badge: `DFS traversal on neighbor ${v} finished without finding a cycle. Resuming neighbor loop at vertex ${u}...`,
              code: 'c_rec_call',
              vars: curFrames,
              V, edges: [...allUndirectedEdges], visitedArr: [...visited], visitedAllocated: true,
              activeU: u, activeV: v, activeParent: parent, treeEdges: [...treeEdges], cycleInfo: null,
              traversal: [...traversal]
            });
          }
        } else {
          // Visited neighbor - check if it is not the parent
          steps.push({
            badge: `else if (v != parent) → Checking if neighbor ${v} != parent ${parent}... (${v !== parent ? 'TRUE: Back-edge found!' : 'FALSE: Edge to immediate parent, not a cycle.'})`,
            code: 'c_check_parent',
            vars: curFrames,
            V, edges: [...allUndirectedEdges], visitedArr: [...visited], visitedAllocated: true,
            activeU: u, activeV: v, activeParent: parent, treeEdges: [...treeEdges], cycleInfo: null,
            traversal: [...traversal]
          });

          if (v !== parent) {
            // Cycle detected!
            const idxInPath = currentPath.indexOf(v);
            const cyclePathNodes = idxInPath !== -1 ? currentPath.slice(idxInPath) : [v, u];
            const cycleEdges = [];
            for (let k = 0; k < cyclePathNodes.length - 1; k++) {
              cycleEdges.push({ u: Math.min(cyclePathNodes[k], cyclePathNodes[k + 1]), v: Math.max(cyclePathNodes[k], cyclePathNodes[k + 1]) });
            }
            cycleEdges.push({ u: Math.min(u, v), v: Math.max(u, v) });

            cycleInfo = {
              detected: true,
              backEdge: { u: Math.min(u, v), v: Math.max(u, v) },
              cycleNodes: [...cyclePathNodes],
              cycleEdges: cycleEdges,
              cyclePath: [...cyclePathNodes, v]
            };

            steps.push({
              badge: `CYCLE DETECTED! Vertex ${v} is already visited and is NOT the parent of ${u} (${v} != ${parent}). Back-edge (${u} — ${v}) completes an undirected cycle!`,
              code: 'c_ret_cycle_true',
              vars: curFrames,
              V, edges: [...allUndirectedEdges], visitedArr: [...visited], visitedAllocated: true,
              activeU: u, activeV: v, activeParent: parent, treeEdges: [...treeEdges], cycleInfo,
              traversal: [...traversal]
            });
            return true;
          }
        }
      }
    }

    steps.push({
      badge: `return false; → All neighbors of vertex ${u} explored with no cycle found. Returning false to caller.`,
      code: 'c_dfs_ret_false',
      vars: curFrames,
      V, edges: [...allUndirectedEdges], visitedArr: [...visited], visitedAllocated: true,
      activeU: u, activeV: -1, activeParent: parent, treeEdges: [...treeEdges], cycleInfo: null,
      traversal: [...traversal]
    });
    return false;
  }

  let foundCycleOverall = false;
  for (let i = 0; i < V; i++) {
    const mainFrames = [frame('isCyclic()', [['V', String(V)], ['i', String(i)]])];

    steps.push({
      badge: `for (int i = ${i}; i < ${V}; i++): Inspecting vertex ${i} for new connected component...`,
      code: 'c_outer_loop',
      vars: mainFrames,
      V, edges: [...allUndirectedEdges], visitedArr: [...visited], visitedAllocated: true,
      activeI: i, activeU: -1, activeV: -1, activeParent: -1, treeEdges: [...treeEdges], cycleInfo: null,
      traversal: [...traversal]
    });

    steps.push({
      badge: `if (!visited[${i}]) → visited[${i}] is ${visited[i]}. ${!visited[i] ? 'Starting new DFS tree at vertex ' + i : 'Vertex ' + i + ' already visited, skipping.'}`,
      code: 'c_check_vis',
      vars: mainFrames,
      V, edges: [...allUndirectedEdges], visitedArr: [...visited], visitedAllocated: true,
      activeI: i, activeU: -1, activeV: -1, activeParent: -1, treeEdges: [...treeEdges], cycleInfo: null,
      traversal: [...traversal]
    });

    if (!visited[i]) {
      steps.push({
        badge: `Calling isCyclicUtil(u=${i}, parent=-1) to explore connected component...`,
        code: 'c_call_dfs',
        vars: mainFrames,
        V, edges: [...allUndirectedEdges], visitedArr: [...visited], visitedAllocated: true,
        activeI: i, activeU: -1, activeV: -1, activeParent: -1, treeEdges: [...treeEdges], cycleInfo: null,
        traversal: [...traversal]
      });

      if (dfs(i, -1, mainFrames, [])) {
        foundCycleOverall = true;
        steps.push({
          badge: `return true; → Component starting at vertex ${i} contains a cycle. Graph is cyclic!`,
          code: 'c_found_cycle',
          vars: [frame('isCyclic()', [['V', String(V)], ['hasCycle', 'true']])],
          V, edges: [...allUndirectedEdges], visitedArr: [...visited], visitedAllocated: true,
          activeI: i, activeU: -1, activeV: -1, activeParent: -1, treeEdges: [...treeEdges], cycleInfo,
          traversal: [...traversal]
        });
        break;
      }
    }
  }

  if (!foundCycleOverall) {
    steps.push({
      badge: `return false; → All ${V} vertices and connected components checked. No cycles exist in graph (Graph is Acyclic / Forest).`,
      code: 'c_done',
      vars: [frame('isCyclic()', [['V', String(V)], ['hasCycle', 'false']])],
      V, edges: [...allUndirectedEdges], visitedArr: [...visited], visitedAllocated: true,
      activeI: -1, activeU: -1, activeV: -1, activeParent: -1, treeEdges: [...treeEdges], cycleInfo: null,
      traversal: [...traversal]
    });
  }

  return steps;
}

// ─────────────────────────────────────────────────────────────────────────────
// STATE & REACTIVITY
// ─────────────────────────────────────────────────────────────────────────────
const numVInput       = ref(4);
const edgesInputStr   = ref('[[0,1],[1,2],[2,0],[2,3]]');
const defaultEdgeList = [[0,1],[1,2],[2,0],[2,3]];

const hoveredEdge = ref(null);
const hoveredNode = ref(null);

const lang           = ref('java');
const speed          = ref(650);
const si             = ref(0);
const playing        = ref(false);
const vizHeight      = ref(350);
const tableHeight    = ref(60);
const leftWidth      = ref(55);
const rightTab       = ref('code');
const showGraphModal = ref(false);

const stepsData = reactive({ steps: buildSteps(4, defaultEdgeList) });
const steps     = computed(() => stepsData.steps);
const s         = computed(() => steps.value[Math.max(0, Math.min(si.value, steps.value.length - 1))] || {});
const codeLines = computed(() => CODES[lang.value] || []);

// Hover helpers matching course standard
function isEdgeHovered(u, v) {
  if (!hoveredEdge.value) return false;
  const { u: hu, v: hv } = hoveredEdge.value;
  return (hu === u && hv === v) || (hu === v && hv === u);
}

function isNodeHoveredSource(nodeId) {
  return hoveredEdge.value && hoveredEdge.value.u === nodeId;
}

function isNodeHoveredTarget(nodeId) {
  return (hoveredEdge.value && hoveredEdge.value.v === nodeId) || (hoveredNode.value === nodeId);
}

function isCycleNode(id) {
  return s.value.cycleInfo && s.value.cycleInfo.detected && s.value.cycleInfo.cycleNodes && s.value.cycleInfo.cycleNodes.includes(id);
}

function isCycleEdge(u, v) {
  if (!s.value.cycleInfo || !s.value.cycleInfo.detected || !s.value.cycleInfo.cycleEdges) return false;
  return s.value.cycleInfo.cycleEdges.some(e => (e.u === u && e.v === v) || (e.u === v && e.v === u));
}

function isBackEdge(u, v) {
  if (!s.value.cycleInfo || !s.value.cycleInfo.backEdge) return false;
  const be = s.value.cycleInfo.backEdge;
  return (be.u === u && be.v === v) || (be.u === v && be.v === u);
}

function isTreeEdge(u, v) {
  return (s.value.treeEdges || []).some(e => (e.u === u && e.v === v) || (e.u === v && e.v === u));
}

function isActiveEdge(u, v) {
  const au = s.value.activeU, av = s.value.activeV;
  return (au === u && av === v) || (au === v && av === u);
}

// ─────────────────────────────────────────────────────────────────────────────
// NODE POSITIONS & UNDIRECTED GEOMETRY (Matching UnDirectedUnWeightedGraphMatrix.vue)
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

const undirectedEdgesForRender = computed(() => {
  const seen = new Set();
  const result = [];
  for (const e of (s.value.edges || [])) {
    if (e.u === e.v) {
      const key = `loop-${e.u}`;
      if (!seen.has(key)) { seen.add(key); result.push({ u: e.u, v: e.v }); }
    } else {
      const key = e.u < e.v ? `${e.u}-${e.v}` : `${e.v}-${e.u}`;
      if (!seen.has(key)) { seen.add(key); result.push({ u: Math.min(e.u, e.v), v: Math.max(e.u, e.v) }); }
    }
  }
  return result;
});

function getEdgeGeometry(edge, positions) {
  let uId = edge.u;
  let vId = edge.v;
  if (s.value && s.value.activeU >= 0 && s.value.activeV >= 0 && s.value.activeU !== s.value.activeV) {
    if ((edge.u === s.value.activeU && edge.v === s.value.activeV) || (edge.u === s.value.activeV && edge.v === s.value.activeU)) {
      uId = s.value.activeU;
      vId = s.value.activeV;
    }
  }

  const uNode = positions[uId];
  const vNode = positions[vId];
  if (!uNode || !vNode) return { pathD: '', isLoop: false };

  // Self loop (u === v)
  if (uId === vId) {
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
    return { pathD, isLoop: true };
  }

  // Normal undirected edge (u !== v)
  const x1 = uNode.x, y1 = uNode.y;
  const x2 = vNode.x, y2 = vNode.y;
  const dx = x2 - x1, dy = y2 - y1;
  const dist = Math.hypot(dx, dy) || 1;

  const ux = dx / dist, uy = dy / dist;

  const nodeR = 20;
  const startX = x1 + ux * nodeR;
  const startY = y1 + uy * nodeR;
  const endX = x2 - ux * nodeR;
  const endY = y2 - uy * nodeR;

  const pathD = `M ${startX} ${startY} L ${endX} ${endY}`;
  return { pathD, isLoop: false };
}

function getEdgeGeo(edge) {
  return getEdgeGeometry(edge, modalNodePositions.value);
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTROLS & TIMERS
// ─────────────────────────────────────────────────────────────────────────────
let playTimer = null;

function applySetup() {
  const rawV = parseInt(numVInput.value);
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
  const onMove = e => { if (!dragging) return; const mainW = main.offsetWidth; leftWidth.value = (Math.max(200, Math.min(mainW - 200, startW + e.clientX - startX)) / mainW) * 100; };
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
  cleanupFns.push(initVResizer(vizResizerRef,   vizHeight,   180, 500));
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
            <label>Undirected Edges</label>
            <input
              type="text"
              v-model="edgesInputStr"
              style="width:220px;"
              class="ll-text-input"
              placeholder="e.g. [[0,1],[1,2],[2,0],[2,3]]"
              @keyup.enter="applySetup"
            />
            <button class="ll-viz-btn" @click="applySetup" title="Run Cycle Detection">&#9654;</button>
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

            <!-- LEFT COLUMN -->
            <div class="ll-left-col" ref="leftColRef" :style="{ width: leftWidth + '%' }">
              <div class="ll-viz-wrap" :style="{ height: vizHeight + 'px' }">
                <div class="ll-perm-area">

                  <div v-if="(s.V ?? 0) === 0" class="ll-empty-matrix-msg">
                    No graph to display (Vertices = 0). Set Vertices &gt; 0 with undirected edges like [[0,1],[1,2],[2,0],[2,3]].
                  </div>

                  <template v-else>
                    <!-- Top Pointers Bar -->
                    <div class="ll-ptrs">
                      <div class="ll-ptr-chip">i = <b class="ll-c-orange">{{ s.activeI !== undefined && s.activeI >= 0 ? s.activeI : 'N/A' }}</b></div>
                      <div class="ll-ptr-chip">u = <b class="ll-c-orange">{{ s.activeU !== undefined && s.activeU >= 0 ? s.activeU : 'N/A' }}</b></div>
                      <div class="ll-ptr-chip">v = <b class="ll-c-purple">{{ s.activeV !== undefined && s.activeV >= 0 ? s.activeV : 'N/A' }}</b></div>
                      <div class="ll-ptr-chip">parent = <b class="ll-c-blue">{{ s.activeParent !== undefined && s.activeParent !== null ? s.activeParent : 'N/A' }}</b></div>
                      <div class="ll-ptr-chip">cycle = <b :class="s.cycleInfo && s.cycleInfo.detected ? 'll-c-red' : 'll-c-green'">{{ s.cycleInfo && s.cycleInfo.detected ? `Yes (${s.cycleInfo.backEdge.u} — ${s.cycleInfo.backEdge.v})` : 'No' }}</b></div>
                    </div>

                    <!-- ── visited[] Array Tracker ──────────────────────── -->
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
                            <span v-if="s.activeParent !== undefined && s.activeParent >= 0 && s.activeParent === (vIdx - 1) && s.activeU !== (vIdx - 1) && !isCycleNode(vIdx - 1)" class="ll-ptr-lbl ll-lbl-blue">parent</span>
                          </div>
                          <div
                            class="ll-arr-box"
                            :class="{
                              'll-box-cycle': isCycleNode(vIdx - 1),
                              'll-box-cur': (s.activeU === (vIdx - 1) || s.activeI === (vIdx - 1)) && !isCycleNode(vIdx - 1),
                              'll-box-nbr': s.activeV === (vIdx - 1) && s.activeU !== (vIdx - 1) && s.activeI !== (vIdx - 1) && !isCycleNode(vIdx - 1),
                              'll-box-parent': s.activeParent === (vIdx - 1) && s.activeU !== (vIdx - 1) && s.activeI !== (vIdx - 1) && s.activeV !== (vIdx - 1) && !isCycleNode(vIdx - 1),
                              'll-box-found': s.visitedArr && s.visitedArr[vIdx - 1] && s.activeU !== (vIdx - 1) && s.activeI !== (vIdx - 1) && s.activeV !== (vIdx - 1) && s.activeParent !== (vIdx - 1) && !isCycleNode(vIdx - 1)
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

              <!-- Color Legend -->
              <div class="ll-legend">
                <span class="ll-leg"><span class="ll-legdot ll-legdot-unvis"></span>Unvisited / False</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-active"></span>Active (i / u)</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-nbr"></span>Neighbor (v)</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-parent"></span>Parent Node</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-visited"></span>Visited / True</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-cycle"></span>Cycle / Back-Edge</span>
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

                <!-- Code Scroll with 1-to-1 Line Highlighting -->
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
                      <tr>
                        <td>Time Complexity (Adjacency Matrix)</td>
                        <td>O(V&sup2;)</td>
                        <td>With an adjacency matrix, checking all neighbors for each of the V vertices requires scanning V entries in that row. Total time = O(V&sup2;).</td>
                      </tr>
                      <tr>
                        <td>Time Complexity (Adjacency List)</td>
                        <td>O(V + E)</td>
                        <td>With an adjacency list, every vertex is visited once and every undirected edge is checked at most twice (once from each endpoint).</td>
                      </tr>
                      <tr>
                        <td>Space Complexity</td>
                        <td>O(V)</td>
                        <td>O(V) auxiliary memory for the <code>visited[]</code> boolean array and the recursive call stack depth (at most V in the worst-case path).</td>
                      </tr>
                    </tbody>
                  </table>
                  <p class="ll-note">
                    Key property: <b>An undirected graph contains a cycle if and only if DFS encounters an already-visited vertex that is NOT the immediate parent of the current vertex.</b>
                  </p>
                  <h3>Real-World Applications</h3>
                  <p>
                    <b>1. Spanning Tree Protocol (STP):</b> Ethernet network switches disable redundant physical links to prevent bridge loops and broadcast radiation.<br/>
                    <b>2. Circuit Analysis:</b> Identifying fundamental loops (Kirchhoff's Voltage Law KVL mesh equations) in electrical circuits.<br/>
                    <b>3. Wireless Mesh Networks:</b> Validating loop-free ad-hoc routing structures.<br/>
                    <b>4. Cluster &amp; Island Detection:</b> Identifying closed ring topologies in power grids and distribution pipelines.
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

    <!-- Floating Undirected Unweighted Graph Modal Dialog Container -->
    <div v-if="showGraphModal" class="graph-modal-backdrop" @click.self="showGraphModal = false">
      <div class="graph-modal-card">
        <div class="graph-modal-header">
          <div class="graph-modal-title">
            <span>Cycle Detection Undirected Graph View</span>
            <span class="graph-subtitle">(Synchronized with DFS &amp; Parent Tracking)</span>
          </div>
          <button class="graph-close-btn" @click="showGraphModal = false" title="Close modal">&times;</button>
        </div>

        <div class="graph-modal-body">
          <div v-if="(s.V ?? 0) === 0" class="ll-empty-graph-msg">
            No vertices or edges to display (Vertices = 0).
          </div>
          <svg v-else class="graph-modal-svg" viewBox="0 0 720 470">
            <!-- Undirected Edges -->
            <g
              v-for="edge in undirectedEdgesForRender"
              :key="'ue-' + edge.u + '-' + edge.v"
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

              <!-- Visible Undirected Edge Line -->
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
              />
            </g>

            <!-- Graph Vertex Nodes -->
            <g v-for="node in modalNodePositions" :key="'mn-' + node.id">
              <!-- Pointer Labels above/below Nodes based on position -->
              <g v-if="node.id === s.activeI || node.id === s.activeU || node.id === s.activeV || node.id === s.activeParent || isNodeHoveredSource(node.id) || isNodeHoveredTarget(node.id) || isCycleNode(node.id)">
                <template v-if="node.y > 230">
                  <text
                    :x="node.x"
                    :y="node.y + 22"
                    class="ll-svg-ptr"
                    :class="isNodeHoveredSource(node.id) ? 'll-svg-ptr-hover-src' : (isNodeHoveredTarget(node.id) ? 'll-svg-ptr-hover-tgt' : (isCycleNode(node.id) ? 'll-svg-ptr-red' : ((node.id === s.activeU || node.id === s.activeI) ? 'll-svg-ptr-orange' : (node.id === s.activeParent ? 'll-svg-ptr-purple' : 'll-svg-ptr-blue'))))"
                  >
                    &utrif;
                  </text>
                  <text
                    :x="node.x"
                    :y="node.y + 35"
                    class="ll-svg-ptr"
                    :class="isNodeHoveredSource(node.id) ? 'll-svg-ptr-hover-src' : (isNodeHoveredTarget(node.id) ? 'll-svg-ptr-hover-tgt' : (isCycleNode(node.id) ? 'll-svg-ptr-red' : ((node.id === s.activeU || node.id === s.activeI) ? 'll-svg-ptr-orange' : (node.id === s.activeParent ? 'll-svg-ptr-purple' : 'll-svg-ptr-blue'))))"
                  >
                    {{ isNodeHoveredSource(node.id) ? 'src' : (isNodeHoveredTarget(node.id) ? 'tgt' : (isCycleNode(node.id) ? 'cycle' : (node.id === s.activeI ? 'i' : (node.id === s.activeU ? 'u' : (node.id === s.activeParent ? 'parent' : 'v'))))) }}
                  </text>
                </template>
                <template v-else>
                  <text
                    :x="node.x"
                    :y="node.y - 28"
                    class="ll-svg-ptr"
                    :class="isNodeHoveredSource(node.id) ? 'll-svg-ptr-hover-src' : (isNodeHoveredTarget(node.id) ? 'll-svg-ptr-hover-tgt' : (isCycleNode(node.id) ? 'll-svg-ptr-red' : ((node.id === s.activeU || node.id === s.activeI) ? 'll-svg-ptr-orange' : (node.id === s.activeParent ? 'll-svg-ptr-purple' : 'll-svg-ptr-blue'))))"
                  >
                    {{ isNodeHoveredSource(node.id) ? 'src' : (isNodeHoveredTarget(node.id) ? 'tgt' : (isCycleNode(node.id) ? 'cycle' : (node.id === s.activeI ? 'i' : (node.id === s.activeU ? 'u' : (node.id === s.activeParent ? 'parent' : 'v'))))) }}
                  </text>
                  <text
                    :x="node.x"
                    :y="node.y - 17"
                    class="ll-svg-ptr"
                    :class="isNodeHoveredSource(node.id) ? 'll-svg-ptr-hover-src' : (isNodeHoveredTarget(node.id) ? 'll-svg-ptr-hover-tgt' : (isCycleNode(node.id) ? 'll-svg-ptr-red' : ((node.id === s.activeU || node.id === s.activeI) ? 'll-svg-ptr-orange' : (node.id === s.activeParent ? 'll-svg-ptr-purple' : 'll-svg-ptr-blue'))))"
                  >
                    &darr;
                  </text>
                </template>
              </g>

              <!-- Node Circle -->
              <circle
                :cx="node.x"
                :cy="node.y"
                r="20"
                class="ll-node-circle"
                :class="{
                  'll-node-cycle':     isCycleNode(node.id),
                  'll-node-u':         (node.id === s.activeU || node.id === s.activeI) && !isCycleNode(node.id),
                  'll-node-parent':    node.id === s.activeParent && node.id !== s.activeU && node.id !== s.activeI && !isCycleNode(node.id),
                  'll-node-v':         node.id === s.activeV && node.id !== s.activeU && node.id !== s.activeI && node.id !== s.activeParent && !isCycleNode(node.id),
                  'll-node-visited':   s.visitedArr && s.visitedArr[node.id] && node.id !== s.activeU && node.id !== s.activeI && !isCycleNode(node.id),
                  'll-node-hover-src': isNodeHoveredSource(node.id),
                  'll-node-hover-tgt': isNodeHoveredTarget(node.id)
                }"
              />

              <!-- Node Text Label -->
              <text
                :x="node.x"
                :y="node.y + 5"
                class="ll-node-text"
                :class="{
                  'll-node-text-cycle':     isCycleNode(node.id),
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
.ll-box-cur { border-color: #f59e0b !important; background: #fef3c7 !important; color: #92400e !important; box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.25) !important; }
.ll-box-nbr { border-color: #9333ea !important; background: #f3e8ff !important; color: #6b21a8 !important; box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.25) !important; }
.ll-box-parent { border-color: #3b82f6 !important; background: #dbeafe !important; color: #1e40af !important; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25) !important; }
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
.ll-legdot-visited { background: #dcfce7; border: 1.5px solid #10b981; }
.ll-legdot-active  { background: #fef3c7; border: 1.5px solid #f59e0b; }
.ll-legdot-nbr     { background: #f3e8ff; border: 1.5px solid #9333ea; }
.ll-legdot-parent  { background: #dbeafe; border: 1.5px solid #3b82f6; }
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

/* SVG Graph Elements (Undirected) */
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
.ll-node-u { fill: #fff7ed !important; stroke: #f97316 !important; stroke-width: 3.5 !important; }
.ll-node-parent { fill: #f3e8ff !important; stroke: #9333ea !important; stroke-width: 3.5 !important; }
.ll-node-v { fill: #eff6ff !important; stroke: #3b82f6 !important; stroke-width: 3.5 !important; }
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
