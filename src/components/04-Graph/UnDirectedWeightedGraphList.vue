<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, watch } from 'vue';

defineProps({
  topic: { type: String, default: 'Undirected Weighted Graph' },
  subTopic: { type: String, default: 'Adjacency List (Collections) Representation' }
});

const CODES = {
  java: [
    ['', 'import java.util.ArrayList;'],
    ['', 'import java.util.List;'],
    ['', 'import java.util.Scanner;'],
    ['', ''],
    ['', 'class Pair {'],
    ['', '    int neighbor;'],
    ['', '    int weight;'],
    ['', '    Pair(int neighbor, int weight) {'],
    ['', '        this.neighbor = neighbor;'],
    ['', '        this.weight = weight;'],
    ['', '    }'],
    ['', '}'],
    ['', ''],
    ['', 'class Graph {'],
    ['', '    private List<List<Pair>> adjList;'],
    ['', ''],
    ['c_ctor_entry', '    Graph(int vertices) {'],
    ['c_alloc_list', '        adjList = new ArrayList<>();'],
    ['c_init_loop', '        for (int i = 0; i < vertices; i++) {'],
    ['c_add_empty', '            adjList.add(new ArrayList<>());'],
    ['', '        }'],
    ['c_ctor_done', '    }'],
    ['', ''],
    ['c_add_edge_entry', '    void addEdge(int source, int destination, int weight) {'],
    ['c_set_uv', '        adjList.get(source).add(new Pair(destination, weight));'],
    ['c_set_vu', '        adjList.get(destination).add(new Pair(source, weight));  // symmetric'],
    ['c_add_edge_done', '    }'],
    ['', '}'],
    ['', ''],
    ['', 'public class Main {'],
    ['c_main_entry', '    public static void main(String[] args) {'],
    ['c_sc_new', '        Scanner sc = new Scanner(System.in);'],
    ['c_sc_vertices', '        int vertices = sc.nextInt();'],
    ['c_new_graph', '        Graph graph = new Graph(vertices);'],
    ['c_sc_edges', '        int edges = sc.nextInt();'],
    ['', ''],
    ['c_loop_i', '        for (int i = 0; i < edges; i++) {'],
    ['c_sc_src', '            int source = sc.nextInt();'],
    ['c_sc_dst', '            int destination = sc.nextInt();'],
    ['c_sc_weight', '            int weight = sc.nextInt();'],
    ['c_call_add_edge', '            graph.addEdge(source, destination, weight);'],
    ['', '        }'],
    ['c_sc_close', '        sc.close();'],
    ['c_main_done', '    }'],
    ['', '}']
  ],
  c: [
    ['', '#include <stdio.h>'],
    ['', '#include <stdlib.h>'],
    ['', ''],
    ['', 'struct Node {'],
    ['', '    int dest;'],
    ['', '    int weight;'],
    ['', '    struct Node* next;'],
    ['', '};'],
    ['', ''],
    ['', 'struct Graph {'],
    ['', '    int vertices;'],
    ['', '    struct Node** adjList;'],
    ['', '};'],
    ['', ''],
    ['c_ctor_entry', 'struct Graph* createGraph(int vertices) {'],
    ['c_alloc_struct', '    struct Graph* g = (struct Graph*)malloc(sizeof(struct Graph));'],
    ['c_v_assign', '    g->vertices = vertices;'],
    ['c_alloc_list', '    g->adjList = (struct Node**)malloc('],
    ['c_alloc_list', '        vertices * sizeof(struct Node*)'],
    ['c_alloc_list', '    );'],
    ['c_init_loop', '    for (int i = 0; i < vertices; i++) {'],
    ['c_add_empty', '        g->adjList[i] = NULL;'],
    ['', '    }'],
    ['c_ctor_done', '    return g;'],
    ['', '}'],
    ['', ''],
    ['c_add_edge_entry', 'void addEdge(struct Graph* g, int source, int destination, int weight) {'],
    ['c_set_uv', '    struct Node* n1 = (struct Node*)malloc('],
    ['c_set_uv', '        sizeof(struct Node)'],
    ['c_set_uv', '    );'],
    ['c_set_uv', '    n1->dest = destination;'],
    ['c_set_uv', '    n1->weight = weight;'],
    ['c_set_uv', '    n1->next = g->adjList[source];'],
    ['c_set_uv', '    g->adjList[source] = n1;'],
    ['c_set_vu', '    struct Node* n2 = (struct Node*)malloc('],
    ['c_set_vu', '        sizeof(struct Node)'],
    ['c_set_vu', '    );'],
    ['c_set_vu', '    n2->dest = source;'],
    ['c_set_vu', '    n2->weight = weight;'],
    ['c_set_vu', '    n2->next = g->adjList[destination];'],
    ['c_set_vu', '    g->adjList[destination] = n2;'],
    ['c_add_edge_done', '}'],
    ['', ''],
    ['c_main_entry', 'int main() {'],
    ['c_sc_vertices', '    int vertices;'],
    ['c_sc_vertices', '    scanf("%d", &vertices);'],
    ['c_new_graph', '    struct Graph* graph = createGraph(vertices);'],
    ['c_sc_edges', '    int edges;'],
    ['c_sc_edges', '    scanf("%d", &edges);'],
    ['', ''],
    ['c_loop_i', '    for (int i = 0; i < edges; i++) {'],
    ['c_sc_src_dst_w', '        int source, destination, weight;'],
    ['c_sc_src', '        scanf("%d", &source);'],
    ['c_sc_dst', '        scanf("%d", &destination);'],
    ['c_sc_weight', '        scanf("%d", &weight);'],
    ['c_call_add_edge', '        addEdge(graph, source, destination, weight);'],
    ['', '    }'],
    ['c_main_done', '    return 0;'],
    ['', '}']
  ],
  cpp: [
    ['', '#include <iostream>'],
    ['', '#include <vector>'],
    ['', '#include <utility>'],
    ['', 'using namespace std;'],
    ['', ''],
    ['', 'class Graph {'],
    ['', 'private:'],
    ['', '    vector<vector<pair<int, int>>> adjList;'],
    ['', 'public:'],
    ['c_ctor_entry', '    Graph(int vertices) {'],
    ['c_alloc_list', '        adjList.resize(vertices);'],
    ['c_init_loop', '        for (int i = 0; i < vertices; i++) {'],
    ['c_add_empty', '            adjList[i] = vector<pair<int, int>>();'],
    ['', '        }'],
    ['c_ctor_done', '    }'],
    ['', ''],
    ['c_add_edge_entry', '    void addEdge(int source, int destination, int weight) {'],
    ['c_set_uv', '        adjList[source].push_back({destination, weight});'],
    ['c_set_vu', '        adjList[destination].push_back({source, weight});  // symmetric'],
    ['c_add_edge_done', '    }'],
    ['', '};'],
    ['', ''],
    ['c_main_entry', 'int main() {'],
    ['c_sc_vertices', '    int vertices;'],
    ['c_sc_vertices', '    cin >> vertices;'],
    ['c_new_graph', '    Graph graph(vertices);'],
    ['c_sc_edges', '    int edges;'],
    ['c_sc_edges', '    cin >> edges;'],
    ['', ''],
    ['c_loop_i', '    for (int i = 0; i < edges; i++) {'],
    ['c_sc_src_dst_w', '        int source, destination, weight;'],
    ['c_sc_src', '        cin >> source;'],
    ['c_sc_dst', '        cin >> destination;'],
    ['c_sc_weight', '        cin >> weight;'],
    ['c_call_add_edge', '        graph.addEdge(source, destination, weight);'],
    ['', '    }'],
    ['c_main_done', '    return 0;'],
    ['', '}']
  ],
  python: [
    ['', 'class Graph:'],
    ['c_ctor_entry', '    def __init__(self, vertices):'],
    ['c_alloc_list', '        self.adjList = []'],
    ['c_init_loop', '        for i in range(vertices):'],
    ['c_add_empty', '            self.adjList.append([])'],
    ['c_ctor_done', '        pass'],
    ['', ''],
    ['c_add_edge_entry', '    def addEdge(self, source, destination, weight):'],
    ['c_set_uv', '        self.adjList[source].append((destination, weight))'],
    ['c_set_vu', '        self.adjList[destination].append((source, weight))  # symmetric'],
    ['c_add_edge_done', '        pass'],
    ['', ''],
    ['c_main_entry', 'def main():'],
    ['c_sc_vertices', '    vertices = int(input())'],
    ['c_new_graph', '    graph = Graph(vertices)'],
    ['c_sc_edges', '    edges = int(input())'],
    ['', ''],
    ['c_loop_i', '    for i in range(edges):'],
    ['c_sc_src', '        source = int(input())'],
    ['c_sc_dst', '        destination = int(input())'],
    ['c_sc_weight', '        weight = int(input())'],
    ['c_call_add_edge', '        graph.addEdge(source, destination, weight)'],
    ['c_main_done', '    pass'],
    ['', 'if __name__ == "__main__":'],
    ['', '    main()']
  ],
  javascript: [
    ['', 'class Graph {'],
    ['c_ctor_entry', '    constructor(vertices) {'],
    ['c_alloc_list', '        this.adjList = [];'],
    ['c_init_loop', '        for (let i = 0; i < vertices; i++) {'],
    ['c_add_empty', '            this.adjList.push([]);'],
    ['', '        }'],
    ['c_ctor_done', '    }'],
    ['', ''],
    ['c_add_edge_entry', '    addEdge(source, destination, weight) {'],
    ['c_set_uv', '        this.adjList[source].push({ node: destination, weight });'],
    ['c_set_vu', '        this.adjList[destination].push({ node: source, weight });  // symmetric'],
    ['c_add_edge_done', '    }'],
    ['', '}'],
    ['', ''],
    ['c_main_entry', 'function main() {'],
    ['c_sc_vertices', '    const vertices = parseInt(prompt("Enter vertices:"));'],
    ['c_new_graph', '    const graph = new Graph(vertices);'],
    ['c_sc_edges', '    const edges = parseInt(prompt("Enter edges:"));'],
    ['', ''],
    ['c_loop_i', '    for (let i = 0; i < edges; i++) {'],
    ['c_sc_src', '        const source = parseInt(prompt("Enter source:"));'],
    ['c_sc_dst', '        const destination = parseInt(prompt("Enter destination:"));'],
    ['c_sc_weight', '        const weight = parseInt(prompt("Enter weight:"));'],
    ['c_call_add_edge', '        graph.addEdge(source, destination, weight);'],
    ['', '    }'],
    ['c_main_done', '}']
  ]
};

