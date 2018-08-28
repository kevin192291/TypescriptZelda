import * as ex from 'excalibur';
import { CollisionResolutionStrategy } from 'excalibur';

import { Player } from './actors/Player';
import TiledResource from './maps/TiledResource';
import { WeatherService } from './internet/weather/weatherService';

const game: ex.Engine = new ex.Engine({ displayMode: ex.DisplayMode.FullScreen });
ex.Physics.enabled = true;
ex.Physics.collisionResolutionStrategy = CollisionResolutionStrategy.Box;


const map: TiledResource[] = LoadAllMaps();
const loader: ex.Loader = new ex.Loader(map);
LoadWeather();
debugger;

game.start(loader).then(() => {
    map.forEach(map => {
        const scene = new ex.Scene(game);
        scene.addTileMap(map.getTileMap());
        game.addScene(map.name, scene);
    });

    game.goToScene('zelda.json');
    Player.create(game, game.currentScene, "kevin");
});

function LoadAllMaps(): TiledResource[] {
    const maps: TiledResource[] = [];
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

function LoadWeather() {
    let weatherService = new WeatherService();
    weatherService.getWeather().then(t => {
        debugger;
    });
}