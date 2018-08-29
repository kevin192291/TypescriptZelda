import * as ex from 'excalibur';
import { CollisionResolutionStrategy } from 'excalibur';
import { Player } from './actors/Player';
import { LoadAllMaps, LoadAllSprites, LoadWeather, resources, loader } from './initialization';

const game: ex.Engine = new ex.Engine({ displayMode: ex.DisplayMode.FullScreen });
ex.Physics.enabled = true;
ex.Physics.collisionResolutionStrategy = CollisionResolutionStrategy.Box;

LoadAllMaps();
LoadAllSprites();
LoadWeather();

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