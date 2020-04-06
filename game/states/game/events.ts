import { Actor, Engine, Trigger, Vector, Logger } from 'excalibur';
import { GameState } from './game.types';
import { Place } from '../../models/place.interface';
import { Player } from '../../actors/Player';
import { Direction } from '../../models/direction.enum';

let placeData = null;
let timer = Date.now();

function onTrigger() {
  // `this` will be the Trigger instance
  Logger.getInstance().info('Trigger was triggered!');
  const that: Trigger = this;
  let place =
    placeData.placeData[
    `${that.getWorldPos().x - 8},${that.getWorldPos().y - 8}`
    ];
  if (!place) {
    place =
      placeData.placeData[`${that.getWorldPos().x},${that.getWorldPos().y}`];
  }
  if (place) {
    if (Date.now() < timer + 50) return; // TODO: FIGURE OUT WHY THE TRIGGER HITS TWICE
    timer = Date.now(); //TODO: This is terrible fig the issue and get rid of this workaround

    const actor: Actor = that.target;
    if (place.type === 'edge') { // Split this into a function
      const currentState = (window as any).store.getState().present; // get current state to update
      const payload = currentState.currentPlace.split(','); // put x,y coords of map into an aray
      switch ((that.target as Player).getDirection()) { // get player direction (type this) to determine how to update the coords of the map
        case Direction.Down:
          payload[1]++; // inc the cord of the map
          actor.pos = new Vector(actor.pos.x, 32);
          break;
        case Direction.Up:
          payload[1]--; // inc the cord of the map
          actor.pos = new Vector(actor.pos.x, (40*16)-20);
          break;
        default:
          break;
      }
      (window as any).store.dispatch({
        type: 'GAME:CHANGE_PLACE',
        payload: payload.join() // join the half string half number array into a full string array
      }); // TODO: Add player location after the warp event occures!!!
    } else {
      (window as any).store.dispatch({
        type: 'GAME:CHANGE_PLACE',
        payload: place.scene
      });

      if (place.entryX && place.entryY) {
        actor.pos = new Vector(place.entryX + 8, place.entryY + 8);
      }
    }
  }
}

export function eventWatch(
  store,
  game: Engine,
  places: Place[],
  plr: Player,
  actors: Actor[]
) {
  let cachedPlaceName = null;

  store.subscribe(() => {
    const currentState: GameState = store.getState().present;
    game.goToScene(currentState.currentPlace);

    actors.forEach(act => {
      game.currentScene.add(act); // Adds current player to current scene
      game.currentScene.camera.strategy.lockToActor(act);
    });

    game.currentScene.add(plr); // Adds current player to current scene
    game.currentScene.camera.strategy.lockToActor(plr);
    // game.currentScene.camera.zoom(3, 500);

    const currentPlace: Place = places.find(
      p => p.name === currentState.currentPlace
    );
    placeData = currentPlace;
    currentPlace.music &&
      currentPlace.music[currentPlace.name] &&
      currentPlace.music[currentPlace.name].play();
    currentPlace.posAtEnter && (plr.pos = currentPlace.posAtEnter);

    currentPlace.eventTiles.warpZones.forEach(zone => {
      game.add(
        new Trigger({
          width: zone.width,
          height: zone.height,
          pos: new Vector(zone.x + zone.width / 2, zone.y + zone.height / 2),
          repeat: -1,
          action: onTrigger,
          target: plr
        })
      );
    });

    for (let key in currentPlace.placeData) {
      if (currentPlace.placeData[key].type === 'warp') {
        const splitKey = key.split(',');
        game.add(
          new Trigger({
            width: 16,
            height: 16,
            pos: new Vector(
              parseInt(splitKey[0].trim()) + 8,
              parseInt(splitKey[1].trim()) + 8
            ),
            repeat: -1,
            action: onTrigger,
            target: plr
          })
        );
      }

      if (currentPlace.placeData[key].type === 'edge') {
        const splitKey = key.split(',');
        game.add(
          new Trigger({
            width: 16,
            height: 16,
            pos: new Vector(
              parseInt(splitKey[0].trim()) + 8,
              parseInt(splitKey[1].trim()) + 8
            ),
            repeat: -1,
            action: onTrigger,
            target: plr
          })
        );
      }
    }

    // game.currentScene.camera.zoom(100/currentState.currentPlace.scene.tileMaps[0].cols, 3000);
    // plr.pos = new Vector(parseInt(currentState.currentPlace.placeData.ENTRY_POINT_X), parseInt(currentState.currentPlace.placeData.ENTRY_POINT_Y));
  });
}

export default eventWatch;
