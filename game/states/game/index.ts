import { createStore, applyMiddleware, compose } from 'redux';
import gameReducer from './game.reducers';
import { GameState, Place, WarpZone } from './game.types';
import { Actor, CollisionType, SpriteSheet, Scene, Cell, Engine } from 'excalibur';
const path = require('path');

const configureStore = (preloadedState, game) => {
  preloadedState = mapInitialObject(preloadedState, game);
  const store = createStore(gameReducer, preloadedState);
  return store;
};

function mapInitialObject(resources, game: Engine): GameState {
  let initialState: GameState = {
    currentPlace: undefined,
    places: []
  };

  const places: Place[] = [];
  resources.maps.forEach(map => {
    // const scene = new Scene(game);
    const tileMap = map.getTileMap();
    let mapData = Object;
    let place: Place = null;
    map.data.layers.forEach(layer => {
      place = null;
      const data = setupMapData(layer);
      mapData = Object.assign(data, mapData);
      const warpZones = setupEventTiles(layer, map, tileMap);
      place = {
        scene: new Scene(game),
        warpZones: warpZones,
        posAtExit: null,
        posAtEnter: null,
        name: path.basename(map.path).replace(/\.[^/.]+$/, '')
      };
    });
    place.placeData = mapData;
    place.scene.addTileMap(tileMap);
    game.addScene(path.basename(map.path).replace(/\.[^/.]+$/, ''), place.scene);
    places.push(place);
  });

  initialState = {
    currentPlace: places[0],
    places: places
  };

  for (let sheet in resources.sprites) {
    resources.spriteSheets[sheet] = new SpriteSheet(
      resources.sprites[sheet],
      13,
      13,
      16,
      16
    );
  }
  game.goToScene('overworld');
  return initialState;
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

function setupEventTiles(layer, map, tileMap): WarpZone[] {
  const warpZones: WarpZone[] = [];
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
            const cell: Cell = tileMap.getCellByIndex(i);
            const act = new Actor(cell.x, cell.y, 16, 16);
            act.collisionType = CollisionType.Active;
            act.body.useBoxCollision();
            warpZones.push({
              actor: act,
              tile_x: cell.x,
              tile_y: cell.y
            });
            break;
          default:
            break;
        }
      });
    }
  }
  return warpZones;
}

export default configureStore;
