function _asyncToGenerator(fn) {
  let gen = fn();
  return function () {
    return new Promise((resolve, reject) => {
      function next(value) {
        step(gen, resolve, reject, 'next', next, value)
      }
      next(undefined)
    })
  }
}

function step(_gen, resolve, reject, key, _next, value) {
  try {
    let ret = _gen[key](value);
    if (ret.done) {
      resolve(ret.value)
    } else {
      Promise.resolve(ret.value).then(_next)
    }
  } catch (error) {
    reject(error);
  }
}

const asyncFunc = _asyncToGenerator(function* () {
  console.log(1);
  yield new Promise(resolve => {
    setTimeout(() => {
      resolve();
      console.log('sleep 1s');
    }, 1000);
  });
  console.log(2);
  const a = yield Promise.resolve('a');
  console.log(3);
  const b = yield Promise.resolve('b');
  const c = yield Promise.resolve('c');
  return [a, b, c];
})

asyncFunc().then(res => {
  console.log(res)
});