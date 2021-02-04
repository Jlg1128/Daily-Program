class MyPromise {
  state = 'pending'  // pending | onfufilled | onrejected
  value = ''
  reason = ''
  callbacks = [];
  constructor(exec) {
    let onResolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'onfufilled'
        this.value = value;
        setTimeout(() => {
          this.callbacks.forEach(cb => cb())
        }, 0);
      }
    }
    let onReject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'onrejected'
        this.reason = reason;
        setTimeout(() => {
          this.callbacks.forEach(cb => cb())
        }, 0);
      }
    }
    try {
      exec(onResolve, onReject);
    } catch (error) {
      onReject(error);
    }
  }

  then(onFullfilled) {
    return new MyPromise((resolve, reject) => {
      if (this.state === 'pending') {
        this.callbacks.push(() => this.handle(onFullfilled, resolve));
      }
      if (this.state === 'onfufilled') {
        resolve(this.value);
        this.handle(onFullfilled, resolve)
        this.callbacks.forEach(item => item())
      }
      // if (this.state === 'onrejected') {
      //   reject(this.value);
      //   this.callbacks.forEach(item => item())
      // }
    })
  }
  handle(onFullfilled, resolve) {
    let x = onFullfilled(this.value)
    if (x instanceof MyPromise) {
      x.then(resolve)
    } else if (typeof (x) === 'function') {
      resolve(x())
    } else {
      resolve(x)
    }
  }
  static resolve(num) {
    return new MyPromise(resolve => {
      resolve(num)
    });
  }
  static race() {
    let promises = [...arguments[0]]
    return new MyPromise(resolve => {
      promises.map(async promise => {
        resolve(await promise)
      })
    })
  }
}

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(123)
  }, 2000);
})
  .then((successCb, errorCb) => {
    console.log(successCb);
    return "嘻嘻"
  })
  .then(res => {
    console.log(res);
    return new MyPromise((resolve, reject) => {
      resolve('alskdjakldalksd')
    })
  })
  .then(res => {
    console.log(res);
  })

var show = function () {
  return MyPromise.resolve(1)
}

let promise1 = new MyPromise((resolve) => {
  setTimeout(() => {
    resolve('我是1000')
  }, 3000);
})

let promise2 = new MyPromise((resolve) => {
  setTimeout(() => {
    resolve('我是2000')
  }, 2000);
})

MyPromise.race([promise1, promise2])
  .then(res => {
    console.log(res);
  })