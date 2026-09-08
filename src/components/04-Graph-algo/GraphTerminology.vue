<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  topic:    { type: String, default: 'Graph Data Structure — Fundamental Terminology' },
  subTopic: { type: String, default: 'Core Concepts, Definitions, Vertices & Edge Structures' },
});

/* ------------------------------------------------------------------ */
/* Graph Terminology Definitions & Metadata                            */
/* ------------------------------------------------------------------ */
const terminologies = [
  {
    id: 'vertex',
    label: 'Vertex (Node)',
    sub: 'Fundamental point in graph',
    summary: 'A fundamental unit or node in a graph storing data/label.',
    description: 'A Vertex (plural Vertices) represents an entity or point in a graph. For example, vertices can represent cities in a map, users in a social network, or web pages on the internet.',
    nodes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    edges: [],
    badge: 'Vertices V = {A, B, C, D, E, F, G} (|V| = 7)',
    metricVal: '7',
    metricName: 'Total Vertices',
  },
  {
    id: 'edge',
    label: 'Edge (Arc / Link)',
    sub: 'Connection between vertices',
    summary: 'A line or connection linking a pair of vertices in a graph.',
    description: 'An Edge connects two vertices (u, v). Edges represent relationships, roads between cities, or friendships between social network users.',
    nodes: [],
    edges: ['A-B', 'A-C', 'B-D', 'B-E', 'C-D', 'D-A', 'D-E', 'E-F'],
    badge: 'Edges E = {A-B, A-C, B-D, B-E, C-D, D-A, D-E, E-F} (|E| = 8)',
    metricVal: '8',
    metricName: 'Total Edges',
  },
  {
    id: 'directed',
    label: 'Directed Graph (Digraph)',
    sub: 'Edges with specific direction',
    summary: 'A graph where every edge has a defined direction (u → v).',
    description: 'In a Directed Graph, edges are one-way arrows. Edge (u, v) allows traversal from u to v, but not from v to u unless a reverse edge exists.',
    nodes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    edges: ['A-B', 'A-C', 'B-D', 'B-E', 'C-D', 'D-A', 'D-E', 'E-F'],
    badge: 'Directed Edges: A→B, A→C, B→D, B→E, C→D, D→A, D→E, E→F',
    showArrows: true,
    metricVal: 'Directed',
    metricName: 'Graph Type',
  },
  {
    id: 'undirected',
    label: 'Undirected Graph',
    sub: 'Two-way bidirectional edges',
    summary: 'A graph where edges have no direction and are bidirectional.',
    description: 'In an Undirected Graph, edges (u, v) can be traversed in both directions interchangeably. Connecting A and B means A is connected to B and B to A.',
    nodes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    edges: ['A-B', 'A-C', 'B-D', 'B-E', 'C-D', 'D-E', 'E-F'],
    badge: 'Undirected Edges: A—B, A—C, B—D, B—E, C—D, D—E, E—F',
    metricVal: 'Bidirectional',
    metricName: 'Edge Traversal',
  },
  {
    id: 'weighted',
    label: 'Weighted Graph',
    sub: 'Edges with values / costs',
    summary: 'A graph where each edge carries a numerical weight/cost value.',
    description: 'Weights represent distances, travel costs, bandwidth, or latency between vertices. For example, weight(A → B) = 4, weight(B → E) = 1.',
    nodes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    edges: ['A-B', 'A-C', 'B-D', 'B-E', 'C-D', 'D-A', 'D-E', 'E-F'],
    badge: 'Weights: w(A,B)=4, w(B,E)=1, w(B,D)=5, w(E,F)=7',
    showWeights: true,
    metricVal: '1..8',
    metricName: 'Edge Weights',
  },
  {
    id: 'adjacent',
    label: 'Adjacent Vertices (Neighbors)',
    sub: 'Vertices directly connected',
    summary: 'Two vertices connected directly to each other by an edge.',
    description: 'If edge (u, v) exists, vertex v is adjacent to u. For instance, vertex B is adjacent to A, and vertices D & E are adjacent to B.',
    nodes: ['A', 'B', 'C'],
    edges: ['A-B', 'A-C'],
    badge: 'Adjacent to A: B and C',
    metricVal: '2',
    metricName: 'Neighbors of A',
  },
  {
    id: 'degree',
    label: 'Degree of Vertex',
    sub: 'Total edges connected to node',
    summary: 'The total number of edges connected to a specific vertex.',
    description: 'The degree of a vertex is the count of edges incident to it. Degree(B) = 3 (edges A-B, B-D, B-E).',
    nodes: ['B'],
    edges: ['A-B', 'B-D', 'B-E'],
    badge: 'Degree(B) = 3 (connected to A, D, E)',
    metricVal: '3',
    metricName: 'Degree of B',
  },
  {
    id: 'in_degree',
    label: 'In-Degree',
    sub: 'Number of incoming edges',
    summary: 'The number of incoming edges pointing into a vertex.',
    description: 'In a directed graph, In-Degree(v) is the count of edges ending at v. Vertex D has In-Degree = 2 (incoming from B and C).',
    nodes: ['D'],
    edges: ['B-D', 'C-D'],
    showArrows: true,
    badge: 'In-Degree(D) = 2 (edges B→D and C→D)',
    metricVal: '2',
    metricName: 'In-Degree of D',
  },
  {
    id: 'out_degree',
    label: 'Out-Degree',
    sub: 'Number of outgoing edges',
    summary: 'The number of outgoing edges leaving from a vertex.',
    description: 'In a directed graph, Out-Degree(u) is the count of edges starting at u. Vertex B has Out-Degree = 2 (outgoing to D and E).',
    nodes: ['B'],
    edges: ['B-D', 'B-E'],
    showArrows: true,
    badge: 'Out-Degree(B) = 2 (edges B→D and B→E)',
    metricVal: '2',
    metricName: 'Out-Degree of B',
  },
  {
    id: 'path',
    label: 'Path',
    sub: 'Sequence of connected vertices',
    summary: 'A sequence of vertices where each consecutive pair is connected by an edge.',
    description: 'A path allows traveling from a source vertex to a destination vertex. Path from A to F: A → B → E → F (length = 3 edges).',
    nodes: ['A', 'B', 'E', 'F'],
    edges: ['A-B', 'B-E', 'E-F'],
    showArrows: true,
    badge: 'Path: A → B → E → F (Length = 3 edges)',
    metricVal: '3',
    metricName: 'Path Length',
  },
  {
    id: 'cycle',
    label: 'Cycle (Closed Loop)',
    sub: 'Path starting & ending at same node',
    summary: 'A path that starts and ends at the exact same vertex.',
    description: 'A cycle occurs when traversing edges leads back to the origin node. Cycle: A → B → D → A.',
    nodes: ['A', 'B', 'D'],
    edges: ['A-B', 'B-D', 'D-A'],
    showArrows: true,
    badge: 'Cycle: A → B → D → A (Closed Loop)',
    metricVal: '3',
    metricName: 'Cycle Length',
  },
  {
    id: 'connected',
    label: 'Connected Graph',
    sub: 'Path exists between all vertices',
    summary: 'A graph where a path exists between every pair of vertices.',
    description: 'In a Connected Graph, there are no unreachable vertices. Every vertex can be reached from any other vertex via some path.',
    nodes: ['A', 'B', 'C', 'D', 'E', 'F'],
    edges: ['A-B', 'A-C', 'B-D', 'B-E', 'C-D', 'D-A', 'D-E', 'E-F'],
    badge: 'Graph is Connected (All 6 vertices reachable)',
    metricVal: 'Strongly',
    metricName: 'Connectivity',
  },
  {
    id: 'self_loop',
    label: 'Self-Loop (Loop)',
    sub: 'Edge connecting node to itself',
    summary: 'An edge that connects a vertex to itself.',
    description: 'A Self-Loop is an edge (v, v) that starts and ends at the exact same node v. Here, node A has a self-loop.',
    nodes: ['A'],
    edges: [],
    showSelfLoop: true,
    badge: 'Self-Loop on Node A: (A → A)',
    metricVal: '1',
    metricName: 'Self-Loops',
  },
  {
    id: 'isolated',
    label: 'Isolated Vertex',
    sub: 'Vertex with degree 0',
    summary: 'A vertex with no edges attached (degree = 0).',
    description: 'An Isolated Vertex is completely disconnected from the rest of the graph. It has In-Degree = 0, Out-Degree = 0, and no neighboring edges. Node G is isolated.',
    nodes: ['G'],
    edges: [],
    badge: 'Node G is Isolated (Degree = 0, No edges attached)',
    metricVal: '0',
    metricName: 'Degree of G',
  },
];

