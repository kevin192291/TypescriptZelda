const path = require('path');
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
const warpPoints: ex.Cell[] = [];
const dangerPoints: ex.Cell[] = [];

game.start(loader).then(() => {
  resources.maps.forEach(map => {
    const scene = new ex.Scene(game);
    const tileMap = map.getTileMap();
    map.data.layers.forEach(layer => {
      for (let i = 0; i < layer.data.length; i++) {
        const tileSet = map.getTilesetForTile(<number>layer.data[i]);
        if (!tileSet) {
          continue;
        }
        const collision = (<any>tileSet).tiles.find(
          t => t.id === <number>layer.data[i] - 1
        );
        if (collision && collision.properties) {
          collision.properties.forEach(property => {
            switch (property.name) {
              case 'collision':
                tileMap.getCellByIndex(i).solid = property.value;
                break;
              case 'warp':
                warpPoints.push(tileMap.getCellByIndex(i));
                break;
              case 'danger':
                dangerPoints.push(tileMap.getCellByIndex(i));
                break;
              default:
                break;
            }
          });
        }
      }
    });
    scene.addTileMap(tileMap);
    game.addScene(path.basename(map.path).replace(/\.[^/.]+$/, ''), scene);
  });
  debugger;
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
  game.goToScene(scene);
  const plr = Player.create(game, resources.spriteSheets['LinkSheet'], 'kevin');

  const cam = new LockedCamera();
  cam.setActorToFollow(plr);
  game.currentScene.camera = cam;
});
