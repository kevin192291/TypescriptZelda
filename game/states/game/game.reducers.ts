import {
  GameState,
  GameActionTypes,
  CHANGE_PLACE,
} from './game.types';

const initialState: GameState = {
  currentPlace: 'overworld',
  previousPlace: null
};

export function gameReducer(
  state = initialState,
  action: GameActionTypes
): GameState {
  switch (action.type) {
    case CHANGE_PLACE:
      const newState = { ...state };
      newState.currentPlace = action.payload;
      newState.previousPlace = (state.currentPlace !== action.payload) ? state.currentPlace : null;
      return newState;
    break;
    default:
      return state;
  }
}

export default gameReducer;
