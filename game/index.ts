import * as ex from 'excalibur';
import {
  CollisionResolutionStrategy,
  SideCamera,
  LockedCamera
} from 'excalibur';
import { Player } from './actors/Player';
import {
  LoadAllMaps,
  LoadAllSprites,
  LoadWeather,
  resources,
  loader
} from './initialization';

const game: ex.Engine = new ex.Engine({
  displayMode: ex.DisplayMode.FullScreen
});
ex.Physics.enabled = true;
ex.Physics.collisionResolutionStrategy = CollisionResolutionStrategy.Box;

LoadAllMaps();
LoadAllSprites();
LoadWeather();

game.start(loader).then(() => {
  resources.maps.forEach(map => {
    const scene = new ex.Scene(game);
    const tileMap = map.getTileMap();
    map.data.layers.forEach(layer => {
      for (let i = 0; i < layer.data.length; i++) {
        const tileSet = map.getTilesetForTile(<number>layer.data[i]);
        const collision = (<any>tileSet).tiles.find(
          t => t.id === <number>layer.data[i] - 1
        );
        if (collision && collision.properties) {
          const collisionProperties = collision.properties.find(
            c => c.name === 'collision'
          );
          if (collisionProperties) {
            tileMap.getCellByIndex(i).solid = collisionProperties.value;
          }
        }
      }
    });
    scene.addTileMap(tileMap);
    game.addScene('0', scene);
    debugger;
  });

  for (let sheet in resources.sprites) {
    resources.spriteSheets[sheet] = new ex.SpriteSheet(
      resources.sprites[sheet],
      13,
      13,
      16,
      16
    );
  }
  const scene = 'overworld';
  debugger;
  game.goToScene('0');
  const plr = Player.create(game, resources.spriteSheets['LinkSheet'], 'kevin');

  const cam = new LockedCamera();
  cam.setActorToFollow(plr);
  game.currentScene.camera = cam;
});
