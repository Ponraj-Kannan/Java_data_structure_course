<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  topic:    { type: String, default: 'Binary Tree — Fundamental Terminology' },
  subTopic: { type: String, default: 'Core Concepts, Definitions & Visual Tree Hierarchy' },
});

/* ------------------------------------------------------------------ */
/* Terminology Definitions & Metadata                                 */
/* ------------------------------------------------------------------ */
const terminologies = [
  {
    id: 'root',
    label: 'Root Node',
    sub: 'Topmost node (R)',
    summary: 'The topmost node of the tree from which all other nodes originate.',
    description: 'The Root is the starting node of a tree hierarchy. It has no parent node. Every tree has exactly one root node.',
    nodes: ['R'],
    edges: [],
    badge: 'Node R is the Root (Parent = null, Depth = 0)',
    metricVal: '1',
    metricName: 'Root Node',
  },
  {
    id: 'node',
    label: 'Node (Data Element)',
    sub: 'Building block of tree',
    summary: 'An individual element storing data and pointers to left/right children.',
    description: 'Each node consists of data (value) and references (pointers) to its left and right child nodes. A tree with N elements has N nodes.',
    nodes: ['R', 'A', 'B', 'C', 'D', 'E', 'F', 'G'],
    edges: [],
    badge: 'Nodes: R, A, B, C, D, E, F, G (Total = 8)',
    metricVal: '8',
    metricName: 'Total Nodes',
  },
  {
    id: 'parent',
    label: 'Parent Node',
    sub: 'Direct ancestor node',
    summary: 'A node that has one or more child nodes connected beneath it.',
    description: 'A Parent node is a direct predecessor of a child node. For example, R is parent of A & B; A is parent of C & D; B is parent of E & F; F is parent of G.',
    nodes: ['R', 'A', 'B', 'F'],
    edges: ['R-A', 'R-B', 'A-C', 'A-D', 'B-E', 'B-F', 'F-G'],
    badge: 'Parent Nodes: R, A, B, F',
    metricVal: '4',
    metricName: 'Parent Count',
  },
  {
    id: 'child',
    label: 'Child Node',
    sub: 'Direct descendant node',
    summary: 'A node connected directly below another node (its parent).',
    description: 'Every node except the root is a child node. Nodes A & B are children of R; C & D are children of A; E & F are children of B; G is child of F.',
    nodes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    edges: ['R-A', 'R-B', 'A-C', 'A-D', 'B-E', 'B-F', 'F-G'],
    badge: 'Child Nodes: A, B, C, D, E, F, G',
    metricVal: '7',
    metricName: 'Child Count',
  },
  {
    id: 'left_child',
    label: 'Left Child',
    sub: 'Node on left branch',
    summary: 'The node connected to the left pointer of its parent node.',
    description: 'In a Binary Tree, each node can have at most one left child. Node A is the left child of R; C is left child of A; E is left child of B; G is left child of F.',
    nodes: ['A', 'C', 'E', 'G'],
    edges: ['R-A', 'A-C', 'B-E', 'F-G'],
    badge: 'Left Children: A (of R), C (of A), E (of B), G (of F)',
    metricVal: '4',
    metricName: 'Left Children',
  },
  {
    id: 'right_child',
    label: 'Right Child',
    sub: 'Node on right branch',
    summary: 'The node connected to the right pointer of its parent node.',
    description: 'In a Binary Tree, each node can have at most one right child. Node B is the right child of R; D is right child of A; F is right child of B.',
    nodes: ['B', 'D', 'F'],
    edges: ['R-B', 'A-D', 'B-F'],
    badge: 'Right Children: B (of R), D (of A), F (of B)',
    metricVal: '3',
    metricName: 'Right Children',
  },
  {
    id: 'siblings',
    label: 'Sibling Nodes',
    sub: 'Nodes sharing same parent',
    summary: 'Nodes that belong to the exact same parent node.',
    description: 'Siblings are nodes that share a common parent. A & B are siblings (parent R); C & D are siblings (parent A); E & F are siblings (parent B).',
    nodes: ['A', 'B', 'C', 'D', 'E', 'F'],
    edges: [],
    badge: 'Sibling Pairs: (A, B), (C, D), (E, F)',
    showSiblings: true,
    metricVal: '3',
    metricName: 'Sibling Pairs',
  },
  {
    id: 'leaf',
    label: 'Leaf Node (Terminal)',
    sub: 'Node with no children',
    summary: 'A node with no children (left = null and right = null).',
    description: 'Also known as External Nodes or Terminal Nodes. They are at the bottom ends of the branches. Nodes C, D, E, and G are leaf nodes.',
    nodes: ['C', 'D', 'E', 'G'],
    edges: [],
    badge: 'Leaf Nodes: C, D, E, G (degree = 0)',
    metricVal: '4',
    metricName: 'Leaf Nodes',
  },
  {
    id: 'internal',
    label: 'Internal Node (Non-Leaf)',
    sub: 'Node with at least one child',
    summary: 'A node that has at least one child node attached.',
    description: 'Also called Non-Terminal or Branch Nodes. Any node that is not a leaf node is an internal node. Nodes R, A, B, and F are internal nodes.',
    nodes: ['R', 'A', 'B', 'F'],
    edges: ['R-A', 'R-B', 'A-C', 'A-D', 'B-E', 'B-F', 'F-G'],
    badge: 'Internal Nodes: R, A, B, F (degree ≥ 1)',
    metricVal: '4',
    metricName: 'Internal Nodes',
  },
  {
    id: 'edge',
    label: 'Edge (Connection)',
    sub: 'Link between parent & child',
    summary: 'The direct link or connection between a parent node and child node.',
    description: 'An edge represents the directional link from a parent node to its child. A tree with N nodes always has exactly N - 1 edges (here 8 - 1 = 7 edges).',
    nodes: [],
    edges: ['R-A', 'R-B', 'A-C', 'A-D', 'B-E', 'B-F', 'F-G'],
    badge: 'Total Edges = N - 1 = 7 edges',
    metricVal: '7',
    metricName: 'Total Edges',
  },
  {
    id: 'subtree',
    label: 'Subtree (B\'s Subtree)',
    sub: 'Tree formed by node & descendants',
    summary: 'A tree consisting of a node and all of its descendants.',
    description: 'Any node in a tree can be considered the root of its own subtree. B\'s subtree consists of node B along with its descendants E, F, and G.',
    nodes: ['B', 'E', 'F', 'G'],
    edges: ['B-E', 'B-F', 'F-G'],
    badge: 'B\'s Subtree = {B, E, F, G}',
    showSubtreeBox: true,
    metricVal: '4',
    metricName: 'Subtree Nodes',
  },
  {
    id: 'depth',
    label: 'Depth of Node',
    sub: 'Number of edges from root',
    summary: 'The number of edges on the path from the Root to a specific node.',
    description: 'Depth measures distance from root. Depth(R) = 0, Depth(A, B) = 1, Depth(C, D, E, F) = 2, Depth(G) = 3 (path: R → B → F → G).',
    nodes: ['R', 'B', 'F', 'G'],
    edges: ['R-B', 'B-F', 'F-G'],
    badge: 'Depth of G = 3 (edges R → B → F → G)',
    metricVal: '3',
    metricName: 'Depth of Node G',
  },
  {
    id: 'height',
    label: 'Height of Tree / Node',
    sub: 'Longest path to a leaf',
    summary: 'The number of edges on the longest path from a node to a leaf.',
    description: 'Height of a node is the length of the longest downward path to a leaf. Height(R) = 3, Height(B) = 2, Height(F) = 1, Height(Leaves) = 0. Tree Height = 3.',
    nodes: ['R', 'B', 'F', 'G'],
    edges: ['R-B', 'B-F', 'F-G'],
    badge: 'Height of Tree = 3 (longest path R → B → F → G)',
    metricVal: '3',
    metricName: 'Height of Tree',
  },
  {
    id: 'level',
    label: 'Level of Node',
    sub: '1-based depth (Level = Depth + 1)',
    summary: 'The 1-based hierarchical position of a node (Level = Depth + 1).',
    description: 'Level 1: R (Root). Level 2: A, B. Level 3: C, D, E, F. Level 4: G. Maximum Level = 4.',
    nodes: ['R', 'A', 'B', 'C', 'D', 'E', 'F', 'G'],
    edges: [],
    badge: 'Levels: 1 to 4 (Level = Depth + 1)',
    showLevels: true,
    metricVal: '4',
    metricName: 'Max Level',
  },
];

