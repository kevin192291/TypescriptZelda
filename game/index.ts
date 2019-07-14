import * as ex from 'excalibur';
import { Player } from './actors/Player';
import {
  LoadAllMaps,
  LoadAllSprites,
  LoadWeather,
  resources,
  loader,
  parseMapData,
  LoadAllMusic,
  LoadAllItemIcons
} from './initialization';
import configureStore from './states/game';
import eventWatch from './states/game/events';
import { HealthBar } from './actors/health-bar';
import { Sword } from './items/sword';
import { RedPotion } from './items/redPotion';
import { ButtonsUI } from './actors/buttons-ui';

const game: ex.Engine = new ex.Engine({
  displayMode: ex.DisplayMode.FullScreen
});
ex.Physics.enabled = true;
ex.Physics.collisionResolutionStrategy = ex.CollisionResolutionStrategy.Box;
game.isDebug = true;

LoadAllMaps();
LoadAllSprites();
LoadAllMusic();
LoadAllItemIcons();
// LoadWeather();

game.start(loader).then(() => {
  const places = parseMapData(resources, game); // Load maps and sprites
  const store = configureStore({
    currentPlace: 'castle',
    previousPlace: null
  });
  (window as any).store = store;
  
  const plr = Player.create(game, resources.spriteSheets['LinkSheet'], 'kevin');
  debugger;
  plr.health = 65;
  new HealthBar(plr);
  
  
  const ui = new ButtonsUI(game);
  ui.assignLocalSprite('Red Potion.png');

  const sword = new Sword('excalibur.png');
  plr.pickUp(sword);
  
  const healthPotion = new RedPotion();
  plr.pickUp(healthPotion);
  
  plr.setActiveItem(healthPotion);
  
  eventWatch(store, game, places, plr);
  store.dispatch({type: 'GAME:CHANGE_PLACE', payload: 'castle'});
});
