import * as ex from 'excalibur';
import { Player } from './actors/Player';
import { CollisionResolutionStrategy, Scene } from 'excalibur';
import TiledResource from './maps/TiledResource';

var game = new ex.Engine({ displayMode: ex.DisplayMode.FullScreen });
ex.Physics.enabled = true;
ex.Physics.collisionResolutionStrategy = CollisionResolutionStrategy.Box;


var map = LoadAllMaps(); // [new TiledResource('dist/assets/zelda.json')];
var loader = new ex.Loader(map);
var scenes: Scene[] = []; // = new ex.Scene(game);

game.start(loader).then((success: any) => {
    map.forEach(map => {
        let scene = new ex.Scene(game);
        scene.addTileMap(map.getTileMap());
        scenes.push(scene);
        game.addScene(map.name, scene);
    });

    game.goToScene('zelda.json');
    Player.create(game, game.currentScene, "kevin");
});

function LoadAllMaps() {
    let maps = [];
    const testFolder = './dist/assets/';
    const fs = require('fs');
    fs.readdirSync(testFolder).forEach((file: string) => {
        debugger;
        if (file.includes('.json')) {
            console.log(file);
            let mapObj = new TiledResource(testFolder + file);
            mapObj.name = file;
            maps.push(mapObj);
        }
    })
    return maps;
}