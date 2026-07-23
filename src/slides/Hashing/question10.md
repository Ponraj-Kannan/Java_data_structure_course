<script setup>
const contents = [
  { text: '<b>Problem Statement</b> — Given a list of words, group the words that are anagrams of each other together.' },
  { text: '<b>Input Format</b> — First line contains an integer N, the number of words. Second line contains N space-separated words.' },
  { text: '<b>Output Format</b> — Print each anagram group on its own line, with words separated by a space, in the order the groups first appear.' },
  { text: '<b>Constraints</b> — 1 ≤ N ≤ 1000. Each word contains only lowercase letters.' },
  { text: '<b>Sample Input</b> — <code>6</code><br><code>eat tea tan ate nat bat</code>' },
  { text: '<b>Sample Output</b> — <code>eat tea ate</code><br><code>tan nat</code><br><code>bat</code>' },
  { text: '<b>Explanation</b> — For each word, sort its characters to form a signature — anagrams always share the same signature. Use this signature as a key in a HashMap, where the value is a list of original words. Words that map to the same signature belong to the same group.' }
]
</script>

<Slide
  topic="Hashing"
  sub-topic="Coding Problem 10"
  :contents="contents"
/>
