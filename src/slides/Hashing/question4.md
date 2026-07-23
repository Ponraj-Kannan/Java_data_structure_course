<script setup>
const contents = [
  { text: '<b>Problem Statement</b> — Given a sentence, count how many times each word appears in it.' },
  { text: '<b>Input Format</b> — A single line containing a sentence of space-separated, lowercase words.' },
  { text: '<b>Output Format</b> — Print each distinct word along with its frequency, one per line, in the order the word first appears.' },
  { text: '<b>Constraints</b> — 1 ≤ number of words ≤ 1000. Each word contains only lowercase letters.' },
  { text: '<b>Sample Input</b> — <code>java is fun and java is powerful</code>' },
  { text: '<b>Sample Output</b> — <code>java: 2</code><br><code>is: 2</code><br><code>fun: 1</code><br><code>and: 1</code><br><code>powerful: 1</code>' },
  { text: '<b>Explanation</b> — Split the sentence into individual words. For each word, use it as a key in a HashMap and increase its count by 1 every time it is encountered — the same idea as counting character frequency, but applied at the word level.' }
]
</script>

<Slide
  topic="Java Hashing"
  sub-topic="Coding Problem 4 — Easy"
  :contents="contents"
/>
