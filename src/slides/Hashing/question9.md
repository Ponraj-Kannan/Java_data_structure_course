<script setup>
const contents = [
  { text: '<b>Problem Statement</b> — Given an array of integers, find the element that appears more than n/2 times, where n is the size of the array. It is guaranteed that such an element always exists.' },
  { text: '<b>Input Format</b> — First line contains an integer N. Second line contains N space-separated integers.' },
  { text: '<b>Output Format</b> — Print the majority element.' },
  { text: '<b>Constraints</b> — 1 ≤ N ≤ 1000.' },
  { text: '<b>Sample Input</b> — <code>7</code><br><code>3 3 4 2 3 3 3</code>' },
  { text: '<b>Sample Output</b> — <code>3</code>' },
  { text: '<b>Explanation</b> — Use a HashMap to count the frequency of every element while traversing the array once. After the map is built, scan through it and return the key whose stored count is greater than n divided by 2.' }
]
</script>

<Slide
  topic="Hashing"
  sub-topic="Coding Problem 9"
  :contents="contents"
/>
