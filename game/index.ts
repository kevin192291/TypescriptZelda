import * as ex from 'excalibur';
import { Player } from './actors/Player';
import { Npc } from './actors/Npc';
import { CollisionResolutionStrategy } from 'excalibur';
import TiledResource from './maps/TiledResource';

var game = new ex.Engine({ displayMode: ex.DisplayMode.FullScreen });
ex.Physics.enabled = true;
ex.Physics.collisionResolutionStrategy = CollisionResolutionStrategy.Box;

var map = new TiledResource('dist/assets/zelda.json');
var loader = new ex.Loader([map]);

var scene = new ex.Scene(game);

new Player(scene, "kevin");

game.addScene('scene', scene);
game.goToScene('scene');
game.start(loader).then((success: any) => {
    map.data.tilesets.forEach(tileset => {
        console.log(tileset.image, tileset.imageTexture.isLoaded());
    });

    // get a Excalibur `TileMap` instance
    var tm = map.getTileMap();
    tm.x = 0;
    tm.y = 0;
    

    // draw the tile map
    game.add(tm);
});