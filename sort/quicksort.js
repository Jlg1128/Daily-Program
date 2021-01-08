
function quickSort(arr = []) {
  if (arr.length <= 1) {
    return arr;
  }
  let midIndex = Math.floor(arr.length / 2);
  let midItem = arr.splice(midIndex, 1)[0];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i ++) {
    if (midItem > arr[i]) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(midItem, right)
}

let arr = [2,5,3,8,7,1, 0];

console.log(quickSort(arr)); 