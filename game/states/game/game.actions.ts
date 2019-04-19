import { GameState, SETUP_STATE, GameActionTypes } from './game.types'

// TypeScript infers that this function is returning SendMessageAction
export function sendMessage(newMessage: GameState): GameActionTypes {
  return {
    type: SETUP_STATE,
    payload: newMessage
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