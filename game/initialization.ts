import { IResources } from "./models/resources.interface";
import { WeatherService } from "./internet/weather/weatherService";
import ex = require("excalibur");
import TiledResource from "./maps/TiledResource";
const admin = require('firebase-admin');

admin.initializeApp({
    apiKey: "AIzaSyAyx0wm5NyLsbuSJ8QlWZ6eFei6pfdE3mc",
    authDomain: "communitygame-1febd.firebaseapp.com",
    databaseURL: "https://communitygame-1febd.firebaseio.com",
    projectId: "communitygame-1febd",
    storageBucket: "",
    messagingSenderId: "273246580010"
});
export const loader: ex.Loader = new ex.Loader();
export var resources: IResources = {
    maps: [],
    sprites: [],
    spriteSheets: [],
};

export function LoadAllMaps(): void {
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

export function LoadAllSprites(): void {
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

export function LoadWeather() {
    // let weatherService = new WeatherService();
    // weatherService.getWeather().then(t => {

    // });
}