<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';

/* ------------------------------------------------------------------ */
/* Props                                                              */
/* ------------------------------------------------------------------ */
const props = defineProps({
  topic: { type: String, default: 'Binary Tree — Using Linked Nodes' },
  subTopic: { type: String, default: 'BST Insertion with Node Pointers' },
});

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */
const ADDR = (i) => (i + 1) * 1000;
const fmt = (a) => {
  if (a === null || a === undefined) return 'null';
  const str = String(a);
  return str.startsWith('@') ? str : '@' + str;
};

/* ------------------------------------------------------------------ */
/* Source code (Java / C / C++ / Python), tagged per logical step      */
/* ------------------------------------------------------------------ */
const CODES = {
  java: [
    ['', 'import java.util.Scanner;'],
    ['', ''],
    ['', 'class Node {'],
    ['c_newNode_alloc', '    int data;'],
    ['c_newNode_alloc', '    Node left;'],
    ['c_newNode_alloc', '    Node right;'],
    ['c_newNode_alloc', '    Node(int data) {'],
    ['c_newNode_data',  '        this.data = data;'],
    ['c_newNode_left',  '        this.left = null;'],
    ['c_newNode_right', '        this.right = null;'],
    ['c_newNode_ret',   '    }  // Node ready'],
    ['', '}'],
    ['', ''],
    ['', 'class BinarySearchTree {'],
    ['c_rootCheck', '    Node root = null;'],
    ['', ''],
    ['c_insert',         '    void insert(int val) {'],
    ['c_newNode_alloc',  '        Node newNode = new Node(val);'],
    ['c_rootCheck',      '        if (root == null) {'],
    ['c_rootAssign',     '            root = newNode;'],
    ['c_rootReturn',     '            return;'],
    ['', '        }'],
    ['c_setCurr',        '        Node curr = root;'],
    ['c_whileLoop',      '        while (true) {'],
    ['c_cmpLeft',        '            if (val < curr.data) {'],
    ['c_leftNullCheck',  '                if (curr.left == null) {'],
    ['c_linkLeft',       '                    curr.left = newNode;'],
    ['c_retLeft',        '                    return;'],
    ['', '                } else {'],
    ['c_traverseLeft',   '                    curr = curr.left;'],
    ['', '                }'],
    ['c_cmpRight',       '            } else {'],
    ['c_rightNullCheck', '                if (curr.right == null) {'],
    ['c_linkRight',      '                    curr.right = newNode;'],
    ['c_retRight',       '                    return;'],
    ['', '                } else {'],
    ['c_traverseRight',  '                    curr = curr.right;'],
    ['', '                }'],
    ['', '            }'],
    ['', '        }'],
    ['', '    }'],
    ['', ''],
    ['c_main', '    public static void main(String[] args) {'],
    ['c_main', '        Scanner sc = new Scanner(System.in);'],
    ['c_main', '        BinarySearchTree bst = new BinarySearchTree();'],
    ['c_main', '        int size = sc.nextInt();'],
    ['c_main', '        for (int i = 0; i < size; i++) {'],
    ['c_insert', '            bst.insert(sc.nextInt());'],
    ['c_main', '        }'],
    ['c_main', '    }'],
    ['', '}'],
  ],
  c: [
    ['', '#include <stdio.h>'],
    ['', '#include <stdlib.h>'],
    ['', ''],
    ['', 'struct Node {'],
    ['c_newNode_alloc', '    int data;'],
    ['c_newNode_alloc', '    struct Node *left;'],
    ['c_newNode_alloc', '    struct Node *right;'],
    ['', '};'],
    ['', ''],
    ['c_rootCheck', 'struct Node *root = NULL;'],
    ['', ''],
    ['c_newNode_alloc', 'struct Node* createNode(int val) {'],
    ['c_newNode_alloc', '    struct Node* n = malloc(sizeof(struct Node));'],
    ['c_newNode_data',  '    n->data = val;'],
    ['c_newNode_left',  '    n->left = NULL;'],
    ['c_newNode_right', '    n->right = NULL;'],
    ['c_newNode_ret',   '    return n;'],
    ['', '}'],
    ['', ''],
    ['c_insert',         'void insert(int val) {'],
    ['c_newNode_alloc',  '    struct Node *newNode = createNode(val);'],
    ['c_rootCheck',      '    if (root == NULL) {'],
    ['c_rootAssign',     '        root = newNode;'],
    ['c_rootReturn',     '        return;'],
    ['', '    }'],
    ['c_setCurr',        '    struct Node *curr = root;'],
    ['c_whileLoop',      '    while (1) {'],
    ['c_cmpLeft',        '        if (val < curr->data) {'],
    ['c_leftNullCheck',  '            if (curr->left == NULL) {'],
    ['c_linkLeft',       '                curr->left = newNode;'],
    ['c_retLeft',        '                return;'],
    ['', '            } else {'],
    ['c_traverseLeft',   '                curr = curr->left;'],
    ['', '            }'],
    ['c_cmpRight',       '        } else {'],
    ['c_rightNullCheck', '            if (curr->right == NULL) {'],
    ['c_linkRight',      '                curr->right = newNode;'],
    ['c_retRight',       '                return;'],
    ['', '            } else {'],
    ['c_traverseRight',  '                curr = curr->right;'],
    ['', '            }'],
    ['', '        }'],
    ['', '    }'],
    ['', '}'],
    ['', ''],
    ['c_main', 'int main() {'],
    ['c_main', '    int size, value;'],
    ['c_main', '    scanf("%d", &size);'],
    ['c_main', '    for (int i = 0; i < size; i++) {'],
    ['c_main', '        scanf("%d", &value);'],
    ['c_insert', '        insert(value);'],
    ['c_main', '    }'],
    ['c_main', '    return 0;'],
    ['', '}'],
  ],
  cpp: [
    ['', '#include <iostream>'],
    ['', 'using namespace std;'],
    ['', ''],
    ['', 'struct Node {'],
    ['c_newNode_alloc', '    int data;'],
    ['c_newNode_alloc', '    Node *left;'],
    ['c_newNode_alloc', '    Node *right;'],
    ['c_newNode_alloc', '    Node(int v) : data(v), left(nullptr), right(nullptr) {}'],
    ['', '};'],
    ['', ''],
    ['c_rootCheck', 'Node *root = nullptr;'],
    ['', ''],
    ['c_insert',         'void insert(int val) {'],
    ['c_newNode_alloc',  '    Node *newNode = new Node(val);'],
    ['c_newNode_data',   '    // newNode->data = val  (set by constructor)'],
    ['c_newNode_left',   '    // newNode->left  = nullptr  (set by constructor)'],
    ['c_newNode_right',  '    // newNode->right = nullptr  (set by constructor)'],
    ['c_newNode_ret',    '    // newNode ready ✓'],
    ['c_rootCheck',      '    if (root == nullptr) {'],
    ['c_rootAssign',     '        root = newNode;'],
    ['c_rootReturn',     '        return;'],
    ['', '    }'],
    ['c_setCurr',        '    Node *curr = root;'],
    ['c_whileLoop',      '    while (true) {'],
    ['c_cmpLeft',        '        if (val < curr->data) {'],
    ['c_leftNullCheck',  '            if (curr->left == nullptr) {'],
    ['c_linkLeft',       '                curr->left = newNode;'],
    ['c_retLeft',        '                return;'],
    ['', '            } else {'],
    ['c_traverseLeft',   '                curr = curr->left;'],
    ['', '            }'],
    ['c_cmpRight',       '        } else {'],
    ['c_rightNullCheck', '            if (curr->right == nullptr) {'],
    ['c_linkRight',      '                curr->right = newNode;'],
    ['c_retRight',       '                return;'],
    ['', '            } else {'],
    ['c_traverseRight',  '                curr = curr->right;'],
    ['', '            }'],
    ['', '        }'],
    ['', '    }'],
    ['', '}'],
    ['', ''],
    ['c_main', 'int main() {'],
    ['c_main', '    int size, value;'],
    ['c_main', '    cin >> size;'],
    ['c_main', '    for (int i = 0; i < size; i++) {'],
    ['c_main', '        cin >> value;'],
    ['c_insert', '        insert(value);'],
    ['c_main', '    }'],
    ['c_main', '    return 0;'],
    ['', '}'],
  ],
  python: [
    ['', 'class Node:'],
    ['c_newNode_alloc', '    def __init__(self, val):'],
    ['c_newNode_data',  '        self.data = val'],
    ['c_newNode_left',  '        self.left = None'],
    ['c_newNode_right', '        self.right = None'],
    ['', ''],
    ['', 'class BinarySearchTree:'],
    ['c_rootCheck', '    def __init__(self):'],
    ['c_rootCheck', '        self.root = None'],
    ['', ''],
    ['c_insert',         '    def insert(self, val):'],
    ['c_newNode_alloc',  '        new_node = Node(val)'],
    ['c_newNode_data',   '        # new_node.data = val  (set by __init__)'],
    ['c_newNode_left',   '        # new_node.left = None (set by __init__)'],
    ['c_newNode_right',  '        # new_node.right = None (set by __init__)'],
    ['c_newNode_ret',    '        # new_node ready ✓'],
    ['c_rootCheck',      '        if self.root is None:'],
    ['c_rootAssign',     '            self.root = new_node'],
    ['c_rootReturn',     '            return'],
    ['c_setCurr',        '        curr = self.root'],
    ['c_whileLoop',      '        while True:'],
    ['c_cmpLeft',        '            if val < curr.data:'],
    ['c_leftNullCheck',  '                if curr.left is None:'],
    ['c_linkLeft',       '                    curr.left = new_node'],
    ['c_retLeft',        '                    return'],
    ['c_traverseLeft',   '                else:'],
    ['c_traverseLeft',   '                    curr = curr.left'],
    ['c_cmpRight',       '            else:'],
    ['c_rightNullCheck', '                if curr.right is None:'],
    ['c_linkRight',      '                    curr.right = new_node'],
    ['c_retRight',       '                    return'],
    ['c_traverseRight',  '                else:'],
    ['c_traverseRight',  '                    curr = curr.right'],
    ['', ''],
    ['c_main', 'size = int(input())'],
    ['c_main', 'bst = BinarySearchTree()'],
    ['c_main', 'for _ in range(size):'],
    ['c_insert', '    bst.insert(int(input()))'],
  ],
};

