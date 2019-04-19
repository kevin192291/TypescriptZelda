export const SETUP_STATE = 'GAME:SETUP_STATE';
export const CHANGE_PLACE = 'GAME:CHANGE_PLACE';

export interface WarpZone {
  tile_x: number;
  tile_y: number;
  actor: ex.Actor;
}

export interface Place {
  scene: ex.Scene;
  name: string;
  warpZones: WarpZone[];
  posAtEnter?: ex.Vector;
  posAtExit?: ex.Vector;
  placeData?: any;
}

export interface GameState {
  currentPlace: Place; //current place you are at NOW
  places: Place[]; // All places loaded at start of game
}

interface SetupAction {
  type: typeof SETUP_STATE;
  payload: GameState
}

interface ChangePlaceAction {
  type: typeof CHANGE_PLACE;
  payload: string
}

export type GameActionTypes = SetupAction | ChangePlaceAction // | DeleteMessageAction