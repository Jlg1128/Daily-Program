

function mergeSort(arr = []) {
  if (arr.length <= 1) {
    return arr;
  }
  let len = arr.length;
  let mid = Math.floor(len / 2);
  let left = arr.slice(0, mid);
  let right = arr.slice(mid);
  return merge(mergeSort(left), mergeSort(right))
}

function merge(left = [], right = []) {
  let res = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      res.push(left[i])
      i++;
    } else {
      res.push(right[j])
      j++;
    }
  }
  while (i < left.length) {
    res.push(left[i]);
    i++;
  }
  while (j < right.length) {
    res.push(right[j])
    j++;
  }
  return res;
}


let arr = [2, 5, 3, 8, 7, 1];

console.log(mergeSort(arr));