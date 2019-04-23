export const CHANGE_PLACE = 'GAME:CHANGE_PLACE';
export const LAST_PLACE = 'GAME:LAST_PLACE';
export const UNDO = 'STATE:UNDO';
export const REDO = 'STATE:REDO';

export interface WarpZone {
  tile_x: number;
  tile_y: number;
  actor: ex.Actor;
}

export interface GameState {
  currentPlace: string; // current place you are at NOW
  previousPlace: string; // place you entered the currentPlace FROM
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

interface UndoAction {
  type: typeof UNDO;
}

export type GameActionTypes =
ChangePlaceAction |
LastPlaceAction   |
RedoAction        |
UndoAction
;