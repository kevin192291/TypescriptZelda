import { WeatherService } from './internet/weather/weatherService';
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
  Actor,
  CollisionType,
  Trigger,
  Vector,
  Logger
} from 'excalibur';
import { WarpZone } from './states/game/game.types';
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
  spriteSheets: []
};

export function LoadAllMaps(): void {
  const testFolder = './dist/assets/';
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
    if (file.includes('.gif')) {
      const resourceName = file
        .split('.')
        .slice(0, -1)
        .join('.');
      resources.sprites[resourceName] = new ex.Texture(testFolder + file);
      loader.addResource(resources.sprites[resourceName]);
    }
  });
}

export function LoadWeather() {
  debugger;
  let weatherService = new WeatherService();
  weatherService.getWeather().then(t => {
      debugger;
  });
}

export function parseMapData(resources, game: Engine): Place[] {
  const places: any[] = [];
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
        name: path.basename(map.path).replace(/\.[^/.]+$/, '')
      };
    });
    place.placeData = mapData;
    place.scene.addTileMap(tileMap);
    game.addScene(
      path.basename(map.path).replace(/\.[^/.]+$/, ''),
      place.scene
    );
    places.push(place);
  });

  for (let sheet in resources.sprites) {
    resources.spriteSheets[sheet] = new SpriteSheet(
      resources.sprites[sheet],
      13,
      13,
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