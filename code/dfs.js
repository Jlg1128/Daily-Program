
let arr = [-1, 0, 3, 5, 9, 12];

let target = 9;

function sort(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let midIndex =  Math.floor((right - left) / 2);
    let mid = arr[midIndex];
    if (mid === target) {
      return midIndex;
    }
    if (mid < target) {
      left = mid;
      continue;
    }
    if (mid > target) {
      right = mid
      continue;
    }
  }
  return -1;
}

console.log(sort(arr, -1));