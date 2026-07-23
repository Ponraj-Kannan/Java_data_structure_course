<script setup>
const contents = [
  { text: '<b>Problem Statement</b> — Given two strings, determine whether the second string is an anagram of the first — that is, whether it uses exactly the same characters with the same frequencies, just possibly rearranged.' },
  { text: '<b>Input Format</b> — First line contains the first string. Second line contains the second string.' },
  { text: '<b>Output Format</b> — Print <code>true</code> if the second string is an anagram of the first, otherwise print <code>false</code>.' },
  { text: '<b>Constraints</b> — 1 ≤ length of each string ≤ 1000. Both strings contain only lowercase letters.' },
  { text: '<b>Sample Input</b> — <code>listen</code><br><code>silent</code>' },
  { text: '<b>Sample Output</b> — <code>true</code>' },
  { text: '<b>Explanation</b> — Build a HashMap of character frequencies for the first string using put() and get(). Then traverse the second string and decrease the count for each character in the same map. If every count ends at exactly zero, the two strings are anagrams.' }
]
</script>

<Slide
  topic="Hashing"
  sub-topic="Coding Problem 7"
  :contents="contents"
/>
