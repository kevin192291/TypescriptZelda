export const SETUP_STATE = 'GAME:SETUP_STATE';
export const CHANGE_PLACE = 'GAME:CHANGE_PLACE';
export const LAST_PLACE = 'GAME:LAST_PLACE';
export const UNDO = 'STATE:UNDO';
export const REDO = 'STATE:REDO';

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
  previousPlace: Place;
}

interface SetupAction {
  type: typeof SETUP_STATE;
  payload: GameState
}

interface ChangePlaceAction {
  type: typeof CHANGE_PLACE;
  payload: string
}

interface LastPlaceAction {
  type: typeof LAST_PLACE;
}

interface RedoAction {
  type: typeof REDO;
}

export type GameActionTypes = SetupAction |
ChangePlaceAction |
LastPlaceAction |
RedoAction
;