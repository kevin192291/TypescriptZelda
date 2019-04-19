import * as ex from 'excalibur';
import { Player } from './actors/Player';
import {
  LoadAllMaps,
  LoadAllSprites,
  LoadWeather,
  resources,
  loader
} from './initialization';
import configureStore from './states/game';
import eventWatch from './states/game/events';

const game: ex.Engine = new ex.Engine({
  displayMode: ex.DisplayMode.FullScreen
});
ex.Physics.enabled = true;
ex.Physics.collisionResolutionStrategy = ex.CollisionResolutionStrategy.Box;

LoadAllMaps();
LoadAllSprites();
LoadWeather();

game.start(loader).then(() => {
  const store = configureStore(resources, game);
  (<any>window).store = store;
  const plr = Player.create(game, resources.spriteSheets['LinkSheet'], 'kevin');
  eventWatch(store, game, plr);
  store.dispatch({ type: 'GAME:CHANGE_PLACE', payload: 'overworld'});
});
