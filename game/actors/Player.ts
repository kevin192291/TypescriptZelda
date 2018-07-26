import * as ex from 'excalibur';
import {
    PreCollisionEvent,
    Scene,
    Actor,
    Engine
} from "excalibur";

export class Player extends ex.Actor {
    private health: number = 100;
    public name: string = 'unknown';

    constructor(scene: Scene, name?: string) {
        super();
        this.collisionType = ex.CollisionType.Active;
        this.body.useBoxCollision();

        this.on('precollision', (e: PreCollisionEvent) => {
            const withActor: Actor = e.actor;
            console.log(`${this.name} collided with ${withActor}`);
            
        });

        this.color = ex.Color.Green;
        this.setHeight(20);
        this.setWidth(20);
        this.pos.setTo(200, 250);
        this.name = name;

        scene.add(this);
    }

    public update(engine: Engine, delta) {
        super.update(engine, delta);

        if (engine.input.keyboard.isHeld(ex.Input.Keys.W) || engine.input.keyboard.isHeld(ex.Input.Keys.Up)) {
            this.vel.setTo(0, -100);
        } else if (engine.input.keyboard.isHeld(ex.Input.Keys.S) || engine.input.keyboard.isHeld(ex.Input.Keys.Down)) {
            this.vel.setTo(0, 100);
        } else if (engine.input.keyboard.isHeld(ex.Input.Keys.A) || engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
            this.vel.setTo(-100, 0);
        } else if (engine.input.keyboard.isHeld(ex.Input.Keys.D) || engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
            this.vel.setTo(100, 0);
        }

        if (engine.input.keyboard.wasReleased(ex.Input.Keys.W) ||
            engine.input.keyboard.wasReleased(ex.Input.Keys.S) ||
            engine.input.keyboard.wasReleased(ex.Input.Keys.A) ||
            engine.input.keyboard.wasReleased(ex.Input.Keys.D) ||

            engine.input.keyboard.wasReleased(ex.Input.Keys.Up) ||
            engine.input.keyboard.wasReleased(ex.Input.Keys.Down) ||
            engine.input.keyboard.wasReleased(ex.Input.Keys.Right) ||
            engine.input.keyboard.wasReleased(ex.Input.Keys.Left)) {
            this.vel.setTo(0, 0);
        }
    }

    public _initialize(engine: Engine) {
        super._initialize(engine);
    }

}