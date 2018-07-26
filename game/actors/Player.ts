import ex = require("../../node_modules/excalibur");
import { PreCollisionEvent, Scene, Actor, Engine } from "../../node_modules/excalibur";

export class Player extends ex.Actor {
    private health: number = 100;

    constructor(scene: Scene) {
        super();
        this.collisionType = ex.CollisionType.Passive;
        this.body.useBoxCollision();

        this.on('precollision', (e: PreCollisionEvent) => {
            debugger;
            const withActor: Actor = e.actor;
            this.pos.setTo(this.oldPos.x, this.oldPos.y);
        });

        this.color = ex.Color.Green;
        this.setHeight(20);
        this.setWidth(20);
        this.pos.setTo(200, 250);

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