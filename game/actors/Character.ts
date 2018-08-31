import * as ex from 'excalibur';
import {
    PreCollisionEvent,
    Engine,
    Scene,
} from "excalibur";

export abstract class Character extends ex.Actor {
    public name: string = 'unknown';
    public health: number = 100;
    public abstract walk(scene?: Scene, engine?: Engine, x?: number, y?: number, toCharacter?: Character);

    constructor(engine: Engine, name?: string) {
        super();
        this.collisionType = ex.CollisionType.Active;
        this.body.useBoxCollision();

        this.on('precollision', (e: PreCollisionEvent) => {
            console.log(`${e}`);
        });

        this.color = ex.Color.Green;
        this.setHeight(16);
        this.setWidth(16);
        this.pos.setTo(200, 250);
        this.name = name;
        engine.currentScene.add(this);
        engine.currentScene.camera.rotation = 45;
    }

    public assignSprite(spriteFile: string) {
        var txPlayer = new ex.Texture(`/assets/sprites/characters/${spriteFile}`);
        txPlayer.load().then(value => {
            debugger;
            this.addDrawing(txPlayer.asSprite());
        });
    }
}