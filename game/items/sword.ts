import { Item } from './item';
import { Direction } from '../models/direction.enum';
import { CollisionType, CollisionStartEvent, RotationType } from 'excalibur';

export class Sword extends Item {
  private _inUse: boolean = false;
  constructor(swordName: string, swordPower: number = 15) {
    super();
    this.assignLocalSprite(swordName);
    this.collisionType = CollisionType.Active;
    this.body.useBoxCollision();
    this.actions.fade(0, 1);

    this.on('collisionstart', (hit: CollisionStartEvent) => {
      const hitPlr: any = hit.other;
      hitPlr.takeDamage(swordPower);
    });
  }

  public draw(ctx: CanvasRenderingContext2D, delta: number) {
    super.draw(ctx, delta); // perform base drawing logic
  }

  public use() {
    const owner = this.getOwner();
    switch (owner.getDirection()) {
      case Direction.Up:
        this.currentDrawing.flipVertical = false;
        this.anchor.setTo(1, 1);
        this.actions
          .fade(1, 100)
          .rotateTo(1.5708, 9, RotationType.Clockwise)
          .fade(0, 100)
          .rotateTo(0, 1000, RotationType.ShortestPath)
          .asPromise()
          .resolve()
          .then(() => {});
        break;
      case Direction.Down:
        this.currentDrawing.flipVertical = true;
        this.anchor.setTo(0, 0);
        this.actions
          .fade(1, 100)
          .rotateTo(1.5708, 9, RotationType.Clockwise)
          .fade(0, 100)
          .rotateTo(0, 1000, RotationType.ShortestPath)
          .asPromise()
          .resolve()
          .then(() => {});
        break;
      case Direction.Left:
        this.anchor.setTo(1, 1);
        this.actions
          .fade(1, 100)
          .rotateTo(4.71239, 9, RotationType.CounterClockwise)
          .fade(0, 100)
          .rotateTo(0, 1000, RotationType.ShortestPath)
          .asPromise()
          .resolve()
          .then(() => {});
        break;
      case Direction.Right:
        this.actions
          .fade(1, 100)
          .rotateTo(1.5708, 9, RotationType.Clockwise)
          .fade(0, 100)
          .rotateTo(0, 1000, RotationType.ShortestPath)
          .asPromise()
          .resolve()
          .then(() => {});
        this.anchor.setTo(1, 1);
        break;
      default:
        break;
    }
  }
  public drop() {}
}
