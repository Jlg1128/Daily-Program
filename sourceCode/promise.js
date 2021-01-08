const PENDING = 'pending';
const FULLFILLED = 'fullfilled';
const REJECTED = 'reject';


class MyPromise {
  state = PENDING;
  value = '';
  reason = '';
  onResolvedCallback = [];
  onRejectedCallback = [];
  constructor(executor) {
    let onFullfilled = value => {
      if (this.state === PENDING) {
        this.value = value;
        this.state = FULLFILLED;
        this.onResolvedCallback.forEach((fn) => fn(this.value))
      }
    }
    let onRejected = reason => {
      if (this.state === PENDING) {
        this.reason = reason;
        this.state = REJECTED;
        this.onResolvedCallback.forEach((fn) => fn(this.reason))
      }
    }
    try {
      executor(onFullfilled, onRejected);
    } catch (error) {
      onRejected(error)
    }
  }
  then(onResolved, onRejected) {
    if (this.state === PENDING ) {
      this.onResolvedCallback.push(() => onResolved(this.value))
      this.onRejectedCallback.push(() => onRejected(this.reason))
    }
    if (this.state === FULLFILLED) {
      onResolved(this.value)
    }
    if (onRejected) {
      if (this.state === REJECTED) {
        onRejected && onRejected(this.value)
      }
    }
  }
}

function getData() {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(10)
    }, 2000);
  })
    .then(res => {
      console.log(res);
    })
}
getData()