/* ------------------------------------------------------------------ */
/* Pseudocode                                                          */
/* ------------------------------------------------------------------ */
const PSEUDOCODE = [
  'function insert(root, val):',
  '    newNode = createNode(val)',
  '    newNode.data  = val',
  '    newNode.left  = null',
  '    newNode.right = null',
  '',
  '    if root == null:',
  '        root = newNode',
  '        return',
  '',
  '    curr = root',
  '    while true:',
  '        if val < curr.data:',
  '            if curr.left == null:',
  '                curr.left = newNode',
  '                return',
  '            else:',
  '                curr = curr.left',
  '        else:',
  '            if curr.right == null:',
  '                curr.right = newNode',
  '                return',
  '            else:',
  '                curr = curr.right',
];

function frame(title, rows) {
  return { title, rows };
}

/* ------------------------------------------------------------------ */
/* Step generation                                                     */
/* ------------------------------------------------------------------ */
function buildSteps(values) {
  const steps = [];
  const nodes = []; // { id, val, left, right, addr }
  const edges = []; // { from, to }
  let rootId = null;

  function pushStep({ curr = null, newNode = null, badge, code, vars = [] }) {
    steps.push({
      nodes: nodes.map((n) => ({ ...n })),
      edges: edges.map((e) => ({ ...e })),
      root: rootId !== null ? ADDR(rootId) : null,
      newNode: newNode !== null ? ADDR(newNode) : null,
      curr: curr !== null ? ADDR(curr) : null,
      rootId,
      newNodeId: newNode,
      currId: curr,
      badge,
      code,
      vars,
    });
  }

  // ── Step 1: main() — read size ────────────────────────────────────────────
  const sz = '' + values.length;
  pushStep({
    badge: 'Program starts. Read input → size = ' + sz,
    code: 'c_main',
    vars: [frame('main()', [['size', sz], ['root', 'null', true]])],
  });

  values.forEach((v) => {
    const id    = nodes.length;
    const addr  = ADDR(id);
    const rootFmt = () => fmt(rootId !== null ? ADDR(rootId) : null);

    // ── Step: bst.insert(v) call ─────────────────────────────────────────────
    pushStep({
      badge: `Loop iteration: calling insert(val = ${v})`,
      code: 'c_insert',
      vars: [
        frame('main()', [['size', sz], ['root', rootFmt(), true]]),
        frame(`insert(val=${v})`, [['val', v]]),
      ],
    });

    // ── Step: Node newNode = new Node(val)  — allocate ───────────────────────
    nodes.push({ id, val: v, left: null, right: null, addr });
    pushStep({
      newNode: id,
      badge: `Allocate new Node(${v}) at @${addr}. Constructor begins.`,
      code: 'c_newNode_alloc',
      vars: [
        frame('main()', [['size', sz], ['root', rootFmt(), true]]),
        frame(`insert(val=${v})`, [
          ['val', v],
          ['newNode', '@' + addr, true],
        ]),
      ],
    });

    // ── Step: this.data = val ────────────────────────────────────────────────
    pushStep({
      newNode: id,
      badge: `Set newNode.data = ${v}`,
      code: 'c_newNode_data',
      vars: [
        frame('main()', [['size', sz], ['root', rootFmt(), true]]),
        frame(`insert(val=${v})`, [
          ['val', v],
          ['newNode', '@' + addr, true],
          ['newNode.data', '' + v],
        ]),
      ],
    });

    // ── Step: this.left = null ────────────────────────────────────────────────
    pushStep({
      newNode: id,
      badge: `Set newNode.left = null`,
      code: 'c_newNode_left',
      vars: [
        frame('main()', [['size', sz], ['root', rootFmt(), true]]),
        frame(`insert(val=${v})`, [
          ['val', v],
          ['newNode', '@' + addr, true],
          ['newNode.left', 'null', true],
        ]),
      ],
    });

    // ── Step: this.right = null ───────────────────────────────────────────────
    pushStep({
      newNode: id,
      badge: `Set newNode.right = null`,
      code: 'c_newNode_right',
      vars: [
        frame('main()', [['size', sz], ['root', rootFmt(), true]]),
        frame(`insert(val=${v})`, [
          ['val', v],
          ['newNode', '@' + addr, true],
          ['newNode.left',  'null', true],
          ['newNode.right', 'null', true],
        ]),
      ],
    });

    // ── Step (C only): return n — createNode() returns the new node ───────────
    pushStep({
      newNode: id,
      badge: `Constructor / createNode() complete. newNode (@${addr}) is ready with data=${v}, left=null, right=null.`,
      code: 'c_newNode_ret',
      vars: [
        frame('main()', [['size', sz], ['root', rootFmt(), true]]),
        frame(`insert(val=${v})`, [
          ['val', v],
          ['newNode', '@' + addr, true],
          ['newNode.data',  '' + v],
          ['newNode.left',  'null', true],
          ['newNode.right', 'null', true],
        ]),
      ],
    });

    // ── Step: if (root == null) — check ──────────────────────────────────────
    pushStep({
      newNode: id,
      badge: `Check: root == null? → ${rootId === null ? 'YES — tree is empty' : 'NO — tree has nodes'}`,
      code: 'c_rootCheck',
      vars: [
        frame('main()', [['size', sz], ['root', rootFmt(), true]]),
        frame(`insert(val=${v})`, [
          ['val', v],
          ['newNode', '@' + addr, true],
          ['root', rootFmt(), true],
        ]),
      ],
    });

    if (rootId === null) {
      // ── Step: root = newNode ────────────────────────────────────────────────
      rootId = id;
      pushStep({
        newNode: id,
        badge: `root is null → assign root = newNode (@${addr}). Root pointer now set.`,
        code: 'c_rootAssign',
        vars: [
          frame('main()', [['size', sz], ['root', '@' + addr, true]]),
          frame(`insert(val=${v})`, [
            ['val', v],
            ['newNode', '@' + addr, true],
            ['root', '@' + addr, true],
          ]),
        ],
      });

      // ── Step: return ────────────────────────────────────────────────────────
      pushStep({
        newNode: id,
        badge: `return — ${v} inserted as root node. insert() exits.`,
        code: 'c_rootReturn',
        vars: [
          frame('main()', [['size', sz], ['root', '@' + addr, true]]),
          frame(`insert(val=${v})`, [['val', v], ['newNode', '@' + addr, true]]),
        ],
      });
      return;
    }

    // ── Step: Node curr = root ───────────────────────────────────────────────
    let currId = rootId;
    pushStep({
      newNode: id,
      curr: currId,
      badge: `root is not null. Set curr = root (@${ADDR(currId)}). Begin tree traversal.`,
      code: 'c_setCurr',
      vars: [
        frame('main()', [['size', sz], ['root', '@' + ADDR(rootId), true]]),
        frame(`insert(val=${v})`, [
          ['val', v],
          ['newNode', '@' + addr, true],
          ['curr', '@' + ADDR(currId), true],
        ]),
      ],
    });

    // ── Step: while (true) — first loop entry ────────────────────────────────
    pushStep({
      newNode: id,
      curr: currId,
      badge: `Enter while loop. curr = @${ADDR(currId)} (val=${nodes[currId].val})`,
      code: 'c_whileLoop',
      vars: [
        frame('main()', [['size', sz], ['root', '@' + ADDR(rootId), true]]),
        frame(`insert(val=${v})`, [
          ['val', v],
          ['newNode', '@' + addr, true],
          ['curr', '@' + ADDR(currId), true],
        ]),
      ],
    });

    while (true) {
      const curr = nodes[currId];

      if (v < curr.val) {
        // ── Step: if (val < curr.data) — outer comparison ───────────────────
        pushStep({
          newNode: id,
          curr: currId,
          badge: `Compare: ${v} < ${curr.val} (curr.data) → TRUE → go LEFT`,
          code: 'c_cmpLeft',
          vars: [
            frame('main()', [['size', sz], ['root', '@' + ADDR(rootId), true]]),
            frame(`insert(val=${v})`, [
              ['val', v],
              ['curr', '@' + curr.addr, true],
              ['curr.data', '' + curr.val],
            ]),
          ],
        });

        // ── Step: if (curr.left == null) — null check ────────────────────────
        pushStep({
          newNode: id,
          curr: currId,
          badge: `Check: curr.left == null? → ${curr.left === null ? 'YES — insert here' : 'NO — keep traversing'}`,
          code: 'c_leftNullCheck',
          vars: [
            frame('main()', [['size', sz], ['root', '@' + ADDR(rootId), true]]),
            frame(`insert(val=${v})`, [
              ['val', v],
              ['curr', '@' + curr.addr, true],
              ['curr.left', fmt(curr.left !== null ? ADDR(curr.left) : null), true],
            ]),
          ],
        });

        if (curr.left === null) {
          // ── Step: curr.left = newNode ──────────────────────────────────────
          curr.left = id;
          edges.push({ from: currId, to: id });
          pushStep({
            newNode: id,
            curr: currId,
            badge: `curr.left is null → link: curr.left = newNode (@${addr}). Edge drawn.`,
            code: 'c_linkLeft',
            vars: [
              frame('main()', [['size', sz], ['root', '@' + ADDR(rootId), true]]),
              frame(`insert(val=${v})`, [
                ['val', v],
                ['curr', '@' + curr.addr, true],
                ['curr.left', '@' + addr, true],
              ]),
            ],
          });

          // ── Step: return ───────────────────────────────────────────────────
          pushStep({
            newNode: id,
            curr: currId,
            badge: `return — ${v} inserted as left child of ${curr.val}. insert() exits.`,
            code: 'c_retLeft',
            vars: [
              frame('main()', [['size', sz], ['root', '@' + ADDR(rootId), true]]),
              frame(`insert(val=${v})`, [
                ['val', v],
                ['curr', '@' + curr.addr, true],
                ['curr.left', '@' + addr, true],
              ]),
            ],
          });
          break;
        } else {
          // ── Step: curr = curr.left ──────────────────────────────────────────
          pushStep({
            newNode: id,
            curr: currId,
            badge: `curr.left (@${ADDR(curr.left)}) is not null → move curr = curr.left`,
            code: 'c_traverseLeft',
            vars: [
              frame('main()', [['size', sz], ['root', '@' + ADDR(rootId), true]]),
              frame(`insert(val=${v})`, [
                ['val', v],
                ['curr', '@' + curr.addr, true],
                ['curr.left', '@' + ADDR(curr.left), true],
              ]),
            ],
          });
          currId = curr.left;

          // ── Step: loop back — while (true) re-entry ─────────────────────────
          pushStep({
            newNode: id,
            curr: currId,
            badge: `Loop continues. curr = @${ADDR(currId)} (val=${nodes[currId].val})`,
            code: 'c_whileLoop',
            vars: [
              frame('main()', [['size', sz], ['root', '@' + ADDR(rootId), true]]),
              frame(`insert(val=${v})`, [
                ['val', v],
                ['newNode', '@' + addr, true],
                ['curr', '@' + ADDR(currId), true],
              ]),
            ],
          });
        }
      } else {
        // ── Step: if (val < curr.data) evaluated — FALSE, entering else ──────
        pushStep({
          newNode: id,
          curr: currId,
          badge: `Evaluate: if (${v} < ${curr.val}) → FALSE — condition fails, entering else branch`,
          code: 'c_cmpLeft',
          vars: [
            frame('main()', [['size', sz], ['root', '@' + ADDR(rootId), true]]),
            frame(`insert(val=${v})`, [
              ['val', v],
              ['curr', '@' + curr.addr, true],
              ['curr.data', '' + curr.val],
            ]),
          ],
        });

        // ── Step: else block — go RIGHT ───────────────────────────────────────
        pushStep({
          newNode: id,
          curr: currId,
          badge: `${v} ≥ ${curr.val} (curr.data) → else branch → go RIGHT`,
          code: 'c_cmpRight',
          vars: [
            frame('main()', [['size', sz], ['root', '@' + ADDR(rootId), true]]),
            frame(`insert(val=${v})`, [
              ['val', v],
              ['curr', '@' + curr.addr, true],
              ['curr.data', '' + curr.val],
            ]),
          ],
        });

        // ── Step: if (curr.right == null) — null check ───────────────────────
        pushStep({
          newNode: id,
          curr: currId,
          badge: `Check: curr.right == null? → ${curr.right === null ? 'YES — insert here' : 'NO — keep traversing'}`,
          code: 'c_rightNullCheck',
          vars: [
            frame('main()', [['size', sz], ['root', '@' + ADDR(rootId), true]]),
            frame(`insert(val=${v})`, [
              ['val', v],
              ['curr', '@' + curr.addr, true],
              ['curr.right', fmt(curr.right !== null ? ADDR(curr.right) : null), true],
            ]),
          ],
        });

        if (curr.right === null) {
          // ── Step: curr.right = newNode ──────────────────────────────────────
          curr.right = id;
          edges.push({ from: currId, to: id });
          pushStep({
            newNode: id,
            curr: currId,
            badge: `curr.right is null → link: curr.right = newNode (@${addr}). Edge drawn.`,
            code: 'c_linkRight',
            vars: [
              frame('main()', [['size', sz], ['root', '@' + ADDR(rootId), true]]),
              frame(`insert(val=${v})`, [
                ['val', v],
                ['curr', '@' + curr.addr, true],
                ['curr.right', '@' + addr, true],
              ]),
            ],
          });

          // ── Step: return ───────────────────────────────────────────────────
          pushStep({
            newNode: id,
            curr: currId,
            badge: `return — ${v} inserted as right child of ${curr.val}. insert() exits.`,
            code: 'c_retRight',
            vars: [
              frame('main()', [['size', sz], ['root', '@' + ADDR(rootId), true]]),
              frame(`insert(val=${v})`, [
                ['val', v],
                ['curr', '@' + curr.addr, true],
                ['curr.right', '@' + addr, true],
              ]),
            ],
          });
          break;
        } else {
          // ── Step: curr = curr.right ─────────────────────────────────────────
          pushStep({
            newNode: id,
            curr: currId,
            badge: `curr.right (@${ADDR(curr.right)}) is not null → move curr = curr.right`,
            code: 'c_traverseRight',
            vars: [
              frame('main()', [['size', sz], ['root', '@' + ADDR(rootId), true]]),
              frame(`insert(val=${v})`, [
                ['val', v],
                ['curr', '@' + curr.addr, true],
                ['curr.right', '@' + ADDR(curr.right), true],
              ]),
            ],
          });
          currId = curr.right;

          // ── Step: loop back — while (true) re-entry ─────────────────────────
          pushStep({
            newNode: id,
            curr: currId,
            badge: `Loop continues. curr = @${ADDR(currId)} (val=${nodes[currId].val})`,
            code: 'c_whileLoop',
            vars: [
              frame('main()', [['size', sz], ['root', '@' + ADDR(rootId), true]]),
              frame(`insert(val=${v})`, [
                ['val', v],
                ['newNode', '@' + addr, true],
                ['curr', '@' + ADDR(currId), true],
              ]),
            ],
          });
        }
      }
    }
  });

  return steps;
}

