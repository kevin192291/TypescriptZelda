import { GameState, GameActionTypes, SETUP_STATE, Place, CHANGE_PLACE } from './game.types';

const initialState: GameState = {
  places: [],
  currentPlace: undefined
};

export function gameReducer(
  state = initialState,
  action: GameActionTypes
): GameState {
    debugger;
  switch (action.type) {
    case SETUP_STATE:
      return {
        ...state,
        ...action.payload
      };
    case CHANGE_PLACE:
    return Object.assign({}, state, { currentPlace: state.places.find(p => p.name === action.payload), places: state.places });
    //   return {
    //     ...state,
    //     ...action.payload
    //   };
    default:
      return state;
  }
}

export default gameReducer;
