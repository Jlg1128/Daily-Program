
let buffer = new ArrayBuffer(64);
var init8 = new Int32Array(buffer);
init8.set([1, 2, 3, 10])
init8.set([5, 11, 18, 20])
console.log(init8)