const selectedId = ref('tree');
const activeItem = computed(() => terminologies.find(t => t.id === selectedId.value) || terminologies[0]);

function selectTerm(id) {
  selectedId.value = id;
}

/* Keyboard navigation (Up/Down arrows to switch terminologies) */
function onKeydown(e) {
  if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
  const idx = terminologies.findIndex(t => t.id === selectedId.value);
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    e.preventDefault();
    const nextIdx = (idx + 1) % terminologies.length;
    selectedId.value = terminologies[nextIdx].id;
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    e.preventDefault();
    const prevIdx = (idx - 1 + terminologies.length) % terminologies.length;
    selectedId.value = terminologies[prevIdx].id;
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown);
});
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown);
});

/* ------------------------------------------------------------------ */
/* SVG Tree Layout & Node Definitions                                 */
/* ------------------------------------------------------------------ */
const nodePositions = {
  R: { x: 320, y: 55,  depth: 0, level: 1 },
  A: { x: 200, y: 135, depth: 1, level: 2 },
  B: { x: 440, y: 135, depth: 1, level: 2 },
  C: { x: 140, y: 215, depth: 2, level: 3 },
  D: { x: 260, y: 215, depth: 2, level: 3 },
  E: { x: 380, y: 215, depth: 2, level: 3 },
  F: { x: 500, y: 215, depth: 2, level: 3 },
  G: { x: 440, y: 295, depth: 3, level: 4 },
};