const PSEUDOCODE = [
  'class Pair: neighbor, weight',
  'class Graph:',
  '    constructor(vertices):',
  '        adjList = List of empty Lists of size vertices',
  '    method addEdge(source, destination, weight):',
  '        adjList.get(source).add(Pair(destination, weight))',
  '        adjList.get(destination).add(Pair(source, weight))  // symmetric (undirected)',
  '',
  'main():',
  '    read vertices',
  '    instantiate graph = new Graph(vertices)',
  '    read edges',
  '    for i in 0..edges-1:',
  '        read source, destination, weight',
  '        graph.addEdge(source, destination, weight)'
];

function frame(title, rows) { return { title, rows }; }
function cloneAdj(adj) {
  const c = {};
  for (const k in adj) c[k] = adj[k].map(item => ({ ...item }));
  return c;
}

function buildSteps(numV, edgeList) {
  const steps = [];
  const rawV = parseInt(numV);
  const V = isNaN(rawV) || rawV < 0 ? 0 : Math.min(10, rawV);
  const E = edgeList.length;

  if (V === 0) {
    steps.push({
      badge: 'vertices = 0. No Graph or Adjacency List instantiated.',
      code: 'c_sc_vertices',
      vars: [frame('main()', [['vertices', '0']])],
      V: 0, adjList: {}, activeU: -1, activeV: -1, activeW: -1, activeK: -1, curI: -1, curJ: -1, edges: []
    });
    return steps;
  }

  // 1. main() entry
  steps.push({
    badge: 'main() started: Scanner sc = new Scanner(System.in);',
    code: 'c_main_entry',
    vars: [frame('main()', [])],
    V: 0, adjList: {}, activeU: -1, activeV: -1, activeW: -1, activeK: -1, curI: -1, curJ: -1, edges: []
  });

  // 2. Read vertices
  steps.push({
    badge: `int vertices = sc.nextInt(); → Read vertices = ${V}`,
    code: 'c_sc_vertices',
    vars: [frame('main()', [['vertices', String(V)]])],
    V: 0, adjList: {}, activeU: -1, activeV: -1, activeW: -1, activeK: -1, curI: -1, curJ: -1, edges: []
  });

  // 3. Graph graph = new Graph(vertices);
  steps.push({
    badge: `Graph graph = new Graph(${V}); → Instantiating Graph object`,
    code: 'c_new_graph',
    vars: [frame('main()', [['vertices', String(V)]])],
    V: 0, adjList: {}, activeU: -1, activeV: -1, activeW: -1, activeK: -1, curI: -1, curJ: -1, edges: []
  });

  // Constructor entry
  steps.push({
    badge: `Graph(int vertices) constructor called with vertices = ${V}`,
    code: 'c_ctor_entry',
    vars: [frame('main()', [['vertices', String(V)]]), frame('Graph()', [['vertices', String(V)]])],
    V: 0, adjList: {}, activeU: -1, activeV: -1, activeW: -1, activeK: -1, curI: -1, curJ: -1, edges: []
  });

  steps.push({
    badge: `adjList = new ArrayList<>(); → Allocated List for ${V} vertex buckets`,
    code: 'c_alloc_list',
    vars: [frame('main()', [['vertices', String(V)]]), frame('Graph()', [['vertices', String(V)], ['adjList', `List(${V})`]])],
    V: 0, adjList: {}, activeU: -1, activeV: -1, activeW: -1, activeK: -1, curI: -1, curJ: -1, edges: []
  });

  // Init loop buckets step by step
  const tempAdj = {};
  for (let i = 0; i < V; i++) {
    steps.push({
      badge: `for (int i = ${i}; i < vertices (${V}); i++) → Loop iteration i = ${i}`,
      code: 'c_init_loop',
      vars: [frame('main()', [['vertices', String(V)]]), frame('Graph()', [['vertices', String(V)], ['i', String(i)]])],
      V, adjList: cloneAdj(tempAdj), activeU: -1, activeV: -1, activeW: -1, activeK: -1, curI: i, curJ: -1, edges: []
    });

    tempAdj[i] = [];

    steps.push({
      badge: `adjList.add(new ArrayList<>()); → Added empty list for vertex ${i}`,
      code: 'c_add_empty',
      vars: [frame('main()', [['vertices', String(V)]]), frame('Graph()', [['vertices', String(V)], ['i', String(i)], [`adjList[${i}]`, '[]']])],
      V, adjList: cloneAdj(tempAdj), activeU: -1, activeV: -1, activeW: -1, activeK: -1, curI: i, curJ: -1, edges: []
    });
  }

  const initialAdj = cloneAdj(tempAdj);

  steps.push({
    badge: `Graph constructor finished. Graph instance created with ${V} empty Adjacency List buckets.`,
    code: 'c_ctor_done',
    vars: [frame('main()', [['vertices', String(V)], ['graph', 'Graph@inst']])],
    V, adjList: cloneAdj(initialAdj), activeU: -1, activeV: -1, activeW: -1, activeK: -1, curI: -1, curJ: -1, edges: []
  });

  // 4. Read edges
  steps.push({
    badge: `int edges = sc.nextInt(); → Read edge count edges = ${E}`,
    code: 'c_sc_edges',
    vars: [frame('main()', [['vertices', String(V)], ['edges', String(E)]])],
    V, adjList: cloneAdj(initialAdj), activeU: -1, activeV: -1, activeW: -1, activeK: -1, curI: -1, curJ: -1, edges: []
  });

  const currentAdj = cloneAdj(initialAdj);
  const processedEdges = [];

  for (let i = 0; i < edgeList.length; i++) {
    const edge = edgeList[i];
    const u = edge[0], v = edge[1], weight = edge[2] !== undefined ? edge[2] : 1;

    steps.push({
      badge: `for (int i = ${i}; i < edges (${E}); i++) → Loop iteration i = ${i}`,
      code: 'c_loop_i',
      vars: [frame('main()', [['vertices', String(V)], ['edges', String(E)], ['i', String(i)]])],
      V, adjList: cloneAdj(currentAdj), activeU: -1, activeV: -1, activeW: -1, activeK: i, curI: -1, curJ: -1, edges: [...processedEdges]
    });

    // Read source
    steps.push({
      badge: `int source = sc.nextInt(); → Read source vertex source = ${u}`,
      code: 'c_sc_src',
      vars: [frame('main()', [['vertices', String(V)], ['edges', String(E)], ['i', String(i)], ['source', String(u)]])],
      V, adjList: cloneAdj(currentAdj), activeU: u, activeV: -1, activeW: -1, activeK: i, curI: -1, curJ: -1, edges: [...processedEdges]
    });

    // Read destination
    steps.push({
      badge: `int destination = sc.nextInt(); → Read destination vertex destination = ${v}`,
      code: 'c_sc_dst',
      vars: [frame('main()', [['vertices', String(V)], ['edges', String(E)], ['i', String(i)], ['source', String(u)], ['destination', String(v)]])],
      V, adjList: cloneAdj(currentAdj), activeU: u, activeV: v, activeW: -1, activeK: i, curI: -1, curJ: -1, edges: [...processedEdges]
    });

    // Read weight
    steps.push({
      badge: `int weight = sc.nextInt(); → Read edge weight weight = ${weight}`,
      code: 'c_sc_weight',
      vars: [frame('main()', [['vertices', String(V)], ['edges', String(E)], ['i', String(i)], ['source', String(u)], ['destination', String(v)], ['weight', String(weight)]])],
      V, adjList: cloneAdj(currentAdj), activeU: u, activeV: v, activeW: weight, activeK: i, curI: -1, curJ: -1, edges: [...processedEdges]
    });

    // Call addEdge
    steps.push({
      badge: `graph.addEdge(${u}, ${v}, ${weight}); → Calling addEdge(source, destination, weight)`,
      code: 'c_call_add_edge',
      vars: [frame('main()', [['i', String(i)], ['source', String(u)], ['destination', String(v)], ['weight', String(weight)]])],
      V, adjList: cloneAdj(currentAdj), activeU: u, activeV: v, activeW: weight, activeK: i, curI: -1, curJ: -1, edges: [...processedEdges]
    });

    // Entry addEdge
    steps.push({
      badge: `addEdge(int source = ${u}, int destination = ${v}, int weight = ${weight})`,
      code: 'c_add_edge_entry',
      vars: [frame('main()', [['i', String(i)]]), frame('addEdge()', [['source', String(u)], ['destination', String(v)], ['weight', String(weight)]])],
      V, adjList: cloneAdj(currentAdj), activeU: u, activeV: v, activeW: weight, activeK: i, curI: -1, curJ: -1, edges: [...processedEdges]
    });

    const isValid = u >= 0 && u < V && v >= 0 && v < V;

    if (isValid) {
      const existingUV = currentAdj[u].find(item => item.v === v);
      if (existingUV) existingUV.w = weight;
      else currentAdj[u].push({ v, w: weight });

      const existingEdge = processedEdges.find(e => (e.u === u && e.v === v) || (e.u === v && e.v === u));
      if (existingEdge) existingEdge.weight = weight;
      else processedEdges.push({ u, v, weight });

      steps.push({
        badge: `adjList.get(${u}).add(new Pair(${v}, ${weight})); → Added Pair(${v}, ${weight}) to vertex ${u}'s list`,
        code: 'c_set_uv',
        vars: [frame('main()', [['i', String(i)]]), frame('addEdge()', [['source', String(u)], ['destination', String(v)], ['weight', String(weight)], [`adjList[${u}]`, JSON.stringify(currentAdj[u])]])],
        V, adjList: cloneAdj(currentAdj), activeU: u, activeV: v, activeW: weight, activeK: i, curI: u, curJ: v, edges: [...processedEdges]
      });

      const existingVU = currentAdj[v].find(item => item.v === u);
      if (existingVU) existingVU.w = weight;
      else currentAdj[v].push({ v: u, w: weight });

      steps.push({
        badge: `adjList.get(${v}).add(new Pair(${u}, ${weight})); → Added symmetric Pair(${u}, ${weight}) to vertex ${v}'s list (undirected)`,
        code: 'c_set_vu',
        vars: [frame('main()', [['i', String(i)]]), frame('addEdge()', [['source', String(u)], ['destination', String(v)], ['weight', String(weight)], [`adjList[${v}]`, JSON.stringify(currentAdj[v])]])],
        V, adjList: cloneAdj(currentAdj), activeU: v, activeV: u, activeW: weight, activeK: i, curI: v, curJ: u, edges: [...processedEdges]
      });
    }

    steps.push({
      badge: `addEdge(${u}, ${v}, ${weight}) completed.`,
      code: 'c_add_edge_done',
      vars: [frame('main()', [['i', String(i)], ['source', String(u)], ['destination', String(v)], ['weight', String(weight)]])],
      V, adjList: cloneAdj(currentAdj), activeU: -1, activeV: -1, activeW: -1, activeK: i, curI: -1, curJ: -1, edges: [...processedEdges]
    });
  }

  steps.push({
    badge: 'sc.close(); → Scanner resource closed.',
    code: 'c_sc_close',
    vars: [frame('main()', [['vertices', String(V)], ['edges', String(E)]])],
    V, adjList: cloneAdj(currentAdj), activeU: -1, activeV: -1, activeW: -1, activeK: -1, curI: -1, curJ: -1, edges: [...processedEdges]
  });

  steps.push({
    badge: `main() finished: All ${E} undirected weighted edges added to Graph Adjacency List.`,
    code: 'c_main_done',
    vars: [frame('main()', [['vertices', String(V)], ['edges', String(E)], ['totalEdges', String(processedEdges.length)]])],
    V, adjList: cloneAdj(currentAdj), activeU: -1, activeV: -1, activeW: -1, activeK: -1, curI: -1, curJ: -1, edges: [...processedEdges]
  });

  return steps;
}

