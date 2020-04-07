import * as ex from 'excalibur';
import { Player } from './actors/Player';
import {
  LoadAllMaps,
  LoadAllSprites,
  // LoadWeather,
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
import { Bow } from './items/bow';
import { Npc } from './actors/Npc';
import { Hammer } from './items/hammer';

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
  // const mapService = new MapService();
  // const mapsFromGithub = mapService.getMapByName('overworld1.json');
  // resources.maps.push(mapsFromGithub);
  // debugger;
  
  const places = parseMapData(resources, game); // Load maps and sprites
  const store = configureStore({
    currentPlace: '0,0',
    previousPlace: null
  });
  (window as any).store = store;
  
  const ui = new ButtonsUI(game);
  const plr = Player.create(game, ui, resources.spriteSheets['LinkSheet'], 'kevin');
  plr.health = 65;
  new HealthBar(plr);

  const sword = new Sword(game, 'excalibur.png');
  plr.pickUp(sword);
  
  const healthPotion = new RedPotion();
  plr.pickUp(healthPotion);

  plr.pickUp(new Hammer(game));

  const bow = new Bow('bow.png');
  plr.pickUp(bow);
  plr.setActiveItem(bow);

  const marin = Npc.create(game, resources.spriteSheets['marin'], 'marin');
  game.currentScene.add(marin);
  marin.pos = new ex.Vector(120, 200);
  new HealthBar(marin);

  eventWatch(store, game, places, plr, [marin]);
  store.dispatch({type: 'GAME:CHANGE_PLACE', payload: '0,0'}); // Transform 0-0 to an xy number system
});
