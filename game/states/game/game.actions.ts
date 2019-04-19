import {
  GameState,
  SETUP_STATE,
  GameActionTypes,
  Place,
  CHANGE_PLACE
} from './game.types';

// TypeScript infers that this function is returning SendMessageAction
export function setupState(newMessage: GameState): GameActionTypes {
  return {
    type: SETUP_STATE,
    payload: newMessage
  };
}

export function changePlace(state, action): GameActionTypes {
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