/* ------------------------------------------------------------------ */
/* Reactive State                                                      */
/* ------------------------------------------------------------------ */
const inpElems = ref('5 3 7 1 4 6 8');
const lang = ref('java');
const rightTab = ref('code');
const speed = ref(900);
const si = ref(0);
const playing = ref(false);
const steps = ref([]);

const vizHeight = ref(320);
const tableHeight = ref(90);
const leftWidth = ref(58);

const mainRef = ref(null);
const leftColRef = ref(null);
const hResizerRef = ref(null);
const vizResizerRef = ref(null);
const tableResizerRef = ref(null);

let playTimer = null;

const currentStep = computed(() => steps.value[si.value] || { nodes: [], edges: [], vars: [], badge: '' });
const s = computed(() => currentStep.value);
const codeLines = computed(() => CODES[lang.value] || []);

const nodesById = computed(() => {
  const m = {};
  (currentStep.value.nodes || []).forEach((n) => (m[n.id] = n));
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

// Fixed node dimensions — constant at all times
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

const START_Y    = PAD_TOP + NODE_BOX_H / 2; // 57

/* Layout of the FINAL tree (after all insertions in the current run) is
   computed once, so node positions never shift or resize between steps —
   only which nodes are currently visible changes during playback. */
const finalLayout = ref({ rawX: {}, depth: {}, minX: 0, maxX: 0, maxDepth: 0 });

function computeFinalLayout(builtSteps) {
  if (!builtSteps.length) return { rawX: {}, depth: {}, minX: 0, maxX: 0, maxDepth: 0 };
  const last = builtSteps[builtSteps.length - 1];
  const byId = {};
  last.nodes.forEach((n) => (byId[n.id] = { ...n }));

  const rootId = last.rootId;
  if (rootId === null || rootId === undefined || !byId[rootId]) {
    return { rawX: {}, depth: {}, minX: 0, maxX: 0, maxDepth: 0 };
  }

  const depth = {};
  function assignDepth(id, d) {
    if (id === null || id === undefined || !byId[id]) return;
    depth[id] = d;
    assignDepth(byId[id].left, d + 1);
    assignDepth(byId[id].right, d + 1);
  }
  assignDepth(rootId, 0);

  const inOrderNodes = [];
  function inorder(id) {
    if (id === null || id === undefined || !byId[id]) return;
    inorder(byId[id].left);
    inOrderNodes.push(id);
    inorder(byId[id].right);
  }
  inorder(rootId);

  const rawX = {};
  const SPACING = 90;
  inOrderNodes.forEach((id, idx) => {
    rawX[id] = idx * SPACING;
  });

  function adjustParentX(id) {
    if (id === null || id === undefined || !byId[id]) return;
    const node = byId[id];
    adjustParentX(node.left);
    adjustParentX(node.right);

    if (node.left !== null && node.left !== undefined && byId[node.left] &&
        node.right !== null && node.right !== undefined && byId[node.right]) {
      rawX[id] = (rawX[node.left] + rawX[node.right]) / 2;
    }
  }
  adjustParentX(rootId);

  let minX = Infinity, maxX = -Infinity, maxDepth = 0;
  inOrderNodes.forEach(id => {
    if (rawX[id] < minX) minX = rawX[id];
    if (rawX[id] > maxX) maxX = rawX[id];
    if ((depth[id] || 0) > maxDepth) maxDepth = depth[id];
  });

  return { rawX, depth, minX: minX === Infinity ? 0 : minX, maxX: maxX === -Infinity ? 0 : maxX, maxDepth };
}

const treeLayout = computed(() => {
  const step = currentStep.value;
  const layout = finalLayout.value;
  const { rawX = {}, depth = {}, minX = 0, maxX = 0, maxDepth = 0 } = layout;

  const PAD_SIDE_EFF = 70;
  const CANVAS_W = 640;
  const contentW = (maxX - minX) + 2 * PAD_SIDE_EFF;
  const shiftX = Math.max(0, (CANVAS_W - contentW) / 2);
  const treeW = Math.max(CANVAS_W, contentW);

  const stagingX = treeW + 90;
  const totalW = stagingX + NODE_W / 2 + PAD_SIDE;
  const totalH = Math.max(320, START_Y + maxDepth * LEVEL_H + NODE_H / 2 + 20);

  const positions = {};
  let staging = null;

  (step.nodes || []).forEach((n) => {
    const isUnplaced =
      step.newNodeId === n.id &&
      step.rootId !== n.id &&
      !(step.edges || []).some((e) => e.to === n.id);

    if (isUnplaced) {
      positions[n.id] = { x: stagingX, y: START_Y };
      staging = { id: n.id, x: stagingX, y: START_Y };
    } else {
      if (rawX[n.id] !== undefined) {
        positions[n.id] = {
          x: rawX[n.id] - minX + PAD_SIDE_EFF + shiftX,
          y: START_Y + (depth[n.id] || 0) * LEVEL_H,
        };
      } else {
        positions[n.id] = { x: PAD_SIDE, y: START_Y };
      }
    }
  });

  return {
    positions,
    edges: step.edges || [],
    viewBox: `0 0 ${totalW} ${totalH}`,
    nodeW: NODE_W,
    nodeBoxH: NODE_BOX_H,
    nodeH: NODE_H,
    staging,
    totalH,
  };
});

function pos(id) {
  return treeLayout.value.positions[id] || { x: 0, y: 0 };
}

/* Connect parent left/right cell to center top of child node box */
function edgeCoords(e) {
  const pFrom = pos(e.from);
  const pTo = pos(e.to);
  const fromNode = nodesById.value[e.from];
  const isLeft = fromNode && fromNode.left === e.to;
  const hw = ((treeLayout.value.nodeW || 132) / 2) * 0.6;
  const nbh = treeLayout.value.nodeBoxH || 44;
  return {
    x1: isLeft ? pFrom.x - hw : pFrom.x + hw,
    y1: pFrom.y,
    x2: pTo.x,
    y2: pTo.y - nbh / 2,
  };
}

// Approximate px-per-character for 12px bold Consolas
const CHAR_W = 8.5;
const LABEL_PAD = 6;

/* Horizontal side-by-side pointer badges with downward arrows ↓ */
function getPointerBadgesForNode(id) {
  const step = currentStep.value;
  if (!step) return [];
  const ptrs = [];
  if (step.rootId === id) ptrs.push({ name: 'root', label: 'root', color: '#3b82f6' });
  if (step.newNodeId === id) ptrs.push({ name: 'newNode', label: 'newNode', color: '#22c55e' });
  if (step.currId === id) ptrs.push({ name: 'curr', label: 'curr', color: '#f97316' });

  const count = ptrs.length;
  if (!count) return [];
  const nodeX = pos(id).x;
  const nodeY = pos(id).y;
  const nbh = treeLayout.value.nodeBoxH || 44;

  if (count === 1) {
    return [{ ...ptrs[0], x: nodeX, yText: nodeY - nbh / 2 - 22, yArrow: nodeY - nbh / 2 - 8 }];
  }

  const GAP = 4;
  const halfWidths = ptrs.map((p) => (p.label.length * CHAR_W) / 2 + LABEL_PAD);
  const totalW = halfWidths.reduce((sum, hw) => sum + hw * 2, 0) + GAP * (count - 1);
  let cursor = nodeX - totalW / 2;
  const positions = ptrs.map((p, i) => {
    const hw = halfWidths[i];
    const x = cursor + hw;
    cursor += hw * 2 + GAP;
    return x;
  });

  return ptrs.map((p, i) => ({
    ...p,
    x: positions[i],
    yText: nodeY - nbh / 2 - 22,
    yArrow: nodeY - nbh / 2 - 8,
  }));
}

function nodeBoxClass(n) {
  const step = currentStep.value;
  if (!step) return '';
  if (step.newNodeId === n.id) return 'bt-box-new';
  if (step.currId === n.id) return 'bt-box-cur';
  return '';
}

/* ------------------------------------------------------------------ */
/* Playback Controls                                                   */
/* ------------------------------------------------------------------ */
function applyInput() {
  const arr = inpElems.value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(Number)
    .filter((n) => Number.isFinite(n));

  const values = arr.slice(0, 7); // only the first 7 input elements are used

  clearTimeout(playTimer);
  playing.value = false;
  steps.value = values.length ? buildSteps(values) : [];
  finalLayout.value = computeFinalLayout(steps.value);
  si.value = 0;
}

function resetCode() {
  applyInput();
}

function stepBy(n) {
  if (!steps.value.length) return;
  si.value = Math.min(steps.value.length - 1, Math.max(0, si.value + n));
}

function tick() {
  if (si.value >= steps.value.length - 1) {
    playing.value = false;
    clearTimeout(playTimer);
    return;
  }
  si.value++;
  playTimer = setTimeout(tick, speed.value);
}

function togglePlay() {
  if (!steps.value.length) return;
  if (playing.value) {
    playing.value = false;
    clearTimeout(playTimer);
    return;
  }
  if (si.value >= steps.value.length - 1) si.value = 0;
  playing.value = true;
  tick();
}

watch(speed, (nv) => {
  if (playing.value) {
    clearTimeout(playTimer);
    playTimer = setTimeout(tick, nv);
  }
});

/* ------------------------------------------------------------------ */
/* Resizer logic                                                      */
/* ------------------------------------------------------------------ */
function initHResizer() {
  const rsz = hResizerRef.value;
  if (!rsz) return;
  let dragging = false, startX = 0, startW = 0;
  const onDown = (e) => {
    dragging = true;
    startX = e.clientX;
    startW = leftWidth.value;
    rsz.classList.add('drag');
    document.body.style.userSelect = 'none';
  };
  const onMove = (e) => {
    if (!dragging) return;
    const containerW = rsz.parentElement.getBoundingClientRect().width;
    const delta = ((e.clientX - startX) / containerW) * 100;
    leftWidth.value = Math.max(20, Math.min(80, startW + delta));
  };
  const onUp = () => {
    if (!dragging) return;
    dragging = false;
    rsz.classList.remove('drag');
    document.body.style.userSelect = '';
  };
  rsz.addEventListener('mousedown', onDown);
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
  return () => {
    rsz.removeEventListener('mousedown', onDown);
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
  };
}

function initVResizer(refElem, valueRef, minH, maxH) {
  const rsz = refElem.value;
  if (!rsz) return;
  let dragging = false, startY = 0, startH = 0;
  const onDown = (e) => {
    dragging = true;
    startY = e.clientY;
    startH = valueRef.value;
    rsz.classList.add('drag');
    document.body.style.userSelect = 'none';
  };
  const onMove = (e) => {
    if (!dragging) return;
    valueRef.value = Math.max(minH, Math.min(maxH, startH + (e.clientY - startY)));
  };
  const onUp = () => {
    if (!dragging) return;
    dragging = false;
    rsz.classList.remove('drag');
    document.body.style.userSelect = '';
  };
  rsz.addEventListener('mousedown', onDown);
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
  return () => {
    rsz.removeEventListener('mousedown', onDown);
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
  };
}

let cleanupFns = [];

function onKeydown(e) {
  if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
  if (e.key === 'ArrowRight') stepBy(1);
  else if (e.key === 'ArrowLeft') stepBy(-1);
  else if (e.code === 'Space') {
    e.preventDefault();
    togglePlay();
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown);
  cleanupFns.push(initHResizer());
  cleanupFns.push(initVResizer(vizResizerRef, vizHeight, 160, 480));
  cleanupFns.push(initVResizer(tableResizerRef, tableHeight, 50, 200));
  applyInput();

  // Observe the viz wrapper so layout auto-adapts when the panel resizes
  if (vizSvgRef.value) {
    vizRO = new ResizeObserver((entries) => {
      for (const entry of entries) {
        vizContainerW.value = entry.contentRect.width || 640;
        vizContainerH.value = entry.contentRect.height || 320;
      }
    });
    vizRO.observe(vizSvgRef.value);
    const rect = vizSvgRef.value.getBoundingClientRect();
    vizContainerW.value = rect.width || 640;
    vizContainerH.value = rect.height || 320;
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown);
  clearTimeout(playTimer);
  cleanupFns.forEach((fn) => fn && fn());
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
            <input
              type="text"
              v-model="inpElems"
              placeholder="e.g. 5 3 7 1 4 6 8"
              class="ll-text-input"
              @keyup.enter="applyInput"
            />
            <button class="ll-viz-btn" @click="applyInput">▶ Visualize</button>

            <div class="ll-nav-controls">
              <button class="ll-nav-btn" title="First step" @click="stepBy(-steps.length)">«</button>
              <button class="ll-nav-btn" @click="stepBy(-1)">‹ Prev</button>
              <button class="ll-play-btn" @click="togglePlay">{{ playing ? '⏸ Pause' : '▶ Play' }}</button>
              <button class="ll-nav-btn" @click="stepBy(1)">Next ›</button>
              <button class="ll-nav-btn" title="Last step" @click="stepBy(steps.length)">»</button>
            </div>
          </div>

          <!-- MAIN -->
          <div class="ll-main" ref="mainRef">
            <div class="ll-left-col" ref="leftColRef" :style="{ width: leftWidth + '%' }">
              <!-- VIZ -->
              <div class="ll-viz-wrap" :style="{ height: vizHeight + 'px' }">
                <div class="ll-perm-area" ref="vizSvgRef">
                  <div class="ll-ptrs">
                    <div class="ll-ptr-chip">root = <b class="ll-c-blue">{{ fmt(s.root) }}</b></div>
                    <div v-if="s.newNode !== null" class="ll-ptr-chip">
                      newNode = <b class="ll-c-green">{{ fmt(s.newNode) }}</b>
                    </div>
                    <div v-if="s.curr !== null" class="ll-ptr-chip">
                      curr = <b class="ll-c-orange">{{ fmt(s.curr) }}</b>
                    </div>
                  </div>

                  <!-- SVG Tree Canvas -->
                  <svg
                    class="ll-svg"
                    :viewBox="treeLayout.viewBox"
                    preserveAspectRatio="xMidYMid meet"
                    width="100%"
                    height="100%"
                  >

                    <!-- Parent-Child Connector Lines (Light Gray Clean Lines) -->
                    <line
                      v-for="(e, i) in treeLayout.edges"
                      :key="'e-' + i"
                      :x1="edgeCoords(e).x1"
                      :y1="edgeCoords(e).y1"
                      :x2="edgeCoords(e).x2"
                      :y2="edgeCoords(e).y2"
                      class="bt-edge-line"
                    />

                    <!-- Pointer Labels and Downward Arrows ↓ -->
                    <g v-for="n in s.nodes" :key="'ptrs' + n.id">
                      <template v-for="p in getPointerBadgesForNode(n.id)" :key="p.name">
                        <!-- Label Text -->
                        <text
                          :x="p.x"
                          :y="p.yText"
                          text-anchor="middle"
                          :fill="p.color"
                          class="heap-ptr-txt"
                        >
                          {{ p.label }}
                        </text>
                        <!-- Downward Arrow ↓ -->
                        <text
                          :x="p.x"
                          :y="p.yArrow"
                          text-anchor="middle"
                          :fill="p.color"
                          class="heap-ptr-arrow"
                        >
                          ↓
                        </text>
                      </template>
                    </g>

                    <!-- Nodes -->
                    <foreignObject
                      v-for="n in s.nodes"
                      :key="'n' + n.id"
                      :x="pos(n.id).x - (treeLayout.nodeW || 132) / 2"
                      :y="pos(n.id).y - (treeLayout.nodeBoxH || 44) / 2"
                      :width="treeLayout.nodeW || 132"
                      :height="treeLayout.nodeH || 68"
                    >
                      <div xmlns="http://www.w3.org/1999/xhtml" class="ll-node-wrap">
                        <!-- 3-section node container box -->
                        <div class="ll-box" :class="nodeBoxClass(n)">
                          <div class="ll-node-top">
                            <div class="ll-ptr ll-ptr-prev"><small>left</small>{{ fmt(childAddr(n.left)) }}</div>
                            <div class="ll-data">{{ n.val }}</div>
                            <div class="ll-ptr"><small>right</small>{{ fmt(childAddr(n.right)) }}</div>
                          </div>
                        </div>

                        <!-- Address label placed OUTSIDE container box at bottom center -->
                        <div class="ll-addr-outside">@{{ n.addr }}</div>
                      </div>
                    </foreignObject>
                  </svg>
                </div>
              </div>
              <div class="ll-vresizer" ref="vizResizerRef"></div>

              <!-- LEGEND -->
              <div class="ll-legend">
                <span class="ll-leg"><span class="ll-legdot ll-legdot-existing"></span>existing node</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-new"></span>new node</span>
                <span class="ll-leg"><span class="ll-legdot ll-legdot-cur"></span>curr (walking)</span>
              </div>

              <!-- VAR FRAMES -->
              <div class="ll-table-area" :style="{ height: tableHeight + 'px' }">
                <div class="ll-table-title">Variable frames — innermost = current</div>
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
                        <span class="ll-fname">{{ r[0] }}</span>=<span
                          :class="r[2] ? 'll-c-blue' : (depth === s.vars.length - 1 ? 'll-c-orange' : 'll-c-green')"
                          style="font-weight:700"
                        >{{ r[1] }}</span>
                      </span>)<span v-if="depth === s.vars.length - 1" class="ll-now"> ◄ current</span>
                    </div>
                  </template>
                  <template v-else>—</template>
                </div>
              </div>
              <div class="ll-vresizer" ref="tableResizerRef"></div>

              <!-- BADGE -->
              <div class="ll-badge-wrap">
                <div class="ll-badge">{{ s.badge }}</div>
              </div>
            </div>

            <div class="ll-resizer" ref="hResizerRef"></div>

            <!-- CODE PANEL -->
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

                <!-- Code tab -->
                <div v-if="rightTab === 'code'" class="ll-code-scroll">
                  <pre class="ll-pre"><span
                    v-for="(line, i) in codeLines"
                    :key="i"
                    class="ll-codeline"
                    :class="{ 'll-hl': line[0] && line[0] === s.code }"
                  >{{ line[1] === '' ? ' ' : line[1] }}
</span></pre>
                </div>

                <!-- Pseudocode tab -->
                <div v-else-if="rightTab === 'pseudo'" class="ll-code-scroll">
                  <pre class="ll-pre"><span
                    v-for="(line, i) in PSEUDOCODE"
                    :key="i"
                    class="ll-codeline"
                  >{{ line === '' ? ' ' : line }}
</span></pre>
                </div>

                <!-- Complexity tab -->
                <div v-else class="ll-info-scroll">
                  <h3>Time &amp; Space Complexity — BST Insertion</h3>
                  <table class="ll-complexity-table">
                    <thead><tr><th>Case</th><th>Time</th><th>Why</th></tr></thead>
                    <tbody>
                      <tr><td>Best Case</td><td>O(log n)</td><td>Tree is perfectly balanced — each comparison halves the remaining subtree.</td></tr>
                      <tr><td>Average Case</td><td>O(log n)</td><td>Random insertions produce a roughly balanced tree with height ≈ log₂ n.</td></tr>
                      <tr><td>Worst Case</td><td>O(n)</td><td>Sorted or reverse-sorted input produces a skewed (degenerate) tree — effectively a linked list.</td></tr>
                      <tr><td>Space</td><td>O(1)</td><td>Iterative traversal with <code>curr</code> pointer — no extra stack needed.</td></tr>
                    </tbody>
                  </table>
                  <p class="ll-note">
                    Key observation: BST insertion time depends on tree height h. In the worst case h = n (skewed tree), but for balanced trees h ≈ log₂ n, giving O(log n) average performance.
                  </p>
                  <h3>Node Structure</h3>
                  <p>Each node stores: <code>data</code> (the value), <code>left</code> (pointer to left child), <code>right</code> (pointer to right child). Allocating a node costs O(1) time and O(1) space.</p>
                  <h3>BST Property</h3>
                  <p>For every node N: all values in its <b>left subtree &lt; N.data</b>, and all values in its <b>right subtree ≥ N.data</b>. This property is maintained by the insertion algorithm.</p>
                  <h3>Advantages</h3>
                  <p>Dynamic structure — grows during runtime. Search, insert, and delete all share the same O(log n) average complexity on balanced trees.</p>
                  <h3>Limitations</h3>
                  <p>No self-balancing: inserting sorted data degrades performance to O(n). Use AVL trees or Red-Black trees to guarantee O(log n) in all cases.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- FOOTER -->
          <div class="ll-footer">
            Step {{ si + 1 }} / {{ steps.length || 1 }}
            <span class="ll-speed-wrap">
              Speed
              <input type="range" min="100" max="2000" step="100" v-model.number="speed" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ll-root * {
  box-sizing: border-box;
}
.ll-root {
  --coral: #F04D4D;
  --coral-dark: #d93e3e;
  --coral-light: #fff0f0;
  --bg: #f5f6fa;
  --surface: #ffffff;
  --surface2: #f1f4f9;
  --border: #e2e8f0;
  --border2: #cbd5e1;
  --text: #1e293b;
  --text2: #475569;
  --muted: #94a3b8;
  --blue: #3b82f6;
  --blue-light: #eff6ff;
  --green: #22c55e;
  --green-light: #f0fdf4;
  --orange: #f97316;
  --orange-light: #fff7ed;
  --node: #1d4ed8;
  --nodeNew: #15803d;
  --nodeCur: #c2410c;
  --shadow-sm: 0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04);
  --radius: 8px;
  --radius-sm: 6px;

  background: var(--bg);
  color: var(--text);
  font-family: 'Segoe UI', system-ui, sans-serif;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  height: 50vh;
  min-height: 600px;
  overflow: hidden;
  width: 100%;
}

@keyframes ll-pop {
  from { transform: scale(.3); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.slide-wrapper {
  margin-top: -10px;
  margin-left: -30px;
  width: 107%;
  max-height: 100%;
  font-size: 0.8rem;
  font-weight: 400;
}
.slide-body {
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  height: 100%;
}

.navbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  padding: 0 10px;
  background-color: #ffffff;
  position: fixed;
  width: 94.7%;
  z-index: 10;
}

.navbar > img {
  height: 30px;
}

.navbar-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  background-color: #ef5050;
  color: #ffffff;
  width: 80%;
  padding-left: 10px;
  margin-left: -10px;
  border-radius: 5px;
}
.row-main {
  width: 100%;
  height: 90%;
  margin-top: 37px;
  overflow-x: auto;
  overflow-y: auto;
  scrollbar-width: thin;
}

/* TOOLBAR */
.ll-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 16px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  flex-wrap: wrap;
  box-shadow: var(--shadow-sm);
}
.ll-toolbar label {
  font-size: 11px;
  color: var(--muted);
  white-space: nowrap;
  font-weight: 500;
}
.ll-text-input {
  background: var(--surface);
  border: 1px solid var(--border2);
  color: var(--text);
  border-radius: var(--radius-sm);
  padding: 5px 10px;
  font-size: 13px;
  font-family: monospace;
  transition: border-color .15s;
  width: 240px;
}
.ll-text-input:focus {
  outline: none;
  border-color: var(--coral);
  box-shadow: 0 0 0 3px rgba(240,77,77,.1);
}
.ll-viz-btn {
  background: var(--coral);
  color: #fff;
  border: none;
  padding: 6px 16px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  box-shadow: var(--shadow-sm);
  transition: filter .15s;
}
.ll-viz-btn:hover { filter: brightness(1.08); }