const treeEdges = [
  { id: 'R-A', from: 'R', to: 'A' },
  { id: 'R-B', from: 'R', to: 'B' },
  { id: 'A-C', from: 'A', to: 'C' },
  { id: 'A-D', from: 'A', to: 'D' },
  { id: 'B-E', from: 'B', to: 'E' },
  { id: 'B-F', from: 'B', to: 'F' },
  { id: 'F-G', from: 'F', to: 'G' },
];

function isNodeHighlighted(id) {
  return activeItem.value.nodes.includes(id);
}

function isEdgeHighlighted(edgeId) {
  return activeItem.value.edges.includes(edgeId);
}

const THEMES = {
  tree:        { main: '#3b82f6', border: '#1d4ed8', bg: '#eff6ff', shadow: 'rgba(59, 130, 246, 0.4)' },
  root:        { main: '#6366f1', border: '#4338ca', bg: '#eef2ff', shadow: 'rgba(99, 102, 241, 0.4)' },
  node:        { main: '#0284c7', border: '#0369a1', bg: '#f0f9ff', shadow: 'rgba(2, 132, 199, 0.4)' },
  parent:      { main: '#8b5cf6', border: '#6d28d9', bg: '#f5f3ff', shadow: 'rgba(139, 92, 246, 0.4)' },
  child:       { main: '#0d9488', border: '#0f766e', bg: '#f0fdfa', shadow: 'rgba(13, 148, 136, 0.4)' },
  left_child:  { main: '#10b981', border: '#047857', bg: '#ecfdf5', shadow: 'rgba(16, 185, 129, 0.4)' },
  right_child: { main: '#a855f7', border: '#7e22ce', bg: '#faf5ff', shadow: 'rgba(168, 85, 247, 0.4)' },
  siblings:    { main: '#f59e0b', border: '#b45309', bg: '#fffbeb', shadow: 'rgba(245, 158, 11, 0.4)' },
  leaf:        { main: '#059669', border: '#065f46', bg: '#ecfdf5', shadow: 'rgba(5, 150, 105, 0.4)' },
  internal:    { main: '#e11d48', border: '#9f1239', bg: '#fff1f2', shadow: 'rgba(225, 29, 72, 0.4)' },
  edge:        { main: '#0284c7', border: '#075985', bg: '#e0f2fe', shadow: 'rgba(2, 132, 199, 0.4)' },
  subtree:     { main: '#8b5cf6', border: '#6d28d9', bg: '#f5f3ff', shadow: 'rgba(139, 92, 246, 0.4)' },
  depth:       { main: '#f43f5e', border: '#be123c', bg: '#fff1f2', shadow: 'rgba(244, 63, 94, 0.4)' },
  height:      { main: '#ea580c', border: '#c2410c', bg: '#fff7ed', shadow: 'rgba(234, 88, 12, 0.4)' },
  level:       { main: '#3b82f6', border: '#1d4ed8', bg: '#eff6ff', shadow: 'rgba(59, 130, 246, 0.4)' },
};

