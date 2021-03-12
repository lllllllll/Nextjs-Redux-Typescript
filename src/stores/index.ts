import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

let store: any;

function initStore(initialState: any) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  )
}

export const initializeStore = (preloadedState: any) => {
  let _store = store ?? initStore(preloadedState)

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    store = undefined
  }

  if (typeof window === 'undefined') return _store
  if (!store) store = _store

  return _store
}

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}