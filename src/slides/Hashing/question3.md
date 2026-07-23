<script setup>
const contents = [
  { text: '<b>Problem Statement</b> — Given a string, find the first character that does not repeat anywhere else in the string.' },
  { text: '<b>Input Format</b> — A single line containing a string made up of lowercase alphabets.' },
  { text: '<b>Output Format</b> — Print the first non-repeating character. If no such character exists, print <code>-1</code>.' },
  { text: '<b>Constraints</b> — 1 ≤ length of string ≤ 1000. The string contains only lowercase English letters (a-z).' },
  { text: '<b>Sample Input</b> — <code>hashing</code>' },
  { text: '<b>Sample Output</b> — <code>a</code>' },
  { text: '<b>Explanation</b> — First pass through the string and build a HashMap storing the frequency of every character. Then pass through the string a second time, in order, and return the first character whose frequency is exactly 1.' }
]
</script>

<Slide
  topic="Java Hashing"
  sub-topic="Coding Problem 3 — Easy"
  :contents="contents"
/>
