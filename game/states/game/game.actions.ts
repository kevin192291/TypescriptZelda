import { GameState, SETUP_STATE, GameActionTypes, Place, CHANGE_PLACE } from './game.types'

// TypeScript infers that this function is returning SendMessageAction
export function setupState(newMessage: GameState): GameActionTypes {
  return {
    type: SETUP_STATE,
    payload: newMessage
  }
}

export function changePlace(state, action): GameActionTypes {
    debugger;

    const nestedState = state.currentPlace = state.places.find(place => place.name === action);
    return {
        ...state,
        nestedState
      }
  }

// TypeScript infers that this function is returning DeleteMessageAction
// export function deleteMessage(timestamp: number): GameActionTypes {
//   return {
//     type: DELETE_MESSAGE,
//     meta: {
//       timestamp
//     }
//   }
// }