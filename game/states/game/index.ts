import { createStore, applyMiddleware, compose } from 'redux'
import gameReducer from './game.reducers';

const configureStore = preloadedState => {
  const store = createStore(
    gameReducer,
    preloadedState,
  )

  return store
}

export default configureStore;