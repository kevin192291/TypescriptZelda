const path = require('path');
import * as ex from 'excalibur';
import {
  CollisionResolutionStrategy,
  CollisionEndEvent,
  CollisionType,
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
  resources.maps.forEach(map => {
    const scene = new ex.Scene(game);
    const tileMap = map.getTileMap();
    map.data.layers.forEach(layer => {
      if (layer.name === 'warpZones') {
        if (layer.properties) {
          (<any>layer).properties.forEach(prop => {
            const objArr = JSON.parse(prop.value);
            if (objArr) {
              objArr.forEach(obj => {
                mapData = obj;
              });
            }
          });
        }
      }
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
                const cell = tileMap.getCellByIndex(i);
                const act = new ex.Actor(cell.x, cell.y, 16, 16);
                
                act.collisionType = ex.CollisionType.Active;
                act.body.useBoxCollision();
                warpZoneArray.push(act);
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
      if (area) {
        game.goToScene(area.scene);
        game.currentScene.add(plr);
      }
    }
  });
});
