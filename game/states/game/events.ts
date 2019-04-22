import { PreCollisionEvent, Actor, Engine } from 'excalibur';
import { GameState } from './game.types';

export function eventWatch(store, game: Engine, plr: Actor) {
  store.subscribe(() => {
    const currentState: GameState = store.getState();
    game.goToScene(currentState.currentPlace.name);
    game.currentScene.add(plr);
    game.currentScene.camera.strategy.lockToActor(plr);
    // game.currentScene.camera.zoom(100/currentState.currentPlace.scene.tileMaps[0].cols, 3000);

    const warpZones = game.currentScene.createGroup('warpZones');
    currentState.currentPlace.warpZones.forEach(zone =>
      warpZones.add(zone.actor)
    );
    warpZones.on('precollision', function(ev: PreCollisionEvent) {
      if (ev.other === plr) {
        const lookupLocation = ev.actor.getWorldPos();
        const area =
          currentState.currentPlace.placeData[
            `${Math.round(lookupLocation.x)},${Math.round(lookupLocation.y)}`
          ];
        if (area && area.scene === 'LAST_PLACE') {
          const currentState: GameState = store.getState();
          store.dispatch({
            type: 'GAME:CHANGE_PLACE',
            payload: currentState.previousPlace.name
          });
        } else if (area) {
          warpZones.off('precollision');
          store.dispatch({ type: 'GAME:CHANGE_PLACE', payload: area.scene });
        }
      }
    });
    // plr.pos = new Vector(parseInt(currentState.currentPlace.placeData.ENTRY_POINT_X), parseInt(currentState.currentPlace.placeData.ENTRY_POINT_Y));
  });
}

export default eventWatch;
