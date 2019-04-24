import {
  GameState,
  GameActionTypes
} from './game.types';

export function changePlace(state, action): GameActionTypes {
  console.log('change page action called');
  return {
    ...state,
    state
  };
}

export function lastPlace(state): GameActionTypes {
  return {
    ...state,
    state
  };
}