.ll-nav-controls {
  display: flex;
  margin-left: auto;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}
.ll-nav-btn {
  background: var(--surface2);
  border: 1px solid var(--border2);
  color: var(--text2);
  padding: 5px 11px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all .15s;
  white-space: nowrap;
}
.ll-nav-btn:hover {
  background: var(--surface);
  border-color: var(--coral);
  color: var(--coral);
}
.ll-play-btn {
  background: var(--blue-light);
  border: 1px solid var(--blue);
  color: var(--blue);
  min-width: 72px;
  font-weight: 600;
  padding: 5px 11px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 12px;
  transition: all .15s;
}
.ll-play-btn:hover {
  background: var(--blue);
  color: #fff;
}

/* MAIN LAYOUT */
.ll-main {
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
}
.ll-left-col {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 200px;
  max-width: 72%;
}
.ll-resizer {
  width: 5px;
  cursor: col-resize;
  background: var(--border);
  flex-shrink: 0;
  transition: background .15s;
  position: relative;
  z-index: 20;
}
.ll-resizer:hover,
.ll-resizer.drag {
  background: var(--coral);
}
.ll-right-col {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  min-width: 200px;
  min-height: 0;
}

/* VIZ AREA */
.ll-viz-wrap {
  flex-shrink: 0;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}
