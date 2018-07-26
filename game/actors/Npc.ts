import * as ex from 'excalibur';
import {
    PreCollisionEvent,
    Scene,
    Actor
} from "excalibur";

export class Npc extends ex.Actor {
    private health: number = 100;
    public name: string = 'unknown';

    constructor(scene: Scene, name?: string) {
        super();

        this.on('precollision', (e: PreCollisionEvent) => {
            const withActor: Actor = e.actor;
            console.log(`${this.name} collided with ${withActor[name]}`);
            
        });

        this.color = ex.Color.Red;
        this.setHeight(20);
        this.setWidth(20);
        this.pos.setTo(30, 50);
        this.name = name;

        this.collisionType = ex.CollisionType.Active;
        this.body.useBoxCollision();
        scene.add(this);

    }

}