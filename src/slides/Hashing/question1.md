<script setup>
const contents = [
  { text: '<b>Problem Statement</b> — Given a string, count how many times each character appears in it and print the frequency of every distinct character.' },
  { text: '<b>Input Format</b> — A single line containing a string made up of lowercase alphabets.' },
  { text: '<b>Output Format</b> — Print each distinct character along with its frequency, one per line, in the order the character first appears in the string.' },
  { text: '<b>Constraints</b> — 1 ≤ length of string ≤ 1000. The string contains only lowercase English letters (a-z).' },
  { text: '<b>Sample Input</b> — <code>hashing</code>' },
  { text: '<b>Sample Output</b> — <code>h: 2</code><br><code>a: 1</code><br><code>s: 1</code><br><code>i: 1</code><br><code>n: 1</code><br><code>g: 1</code>' },
  { text: '<b>Explanation</b> — Traverse the string character by character. Use each character as a key in a HashMap and increment its value by 1 every time it appears. If the character is being seen for the first time, insert it with a starting count of 1.' }
]
</script>

<Slide
  topic="Hashing"
  sub-topic="Coding Problem 1"
  :contents="contents"
/>
