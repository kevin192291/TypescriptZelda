import * as ex from 'excalibur';
import { Player } from './actors/Player';
import { CollisionResolutionStrategy, Scene } from 'excalibur';
import TiledResource from './maps/TiledResource';

var game = new ex.Engine({ displayMode: ex.DisplayMode.FullScreen });
ex.Physics.enabled = true;
ex.Physics.collisionResolutionStrategy = CollisionResolutionStrategy.Box;


var map = LoadAllMaps(); //new TiledResource('dist/assets/zelda.json');
var loader = new ex.Loader(map);
var currentScene: Scene = new ex.Scene(game);

game.start(loader).then((success: any) => {
    var tilemap = map[0].getTileMap();

    currentScene.addTileMap(tilemap);
    Player.create(game, currentScene, "kevin");

    // draw the tile map
    game.addScene('overworld', currentScene);
    game.goToScene('overworld');
});

function LoadAllMaps() {
    let maps = [];
    debugger;

    const testFolder = './dist/assets';
    const fs = require('fs');

    fs.readdirSync(testFolder).forEach((file: string) => {
        debugger;
        if (file.includes('.json')) {
            console.log(file);
            maps.push(new TiledResource(file));
        }

    })
    return maps;
}