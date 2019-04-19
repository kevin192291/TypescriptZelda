const path = require('path');
import * as ex from 'excalibur';
import {
  CollisionResolutionStrategy,
  PreCollisionEvent,
  Vector
} from 'excalibur';
import { Player } from './actors/Player';
import {
  LoadAllMaps,
  LoadAllSprites,
  LoadWeather,
  resources,
  loader
} from './initialization';
import { gameReducer } from './states/game/game.reducers';
import configureStore from './states/game';

const game: ex.Engine = new ex.Engine({
  displayMode: ex.DisplayMode.FullScreen
});
ex.Physics.enabled = true;
ex.Physics.collisionResolutionStrategy = CollisionResolutionStrategy.Box;
const warpZoneArray: any[] = [];
let mapData: any = {};

LoadAllMaps();
LoadAllSprites();
LoadWeather();

game.start(loader).then(() => {
  const store = configureStore(resources, game);
  (<any>window).reduxState = store;
  store.subscribe(() => {
    const currentState = store.getState();
    console.log(currentState);
    debugger;

    game.goToScene(currentState.currentPlace.name);
    game.currentScene.add(plr);
    // plr.pos = new Vector(parseInt(currentState.currentPlace.placeData.ENTRY_POINT_X), parseInt(currentState.currentPlace.placeData.ENTRY_POINT_Y));
  });

  const scene = 'overworld';
  game.goToScene(scene);

  const warpZones = game.currentScene.createGroup('warpZones');
  warpZones.add(warpZoneArray);

  const plr = Player.create(game, resources.spriteSheets['LinkSheet'], 'kevin');

  warpZones.on('precollision', function(ev: PreCollisionEvent) {
    if (ev.other === plr) {
      console.log('collision with player!');
      // TODO: Lookup:
      const lookupLocation = ev.actor.getWorldPos();
      const area =
        mapData[
          `${Math.round(lookupLocation.x)},${Math.round(lookupLocation.y)}`
        ];
    }
  });
});
