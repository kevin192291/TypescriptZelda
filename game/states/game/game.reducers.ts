import {
    GameState,
    GameActionTypes,
    SETUP_STATE,
  } from './game.types';
  
  const initialState: GameState = {
    place: null
  }
  
  export function gameReducer(
    state = initialState,
    action: GameActionTypes
  ): GameState {
    switch (action.type) {
      case SETUP_STATE:
        return {
            ...state,
            ...action.payload
          }
      default:
        return state
    }
  }

  export default gameReducer;