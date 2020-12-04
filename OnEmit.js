class OnEmit1 {
  callbacks = {};
  on(thing, callback) {
    if (this.callbacks[thing] && Array.isArray(this.callbacks[thing])) {
      this.callbacks[thing].push(callback);
    } else {
      this.callbacks[thing] = [callback];
    }
  }
  emit(...things) {
    [...things].map((thing) => {
      if (!this.callbacks[thing]) {
        console.log('改事件不存在')
      } else {
        this.callbacks[thing] && this.callbacks[thing].forEach(fn => {
          fn()
        });
      }
    })
  }
  removeListener(...things) {
    [...things].map((thing) => {
      if (!this.callbacks[thing]) {
        console.log('改事件不存在')
      } else {
        this.callbacks[thing] && delete this.callbacks[thing]
      }
    })
  }
  once(thing, callback) {
    this.on(thing, () => {
      if (this.callbacks[thing] && Array.isArray(this.callbacks[thing])) {
        this.callbacks[thing].push(callback, () => this.removeListener(thing));
      } else {
        this.callbacks[thing] = [callback, () => this.removeListener(thing)];
      }
    })
  }
}

const onEmit = new OnEmit1();
onEmit.once('show', () => console.log(1));
onEmit.emit('show')
onEmit.emit('show')