const numVInput = ref(4);
const edgesInputStr = ref('[[0,1,5],[0,2,4],[1,2,3],[2,3,8]]');

function parseEdges(str) {
  if (!str || !str.trim()) return [];
  try {
    const parsed = JSON.parse(str);
    if (Array.isArray(parsed)) {
      return parsed
        .filter(e => Array.isArray(e) && e.length >= 2)
        .map(e => [
          parseInt(e[0]),
          parseInt(e[1]),
          e[2] !== undefined ? parseInt(e[2]) : 1
        ])
        .filter(e => !isNaN(e[0]) && !isNaN(e[1]) && !isNaN(e[2]));
    }
  } catch (err) {
    const matches = (str || '').match(/\[\s*\d+\s*,\s*\d+\s*(?:,\s*\d+\s*)?\]/g);
    if (matches) {
      return matches.map(m => {
        try {
          const arr = JSON.parse(m);
          return [parseInt(arr[0]), parseInt(arr[1]), arr[2] !== undefined ? parseInt(arr[2]) : 1];
        } catch (e) { return null; }
      }).filter(Boolean);
    }
  }
  return [];
}

const defaultEdgeList = [[0, 1, 5], [0, 2, 4], [1, 2, 3], [2, 3, 8]];

const hoveredEdge = ref(null);