.ll-perm-area {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
}
.ll-ptrs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding: 10px 16px 4px;
  min-height: 36px;
}
.ll-ptr-chip {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 3px 10px;
  font-size: 12px;
  font-family: monospace;
  box-shadow: var(--shadow-sm);
}
.ll-c-blue { color: var(--blue); }
.ll-c-orange { color: var(--orange); }
.ll-c-green { color: var(--green); }

.ll-svg {
  display: block;
  flex: 1;
  min-height: 0;
}

/* Parent-Child Connector Lines (Light Gray Clean Lines) */
.bt-edge-line {
  stroke: #cbd5e1;
  stroke-width: 2px;
}

.bt-staging-divider {
  stroke: #cbd5e100;
  stroke-dasharray: 5 4;
  stroke-width: 1.5px;
  opacity: .6;
}
.bt-staging-label {
  font-size: 11px;
  fill: var(--muted);
  font-family: system-ui, sans-serif;
}

/* HeapSort Style Pointer Labels and Downward Arrows */
.heap-ptr-txt {
  font-size: 13px;
  font-weight: 800;
  font-family: 'Consolas', 'Fira Code', monospace;
}
.heap-ptr-arrow {
  font-size: 14px;
  font-weight: 900;
  font-family: system-ui, sans-serif;
}

