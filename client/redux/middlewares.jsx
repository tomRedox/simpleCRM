// middleware allows you to do something in between the dispatch
// and handing it off to the reducer

// console.log our state changes
logger = store => next => action => {
  log('[Dispatching]', action);
  // essentially call 'dispatch'
  let result = next(action);
  log('[Store]', store.getState());
  return result;
};

function log() {
  if (__debug_redux) {
    console.log.apply(console, arguments);
  }
}
__debug_redux = true;