const selectedId = ref('vertex');

const activeItem = computed(() => {
  return terminologies.find(t => t.id === selectedId.value) || terminologies[0];
});

function selectTerm(id) {
  selectedId.value = id;
}

/* Keyboard Navigation (Up / Down arrows) */
function handleKeyDown(e) {
  if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
    e.preventDefault();
    const idx = terminologies.findIndex(t => t.id === selectedId.value);
    if (e.key === 'ArrowDown') {
      const nextIdx = (idx + 1) % terminologies.length;
      selectedId.value = terminologies[nextIdx].id;
    } else if (e.key === 'ArrowUp') {
      const prevIdx = (idx - 1 + terminologies.length) % terminologies.length;
      selectedId.value = terminologies[prevIdx].id;
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
});

/* ------------------------------------------------------------------ */
/* Graph Visual Layout & Coordinates                                   */
/* ------------------------------------------------------------------ */
const vertexPositions = {
  A: { x: 150, y: 100 },
  B: { x: 330, y: 70 },
  C: { x: 120, y: 240 },
  D: { x: 310, y: 260 },
  E: { x: 460, y: 130 },
  F: { x: 470, y: 270 },
  G: { x: 575, y: 190 },
};

const graphEdges = [
  { id: 'A-B', from: 'A', to: 'B', weight: 4 },
  { id: 'A-C', from: 'A', to: 'C', weight: 2 },
  { id: 'B-D', from: 'B', to: 'D', weight: 5 },
  { id: 'B-E', from: 'B', to: 'E', weight: 1 },
  { id: 'C-D', from: 'C', to: 'D', weight: 8 },
  { id: 'D-A', from: 'D', to: 'A', weight: 3 },
  { id: 'D-E', from: 'D', to: 'E', weight: 6 },
  { id: 'E-F', from: 'E', to: 'F', weight: 7 },
];

