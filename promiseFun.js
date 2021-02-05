
const ONFULLFILLED = 'onfullfilled'
const ONREJECT = 'onreject'
const PENDING = 'pending'

function MyPromiseFun(executor) {
  this.state = PENDING;
  this.value = '';
  this.reason = '';
  this.sucessCallbaks = [];
  this.errorCallbacks = [];
  var self = this;

  this.onResolve = function (value) {
    if (self.state === PENDING) {
      self.state = ONFULLFILLED;
      self.value = value;
      self.sucessCallbaks.shift()(self.value)
    }
  }
  this.onReject = function (reason) {
    if (self.state === PENDING) {
      self.state = ONREJECT;
      self.reason = reason;
      self.errorCallbacks.shift()(self.reason)
    }
  }
  function handle(callback, resolve, val) {
    let callbackValue = callback(self.value)
    if (callbackValue instanceof MyPromiseFun) {
      callbackValue.then(resolve)
    } else {
      resolve(callbackValue)
    }
  }
  this.then = function (sucessCallbak, errorCallback) {
    return new Promise((resolve, reject) => {
      if (self.state === PENDING) {
        self.sucessCallbaks.push((value) => handle(sucessCallbak, resolve));
        self.errorCallbacks.push((reason) => handle(errorCallback, reject))
      }
      if (self.state === ONFULLFILLED) {
        sucessCallbak(self.value)
      }
    })
  }

  try {
    executor(this.onResolve, this.onReject);
  } catch (error) {
    this.onReject(error);
  }
}

let mypro = new MyPromiseFun((resolve, reject) => {
  setTimeout(() => {
    resolve('12312')
  }, 2000);
})
  .then(res => {
    console.log(res);
    return new MyPromiseFun((resolve, reject) => {
      resolve('123120')
    })
  })
  .then(res => {
    console.log(res);
    return new MyPromiseFun((resolve) => {
      setTimeout(() => {
        resolve("alsdjaklsd")
      }, 3000);
    })
  })
  .then(res => console.log(res))
