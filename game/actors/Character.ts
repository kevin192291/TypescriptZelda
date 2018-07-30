import * as ex from 'excalibur';
import {
    PreCollisionEvent,
    Engine,
} from "excalibur";

export abstract class Character extends ex.Actor {
    private health: number = 100;
    public name: string = 'unknown';

    constructor(game: Engine, name?: string) {
        super();
        this.collisionType = ex.CollisionType.Active;
        this.body.useBoxCollision();

        this.on('precollision', (e: PreCollisionEvent) => {
            debugger;
            console.log(`${e}`);
        });

        this.color = ex.Color.Green;
        this.setHeight(16);
        this.setWidth(16);
        this.pos.setTo(200, 250);
        this.name = name;
        game.add(this);
    }

    public assignSprite(spriteFile: string) {
        var txPlayer = new ex.Texture(`/assets/sprites/characters/${spriteFile}`);
        txPlayer.load().then(value => {
            debugger;
            this.addDrawing(txPlayer.asSprite());
        });
    }
}