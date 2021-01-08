function Iter(arr) {
  let idx = 0;
  return {
    next: function () {
      console.log(idx);
      return {
        value: arr[idx++],
        down: arr.length === idx ? true : false
      }
    }
  }
}

let arr = [1, 2, 3];

let it = Iter(arr);
let i = it.next();
while (!i.down) {
  console.log(i);
  i = it.next();
}