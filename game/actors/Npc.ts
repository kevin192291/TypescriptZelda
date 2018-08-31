import { Scene, Engine } from "excalibur";
import { Character } from './Character';

export class Npc extends Character {
    public name: string = 'unknown';

    constructor(engine: Engine, name?: string) {
        super(engine, name);
    }

    public walk() {

    }

}