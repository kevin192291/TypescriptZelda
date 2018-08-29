import * as ex from 'excalibur';
import { CollisionResolutionStrategy } from 'excalibur';
const admin = require('firebase-admin');

admin.initializeApp({
    apiKey: "AIzaSyAyx0wm5NyLsbuSJ8QlWZ6eFei6pfdE3mc",
    authDomain: "communitygame-1febd.firebaseapp.com",
    databaseURL: "https://communitygame-1febd.firebaseio.com",
    projectId: "communitygame-1febd",
    storageBucket: "",
    messagingSenderId: "273246580010"
});

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
    spriteSheets: [],
};

LoadAllMaps();
LoadAllSprites();
LoadWeather();

debugger;


game.start(loader).then(() => {
    for (let map in resources.maps) {
        const scene = new ex.Scene(game);
        scene.addTileMap(resources.maps[map].getTileMap());
        game.addScene(map, scene);
    }
    for (let sheet in resources.sprites) {
        resources.spriteSheets[sheet] = new ex.SpriteSheet(resources.sprites[sheet], 13, 13, 16, 16);
    }


    game.goToScene('zelda');
    Player.create(game, game.currentScene, resources.spriteSheets['LinkSheet'], "kevin");
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