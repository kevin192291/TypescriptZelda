import { Item } from './item';
import { Direction } from '../models/direction.enum';
import { CollisionType, CollisionStartEvent, RotationType } from 'excalibur';

export class Bow extends Item {
  private _inUse: boolean = false;
  private _arrowCount: number = 0;
  constructor(bowSpriteName: string, bowPower: number = 10) {
    super();
    this.assignLocalSprite(bowSpriteName);
    this.body.collider.type = CollisionType.Active;
    this.body.useBoxCollider(16,16);
    this.actions.fade(0, 1);
    this.sprite_name = 'bow.png';

    this.on('collisionstart', (hit: CollisionStartEvent) => {
      const hitPlr: any = hit.other;
      hitPlr.takeDamage(bowPower);
    });
  }

  public draw(ctx: CanvasRenderingContext2D, delta: number) {
    super.draw(ctx, delta); // perform base drawing logic
  }

  public use() {
    if (!this.currentDrawing) return;
    // if (this._arrowCount === 0) {
    //   return;
    // }
    this._inUse = true;
    this._arrowCount--;
    const owner = this.getOwner();
    debugger;
    switch (owner.getDirection()) {
      case Direction.Up:
        this.currentDrawing.flipVertical = false;
        this.anchor.setTo(1, 1);
        this.actions
          .moveTo(this.getOwner().body.pos.x, this.getOwner().pos.y - 200, 8)
          .asPromise()
          .resolve()
          .then(() => {});
        break;
      case Direction.Down:
        this.currentDrawing.flipVertical = true;
        this.anchor.setTo(0, 0);
        this.actions
          .moveTo(this.getOwner().body.pos.x, this.getOwner().pos.y + 200, 8)
          .asPromise()
          .resolve()
          .then(() => {});
        break;
      case Direction.Left:
        this.anchor.setTo(1, 1);
        this.actions
          .moveTo(this.getOwner().body.pos.x - 200, this.getOwner().pos.y, 8)
          .asPromise()
          .resolve()
          .then(() => {});
        break;
      case Direction.Right:
        this.actions
          .moveTo(this.getOwner().body.pos.x + 200, this.getOwner().pos.y, 8)
          .asPromise()
          .resolve()
          .then(() => {});
        this.anchor.setTo(1, 1);
        break;
      default:
        break;
    }
    this._inUse = false;
  }
  public drop() {}
}
