const path = require('path');
import * as ex from 'excalibur';
import { CollisionResolutionStrategy, PreCollisionEvent } from 'excalibur';
import { Player } from './actors/Player';
import {
  LoadAllMaps,
  LoadAllSprites,
  LoadWeather,
  resources,
  loader
} from './initialization';
import configureStore from './states/game';

const game: ex.Engine = new ex.Engine({
  displayMode: ex.DisplayMode.FullScreen
});
ex.Physics.enabled = true;
ex.Physics.collisionResolutionStrategy = CollisionResolutionStrategy.Box;

LoadAllMaps();
LoadAllSprites();
LoadWeather();

game.start(loader).then(() => {
  const store = configureStore(resources, game);
  (<any>window).reduxState = store;

  store.subscribe(() => {
    const currentState = store.getState();
    console.log(currentState);
    game.goToScene(currentState.currentPlace.name);
    game.currentScene.add(plr);

    const warpZones = game.currentScene.createGroup('warpZones');
    currentState.currentPlace.warpZones.forEach(zone => warpZones.add(zone.actor));
    warpZones.on('precollision', function(ev: PreCollisionEvent) {
      if (ev.other === plr) {
        debugger;
        const lookupLocation = ev.actor.getWorldPos();
        const area = currentState.currentPlace.placeData[`${Math.round(lookupLocation.x)},${Math.round(lookupLocation.y)}`];
        if (area.scene === 'LAST_PLACE') {
          store.dispatch({type: 'GAME:LAST_PLACE'});
        } else {
          store.dispatch({type: 'GAME:CHANGE_PLACE', payload: area.scene});
        }
      }
    });
    // plr.pos = new Vector(parseInt(currentState.currentPlace.placeData.ENTRY_POINT_X), parseInt(currentState.currentPlace.placeData.ENTRY_POINT_Y));
  });

  const plr = Player.create(game, resources.spriteSheets['LinkSheet'], 'kevin');
});
