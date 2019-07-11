import { Actor, Engine, Trigger, Vector, Logger, Color } from 'excalibur';
import { GameState } from './game.types';
import { Place } from '../../models/place.interface';

let placeData = null;

function onTrigger() {
  // `this` will be the Trigger instance
  Logger.getInstance().info('Trigger was triggered!');
  const that: Trigger = this;
  let place =
    placeData.placeData[
      `${that.getWorldPos().x - 8},${that.getWorldPos().y - 8}`
    ];
  if (!place) {
    place =
      placeData.placeData[`${that.getWorldPos().x},${that.getWorldPos().y}`];
  }
  if (place) {
    (window as any).store.dispatch({
      type: 'GAME:CHANGE_PLACE',
      payload: place.scene
    });
    const actor: Actor = that.target;
    if (place.entryX && place.entryY) {
      actor.pos = new Vector(place.entryX + 8, place.entryY + 8);
    }
  }
}

export function eventWatch(store, game: Engine, places: Place[], plr: Actor) {
  let cachedPlaceName = null;

  store.subscribe(() => {
    const currentState: GameState = store.getState().present;
    game.goToScene(currentState.currentPlace);
    game.currentScene.add(plr);
    game.currentScene.camera.strategy.lockToActor(plr);
    game.currentScene.camera.zoom(3, 500);

    const currentPlace: Place = places.find(p => p.name === currentState.currentPlace);
    placeData = currentPlace;
    currentPlace.music && currentPlace.music[currentPlace.name] && currentPlace.music[currentPlace.name].play();
    currentPlace.posAtEnter && (plr.pos = currentPlace.posAtEnter);

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
    
    for (let key in currentPlace.placeData) {
      if (currentPlace.placeData[key].type === 'warp') {
        const splitKey = key.split(',');
        game.add(
          new Trigger({
            width: 16,
            height: 16,
            pos: new Vector(parseInt(splitKey[0].trim())+8, parseInt(splitKey[1].trim())+8),
            repeat: -1,
            action: onTrigger,
            target: plr
          })
        );
      }
    };

    // game.currentScene.camera.zoom(100/currentState.currentPlace.scene.tileMaps[0].cols, 3000);
    // plr.pos = new Vector(parseInt(currentState.currentPlace.placeData.ENTRY_POINT_X), parseInt(currentState.currentPlace.placeData.ENTRY_POINT_Y));
  });
}

export default eventWatch;
