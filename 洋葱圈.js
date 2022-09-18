let app = {
  ctx: {
    name: '我是ctx'
  },
  middleWares: [],
  use: function (fn) {
    this.middleWares.push(fn);
  },
  get(path = '/getUserName', payload) {
    console.log('path', path);
  },
  start() {
    // this.middleWares = this.middleWares.slice().reverse();
    let ctx = this.ctx;
    let self = this;
    let dispatch = function() {
      
    };
    this.middleWares.forEach((middleWare, i) => {

    })

    function compose() {
      return (ctx, next) => {
        return dispatch(0);
        function dispatch(i = 0) {
          const fn = self.middleWares[i];
          if (!fn) return;
          return fn(ctx, dispatch.bind(null, i + 1));
        }
      }
    }
    this.fn = compose();
  },
  callback() {

  }
}


app.use((ctx, next) => {
  console.log('1');
  next();
  console.log('2');
})


app.use((ctx, next) => {
  console.log('3');
  next();
  console.log('4');
})

app.start();


app.fn(app.ctx)