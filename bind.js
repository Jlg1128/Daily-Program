Function.prototype.MyBind = function (content) {
  let self = this;
  let originArgs = [...arguments].slice(1);
  console.log('originArgs', originArgs);
  let targetReal = function () { };
  function targetFake() {
    let selfArgs = [...arguments]
    console.log('selfArgs', selfArgs);
    return self.call(this instanceof targetReal ? this : content, ...[...selfArgs, ...originArgs])
  }
  targetReal.prototype = this.prototype;
  targetFake.prototype = new targetReal();
  return targetFake
}

function test(age) {
  console.log(this.age);
  console.log(age);
}
let obj = {
  age: 14
}
let age = 13

let res = test.MyBind(obj, age)
res(10)