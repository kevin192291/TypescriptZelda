import { PreCollisionEvent, Actor, Engine } from 'excalibur';

export function eventWatch(store, game: Engine, plr: Actor) {
  store.subscribe(() => {
    const currentState = store.getState();
    console.log(currentState);
    game.goToScene(currentState.currentPlace.name);
    game.currentScene.add(plr);

    if (game.currentScene.getGroup('warpZones')) {
      game.currentScene.removeGroup('warpZones');
    }
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
          store.dispatch({ type: 'GAME:LAST_PLACE' });
        } else if (area) {
          store.dispatch({ type: 'GAME:CHANGE_PLACE', payload: area.scene });
        }
      }
    });
    // plr.pos = new Vector(parseInt(currentState.currentPlace.placeData.ENTRY_POINT_X), parseInt(currentState.currentPlace.placeData.ENTRY_POINT_Y));
  });
}

export default eventWatch;
