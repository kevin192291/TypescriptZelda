import {
  GameState,
  GameActionTypes,
  SETUP_STATE,
  CHANGE_PLACE,
  LAST_PLACE
} from './game.types';

const initialState: GameState = {
  places: [],
  currentPlace: undefined,
  previousPlace: null
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
    debugger;
      return Object.assign({}, state, {
        previousPlace: state.currentPlace,
        currentPlace: state.places.find(p => p.name === action.payload),
        places: state.places
      });
    case LAST_PLACE:
      return Object.assign({}, state, {
        currentPlace: state.previousPlace,
        places: state.places
      });
    default:
      return state;
  }
}

export default gameReducer;
