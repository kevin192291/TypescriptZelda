import * as ex from 'excalibur';
import { CollisionResolutionStrategy } from 'excalibur';

import { Player } from './actors/Player';
import TiledResource from './maps/TiledResource';
import { WeatherService } from './internet/weather/weatherService';
import { IResources } from './models/resources.interface';

const game: ex.Engine = new ex.Engine({ displayMode: ex.DisplayMode.FullScreen });
const loader: ex.Loader = new ex.Loader();
ex.Physics.enabled = true;
ex.Physics.collisionResolutionStrategy = CollisionResolutionStrategy.Box;
var resources: IResources = {
    maps: [],
    sprites: [],
};

LoadAllMaps();
LoadAllSprites();
LoadWeather();


game.start(loader).then(() => {
    for(let map in resources.maps) {
        debugger;
        const scene = new ex.Scene(game);
        scene.addTileMap(resources.maps[map].getTileMap());
        game.addScene(map, scene);
    }


    game.goToScene('zelda');
    var plr = Player.create(game, game.currentScene, "kevin");

    plr.addDrawing('link', resources.sprites['LinkSheet'].asSprite());

    // var playerSprite = new ex.SpriteSheet(resources.sprites['LinkSheet'], 13, 13, 208, 208);
    // var playerIdleAnimation = playerSprite.getSprite(1);
    // plr.addDrawing('idle', playerIdleAnimation);
    // plr.setDrawing('idle');
    

});

function LoadAllMaps(): void {
    const testFolder = './dist/assets/';
    const fs = require('fs');
    fs.readdirSync(testFolder).forEach((file: string) => {
        if (file.includes('.json')) {
            const resourceName = file.split('.').slice(0, -1).join('.');
            resources.maps[resourceName] = new TiledResource(testFolder + file);
            loader.addResource(resources.maps[resourceName]);
        }
    });
}

function LoadAllSprites(): void {
    const testFolder = './dist/assets/sprites/characters/';
    const fs = require('fs');
    fs.readdirSync(testFolder).forEach((file: string) => {
        if (file.includes('.gif')) {
            const resourceName = file.split('.').slice(0, -1).join('.');
            resources.sprites[resourceName] = new ex.Texture(testFolder + file);
            loader.addResource(resources.sprites[resourceName]);
        }
    });
}

function LoadWeather() {
    let weatherService = new WeatherService();
    weatherService.getWeather().then(t => {

    });
}