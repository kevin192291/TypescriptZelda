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
  switch (action.type) {
    case SETUP_STATE:
      return {
        ...state,
        ...action.payload
      };
    case CHANGE_PLACE:
      const newState = Object.assign({}, state, {
        previousPlace: state.currentPlace,
        currentPlace: state.places.find(p => p.name === action.payload),
        places: state.places
      });
      debugger;
      return newState;
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
