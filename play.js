const arr = [1,1,1,1,1,1,1,1,1,1];
const userLength = 3
const productLength = 6
for (let i = 0, j = 0; arr.length; i++, j++) {
  arr.pop();
  if (i === userLength) { i = 0};
  if (j === productLength) { j = 0};
  console.log(i, " ", j);
}