function isNodeHighlighted(id) {
  return activeItem.value.nodes.includes(id);
}

function isEdgeHighlighted(edgeId) {
  return activeItem.value.edges.includes(edgeId);
}

const THEMES = {
  vertex:     { main: '#6366f1', border: '#4338ca', bg: '#eef2ff', shadow: 'rgba(99, 102, 241, 0.4)' },
  edge:       { main: '#0284c7', border: '#0369a1', bg: '#f0f9ff', shadow: 'rgba(2, 132, 199, 0.4)' },
  directed:   { main: '#10b981', border: '#047857', bg: '#ecfdf5', shadow: 'rgba(16, 185, 129, 0.4)' },
  undirected: { main: '#f59e0b', border: '#b45309', bg: '#fffbeb', shadow: 'rgba(245, 158, 11, 0.4)' },
  weighted:   { main: '#8b5cf6', border: '#6d28d9', bg: '#f5f3ff', shadow: 'rgba(139, 92, 246, 0.4)' },
  adjacent:   { main: '#0d9488', border: '#0f766e', bg: '#f0fdfa', shadow: 'rgba(13, 148, 136, 0.4)' },
  degree:     { main: '#3b82f6', border: '#1d4ed8', bg: '#eff6ff', shadow: 'rgba(59, 130, 246, 0.4)' },
  in_degree:  { main: '#06b6d4', border: '#0891b2', bg: '#ecfeff', shadow: 'rgba(6, 182, 212, 0.4)' },
  out_degree: { main: '#f97316', border: '#c2410c', bg: '#fff7ed', shadow: 'rgba(249, 115, 22, 0.4)' },
  path:       { main: '#f43f5e', border: '#be123c', bg: '#fff1f2', shadow: 'rgba(244, 63, 94, 0.4)' },
  cycle:      { main: '#ef4444', border: '#dc2626', bg: '#fef2f2', shadow: 'rgba(239, 68, 68, 0.4)' },
  connected:  { main: '#10b981', border: '#047857', bg: '#ecfdf5', shadow: 'rgba(16, 185, 129, 0.4)' },
  self_loop:  { main: '#ec4899', border: '#be185d', bg: '#fdf2f8', shadow: 'rgba(236, 72, 153, 0.4)' },
  isolated:   { main: '#64748b', border: '#334155', bg: '#f8fafc', shadow: 'rgba(100, 116, 139, 0.4)' },
};

