let initialState = {
  count: 1
}

function countReducer(state = initialState, action) {
  switch (action.type) {
    case 'increment':
      state.count++;
      return state;
    case 'decrement':
      state.count--;
      return state.count;
    default:
      return state;
  }
}

let reducer = {
  counter: countReducer,
}
const redux = {
  reducer: null,
  middleWares: [],
  store: {
    _state: {},
    dispatch: function (action) {
      let { type } = action;
      let matchArr = type.split('/');
      let stateNamespace, reducerName;
      if (matchArr.length > 1) {
        stateNamespace = matchArr[0];
        reducerName = matchArr[1];
      } else {
        reducerName = matchArr[0];
      }
      let self = this;
      if (type === '@@INIT') {
        Object.keys(redux.reducer).forEach((key) => {
          let reducer = redux.reducer[key];
          self[key] = reducer(undefined, { type });
        });
        return;
      }
      let reducer = redux.reducer[stateNamespace];
      action.type = reducerName;
      let state = reducer(this._state[stateNamespace], action);
      this._state[stateNamespace] = state;
      return action;
    },
    getState() {
      return this._state;
    },
  },
}

function logger(store) {
  return (next) => (action) => {
    console.log('logger1');
    let result = next(action);
    console.log('logger2');
    return result;
  }
}

function crashReport(store) {
  return (next) => (action) => {
    console.log('crashReport1');
    let result = next(action);
    console.log('crashReport2');
    return result;
  }
}

function configureStore({ reducer, middleWares }) {
  redux.reducer = reducer;
  redux.middleWares = middleWares.slice().reverse();
  let next = redux.store.dispatch.bind(redux.store);
  redux.middleWares.forEach((middleWare) => {
    next = middleWare(redux.store)(next);
  })
  redux.store.dispatch = next;
}

configureStore({ reducer, middleWares: [logger, crashReport] });


let store = redux.store;
// store.dispatch({ type: '@@INIT' });
store.dispatch({ type: 'counter/increment' });
// store.dispatch({type: 'counter/increment'});

console.log(store.getState());