/* NODE WRAPPER & 3-SECTION CONTAINER BOX */
.ll-node-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}
.ll-box {
  display: flex;
  flex-direction: column;
  border: 2px solid var(--blue);
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--node);
  width: 100%;
  height: 44px;
  color: #fff;
  animation: ll-pop .3s ease;
  box-shadow: var(--shadow-sm);
  transition: background .3s, border-color .3s;
}
.bt-box-new {
  border-color: #22c55e !important;
  background: var(--nodeNew) !important;
  box-shadow: 0 0 0 3px rgba(34,197,94,.3) !important;
}
.bt-box-cur {
  border-color: var(--orange) !important;
  background: var(--nodeCur) !important;
  box-shadow: 0 0 0 3px rgba(249,115,22,.25) !important;
}

.ll-node-top {
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
}
.ll-data {
  padding: 4px 4px;
  font-weight: 700;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}
.ll-ptr {
  padding: 2px 4px;
  background: rgba(0,0,0,.2);
  font-size: 10px;
  color: rgba(255,255,255,.85);
  border-left: 1px solid rgba(255,255,255,.15);
  font-family: 'Consolas', monospace;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.1;
  flex: 1;
}
.ll-ptr-prev {
  border-left: none;
  border-right: 1px solid rgba(255,255,255,.15);
}
.ll-ptr small {
  color: rgba(255,255,255,.5);
  font-size: 9px;
}

