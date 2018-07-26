import * as ex from 'excalibur';
import { Player } from './actors/Player';
import { Npc } from './actors/Npc';
import { CollisionResolutionStrategy } from 'excalibur';

var game = new ex.Engine({ displayMode: ex.DisplayMode.FullScreen });
ex.Physics.enabled = true;
ex.Physics.collisionResolutionStrategy = CollisionResolutionStrategy.Box;



var scene = new ex.Scene(game);

new Player(scene, "kevin");
new Npc(scene, 'jim');

var ground = new ex.Actor(300, 380, 600, 10, ex.Color.Black.clone());
ground.collisionType = ex.CollisionType.Fixed;
ground.body.useBoxCollision(); // optional
scene.add(ground);

var box = new ex.Actor(100, 100, 20, 20, ex.Color.Orange.clone());
box.collisionType = ex.CollisionType.Active;
box.body.useBoxCollision(); // optional
scene.add(box);


game.addScene('scene', scene);
game.goToScene('scene');
game.start();