function isEdgeHovered(u, v) {
  if (!hoveredEdge.value) return false;
  const { u: hu, v: hv } = hoveredEdge.value;
  return (hu === u && hv === v) || (hu === v && hv === u);
}
function isNodeHoveredSource(nodeId) {
  return hoveredEdge.value && hoveredEdge.value.u === nodeId;
}
function isNodeHoveredTarget(nodeId) {
  return hoveredEdge.value && hoveredEdge.value.v === nodeId;
}

const lang = ref('java');
const speed = ref(650);
const si = ref(0);
const playing = ref(false);
const vizHeight = ref(300);
const tableHeight = ref(60);
const leftWidth = ref(55);
const rightTab = ref('code');
const showGraphModal = ref(false);

const stepsData = reactive({ steps: buildSteps(4, defaultEdgeList) });
const steps = computed(() => stepsData.steps);
const s = computed(() => steps.value[Math.max(0, Math.min(si.value, steps.value.length - 1))] || {});
const codeLines = computed(() => CODES[lang.value] || []);

const createdVertices = computed(() => {
  if (!s.value || !s.value.adjList) return [];
  return Object.keys(s.value.adjList).map(Number).sort((a, b) => a - b);
});

watch(lang, () => {
  const currentV = s.value.V ?? 4;
  const parsed = parseEdges(edgesInputStr.value);
  stepsData.steps = buildSteps(currentV, parsed.length ? parsed : defaultEdgeList);
});

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
    const weight = e.weight !== undefined ? e.weight : 1;
    if (e.u === e.v) {
      const key = `loop-${e.u}`;
      if (!seen.has(key)) { seen.add(key); result.push({ u: e.u, v: e.v, weight }); }
    } else {
      const key = e.u < e.v ? `${e.u}-${e.v}` : `${e.v}-${e.u}`;
      if (!seen.has(key)) { seen.add(key); result.push({ u: Math.min(e.u, e.v), v: Math.max(e.u, e.v), weight }); }
    }
  }
  if (s.value && s.value.activeU >= 0 && s.value.activeV >= 0) {
    const au = s.value.activeU, av = s.value.activeV;
    const weight = s.value.activeW !== undefined && s.value.activeW >= 0 ? s.value.activeW : 1;
    if (au === av) {
      const key = `loop-${au}`;
      if (!seen.has(key)) { seen.add(key); result.push({ u: au, v: av, weight }); }
    } else {
      const key = au < av ? `${au}-${av}` : `${av}-${au}`;
      if (!seen.has(key)) { seen.add(key); result.push({ u: Math.min(au, av), v: Math.max(au, av), weight }); }
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
  if (!uNode || !vNode) return { pathD: '', labelX: 0, labelY: 0, isLoop: false };

  if (uId === vId) {
    const x0 = uNode.x, y0 = uNode.y;
    const gCx = 360, gCy = 230;
    let dx = x0 - gCx, dy = y0 - gCy;
    let dist = Math.hypot(dx, dy);
    if (dist < 1e-3) { dx = 0; dy = -1; dist = 1; }
    const dirX = dx / dist, dirY = dy / dist;
    const px = -dirY, py = dirX;

    const nodeR = 20, loopOffset = 38;
    const startX = x0 + dirX * nodeR - px * 10;
    const startY = y0 + dirY * nodeR - py * 10;
    const endX = x0 + dirX * nodeR + px * 10;
    const endY = y0 + dirY * nodeR + py * 10;
    const c1X = startX + dirX * loopOffset - px * 14;
    const c1Y = startY + dirY * loopOffset - py * 14;
    const c2X = endX + dirX * loopOffset + px * 14;
    const c2Y = endY + dirY * loopOffset + py * 14;

    const pathD = `M ${startX} ${startY} C ${c1X} ${c1Y}, ${c2X} ${c2Y}, ${endX} ${endY}`;
    const labelX = x0 + dirX * (nodeR + loopOffset + 12);
    const labelY = y0 + dirY * (nodeR + loopOffset + 12);
    return { pathD, labelX, labelY, isLoop: true };
  }

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
  const labelX = (startX + endX) / 2;
  const labelY = (startY + endY) / 2;
  return { pathD, labelX, labelY, isLoop: false };
}

function getEdgeGeo(edge) {
  return getEdgeGeometry(edge, modalNodePositions.value);
}

let playTimer = null;

function applySetup() {
  const rawV = parseInt(numVInput.value);
  const vCount = isNaN(rawV) || rawV < 0 ? 0 : Math.min(10, rawV);
  const parsedEdges = parseEdges(edgesInputStr.value);
  playing.value = false;
  stepsData.steps = buildSteps(vCount, parsedEdges);
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
  if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;
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
            <input type="text" v-model="edgesInputStr" style="width: 240px;" class="ll-text-input" placeholder="e.g. [[0,1,5],[0,2,4],[1,2,3]]" @keyup.enter="applySetup" />
            <button class="ll-viz-btn" @click="applySetup" title="Visualize Edge List Loop">&#9654;</button>

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
                  <!-- Adjacency List Collections Display -->
                  <div class="ll-adj-list-area">
                    <div class="ll-adj-card">
                      <div class="ll-card-header">
                        <div class="ll-card-title-main">adj</div>
                        <div class="ll-card-subtitle">{{ createdVertices.length }} inner lists</div>
                      </div>
                      <div v-if="(s.V ?? 0) === 0 || createdVertices.length === 0" class="ll-empty-matrix-msg">
                        No Collections instantiated yet. Step through constructor to add inner lists.
                      </div>
                      <div v-else class="ll-adj-wrap">
                        <div
                          v-for="uVal in createdVertices"
                          :key="'row-' + uVal"
                          class="ll-adj-row"
                        >
                          <!-- Vertex Box (Purple) -->
                          <div
                            class="ll-adj-v-head"
                            :class="{
                              'll-adj-v-head-active-u': uVal === s.activeU || uVal === s.curI,
                              'll-adj-v-head-active-v': uVal === s.activeV || uVal === s.curJ
                            }"
                          >
                            <div class="ll-ptr-tag-wrap" style="position: absolute; bottom: 100%; margin-bottom: 2px; left: 50%; transform: translateX(-50%); z-index: 10; pointer-events: none;">
                              <span v-if="uVal === s.activeU" class="ll-ptr-lbl ll-lbl-blue">u</span>
                              <span v-if="uVal === s.activeV" class="ll-ptr-lbl ll-lbl-purple">v</span>
                            </div>
                            {{ uVal }}
                          </div>

                          <!-- Connection Arrow -->
                          <svg class="ll-adj-arrow" width="22" height="12" viewBox="0 0 22 12">
                            <path d="M 1 6 L 17 6 M 13 2 L 18 6 L 13 10" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>

                          <!-- Neighbor Element Boxes (Soft Teal) -->
                          <div class="ll-adj-items">
                            <template v-if="s.adjList && s.adjList[uVal] && s.adjList[uVal].length">
                              <span
                                v-for="(neighbor, nIdx) in s.adjList[uVal]"
                                :key="'nbr-' + uVal + '-' + nIdx"
                                class="ll-adj-chip"
                                :class="{
                                  'll-adj-chip-hovered': isEdgeHovered(uVal, neighbor.v),
                                  'll-adj-chip-added': (uVal === s.curI && neighbor.v === s.curJ) || (uVal === s.curJ && neighbor.v === s.curI)
                                }"
                                @mouseenter="hoveredEdge = { u: uVal, v: neighbor.v }"
                                @mouseleave="hoveredEdge = null"
                              >
                                {{ neighbor.v }} <span class="ll-chip-weight">({{ neighbor.w }})</span>
                              </span>
                            </template>
                            <span v-else class="ll-adj-empty">empty</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="ll-vresizer" ref="vizResizerRef"></div>

              <!-- Color Legend -->
              <div class="ll-legend">
                <span class="ll-leg"><span class="ll-legdot ll-legdot-existing"></span>Empty Bucket</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-has-edge"></span>Neighbor Node</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-u"></span>Source Vertex (u)</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-v"></span>Destination Vertex (v)</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-active"></span>Added Neighbor</span>
              </div>

              <!-- Variable Frames & Call Stack -->
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
                      {{ f.title }}(<span v-for="(r, idx) in f.rows" :key="idx">
                        <span v-if="idx > 0">, </span>
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

                <!-- Code Scroll with 1-to-1 Line Highlighting -->
                <div v-if="rightTab === 'code'" class="ll-code-scroll">
                  <pre class="ll-pre"><span
                    v-for="(line, idx) in codeLines"
                    :key="idx"
                    class="ll-codeline"
                    :class="{ 'll-hl': line[0] && line[0] === s.code }"
                  >{{ line[1] === '' ? ' ' : line[1] }}</span></pre>
                </div>

                <!-- Pseudocode Scroll -->
                <div v-else-if="rightTab === 'pseudo'" class="ll-code-scroll">
                  <pre class="ll-pre"><span
                    v-for="(line, idx) in PSEUDOCODE"
                    :key="idx"
                    class="ll-codeline"
                  >{{ line }}</span></pre>
                </div>

                <!-- Complexity Scroll -->
                <div v-else class="ll-info-scroll">
                  <h3>Time &amp; Space Complexity</h3>
                  <table class="ll-complexity-table">
                    <thead><tr><th>Operation</th><th>Time</th><th>Why</th></tr></thead>
                    <tbody>
                      <tr><td>List Allocation</td><td>O(V)</td><td>Initializes V empty list buckets.</td></tr>
                      <tr><td>Add Edge <code>addEdge(u, v, weight)</code></td><td>O(1)</td><td>Appends <code>Pair(v, weight)</code> to <code>adj[u]</code> and <code>Pair(u, weight)</code> to <code>adj[v]</code>.</td></tr>
                      <tr><td>Query Edge <code>getEdge(u, v)</code></td><td>O(deg(u))</td><td>Scans list <code>adj[u]</code> for neighbor <code>v</code>.</td></tr>
                      <tr><td>Space Complexity</td><td>O(V + E)</td><td>Stores V vertex heads and 2E neighbor Pair nodes.</td></tr>
                    </tbody>
                  </table>
                  <p class="ll-note">
                    Key feature: <b>Adjacency List Collections</b> for undirected weighted graphs store edge pairs symmetrically (<code>adj[u].add(Pair(v, w))</code> and <code>adj[v].add(Pair(u, w))</code>). Uses efficient <code>O(V + E)</code> memory.
                  </p>
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

    <!-- Floating Undirected Weighted Graph Modal Dialog Container -->
    <div v-if="showGraphModal" class="graph-modal-backdrop" @click.self="showGraphModal = false">
      <div class="graph-modal-card">
        <div class="graph-modal-header">
          <div class="graph-modal-title">
            <span>Undirected Weighted Graph View</span>
            <span class="graph-subtitle">(Synchronized with Adjacency List Collections)</span>
          </div>
          <button class="graph-close-btn" @click="showGraphModal = false" title="Close modal">&times;</button>
        </div>

        <div class="graph-modal-body">
          <div v-if="(s.V ?? 0) === 0" class="ll-empty-graph-msg">
            No vertices or edges to display (Vertices = 0).
          </div>
          <svg v-else class="graph-modal-svg" viewBox="0 0 720 470">
            <!-- Undirected Weighted Edges -->
            <g
              v-for="edge in undirectedEdgesForRender"
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

              <!-- Visible Undirected Edge Line -->
              <path
                :d="getEdgeGeo(edge).pathD"
                fill="none"
                class="ll-edge-line"
                :class="{
                  'll-edge-active': (edge.u === s.activeU && edge.v === s.activeV) || (edge.u === s.activeV && edge.v === s.activeU),
                  'll-edge-hovered': isEdgeHovered(edge.u, edge.v)
                }"
              />

              <!-- Weight Label Badge -->
              <g v-if="getEdgeGeo(edge)">
                <circle
                  :cx="getEdgeGeo(edge).labelX"
                  :cy="getEdgeGeo(edge).labelY"
                  r="13"
                  class="ll-weight-bg"
                  :class="{
                    'll-weight-bg-active': (edge.u === s.activeU && edge.v === s.activeV) || (edge.u === s.activeV && edge.v === s.activeU),
                    'll-weight-bg-hovered': isEdgeHovered(edge.u, edge.v)
                  }"
                />
                <text
                  :x="getEdgeGeo(edge).labelX"
                  :y="getEdgeGeo(edge).labelY + 4"
                  class="ll-weight-text"
                  :class="{ 'll-weight-text-hovered': isEdgeHovered(edge.u, edge.v) }"
                >
                  {{ edge.weight }}
                </text>
              </g>
            </g>

            <!-- Graph Vertex Nodes -->
            <g v-for="node in modalNodePositions" :key="'mn-' + node.id">
              <!-- Pointer Labels above/below Nodes based on position -->
              <g v-if="node.id === s.activeU || node.id === s.activeV || isNodeHoveredSource(node.id) || isNodeHoveredTarget(node.id)">
                <template v-if="node.y > 230">
                  <text
                    :x="node.x"
                    :y="node.y + 22"
                    class="ll-svg-ptr"
                    :class="isNodeHoveredSource(node.id) ? 'll-svg-ptr-hover-src' : (isNodeHoveredTarget(node.id) ? 'll-svg-ptr-hover-tgt' : (node.id === s.activeU ? 'll-svg-ptr-blue' : 'll-svg-ptr-purple'))"
                  >
                    &utrif;
                  </text>
                  <text
                    :x="node.x"
                    :y="node.y + 35"
                    class="ll-svg-ptr"
                    :class="isNodeHoveredSource(node.id) ? 'll-svg-ptr-hover-src' : (isNodeHoveredTarget(node.id) ? 'll-svg-ptr-hover-tgt' : (node.id === s.activeU ? 'll-svg-ptr-blue' : 'll-svg-ptr-purple'))"
                  >
                    {{ isNodeHoveredSource(node.id) ? 'src' : (isNodeHoveredTarget(node.id) ? 'tgt' : (node.id === s.activeU ? 'u' : 'v')) }}
                  </text>
                </template>
                <template v-else>
                  <text
                    :x="node.x"
                    :y="node.y - 28"
                    class="ll-svg-ptr"
                    :class="isNodeHoveredSource(node.id) ? 'll-svg-ptr-hover-src' : (isNodeHoveredTarget(node.id) ? 'll-svg-ptr-hover-tgt' : (node.id === s.activeU ? 'll-svg-ptr-blue' : 'll-svg-ptr-purple'))"
                  >
                    {{ isNodeHoveredSource(node.id) ? 'src' : (isNodeHoveredTarget(node.id) ? 'tgt' : (node.id === s.activeU ? 'u' : 'v')) }}
                  </text>
                  <text
                    :x="node.x"
                    :y="node.y - 17"
                    class="ll-svg-ptr"
                    :class="isNodeHoveredSource(node.id) ? 'll-svg-ptr-hover-src' : (isNodeHoveredTarget(node.id) ? 'll-svg-ptr-hover-tgt' : (node.id === s.activeU ? 'll-svg-ptr-blue' : 'll-svg-ptr-purple'))"
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
.ll-nav-controls { display: flex; margin-left: auto; align-items: center; gap: 4px; flex-shrink: 0; flex-wrap: wrap; }
.ll-nav-btn { background: var(--surface2); border: 1px solid var(--border2); color: var(--text2); padding: 5px 11px; border-radius: var(--radius-sm); cursor: pointer; font-size: 12px; font-weight: 500; transition: all .15s; white-space: nowrap; }
.ll-nav-btn:hover { background: var(--surface); border-color: var(--coral); color: var(--coral); }
.ll-play-btn { background: var(--blue-light); border: 1px solid var(--blue); color: var(--blue); min-width: 72px; font-weight: 600; padding: 5px 11px; border-radius: var(--radius-sm); cursor: pointer; font-size: 12px; transition: all .15s; }
.ll-play-btn:hover { background: var(--blue); color: #fff; }
.ll-main { display: flex; flex: 1; overflow: hidden; position: relative; }
.ll-left-col { display: flex; flex-direction: column; overflow: hidden; min-width: 200px; max-width: 72%; }
.ll-resizer { width: 5px; cursor: col-resize; background: var(--border); flex-shrink: 0; transition: background .15s; position: relative; z-index: 20; }
.ll-resizer:hover, .ll-resizer.drag { background: var(--coral); }
.ll-right-col { display: flex; flex-direction: column; flex: 1; overflow: hidden; min-width: 0; height: 78%; }
.ll-viz-wrap { flex-shrink: 0; background: var(--surface); border-bottom: 1px solid var(--border); position: relative; overflow: hidden; display: flex; flex-direction: column; }
.ll-perm-area { display: flex; flex-direction: column; align-items: stretch; height: 100%; width: 100%; min-width: 0; box-sizing: border-box; }

/* Adjacency List Collections Panel Layout (Compact Light Theme) */
.ll-adj-list-area { display: flex; flex-direction: column; padding: 6px 10px; width: 100%; height: 100%; min-width: 0; box-sizing: border-box; overflow: hidden; }
.ll-adj-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
  background: #ffffff;
  border: 1.5px dashed #cbd5e1;
  border-radius: 12px;
  padding: 10px 14px;
  box-sizing: border-box;
  min-width: 0;
  box-shadow: var(--shadow-sm);
}
.ll-card-header { margin-bottom: 8px; flex-shrink: 0; }
.ll-card-title-main { font-family: system-ui, -apple-system, sans-serif; font-size: 15px; font-weight: 700; color: #0f172a; line-height: 1.2; }
.ll-card-subtitle { font-family: system-ui, -apple-system, sans-serif; font-size: 12px; font-weight: 500; color: #64748b; margin-top: 1px; }
.ll-empty-matrix-msg { padding: 18px 12px; text-align: center; color: #64748b; font-size: 12px; font-weight: 600; border: 1px dashed #cbd5e1; border-radius: 8px; background: #f8fafc; }
.ll-empty-graph-msg { display: flex; align-items: center; justify-content: center; height: 100%; width: 100%; color: #64748b; font-size: 14px; font-weight: 600; text-align: center; }

.ll-adj-wrap {
  flex: 1;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;
  scrollbar-gutter: stable;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 10px;
  padding-right: 2px;
  padding-left: 10px;
}
@keyframes ll-row-pop {
  from { opacity: 0; transform: translateY(-8px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
.ll-adj-row { display: flex; align-items: center; gap: 8px; flex-shrink: 0; height: 45px; animation: ll-row-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }

/* Left Vertex Box (Soft Indigo/Purple) */
.ll-adj-v-head {
  position: relative;
  width: 32px;
  height: 32px;
  background: #eef2ff;
  border: 1.5px solid #818cf8;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
  font-weight: 800;
  color: #3730a3;
  flex-shrink: 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}
.ll-adj-v-head-active-u {
  background: #dbeafe !important;
  border-color: #3b82f6 !important;
  color: #1e40af !important;
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.5) !important;
}
.ll-adj-v-head-active-v {
  background: #f3e8ff !important;
  border-color: #9333ea !important;
  color: #6b21a8 !important;
  box-shadow: 0 0 8px rgba(147, 51, 234, 0.5) !important;
}

.ll-adj-arrow { flex-shrink: 0; }

.ll-adj-items { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; flex: 1; }

/* Neighbor Box (Soft Emerald/Teal) */
.ll-adj-chip {
  width: 42px;
  height: 32px;
  background: #ecfdf5;
  border: 1.5px solid #34d399;
  border-radius: 7px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 13.5px;
  font-weight: 800;
  color: #065f46;
  transition: all 0.15s ease;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}
.ll-adj-chip-hovered {
  background: #dcfce7 !important;
  border-color: #10b981 !important;
  color: #047857 !important;
  transform: scale(1.08);
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.5) !important;
}
.ll-adj-chip-added {
  background: #bbf7d0 !important;
  border-color: #22c55e !important;
  color: #14532d !important;
  animation: ll-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.ll-adj-empty { font-size: 12px; color: #94a3b8; font-style: italic; font-family: system-ui, -apple-system, sans-serif; }

/* SVG Graph Elements */
.ll-edge-line { stroke: #94a3b8; stroke-width: 2.5; transition: all 0.25s ease; }
.ll-edge-active { stroke: #f97316; stroke-width: 4; stroke-dasharray: 6 3; animation: ll-dash 1s linear infinite; }
@keyframes ll-dash { to { stroke-dashoffset: -18; } }
.ll-edge-line.ll-edge-hovered { stroke: #3b82f6 !important; stroke-width: 4px !important; filter: drop-shadow(0 0 6px rgba(59,130,246,0.6)); }

/* Weight Badge Styling */
.ll-weight-bg { fill: #ffffff; stroke: #94a3b8; stroke-width: 1.5; }
.ll-weight-bg-active { fill: #fff7ed; stroke: #f97316; stroke-width: 2.5; }
.ll-weight-bg-hovered { fill: #eff6ff !important; stroke: #3b82f6 !important; stroke-width: 2.5px !important; }
.ll-weight-text { font-size: 11px; font-weight: 800; font-family: monospace; text-anchor: middle; fill: #1e293b; }
.ll-weight-text-hovered { fill: #1d4ed8 !important; font-weight: 900 !important; }

/* Graph Vertex Nodes */
.ll-node-circle { fill: #eff6ff; stroke: #3b82f6; stroke-width: 2.5; transition: all 0.25s ease; }
.ll-node-u { fill: #dbeafe !important; stroke: #3b82f6 !important; stroke-width: 3.5 !important; }
.ll-node-v { fill: #f3e8ff !important; stroke: #9333ea !important; stroke-width: 3.5 !important; }
.ll-node-hover-src { fill: #fff7ed !important; stroke: #f97316 !important; stroke-width: 3.5px !important; filter: drop-shadow(0 0 8px rgba(249, 115, 22, 0.55)); }
.ll-node-text { font-size: 13px; font-weight: 800; font-family: monospace; text-anchor: middle; fill: #1e293b; }
.ll-node-text-hover-src { fill: #c2410c !important; font-weight: 900 !important; }
.ll-svg-ptr-hover-src { fill: #ea580c !important; font-weight: 900 !important; }

.ll-node-hover-tgt { fill: #f0fdf4 !important; stroke: #22c55e !important; stroke-width: 3.5px !important; filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.55)); }
.ll-node-text-hover-tgt { fill: #15803d !important; font-weight: 900 !important; }
.ll-svg-ptr-hover-tgt { fill: #16a34a !important; font-weight: 900 !important; }

.ll-svg-ptr { font-size: 13px; font-weight: 800; font-family: monospace; text-anchor: middle; }
.ll-svg-ptr-blue { fill: #3b82f6; }
.ll-svg-ptr-purple { fill: #9333ea; }

/* Pointer Tag Styling */
.ll-ptr-tag-wrap { height: 15px; min-height: 15px; display: flex; align-items: flex-end; justify-content: center; gap: 2px; margin-bottom: 1px; flex-shrink: 0; }
.ll-ptr-lbl { font-size: 10px; font-weight: 800; font-family: 'Consolas', monospace; display: inline-flex; flex-direction: column; align-items: center; line-height: 1; gap: 0px; white-space: nowrap; }
.ll-ptr-lbl::after { content: '↓'; font-size: 8px; font-weight: 900; line-height: 1; }
.ll-lbl-blue { color: #3b82f6; }
.ll-lbl-orange { color: #f97316; }
.ll-lbl-purple { color: #9333ea; }
.ll-lbl-green { color: #10b981; }

.ll-vresizer { height: 5px; cursor: row-resize; background: var(--border); flex-shrink: 0; transition: background .15s; position: relative; z-index: 20; }
.ll-vresizer:hover, .ll-vresizer.drag { background: var(--coral); }
.ll-legend { display: flex; flex-wrap: wrap; gap: 6px 14px; padding: 6px 12px; border-bottom: 1px solid var(--border); flex-shrink: 0; background: var(--surface2); }
.ll-leg { display: flex; align-items: center; gap: 5px; font-size: 11px; color: var(--text2); font-weight: 500; }
.ll-legdot { width: 11px; height: 11px; border-radius: 3px; flex-shrink: 0; display: inline-block; }
.ll-legdot-existing { background: #ffffff; border: 1.5px solid var(--border); }
.ll-legdot-has-edge { background: #f0fdf4; border: 1.5px solid #86efac; }
.ll-legdot-u { background: #dbeafe; border: 1.5px solid #3b82f6; }
.ll-legdot-v { background: #f3e8ff; border: 1.5px solid #9333ea; }
.ll-legdot-active { background: #fff7ed; border: 1.5px solid #f97316; }

.ll-table-area { flex-shrink: 0; padding: 8px 14px; border-bottom: 1px solid var(--border); overflow-x: hidden; overflow-y: auto; background: var(--surface); min-width: 0; box-sizing: border-box; }
.ll-table-title { font-size: 10px; color: var(--muted); margin-bottom: 4px; font-style: italic; }
.ll-stack-line { font-family: 'Consolas', monospace; font-size: 12px; line-height: 1.8; }
.ll-frame { font-family: 'Consolas', monospace; font-size: 11.5px; color: var(--text2); padding: 1px 0; white-space: nowrap; }
.ll-frame-cur { color: var(--orange); background: var(--orange-light); border-radius: 4px; padding: 1px 5px; }
.ll-fname { color: var(--text2); }
.ll-now { color: var(--orange); font-size: 10px; margin-left: 6px; }
.ll-badge-wrap { padding: 6px 10px; border-bottom: 1px solid var(--border); flex-shrink: 0; min-height: 36px; display: flex; align-items: center; background: var(--surface); }
.ll-badge { display: inline-block; padding: 4px 12px; border-radius: var(--radius-sm); border-left: 3px solid var(--coral); background: var(--coral-light); font-size: 11px; color: var(--coral-dark); line-height: 1.4; word-break: break-word; font-weight: 500; }
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
.ll-hl { background: #dcfce7; color: #15803d; border-radius: 3px; border-left: 3px solid var(--green); font-weight: 600; }
.ll-info-scroll { flex: 1; overflow: auto; padding: 16px 20px; background: var(--surface); color: var(--text2); font-size: 13px; line-height: 1.6; }
.ll-info-scroll h3 { margin: 0 0 10px; color: var(--text); font-size: 15px; font-weight: 700; }
.ll-info-scroll h3:not(:first-child) { margin-top: 18px; }
.ll-info-scroll p { margin: 0 0 10px; }
.ll-info-scroll code { background: var(--surface2); border: 1px solid var(--border); border-radius: 4px; padding: 1px 5px; font-family: 'Consolas', monospace; font-size: 12px; color: var(--coral-dark); }
.ll-complexity-table { width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 12.5px; }
.ll-complexity-table th, .ll-complexity-table td { border: 1px solid var(--border); padding: 8px 10px; text-align: left; }
.ll-complexity-table th { background: var(--surface2); color: var(--text); font-weight: 700; }
.ll-complexity-table td:nth-child(2) { font-family: 'Consolas', monospace; font-weight: 700; color: var(--coral-dark); }
.ll-note { background: var(--orange-light); border-left: 3px solid var(--orange); border-radius: var(--radius-sm); padding: 8px 12px; font-size: 12.5px; color: var(--text2); }
.ll-footer { padding: 4px 16px; font-size: 11px; color: var(--muted); border-top: 1px solid var(--border); background: var(--surface); flex-shrink: 0; display: flex; align-items: center; }
.ll-speed-wrap { display: flex; align-items: center; gap: 5px; margin-left: 16px; }
.ll-speed-wrap input[type=range] { width: 90px; accent-color: var(--coral); }
@media (max-width: 900px) {
  .ll-main { flex-direction: column; }
  .ll-left-col, .ll-right-col { max-width: 100% !important; width: 100% !important; }
  .ll-resizer { display: none; }
  .ll-toolbar { flex-direction: column; align-items: stretch; }
  .ll-nav-controls { margin-left: 0; justify-content: center; }
}
</style>
