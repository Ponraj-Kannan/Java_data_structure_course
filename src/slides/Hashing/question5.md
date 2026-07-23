<script setup>
const contents = [
  { text: '<b>Problem Statement</b> — Given a list of student roll numbers and their marks, store them using key-value pairs and then answer a query asking for the marks of a specific roll number.' },
  { text: '<b>Input Format</b> — First line contains an integer N, the number of students. Each of the next N lines contains a roll number and marks separated by a space. The final line contains an integer Q, the roll number to query.' },
  { text: '<b>Output Format</b> — Print the marks of the queried roll number. If the roll number does not exist, print <code>Not Found</code>.' },
  { text: '<b>Constraints</b> — 1 ≤ N ≤ 1000. 1 ≤ roll number, marks ≤ 1000.' },
  { text: '<b>Sample Input</b> — <code>3</code><br><code>101 85</code><br><code>102 90</code><br><code>103 78</code><br><code>102</code>' },
  { text: '<b>Sample Output</b> — <code>90</code>' },
  { text: '<b>Explanation</b> — Insert each roll number as a key and its marks as the value into a HashMap using put(). To answer the query, simply look up the queried roll number using get() — this is a direct lookup instead of scanning every student record one by one.' }
]
</script>

<Slide
  topic="Java Hashing"
  sub-topic="Coding Problem 5 — Easy"
  :contents="contents"
/>
