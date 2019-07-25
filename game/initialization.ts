import ex = require('excalibur');
import TiledResource = require('@excaliburjs/excalibur-tiled');
import { IResources } from './models/resources.interface';
const admin = require('firebase-admin');
const path = require('path');
import {
  SpriteSheet,
  Scene,
  Engine,
  Cell,
} from 'excalibur';
import { Place } from './models/place.interface';
import { EventTiles } from './models/eventTiles.interface';

admin.initializeApp({
  apiKey: 'AIzaSyAyx0wm5NyLsbuSJ8QlWZ6eFei6pfdE3mc',
  authDomain: 'communitygame-1febd.firebaseapp.com',
  databaseURL: 'https://communitygame-1febd.firebaseio.com',
  projectId: 'communitygame-1febd',
  storageBucket: '',
  messagingSenderId: '273246580010'
});

export const loader: ex.Loader = new ex.Loader();
export var resources: IResources = {
  maps: [],
  sprites: [],
  spriteSheets: [],
  items: [],
  music: [],
};

export function LoadAllMaps(): void {
  const testFolder = './dist/assets/tilemaps/';
  const fs = require('fs');

  //Load MAPS
  fs.readdirSync(testFolder).forEach((file: string) => {
    if (file.includes('.json')) {
      const resourceName = file
        .split('.')
        .slice(0, -1)
        .join('.');
      const last = new TiledResource.TiledResource(testFolder + file);
      resources.maps.push(last);
      loader.addResource(last);
    }
  });
}

export function LoadAllSprites(): void {
  const testFolder = './dist/assets/sprites/characters/';
  const fs = require('fs');
  fs.readdirSync(testFolder).forEach((file: string) => {
    if (file.includes('.gif') || file.includes('.png')) {
      const resourceName = file
        .split('.')
        .slice(0, -1)
        .join('.');
      resources.sprites[resourceName] = new ex.Texture(testFolder + file);
      loader.addResource(resources.sprites[resourceName]);
    }
  });
}

export function LoadAllItemIcons(): void {
  const testFolder = './dist/assets/items/';
  const fs = require('fs');
  fs.readdirSync(testFolder).forEach((file: string) => {
    if (file.includes('.bmp') || file.includes('.png') || file.includes('.jpg')) {
      const resourceName = file
        .split('.')
        .slice(0, -1)
        .join('.');
      resources.items[resourceName] = new ex.Texture(testFolder + file);
      loader.addResource(resources.items[resourceName]);
    }
  });
}

export function LoadAllMusic(): void {
  const testFolder = './dist/assets/music/';
  const fs = require('fs');
  fs.readdirSync(testFolder).forEach((file: string) => {
    if (file.includes('.mp3')) {
      const resourceName = file
        .split('.')
        .slice(0, -1)
        .join('.');
      resources.music[resourceName] = new ex.Sound(testFolder + file);
      loader.addResource(resources.music[resourceName]);
    }
  });
}

// export function LoadWeather() {
//   debugger;
//   let weatherService = new WeatherService();
//   weatherService.getWeather().then(t => {
//       debugger;
//   });
// }

export function parseMapData(resources, game: Engine): Place[] {
  const places: Place[] = [];
  resources.maps.forEach(map => {
    const tileMap = map.getTileMap();
    let mapData = Object;
    let place: Place = null;
    map.data.layers.forEach(layer => {
      place = null;
      const data = setupMapData(layer);
      mapData = Object.assign(data, mapData);
      const eventTiles = setupEventTiles(layer, map, tileMap);
      place = {
        scene: new Scene(game),
        eventTiles: eventTiles,
        posAtExit: null,
        posAtEnter: null,
        music: [],
        name: path.basename(map.path).replace(/\.[^/.]+$/, '')
      };
    });
    place.placeData = mapData;
    if (mapData['entry_x'] && mapData['entry_y'])
    place.posAtEnter = new ex.Vector(mapData['entry_x'], mapData['entry_y']);
    place.scene.addTileMap(tileMap);
    if (resources.music[place.name]) {
      place.music[place.name] = (resources.music[place.name]);
    }
    game.addScene(
      path.basename(map.path).replace(/\.[^/.]+$/, ''),
      place.scene
    );
    places.push(place);
  });

  for (let sheet in resources.sprites) {
    resources.spriteSheets[sheet] = new SpriteSheet(
      resources.sprites[sheet],
      resources.sprites[sheet].width / 16,
      resources.sprites[sheet].height / 16,
      16,
      16
    );
  }
  return places;
}

function setupMapData(layer) {
  const mapData = [];
  if (layer.properties) {
    (<any>layer).properties.forEach(prop => {
      const objArr = JSON.parse(prop.value);
      if (objArr) {
        // TODO: This is really bad, needs fixing
        for (let key in objArr) {
          Object.keys(objArr[key]).forEach(k => {
            mapData[k] = objArr[key][k];
          });
        }
      }
    });
  }
  return mapData;
}

function setupEventTiles(layer, map, tileMap): EventTiles {
  const warpZones: Cell[] = [];
  const damageZones: Cell[] = [];
  const items: Cell[] = [];
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
            warpZones.push(tileMap.getCellByIndex(i));
            break;
          default:
            break;
        }
      });
    }
  }
  return {
    warpZones: warpZones,
    damageZones: damageZones,
    items: items,
  };
}