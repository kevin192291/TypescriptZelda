import {
  PreCollisionEvent,
  Actor,
  Engine,
  Trigger,
  Vector,
  Logger
} from 'excalibur';
import { GameState } from './game.types';
import { ActionCreators } from 'redux-undo';

let placeData = null;

function onTrigger() {
  // `this` will be the Trigger instance
  Logger.getInstance().info('Trigger was triggered!');
  const that: Trigger = this;
  let place =
    placeData.placeData[`${that.getWorldPos().x - 8},${that.getWorldPos().y - 8}`];
  if (!place) {
    place = placeData.placeData[`${that.getWorldPos().x},${that.getWorldPos().y}`];
  }
  if (place) {
    (window as any).store.dispatch({
      type: 'GAME:CHANGE_PLACE',
      payload: place.scene
    });
  }
}

export function eventWatch(store, game: Engine, places, plr: Actor) {
  let cachedPlaceName = null;

  store.subscribe(() => {
    const currentState: GameState = store.getState().present;
    game.goToScene(currentState.currentPlace);
    game.currentScene.add(plr);
    game.currentScene.camera.strategy.lockToActor(plr);

    const currentPlace = places.find(p => p.name === currentState.currentPlace);
    placeData = currentPlace;
    currentPlace.eventTiles.warpZones.forEach(zone => {
      game.add(
        new Trigger({
          width: zone.width,
          height: zone.height,
          pos: new Vector(zone.x + zone.width / 2, zone.y + zone.height / 2),
          repeat: -1,
          action: onTrigger,
          target: plr
        })
      );
    });

    // game.currentScene.camera.zoom(100/currentState.currentPlace.scene.tileMaps[0].cols, 3000);
    // plr.pos = new Vector(parseInt(currentState.currentPlace.placeData.ENTRY_POINT_X), parseInt(currentState.currentPlace.placeData.ENTRY_POINT_Y));
  });
}

export default eventWatch;
