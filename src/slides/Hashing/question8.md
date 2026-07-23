<script setup>
const contents = [
  { text: '<b>Problem Statement</b> — Given two arrays of integers, find all the distinct elements that appear in both arrays.' },
  { text: '<b>Input Format</b> — First line contains an integer N, size of the first array. Second line contains N integers. Third line contains an integer M, size of the second array. Fourth line contains M integers.' },
  { text: '<b>Output Format</b> — Print the common elements, separated by a space, in the order they first appear in the first array.' },
  { text: '<b>Constraints</b> — 1 ≤ N, M ≤ 1000.' },
  { text: '<b>Sample Input</b> — <code>4</code><br><code>1 2 2 3</code><br><code>3</code><br><code>2 3 4</code>' },
  { text: '<b>Sample Output</b> — <code>2 3</code>' },
  { text: '<b>Explanation</b> — Insert every element of the first array into a HashSet. Then traverse the second array and check whether each element exists in that set — if it does, it is a common element. A second HashSet can be used to avoid printing the same common element more than once.' }
]
</script>

<Slide
  topic="Hashing"
  sub-topic="Coding Problem 8"
  :contents="contents"
/>
