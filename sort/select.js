function selectSort(arr = []) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        let temp = arr[minIndex];
        arr[minIndex] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}


let arr = [2,5,3,8,7,1];
console.log(selectSort(arr));