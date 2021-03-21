import { createStore, combineReducers } from 'redux';
import gameReducer from './game.reducers';
import undoable from 'redux-undo';
const reduxModule = require('redux');
//require('electron-redux-devtools').install();

reduxModule.__DO_NOT_USE__ActionTypes.INIT = '@@redux/INIT';
reduxModule.__DO_NOT_USE__ActionTypes.REPLACE = '@@redux/REPLACE';

const configureStore = (preloadedState) => {
  const store = createStore(
    undoable(gameReducer),
    preloadedState,
    (<any>window).__REDUX_DEVTOOLS_EXTENSION__ && (<any>window).__REDUX_DEVTOOLS_EXTENSION__(),
  );
  return store;
};


export default configureStore;