function activeTheme() {
  return THEMES[activeItem.value.id] || THEMES.tree;
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

  const themeId = activeItem.value.id;

  if (themeId === 'level') {
    const levelColors = {
      1: { fill: '#3b82f6', stroke: '#1d4ed8' },
      2: { fill: '#10b981', stroke: '#047857' },
      3: { fill: '#f59e0b', stroke: '#b45309' },
      4: { fill: '#8b5cf6', stroke: '#6d28d9' },
    };
    const nodeLvl = nodePositions[id].level;
    const c = levelColors[nodeLvl] || { fill: '#3b82f6', stroke: '#1d4ed8' };
    return {
      fill: c.fill,
      stroke: c.stroke,
      strokeWidth: '3px',
      filter: `drop-shadow(0 0 10px ${c.fill})`,
      textColor: '#ffffff'
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
      filter: 'none'
    };
  }

  const theme = activeTheme();
  return {
    stroke: theme.main,
    strokeWidth: '4px',
    filter: `drop-shadow(0 0 6px ${theme.shadow})`
  };
}

function edgePath(e) {
  const p1 = nodePositions[e.from];
  const p2 = nodePositions[e.to];
  const r = 24;
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const dist = Math.hypot(dx, dy);
  const uX = dx / dist;
  const uY = dy / dist;
  const x1 = p1.x + uX * r;
  const y1 = p1.y + uY * r;
  const x2 = p2.x - uX * r;
  const y2 = p2.y - uY * r;
  return { x1, y1, x2, y2 };
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
              Select or click any Binary Tree terminology below to inspect its definition, formula, and visual highlight on the tree.
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
                     :style="selectedId === t.id ? { background: (THEMES[t.id] || THEMES.tree).bg, borderColor: (THEMES[t.id] || THEMES.tree).main } : {}"
                     @click="selectTerm(t.id)">
                  <input type="radio" :name="'term-radio'" :checked="selectedId === t.id" class="term-radio" :style="selectedId === t.id ? { accentColor: (THEMES[t.id] || THEMES.tree).main } : {}" />
                  <div class="term-info">
                    <div class="term-name" :style="selectedId === t.id ? { color: (THEMES[t.id] || THEMES.tree).border } : {}">{{ t.label }}</div>
                    <div class="term-sub">{{ t.sub }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT PANEL: VISUAL TREE DIAGRAM & EXPLANATION CARD -->
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
                    <!-- LEVEL BANDS / GUIDELINES -->
                    <g v-if="activeItem.showLevels">
                      <line x1="40" y1="55" x2="600" y2="55" class="level-line lvl-1" />
                      <text x="50" y="48" class="level-tag tag-lvl-1">Level 1 (Depth 0)</text>

                      <line x1="40" y1="135" x2="600" y2="135" class="level-line lvl-2" />
                      <text x="50" y="128" class="level-tag tag-lvl-2">Level 2 (Depth 1)</text>

                      <line x1="40" y1="215" x2="600" y2="215" class="level-line lvl-3" />
                      <text x="50" y="208" class="level-tag tag-lvl-3">Level 3 (Depth 2)</text>

                      <line x1="40" y1="295" x2="600" y2="295" class="level-line lvl-4" />
                      <text x="50" y="288" class="level-tag tag-lvl-4">Level 4 (Depth 3)</text>
                    </g>

                    <!-- SUBTREE BOUNDING BOX -->
                    <g v-if="activeItem.showSubtreeBox">
                      <rect x="335" y="90" width="210" height="255" rx="16" class="subtree-box" />
                      <text x="440" y="338" text-anchor="middle" class="subtree-box-label">B's Subtree</text>
                    </g>

                    <!-- SIBLING CONNECTOR LINES -->
                    <g v-if="activeItem.showSiblings">
                      <line x1="200" y1="135" x2="440" y2="135" class="sibling-line" />
                      <text x="320" y="127" text-anchor="middle" class="sibling-txt">Siblings (parent R)</text>

                      <line x1="140" y1="215" x2="260" y2="215" class="sibling-line" />
                      <text x="200" y="207" text-anchor="middle" class="sibling-txt">Siblings (parent A)</text>

                      <line x1="380" y1="215" x2="500" y2="215" class="sibling-line" />
                      <text x="440" y="207" text-anchor="middle" class="sibling-txt">Siblings (parent B)</text>
                    </g>

                    <!-- EDGES (Colored moving dashes with transparent gaps) -->
                    <g v-for="e in treeEdges" :key="e.id">
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
                    </g>

                    <!-- NODES -->
                    <g v-for="(pos, id) in nodePositions" :key="id + '-' + selectedId"
                       class="tree-node-group"
                       @click="selectTerm(id === 'R' ? 'root' : (['C','D','E','G'].includes(id) ? 'leaf' : 'node'))">
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

                      <!-- Node Callout Badges with Entrance Animation -->
                      <g class="node-badge-group">
                        <template v-if="selectedId === 'root' && id === 'R'">
                          <rect :x="pos.x - 42" :y="pos.y - 48" width="84" height="20" rx="4" class="node-badge-bg" :style="{ fill: activeTheme().dark }" />
                          <text :x="pos.x" :y="pos.y - 34" text-anchor="middle" class="node-badge-txt">Root Node</text>
                        </template>
                        <template v-if="selectedId === 'leaf' && ['C','D','E','G'].includes(id)">
                          <rect :x="pos.x - 32" :y="pos.y + 28" width="64" height="18" rx="4" class="node-badge-bg" :style="{ fill: activeTheme().dark }" />
                          <text :x="pos.x" :y="pos.y + 41" text-anchor="middle" class="node-badge-txt">Leaf</text>
                        </template>
                        <template v-if="selectedId === 'internal' && ['R','A','B','F'].includes(id)">
                          <rect :x="pos.x - 38" :y="pos.y - 48" width="76" height="18" rx="4" class="node-badge-bg" :style="{ fill: activeTheme().dark }" />
                          <text :x="pos.x" :y="pos.y - 35" text-anchor="middle" class="node-badge-txt">Internal</text>
                        </template>
                      </g>
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
            <span>Tip: Click any button or node, or use <b>Up / Down Arrow keys</b> to inspect Binary Tree terminologies.</span>
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
.ll-left-col { width: 300px; height: 75%; display: flex; flex-direction: column; background: var(--surface); border-right: 1px solid var(--border); flex-shrink: 0; overflow: hidden; }
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

/* SVG TREE STYLING & ANIMATIONS */
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

/* LEVEL LINES & BANDS */
.level-line { stroke-dasharray: 4 4; stroke-width: 1.5px; opacity: .75; }
.level-line.lvl-1 { stroke: #3b82f6; }
.level-line.lvl-2 { stroke: #10b981; }
.level-line.lvl-3 { stroke: #f59e0b; }
.level-line.lvl-4 { stroke: #8b5cf6; }

.level-tag { font-size: 11px; font-family: monospace; font-weight: 700; }
.tag-lvl-1 { fill: #2563eb; }
.tag-lvl-2 { fill: #059669; }
.tag-lvl-3 { fill: #d97706; }
.tag-lvl-4 { fill: #7c3aed; }

/* DEPTH PATH HIGHLIGHT */
@keyframes dashMove {
  to { stroke-dashoffset: -24; }
}
.depth-path-highlight { fill: none; stroke-width: 4px; stroke-dasharray: 6 4; opacity: .85; animation: dashMove 1s linear infinite; }

/* SUBTREE BOX */
@keyframes boxScaleIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
.subtree-box {
  fill: rgba(139, 92, 246, 0.08); stroke: #8b5cf6; stroke-width: 2px; stroke-dasharray: 6 4;
  transform-origin: center; transform-box: fill-box; animation: boxScaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.subtree-box-label { font-size: 12px; font-weight: 700; fill: #7c3aed; font-family: monospace; }

/* SIBLING LINES */
.sibling-line { stroke: #f59e0b; stroke-width: 2px; stroke-dasharray: 4 3; }
.sibling-txt { font-size: 10px; font-weight: 700; fill: #d97706; font-family: monospace; }

/* CALLOUT BADGES */
@keyframes badgePop {
  0% { opacity: 0; transform: translateY(-8px) scale(0.8); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
.node-badge-group {
  transform-origin: center;
  transform-box: fill-box;
  animation: badgePop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.node-badge-bg { fill: #1e293b; }
.node-badge-txt { fill: #ffffff; font-size: 10px; font-weight: 700; font-family: monospace; }

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
