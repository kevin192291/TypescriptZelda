import { Item } from './item';
import { Player } from '../actors/Player';
import { Direction } from '../models/direction.enum';
import { Vector } from 'excalibur';

export class Sword extends Item {
  constructor(swordName: string) {
    super();
    this.assignLocalSprite(swordName);
  }

  public use() {
    const owner = this.getOwner();
    switch (owner.getDirection()) {
      case Direction.Up:
        this.currentDrawing.rotation = 0;
        owner.pos = new Vector(owner.pos.x, owner.pos.y - 8);
        break;
      case Direction.Down:
        this.currentDrawing.rotation = 2;
        owner.pos = new Vector(owner.pos.x, owner.pos.y + 8);
        break;
      case Direction.Left:
        this.currentDrawing.rotation = 3;
        owner.pos = new Vector(owner.pos.x - 8, owner.pos.y);
        break;
      case Direction.Right:
        this.currentDrawing.rotation = 1;
        owner.pos = new Vector(owner.pos.x + 8, owner.pos.y);
        break;
      default:
        break;
    }
    debugger;
    this.visible = true;
    this.actions.delay(1000);
    this.visible = false;
  }
  public drop() {
    throw new Error('Method not implemented.');
  }
}
