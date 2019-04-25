import * as ex from 'excalibur';
import { Player } from './actors/Player';
import {
  LoadAllMaps,
  LoadAllSprites,
  LoadWeather,
  resources,
  loader,
  parseMapData,
  LoadAllMusic
} from './initialization';
import configureStore from './states/game';
import eventWatch from './states/game/events';

const game: ex.Engine = new ex.Engine({
  displayMode: ex.DisplayMode.FullScreen
});
ex.Physics.enabled = true;
ex.Physics.collisionResolutionStrategy = ex.CollisionResolutionStrategy.Box;
game.isDebug = true;

LoadAllMaps();
LoadAllSprites();
LoadAllMusic();
// LoadWeather();

game.start(loader).then(() => {
  const places = parseMapData(resources, game); // Load maps and sprites
  const store = configureStore({
    currentPlace: 'castle',
    previousPlace: null
  });
  (window as any).store = store;
  
  const plr = Player.create(game, resources.spriteSheets['LinkSheet'], 'kevin');
  eventWatch(store, game, places, plr);
  store.dispatch({type: 'GAME:CHANGE_PLACE', payload: 'castle'});
});
