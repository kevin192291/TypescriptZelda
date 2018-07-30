import * as ex from 'excalibur';
import { Player } from './actors/Player';
import { CollisionResolutionStrategy } from 'excalibur';
import TiledResource from './maps/TiledResource';

var game = new ex.Engine({ displayMode: ex.DisplayMode.FullScreen });
ex.Physics.enabled = true;
ex.Physics.collisionResolutionStrategy = CollisionResolutionStrategy.Box;

var map = new TiledResource('dist/assets/zelda.json');
var loader = new ex.Loader([map]);

game.start(loader).then((success: any) => {
    map.data.tilesets.forEach(tileset => {
        console.log(tileset.image, tileset.imageTexture.isLoaded());
    });
    
    // get a Excalibur `TileMap` instance
    var tilemap = map.getTileMap();
    tilemap.x = 0;
    tilemap.y = 0;
    
    new Player(game, "kevin");

    // draw the tile map
    game.add(tilemap);
});