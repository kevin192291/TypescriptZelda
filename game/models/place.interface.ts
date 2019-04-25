import { EventTiles } from "./eventTiles.interface";

export interface Place {
  scene: ex.Scene;
  name: string;
  eventTiles: EventTiles;
  posAtEnter?: ex.Vector;
  posAtExit?: ex.Vector;
  placeData?: any;
  music?: any;
}