/* OUTSIDE MEMORY ADDRESS (Dark Gray, Bottom Center) */
.ll-addr-outside {
  font-size: 11px;
  font-weight: 600;
  font-family: 'Consolas', 'Fira Code', monospace;
  color: #475569;
  margin-top: 3px;
  text-align: center;
  line-height: 1;
  white-space: nowrap;
}

/* RESIZERS */
.ll-vresizer {
  height: 5px;
  cursor: row-resize;
  background: var(--border);
  flex-shrink: 0;
  transition: background .15s;
  position: relative;
  z-index: 20;
}
.ll-vresizer:hover,
.ll-vresizer.drag {
  background: var(--coral);
}

/* LEGEND */
.ll-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 14px;
  padding: 6px 12px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  background: var(--surface2);
}
.ll-leg {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: var(--text2);
}
.ll-legdot {
  width: 11px;
  height: 11px;
  border-radius: 3px;
  flex-shrink: 0;
  display: inline-block;
}
.ll-legdot-existing {
  background: var(--node);
  border: 1.5px solid var(--blue);
}
.ll-legdot-new {
  background: var(--nodeNew);
  border: 1.5px solid var(--green);
}
.ll-legdot-cur {
  background: var(--nodeCur);
  border: 1.5px solid var(--orange);
}

