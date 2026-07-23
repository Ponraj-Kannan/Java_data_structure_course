<script setup>
const contents = [
  { text: '<b>Problem Statement</b> — Given an array of integers, determine whether any value appears at least twice in the array.' },
  { text: '<b>Input Format</b> — First line contains an integer N, the size of the array. Second line contains N space-separated integers.' },
  { text: '<b>Output Format</b> — Print <code>true</code> if any duplicate exists, otherwise print <code>false</code>.' },
  { text: '<b>Constraints</b> — 1 ≤ N ≤ 1000. -100000 ≤ array element ≤ 100000.' },
  { text: '<b>Sample Input</b> — <code>5</code><br><code>1 2 3 1 5</code>' },
  { text: '<b>Sample Output</b> — <code>true</code>' },
  { text: '<b>Explanation</b> — Insert each element into a HashSet one at a time. Before inserting, check whether the element already exists in the set — if it does, a duplicate has been found. If the traversal finishes without finding a repeated element, the answer is false.' }
]
</script>

<Slide
  topic="Java Hashing"
  sub-topic="Coding Problem 2 — Easy"
  :contents="contents"
/>