function activeTheme() {
  return THEMES[activeItem.value.id] || THEMES.vertex;
}

function getNodeStyle(id) {
  if (!isNodeHighlighted(id)) {
    return {
      fill: '#dbe4ee',
      stroke: '#64748b',
      strokeWidth: '2.5px',
      filter: 'none',
      textColor: '#1e293b'
    };
  }

  const theme = activeTheme();
  return {
    fill: theme.main,
    stroke: theme.border,
    strokeWidth: '3px',
    filter: `drop-shadow(0 0 12px ${theme.shadow})`,
    textColor: '#ffffff'
  };
}

function getEdgeStyle(edgeId) {
  if (!isEdgeHighlighted(edgeId)) {
    return {
      stroke: '#cbd5e1',
      strokeWidth: '2.5px',
      shadow: 'none'
    };
  }

  const theme = activeTheme();
  return {
    stroke: theme.main,
    strokeWidth: '4.5px',
    shadow: `drop-shadow(0 0 6px ${theme.shadow})`
  };
}

function edgePath(e) {
  const p1 = vertexPositions[e.from];
  const p2 = vertexPositions[e.to];
  const r = 24;
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const dist = Math.hypot(dx, dy) || 1;
  const uX = dx / dist;
  const uY = dy / dist;

  const hasForwardArrow = activeItem.value.showArrows || selectedId.value === 'undirected' || isEdgeHighlighted(e.id);
  const hasBackwardArrow = selectedId.value === 'undirected';

  // Arrowhead anchor points (touching circle perimeter)
  const arrowX1 = p1.x + uX * (r + 4);
  const arrowY1 = p1.y + uY * (r + 4);
  const arrowX2 = p2.x - uX * (r + 4);
  const arrowY2 = p2.y - uY * (r + 4);

  // Line endpoints offset behind arrowheads so moving dashes do not peek out of tips
  const lineOffStart = hasBackwardArrow ? 13 : 0;
  const lineOffEnd = hasForwardArrow ? 13 : 0;

  const x1 = p1.x + uX * (r + lineOffStart);
  const y1 = p1.y + uY * (r + lineOffStart);
  const x2 = p2.x - uX * (r + lineOffEnd);
  const y2 = p2.y - uY * (r + lineOffEnd);

  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  return { x1, y1, x2, y2, arrowX1, arrowY1, arrowX2, arrowY2, midX, midY, angle };
}
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
          <!-- TOP HEADER BANNER -->
          <div class="ll-toolbar">
            <span class="banner-prompt">
              Select or click any Graph terminology below to inspect its definition, formula, and visual highlight on the graph diagram.
            </span>
          </div>

          <!-- MAIN WORKSPACE -->
          <div class="ll-main">
            <!-- LEFT PANEL: TERMINOLOGY SELECTOR CARDS -->
            <div class="ll-left-col">
              <div class="term-scroll">
                <div v-for="t in terminologies" :key="t.id"
                     class="term-card"
                     :class="{ active: selectedId === t.id }"
                     :style="selectedId === t.id ? { background: (THEMES[t.id] || THEMES.vertex).bg, borderColor: (THEMES[t.id] || THEMES.vertex).main } : {}"
                     @click="selectTerm(t.id)">
                  <input type="radio" :name="'term-radio'" :checked="selectedId === t.id" class="term-radio" :style="selectedId === t.id ? { accentColor: (THEMES[t.id] || THEMES.vertex).main } : {}" />
                  <div class="term-info">
                    <div class="term-name" :style="selectedId === t.id ? { color: (THEMES[t.id] || THEMES.vertex).border } : {}">{{ t.label }}</div>
                    <div class="term-sub">{{ t.sub }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT PANEL: VISUAL GRAPH DIAGRAM & EXPLANATION CARD -->
            <div class="ll-right-col">
              <div class="ll-viz-wrap">
                <!-- TOP RIGHT METRIC/STAT CARD -->
                <div class="top-right-stat-card" :style="{ borderColor: activeTheme().main, background: activeTheme().bg }">
                  <div class="stat-value" :style="{ color: activeTheme().border }">
                    {{ activeItem.metricVal }}
                  </div>
                  <div class="stat-name" :style="{ color: activeTheme().border }">
                    {{ activeItem.metricName }}
                  </div>
                </div>

                <div class="ll-perm-area">
                  <svg class="ll-svg" viewBox="0 0 640 350" preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <marker id="arrowhead" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="currentColor" />
                      </marker>
                    </defs>

                    <!-- SELF-LOOP ON VERTEX A -->
                    <g v-if="activeItem.showSelfLoop || selectedId === 'self_loop'">
                      <path d="M 142 82 C 100 30, 70 120, 142 118" class="self-loop-path" :style="{ stroke: activeTheme().main }" />
                      <text x="85" y="70" class="self-loop-tag" :style="{ fill: activeTheme().border }">Self-Loop (A→A)</text>
                    </g>

                    <!-- GRAPH EDGES -->
                    <g v-for="e in graphEdges" :key="e.id">
                      <!-- Inactive base line -->
                      <line v-if="!isEdgeHighlighted(e.id)"
                            :x1="edgePath(e).x1" :y1="edgePath(e).y1"
                            :x2="edgePath(e).x2" :y2="edgePath(e).y2"
                            class="tree-edge" />
                      <!-- Active moving colored dashed line with transparent background -->
                      <line v-else
                            :x1="edgePath(e).x1" :y1="edgePath(e).y1"
                            :x2="edgePath(e).x2" :y2="edgePath(e).y2"
                            class="tree-edge-dash-active"
                            :style="{
                              stroke: getEdgeStyle(e.id).stroke,
                              filter: getEdgeStyle(e.id).shadow
                            }" />

                      <!-- Direction Arrowheads matching screenshot style -->
                      <!-- Backward Arrowhead for Undirected / Bidirectional edges -->
                      <path v-if="selectedId === 'undirected'"
                            d="M 10 -5.5 L -1 0 L 10 5.5 L 7 0 Z"
                            class="edge-arrowhead"
                            :fill="isEdgeHighlighted(e.id) ? activeTheme().main : '#475569'"
                            :transform="`translate(${edgePath(e).arrowX1}, ${edgePath(e).arrowY1}) rotate(${edgePath(e).angle})`" />

                      <!-- Forward Arrowhead for Directed & Active edges -->
                      <path v-if="activeItem.showArrows || selectedId === 'undirected' || isEdgeHighlighted(e.id)"
                            d="M -10 -5.5 L 1 0 L -10 5.5 L -7 0 Z"
                            class="edge-arrowhead"
                            :fill="isEdgeHighlighted(e.id) ? activeTheme().main : '#475569'"
                            :transform="`translate(${edgePath(e).arrowX2}, ${edgePath(e).arrowY2}) rotate(${edgePath(e).angle})`" />

                      <!-- Edge Weights -->
                      <g v-if="activeItem.showWeights">
                        <rect :x="edgePath(e).midX - 10" :y="edgePath(e).midY - 10" width="20" height="20" rx="4" class="weight-bg" />
                        <text :x="edgePath(e).midX" :y="edgePath(e).midY + 4" text-anchor="middle" class="weight-txt">
                          {{ e.weight }}
                        </text>
                      </g>
                    </g>

                    <!-- VERTICES (NODES) -->
                    <g v-for="(pos, id) in vertexPositions" :key="id + '-' + selectedId"
                       class="tree-node-group"
                       @click="selectTerm(id === 'G' ? 'isolated' : (id === 'A' ? 'vertex' : 'node'))">
                      <!-- RIPPLE PULSE RING -->
                      <circle v-if="isNodeHighlighted(id)"
                              :cx="pos.x" :cy="pos.y" r="24"
                              class="node-ripple-ring"
                              :style="{ stroke: getNodeStyle(id).fill }" />

                      <!-- NODE CIRCLE -->
                      <circle :cx="pos.x" :cy="pos.y" r="24"
                              class="tree-node-circle"
                              :class="{ 'node-pop': isNodeHighlighted(id) }"
                              :style="{
                                fill: getNodeStyle(id).fill,
                                stroke: getNodeStyle(id).stroke,
                                strokeWidth: getNodeStyle(id).strokeWidth,
                                filter: getNodeStyle(id).filter
                              }" />

                      <!-- NODE LABEL TEXT -->
                      <text :x="pos.x" :y="pos.y + 6" text-anchor="middle"
                            class="tree-node-txt"
                            :style="{ fill: getNodeStyle(id).textColor }">
                        {{ id }}
                      </text>

                      <!-- Isolated Node Badge Callout -->
                      <template v-if="selectedId === 'isolated' && id === 'G'">
                        <text :x="pos.x" :y="pos.y - 34" text-anchor="middle" class="node-badge-txt">Isolated (Degree=0)</text>
                      </template>
                    </g>
                  </svg>
                </div>
              </div>

              <!-- EXPLANATION & SUMMARY CARD (Sliding Transition) -->
              <transition name="panel-slide" mode="out-in">
                <div :key="selectedId" class="ll-explain-panel">
                  <div class="explain-header">
                    <span class="explain-title" :style="{ color: activeTheme().border }">{{ activeItem.label }}</span>
                    <span class="explain-badge" :style="{ background: activeTheme().bg, borderColor: activeTheme().main, color: activeTheme().border }">{{ activeItem.badge }}</span>
                  </div>
                  <div class="explain-summary">
                    <strong>Summary:</strong> {{ activeItem.summary }}
                  </div>
                  <div class="explain-desc">
                    {{ activeItem.description }}
                  </div>
                </div>
              </transition>
            </div>
          </div>

          <!-- FOOTER -->
          <div class="ll-footer">
            <span>Tip: Click any button or node, or use <b>Up / Down Arrow keys</b> to inspect Graph terminologies.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ll-root * { box-sizing: border-box; }
