import * as ex from 'excalibur';
import { Player } from './actors/Player';
import { Extensions } from '../node_modules/@excaliburjs/excalibur-tiled/dist/excalibur-tiled.min';

var game = new ex.Engine({ displayMode: ex.DisplayMode.FullScreen });
var scene = new ex.Scene(game);

const plr: Player = new Player(scene);

plr.vel.setTo(0,100);


var ground = new ex.Actor(300, 380, 600, 10, ex.Color.Black.clone());
ground.collisionType = ex.CollisionType.Fixed;
ground.body.useBoxCollision(); // optional
scene.add(ground);


// Create a new TiledResource loadable
var map = new Extensions.Tiled.TiledResource("test.json");

// Create a loader and reference the map
var loader = new ex.Loader([map]);


game.addScene('scene', scene);
game.goToScene('scene');
game.start().then(resp => {
    console.log("Game loaded");
   
   // Process the data in the map as you like
//    map.data.tilesets.forEach(function(ts) {
//       console.log(ts.image, ts.imageTexture.isLoaded());
//    });
   
//    // get a Excalibur `TileMap` instance
//    var tm = map.getTileMap();
   
   // draw the tile map
   //game.add(tm);
});