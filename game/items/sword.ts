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
    this.collisionType = CollisionType.Active;
    this.body.useBoxCollision();
    this.actions.fade(0, 1);

    this.on('collisionstart', (hit: CollisionStartEvent) => {
      const hitPlr: any = hit.other;
      hitPlr.takeDamage(swordPower);
    });
  }

  public dealDamage(amount: number) {
    const target = { ...this.getWorldPos() };
    switch (this.getOwner().getDirection()) {
      case Direction.Up:
        target.y -= 16;
        break;
      case Direction.Down:
        target.y += 16;
        break;
      case Direction.Left:
        target.x -= 16;
        break;
      case Direction.Right:
        target.x += 16;
        break;
    }
    const cell = this._game.currentScene.tileMaps[0].getCellByPoint(
      target.x,
      target.y
    );
    if (cell.sprites.length > 1) {
      cell.removeSprite(cell.sprites[cell.sprites.length]);
      cell.sprites[1].spriteId = cell.sprites[0].spriteId;
      cell.sprites[1].spriteSheetKey = cell.sprites[0].spriteSheetKey;
      cell.solid = false;
    }
  }

  public draw(ctx: CanvasRenderingContext2D, delta: number) {
    super.draw(ctx, delta); // perform base drawing logic
  }

  public use() {
    if (!this.currentDrawing) return;
    this._inUse = true;
    this._useageCount++;
    this.dealDamage(1);
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
    this._inUse = false;
  }
  public drop() {}
}
