import { Item } from './item';
import { Direction } from '../models/direction.enum';
import { CollisionType, CollisionStartEvent } from 'excalibur';

export class Sword extends Item {
  constructor(swordName: string, swordPower: number = 15) {
    super();
    this.assignLocalSprite(swordName);
    this.collisionType = CollisionType.Active;
    this.body.useBoxCollision();

    this.on('collisionstart', (hit: CollisionStartEvent) => {
      const hitPlr: any = hit.other;
      hitPlr.takeDamage(swordPower);
    });
  }

  public use() {
    switch (this.getOwner().getDirection()) {
      case Direction.Up:
        this.pos.setTo(0, -14);
        this.actions.rotateTo(0,0).fade(1,20).fade(0,480);
        break;
      case Direction.Down:
        this.pos.setTo(0, 14);
        this.actions.rotateTo(0,0).fade(1,500).rotateTo(3.14, 500).fade(0,10);;
        break;
      case Direction.Left:
        this.pos.setTo(-9, 3);
        this.actions.rotateTo(0,0).fade(1,500).rotateTo(4.7, 500).fade(0,10);;
        break;
      case Direction.Right:
        this.pos.setTo(9, 3);
        this.actions.rotateTo(0,0).fade(1,500).rotateTo(1.5, 500).fade(0,10);
        break;
      default:
        break;
    }
  }
  public drop() {
    
  }
}
