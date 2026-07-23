<script setup>
const contents = [
  { text: '<b>Problem Statement</b> — Given an array of integers and a target value, find the indices of the two numbers that add up to the target. Assume exactly one valid pair exists.' },
  { text: '<b>Input Format</b> — First line contains an integer N, the size of the array. Second line contains N space-separated integers. Third line contains the target integer.' },
  { text: '<b>Output Format</b> — Print the two indices (0-based), separated by a space, whose values add up to the target.' },
  { text: '<b>Constraints</b> — 2 ≤ N ≤ 1000. -100000 ≤ array element, target ≤ 100000.' },
  { text: '<b>Sample Input</b> — <code>4</code><br><code>2 7 11 15</code><br><code>9</code>' },
  { text: '<b>Sample Output</b> — <code>0 1</code>' },
  { text: '<b>Explanation</b> — Traverse the array once. For each element, calculate its complement (target minus the current element) and check whether that complement already exists in a HashMap. If it does, the current index and the stored index of the complement form the answer; otherwise, store the current element and its index and continue.' }
]
</script>

<Slide
  topic="Java Hashing"
  sub-topic="Coding Problem 6 — Medium"
  :contents="contents"
/>
