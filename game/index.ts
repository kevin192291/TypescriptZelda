import * as ex from 'excalibur';
import { Player } from './actors/Player';
import { CollisionResolutionStrategy, Scene } from 'excalibur';
import TiledResource from './maps/TiledResource';

var game = new ex.Engine({ displayMode: ex.DisplayMode.FullScreen });
ex.Physics.enabled = true;
ex.Physics.collisionResolutionStrategy = CollisionResolutionStrategy.Box;


var map = LoadAllMaps();
var loader = new ex.Loader(map);

game.start(loader).then((success: any) => {
    map.forEach(map => {
        let scene = new ex.Scene(game);
        scene.addTileMap(map.getTileMap());
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
        if (file.includes('.json')) {
            let mapObj = new TiledResource(testFolder + file);
            mapObj.name = file;
            maps.push(mapObj);
        }
    })
    return maps;
}