import * as ex from 'excalibur';
import {
    PreCollisionEvent,
    Engine,
    Scene,
} from "excalibur";
import { Character } from './Character';

export class Player extends Character {
    public static instance: Player = null;

    private constructor(game: Engine, scene: Scene, name?: string) {
        super(scene, name);
    }

    public static create(game: Engine, scene: Scene, name?: string) {
        if(this.instance === null) {
            this.instance = new Player(game, scene, name);
        }
        return this.instance;
    }

    public update(engine: Engine, delta) {
        super.update(engine, delta);
        this.walk(engine);
    }

    public _initialize(engine: Engine) {
        super._initialize(engine);
        
    }

    public walk(engine) {
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
}