/* VAR FRAMES */
.ll-table-area {
  flex-shrink: 0;
  padding: 8px 14px;
  border-bottom: 1px solid var(--border);
  overflow: auto;
  background: var(--surface);
}
.ll-table-title {
  font-size: 10px;
  color: var(--muted);
  margin-bottom: 4px;
  font-style: italic;
}
.ll-stack-line {
  font-family: 'Consolas', monospace;
  font-size: 12px;
  line-height: 1.8;
}
.ll-frame {
  font-family: 'Consolas', monospace;
  font-size: 11.5px;
  color: var(--text2);
  padding: 1px 0;
  white-space: nowrap;
}
.ll-frame-cur {
  color: var(--orange);
  background: var(--orange-light);
  border-radius: 4px;
  padding: 1px 5px;
}
.ll-fname { color: var(--text2); }
.ll-now {
  color: var(--orange);
  font-size: 10px;
  margin-left: 6px;
}

/* BADGE */
.ll-badge-wrap {
  padding: 6px 10px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  min-height: 36px;
  display: flex;
  align-items: center;
  background: var(--surface);
}
.ll-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: var(--radius-sm);
  border-left: 3px solid var(--coral);
  background: var(--coral-light);
  font-size: 11px;
  color: var(--coral-dark);
  line-height: 1.4;
  word-break: break-word;
  font-weight: 500;
}

/* CODE PANEL */
.ll-code-panel {
  display: flex;
  flex-direction: column;
  height: 75%;
  overflow: hidden;
}
.ll-code-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  box-shadow: var(--shadow-sm);
  flex-wrap: wrap;
}
.ll-lang-select {
  background: var(--surface2);
  border: 1px solid var(--border2);
  color: var(--text);
  padding: 5px 28px 5px 10px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  min-width: 110px;
  margin-left: auto;
  transition: border-color .15s;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2394a3b8'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
}
.ll-lang-select:focus {
  outline: none;
  border-color: var(--coral);
  box-shadow: 0 0 0 3px rgba(240,77,77,.1);
}
.ll-code-scroll {
  flex: 1;
  overflow: auto;
  min-height: 0;
  padding: 14px 16px;
  background: #f8fafc;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}
.ll-pre {
  font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
  font-size: 12px;
  line-height: 1.65;
  white-space: pre;
  color: var(--text);
  margin: 0;
}
.ll-codeline {
  display: block;
  margin: 0 -16px;
  padding: 0 16px;
}
.ll-hl {
  background: #dcfce7;
  color: #15803d;
  border-radius: 3px;
  border-left: 2px solid var(--green);
}

/* FOOTER */
.ll-footer {
  padding: 4px 16px;
  font-size: 11px;
  color: var(--muted);
  border-top: 1px solid var(--border);
  background: var(--surface);
  flex-shrink: 0;
  display: flex;
  align-items: center;
}
.ll-speed-wrap {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: 16px;
}
.ll-speed-wrap input[type=range] {
  width: 90px;
  accent-color: var(--coral);
}

/* TAB BAR */
.ll-tabbar {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}
.ll-tab-btn {
  background: var(--surface2);
  border: 1px solid var(--border2);
  color: var(--text2);
  padding: 5px 11px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 11px;
  font-weight: 600;
  transition: all .15s;
  white-space: nowrap;
}
.ll-tab-btn:hover {
  border-color: var(--coral);
  color: var(--coral);
}
.ll-tab-btn.active {
  background: var(--coral);
  border-color: var(--coral);
  color: #fff;
}

/* INFO SCROLL (Pseudocode / Complexity) */
.ll-info-scroll {
  flex: 1;
  overflow: auto;
  min-height: 0;
  padding: 16px 20px;
  background: var(--surface);
  color: var(--text2);
  font-size: 13px;
  line-height: 1.6;
}
.ll-info-scroll h3 {
  margin: 0 0 10px;
  color: var(--text);
  font-size: 14px;
  font-weight: 700;
}
.ll-info-scroll h3:not(:first-child) {
  margin-top: 18px;
}
.ll-info-scroll p {
  margin: 0 0 10px;
}
.ll-info-scroll b {
  color: var(--text);
}
.ll-info-scroll code {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 1px 5px;
  font-family: 'Consolas', monospace;
  font-size: 12px;
  color: var(--coral-dark);
}

/* COMPLEXITY TABLE */
.ll-complexity-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 14px;
  font-size: 12.5px;
}
.ll-complexity-table th,
.ll-complexity-table td {
  border: 1px solid var(--border);
  padding: 8px 10px;
  text-align: left;
}
.ll-complexity-table th {
  background: var(--surface2);
  color: var(--text);
  font-weight: 700;
}
.ll-complexity-table td:nth-child(2) {
  font-family: 'Consolas', monospace;
  font-weight: 700;
  color: var(--coral-dark);
  white-space: nowrap;
}

/* NOTE */
.ll-note {
  background: var(--orange-light);
  border-left: 3px solid var(--orange);
  border-radius: var(--radius-sm);
  padding: 8px 12px;
  font-size: 12.5px;
  color: var(--text2);
  margin-bottom: 10px;
}
</style>