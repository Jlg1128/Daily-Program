function buble(arr = []) {
  for (let i = 0; i < arr.length; i ++ ){
    for (let j = 0; j < arr.length - i - 1; j ++){
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
    }
    }
  }
  return arr;
}

let arr = [2,5,3,8,7,1];

console.log(buble(arr));