.ll-root {
  --coral: #ef4444; --coral-dark: #dc2626; --coral-light: #fef2f2;
  --bg: #f5f6fa; --surface: #ffffff; --surface2: #f1f4f9;
  --border: #e2e8f0; --border2: #cbd5e1; --text: #1e293b; --text2: #475569; --muted: #94a3b8;
  --blue: #3b82f6; --blue-light: #eff6ff;
  --green: #22c55e; --green-light: #f0fdf4;
  --orange: #f97316; --orange-light: #fff7ed;
  --shadow-sm: 0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04);
  --radius: 8px; --radius-sm: 6px;
  background: var(--bg); color: var(--text);
  font-family: 'Segoe UI', system-ui, sans-serif; font-size: 13px;
  display: flex; flex-direction: column; height: 50vh; min-height: 600px; overflow: hidden; width: 100%;
}
.slide-wrapper { margin-top: -10px; margin-left: -30px; width: 107%; max-height: 100%; font-size: 0.8rem; font-weight: 400; }
.slide-body { display: flex; flex-direction: column; border-radius: 4px; height: 100%; }
.navbar { display: flex; flex-direction: row; justify-content: space-between; align-items: center; gap: 0.75rem; padding: 0 10px; background-color: #ffffff; position: fixed; width: 94.7%; z-index: 10; }
.navbar > img { height: 30px; }
.navbar-title { margin: 0; font-size: 1.5rem; font-weight: 700; background-color: #ef5050; color: #ffffff; width: 80%; padding-left: 10px; margin-left: -10px; border-radius: 5px; }
.row-main { width: 100%; height: 90%; margin-top: 37px; overflow-x: auto; overflow-y: auto; scrollbar-width: thin; }

.ll-toolbar { display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: var(--surface); border-bottom: 1px solid var(--border); flex-shrink: 0; box-shadow: var(--shadow-sm); }
.banner-prompt { font-size: 12.5px; color: var(--text2); font-weight: 500; }

.ll-main { display: flex; flex: 1; overflow: hidden; position: relative; }
.ll-left-col { width: 300px; height:75%; display: flex; flex-direction: column; background: var(--surface); border-right: 1px solid var(--border); flex-shrink: 0; overflow: hidden; }
.term-list-title { font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: .5px; padding: 10px 14px 6px; border-bottom: 1px solid var(--border); background: var(--surface2); }
.term-scroll { flex: 1; overflow-y: auto; scrollbar-width: thin; padding: 6px; }

.term-card { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: var(--radius-sm); border: 1px solid transparent; cursor: pointer; transition: all .2s cubic-bezier(0.34, 1.56, 0.64, 1); margin-bottom: 3px; }
.term-card:hover { background: var(--surface2); border-color: var(--border); transform: translateX(2px); }
.term-card:active { transform: scale(0.97); }
.term-card.active { transform: translateX(4px); box-shadow: var(--shadow-sm); }
.term-radio { cursor: pointer; }
.term-info { display: flex; flex-direction: column; }
.term-name { font-size: 12.5px; font-weight: 700; color: var(--text); transition: color .2s; }
.term-sub { font-size: 10.5px; color: var(--text2); }

.ll-right-col { flex: 1; display: flex; flex-direction: column; overflow: hidden; background: var(--surface); }
.ll-viz-wrap { flex: 1; position: relative; overflow: hidden; background: #fafbfc; border-bottom: 1px solid var(--border); }
.ll-perm-area { height: 100%; display: flex; align-items: center; justify-content: center; }
.ll-svg { width: 100%; height: 100%; display: block; }

/* TOP RIGHT STAT CARD OVERLAY */
.top-right-stat-card {
  position: absolute;
  top: 14px;
  right: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6px 14px;
  border-radius: 8px;
  border: 1.5px solid;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  z-index: 10;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: none;
}
.stat-value {
  font-size: 22px;
  font-weight: 900;
  line-height: 1;
  font-family: 'Segoe UI', system-ui, monospace;
}
.stat-name {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 3px;
}

/* SVG GRAPH STYLING & ANIMATIONS */
.tree-edge {
  stroke: #cbd5e1;
  stroke-width: 2.5px;
  stroke-linecap: round;
  transition: stroke .3s ease;
}

@keyframes moveDashes {
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: -17px; }
}

.tree-edge-dash-active {
  stroke-width: 4.5px;
  stroke-dasharray: 10 7;
  stroke-linecap: round;
  animation: moveDashes 0.55s linear infinite;
  will-change: stroke-dashoffset;
}

.tree-node-group { cursor: pointer; }
.tree-node-circle { transition: all .35s cubic-bezier(0.34, 1.56, 0.64, 1); }
.tree-node-txt { font-size: 15px; font-weight: 800; font-family: 'Segoe UI', 'Consolas', sans-serif; transition: all .35s; }

/* NODE SPRING POP ANIMATION */
@keyframes nodePop {
  0% { transform: scale(0.6); opacity: 0.2; }
  55% { transform: scale(1.22); }
  80% { transform: scale(0.94); }
  100% { transform: scale(1); opacity: 1; }
}
.node-pop {
  transform-origin: center;
  transform-box: fill-box;
  animation: nodePop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* RIPPLE PULSE RING */
@keyframes nodeRipple {
  0% { r: 24px; opacity: 0.85; stroke-width: 3px; }
  100% { r: 42px; opacity: 0; stroke-width: 1px; }
}
.node-ripple-ring {
  fill: none;
  animation: nodeRipple 1.6s cubic-bezier(0.1, 0.4, 0.2, 1) infinite;
  pointer-events: none;
}

/* WEIGHT BADGES */
.weight-bg { fill: #1e293b; rx: 4px; }
.weight-txt { fill: #ffffff; font-size: 10px; font-weight: 700; font-family: monospace; }

/* SELF-LOOP PATH */
.self-loop-path {
  fill: none;
  stroke-width: 3.5px;
  stroke-dasharray: 6 4;
  animation: moveDashes 0.75s linear infinite;
}
.self-loop-tag {
  font-size: 11px;
  font-weight: 700;
  font-family: monospace;
}

/* EXPLANATION PANEL TRANSITION */
.ll-explain-panel { padding: 12px 18px; background: var(--surface); flex-shrink: 0; min-height: 110px; display: flex; flex-direction: column; gap: 6px; }
.explain-header { display: flex; align-items: center; justify-content: space-between; }
.explain-title { font-size: 15px; font-weight: 800; }
.explain-badge { padding: 2px 10px; border-radius: var(--radius-sm); font-size: 11px; font-weight: 700; font-family: monospace; border: 1px solid; }
.explain-summary { font-size: 12.5px; color: var(--text); line-height: 1.4; }
.explain-desc { font-size: 12px; color: var(--text2); line-height: 1.45; }

.panel-slide-enter-active, .panel-slide-leave-active { transition: all 0.22s ease-out; }
.panel-slide-enter-from { opacity: 0; transform: translateY(10px); }
.panel-slide-leave-to { opacity: 0; transform: translateY(-6px); }

.ll-footer { padding: 6px 16px; font-size: 11px; color: var(--muted); border-top: 1px solid var(--border); background: var(--surface); flex-shrink: 0; }
</style>
