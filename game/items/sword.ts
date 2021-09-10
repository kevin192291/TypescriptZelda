import { Item } from './item';
import { Direction } from '../models/direction.enum';
import { CollisionType, CollisionStartEvent, RotationType } from 'excalibur';

export class Sword extends Item {
  private _inUse: boolean = false;
  private _useageCount: number = 0;
  private _game: ex.Engine;

  constructor(game: ex.Engine, swordName: string, swordPower: number = 15) {
    super();
    this._game = game;
    this.assignLocalSprite(swordName);
    this.body.collider.type = CollisionType.Active;
    this.body.useBoxCollider(16,16);
    this.actions.fade(0, 1);

    this.on('collisionstart', (hit: CollisionStartEvent) => {
      const hitPlr: any = hit.other;
      hitPlr.takeDamage(swordPower);
    });
  }

  public dealDamage(amount: number) {
    this.findFacedActor(this._game.currentScene.actors).takeDamage(amount);
  }

  public draw(ctx: CanvasRenderingContext2D, delta: number) {
    super.draw(ctx, delta); // perform base drawing logic
  }

  public use() {
    if (!this.currentDrawing) {
      console.log('not current drawing');
      return;
    }
    this.actions.clearActions();
    this.actions.rotateTo(0, 0);
    this._inUse = true;
    this._useageCount++;
    this.dealDamage(1);
    const owner = this.getOwner();
    switch (owner.getDirection()) {
      case Direction.Up:
        this.currentDrawing.flipVertical = false;
        this.anchor.setTo(1, 1);
        this.actions
          .fade(1, 0)
          .rotateTo(1.5708, 9, RotationType.Clockwise)
          .fade(0, 0)
          // .rotateTo(0, 1000, RotationType.ShortestPath)
          .asPromise()
          .resolve()
          .then(() => {
            console.log('sword use finished');
            this._inUse = false;
          });
        break;
      case Direction.Down:
        this.currentDrawing.flipVertical = true;
        this.anchor.setTo(0, 0);
        this.actions
          .fade(1, 100)
          .rotateTo(1.5708, 10, RotationType.Clockwise)
          .fade(0, 100)
          // .rotateTo(0, 1000, RotationType.ShortestPath)
          .asPromise()
          .resolve()
          .then(() => {
            console.log('sword use finished');
            this._inUse = false;
          });
        break;
      case Direction.Left:
        this.anchor.setTo(1, 1);
        this.actions
          .fade(1, 100)
          .rotateTo(4.71239, 9, RotationType.CounterClockwise)
          .fade(0, 100)
          // .rotateTo(0, 1000, RotationType.ShortestPath)
          .asPromise()
          .resolve()
          .then(() => {
            console.log('sword use finished');
            this._inUse = false;
          });
        break;
      case Direction.Right:
        this.actions
          .fade(1, 100)
          .rotateTo(1.5708, 9, RotationType.Clockwise)
          .fade(0, 100)
          // .rotateTo(0, 1000, RotationType.ShortestPath)
          .asPromise()
          .resolve()
          .then(() => {
            console.log('sword use finished');
            this._inUse = false;
          });
        this.anchor.setTo(1, 1);
        break;
      default:
        break;
    }
  }
  public drop() {
    console.log('why would you ever drop your sword???');
  }
}
