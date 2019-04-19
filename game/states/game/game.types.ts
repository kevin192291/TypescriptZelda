// import * as ex from 'excalibur';

// export const GAME_PLACE_UPDATE = 'GAME_PLACE_UPDATE';


// interface WarpZone {
//   name: string;
//   ENTRY_POINT_X: number;
//   ENTRY_POINT_Y: number;
// }

// interface Place {
//   scene: ex.Scene;
//   lastPlace: Place;
//   sceneName: string;
//   entryPoint: ex.Vector;
//   warpZones: WarpZone[];
// }

// interface GameState {
//   currentPlace: Place;
//   paused: boolean;
// }

// export type GameActionTypes = GameState | Place | WarpZone;



export const SETUP_STATE = 'GAME:SETUP_STATE';

export interface WarpZone {
  tile_x: number;
  tile_y: number;
  tilePos: ex.Vector;
}

export interface Place {
  place: ex.Scene;
  name: string;
  warpZones: WarpZone[];
  posAtEnter: ex.Vector;
  posAtExit: ex.Vector;
}

export interface GameState {
  place: Place;
}

interface SetupAction {
  type: typeof SETUP_STATE;
  payload: GameState
}

export type GameActionTypes = SetupAction // | DeleteMessageAction