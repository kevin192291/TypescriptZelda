import * as ex from 'excalibur';
import TiledResource from '@excaliburjs/excalibur-tiled';

import { Player } from './actors/Player';
import { Npc } from './actors/Npc';
import { CollisionResolutionStrategy } from 'excalibur';

var game = new ex.Engine({ displayMode: ex.DisplayMode.FullScreen });
ex.Physics.enabled = true;
ex.Physics.collisionResolutionStrategy = CollisionResolutionStrategy.Box;

var x = TiledResource('./maps/map.json', 'tmx');
debugger;

var scene = new ex.Scene(game);

new Player(scene, "kevin");
new Npc(scene, 'jim');

var ground = new ex.Actor(300, 380, 600, 10, ex.Color.Black.clone());
ground.collisionType = ex.CollisionType.Fixed;
ground.body.useBoxCollision(); // optional
scene.add(ground);


game.addScene('scene', scene);
game.goToScene('scene');
game.start();